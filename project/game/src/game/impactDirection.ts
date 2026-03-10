export type ImpactDirection = {
  label: string;
  sentence: string;
  offsetX: number;
  offsetY: number;
};

type Point = {
  x: number;
  y: number;
};

const POSITION_EPSILON_PX = 4;
const VELOCITY_EPSILON_PX_PER_SECOND = 18;

const resolveAxisDirection = (positionDelta: number, velocity: number): number => {
  if (Math.abs(positionDelta) > POSITION_EPSILON_PX) {
    return positionDelta > 0 ? 1 : -1;
  }

  if (Math.abs(velocity) > VELOCITY_EPSILON_PX_PER_SECOND) {
    return velocity > 0 ? -1 : 1;
  }

  return 0;
};

export const getImpactDirection = (
  playerPosition: Point,
  obstaclePosition: Point,
  obstacleVelocity: Point,
): ImpactDirection => {
  const offsetX = resolveAxisDirection(obstaclePosition.x - playerPosition.x, obstacleVelocity.x);
  const offsetY = resolveAxisDirection(obstaclePosition.y - playerPosition.y, obstacleVelocity.y);
  const horizontal = offsetX < 0 ? 'left' : offsetX > 0 ? 'right' : '';
  const vertical = offsetY < 0 ? 'top' : offsetY > 0 ? 'bottom' : '';

  if (horizontal && vertical) {
    return {
      label: `${vertical}-${horizontal}`,
      sentence: `the obstacle closed in from the ${vertical}-${horizontal}`,
      offsetX,
      offsetY,
    };
  }

  if (horizontal) {
    return {
      label: horizontal,
      sentence: `the obstacle closed in from the ${horizontal}`,
      offsetX,
      offsetY: 0,
    };
  }

  if (vertical) {
    return {
      label: vertical,
      sentence: `the obstacle closed in from the ${vertical}`,
      offsetX: 0,
      offsetY,
    };
  }

  return {
    label: 'center',
    sentence: 'the impact overlapped your center line',
    offsetX: 0,
    offsetY: -1,
  };
};
