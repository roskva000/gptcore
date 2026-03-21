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
  NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND,
  NEAR_MISS_CHASE_SNAPSHOT_TEXT,
  getNearMissChaseSnapshotBadgeText,
  getNearMissChaseSnapshotSummaryText,
} from './nearMiss.ts';
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
  nearMissChainCount: number | null;
  nearMissPromptText: string | null;
};

export type DeathPresentation = {
  badge: string | null;
  body: string;
  callout: string;
  hasNearMissChaseSnapshot: boolean;
  prompt: string;
  promptBackgroundColor: string;
  promptTextColor: string;
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
}: DeathPresentationParams): DeathPresentation => ({
  badge: getBadgeText({
    isNewBest,
    survivalTimeSeconds,
    reachedSurvivalGoal,
    nearMissChainCount,
  }),
  body: getBodyText({
    survivalTimeSeconds,
    isNewBest,
    bestSurvivalTimeText,
    reachedSurvivalGoal,
    nearMissChainCount,
  }),
  callout: 'DEATH SNAPSHOT',
  hasNearMissChaseSnapshot: nearMissPromptText !== null,
  prompt: getPromptText({
    escapePromptTitle,
    retryPromptText,
    survivalTimeSeconds,
    nearMissPromptText,
  }),
  promptBackgroundColor:
    nearMissPromptText === null ? '#123f36' : NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND,
  promptTextColor: nearMissPromptText === null ? '#d8fff4' : NEAR_MISS_CHASE_SNAPSHOT_TEXT,
  stats: getStatsText(sessionTelemetry),
  title: getTitleText(hitDirection),
});
