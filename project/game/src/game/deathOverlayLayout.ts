export type VerticalCalloutPlacement = {
  connectorY: number;
  labelY: number;
  placeBelow: boolean;
};

export type EscapeGuideVector = {
  guideOffsetX: number;
  guideOffsetY: number;
  isCentered: boolean;
};

type HorizontalCalloutPlacementParams = {
  preferredCenterX: number;
  labelHalfWidth: number;
  minX: number;
  maxX: number;
};

type VerticalCalloutPlacementParams = {
  anchorY: number;
  gap: number;
  labelHalfHeight: number;
  minY: number;
  maxY: number;
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const getEscapeGuideVector = (
  hitDirectionOffsetX: number,
  hitDirectionOffsetY: number,
): EscapeGuideVector => {
  if (hitDirectionOffsetX === 0 && hitDirectionOffsetY === 0) {
    return {
      guideOffsetX: 0,
      guideOffsetY: 0,
      isCentered: true,
    };
  }

  return {
    guideOffsetX: -hitDirectionOffsetX,
    guideOffsetY: -hitDirectionOffsetY,
    isCentered: false,
  };
};

export const getHorizontalCalloutCenterX = ({
  preferredCenterX,
  labelHalfWidth,
  minX,
  maxX,
}: HorizontalCalloutPlacementParams): number => {
  const minCenterX = minX + labelHalfWidth;
  const maxCenterX = maxX - labelHalfWidth;

  if (minCenterX > maxCenterX) {
    return (minX + maxX) / 2;
  }

  return clamp(preferredCenterX, minCenterX, maxCenterX);
};

export const getVerticalCalloutPlacement = ({
  anchorY,
  gap,
  labelHalfHeight,
  minY,
  maxY,
}: VerticalCalloutPlacementParams): VerticalCalloutPlacement => {
  const preferredAboveLabelY = anchorY - gap - labelHalfHeight;

  if (preferredAboveLabelY >= minY) {
    return {
      connectorY: anchorY - gap,
      labelY: preferredAboveLabelY,
      placeBelow: false,
    };
  }

  const preferredBelowLabelY = anchorY + gap + labelHalfHeight;

  if (preferredBelowLabelY <= maxY) {
    return {
      connectorY: anchorY + gap,
      labelY: preferredBelowLabelY,
      placeBelow: true,
    };
  }

  const clampedLabelY = clamp(preferredAboveLabelY, minY, maxY);

  return {
    connectorY: clamp(anchorY - gap, minY, maxY),
    labelY: clampedLabelY,
    placeBelow: clampedLabelY >= anchorY,
  };
};
