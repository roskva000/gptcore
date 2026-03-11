import { clampPointToArena, type Point } from './spawn.ts';

type PointerSteeringVelocityParams = {
  playerPosition: Point;
  pointerPosition: Point;
  playerReachabilityMargin: number;
  playerSpeed: number;
  deadZonePx: number;
  fullSpeedDistancePx: number;
};

export const getPointerSteeringVelocity = ({
  playerPosition,
  pointerPosition,
  playerReachabilityMargin,
  playerSpeed,
  deadZonePx,
  fullSpeedDistancePx,
}: PointerSteeringVelocityParams): Point | null => {
  const reachablePointerTarget = clampPointToArena(pointerPosition, {
    margin: playerReachabilityMargin,
  });
  const pointerVelocity = {
    x: reachablePointerTarget.x - playerPosition.x,
    y: reachablePointerTarget.y - playerPosition.y,
  };
  const distance = Math.hypot(pointerVelocity.x, pointerVelocity.y);

  if (distance <= deadZonePx) {
    return null;
  }

  const normalizedDistance = Math.min(
    Math.max((distance - deadZonePx) / (fullSpeedDistancePx - deadZonePx), 0),
    1,
  );
  const pointerSpeed = playerSpeed * Math.sqrt(normalizedDistance);
  const speedScale = pointerSpeed / distance;

  return {
    x: pointerVelocity.x * speedScale,
    y: pointerVelocity.y * speedScale,
  };
};
