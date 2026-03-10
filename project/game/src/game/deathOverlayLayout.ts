export type VerticalCalloutPlacement = {
  connectorY: number;
  labelY: number;
  placeBelow: boolean;
};

type VerticalCalloutPlacementParams = {
  anchorY: number;
  gap: number;
  labelHalfHeight: number;
  minY: number;
  maxY: number;
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

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
