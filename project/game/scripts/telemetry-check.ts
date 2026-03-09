import assert from 'node:assert/strict';
import { getRetryDelayMs } from '../src/game/telemetry.ts';
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
assert.equal(speedAt(15), 200, '15s obstacle speed changed unexpectedly.');
assert.equal(speedAt(20), 217, '20s obstacle speed changed unexpectedly.');
assert.equal(speedAt(30), 254, '30s obstacle speed changed unexpectedly.');
assert.equal(speedAt(45), 310, '45s obstacle speed changed unexpectedly.');
assert.equal(speedAt(60), 320, '60s obstacle speed changed unexpectedly.');
assert.equal(balanceReport.balanceCurve.find((entry) => entry.seconds === 0)?.requiredSpawnDistance, 370, '0s required spawn distance changed unexpectedly.');
assert.equal(balanceReport.balanceCurve.find((entry) => entry.seconds === 5)?.requiredSpawnDistance, 335, '5s required spawn distance changed unexpectedly.');
assert.equal(balanceReport.balanceCurve.find((entry) => entry.seconds === 10)?.requiredSpawnDistance, 140, '10s required spawn distance changed unexpectedly.');
assert.equal(spawnTargetLagAt(0), 0.18, '0s spawn target lag changed unexpectedly.');
assert.equal(spawnTargetLagAt(10), 0.18, '10s spawn target lag changed unexpectedly.');
assert.equal(spawnTargetLagAt(15), 0, '15s spawn target lag changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(0), 260, '0s spawn collision grace changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(10), 260, '10s spawn collision grace changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(15), 0, '15s spawn collision grace changed unexpectedly.');

assert.equal(survivalReport.averageSurvivalTimeSeconds, 26.5, 'Average survival snapshot regressed.');
assert.equal(survivalReport.firstDeathTimeSeconds, 6.3, 'First death snapshot regressed.');
assert.equal(survivalReport.bestSurvivalTimeSeconds, 30, 'Best survival cap changed unexpectedly.');
assert.equal(survivalReport.earlyDeathRatePercent, 4, 'Early death rate snapshot regressed.');
assert.match(
  survivalReport.controller,
  /lane-stack rerolls within 160px above 0\.55 dot through 6s \(120px-equivalent penalty\), .*visible-arena hit guard, and 96px offscreen cull margin/,
  'Deterministic survival proxy no longer matches runtime spawn-selection, collision, and cull guards.',
);
assert.deepEqual(
  survivalReport.survivalBuckets,
  {
    under10Seconds: 1,
    between10And20Seconds: 3,
    between20And30Seconds: 3,
    reached30SecondsCap: 17,
  },
  'Survival bucket distribution regressed.',
);
assert.equal(survivalReport.averageSpawnCount, 28, 'Average spawn count snapshot changed unexpectedly.');
assert.equal(survivalReport.averageSpawnRerolls, 0.5, 'Spawn reroll snapshot changed unexpectedly.');
assert.equal(
  validationReport.validationSummary,
  '5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths',
  'Validation export summary regressed.',
);
assert.equal(
  validationReport.validationReport,
  'validation_sample | runs=5 | deaths=5 | avg_survival=24.1s | first_death=6.3s | early_death_rate=20% | avg_retry=n/a | spawn_saves=3 | last_run=30.0s | validation=5/5 runs, review early deaths | baseline=pacing 10/32/76 | deterministic survival 26.5s avg / 6.3s first death / 4% early',
  'Validation export contract changed unexpectedly.',
);
assert.equal(
  getRetryDelayMs({
    startedAt: 10_000,
    sessionLastDeathAt: null,
    retryWindowMs: 15_000,
  }),
  null,
  'Fresh browser sessions should not inherit retry delay from lifetime storage.',
);
assert.equal(
  getRetryDelayMs({
    startedAt: 10_000,
    sessionLastDeathAt: 6_500,
    retryWindowMs: 15_000,
  }),
  3_500,
  'Same-session retry delay should still be tracked.',
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
