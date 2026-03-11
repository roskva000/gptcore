export type Vector2Like = {
  x: number;
  y: number;
};

export type FatalThreatCandidate = {
  position: Vector2Like;
  velocity: Vector2Like;
  collisionRadius: number;
};

type FatalThreatSelectionConfig = {
  playerPosition: Vector2Like;
  playerVelocity: Vector2Like;
  playerCollisionRadius: number;
  candidates: FatalThreatCandidate[];
};

export const selectFatalThreatIndex = ({
  playerPosition,
  playerVelocity,
  playerCollisionRadius,
  candidates,
}: FatalThreatSelectionConfig): number => {
  let bestIndex = 0;
  let bestPenetration = Number.NEGATIVE_INFINITY;
  let bestDistanceSq = Number.POSITIVE_INFINITY;
  let bestClosingSpeed = Number.NEGATIVE_INFINITY;

  candidates.forEach((candidate, index) => {
    const deltaX = playerPosition.x - candidate.position.x;
    const deltaY = playerPosition.y - candidate.position.y;
    const distanceSq = deltaX * deltaX + deltaY * deltaY;
    const distance = Math.sqrt(distanceSq);
    const combinedRadius = playerCollisionRadius + candidate.collisionRadius;
    const penetration = combinedRadius - distance;

    let closingSpeed = 0;

    if (distance > 0) {
      const normalX = deltaX / distance;
      const normalY = deltaY / distance;
      const relativeVelocityX = candidate.velocity.x - playerVelocity.x;
      const relativeVelocityY = candidate.velocity.y - playerVelocity.y;
      closingSpeed = relativeVelocityX * normalX + relativeVelocityY * normalY;
    }

    const isBetterCandidate =
      penetration > bestPenetration + 0.0001 ||
      (Math.abs(penetration - bestPenetration) <= 0.0001 &&
        (distanceSq < bestDistanceSq - 0.0001 ||
          (Math.abs(distanceSq - bestDistanceSq) <= 0.0001 &&
            closingSpeed > bestClosingSpeed + 0.0001)));

    if (isBetterCandidate) {
      bestIndex = index;
      bestPenetration = penetration;
      bestDistanceSq = distanceSq;
      bestClosingSpeed = closingSpeed;
    }
  });

  return bestIndex;
};
