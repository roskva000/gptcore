export type NearMissState = {
  closestDistanceSq: number;
  hadClosingApproach: boolean;
  closestDistanceWasVisible: boolean;
};

export const NEAR_MISS_CHASE_DURATION_MS = 2600;
export const NEAR_MISS_CHASE_ACCENT_COLOR = 0x7ce8d7;
export const NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND = '#18463f';
export const NEAR_MISS_CHASE_SNAPSHOT_TEXT = '#d8fff4';
export const NEAR_MISS_CHASE_IMPACT_COLOR = 0x8ff4e3;
export const NEAR_MISS_CHASE_IMPACT_TEXT = '#e6fff9';
export const NEAR_MISS_CHASE_FATAL_LABEL_BACKGROUND = '#18463f';
export const NEAR_MISS_CHASE_REOPEN_TARGET_OFFSET_PX = 72;
export const NEAR_MISS_CHASE_CUT_TARGET_OFFSET_PX = 56;

type Point = {
  x: number;
  y: number;
};

export type NearMissChaseSpawnStep = 'reopen' | 'cut';

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

export const getNearMissChaseImpactLabelText = (
  directionLabel: string,
  isCenterHit: boolean,
): string => (isCenterHit ? 'CENTER SNAP' : `${directionLabel.toUpperCase()} SNAP`);

export const getNearMissChaseFatalLabelText = (
  directionLabel: string,
  isCenterHit: boolean,
): string => (isCenterHit ? 'SNAP\nCENTER' : `SNAP\n${directionLabel.toUpperCase()} LANE`);

export const getNearMissChaseTitleText = (
  directionLabel: string,
  isCenterHit: boolean,
): string => (isCenterHit ? 'Lane snapped at center' : `Lane snapped from ${directionLabel}`);

export const getNearMissChaseVisualIntensity = (remainingMs: number): number => {
  if (remainingMs <= 0) {
    return 0;
  }

  const normalizedRemaining = Math.min(remainingMs / NEAR_MISS_CHASE_DURATION_MS, 1);

  return 0.28 + normalizedRemaining * 0.72;
};

export const getNearMissLaneDirection = (
  playerPosition: Point,
  obstaclePosition: Point,
): Point => {
  const deltaX = obstaclePosition.x - playerPosition.x;
  const deltaY = obstaclePosition.y - playerPosition.y;

  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return {
      x: deltaX < 0 ? -1 : 1,
      y: 0,
    };
  }

  return {
    x: 0,
    y: deltaY < 0 ? -1 : 1,
  };
};

export const getNearMissChaseTargetOffset = (
  step: NearMissChaseSpawnStep,
  laneDirection: Point,
): Point => {
  const distance =
    step === 'reopen'
      ? NEAR_MISS_CHASE_REOPEN_TARGET_OFFSET_PX
      : NEAR_MISS_CHASE_CUT_TARGET_OFFSET_PX;
  const directionMultiplier = step === 'reopen' ? -1 : 1;

  return {
    x: laneDirection.x === 0 ? 0 : laneDirection.x * distance * directionMultiplier,
    y: laneDirection.y === 0 ? 0 : laneDirection.y * distance * directionMultiplier,
  };
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
