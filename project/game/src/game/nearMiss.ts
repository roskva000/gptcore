export type NearMissState = {
  closestDistanceSq: number;
  hadClosingApproach: boolean;
  closestDistanceWasVisible: boolean;
};

export const NEAR_MISS_CHASE_DURATION_MS = 2600;
export const NEAR_MISS_CHASE_ACCENT_COLOR = 0x7ce8d7;
export const NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND = '#18463f';
export const NEAR_MISS_CHASE_SNAPSHOT_TEXT = '#d8fff4';

export type NearMissSnapshot = {
  playerPosition: {
    x: number;
    y: number;
  };
  playerVelocity: {
    x: number;
    y: number;
  };
  playerCollisionRadius: number;
  obstaclePosition: {
    x: number;
    y: number;
  };
  obstacleVelocity: {
    x: number;
    y: number;
  };
  obstacleCollisionRadius: number;
  obstacleInsideVisibleArena: boolean;
  extraNearMissDistance: number;
};

export type NearMissEvaluation = NearMissState & {
  currentDistanceSq: number;
  triggered: boolean;
};

const EPSILON = 0.0001;

export const createNearMissState = (): NearMissState => ({
  closestDistanceSq: Number.POSITIVE_INFINITY,
  hadClosingApproach: false,
  closestDistanceWasVisible: false,
});

export const getNearMissLabel = (chainCount: number): string =>
  chainCount > 1 ? `${chainCount}x NEAR MISS` : 'NEAR MISS';

export const isNearMissHintActive = (
  activeRunElapsedMs: number,
  hideAtElapsedMs: number | null,
): boolean => hideAtElapsedMs !== null && activeRunElapsedMs < hideAtElapsedMs;

export const isNearMissChaseActive = (
  activeRunElapsedMs: number,
  expiresAtElapsedMs: number | null,
): boolean => expiresAtElapsedMs !== null && activeRunElapsedMs < expiresAtElapsedMs;

const getNearMissChaseRemainingSecondsText = (remainingMs: number): string =>
  `${(Math.max(remainingMs, 0) / 1000).toFixed(1)}s`;

export const getNearMissChaseHudText = (
  chainCount: number,
  remainingMs: number,
): string =>
  `${getNearMissLabel(chainCount)}\nCHASE LIVE ${getNearMissChaseRemainingSecondsText(remainingMs)}`;

export const getNearMissChaseSupportText = (
  chainCount: number,
  remainingMs: number,
): string => {
  const leadText =
    chainCount > 1 ? `${chainCount}x near-miss chase live.` : 'Near-miss chase live.';

  return `${leadText} Thread another close shave within ${getNearMissChaseRemainingSecondsText(remainingMs)} to keep the lane hot.`;
};

export const getNearMissChaseRetryText = (chainCount: number): string =>
  chainCount > 1
    ? `${chainCount}x near-miss chase snapped. Reopen that lane.`
    : 'Near-miss chase snapped. Reopen that lane.';

export const getNearMissChaseSnapshotBadgeText = (chainCount: number): string =>
  chainCount > 1 ? `${chainCount}x CHASE SNAP` : 'CHASE SNAP';

export const getNearMissChaseSnapshotSummaryText = (chainCount: number): string =>
  chainCount > 1
    ? `${chainCount}x near-miss chase snapped before the lane cooled.`
    : 'Near-miss chase snapped before the lane cooled.';

export const getNearMissChaseVisualIntensity = (remainingMs: number): number => {
  if (remainingMs <= 0) {
    return 0;
  }

  const normalizedRemaining = Math.min(remainingMs / NEAR_MISS_CHASE_DURATION_MS, 1);

  return 0.28 + normalizedRemaining * 0.72;
};

export const evaluateNearMiss = (
  snapshot: NearMissSnapshot,
  previousState: NearMissState,
): NearMissEvaluation => {
  const deltaX = snapshot.obstaclePosition.x - snapshot.playerPosition.x;
  const deltaY = snapshot.obstaclePosition.y - snapshot.playerPosition.y;
  const relativeVelocityX = snapshot.obstacleVelocity.x - snapshot.playerVelocity.x;
  const relativeVelocityY = snapshot.obstacleVelocity.y - snapshot.playerVelocity.y;
  const currentDistanceSq = deltaX * deltaX + deltaY * deltaY;
  const collisionDistance =
    snapshot.playerCollisionRadius + snapshot.obstacleCollisionRadius;
  const nearMissDistance = collisionDistance + snapshot.extraNearMissDistance;
  const collisionDistanceSq = collisionDistance * collisionDistance;
  const nearMissDistanceSq = nearMissDistance * nearMissDistance;
  const isClosing = deltaX * relativeVelocityX + deltaY * relativeVelocityY < -EPSILON;
  const foundCloserDistance = currentDistanceSq <= previousState.closestDistanceSq + EPSILON;
  const closestDistanceSq = foundCloserDistance
    ? currentDistanceSq
    : previousState.closestDistanceSq;
  const closestDistanceWasVisible = foundCloserDistance
    ? snapshot.obstacleInsideVisibleArena
    : previousState.closestDistanceWasVisible;
  const hadClosingApproach = previousState.hadClosingApproach || isClosing;
  const triggered =
    hadClosingApproach &&
    closestDistanceWasVisible &&
    !isClosing &&
    closestDistanceSq > collisionDistanceSq + EPSILON &&
    closestDistanceSq <= nearMissDistanceSq;

  return {
    currentDistanceSq,
    closestDistanceSq,
    closestDistanceWasVisible,
    hadClosingApproach,
    triggered,
  };
};
