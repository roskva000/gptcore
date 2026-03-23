import { SURVIVAL_GOAL_SECONDS, TARGET_FIRST_DEATH_SECONDS } from './balance.ts';

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
  retryPreviewLine: string;
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
  lockTitle: string;
  lockBody: string;
  lockStatusLine: string;
  lockTargetPullPx: number;
  lockLateralShiftPx: number;
  lockForwardShiftPx: number;
  lockSpawnWeightMultipliers: readonly [number, number];
  lockSpawnDelayMultipliers: readonly [number, number];
  lockObstacleSpeedMultiplier: number;
};

export type RunSignatureMasteryProgress = Record<RunSignatureId, number | null>;

export type RunSignatureMasteryGoal = {
  targetSeconds: number | null;
  statusLine: string;
  detailLine: string;
  compactLine: string;
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
    retryPreviewLine: 'PINPOINT stays tighter. Cut later and trust smaller air again.',
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
    lockTitle: 'PINPOINT LOCKED',
    lockBody: 'Opening held. One tighter squeeze still follows before breakthrough. Protect the smaller air for two more reads.',
    lockStatusLine: 'One tighter squeeze is still live before breakthrough. Protect the smaller air for two more reads.',
    lockTargetPullPx: 14,
    lockLateralShiftPx: 0,
    lockForwardShiftPx: 0,
    lockSpawnWeightMultipliers: [1.1, 0.8],
    lockSpawnDelayMultipliers: [1.08, 1.04],
    lockObstacleSpeedMultiplier: 1,
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
    retryPreviewLine: 'WEAVE opens wider. Let one sideways breath happen before the cash-in.',
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
    lockTitle: 'WEAVE LOCKED',
    lockBody: 'Opening held. One wider sway still follows before breakthrough. Let the lane breathe once more, then cash it back in.',
    lockStatusLine: 'One wider sway is still live before breakthrough. Let the lane breathe once more, then cash it back in.',
    lockTargetPullPx: 0,
    lockLateralShiftPx: 20,
    lockForwardShiftPx: 0,
    lockSpawnWeightMultipliers: [1, 0.85],
    lockSpawnDelayMultipliers: [0.98, 0.95],
    lockObstacleSpeedMultiplier: 1.01,
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
    retryPreviewLine: 'RUSH lands earlier. Move before the lane can settle again.',
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
    lockTitle: 'RUSH LOCKED',
    lockBody: 'Opening held. One earlier shove still follows before breakthrough. Move before the lane can settle under you.',
    lockStatusLine: 'One earlier shove is still live before breakthrough. Move before the lane can settle under you.',
    lockTargetPullPx: 0,
    lockLateralShiftPx: 0,
    lockForwardShiftPx: 20,
    lockSpawnWeightMultipliers: [1.05, 0.85],
    lockSpawnDelayMultipliers: [0.9, 0.94],
    lockObstacleSpeedMultiplier: 1.04,
  },
] as const;

export const getRunSignatureForRunNumber = (runNumber: number): RunSignature =>
  RUN_SIGNATURES[((runNumber % RUN_SIGNATURES.length) + RUN_SIGNATURES.length) % RUN_SIGNATURES.length];

export const getRunSignatureRetryPreviewText = (signature: RunSignature): string =>
  `${signature.shortLabel} NEXT: ${signature.retryPreviewLine}`;

const RUN_SIGNATURE_MASTERY_TARGETS = [
  {
    seconds: TARGET_FIRST_DEATH_SECONDS,
    label: `BREAK ${TARGET_FIRST_DEATH_SECONDS.toFixed(1)}s`,
  },
  {
    seconds: 18,
    label: 'BREAKTHROUGH 18.0s',
  },
  {
    seconds: 32,
    label: 'KILLBOX EXIT 32.0s',
  },
  {
    seconds: 45.6,
    label: 'CLEAR CLIMB 45.6s',
  },
  {
    seconds: SURVIVAL_GOAL_SECONDS,
    label: `CLEAR ${SURVIVAL_GOAL_SECONDS.toFixed(1)}s`,
  },
] as const;

const formatSeconds = (value: number): string => `${value.toFixed(1)}s`;

export const createEmptyRunSignatureMasteryProgress = (): RunSignatureMasteryProgress => ({
  pinpoint: null,
  weave: null,
  rush: null,
});

export const getRunSignatureMasteryGoal = ({
  signature,
  bestSurvivalTime,
}: {
  signature: RunSignature;
  bestSurvivalTime: number | null;
}): RunSignatureMasteryGoal => {
  const nextTarget =
    RUN_SIGNATURE_MASTERY_TARGETS.find(
      (target) => bestSurvivalTime === null || bestSurvivalTime < target.seconds - 0.04,
    ) ?? null;

  if (nextTarget === null) {
    const bestText = bestSurvivalTime === null ? 'n/a' : formatSeconds(bestSurvivalTime);

    return {
      targetSeconds: null,
      statusLine: `${signature.shortLabel} MASTERED | BEST ${bestText}`,
      detailLine: `${formatSeconds(SURVIVAL_GOAL_SECONDS)} clear is already stamped on this route. Push the ceiling higher and turn mastery into a new personal line.`,
      compactLine: `${signature.shortLabel} mastered | Best ${bestText}`,
    };
  }

  if (bestSurvivalTime === null) {
    return {
      targetSeconds: nextTarget.seconds,
      statusLine: `${signature.shortLabel} TARGET | ${nextTarget.label}`,
      detailLine: 'No stamped run yet on this route. Put the first mark down, then cash the rotation back in.',
      compactLine: `${signature.shortLabel} target ${nextTarget.label} | Best n/a`,
    };
  }

  const improvementNeeded = Math.max(nextTarget.seconds - bestSurvivalTime, 0.1);

  return {
    targetSeconds: nextTarget.seconds,
    statusLine: `${signature.shortLabel} TARGET | ${nextTarget.label}`,
    detailLine: `Best ${formatSeconds(bestSurvivalTime)} on this route. Need +${improvementNeeded.toFixed(1)}s more to bank the next mark.`,
    compactLine: `${signature.shortLabel} target ${nextTarget.label} | Best ${formatSeconds(bestSurvivalTime)} | +${improvementNeeded.toFixed(1)}s`,
  };
};

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

export type RunSignatureLockPayoff = {
  id: string;
  title: string;
  body: string;
  statusLine: string;
};

export const RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS = 8.8;
export const RUN_SIGNATURE_LOCK_PAYOFF_WINDOW_END_SECONDS = 10.6;

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

export const getRunSignatureLockPayoff = ({
  signature,
  survivalTimeSeconds,
  runSpawnCount,
}: {
  signature: RunSignature;
  survivalTimeSeconds: number;
  runSpawnCount: number;
}): RunSignatureLockPayoff | null => {
  if (
    survivalTimeSeconds < RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS ||
    survivalTimeSeconds >= RUN_SIGNATURE_LOCK_PAYOFF_WINDOW_END_SECONDS ||
    runSpawnCount < 3 ||
    runSpawnCount > 5
  ) {
    return null;
  }

  return {
    id: `${signature.id}-lock-payoff`,
    title: signature.lockTitle,
    body: signature.lockBody,
    statusLine: signature.lockStatusLine,
  };
};

export const getRunSignatureLockPayoffTargetPoint = ({
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
  const lockPayoff = getRunSignatureLockPayoff({
    signature,
    survivalTimeSeconds,
    runSpawnCount,
  });

  if (lockPayoff === null) {
    return baseTargetPoint;
  }

  const payoffWeight = clamp(
    1 -
      (survivalTimeSeconds - RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS) /
        (RUN_SIGNATURE_LOCK_PAYOFF_WINDOW_END_SECONDS - RUN_SIGNATURE_OPENING_WINDOW_END_SECONDS),
    0,
    1,
  );
  const lockSpawnWeight =
    signature.lockSpawnWeightMultipliers[
      clamp(runSpawnCount - 4, 0, signature.lockSpawnWeightMultipliers.length - 1)
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
        signature.lockTargetPullPx * payoffWeight * lockSpawnWeight,
      ),
    ),
    addPoints(
      scalePoint(lateral, signature.lockLateralShiftPx * payoffWeight * lockSpawnWeight),
      scalePoint(
        fallbackForward,
        signature.lockForwardShiftPx * payoffWeight * lockSpawnWeight,
      ),
    ),
  );

  return clampTargetPoint(adjustedPoint);
};

export const getRunSignatureLockPayoffSpeedMultiplier = ({
  signature,
  survivalTimeSeconds,
  runSpawnCount,
}: {
  signature: RunSignature;
  survivalTimeSeconds: number;
  runSpawnCount: number;
}): number =>
  getRunSignatureLockPayoff({
    signature,
    survivalTimeSeconds,
    runSpawnCount,
  }) === null
    ? 1
    : signature.lockObstacleSpeedMultiplier;

export const getRunSignatureLockPayoffSpawnDelayMultiplier = ({
  signature,
  survivalTimeSeconds,
  runSpawnCount,
}: {
  signature: RunSignature;
  survivalTimeSeconds: number;
  runSpawnCount: number;
}): number => {
  if (
    getRunSignatureLockPayoff({
      signature,
      survivalTimeSeconds,
      runSpawnCount,
    }) === null
  ) {
    return 1;
  }

  return (
    signature.lockSpawnDelayMultipliers[
      clamp(runSpawnCount - 4, 0, signature.lockSpawnDelayMultipliers.length - 1)
    ] ?? 1
  );
};
