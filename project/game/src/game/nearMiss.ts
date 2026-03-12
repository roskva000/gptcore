export type NearMissState = {
  closestDistanceSq: number;
  hadClosingApproach: boolean;
};

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
});

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
  const closestDistanceSq = Math.min(previousState.closestDistanceSq, currentDistanceSq);
  const hadClosingApproach = previousState.hadClosingApproach || isClosing;
  const triggered =
    hadClosingApproach &&
    !isClosing &&
    closestDistanceSq > collisionDistanceSq + EPSILON &&
    closestDistanceSq <= nearMissDistanceSq;

  return {
    currentDistanceSq,
    closestDistanceSq,
    hadClosingApproach,
    triggered,
  };
};
