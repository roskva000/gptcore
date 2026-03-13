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
const CENTERED_IMPACT_DIRECTION_MIN_RELATIVE_SPEED = 120;

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
  playerVelocity: Point = { x: 0, y: 0 },
): ImpactDirection => {
  const positionDeltaX = obstaclePosition.x - playerPosition.x;
  const positionDeltaY = obstaclePosition.y - playerPosition.y;
  const relativeVelocity = {
    x: obstacleVelocity.x - playerVelocity.x,
    y: obstacleVelocity.y - playerVelocity.y,
  };

  if (
    Math.abs(positionDeltaX) <= POSITION_EPSILON_PX &&
    Math.abs(positionDeltaY) <= POSITION_EPSILON_PX
  ) {
    const centeredOffsetX =
      Math.abs(relativeVelocity.x) >= CENTERED_IMPACT_DIRECTION_MIN_RELATIVE_SPEED
        ? resolveAxisDirection(0, relativeVelocity.x)
        : 0;
    const centeredOffsetY =
      Math.abs(relativeVelocity.y) >= CENTERED_IMPACT_DIRECTION_MIN_RELATIVE_SPEED
        ? resolveAxisDirection(0, relativeVelocity.y)
        : 0;

    if (centeredOffsetX !== 0 || centeredOffsetY !== 0) {
      const horizontal = centeredOffsetX < 0 ? 'left' : centeredOffsetX > 0 ? 'right' : '';
      const vertical = centeredOffsetY < 0 ? 'top' : centeredOffsetY > 0 ? 'bottom' : '';

      if (horizontal && vertical) {
        return {
          label: `${vertical}-${horizontal}`,
          sentence: `the obstacle cut through from the ${vertical}-${horizontal}`,
          offsetX: centeredOffsetX,
          offsetY: centeredOffsetY,
        };
      }

      if (horizontal) {
        return {
          label: horizontal,
          sentence: `the obstacle cut through from the ${horizontal}`,
          offsetX: centeredOffsetX,
          offsetY: 0,
        };
      }

      return {
        label: vertical,
        sentence: `the obstacle cut through from the ${vertical}`,
        offsetX: 0,
        offsetY: centeredOffsetY,
      };
    }

    return {
      label: 'center',
      sentence: 'the impact overlapped your center line',
      offsetX: 0,
      offsetY: 0,
    };
  }

  const offsetX = resolveAxisDirection(positionDeltaX, relativeVelocity.x);
  const offsetY = resolveAxisDirection(positionDeltaY, relativeVelocity.y);
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
    offsetY: 0,
  };
};
