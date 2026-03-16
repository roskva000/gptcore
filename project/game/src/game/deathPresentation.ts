import { SURVIVAL_GOAL_SECONDS, TARGET_FIRST_DEATH_SECONDS, hasReachedFirstDeathTarget } from './balance.ts';
import type { ImpactDirection } from './impactDirection.ts';
import {
  getAverageRetryDelayText,
  getRecentDeathTimesText,
  getValidationProgressText,
  type GameplayTelemetry,
} from './telemetry.ts';

type DeathPresentationParams = {
  hitDirection: ImpactDirection;
  survivalTimeSeconds: number;
  sessionTelemetry: GameplayTelemetry;
  isNewBest: boolean;
  bestSurvivalTimeText: string;
  reachedSurvivalGoal: boolean;
  retryPromptText: string;
  escapePromptTitle: string;
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

  return [runLine, getProgressLine({ survivalTimeSeconds, reachedSurvivalGoal })].join('\n');
};

const getPromptText = ({
  escapePromptTitle,
  retryPromptText,
}: {
  escapePromptTitle: string;
  retryPromptText: string;
}): string => [`Next lane: ${escapePromptTitle}`, `Retry: ${retryPromptText}`].join('\n');

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
  }),
  stats: getStatsText(sessionTelemetry),
  title: getTitleText(hitDirection),
});
