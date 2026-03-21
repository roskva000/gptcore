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
  nearMissPromptText: string | null;
};

export type DeathPresentation = {
  badge: string | null;
  body: string;
  callout: string;
  prompt: string;
  stats: string;
  title: string;
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
}: {
  isNewBest: boolean;
  survivalTimeSeconds: number;
  reachedSurvivalGoal: boolean;
}): string | null => {
  if (reachedSurvivalGoal) {
    return `${SURVIVAL_GOAL_SECONDS}s CLEAR`;
  }

  if (isNewBest) {
    return 'NEW BEST';
  }

  const phaseReachedBadge = getRunPhaseReachedBadgeText(survivalTimeSeconds);

  if (phaseReachedBadge !== null) {
    return phaseReachedBadge;
  }

  if (hasReachedFirstDeathTarget(survivalTimeSeconds)) {
    return `${TARGET_FIRST_DEATH_SECONDS}s BROKEN`;
  }

  return null;
};

const getTitleText = (hitDirection: ImpactDirection): string => {
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
}: {
  survivalTimeSeconds: number;
  isNewBest: boolean;
  bestSurvivalTimeText: string;
  reachedSurvivalGoal: boolean;
}): string => {
  const roundedSurvivalTime = survivalTimeSeconds.toFixed(1);
  const runLine = isNewBest
    ? `Run ${roundedSurvivalTime}s. New best set.`
    : `Run ${roundedSurvivalTime}s. Best ${bestSurvivalTimeText}.`;

  const phaseLine = getRunPhaseDeathSummaryText(survivalTimeSeconds);
  const progressLine = getProgressLine({ survivalTimeSeconds, reachedSurvivalGoal });

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

export const getDeathPresentation = ({
  hitDirection,
  survivalTimeSeconds,
  sessionTelemetry,
  isNewBest,
  bestSurvivalTimeText,
  reachedSurvivalGoal,
  retryPromptText,
  escapePromptTitle,
  nearMissPromptText,
}: DeathPresentationParams): DeathPresentation => ({
  badge: getBadgeText({
    isNewBest,
    survivalTimeSeconds,
    reachedSurvivalGoal,
  }),
  body: getBodyText({
    survivalTimeSeconds,
    isNewBest,
    bestSurvivalTimeText,
    reachedSurvivalGoal,
  }),
  callout: 'DEATH SNAPSHOT',
  prompt: getPromptText({
    escapePromptTitle,
    retryPromptText,
    survivalTimeSeconds,
    nearMissPromptText,
  }),
  stats: getStatsText(sessionTelemetry),
  title: getTitleText(hitDirection),
});
