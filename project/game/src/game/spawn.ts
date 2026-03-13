import { EARLY_SPAWN_TARGET_LAG_SECONDS, getRequiredSpawnDistance } from './balance.ts';

export const ARENA_WIDTH = 800;
export const ARENA_HEIGHT = 600;
export const OBSTACLE_COLLISION_RADIUS = 11;
export const SPAWN_MARGIN = 56;
export const MAX_SPAWN_REROLLS = 6;
export const OFFSCREEN_CULL_MARGIN = 96;
export const EARLY_FORWARD_SPAWN_REROLL_CUTOFF_SECONDS = 6;
export const EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD = 0.5;
export const EARLY_FORWARD_SPAWN_ALIGNMENT_PENALTY = 80;
export const EARLY_LANE_STACK_REROLL_CUTOFF_SECONDS = 6;
export const EARLY_LANE_STACK_DISTANCE = 160;
export const EARLY_LANE_STACK_ALIGNMENT_THRESHOLD = 0.55;
export const EARLY_LANE_STACK_PENALTY = 120;
export const EARLY_THREAT_CROWDING_REROLL_CUTOFF_SECONDS = 6;
export const EARLY_THREAT_CROWDING_DISTANCE = 110;
export const EARLY_THREAT_CROWDING_ALIGNMENT_THRESHOLD = 0.7;
export const EARLY_THREAT_CROWDING_PENALTY = 160;

export type Point = {
  x: number;
  y: number;
};

type ArenaContainmentOptions = {
  margin?: number;
};

type SpawnSelectionParams = {
  survivalTimeSeconds: number;
  playerPosition: Point;
  playerVelocity?: Point;
  playerReachabilityMargin?: number;
  activeObstaclePositions?: Point[];
  randomInt: (min: number, max: number) => number;
};

export const clampPointToArena = (
  point: Point,
  options: ArenaContainmentOptions = {},
): Point => {
  const margin = options.margin ?? 0;

  return {
    x: Math.min(Math.max(point.x, margin), ARENA_WIDTH - margin),
    y: Math.min(Math.max(point.y, margin), ARENA_HEIGHT - margin),
  };
};

const getReachableVelocity = (
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin = 0,
): Point | undefined => {
  if (!playerVelocity) {
    return undefined;
  }

  const clampedVelocity = { ...playerVelocity };

  if (
    (playerPosition.x <= playerReachabilityMargin && clampedVelocity.x < 0) ||
    (playerPosition.x >= ARENA_WIDTH - playerReachabilityMargin && clampedVelocity.x > 0)
  ) {
    clampedVelocity.x = 0;
  }

  if (
    (playerPosition.y <= playerReachabilityMargin && clampedVelocity.y < 0) ||
    (playerPosition.y >= ARENA_HEIGHT - playerReachabilityMargin && clampedVelocity.y > 0)
  ) {
    clampedVelocity.y = 0;
  }

  if (clampedVelocity.x === 0 && clampedVelocity.y === 0) {
    return undefined;
  }

  return clampedVelocity;
};

const getProjectedPathReference = (
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin = 0,
): Point => {
  if (!playerVelocity || (playerVelocity.x === 0 && playerVelocity.y === 0)) {
    return clampPointToArena(playerPosition, { margin: playerReachabilityMargin });
  }

  return clampPointToArena(
    {
      x: playerPosition.x + playerVelocity.x * EARLY_SPAWN_TARGET_LAG_SECONDS,
      y: playerPosition.y + playerVelocity.y * EARLY_SPAWN_TARGET_LAG_SECONDS,
    },
    { margin: playerReachabilityMargin },
  );
};

const normalize = (point: Point): Point => {
  const magnitude = Math.hypot(point.x, point.y);

  if (magnitude === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: point.x / magnitude,
    y: point.y / magnitude,
  };
};

export const getSpawnFairnessScore = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  spawnPoint: Point,
): number => {
  const requiredDistance = getRequiredSpawnDistance(survivalTimeSeconds);
  const dx = spawnPoint.x - playerPosition.x;
  const dy = spawnPoint.y - playerPosition.y;
  const actualDistance = Math.hypot(dx, dy);

  return actualDistance - requiredDistance;
};

const getForwardSpawnPenalty = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin: number | undefined,
  spawnPoint: Point,
): number => {
  if (
    survivalTimeSeconds > EARLY_FORWARD_SPAWN_REROLL_CUTOFF_SECONDS ||
    !playerVelocity ||
    (playerVelocity.x === 0 && playerVelocity.y === 0)
  ) {
    return 0;
  }

  const forwardReference = getProjectedPathReference(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );
  const movementDirection = normalize(playerVelocity);
  const spawnDirection = normalize({
    x: spawnPoint.x - forwardReference.x,
    y: spawnPoint.y - forwardReference.y,
  });
  const alignment = movementDirection.x * spawnDirection.x + movementDirection.y * spawnDirection.y;

  if (alignment <= EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD) {
    return 0;
  }

  return (alignment - EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD) * EARLY_FORWARD_SPAWN_ALIGNMENT_PENALTY;
};

const getLaneStackPenalty = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin: number | undefined,
  activeObstaclePositions: Point[] | undefined,
  spawnPoint: Point,
): number => {
  if (survivalTimeSeconds > EARLY_LANE_STACK_REROLL_CUTOFF_SECONDS || !activeObstaclePositions?.length) {
    return 0;
  }

  const laneStackReference = getProjectedPathReference(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );
  const spawnDirection = normalize({
    x: spawnPoint.x - laneStackReference.x,
    y: spawnPoint.y - laneStackReference.y,
  });

  return activeObstaclePositions.reduce((totalPenalty, obstaclePosition) => {
    if (!isPointInsideArena(obstaclePosition, { margin: OBSTACLE_COLLISION_RADIUS })) {
      return totalPenalty;
    }

    const obstacleVector = {
      x: obstaclePosition.x - laneStackReference.x,
      y: obstaclePosition.y - laneStackReference.y,
    };
    const obstacleDistance = Math.hypot(obstacleVector.x, obstacleVector.y);

    if (obstacleDistance === 0 || obstacleDistance > EARLY_LANE_STACK_DISTANCE) {
      return totalPenalty;
    }

    const obstacleDirection = normalize(obstacleVector);
    const alignment =
      obstacleDirection.x * spawnDirection.x + obstacleDirection.y * spawnDirection.y;

    if (alignment <= EARLY_LANE_STACK_ALIGNMENT_THRESHOLD) {
      return totalPenalty;
    }

    return (
      totalPenalty +
      ((alignment - EARLY_LANE_STACK_ALIGNMENT_THRESHOLD) /
        (1 - EARLY_LANE_STACK_ALIGNMENT_THRESHOLD)) *
        ((EARLY_LANE_STACK_DISTANCE - obstacleDistance) / EARLY_LANE_STACK_DISTANCE) *
        EARLY_LANE_STACK_PENALTY
    );
  }, 0);
};

const getThreatCrowdingPenalty = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin: number | undefined,
  activeObstaclePositions: Point[] | undefined,
  spawnPoint: Point,
): number => {
  if (
    survivalTimeSeconds > EARLY_THREAT_CROWDING_REROLL_CUTOFF_SECONDS ||
    !activeObstaclePositions?.length
  ) {
    return 0;
  }

  const threatReference = getProjectedPathReference(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );
  const spawnDirection = normalize({
    x: spawnPoint.x - threatReference.x,
    y: spawnPoint.y - threatReference.y,
  });

  return activeObstaclePositions.reduce((totalPenalty, obstaclePosition) => {
    if (!isPointInsideArena(obstaclePosition, { margin: OBSTACLE_COLLISION_RADIUS })) {
      return totalPenalty;
    }

    const obstacleVector = {
      x: obstaclePosition.x - threatReference.x,
      y: obstaclePosition.y - threatReference.y,
    };
    const obstacleDistance = Math.hypot(obstacleVector.x, obstacleVector.y);

    if (obstacleDistance === 0 || obstacleDistance > EARLY_THREAT_CROWDING_DISTANCE) {
      return totalPenalty;
    }

    const obstacleDirection = normalize(obstacleVector);
    const alignment =
      obstacleDirection.x * spawnDirection.x + obstacleDirection.y * spawnDirection.y;

    if (alignment <= EARLY_THREAT_CROWDING_ALIGNMENT_THRESHOLD) {
      return totalPenalty;
    }

    return (
      totalPenalty +
      ((alignment - EARLY_THREAT_CROWDING_ALIGNMENT_THRESHOLD) /
        (1 - EARLY_THREAT_CROWDING_ALIGNMENT_THRESHOLD)) *
        ((EARLY_THREAT_CROWDING_DISTANCE - obstacleDistance) /
          EARLY_THREAT_CROWDING_DISTANCE) *
        EARLY_THREAT_CROWDING_PENALTY
    );
  }, 0);
};

export const rollSpawnPoint = (randomInt: (min: number, max: number) => number): Point => {
  const edge = randomInt(0, 3);

  if (edge === 0) {
    return { x: randomInt(0, ARENA_WIDTH), y: -SPAWN_MARGIN };
  }

  if (edge === 1) {
    return { x: ARENA_WIDTH + SPAWN_MARGIN, y: randomInt(0, ARENA_HEIGHT) };
  }

  if (edge === 2) {
    return { x: randomInt(0, ARENA_WIDTH), y: ARENA_HEIGHT + SPAWN_MARGIN };
  }

  return { x: -SPAWN_MARGIN, y: randomInt(0, ARENA_HEIGHT) };
};

export const isPointInsideArena = (
  point: Point,
  options: ArenaContainmentOptions = {},
): boolean => {
  const margin = options.margin ?? 0;

  return (
    point.x >= margin &&
    point.x <= ARENA_WIDTH - margin &&
    point.y >= margin &&
    point.y <= ARENA_HEIGHT - margin
  );
};

export const isPointOutsideCullBounds = (point: Point): boolean =>
  point.x < -OFFSCREEN_CULL_MARGIN ||
  point.x > ARENA_WIDTH + OFFSCREEN_CULL_MARGIN ||
  point.y < -OFFSCREEN_CULL_MARGIN ||
  point.y > ARENA_HEIGHT + OFFSCREEN_CULL_MARGIN;

export const selectSpawnPoint = ({
  survivalTimeSeconds,
  playerPosition,
  playerVelocity,
  playerReachabilityMargin,
  activeObstaclePositions,
  randomInt,
}: SpawnSelectionParams): { point: Point; rerollsUsed: number } => {
  const reachableVelocity = getReachableVelocity(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );
  let selectedSpawnPoint = rollSpawnPoint(randomInt);
  let bestScore =
    getSpawnFairnessScore(survivalTimeSeconds, playerPosition, selectedSpawnPoint) -
    getForwardSpawnPenalty(
      survivalTimeSeconds,
      playerPosition,
      reachableVelocity,
      playerReachabilityMargin,
      selectedSpawnPoint,
    ) -
    getLaneStackPenalty(
      survivalTimeSeconds,
      playerPosition,
      reachableVelocity,
      playerReachabilityMargin,
      activeObstaclePositions,
      selectedSpawnPoint,
    ) -
    getThreatCrowdingPenalty(
      survivalTimeSeconds,
      playerPosition,
      reachableVelocity,
      playerReachabilityMargin,
      activeObstaclePositions,
      selectedSpawnPoint,
    );

  if (bestScore >= 0) {
    return { point: selectedSpawnPoint, rerollsUsed: 0 };
  }

  let rerollsUsed = 0;

  for (let attempt = 0; attempt < MAX_SPAWN_REROLLS; attempt += 1) {
    rerollsUsed += 1;

    const candidate = rollSpawnPoint(randomInt);
    const candidateScore =
      getSpawnFairnessScore(survivalTimeSeconds, playerPosition, candidate) -
      getForwardSpawnPenalty(
        survivalTimeSeconds,
        playerPosition,
        reachableVelocity,
        playerReachabilityMargin,
        candidate,
      ) -
      getLaneStackPenalty(
        survivalTimeSeconds,
        playerPosition,
        reachableVelocity,
        playerReachabilityMargin,
        activeObstaclePositions,
        candidate,
      ) -
      getThreatCrowdingPenalty(
        survivalTimeSeconds,
        playerPosition,
        reachableVelocity,
        playerReachabilityMargin,
        activeObstaclePositions,
        candidate,
      );

    if (candidateScore > bestScore) {
      selectedSpawnPoint = candidate;
      bestScore = candidateScore;
    }

    if (candidateScore >= 0) {
      return { point: candidate, rerollsUsed };
    }
  }

  return { point: selectedSpawnPoint, rerollsUsed };
};
