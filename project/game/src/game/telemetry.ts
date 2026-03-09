import { TARGET_FIRST_DEATH_SECONDS } from './balance.ts';

export const TELEMETRY_RECENT_RUN_LIMIT = 4;
export const VALIDATION_BASELINE_TEXT =
  'baseline=pacing 10/32/76 | deterministic survival 26.6s avg / 6.3s first death / 4% early';

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

export const getBestSurvivalTime = (telemetry: GameplayTelemetry): number | null =>
  telemetry.bestSurvivalTime;

export const getBestSurvivalTimeText = (telemetry: GameplayTelemetry): string => {
  const bestSurvivalTime = getBestSurvivalTime(telemetry);

  if (bestSurvivalTime === null) {
    return 'n/a';
  }

  return `${bestSurvivalTime.toFixed(1)}s`;
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
    return '0/5 runs';
  }

  const completedRunCountText = `${Math.min(telemetry.totalDeaths, 5)}/5 runs`;

  if (telemetry.totalDeaths < 5) {
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
  runs: telemetry.totalRuns,
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
  const lastRunText =
    sessionSummary.lastSurvivalTime === null ? 'n/a' : `${sessionSummary.lastSurvivalTime.toFixed(1)}s`;
  const validationText = getValidationProgressText(telemetry).replaceAll(' | ', ', ');

  return [
    'validation_sample',
    `runs=${sessionSummary.runs}`,
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
