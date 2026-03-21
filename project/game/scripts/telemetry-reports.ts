import {
  DRIFT_OBSTACLE_CADENCE,
  DRIFT_OBSTACLE_ROTATION_DEGREES,
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS,
  EARLY_SPAWN_TARGET_LAG_SECONDS,
  EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS,
  EARLY_SPAWN_COLLISION_GRACE_MS,
  ECHO_OBSTACLE_CADENCE,
  ECHO_OBSTACLE_TARGET_LAG_SECONDS,
  ECHO_OBSTACLE_UNLOCK_SECONDS,
  FIRST_SPAWN_DELAY_MS,
  KILLBOX_ECHO_FOLLOW_THROUGH_ROTATION_DEGREES,
  KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_SECONDS,
  KILLBOX_ECHO_BRIDGE_ROTATION_DEGREES,
  KILLBOX_ECHO_BRIDGE_WINDOW_SECONDS,
  KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS,
  KILLBOX_ECHO_CADENCE_ROTATION_DEGREES,
  KILLBOX_ECHO_HANDOFF_ROTATION_DEGREES,
  KILLBOX_ECHO_HANDOFF_WINDOW_SECONDS,
  KILLBOX_FORCED_LEAD_TARGET_LEAD_SECONDS,
  KILLBOX_FORCED_LEAD_WINDOW_SECONDS,
  LEAD_OBSTACLE_CADENCE,
  LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  OPENING_REQUIRED_SPAWN_DISTANCE_BONUS,
  OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS,
  STRAFE_OBSTACLE_CADENCE,
  STRAFE_OBSTACLE_ROTATION_DEGREES,
  STRAFE_OBSTACLE_UNLOCK_SECONDS,
  SURGE_OBSTACLE_CADENCE,
  SURGE_OBSTACLE_SPEED_MULTIPLIER,
  SURGE_OBSTACLE_UNLOCK_SECONDS,
  TARGET_FIRST_DEATH_SECONDS,
  getObstacleSpeed,
  getObstacleSpeedMultiplier,
  getObstacleTargetLagSeconds,
  getObstacleTravelDirection,
  getObstacleVariant,
  getRequiredSpawnDistance,
  getSpawnDelayMs,
  getSpawnCollisionGraceMs,
  getSpawnTargetLagSeconds,
} from '../src/game/balance.ts';
import {
  getSpawnEdge,
  ARENA_HEIGHT,
  ARENA_WIDTH,
  EARLY_LANE_STACK_ALIGNMENT_THRESHOLD,
  EARLY_LANE_STACK_DISTANCE,
  EARLY_LANE_STACK_PENALTY,
  EARLY_LANE_STACK_REROLL_CUTOFF_SECONDS,
  EARLY_SPAWN_EDGE_CLUSTER_DEPTH,
  EARLY_SPAWN_EDGE_CLUSTER_LATERAL_DISTANCE,
  EARLY_SPAWN_EDGE_CLUSTER_PENALTY,
  EARLY_SPAWN_EDGE_CLUSTER_REROLL_CUTOFF_SECONDS,
  EARLY_PRESSURED_SPAWN_ACCEPT_SCORE,
  EARLY_PRESSURED_SPAWN_REROLL_CUTOFF_SECONDS,
  EARLY_PRESSURED_SAME_EDGE_LATERAL_DISTANCE,
  EARLY_PRESSURED_SAME_SIDE_LATERAL_DISTANCE,
  EARLY_PRESSURED_SAME_EDGE_PLAYER_DISTANCE,
  EARLY_RETREAT_PINCH_ALIGNMENT_THRESHOLD,
  EARLY_RETREAT_PINCH_PLAYER_DISTANCE,
  EARLY_RETREAT_PINCH_RETREAT_LATERAL_DISTANCE,
  EARLY_RETREAT_PINCH_REROLL_CUTOFF_SECONDS,
  MID_RUN_PROJECTED_STACK_ALIGNMENT_THRESHOLD,
  MID_RUN_PROJECTED_STACK_PLAYER_DISTANCE,
  MID_RUN_PROJECTED_STACK_REROLL_CUTOFF_SECONDS,
  MID_RUN_PROJECTED_STACK_REROLL_START_SECONDS,
  EARLY_THREAT_CROWDING_ALIGNMENT_THRESHOLD,
  EARLY_THREAT_CROWDING_DISTANCE,
  EARLY_THREAT_CROWDING_PENALTY,
  EARLY_THREAT_CROWDING_REROLL_CUTOFF_SECONDS,
  EARLY_FORWARD_SPAWN_ALIGNMENT_PENALTY,
  EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD,
  EARLY_FORWARD_SPAWN_REROLL_CUTOFF_SECONDS,
  OBSTACLE_COLLISION_RADIUS,
  getSpawnTargetPoint,
  isPointInsideArena,
  isPointOutsideCullBounds,
  OFFSCREEN_CULL_MARGIN,
  selectSpawnPoint,
  type SpawnEdge,
  type Point,
} from '../src/game/spawn.ts';

const BALANCE_SAMPLE_TIMES_SECONDS = [0, 5, 10, 15, 20, 30, 45, 60];
const SPAWN_COUNT_LIMITS_SECONDS = [10, 30, 60];
const PLAYER_SPEED = 260;
const EFFECTIVE_PLAYER_SPEED = 214;
const PLAYER_RADIUS = 16;
const MAX_SIMULATION_SECONDS = 40;
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
  spawnEdge: SpawnEdge;
  collisionReadyAtSeconds: number | null;
};

type SessionResult = {
  seed: number;
  survivalTimeSeconds: number;
  spawns: number;
  spawnRerolls: number;
};

export type SpawnTraceEvent = {
  spawnIndex: number;
  timeSeconds: number;
  spawnPoint: Point;
  rerollsUsed: number;
  playerPosition: Point;
  playerVelocity: Point;
  visibleObstacleCount: number;
  nearestVisibleObstacleDistancePx: number | null;
};

type SimulatedSessionResult = SessionResult & {
  spawnEvents: SpawnTraceEvent[];
};

export type BalanceSnapshotReport = {
  targetFirstDeathSeconds: number;
  firstSpawnAtSeconds: number;
  surgeObstacleUnlockSeconds: number;
  surgeObstacleCadence: number;
  surgeObstacleSpeedMultiplier: number;
  leadObstacleUnlockSeconds: number;
  leadObstacleCadence: number;
  leadObstacleTargetLeadSeconds: number;
  strafeObstacleUnlockSeconds: number;
  strafeObstacleCadence: number;
  strafeObstacleRotationDegrees: number;
  driftObstacleUnlockSeconds: number;
  driftObstacleCadence: number;
  driftObstacleRotationDegrees: number;
  echoObstacleUnlockSeconds: number;
  echoObstacleCadence: number;
  echoObstacleTargetLagSeconds: number;
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
    reachedSimulationCap: number;
  };
  averageSpawnCount: number;
  averageSpawnRerolls: number;
  sampleRuns: SessionResult[];
};

export type SeedTrajectoryReport = {
  seed: number;
  deathTimeSeconds: number;
  spawnsBeforeDeath: number;
  spawnRerollsBeforeDeath: number;
  spawnEvents: SpawnTraceEvent[];
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

const simulateSession = (seed: number, spawnTraceLimit = 0): SimulatedSessionResult => {
  const randomInt = createSeededRandom(seed);
  const player: Point = { x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 };
  const obstacles: Obstacle[] = [];
  const spawnEvents: SpawnTraceEvent[] = [];
  let playerVelocity: Vector = { x: 0, y: 0 };
  let nextDecisionAtSeconds = 0;
  let survivalTimeSeconds = 0;
  let nextSpawnAtSeconds = FIRST_SPAWN_DELAY_MS / 1000;
  let spawns = 0;
  let spawnRerolls = 0;

  while (survivalTimeSeconds < MAX_SIMULATION_SECONDS) {
    while (survivalTimeSeconds >= nextSpawnAtSeconds) {
      const visibleObstacleDistances = obstacles
        .filter((obstacle) => isPointInsideArena(obstacle, { margin: OBSTACLE_COLLISION_RADIUS }))
        .map((obstacle) => Math.hypot(obstacle.x - player.x, obstacle.y - player.y));
      const selection = selectSpawnPoint({
        survivalTimeSeconds,
        playerPosition: player,
        playerVelocity,
        playerReachabilityMargin: PLAYER_RADIUS,
        activeObstaclePositions: obstacles.map((obstacle) => ({
          x: obstacle.x,
          y: obstacle.y,
          collisionReady:
            obstacle.collisionReadyAtSeconds === null ||
            survivalTimeSeconds >= obstacle.collisionReadyAtSeconds,
          spawnEdge: obstacle.spawnEdge,
        })),
        randomInt,
      });
      const obstacleVariant = getObstacleVariant({
        survivalTimeSeconds,
        runSpawnCount: spawns + 1,
      });
      const speed =
        getObstacleSpeed(survivalTimeSeconds) * getObstacleSpeedMultiplier(obstacleVariant);
      const spawnTargetLagSeconds = getObstacleTargetLagSeconds({
        survivalTimeSeconds,
        variant: obstacleVariant,
      });
      const collisionGraceMs = getSpawnCollisionGraceMs(survivalTimeSeconds);
      const targetPoint = getSpawnTargetPoint({
        playerPosition: player,
        playerVelocity,
        playerReachabilityMargin: PLAYER_RADIUS,
        targetLagSeconds: spawnTargetLagSeconds,
      });
      const direction = getObstacleTravelDirection({
        spawnPoint: selection.point,
        targetPoint,
        playerVelocity,
        variant: obstacleVariant,
        runSpawnCount: spawns + 1,
      });

      obstacles.push({
        x: selection.point.x,
        y: selection.point.y,
        vx: direction.x * speed,
        vy: direction.y * speed,
        spawnEdge: getSpawnEdge(selection.point),
        collisionReadyAtSeconds:
          collisionGraceMs > 0 ? survivalTimeSeconds + collisionGraceMs / 1000 : null,
      });

      spawns += 1;
      spawnRerolls += selection.rerollsUsed;

      if (spawnEvents.length < spawnTraceLimit) {
        spawnEvents.push({
          spawnIndex: spawns,
          timeSeconds: round(survivalTimeSeconds),
          spawnPoint: {
            x: selection.point.x,
            y: selection.point.y,
          },
          rerollsUsed: selection.rerollsUsed,
          playerPosition: {
            x: round(player.x),
            y: round(player.y),
          },
          playerVelocity: {
            x: round(playerVelocity.x),
            y: round(playerVelocity.y),
          },
          visibleObstacleCount: visibleObstacleDistances.length,
          nearestVisibleObstacleDistancePx:
            visibleObstacleDistances.length > 0
              ? round(Math.min(...visibleObstacleDistances))
              : null,
        });
      }

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

      if (!isPointInsideArena(obstacle, { margin: OBSTACLE_COLLISION_RADIUS })) {
        continue;
      }

      const distance = Math.hypot(obstacle.x - player.x, obstacle.y - player.y);

      if (distance <= PLAYER_RADIUS + OBSTACLE_COLLISION_RADIUS) {
        return {
          seed,
          survivalTimeSeconds: round(survivalTimeSeconds),
          spawns,
          spawnRerolls,
          spawnEvents,
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
    spawnEvents,
  };
};

export const createBalanceSnapshotReport = (): BalanceSnapshotReport => {
  const longestLimit = Math.max(...SPAWN_COUNT_LIMITS_SECONDS);
  const simulated = simulateSpawns(longestLimit);

  return {
    targetFirstDeathSeconds: TARGET_FIRST_DEATH_SECONDS,
    firstSpawnAtSeconds: simulated.firstSpawnAt,
    surgeObstacleUnlockSeconds: SURGE_OBSTACLE_UNLOCK_SECONDS,
    surgeObstacleCadence: SURGE_OBSTACLE_CADENCE,
    surgeObstacleSpeedMultiplier: SURGE_OBSTACLE_SPEED_MULTIPLIER,
    strafeObstacleUnlockSeconds: STRAFE_OBSTACLE_UNLOCK_SECONDS,
    strafeObstacleCadence: STRAFE_OBSTACLE_CADENCE,
    strafeObstacleRotationDegrees: STRAFE_OBSTACLE_ROTATION_DEGREES,
    leadObstacleUnlockSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    leadObstacleCadence: LEAD_OBSTACLE_CADENCE,
    leadObstacleTargetLeadSeconds: LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
    driftObstacleUnlockSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS,
    driftObstacleCadence: DRIFT_OBSTACLE_CADENCE,
    driftObstacleRotationDegrees: DRIFT_OBSTACLE_ROTATION_DEGREES,
    echoObstacleUnlockSeconds: ECHO_OBSTACLE_UNLOCK_SECONDS,
    echoObstacleCadence: ECHO_OBSTACLE_CADENCE,
    echoObstacleTargetLagSeconds: ECHO_OBSTACLE_TARGET_LAG_SECONDS,
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
    controller: `center-seeking avoidance heuristic with 180ms reaction interval, +${OPENING_REQUIRED_SPAWN_DISTANCE_BONUS}px opening spawn distance through ${OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS}s, projected-path forward-alignment rerolls above ${EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD.toFixed(1)} dot through ${EARLY_FORWARD_SPAWN_REROLL_CUTOFF_SECONDS}s (${EARLY_FORWARD_SPAWN_ALIGNMENT_PENALTY}px-equivalent penalty), projected-path lane-stack rerolls within ${EARLY_LANE_STACK_DISTANCE}px above ${EARLY_LANE_STACK_ALIGNMENT_THRESHOLD.toFixed(2)} dot through ${EARLY_LANE_STACK_REROLL_CUTOFF_SECONDS}s (${EARLY_LANE_STACK_PENALTY}px-equivalent penalty), projected-path threat-crowding rerolls within ${EARLY_THREAT_CROWDING_DISTANCE}px above ${EARLY_THREAT_CROWDING_ALIGNMENT_THRESHOLD.toFixed(1)} dot through ${EARLY_THREAT_CROWDING_REROLL_CUTOFF_SECONDS}s (${EARLY_THREAT_CROWDING_PENALTY}px-equivalent penalty), same-edge spawn-column rerolls within ${EARLY_SPAWN_EDGE_CLUSTER_LATERAL_DISTANCE}px lateral / ${EARLY_SPAWN_EDGE_CLUSTER_DEPTH}px depth through ${EARLY_SPAWN_EDGE_CLUSTER_REROLL_CUTOFF_SECONDS}s (${EARLY_SPAWN_EDGE_CLUSTER_PENALTY}px-equivalent penalty), near-player same-edge rerolls within ${EARLY_PRESSURED_SAME_EDGE_PLAYER_DISTANCE}px and ${EARLY_PRESSURED_SAME_EDGE_LATERAL_DISTANCE}px lateral below score ${EARLY_PRESSURED_SPAWN_ACCEPT_SCORE} through ${EARLY_PRESSURED_SPAWN_REROLL_CUTOFF_SECONDS}s, deep same-side follow-up sweeps stay reroll-eligible out to ${EARLY_PRESSURED_SAME_SIDE_LATERAL_DISTANCE}px, retreat-pinch rerolls within ${EARLY_RETREAT_PINCH_PLAYER_DISTANCE}px above ${EARLY_RETREAT_PINCH_ALIGNMENT_THRESHOLD.toFixed(2)} forward alignment when the new spawn seals the rear lane within ${EARLY_RETREAT_PINCH_RETREAT_LATERAL_DISTANCE}px through ${EARLY_RETREAT_PINCH_REROLL_CUTOFF_SECONDS}s, mid-run projected-stack rerolls within ${MID_RUN_PROJECTED_STACK_PLAYER_DISTANCE}px above ${MID_RUN_PROJECTED_STACK_ALIGNMENT_THRESHOLD.toFixed(2)} alignment from ${MID_RUN_PROJECTED_STACK_REROLL_START_SECONDS}s to ${MID_RUN_PROJECTED_STACK_REROLL_CUTOFF_SECONDS}s, strafe obstacles every ${STRAFE_OBSTACLE_CADENCE}th spawn from ${STRAFE_OBSTACLE_UNLOCK_SECONDS}s with ${STRAFE_OBSTACLE_ROTATION_DEGREES}deg cross-lane travel, surge obstacles every ${SURGE_OBSTACLE_CADENCE}th spawn from ${SURGE_OBSTACLE_UNLOCK_SECONDS}s with ${SURGE_OBSTACLE_SPEED_MULTIPLIER.toFixed(2)}x speed, killbox onset forces a ${KILLBOX_FORCED_LEAD_WINDOW_SECONDS.toFixed(1)}s lead cut with ${KILLBOX_FORCED_LEAD_TARGET_LEAD_SECONDS.toFixed(2)}s forward target lead, then a ${KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_SECONDS.toFixed(1)}s echo follow-through with ${KILLBOX_ECHO_FOLLOW_THROUGH_ROTATION_DEGREES}deg scissor travel, a ${KILLBOX_ECHO_BRIDGE_WINDOW_SECONDS.toFixed(1)}s bridge echo at ${KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS.toFixed(1)}s with ${KILLBOX_ECHO_BRIDGE_ROTATION_DEGREES}deg travel, and a ${KILLBOX_ECHO_HANDOFF_WINDOW_SECONDS.toFixed(1)}s echo lock-in from ${ECHO_OBSTACLE_UNLOCK_SECONDS}s with ${KILLBOX_ECHO_HANDOFF_ROTATION_DEGREES}deg travel before killbox cadence echoes keep ${KILLBOX_ECHO_CADENCE_ROTATION_DEGREES}deg lane-fold travel through ${DRIFT_OBSTACLE_UNLOCK_SECONDS}s, lead obstacles every ${LEAD_OBSTACLE_CADENCE}th spawn from ${LEAD_OBSTACLE_UNLOCK_SECONDS}s with ${LEAD_OBSTACLE_TARGET_LEAD_SECONDS.toFixed(2)}s forward target lead, echo obstacles every ${ECHO_OBSTACLE_CADENCE}th spawn from ${ECHO_OBSTACLE_UNLOCK_SECONDS}s with ${ECHO_OBSTACLE_TARGET_LAG_SECONDS.toFixed(2)}s target lag, drift obstacles every ${DRIFT_OBSTACLE_CADENCE}th spawn from ${DRIFT_OBSTACLE_UNLOCK_SECONDS}s with alternating ${DRIFT_OBSTACLE_ROTATION_DEGREES}deg travel rotation, ${EARLY_SPAWN_TARGET_LAG_SECONDS.toFixed(2)}s early spawn target lag through ${EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS}s, ${EARLY_SPAWN_COLLISION_GRACE_MS}ms collision grace through ${EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS}s, ${OBSTACLE_COLLISION_RADIUS}px visible-arena hit margin, and ${OFFSCREEN_CULL_MARGIN}px offscreen cull margin`,
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
      reachedSimulationCap: results.filter(
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

export const createSeedTrajectoryReport = (
  seed: number,
  spawnTraceLimit = 6,
): SeedTrajectoryReport => {
  const result = simulateSession(seed, spawnTraceLimit);

  return {
    seed: result.seed,
    deathTimeSeconds: result.survivalTimeSeconds,
    spawnsBeforeDeath: result.spawns,
    spawnRerollsBeforeDeath: result.spawnRerolls,
    spawnEvents: result.spawnEvents,
  };
};
