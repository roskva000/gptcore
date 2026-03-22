import { SURVIVAL_GOAL_SECONDS, TARGET_FIRST_DEATH_SECONDS } from './balance.ts';
import { ENDGAME_CLEAR_CLIMB_START_SECONDS } from './runPhase.ts';

export const TELEMETRY_RECENT_RUN_LIMIT = 4;
export const VALIDATION_SAMPLE_RUN_TARGET = 5;
export const VALIDATION_BASELINE_TEXT =
  'baseline=pacing 10/35/89 | deterministic survival 30.3s avg / 10.0s first death / 0% early';

export type GameplayTelemetry = {
  totalRuns: number;
  totalDeaths: number;
  totalSurvivalTime: number;
  bestSurvivalTime: number | null;
  firstDeathTime: number | null;
  earlyDeathsUnderTarget: number;
  totalRetryDelayMs: number;
  retryCount: number;
  totalSpawnRerolls: number;
  recentDeathTimes: number[];
  lastDeathAt: number | null;
  lastRetryDelayMs: number | null;
  lastRunStartedAt: number | null;
  lastRunSpawnRerolls: number;
  lastSurvivalTime: number | null;
};

export type TelemetrySummary = {
  label: string;
  runs: number;
  startedRuns: number;
  deaths: number;
  bestSurvivalTime: number | null;
  firstDeathTime: number | null;
  averageSurvivalTime: number;
  earlyDeathRate: number;
  averageRetryDelaySeconds: number | null;
  totalSpawnRerolls: number;
  recentDeathTimes: number[];
  lastSurvivalTime: number | null;
};

export type ValidationReportSummary = {
  runs: string;
  firstDeath: string;
  earlyDeathRate: string;
  validation: string;
};

export const createEmptyTelemetry = (): GameplayTelemetry => ({
  totalRuns: 0,
  totalDeaths: 0,
  totalSurvivalTime: 0,
  bestSurvivalTime: null,
  firstDeathTime: null,
  earlyDeathsUnderTarget: 0,
  totalRetryDelayMs: 0,
  retryCount: 0,
  totalSpawnRerolls: 0,
  recentDeathTimes: [],
  lastDeathAt: null,
  lastRetryDelayMs: null,
  lastRunStartedAt: null,
  lastRunSpawnRerolls: 0,
  lastSurvivalTime: null,
});

export const getAverageSurvivalTime = (telemetry: GameplayTelemetry): number => {
  if (telemetry.totalDeaths === 0) {
    return 0;
  }

  return telemetry.totalSurvivalTime / telemetry.totalDeaths;
};

export const getCompletedRunCount = (telemetry: GameplayTelemetry): number => telemetry.totalDeaths;

export const hasCompletedRunSample = (telemetry: GameplayTelemetry): boolean =>
  getCompletedRunCount(telemetry) >= VALIDATION_SAMPLE_RUN_TARGET;

export const getBestSurvivalTime = (telemetry: GameplayTelemetry): number | null =>
  telemetry.bestSurvivalTime;

export const getBestSurvivalTimeText = (telemetry: GameplayTelemetry): string => {
  const bestSurvivalTime = getBestSurvivalTime(telemetry);

  if (bestSurvivalTime === null) {
    return 'n/a';
  }

  return `${bestSurvivalTime.toFixed(1)}s`;
};

export const getLiveBestSurvivalTimeText = ({
  telemetry,
  currentSurvivalTime,
}: {
  telemetry: GameplayTelemetry;
  currentSurvivalTime: number;
}): string => {
  const bestSurvivalTime = getBestSurvivalTime(telemetry);
  const liveBestSurvivalTime =
    bestSurvivalTime === null ? currentSurvivalTime : Math.max(bestSurvivalTime, currentSurvivalTime);

  if (liveBestSurvivalTime <= 0) {
    return 'n/a';
  }

  return `${liveBestSurvivalTime.toFixed(1)}s`;
};

export const getPersonalBestChaseText = ({
  telemetry,
  currentSurvivalTime,
}: {
  telemetry: GameplayTelemetry;
  currentSurvivalTime: number;
}): string => {
  const bestSurvivalTime = getBestSurvivalTime(telemetry);

  if (bestSurvivalTime === null || bestSurvivalTime <= 0) {
    return 'First best live';
  }

  const remainingToBeat = bestSurvivalTime - currentSurvivalTime;

  if (remainingToBeat > 0.04) {
    return `PB ${remainingToBeat.toFixed(1)}s to ${bestSurvivalTime.toFixed(1)}s`;
  }

  return `NEW BEST +${Math.max(currentSurvivalTime - bestSurvivalTime, 0).toFixed(1)}s`;
};

export const getSurvivalGoalChaseText = ({
  currentSurvivalTime,
}: {
  currentSurvivalTime: number;
}): string => {
  const remainingToClear = SURVIVAL_GOAL_SECONDS - currentSurvivalTime;

  if (
    currentSurvivalTime >= ENDGAME_CLEAR_CLIMB_START_SECONDS &&
    remainingToClear > 0.04
  ) {
    return `CLEAR CLIMB | ${remainingToClear.toFixed(1)}s to ${SURVIVAL_GOAL_SECONDS}s`;
  }

  if (remainingToClear > 0.04) {
    return `${remainingToClear.toFixed(1)}s TO ${SURVIVAL_GOAL_SECONDS}s CLEAR`;
  }

  return `${SURVIVAL_GOAL_SECONDS}s CLEAR`;
};

export const getWaitingIntroTitleText = (bestSurvivalTime: number | null): string => {
  if (bestSurvivalTime !== null && bestSurvivalTime >= SURVIVAL_GOAL_SECONDS) {
    return `${SURVIVAL_GOAL_SECONDS}s cleared. Push your best.`;
  }

  if (bestSurvivalTime !== null && bestSurvivalTime >= TARGET_FIRST_DEATH_SECONDS) {
    return `${TARGET_FIRST_DEATH_SECONDS}s broken. Now chase ${SURVIVAL_GOAL_SECONDS}.`;
  }

  return `Break ${TARGET_FIRST_DEATH_SECONDS}s. Then chase ${SURVIVAL_GOAL_SECONDS}.`;
};

export const getAverageRetryDelaySeconds = (telemetry: GameplayTelemetry): number | null => {
  if (telemetry.retryCount === 0) {
    return null;
  }

  return telemetry.totalRetryDelayMs / telemetry.retryCount / 1000;
};

export const getAverageRetryDelayText = (telemetry: GameplayTelemetry): string => {
  const averageRetryDelaySeconds = getAverageRetryDelaySeconds(telemetry);

  if (averageRetryDelaySeconds === null) {
    return 'n/a';
  }

  return `${averageRetryDelaySeconds.toFixed(1)}s`;
};

export const getRetryDelayMs = ({
  startedAt,
  sessionLastDeathAt,
  retryWindowMs,
}: {
  startedAt: number;
  sessionLastDeathAt: number | null;
  retryWindowMs: number;
}): number | null => {
  if (sessionLastDeathAt === null) {
    return null;
  }

  const retryDelayMs = startedAt - sessionLastDeathAt;

  if (retryDelayMs < 0 || retryDelayMs > retryWindowMs) {
    return null;
  }

  return retryDelayMs;
};

export const getFirstDeathTimeText = (telemetry: GameplayTelemetry): string => {
  if (telemetry.firstDeathTime === null) {
    return 'n/a';
  }

  return `${telemetry.firstDeathTime.toFixed(1)}s`;
};

export const getLowestDeathTime = (
  currentFirstDeathTime: number | null,
  survivalTime: number,
): number => (currentFirstDeathTime === null ? survivalTime : Math.min(currentFirstDeathTime, survivalTime));

export const getValidationProgressText = (telemetry: GameplayTelemetry): string => {
  if (telemetry.totalDeaths === 0) {
    return `0/${VALIDATION_SAMPLE_RUN_TARGET} runs`;
  }

  const completedRunCountText = `${Math.min(telemetry.totalDeaths, VALIDATION_SAMPLE_RUN_TARGET)}/${VALIDATION_SAMPLE_RUN_TARGET} runs`;

  if (telemetry.totalDeaths < VALIDATION_SAMPLE_RUN_TARGET) {
    return completedRunCountText;
  }

  const firstDeathTime = telemetry.firstDeathTime;

  if (firstDeathTime === null) {
    return `${completedRunCountText} | no death yet`;
  }

  const firstDeathStatus =
    firstDeathTime >= TARGET_FIRST_DEATH_SECONDS && telemetry.earlyDeathsUnderTarget === 0
      ? 'target met'
      : 'review early deaths';

  return `${completedRunCountText} | ${firstDeathStatus}`;
};

export const getEarlyDeathRate = (telemetry: GameplayTelemetry): number => {
  if (telemetry.totalDeaths === 0) {
    return 0;
  }

  return Math.round((telemetry.earlyDeathsUnderTarget / telemetry.totalDeaths) * 100);
};

export const getRecentDeathTimesText = (telemetry: GameplayTelemetry): string => {
  if (telemetry.recentDeathTimes.length === 0) {
    return 'n/a';
  }

  return telemetry.recentDeathTimes.map((time) => `${time.toFixed(1)}s`).join(', ');
};

export const buildTelemetrySummary = (
  label: string,
  telemetry: GameplayTelemetry,
): TelemetrySummary => ({
  label,
  runs: getCompletedRunCount(telemetry),
  startedRuns: telemetry.totalRuns,
  deaths: telemetry.totalDeaths,
  bestSurvivalTime: telemetry.bestSurvivalTime,
  firstDeathTime: telemetry.firstDeathTime,
  averageSurvivalTime: Number(getAverageSurvivalTime(telemetry).toFixed(1)),
  earlyDeathRate: getEarlyDeathRate(telemetry),
  averageRetryDelaySeconds: getAverageRetryDelaySeconds(telemetry),
  totalSpawnRerolls: telemetry.totalSpawnRerolls,
  recentDeathTimes: telemetry.recentDeathTimes,
  lastSurvivalTime: telemetry.lastSurvivalTime,
});

export const buildValidationReport = (telemetry: GameplayTelemetry): string => {
  const sessionSummary = buildTelemetrySummary('session', telemetry);
  const completedRunCount = telemetry.totalDeaths;
  const lastRunText =
    sessionSummary.lastSurvivalTime === null ? 'n/a' : `${sessionSummary.lastSurvivalTime.toFixed(1)}s`;
  const validationText = getValidationProgressText(telemetry).replaceAll(' | ', ', ');

  return [
    'validation_sample',
    `runs=${completedRunCount}`,
    `deaths=${sessionSummary.deaths}`,
    `avg_survival=${sessionSummary.averageSurvivalTime.toFixed(1)}s`,
    `first_death=${getFirstDeathTimeText(telemetry)}`,
    `early_death_rate=${sessionSummary.earlyDeathRate}%`,
    `avg_retry=${getAverageRetryDelayText(telemetry)}`,
    `spawn_saves=${sessionSummary.totalSpawnRerolls}`,
    `last_run=${lastRunText}`,
    `validation=${validationText}`,
    VALIDATION_BASELINE_TEXT,
  ].join(' | ');
};

export const parseValidationReportSummary = (
  report: string | null,
): ValidationReportSummary | null => {
  if (!report) {
    return null;
  }

  const parts = report.split(' | ');

  const readValue = (key: string): string | null => {
    const prefix = `${key}=`;
    const part = parts.find((entry) => entry.startsWith(prefix));
    return part ? part.slice(prefix.length) : null;
  };

  const runs = readValue('runs');
  const firstDeath = readValue('first_death');
  const earlyDeathRate = readValue('early_death_rate');
  const validation = readValue('validation');

  if (!runs || !firstDeath || !earlyDeathRate || !validation) {
    return null;
  }

  return {
    runs,
    firstDeath,
    earlyDeathRate,
    validation,
  };
};

export const formatValidationReportSummaryText = (report: string | null): string => {
  const summary = parseValidationReportSummary(report);

  if (!summary) {
    return 'not saved yet';
  }

  return `${summary.runs} runs | first death ${summary.firstDeath} | early ${summary.earlyDeathRate} | ${summary.validation}`;
};

export const isValidationReportCurrent = (
  report: string | null,
  telemetry: GameplayTelemetry,
): boolean => {
  if (!report || !hasCompletedRunSample(telemetry)) {
    return false;
  }

  return report === buildValidationReport(telemetry);
};

export const canResetTelemetrySample = (
  phase: 'waiting' | 'playing' | 'paused' | 'gameOver',
): boolean => phase === 'waiting';
