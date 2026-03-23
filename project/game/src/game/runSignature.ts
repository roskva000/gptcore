export type RunSignatureId = 'pinpoint' | 'weave' | 'rush';

export type RunSignature = {
  id: RunSignatureId;
  label: string;
  shortLabel: string;
  waitingEyebrow: string;
  waitingBody: string;
  supportLine: string;
  introBody: string;
  openingTitle: string;
  openingBody: string;
  reminderTitle: string;
  reminderBody: string;
  rematchLine: string;
  overlayCallout: string;
  accentColor: number;
  accentBackgroundColor: string;
  accentTextColor: string;
  obstacleTint: number;
  spawnDelayMultiplier: number;
  obstacleSpeedMultiplier: number;
  targetLagOffsetSeconds: number;
  openingTargetPullPx: number;
  openingLateralShiftPx: number;
  openingForwardShiftPx: number;
  openingSpawnWeightMultipliers: readonly [number, number, number];
  openingBeatLabels: readonly [string, string, string];
  openingLockLine: string;
};

type Point = {
  x: number;
  y: number;
};

const RUN_SIGNATURES: readonly RunSignature[] = [
  {
    id: 'pinpoint',
    label: 'PINPOINT RUN',
    shortLabel: 'PINPOINT',
    waitingEyebrow: 'NEXT RUN | PINPOINT',
    waitingBody: 'Tighter lead and shorter lag.\nCut later, trust smaller air, and keep the lane honest.',
    supportLine: 'PINPOINT RUN: tighter lead is live. Cut later and protect smaller air.',
    introBody: 'Tighter lead opens first. Cut later, trust smaller air, and let the lane stay narrow for one more beat.',
    openingTitle: 'PINPOINT LOCK',
    openingBody: 'The first lane stays tighter on purpose. Cut later, protect smaller air, and do not spend the reopen early.',
    reminderTitle: 'PINPOINT HOLD',
    reminderBody: 'The lane stays tight on purpose. Cut later, trust the smaller gap, and do not spend the reopen early.',
    rematchLine: 'PINPOINT REMATCH: cut later and protect smaller air.',
    overlayCallout: 'PINPOINT SNAPSHOT',
    accentColor: 0xffc18a,
    accentBackgroundColor: '#5a2b1b',
    accentTextColor: '#ffe7c8',
    obstacleTint: 0xf6bf86,
    spawnDelayMultiplier: 1.03,
    obstacleSpeedMultiplier: 0.99,
    targetLagOffsetSeconds: -0.035,
    openingTargetPullPx: 24,
    openingLateralShiftPx: 0,
    openingForwardShiftPx: 0,
    openingSpawnWeightMultipliers: [1.25, 1.25, 1.1],
    openingBeatLabels: ['1 TIGHT', '2 HOLD', '3 LOCK'],
    openingLockLine: 'Tighter route is locked in. Keep protecting the smaller air.',
  },
  {
    id: 'weave',
    label: 'WEAVE RUN',
    shortLabel: 'WEAVE',
    waitingEyebrow: 'NEXT RUN | WEAVE',
    waitingBody: 'Shots reach a little wider before they settle.\nStay fluid, re-center less, and let the lane breathe once.',
    supportLine: 'WEAVE RUN: wider lag is live. Stay fluid and do not over-correct the reopen.',
    introBody: 'Wider lag opens the route. Stay fluid, re-center less, and let the lane breathe before you cash it back in.',
    openingTitle: 'WEAVE SWAY',
    openingBody: 'The first dodge wants one sideways breath. Stay fluid, re-center less, and cash the reopen in a beat later.',
    reminderTitle: 'WEAVE DRIFT',
    reminderBody: 'The lane wants one extra breath. Stay fluid, re-center less, and cash the reopen in a beat later.',
    rematchLine: 'WEAVE REMATCH: stay fluid and let the lane breathe once.',
    overlayCallout: 'WEAVE SNAPSHOT',
    accentColor: 0x8ff0d9,
    accentBackgroundColor: '#173b31',
    accentTextColor: '#d7fff2',
    obstacleTint: 0x8fe7da,
    spawnDelayMultiplier: 0.98,
    obstacleSpeedMultiplier: 1.01,
    targetLagOffsetSeconds: 0.045,
    openingTargetPullPx: 0,
    openingLateralShiftPx: 30,
    openingForwardShiftPx: 0,
    openingSpawnWeightMultipliers: [1, 1.2, 1.1],
    openingBeatLabels: ['1 OPEN', '2 SWAY', '3 SET'],
    openingLockLine: 'Wider lane read is locked in. Stay fluid before the cash-in.',
  },
  {
    id: 'rush',
    label: 'RUSH RUN',
    shortLabel: 'RUSH',
    waitingEyebrow: 'NEXT RUN | RUSH',
    waitingBody: 'Cadence lands earlier and pressure keeps closer pace.\nTrade comfort for rhythm and keep moving before the snap.',
    supportLine: 'RUSH RUN: earlier cadence is live. Keep moving before the lane can settle.',
    introBody: 'Earlier cadence lands immediately. Trade comfort for rhythm and move before the lane can settle.',
    openingTitle: 'RUSH STEP',
    openingBody: 'The first snap lands early. Trade comfort for rhythm, move before the lane settles, and keep the cadence in front.',
    reminderTitle: 'RUSH CADENCE',
    reminderBody: 'Pressure arrives early. Trade comfort for rhythm and move before the lane can settle under you.',
    rematchLine: 'RUSH REMATCH: move early and keep the lane from settling.',
    overlayCallout: 'RUSH SNAPSHOT',
    accentColor: 0xff8aa1,
    accentBackgroundColor: '#561d23',
    accentTextColor: '#ffe1e7',
    obstacleTint: 0xff9baa,
    spawnDelayMultiplier: 0.96,
    obstacleSpeedMultiplier: 1.025,
    targetLagOffsetSeconds: -0.01,
    openingTargetPullPx: 0,
    openingLateralShiftPx: 0,
    openingForwardShiftPx: 28,
    openingSpawnWeightMultipliers: [1.25, 1.1, 1],
    openingBeatLabels: ['1 STEP', '2 PUSH', '3 GO'],
    openingLockLine: 'Earlier cadence is locked in. Keep moving before the lane settles.',
  },
] as const;

export const getRunSignatureForRunNumber = (runNumber: number): RunSignature =>
  RUN_SIGNATURES[((runNumber % RUN_SIGNATURES.length) + RUN_SIGNATURES.length) % RUN_SIGNATURES.length];

export const applyRunSignatureTargetLag = ({
  baseTargetLagSeconds,
  signature,
}: {
  baseTargetLagSeconds: number;
  signature: RunSignature;
}): number => Math.max(0, baseTargetLagSeconds + signature.targetLagOffsetSeconds);

export const getRunSignatureObstacleTint = ({
  signature,
  baseTint,
}: {
  signature: RunSignature;
  baseTint: number | null;
}): number => baseTint ?? signature.obstacleTint;

export type RunSignatureReminder = {
  id: string;
  title: string;
  body: string;
};

export type RunSignatureOpeningCue = {
  id: string;
  title: string;
  body: string;
};

export const RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS = 8.8;

const RUN_SIGNATURE_REMINDER_WINDOW = {
  startSeconds: 6.2,
  endSeconds: RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS,
} as const;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const normalize = (point: Point): Point => {
  const magnitude = Math.hypot(point.x, point.y);

  if (magnitude <= 0.0001) {
    return { x: 0, y: 0 };
  }

  return {
    x: point.x / magnitude,
    y: point.y / magnitude,
  };
};

const scalePoint = (point: Point, magnitude: number): Point => ({
  x: point.x * magnitude,
  y: point.y * magnitude,
});

const addPoints = (left: Point, right: Point): Point => ({
  x: left.x + right.x,
  y: left.y + right.y,
});

export const getRunSignatureOpeningTargetPoint = ({
  signature,
  survivalTimeSeconds,
  runSpawnCount,
  playerPosition,
  playerVelocity,
  baseTargetPoint,
  clampTargetPoint,
}: {
  signature: RunSignature;
  survivalTimeSeconds: number;
  runSpawnCount: number;
  playerPosition: Point;
  playerVelocity: Point;
  baseTargetPoint: Point;
  clampTargetPoint: (point: Point) => Point;
}): Point => {
  if (survivalTimeSeconds >= RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS) {
    return baseTargetPoint;
  }

  const openingWeight = clamp(
    1 - survivalTimeSeconds / RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS,
    0,
    1,
  );
  const openingSpawnWeight =
    signature.openingSpawnWeightMultipliers[
      clamp(runSpawnCount - 1, 0, signature.openingSpawnWeightMultipliers.length - 1)
    ] ?? 1;
  const targetToPlayer = normalize({
    x: playerPosition.x - baseTargetPoint.x,
    y: playerPosition.y - baseTargetPoint.y,
  });
  const rawForward = normalize(playerVelocity);
  const fallbackForward =
    rawForward.x === 0 && rawForward.y === 0 ? targetToPlayer : rawForward;
  const lateralDirection = runSpawnCount % 2 === 0 ? 1 : -1;
  const lateral = {
    x: -fallbackForward.y * lateralDirection,
    y: fallbackForward.x * lateralDirection,
  };

  const adjustedPoint = addPoints(
    addPoints(
      baseTargetPoint,
      scalePoint(
        targetToPlayer,
        signature.openingTargetPullPx * openingWeight * openingSpawnWeight,
      ),
    ),
    addPoints(
      scalePoint(lateral, signature.openingLateralShiftPx * openingWeight * openingSpawnWeight),
      scalePoint(
        fallbackForward,
        signature.openingForwardShiftPx * openingWeight * openingSpawnWeight,
      ),
    ),
  );

  return clampTargetPoint(adjustedPoint);
};

export const getRunSignatureOpeningCue = ({
  signature,
  survivalTimeSeconds,
  runSpawnCount,
}: {
  signature: RunSignature;
  survivalTimeSeconds: number;
  runSpawnCount: number;
}): RunSignatureOpeningCue | null => {
  if (survivalTimeSeconds >= RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS || runSpawnCount > 2) {
    return null;
  }

  return {
    id: `${signature.id}-opening-cue`,
    title: signature.openingTitle,
    body: signature.openingBody,
  };
};

export const getActiveRunSignatureReminder = ({
  signature,
  survivalTimeSeconds,
}: {
  signature: RunSignature;
  survivalTimeSeconds: number;
}): RunSignatureReminder | null => {
  if (
    survivalTimeSeconds < RUN_SIGNATURE_REMINDER_WINDOW.startSeconds ||
    survivalTimeSeconds >= RUN_SIGNATURE_REMINDER_WINDOW.endSeconds
  ) {
    return null;
  }

  return {
    id: `${signature.id}-reminder`,
    title: signature.reminderTitle,
    body: signature.reminderBody,
  };
};
