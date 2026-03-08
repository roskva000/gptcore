import { createSurvivalSnapshotReport } from './telemetry-reports.ts';
import {
  buildValidationReport,
  buildTelemetrySummary,
  createEmptyTelemetry,
  formatValidationReportSummaryText,
  type GameplayTelemetry,
} from '../src/game/telemetry.ts';
import { TARGET_FIRST_DEATH_SECONDS } from '../src/game/balance.ts';

const SAMPLE_RUN_COUNT = 5;

const createTelemetryFromRuns = (
  survivalTimes: number[],
  spawnRerolls: number[],
): GameplayTelemetry => {
  const telemetry = createEmptyTelemetry();

  for (let index = 0; index < survivalTimes.length; index += 1) {
    const survivalTime = survivalTimes[index];
    const rerolls = spawnRerolls[index] ?? 0;

    telemetry.totalRuns += 1;
    telemetry.totalDeaths += 1;
    telemetry.totalSurvivalTime += survivalTime;
    telemetry.firstDeathTime ??= survivalTime;
    telemetry.bestSurvivalTime = Math.max(telemetry.bestSurvivalTime ?? 0, survivalTime);
    telemetry.lastSurvivalTime = survivalTime;
    telemetry.lastRunSpawnRerolls = rerolls;
    telemetry.totalSpawnRerolls += rerolls;
    telemetry.recentDeathTimes = [survivalTime, ...telemetry.recentDeathTimes].slice(0, 4);

    if (survivalTime < TARGET_FIRST_DEATH_SECONDS) {
      telemetry.earlyDeathsUnderTarget += 1;
    }
  }

  return telemetry;
};

export const createValidationSnapshotReport = () => {
  const survivalReport = createSurvivalSnapshotReport();
  const sampleRuns = survivalReport.sampleRuns.slice(0, SAMPLE_RUN_COUNT);
  const sampleTelemetry = createTelemetryFromRuns(
    sampleRuns.map((run) => run.survivalTimeSeconds),
    sampleRuns.map((run) => run.spawnRerolls),
  );
  const validationReport = buildValidationReport(sampleTelemetry);

  return {
    sampleRunSeeds: sampleRuns.map((run) => run.seed),
    sampleRunTimes: sampleRuns.map((run) => run.survivalTimeSeconds),
    sessionSummary: buildTelemetrySummary('session', sampleTelemetry),
    validationReport,
    validationSummary: formatValidationReportSummaryText(validationReport),
  };
};

if (process.argv[1]?.endsWith('validation-snapshot.ts')) {
  console.log(JSON.stringify(createValidationSnapshotReport(), null, 2));
}
