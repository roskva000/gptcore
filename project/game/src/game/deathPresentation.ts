import { SURVIVAL_GOAL_SECONDS, TARGET_FIRST_DEATH_SECONDS, hasReachedFirstDeathTarget } from './balance.ts';
import type { ImpactDirection } from './impactDirection.ts';
import {
  getAverageRetryDelayText,
  getRecentDeathTimesText,
  getValidationProgressText,
  type GameplayTelemetry,
} from './telemetry.ts';
import { getNextRunHorizonBeatText } from './runHorizon.ts';
import {
  getNearMissChaseTitleText,
  NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND,
  NEAR_MISS_CHASE_SNAPSHOT_TEXT,
  getNearMissChaseSnapshotBadgeText,
  getNearMissChaseSnapshotSummaryText,
} from './nearMiss.ts';
import {
  getBreakthroughCue,
  getKillboxCue,
  getEndgameClearClimbState,
  getEndgameDriftCue,
  getRunPhaseDeathSummaryText,
  getRunPhaseReachedBadgeText,
  getRunPhaseRetryGoalText,
} from './runPhase.ts';

type DeathPresentationParams = {
  hitDirection: ImpactDirection;
  survivalTimeSeconds: number;
  sessionTelemetry: GameplayTelemetry;
  isNewBest: boolean;
  bestSurvivalTimeText: string;
  reachedSurvivalGoal: boolean;
  retryPromptText: string;
  escapePromptTitle: string;
  nearMissChainCount: number | null;
  nearMissPromptText: string | null;
};

export type DeathPresentation = {
  badge: string | null;
  badgeBackgroundColor: string;
  badgeTextColor: string;
  body: string;
  bodyTextColor: string;
  callout: string;
  calloutBackgroundColor: string;
  calloutTextColor: string;
  hasNearMissChaseSnapshot: boolean;
  prompt: string;
  promptBackgroundColor: string;
  promptTextColor: string;
  stats: string;
  title: string;
  titleTextColor: string;
};

type SnapshotTone = {
  badgeBackgroundColor: string;
  badgeTextColor: string;
  bodyTextColor: string;
  calloutBackgroundColor: string;
  calloutTextColor: string;
  promptBackgroundColor: string;
  promptTextColor: string;
  titleTextColor: string;
};

const DEFAULT_SNAPSHOT_TONE: SnapshotTone = {
  badgeBackgroundColor: '#123f36',
  badgeTextColor: '#d8fff4',
  bodyTextColor: '#b8cde0',
  calloutBackgroundColor: '#2f0d12',
  calloutTextColor: '#ff8a73',
  promptBackgroundColor: '#123f36',
  promptTextColor: '#d8fff4',
  titleTextColor: '#f5f7ff',
};

const getProgressLine = ({
  survivalTimeSeconds,
  reachedSurvivalGoal,
}: {
  survivalTimeSeconds: number;
  reachedSurvivalGoal: boolean;
}): string => {
  if (reachedSurvivalGoal) {
    return `${SURVIVAL_GOAL_SECONDS}s clear banked. Push your best.`;
  }

  if (hasReachedFirstDeathTarget(survivalTimeSeconds)) {
    return `${TARGET_FIRST_DEATH_SECONDS}s gate cleared. ${SURVIVAL_GOAL_SECONDS}s is still live.`;
  }

  return `Break ${TARGET_FIRST_DEATH_SECONDS}s, then chase ${SURVIVAL_GOAL_SECONDS}.`;
};

const getBadgeText = ({
  isNewBest,
  survivalTimeSeconds,
  reachedSurvivalGoal,
  nearMissChainCount,
}: {
  isNewBest: boolean;
  survivalTimeSeconds: number;
  reachedSurvivalGoal: boolean;
  nearMissChainCount: number | null;
}): string | null => {
  if (reachedSurvivalGoal) {
    return `${SURVIVAL_GOAL_SECONDS}s CLEAR`;
  }

  if (isNewBest) {
    return 'NEW BEST';
  }

  const phaseReachedBadge = getRunPhaseReachedBadgeText(survivalTimeSeconds);

  if (phaseReachedBadge !== null) {
    return nearMissChainCount === null
      ? phaseReachedBadge
      : `${phaseReachedBadge} | ${getNearMissChaseSnapshotBadgeText(nearMissChainCount)}`;
  }

  if (hasReachedFirstDeathTarget(survivalTimeSeconds)) {
    return nearMissChainCount === null
      ? `${TARGET_FIRST_DEATH_SECONDS}s BROKEN`
      : `${TARGET_FIRST_DEATH_SECONDS}s BROKEN | ${getNearMissChaseSnapshotBadgeText(nearMissChainCount)}`;
  }

  return nearMissChainCount === null
    ? null
    : getNearMissChaseSnapshotBadgeText(nearMissChainCount);
};

const getTitleTextWithNearMissChase = ({
  hitDirection,
  nearMissChainCount,
}: {
  hitDirection: ImpactDirection;
  nearMissChainCount: number | null;
}): string => {
  if (nearMissChainCount !== null) {
    return getNearMissChaseTitleText(
      hitDirection.label,
      hitDirection.offsetX === 0 && hitDirection.offsetY === 0,
    );
  }

  if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
    return 'Caught at center';
  }

  return `Hit from ${hitDirection.label}`;
};

const getBodyText = ({
  survivalTimeSeconds,
  isNewBest,
  bestSurvivalTimeText,
  reachedSurvivalGoal,
  nearMissChainCount,
}: {
  survivalTimeSeconds: number;
  isNewBest: boolean;
  bestSurvivalTimeText: string;
  reachedSurvivalGoal: boolean;
  nearMissChainCount: number | null;
}): string => {
  const roundedSurvivalTime = survivalTimeSeconds.toFixed(1);
  const runLine = isNewBest
    ? `Run ${roundedSurvivalTime}s. New best set.`
    : `Run ${roundedSurvivalTime}s. Best ${bestSurvivalTimeText}.`;

  const phaseLine = getRunPhaseDeathSummaryText(survivalTimeSeconds);
  const progressLine = getProgressLine({ survivalTimeSeconds, reachedSurvivalGoal });

  if (nearMissChainCount !== null) {
    return [
      runLine,
      `${getNearMissChaseSnapshotSummaryText(nearMissChainCount)} ${phaseLine}`,
    ].join('\n');
  }

  if (phaseLine === progressLine) {
    return [runLine, progressLine].join('\n');
  }

  return [runLine, phaseLine].join('\n');
};

const getPromptText = ({
  escapePromptTitle,
  retryPromptText,
  survivalTimeSeconds,
  nearMissPromptText,
}: {
  escapePromptTitle: string;
  retryPromptText: string;
  survivalTimeSeconds: number;
  nearMissPromptText: string | null;
}): string => {
  const endgameCue = getEndgameDriftCue(survivalTimeSeconds);
  const clearClimbState = getEndgameClearClimbState(survivalTimeSeconds);
  const retryTargetText = getRunPhaseRetryGoalText(survivalTimeSeconds);
  const retryPlanText =
    endgameCue === null && clearClimbState === null
      ? `${retryTargetText} | ${getNextRunHorizonBeatText(survivalTimeSeconds)}`
      : retryTargetText;

  return [
    `Next lane: ${escapePromptTitle}`,
    nearMissPromptText ?? retryPlanText,
    `Retry: ${retryPromptText}`,
  ].join('\n');
};

const getStatsText = (sessionTelemetry: GameplayTelemetry): string =>
  [
    `Recent ${getRecentDeathTimesText(sessionTelemetry)}`,
    `Validation ${getValidationProgressText(sessionTelemetry)} | Retry ${getAverageRetryDelayText(sessionTelemetry)}`,
  ].join('\n');

const getSnapshotTone = ({
  survivalTimeSeconds,
  hasNearMissChaseSnapshot,
}: {
  survivalTimeSeconds: number;
  hasNearMissChaseSnapshot: boolean;
}): SnapshotTone => {
  const breakthroughCue = getBreakthroughCue(survivalTimeSeconds);
  const killboxCue = getKillboxCue(survivalTimeSeconds);
  const endgameCue = getEndgameDriftCue(survivalTimeSeconds);
  const clearClimbState = getEndgameClearClimbState(survivalTimeSeconds);

  if (breakthroughCue?.id === 'strafe-fork') {
    return {
      badgeBackgroundColor: '#5a2b1b',
      badgeTextColor: '#ffe7c8',
      bodyTextColor: '#f2cdb2',
      calloutBackgroundColor: '#4b2418',
      calloutTextColor: '#ffc8a1',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5a2b1b',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff0d8',
      titleTextColor: '#ffe3c1',
    };
  }

  if (breakthroughCue?.id === 'surge-snap') {
    return {
      badgeBackgroundColor: '#6a3916',
      badgeTextColor: '#fff0c1',
      bodyTextColor: '#f6d8a6',
      calloutBackgroundColor: '#5a3114',
      calloutTextColor: '#ffd78d',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#6a3916',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff4cf',
      titleTextColor: '#ffe9b2',
    };
  }

  if (breakthroughCue?.id === 'gate-cut') {
    return {
      badgeBackgroundColor: '#5d2c28',
      badgeTextColor: '#ffe6df',
      bodyTextColor: '#f1cec8',
      calloutBackgroundColor: '#4a221f',
      calloutTextColor: '#ffb8ac',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5d2c28',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff0eb',
      titleTextColor: '#ffdcd4',
    };
  }

  if (killboxCue?.id === 'pinch-lock') {
    return {
      badgeBackgroundColor: '#5b3418',
      badgeTextColor: '#fff0cf',
      bodyTextColor: '#f3d7b0',
      calloutBackgroundColor: '#482717',
      calloutTextColor: '#ffd6a5',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5b3418',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff2d8',
      titleTextColor: '#ffe7c6',
    };
  }

  if (killboxCue?.id === 'echo-follow') {
    return {
      badgeBackgroundColor: '#5c2f1d',
      badgeTextColor: '#fff0d8',
      bodyTextColor: '#f3d5bf',
      calloutBackgroundColor: '#4a2519',
      calloutTextColor: '#ffd1ad',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5c2f1d',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff1e2',
      titleTextColor: '#ffe5c9',
    };
  }

  if (killboxCue?.id === 'lead-cut') {
    return {
      badgeBackgroundColor: '#5a331f',
      badgeTextColor: '#fff1dd',
      bodyTextColor: '#f4d8c1',
      calloutBackgroundColor: '#47271a',
      calloutTextColor: '#ffd7b8',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5a331f',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff3e6',
      titleTextColor: '#ffe7d3',
    };
  }

  if (killboxCue?.id === 'seal-snap') {
    return {
      badgeBackgroundColor: '#6d262b',
      badgeTextColor: '#fff1dd',
      bodyTextColor: '#f5cbc5',
      calloutBackgroundColor: '#561d23',
      calloutTextColor: '#ffb7ab',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#6d262b',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff1e8',
      titleTextColor: '#ffd9d2',
    };
  }

  if (killboxCue?.id === 'fold-snap') {
    return {
      badgeBackgroundColor: '#1f4357',
      badgeTextColor: '#e0f7ff',
      bodyTextColor: '#c7e7f5',
      calloutBackgroundColor: '#173648',
      calloutTextColor: '#9ee4ff',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#1f4357',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#e7f8ff',
      titleTextColor: '#d5f2ff',
    };
  }

  if (endgameCue?.id === 'late-sweep') {
    return {
      badgeBackgroundColor: '#5c3416',
      badgeTextColor: '#fff0d4',
      bodyTextColor: '#f5d7b8',
      calloutBackgroundColor: '#4b2714',
      calloutTextColor: '#ffd5a3',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5c3416',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff3df',
      titleTextColor: '#ffe7bf',
    };
  }

  if (endgameCue?.id === 'sweep-lock') {
    return {
      badgeBackgroundColor: '#6d2a1c',
      badgeTextColor: '#fff1dd',
      bodyTextColor: '#f4cbc0',
      calloutBackgroundColor: '#592117',
      calloutTextColor: '#ffbda1',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#6d2a1c',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff2e8',
      titleTextColor: '#ffd8cd',
    };
  }

  if (endgameCue?.id === 'aftershock') {
    return {
      badgeBackgroundColor: '#4f2331',
      badgeTextColor: '#ffe4ec',
      bodyTextColor: '#f0cad6',
      calloutBackgroundColor: '#401a26',
      calloutTextColor: '#ffadc4',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#4f2331',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#ffeaf1',
      titleTextColor: '#ffd8e3',
    };
  }

  if (endgameCue?.id === 'false-clear') {
    return {
      badgeBackgroundColor: '#204a3e',
      badgeTextColor: '#dffff2',
      bodyTextColor: '#c5eadd',
      calloutBackgroundColor: '#173b31',
      calloutTextColor: '#97f0cb',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#204a3e',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#e7fff5',
      titleTextColor: '#d3ffec',
    };
  }

  if (endgameCue?.id === 'preclear') {
    return {
      badgeBackgroundColor: '#6a2320',
      badgeTextColor: '#ffe7df',
      bodyTextColor: '#f4cbc1',
      calloutBackgroundColor: '#541917',
      calloutTextColor: '#ffb8a6',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#6a2320',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff0eb',
      titleTextColor: '#ffddd4',
    };
  }

  if (clearClimbState?.id === 'ascent-stair') {
    return {
      badgeBackgroundColor: '#5a3618',
      badgeTextColor: '#fff1d9',
      bodyTextColor: '#f2dbc0',
      calloutBackgroundColor: '#472812',
      calloutTextColor: '#ffd6a1',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5a3618',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#fff4e1',
      titleTextColor: '#ffe7c1',
    };
  }

  if (clearClimbState?.id === 'ridge-cut') {
    return {
      badgeBackgroundColor: '#183c59',
      badgeTextColor: '#e3f5ff',
      bodyTextColor: '#c7e5f2',
      calloutBackgroundColor: '#143147',
      calloutTextColor: '#a3e2ff',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#183c59',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#eaf8ff',
      titleTextColor: '#d5efff',
    };
  }

  if (clearClimbState?.id === 'summit-snap') {
    return {
      badgeBackgroundColor: '#5a1d2c',
      badgeTextColor: '#ffe5eb',
      bodyTextColor: '#f1cad4',
      calloutBackgroundColor: '#471523',
      calloutTextColor: '#ffadc4',
      promptBackgroundColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND : '#5a1d2c',
      promptTextColor: hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_SNAPSHOT_TEXT : '#ffeaf0',
      titleTextColor: '#ffd7e1',
    };
  }

  return {
    ...DEFAULT_SNAPSHOT_TONE,
    promptBackgroundColor: hasNearMissChaseSnapshot
      ? NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND
      : DEFAULT_SNAPSHOT_TONE.promptBackgroundColor,
    promptTextColor: hasNearMissChaseSnapshot
      ? NEAR_MISS_CHASE_SNAPSHOT_TEXT
      : DEFAULT_SNAPSHOT_TONE.promptTextColor,
  };
};

export const getDeathPresentation = ({
  hitDirection,
  survivalTimeSeconds,
  sessionTelemetry,
  isNewBest,
  bestSurvivalTimeText,
  reachedSurvivalGoal,
  retryPromptText,
  escapePromptTitle,
  nearMissChainCount,
  nearMissPromptText,
}: DeathPresentationParams): DeathPresentation => {
  const hasNearMissChaseSnapshot = nearMissPromptText !== null;
  const tone = getSnapshotTone({
    survivalTimeSeconds,
    hasNearMissChaseSnapshot,
  });

  return {
    badge: getBadgeText({
      isNewBest,
      survivalTimeSeconds,
      reachedSurvivalGoal,
      nearMissChainCount,
    }),
    badgeBackgroundColor: tone.badgeBackgroundColor,
    badgeTextColor: tone.badgeTextColor,
    body: getBodyText({
      survivalTimeSeconds,
      isNewBest,
      bestSurvivalTimeText,
      reachedSurvivalGoal,
      nearMissChainCount,
    }),
    bodyTextColor: tone.bodyTextColor,
    callout: 'DEATH SNAPSHOT',
    calloutBackgroundColor: tone.calloutBackgroundColor,
    calloutTextColor: tone.calloutTextColor,
    hasNearMissChaseSnapshot,
    prompt: getPromptText({
      escapePromptTitle,
      retryPromptText,
      survivalTimeSeconds,
      nearMissPromptText,
    }),
    promptBackgroundColor: tone.promptBackgroundColor,
    promptTextColor: tone.promptTextColor,
    stats: getStatsText(sessionTelemetry),
    title: getTitleTextWithNearMissChase({
      hitDirection,
      nearMissChainCount,
    }),
    titleTextColor: tone.titleTextColor,
  };
};
