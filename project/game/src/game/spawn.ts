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
export const EARLY_SPAWN_EDGE_CLUSTER_REROLL_CUTOFF_SECONDS = 6;
export const EARLY_SPAWN_EDGE_CLUSTER_LATERAL_DISTANCE = 96;
export const EARLY_SPAWN_EDGE_CLUSTER_DEPTH = 140;
export const EARLY_SPAWN_EDGE_CLUSTER_PENALTY = 180;
export const EARLY_PRESSURED_SPAWN_REROLL_CUTOFF_SECONDS = 6;
export const EARLY_PRESSURED_SPAWN_ACCEPT_SCORE = 190;
export const EARLY_PRESSURED_SAME_EDGE_PLAYER_DISTANCE = 96;
export const EARLY_PRESSURED_SAME_EDGE_LATERAL_DISTANCE = 180;
export const EARLY_PRESSURED_SAME_SIDE_LATERAL_DISTANCE = 340;
export const EARLY_RETREAT_PINCH_REROLL_CUTOFF_SECONDS = 10;
export const EARLY_RETREAT_PINCH_PLAYER_DISTANCE = 60;
export const EARLY_RETREAT_PINCH_ALIGNMENT_THRESHOLD = 0.35;
export const EARLY_RETREAT_PINCH_RETREAT_LATERAL_DISTANCE = 200;
export const MID_RUN_PROJECTED_STACK_REROLL_START_SECONDS = 10;
export const MID_RUN_PROJECTED_STACK_REROLL_CUTOFF_SECONDS = 13;
export const MID_RUN_PROJECTED_STACK_PLAYER_DISTANCE = 75;
export const MID_RUN_PROJECTED_STACK_ALIGNMENT_THRESHOLD = 0.92;

export type Point = {
  x: number;
  y: number;
};

type ArenaContainmentOptions = {
  margin?: number;
};

type SpawnScore = {
  fairness: number;
  totalPenalty: number;
  score: number;
};

type SpawnSelectionParams = {
  survivalTimeSeconds: number;
  playerPosition: Point;
  playerVelocity?: Point;
  playerReachabilityMargin?: number;
  activeObstaclePositions?: ActiveObstaclePosition[];
  randomInt: (min: number, max: number) => number;
};

export type SpawnEdge = 'top' | 'right' | 'bottom' | 'left';

export type ActiveObstaclePosition = Point & {
  spawnEdge?: SpawnEdge;
};

const CORNER_EDGE_SHARE_TOLERANCE = 8;
const TIME_CUTOFF_EPSILON_SECONDS = 1e-6;

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

export const getReachableVelocity = (
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

export const getSpawnTargetPoint = ({
  playerPosition,
  playerVelocity,
  playerReachabilityMargin = 0,
  targetLagSeconds,
}: {
  playerPosition: Point;
  playerVelocity: Point | undefined;
  playerReachabilityMargin?: number;
  targetLagSeconds: number;
}): Point => {
  const reachableVelocity = getReachableVelocity(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );

  if (!reachableVelocity) {
    return clampPointToArena(playerPosition, { margin: playerReachabilityMargin });
  }

  return clampPointToArena(
    {
      x: playerPosition.x - reachableVelocity.x * targetLagSeconds,
      y: playerPosition.y - reachableVelocity.y * targetLagSeconds,
    },
    { margin: playerReachabilityMargin },
  );
};

const getProjectedPathReference = (
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin = 0,
): Point => {
  if (!playerVelocity || (playerVelocity.x === 0 && playerVelocity.y === 0)) {
    return clampPointToArena(playerPosition, { margin: playerReachabilityMargin });
  }

  return getSpawnTargetPoint({
    playerPosition,
    playerVelocity: {
      x: -playerVelocity.x,
      y: -playerVelocity.y,
    },
    playerReachabilityMargin,
    targetLagSeconds: EARLY_SPAWN_TARGET_LAG_SECONDS,
  });
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

const dot = (left: Point, right: Point): number => left.x * right.x + left.y * right.y;

const isWithinTimeCutoff = (survivalTimeSeconds: number, cutoffSeconds: number): boolean =>
  survivalTimeSeconds <= cutoffSeconds + TIME_CUTOFF_EPSILON_SECONDS;

export const getSpawnEdge = (spawnPoint: Point): SpawnEdge => {
  if (spawnPoint.y < 0) {
    return 'top';
  }

  if (spawnPoint.x > ARENA_WIDTH) {
    return 'right';
  }

  if (spawnPoint.y > ARENA_HEIGHT) {
    return 'bottom';
  }

  return 'left';
};

const getClosestArenaEdge = (point: Point): SpawnEdge => {
  const distances: Array<{ edge: SpawnEdge; distance: number }> = [
    { edge: 'top', distance: Math.abs(point.y) },
    { edge: 'right', distance: Math.abs(ARENA_WIDTH - point.x) },
    { edge: 'bottom', distance: Math.abs(ARENA_HEIGHT - point.y) },
    { edge: 'left', distance: Math.abs(point.x) },
  ];

  return distances.reduce((closest, candidate) =>
    candidate.distance < closest.distance ? candidate : closest,
  ).edge;
};

const getArenaEdgeDistance = (point: Point, edge: SpawnEdge): number => {
  if (edge === 'top') {
    return Math.abs(point.y);
  }

  if (edge === 'right') {
    return Math.abs(ARENA_WIDTH - point.x);
  }

  if (edge === 'bottom') {
    return Math.abs(ARENA_HEIGHT - point.y);
  }

  return Math.abs(point.x);
};

const sharesSpawnEdge = (point: Point, edge: SpawnEdge): boolean => {
  const closestEdge = getClosestArenaEdge(point);

  if (closestEdge === edge) {
    return true;
  }

  return getArenaEdgeDistance(point, edge) - getArenaEdgeDistance(point, closestEdge) <=
    CORNER_EDGE_SHARE_TOLERANCE;
};

const getSpawnEdgeOffset = (point: Point, edge: SpawnEdge): { lateral: number; depth: number } => {
  if (edge === 'top') {
    return {
      lateral: point.x,
      depth: point.y,
    };
  }

  if (edge === 'right') {
    return {
      lateral: point.y,
      depth: ARENA_WIDTH - point.x,
    };
  }

  if (edge === 'bottom') {
    return {
      lateral: point.x,
      depth: ARENA_HEIGHT - point.y,
    };
  }

  return {
    lateral: point.y,
    depth: point.x,
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

const doesObstacleOccupySpawnEdge = (
  obstaclePosition: ActiveObstaclePosition,
  spawnEdge: SpawnEdge,
): boolean => {
  if (!sharesSpawnEdge(obstaclePosition, spawnEdge)) {
    return false;
  }

  if (!obstaclePosition.spawnEdge) {
    return true;
  }

  const dominantEdge = getClosestArenaEdge(obstaclePosition);

  return (
    obstaclePosition.spawnEdge === spawnEdge ||
    dominantEdge === obstaclePosition.spawnEdge
  );
};

const getSpawnEdgeClusterPenalty = (
  survivalTimeSeconds: number,
  activeObstaclePositions: ActiveObstaclePosition[] | undefined,
  spawnPoint: Point,
): number => {
  if (
    survivalTimeSeconds > EARLY_SPAWN_EDGE_CLUSTER_REROLL_CUTOFF_SECONDS ||
    !activeObstaclePositions?.length
  ) {
    return 0;
  }

  const spawnEdge = getSpawnEdge(spawnPoint);
  const spawnOffset = getSpawnEdgeOffset(spawnPoint, spawnEdge);

  return activeObstaclePositions.reduce((totalPenalty, obstaclePosition) => {
    if (!doesObstacleOccupySpawnEdge(obstaclePosition, spawnEdge)) {
      return totalPenalty;
    }

    if (!isPointInsideArena(obstaclePosition, { margin: OBSTACLE_COLLISION_RADIUS })) {
      return totalPenalty;
    }

    const obstacleOffset = getSpawnEdgeOffset(obstaclePosition, spawnEdge);

    const lateralDistance = Math.abs(obstacleOffset.lateral - spawnOffset.lateral);

    if (lateralDistance > EARLY_SPAWN_EDGE_CLUSTER_LATERAL_DISTANCE) {
      return totalPenalty;
    }

    if (obstacleOffset.depth > EARLY_SPAWN_EDGE_CLUSTER_DEPTH) {
      return totalPenalty;
    }

    return (
      totalPenalty +
      ((EARLY_SPAWN_EDGE_CLUSTER_LATERAL_DISTANCE - lateralDistance) /
        EARLY_SPAWN_EDGE_CLUSTER_LATERAL_DISTANCE) *
        ((EARLY_SPAWN_EDGE_CLUSTER_DEPTH - Math.max(obstacleOffset.depth, 0)) /
          EARLY_SPAWN_EDGE_CLUSTER_DEPTH) *
        EARLY_SPAWN_EDGE_CLUSTER_PENALTY
    );
  }, 0);
};

const hasPressuredSameEdgeNearPlayer = (
  playerPosition: Point,
  activeObstaclePositions: ActiveObstaclePosition[] | undefined,
  spawnPoint: Point,
): boolean => {
  if (!activeObstaclePositions?.length) {
    return false;
  }

  const spawnEdge = getSpawnEdge(spawnPoint);
  const spawnOffset = getSpawnEdgeOffset(spawnPoint, spawnEdge);
  const playerOffset = getSpawnEdgeOffset(playerPosition, spawnEdge);
  const candidatePlayerLateralDelta = spawnOffset.lateral - playerOffset.lateral;

  return activeObstaclePositions.some((obstaclePosition) => {
    if (!isPointInsideArena(obstaclePosition, { margin: OBSTACLE_COLLISION_RADIUS })) {
      return false;
    }

    const occupiesSpawnEdge = doesObstacleOccupySpawnEdge(obstaclePosition, spawnEdge);
    const matchesSpawnOrigin = obstaclePosition.spawnEdge === spawnEdge;

    if (!occupiesSpawnEdge && !matchesSpawnOrigin) {
      return false;
    }

    const playerDistance = Math.hypot(
      obstaclePosition.x - playerPosition.x,
      obstaclePosition.y - playerPosition.y,
    );

    if (playerDistance > EARLY_PRESSURED_SAME_EDGE_PLAYER_DISTANCE) {
      return false;
    }

    const obstacleOffset = getSpawnEdgeOffset(obstaclePosition, spawnEdge);
    const obstaclePlayerLateralDelta = obstacleOffset.lateral - playerOffset.lateral;
    const lateralDistance = Math.abs(obstacleOffset.lateral - spawnOffset.lateral);

    if (occupiesSpawnEdge && lateralDistance <= EARLY_PRESSURED_SAME_EDGE_LATERAL_DISTANCE) {
      return true;
    }

    if (
      occupiesSpawnEdge ||
      !matchesSpawnOrigin ||
      playerOffset.depth <= EARLY_SPAWN_EDGE_CLUSTER_DEPTH ||
      obstacleOffset.depth < playerOffset.depth
    ) {
      return false;
    }

    const sharesPlayerSide =
      Math.sign(obstaclePlayerLateralDelta) === Math.sign(candidatePlayerLateralDelta) &&
      obstaclePlayerLateralDelta !== 0 &&
      candidatePlayerLateralDelta !== 0;

    if (!sharesPlayerSide) {
      return false;
    }

    return (
      Math.abs(candidatePlayerLateralDelta) >= Math.abs(obstaclePlayerLateralDelta) &&
      Math.abs(candidatePlayerLateralDelta) <= EARLY_PRESSURED_SAME_SIDE_LATERAL_DISTANCE
    );
  });
};

const getSpawnScore = ({
  survivalTimeSeconds,
  playerPosition,
  playerVelocity,
  playerReachabilityMargin,
  activeObstaclePositions,
  spawnPoint,
}: Omit<SpawnSelectionParams, 'randomInt'> & { spawnPoint: Point }): SpawnScore => {
  const fairness = getSpawnFairnessScore(survivalTimeSeconds, playerPosition, spawnPoint);
  const reachableVelocity = getReachableVelocity(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );
  const forwardPenalty = getForwardSpawnPenalty(
    survivalTimeSeconds,
    playerPosition,
    reachableVelocity,
    playerReachabilityMargin,
    spawnPoint,
  );
  const laneStackPenalty = getLaneStackPenalty(
    survivalTimeSeconds,
    playerPosition,
    reachableVelocity,
    playerReachabilityMargin,
    activeObstaclePositions,
    spawnPoint,
  );
  const threatCrowdingPenalty = getThreatCrowdingPenalty(
    survivalTimeSeconds,
    playerPosition,
    reachableVelocity,
    playerReachabilityMargin,
    activeObstaclePositions,
    spawnPoint,
  );
  const spawnEdgeClusterPenalty = getSpawnEdgeClusterPenalty(
    survivalTimeSeconds,
    activeObstaclePositions,
    spawnPoint,
  );
  const totalPenalty =
    forwardPenalty + laneStackPenalty + threatCrowdingPenalty + spawnEdgeClusterPenalty;

  return {
    fairness,
    totalPenalty,
    score: fairness - totalPenalty,
  };
};

const shouldKeepRerollingForOpeningPressure = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  activeObstaclePositions: ActiveObstaclePosition[] | undefined,
  spawnPoint: Point,
  spawnScore: SpawnScore,
): boolean =>
  survivalTimeSeconds <= EARLY_PRESSURED_SPAWN_REROLL_CUTOFF_SECONDS &&
  hasPressuredSameEdgeNearPlayer(playerPosition, activeObstaclePositions, spawnPoint) &&
  spawnScore.score < EARLY_PRESSURED_SPAWN_ACCEPT_SCORE;

const hasMidRunProjectedStackThreat = (
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin: number | undefined,
  activeObstaclePositions: ActiveObstaclePosition[] | undefined,
  spawnPoint: Point,
): boolean => {
  if (
    !playerVelocity ||
    (playerVelocity.x === 0 && playerVelocity.y === 0) ||
    !activeObstaclePositions?.length
  ) {
    return false;
  }

  const threatReference = getProjectedPathReference(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
  );
  const spawnVector = {
    x: spawnPoint.x - threatReference.x,
    y: spawnPoint.y - threatReference.y,
  };
  const spawnDistance = Math.hypot(spawnVector.x, spawnVector.y);

  if (spawnDistance === 0) {
    return false;
  }

  const spawnDirection = normalize(spawnVector);

  return activeObstaclePositions.some((obstaclePosition) => {
    if (!isPointInsideArena(obstaclePosition, { margin: OBSTACLE_COLLISION_RADIUS })) {
      return false;
    }

    const playerDistance = Math.hypot(
      obstaclePosition.x - playerPosition.x,
      obstaclePosition.y - playerPosition.y,
    );

    if (playerDistance > MID_RUN_PROJECTED_STACK_PLAYER_DISTANCE) {
      return false;
    }

    const obstacleVector = {
      x: obstaclePosition.x - threatReference.x,
      y: obstaclePosition.y - threatReference.y,
    };
    const obstacleDistance = Math.hypot(obstacleVector.x, obstacleVector.y);

    if (obstacleDistance === 0) {
      return false;
    }

    return (
      dot(normalize(obstacleVector), spawnDirection) >= MID_RUN_PROJECTED_STACK_ALIGNMENT_THRESHOLD
    );
  });
};

const shouldKeepRerollingForMidRunProjectedStack = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  playerVelocity: Point | undefined,
  playerReachabilityMargin: number | undefined,
  activeObstaclePositions: ActiveObstaclePosition[] | undefined,
  spawnPoint: Point,
): boolean =>
  survivalTimeSeconds > MID_RUN_PROJECTED_STACK_REROLL_START_SECONDS &&
  survivalTimeSeconds <= MID_RUN_PROJECTED_STACK_REROLL_CUTOFF_SECONDS &&
  hasMidRunProjectedStackThreat(
    playerPosition,
    playerVelocity,
    playerReachabilityMargin,
    activeObstaclePositions,
    spawnPoint,
  );

const hasRetreatPinchThreat = (
  playerPosition: Point,
  playerVelocity: Point | undefined,
  activeObstaclePositions: ActiveObstaclePosition[] | undefined,
  spawnPoint: Point,
): boolean => {
  if (
    !playerVelocity ||
    (playerVelocity.x === 0 && playerVelocity.y === 0) ||
    !activeObstaclePositions?.length
  ) {
    return false;
  }

  const movementDirection = normalize(playerVelocity);
  const spawnRetreatVector = {
    x: spawnPoint.x - playerPosition.x,
    y: spawnPoint.y - playerPosition.y,
  };
  const retreatDistance = Math.hypot(spawnRetreatVector.x, spawnRetreatVector.y);

  if (retreatDistance === 0) {
    return false;
  }

  const normalizedRetreatVector = normalize(spawnRetreatVector);
  const retreatAlignment = dot(normalizedRetreatVector, movementDirection);

  if (retreatAlignment > -EARLY_RETREAT_PINCH_ALIGNMENT_THRESHOLD) {
    return false;
  }

  const retreatForwardDistance = Math.abs(dot(spawnRetreatVector, movementDirection));
  const retreatLateralDistance = Math.sqrt(
    Math.max(0, retreatDistance * retreatDistance - retreatForwardDistance * retreatForwardDistance),
  );

  if (retreatLateralDistance > EARLY_RETREAT_PINCH_RETREAT_LATERAL_DISTANCE) {
    return false;
  }

  return activeObstaclePositions.some((obstaclePosition) => {
    if (!isPointInsideArena(obstaclePosition, { margin: OBSTACLE_COLLISION_RADIUS })) {
      return false;
    }

    const threatVector = {
      x: obstaclePosition.x - playerPosition.x,
      y: obstaclePosition.y - playerPosition.y,
    };
    const threatDistance = Math.hypot(threatVector.x, threatVector.y);

    if (threatDistance === 0 || threatDistance > EARLY_RETREAT_PINCH_PLAYER_DISTANCE) {
      return false;
    }

    const threatAlignment = dot(normalize(threatVector), movementDirection);

    return threatAlignment >= EARLY_RETREAT_PINCH_ALIGNMENT_THRESHOLD;
  });
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
  let bestSpawnScore = getSpawnScore({
    survivalTimeSeconds,
    playerPosition,
    playerVelocity: reachableVelocity,
    playerReachabilityMargin,
    activeObstaclePositions,
    spawnPoint: selectedSpawnPoint,
  });

  if (
    bestSpawnScore.score >= 0 &&
    !(
      isWithinTimeCutoff(survivalTimeSeconds, EARLY_RETREAT_PINCH_REROLL_CUTOFF_SECONDS) &&
      hasRetreatPinchThreat(
        playerPosition,
        reachableVelocity,
        activeObstaclePositions,
        selectedSpawnPoint,
      )
    ) &&
    !shouldKeepRerollingForOpeningPressure(
      survivalTimeSeconds,
      playerPosition,
      activeObstaclePositions,
      selectedSpawnPoint,
      bestSpawnScore,
    ) &&
    !shouldKeepRerollingForMidRunProjectedStack(
      survivalTimeSeconds,
      playerPosition,
      reachableVelocity,
      playerReachabilityMargin,
      activeObstaclePositions,
      selectedSpawnPoint,
    )
  ) {
    return { point: selectedSpawnPoint, rerollsUsed: 0 };
  }

  let rerollsUsed = 0;

  for (let attempt = 0; attempt < MAX_SPAWN_REROLLS; attempt += 1) {
    rerollsUsed += 1;

    const candidate = rollSpawnPoint(randomInt);
    const candidateSpawnScore = getSpawnScore({
      survivalTimeSeconds,
      playerPosition,
      playerVelocity: reachableVelocity,
      playerReachabilityMargin,
      activeObstaclePositions,
      spawnPoint: candidate,
    });

    if (candidateSpawnScore.score > bestSpawnScore.score) {
      selectedSpawnPoint = candidate;
      bestSpawnScore = candidateSpawnScore;
    }

    if (
      candidateSpawnScore.score >= 0 &&
      !(
        isWithinTimeCutoff(survivalTimeSeconds, EARLY_RETREAT_PINCH_REROLL_CUTOFF_SECONDS) &&
        hasRetreatPinchThreat(
          playerPosition,
          reachableVelocity,
          activeObstaclePositions,
          candidate,
        )
      ) &&
      !shouldKeepRerollingForOpeningPressure(
        survivalTimeSeconds,
        playerPosition,
        activeObstaclePositions,
        candidate,
        candidateSpawnScore,
      ) &&
      !shouldKeepRerollingForMidRunProjectedStack(
        survivalTimeSeconds,
        playerPosition,
        reachableVelocity,
        playerReachabilityMargin,
        activeObstaclePositions,
        candidate,
      )
    ) {
      return { point: candidate, rerollsUsed };
    }
  }

  return { point: selectedSpawnPoint, rerollsUsed };
};
