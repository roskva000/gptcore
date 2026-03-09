import {
  EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS,
  EARLY_SPAWN_TARGET_LAG_SECONDS,
  EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS,
  EARLY_SPAWN_COLLISION_GRACE_MS,
  FIRST_SPAWN_DELAY_MS,
  OPENING_REQUIRED_SPAWN_DISTANCE_BONUS,
  OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS,
  TARGET_FIRST_DEATH_SECONDS,
  getObstacleSpeed,
  getRequiredSpawnDistance,
  getSpawnDelayMs,
  getSpawnCollisionGraceMs,
  getSpawnTargetLagSeconds,
} from '../src/game/balance.ts';
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  isPointInsideArena,
  isPointOutsideCullBounds,
  OFFSCREEN_CULL_MARGIN,
  selectSpawnPoint,
  type Point,
} from '../src/game/spawn.ts';

const BALANCE_SAMPLE_TIMES_SECONDS = [0, 5, 10, 15, 20, 30, 45, 60];
const SPAWN_COUNT_LIMITS_SECONDS = [10, 30, 60];
const PLAYER_SPEED = 260;
const EFFECTIVE_PLAYER_SPEED = 214;
const PLAYER_RADIUS = 16;
const OBSTACLE_RADIUS = 11;
const MAX_SIMULATION_SECONDS = 30;
const SESSION_COUNT = 24;
const FIXED_TIME_STEP_SECONDS = 1 / 60;
const DECISION_INTERVAL_SECONDS = 0.18;
const CENTER_PULL_WEIGHT = 0.55;
const WALL_PUSH_WEIGHT = 1.4;
const DANGER_INFLUENCE_RADIUS = 220;

type Vector = Point;

type SpawnSimulation = {
  spawnTimes: number[];
  firstSpawnAt: number;
};

type Obstacle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  collisionReadyAtSeconds: number | null;
};

type SessionResult = {
  seed: number;
  survivalTimeSeconds: number;
  spawns: number;
  spawnRerolls: number;
};

export type BalanceSnapshotReport = {
  targetFirstDeathSeconds: number;
  firstSpawnAtSeconds: number;
  balanceCurve: Array<{
    seconds: number;
    spawnDelayMs: number;
    obstacleSpeed: number;
    requiredSpawnDistance: number;
    spawnTargetLagSeconds: number;
    spawnCollisionGraceMs: number;
  }>;
  spawnCounts: Array<{
    seconds: number;
    count: number;
  }>;
  firstTenSpawnTimes: number[];
};

export type SurvivalSnapshotReport = {
  sessionCount: number;
  maxSimulationSeconds: number;
  controller: string;
  effectivePlayerSpeed: number;
  nativePlayerSpeed: number;
  averageSurvivalTimeSeconds: number;
  firstDeathTimeSeconds: number;
  bestSurvivalTimeSeconds: number;
  earlyDeathRatePercent: number;
  survivalBuckets: {
    under10Seconds: number;
    between10And20Seconds: number;
    between20And30Seconds: number;
    reached30SecondsCap: number;
  };
  averageSpawnCount: number;
  averageSpawnRerolls: number;
  sampleRuns: SessionResult[];
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const round = (value: number): number => Number(value.toFixed(1));

const simulateSpawns = (limitSeconds: number): SpawnSimulation => {
  const spawnTimes: number[] = [];
  let nextSpawnAtSeconds = FIRST_SPAWN_DELAY_MS / 1000;

  while (nextSpawnAtSeconds <= limitSeconds) {
    spawnTimes.push(round(nextSpawnAtSeconds));
    nextSpawnAtSeconds += getSpawnDelayMs(nextSpawnAtSeconds) / 1000;
  }

  return {
    spawnTimes,
    firstSpawnAt: FIRST_SPAWN_DELAY_MS / 1000,
  };
};

const createSeededRandom = (seed: number): ((min: number, max: number) => number) => {
  let state = seed >>> 0;

  return (min: number, max: number): number => {
    state = (state * 1664525 + 1013904223) >>> 0;
    const normalized = state / 0x100000000;

    return Math.floor(normalized * (max - min + 1)) + min;
  };
};

const normalize = (vector: Vector): Vector => {
  const length = Math.hypot(vector.x, vector.y);

  if (length === 0) {
    return { x: 0, y: 0 };
  }

  return { x: vector.x / length, y: vector.y / length };
};

const scale = (vector: Vector, multiplier: number): Vector => ({
  x: vector.x * multiplier,
  y: vector.y * multiplier,
});

const add = (left: Vector, right: Vector): Vector => ({
  x: left.x + right.x,
  y: left.y + right.y,
});

const getRandomFloat = (randomInt: (min: number, max: number) => number): number =>
  randomInt(0, 10000) / 10000;

const getWallAvoidance = (player: Point): Vector => {
  const leftGap = Math.max(player.x, 1);
  const rightGap = Math.max(ARENA_WIDTH - player.x, 1);
  const topGap = Math.max(player.y, 1);
  const bottomGap = Math.max(ARENA_HEIGHT - player.y, 1);

  return {
    x: (1 / leftGap - 1 / rightGap) * WALL_PUSH_WEIGHT * 120,
    y: (1 / topGap - 1 / bottomGap) * WALL_PUSH_WEIGHT * 120,
  };
};

const getAvoidanceVector = (player: Point, obstacles: Obstacle[]): Vector => {
  return obstacles.reduce<Vector>((combined, obstacle) => {
    const dx = player.x - obstacle.x;
    const dy = player.y - obstacle.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0 || distance > DANGER_INFLUENCE_RADIUS) {
      return combined;
    }

    const weight = (DANGER_INFLUENCE_RADIUS - distance) / DANGER_INFLUENCE_RADIUS;
    const away = scale(normalize({ x: dx, y: dy }), weight * weight * 2.4);

    return add(combined, away);
  }, { x: 0, y: 0 });
};

const getPlayerVelocity = (
  player: Point,
  obstacles: Obstacle[],
  randomInt: (min: number, max: number) => number,
): Vector => {
  const centerPull = scale(
    normalize({ x: ARENA_WIDTH / 2 - player.x, y: ARENA_HEIGHT / 2 - player.y }),
    CENTER_PULL_WEIGHT,
  );
  const wallAvoidance = getWallAvoidance(player);
  const avoidance = getAvoidanceVector(player, obstacles);
  const jitter = {
    x: getRandomFloat(randomInt) * 0.5 - 0.25,
    y: getRandomFloat(randomInt) * 0.5 - 0.25,
  };
  const direction = normalize(add(add(add(centerPull, wallAvoidance), avoidance), jitter));

  return scale(direction, EFFECTIVE_PLAYER_SPEED);
};

const simulateSession = (seed: number): SessionResult => {
  const randomInt = createSeededRandom(seed);
  const player: Point = { x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 };
  const obstacles: Obstacle[] = [];
  let playerVelocity: Vector = { x: 0, y: 0 };
  let nextDecisionAtSeconds = 0;
  let survivalTimeSeconds = 0;
  let nextSpawnAtSeconds = FIRST_SPAWN_DELAY_MS / 1000;
  let spawns = 0;
  let spawnRerolls = 0;

  while (survivalTimeSeconds < MAX_SIMULATION_SECONDS) {
    while (survivalTimeSeconds >= nextSpawnAtSeconds) {
      const selection = selectSpawnPoint({
        survivalTimeSeconds,
        playerPosition: player,
        randomInt,
      });
      const speed = getObstacleSpeed(survivalTimeSeconds);
      const spawnTargetLagSeconds = getSpawnTargetLagSeconds(survivalTimeSeconds);
      const collisionGraceMs = getSpawnCollisionGraceMs(survivalTimeSeconds);
      const direction = normalize({
        x: clamp(player.x - playerVelocity.x * spawnTargetLagSeconds, 0, ARENA_WIDTH) - selection.point.x,
        y: clamp(player.y - playerVelocity.y * spawnTargetLagSeconds, 0, ARENA_HEIGHT) - selection.point.y,
      });

      obstacles.push({
        x: selection.point.x,
        y: selection.point.y,
        vx: direction.x * speed,
        vy: direction.y * speed,
        collisionReadyAtSeconds:
          collisionGraceMs > 0 ? survivalTimeSeconds + collisionGraceMs / 1000 : null,
      });

      spawns += 1;
      spawnRerolls += selection.rerollsUsed;
      nextSpawnAtSeconds += getSpawnDelayMs(nextSpawnAtSeconds) / 1000;
    }

    if (survivalTimeSeconds >= nextDecisionAtSeconds) {
      playerVelocity = getPlayerVelocity(player, obstacles, randomInt);
      nextDecisionAtSeconds += DECISION_INTERVAL_SECONDS;
    }

    player.x = clamp(player.x + playerVelocity.x * FIXED_TIME_STEP_SECONDS, PLAYER_RADIUS, ARENA_WIDTH - PLAYER_RADIUS);
    player.y = clamp(player.y + playerVelocity.y * FIXED_TIME_STEP_SECONDS, PLAYER_RADIUS, ARENA_HEIGHT - PLAYER_RADIUS);

    for (let obstacleIndex = obstacles.length - 1; obstacleIndex >= 0; obstacleIndex -= 1) {
      const obstacle = obstacles[obstacleIndex];
      obstacle.x += obstacle.vx * FIXED_TIME_STEP_SECONDS;
      obstacle.y += obstacle.vy * FIXED_TIME_STEP_SECONDS;

      if (isPointOutsideCullBounds(obstacle)) {
        obstacles.splice(obstacleIndex, 1);
        continue;
      }

      if (
        obstacle.collisionReadyAtSeconds !== null &&
        survivalTimeSeconds < obstacle.collisionReadyAtSeconds
      ) {
        continue;
      }

      if (!isPointInsideArena(obstacle)) {
        continue;
      }

      const distance = Math.hypot(obstacle.x - player.x, obstacle.y - player.y);

      if (distance <= PLAYER_RADIUS + OBSTACLE_RADIUS) {
        return {
          seed,
          survivalTimeSeconds: round(survivalTimeSeconds),
          spawns,
          spawnRerolls,
        };
      }
    }

    survivalTimeSeconds += FIXED_TIME_STEP_SECONDS;
  }

  return {
    seed,
    survivalTimeSeconds: round(MAX_SIMULATION_SECONDS),
    spawns,
    spawnRerolls,
  };
};

export const createBalanceSnapshotReport = (): BalanceSnapshotReport => {
  const longestLimit = Math.max(...SPAWN_COUNT_LIMITS_SECONDS);
  const simulated = simulateSpawns(longestLimit);

  return {
    targetFirstDeathSeconds: TARGET_FIRST_DEATH_SECONDS,
    firstSpawnAtSeconds: simulated.firstSpawnAt,
    balanceCurve: BALANCE_SAMPLE_TIMES_SECONDS.map((seconds) => ({
      seconds,
      spawnDelayMs: Math.round(getSpawnDelayMs(seconds)),
      obstacleSpeed: Math.round(getObstacleSpeed(seconds)),
      requiredSpawnDistance: Math.round(getRequiredSpawnDistance(seconds)),
      spawnTargetLagSeconds: Number(getSpawnTargetLagSeconds(seconds).toFixed(2)),
      spawnCollisionGraceMs: Math.round(getSpawnCollisionGraceMs(seconds)),
    })),
    spawnCounts: SPAWN_COUNT_LIMITS_SECONDS.map((limitSeconds) => ({
      seconds: limitSeconds,
      count: simulated.spawnTimes.filter((spawnAt) => spawnAt <= limitSeconds).length,
    })),
    firstTenSpawnTimes: simulated.spawnTimes.slice(0, 10),
  };
};

export const createSurvivalSnapshotReport = (): SurvivalSnapshotReport => {
  const results = Array.from({ length: SESSION_COUNT }, (_, index) => simulateSession(index + 1));
  const survivalTimes = results.map((result) => result.survivalTimeSeconds);
  const averageSurvivalTime =
    survivalTimes.reduce((total, value) => total + value, 0) / survivalTimes.length;
  const earlyDeaths = results.filter(
    (result) => result.survivalTimeSeconds < TARGET_FIRST_DEATH_SECONDS,
  ).length;

  return {
    sessionCount: SESSION_COUNT,
    maxSimulationSeconds: MAX_SIMULATION_SECONDS,
    controller: `center-seeking avoidance heuristic with 180ms reaction interval, +${OPENING_REQUIRED_SPAWN_DISTANCE_BONUS}px opening spawn distance through ${OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS}s, ${EARLY_SPAWN_TARGET_LAG_SECONDS.toFixed(2)}s early spawn target lag through ${EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS}s, ${EARLY_SPAWN_COLLISION_GRACE_MS}ms collision grace through ${EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS}s, visible-arena hit guard, and ${OFFSCREEN_CULL_MARGIN}px offscreen cull margin`,
    effectivePlayerSpeed: EFFECTIVE_PLAYER_SPEED,
    nativePlayerSpeed: PLAYER_SPEED,
    averageSurvivalTimeSeconds: round(averageSurvivalTime),
    firstDeathTimeSeconds: Math.min(...survivalTimes),
    bestSurvivalTimeSeconds: Math.max(...survivalTimes),
    earlyDeathRatePercent: Math.round((earlyDeaths / results.length) * 100),
    survivalBuckets: {
      under10Seconds: results.filter((result) => result.survivalTimeSeconds < 10).length,
      between10And20Seconds: results.filter(
        (result) =>
          result.survivalTimeSeconds >= 10 && result.survivalTimeSeconds < 20,
      ).length,
      between20And30Seconds: results.filter(
        (result) =>
          result.survivalTimeSeconds >= 20 && result.survivalTimeSeconds < MAX_SIMULATION_SECONDS,
      ).length,
      reached30SecondsCap: results.filter(
        (result) => result.survivalTimeSeconds >= MAX_SIMULATION_SECONDS,
      ).length,
    },
    averageSpawnCount: round(results.reduce((total, result) => total + result.spawns, 0) / results.length),
    averageSpawnRerolls: round(
      results.reduce((total, result) => total + result.spawnRerolls, 0) / results.length,
    ),
    sampleRuns: results.slice(0, 8),
  };
};
