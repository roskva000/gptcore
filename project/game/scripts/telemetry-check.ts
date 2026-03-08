import assert from 'node:assert/strict';
import {
  createBalanceSnapshotReport,
  createSurvivalSnapshotReport,
} from './telemetry-reports.ts';
import { createValidationSnapshotReport } from './validation-snapshot.ts';

const balanceReport = createBalanceSnapshotReport();
const survivalReport = createSurvivalSnapshotReport();
const validationReport = createValidationSnapshotReport();

const speedAt = (seconds: number): number => {
  const point = balanceReport.balanceCurve.find((entry) => entry.seconds === seconds);
  assert.ok(point, `Missing balance curve sample for ${seconds}s.`);
  return point.obstacleSpeed;
};

const spawnTargetLagAt = (seconds: number): number => {
  const point = balanceReport.balanceCurve.find((entry) => entry.seconds === seconds);
  assert.ok(point, `Missing balance curve sample for ${seconds}s.`);
  return point.spawnTargetLagSeconds;
};

const spawnCollisionGraceAt = (seconds: number): number => {
  const point = balanceReport.balanceCurve.find((entry) => entry.seconds === seconds);
  assert.ok(point, `Missing balance curve sample for ${seconds}s.`);
  return point.spawnCollisionGraceMs;
};

const spawnsBy = (seconds: number): number => {
  const point = balanceReport.spawnCounts.find((entry) => entry.seconds === seconds);
  assert.ok(point, `Missing spawn count sample for ${seconds}s.`);
  return point.count;
};

assert.equal(balanceReport.firstSpawnAtSeconds, 0.9, 'First spawn timing regressed.');
assert.deepEqual(
  balanceReport.firstTenSpawnTimes,
  [0.9, 1.9, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0],
  'Early pacing snapshot changed.',
);
assert.equal(spawnsBy(10), 10, '10s spawn pacing regressed.');
assert.equal(spawnsBy(30), 32, '30s spawn pacing regressed.');
assert.equal(spawnsBy(60), 76, '60s spawn pacing regressed.');
assert.equal(speedAt(0), 145, '0s obstacle speed changed unexpectedly.');
assert.equal(speedAt(10), 183, '10s obstacle speed changed unexpectedly.');
assert.equal(speedAt(30), 251, '30s obstacle speed changed unexpectedly.');
assert.equal(speedAt(45), 304, '45s obstacle speed changed unexpectedly.');
assert.equal(speedAt(60), 320, '60s obstacle speed changed unexpectedly.');
assert.equal(spawnTargetLagAt(0), 0.18, '0s spawn target lag changed unexpectedly.');
assert.equal(spawnTargetLagAt(10), 0.18, '10s spawn target lag changed unexpectedly.');
assert.equal(spawnTargetLagAt(15), 0, '15s spawn target lag changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(0), 260, '0s spawn collision grace changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(10), 260, '10s spawn collision grace changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(15), 0, '15s spawn collision grace changed unexpectedly.');

assert.equal(survivalReport.averageSurvivalTimeSeconds, 23.4, 'Average survival snapshot regressed.');
assert.equal(survivalReport.firstDeathTimeSeconds, 6.3, 'First death snapshot regressed.');
assert.equal(survivalReport.bestSurvivalTimeSeconds, 30, 'Best survival cap changed unexpectedly.');
assert.equal(survivalReport.earlyDeathRatePercent, 8, 'Early death rate snapshot regressed.');
assert.deepEqual(
  survivalReport.survivalBuckets,
  {
    under10Seconds: 2,
    between10And20Seconds: 5,
    between20And30Seconds: 6,
    reached30SecondsCap: 11,
  },
  'Survival bucket distribution regressed.',
);
assert.equal(survivalReport.averageSpawnCount, 24.5, 'Average spawn count snapshot changed unexpectedly.');
assert.equal(survivalReport.averageSpawnRerolls, 0, 'Spawn reroll snapshot changed unexpectedly.');
assert.equal(
  validationReport.validationSummary,
  '5 runs | first death 24.2s | early 40% | 5/5 runs, target met',
  'Validation export summary regressed.',
);
assert.equal(
  validationReport.validationReport,
  'validation_sample | runs=5 | deaths=5 | avg_survival=17.3s | first_death=24.2s | early_death_rate=40% | avg_retry=n/a | spawn_saves=0 | last_run=19.4s | validation=5/5 runs, target met | baseline=pacing 10/32/76 | deterministic survival 23.4s avg / 6.3s first death / 8% early',
  'Validation export contract changed unexpectedly.',
);

console.log(
  JSON.stringify(
    {
      status: 'ok',
      balance: {
        firstSpawnAtSeconds: balanceReport.firstSpawnAtSeconds,
        spawnCounts: balanceReport.spawnCounts,
      },
      survival: {
        averageSurvivalTimeSeconds: survivalReport.averageSurvivalTimeSeconds,
        firstDeathTimeSeconds: survivalReport.firstDeathTimeSeconds,
        earlyDeathRatePercent: survivalReport.earlyDeathRatePercent,
      },
      validation: {
        validationSummary: validationReport.validationSummary,
      },
    },
    null,
    2,
  ),
);
