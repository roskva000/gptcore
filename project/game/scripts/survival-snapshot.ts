import {
  FIRST_SPAWN_DELAY_MS,
  TARGET_FIRST_DEATH_SECONDS,
  getObstacleSpeed,
  getSpawnDelayMs,
} from '../src/game/balance.ts';
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  selectSpawnPoint,
  type Point,
} from '../src/game/spawn.ts';

const PLAYER_SPEED = 260;
const EFFECTIVE_PLAYER_SPEED = 214;
const PLAYER_RADIUS = 16;
const OBSTACLE_RADIUS = 12;
const MAX_SIMULATION_SECONDS = 30;
const SESSION_COUNT = 24;
const FIXED_TIME_STEP_SECONDS = 1 / 60;
const DECISION_INTERVAL_SECONDS = 0.18;
const CENTER_PULL_WEIGHT = 0.55;
const WALL_PUSH_WEIGHT = 1.4;
const DANGER_INFLUENCE_RADIUS = 220;

type Vector = Point;

type Obstacle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type SessionResult = {
  seed: number;
  survivalTimeSeconds: number;
  spawns: number;
  spawnRerolls: number;
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const round = (value: number): number => Number(value.toFixed(1));

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
      const direction = normalize({
        x: player.x - selection.point.x,
        y: player.y - selection.point.y,
      });

      obstacles.push({
        x: selection.point.x,
        y: selection.point.y,
        vx: direction.x * speed,
        vy: direction.y * speed,
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

    for (const obstacle of obstacles) {
      obstacle.x += obstacle.vx * FIXED_TIME_STEP_SECONDS;
      obstacle.y += obstacle.vy * FIXED_TIME_STEP_SECONDS;

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

const results = Array.from({ length: SESSION_COUNT }, (_, index) => simulateSession(index + 1));
const survivalTimes = results.map((result) => result.survivalTimeSeconds);
const averageSurvivalTime =
  survivalTimes.reduce((total, value) => total + value, 0) / survivalTimes.length;
const earlyDeaths = results.filter(
  (result) => result.survivalTimeSeconds < TARGET_FIRST_DEATH_SECONDS,
).length;

const report = {
  sessionCount: SESSION_COUNT,
  maxSimulationSeconds: MAX_SIMULATION_SECONDS,
  controller: 'center-seeking avoidance heuristic with 180ms reaction interval',
  effectivePlayerSpeed: EFFECTIVE_PLAYER_SPEED,
  nativePlayerSpeed: PLAYER_SPEED,
  averageSurvivalTimeSeconds: round(averageSurvivalTime),
  firstDeathTimeSeconds: Math.min(...survivalTimes),
  bestSurvivalTimeSeconds: Math.max(...survivalTimes),
  earlyDeathRatePercent: Math.round((earlyDeaths / results.length) * 100),
  averageSpawnCount: round(results.reduce((total, result) => total + result.spawns, 0) / results.length),
  averageSpawnRerolls: round(
    results.reduce((total, result) => total + result.spawnRerolls, 0) / results.length,
  ),
  sampleRuns: results.slice(0, 8),
};

console.log(JSON.stringify(report, null, 2));
