import assert from 'node:assert/strict';
import {
  getEscapeGuideVector,
  getHorizontalCalloutCenterX,
  getVerticalCalloutPlacement,
} from '../src/game/deathOverlayLayout.ts';
import { getSpawnCollisionGraceMs, hasReachedSurvivalGoal } from '../src/game/balance.ts';
import {
  OBSTACLE_COLLISION_RADIUS,
  clampPointToArena,
  isPointInsideArena,
  selectSpawnPoint,
} from '../src/game/spawn.ts';
import { selectFatalThreatIndex } from '../src/game/deathAttribution.ts';
import { getImpactDirection } from '../src/game/impactDirection.ts';
import { getPointerSteeringVelocity } from '../src/game/pointerSteering.ts';
import { createNearMissState, evaluateNearMiss } from '../src/game/nearMiss.ts';
import {
  isPrimaryPointerDown,
  shouldRequirePointerReleaseAfterPause,
  shouldHandlePrimaryActionKey,
  shouldHandlePrimaryActionPointer,
} from '../src/game/primaryAction.ts';
import {
  buildValidationReport,
  buildTelemetrySummary,
  createEmptyTelemetry,
  getCompletedRunCount,
  hasCompletedRunSample,
  getRetryDelayMs,
} from '../src/game/telemetry.ts';
import {
  createBalanceSnapshotReport,
  createSeedTrajectoryReport,
  createSurvivalSnapshotReport,
} from './telemetry-reports.ts';
import { createValidationSnapshotReport } from './validation-snapshot.ts';

const balanceReport = createBalanceSnapshotReport();
const survivalReport = createSurvivalSnapshotReport();
const seed3TrajectoryReport = createSeedTrajectoryReport(3);
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

const createQueuedRandom = (values: number[]): ((min: number, max: number) => number) => {
  let index = 0;

  return (min: number, max: number): number => {
    const value = values[index];
    index += 1;
    assert.notEqual(value, undefined, 'Queued random ran out of values.');
    assert.ok(value >= min && value <= max, `Queued random value ${value} out of range ${min}-${max}.`);
    return value;
  };
};

assert.deepEqual(
  getVerticalCalloutPlacement({
    anchorY: 48,
    gap: 22,
    labelHalfHeight: 12,
    minY: 28,
    maxY: 572,
  }),
  {
    connectorY: 70,
    labelY: 82,
    placeBelow: true,
  },
  'Top-edge impact callouts should flip below the marker instead of clipping out of the arena.',
);
assert.deepEqual(
  getVerticalCalloutPlacement({
    anchorY: 556,
    gap: 18,
    labelHalfHeight: 20,
    minY: 40,
    maxY: 560,
  }),
  {
    connectorY: 538,
    labelY: 518,
    placeBelow: false,
  },
  'Bottom-edge fatal callouts should stay above the spotlight instead of running off the screen.',
);
assert.equal(
  getHorizontalCalloutCenterX({
    preferredCenterX: 48,
    labelHalfWidth: 60,
    minX: 20,
    maxX: 780,
  }),
  80,
  'Left-edge callouts should clamp their label center inside the arena instead of clipping offscreen.',
);
assert.equal(
  getHorizontalCalloutCenterX({
    preferredCenterX: 752,
    labelHalfWidth: 84,
    minX: 20,
    maxX: 780,
  }),
  696,
  'Right-edge callouts should clamp their label center inside the arena instead of clipping offscreen.',
);
assert.equal(
  getHorizontalCalloutCenterX({
    preferredCenterX: 44,
    labelHalfWidth: 420,
    minX: 20,
    maxX: 780,
  }),
  400,
  'Overwide callouts should fall back to the arena midpoint instead of producing an inverted clamp range.',
);
assert.equal(
  shouldHandlePrimaryActionKey(),
  true,
  'Primary action keys should still work for fresh Space/Enter presses.',
);
assert.equal(
  shouldHandlePrimaryActionKey({ repeat: false }),
  true,
  'Non-repeated primary key events should trigger start/retry/resume.',
);
assert.equal(
  shouldHandlePrimaryActionKey({ repeat: true }),
  false,
  'Held Space/Enter auto-repeat should not retrigger primary actions during waiting, pause, or game-over overlays.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({ button: 0 }),
  true,
  'Primary pointer presses should still trigger start/retry/resume.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({ wasTouch: true }),
  true,
  'Touch pointers should always count as primary actions instead of depending on mouse-button semantics.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({ button: 1 }),
  false,
  'Middle-click should not trigger primary actions.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({
    button: 0,
    event: { button: 2 } as PointerEvent,
  }),
  false,
  'Secondary-click native events should not trigger start/retry/resume even if the cached pointer button looks primary.',
);
assert.equal(
  isPrimaryPointerDown({
    isDown: true,
    wasTouch: true,
    primaryDown: true,
    button: 2,
  }),
  true,
  'Held touch input should keep steering/retry eligibility even if cached mouse-button state looks secondary.',
);
assert.equal(
  isPrimaryPointerDown(
    {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
    },
    true,
  ),
  false,
  'Canceled touch input should be treated as released so stale pointer state cannot keep steering or retry guards armed.',
);
assert.equal(
  isPrimaryPointerDown({
    isDown: true,
    wasTouch: true,
    primaryDown: false,
    button: 0,
  }),
  false,
  'Touch pointers without a primary-down state should not be treated as active held input.',
);
assert.equal(
  shouldRequirePointerReleaseAfterPause({
    isDown: false,
    wasTouch: true,
    primaryDown: false,
  }),
  false,
  'Focus-loss pause should not force an extra tap/click to resume when no primary pointer was active.',
);
assert.equal(
  shouldRequirePointerReleaseAfterPause({
    isDown: true,
    wasTouch: true,
    primaryDown: true,
  }),
  true,
  'Focus-loss pause should still require a release when a touch pointer was already holding input.',
);
assert.equal(
  shouldRequirePointerReleaseAfterPause(
    {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
    },
    true,
  ),
  false,
  'Canceled touch input should not force a stale release gate after focus loss or browser gesture interruption.',
);

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
assert.equal(speedAt(30), 253, '30s obstacle speed changed unexpectedly.');
assert.equal(speedAt(45), 308, '45s obstacle speed changed unexpectedly.');
assert.equal(speedAt(60), 320, '60s obstacle speed changed unexpectedly.');
assert.equal(balanceReport.balanceCurve.find((entry) => entry.seconds === 0)?.requiredSpawnDistance, 370, '0s required spawn distance changed unexpectedly.');
assert.equal(balanceReport.balanceCurve.find((entry) => entry.seconds === 5)?.requiredSpawnDistance, 335, '5s required spawn distance changed unexpectedly.');
assert.equal(balanceReport.balanceCurve.find((entry) => entry.seconds === 10)?.requiredSpawnDistance, 140, '10s required spawn distance changed unexpectedly.');
assert.equal(spawnTargetLagAt(0), 0.18, '0s spawn target lag changed unexpectedly.');
assert.equal(spawnTargetLagAt(10), 0.18, '10s spawn target lag changed unexpectedly.');
assert.equal(spawnTargetLagAt(15), 0, '15s spawn target lag changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(0), 260, '0s spawn collision grace changed unexpectedly.');
assert.equal(spawnCollisionGraceAt(10), 260, '10s spawn collision grace changed unexpectedly.');
assert.equal(
  getSpawnCollisionGraceMs(10.5),
  130,
  '10-11s spawn collision grace should fade instead of dropping to zero immediately.',
);
assert.equal(
  getSpawnCollisionGraceMs(11),
  0,
  '11s spawn collision grace should complete its fade-out and reach zero.',
);
assert.equal(
  hasReachedSurvivalGoal(59.9),
  false,
  'The 60s survival goal should not celebrate early.',
);
assert.equal(
  hasReachedSurvivalGoal(59.96),
  false,
  'The 60s survival goal should stay locked until the raw run clock clears the threshold, even if the UI rounds to 60.0s.',
);
assert.equal(
  hasReachedSurvivalGoal(60),
  true,
  'The 60s survival goal should trigger as soon as the run clears the namesake threshold.',
);
assert.equal(spawnCollisionGraceAt(15), 0, '15s spawn collision grace changed unexpectedly.');

const offscreenLaneStackSelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 720, y: 360 },
  activeObstaclePositions: [{ x: 801, y: 320 }],
  randomInt: createQueuedRandom([1, 30, 2, 0]),
});
assert.deepEqual(
  offscreenLaneStackSelection,
  {
    point: { x: 856, y: 30 },
    rerollsUsed: 0,
  },
  'Offscreen obstacles should not trigger lane-stack rerolls before they enter the arena.',
);

const visibleLaneStackSelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 720, y: 360 },
  activeObstaclePositions: [{ x: 789, y: 320 }],
  randomInt: createQueuedRandom([1, 30, 2, 0]),
});
assert.deepEqual(
  visibleLaneStackSelection,
  {
    point: { x: 0, y: 656 },
    rerollsUsed: 1,
  },
  'Visible nearby obstacles should still be able to trigger early lane-stack rerolls.',
);

const partialVisibleLaneStackSelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 720, y: 360 },
  activeObstaclePositions: [{ x: 799, y: 320 }],
  randomInt: createQueuedRandom([1, 30, 2, 0]),
});
assert.deepEqual(
  partialVisibleLaneStackSelection,
  {
    point: { x: 856, y: 30 },
    rerollsUsed: 0,
  },
  'Partially visible edge obstacles should not trigger lane-stack rerolls before their collider fully clears the arena.',
);

const projectedForwardSelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 308.6, y: 290.3 },
  playerVelocity: { x: -111.6, y: 136.3 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 700.9, y: 384.3 }],
  randomInt: createQueuedRandom([3, 303, 1, 527]),
});
assert.deepEqual(
  projectedForwardSelection,
  {
    point: { x: -56, y: 303 },
    rerollsUsed: 0,
  },
  'Projected-path forward-pressure should keep a safe left-edge spawn instead of rerolling into right-edge crossfire.',
);

assert.equal(
  hasCompletedRunSample(createEmptyTelemetry()),
  false,
  'Validation export readiness should stay false before the first completed run.',
);

const completedRunSampleTelemetry = createEmptyTelemetry();
completedRunSampleTelemetry.totalRuns = 2;
completedRunSampleTelemetry.totalDeaths = 1;
assert.equal(
  hasCompletedRunSample(completedRunSampleTelemetry),
  true,
  'Validation export readiness should unlock once at least one run has ended.',
);

const wallEdgeProjectedSelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 18, y: 300 },
  playerVelocity: { x: -260, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 96, y: 300 }],
  randomInt: createQueuedRandom([3, 300, 1, 300]),
});
assert.deepEqual(
  wallEdgeProjectedSelection,
  {
    point: { x: 856, y: 300 },
    rerollsUsed: 1,
  },
  'Projected-path spawn scoring should clamp wall-edge escape references inside the arena before judging nearby left-lane pressure.',
);

const wallPinnedForwardSelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 16, y: 16 },
  playerVelocity: { x: -260, y: -260 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 96, y: 300 }, { x: 60, y: 60 }],
  randomInt: createQueuedRandom([0, 369, 0, 788]),
});
assert.deepEqual(
  wallPinnedForwardSelection,
  {
    point: { x: 369, y: -56 },
    rerollsUsed: 0,
  },
  'Blocked wall movement should not reroll a safe top spawn solely because stale corner velocity still points further into the wall.',
);

assert.equal(
  isPointInsideArena({ x: 10, y: 300 }, { margin: OBSTACLE_COLLISION_RADIUS }),
  false,
  'Visible-arena hit margin should keep obstacle colliders inactive until fully inside the arena.',
);
assert.equal(
  isPointInsideArena({ x: 11, y: 300 }, { margin: OBSTACLE_COLLISION_RADIUS }),
  true,
  'Visible-arena hit margin should allow obstacle colliders once their center clears the radius threshold.',
);
assert.deepEqual(
  clampPointToArena(
    {
      x: -24,
      y: 640,
    },
    { margin: 16 },
  ),
  {
    x: 16,
    y: 584,
  },
  'Obstacle target lag should clamp to the player-reachable arena instead of impossible wall coordinates.',
);
assert.deepEqual(
  getPointerSteeringVelocity({
    playerPosition: { x: 16, y: 300 },
    pointerPosition: { x: -200, y: 180 },
    playerReachabilityMargin: 16,
    playerSpeed: 260,
    deadZonePx: 10,
    fullSpeedDistancePx: 120,
  }),
  { x: 0, y: -260 },
  'Pointer steering should clamp offscreen targets to the player-reachable arena so wall-edge drags do not waste velocity into an impossible outward lane.',
);
assert.deepEqual(
  getPointerSteeringVelocity({
    playerPosition: { x: 400, y: 300 },
    pointerPosition: { x: 404, y: 304 },
    playerReachabilityMargin: 16,
    playerSpeed: 260,
    deadZonePx: 10,
    fullSpeedDistancePx: 120,
  }),
  null,
  'Pointer steering should preserve the dead-zone when the clamped target still sits inside the close-control radius.',
);
assert.deepEqual(
  evaluateNearMiss(
    {
      playerPosition: { x: 400, y: 300 },
      playerVelocity: { x: 0, y: 0 },
      playerCollisionRadius: 16,
      obstaclePosition: { x: 435, y: 300 },
      obstacleVelocity: { x: -120, y: 0 },
      obstacleCollisionRadius: OBSTACLE_COLLISION_RADIUS,
      obstacleInsideVisibleArena: true,
      extraNearMissDistance: 22,
    },
    createNearMissState(),
  ),
  {
    currentDistanceSq: 1225,
    closestDistanceSq: 1225,
    hadClosingApproach: true,
    triggered: false,
  },
  'Near-miss tracking should arm while a close obstacle is still closing instead of firing too early.',
);
assert.deepEqual(
  evaluateNearMiss(
    {
      playerPosition: { x: 400, y: 300 },
      playerVelocity: { x: 0, y: 0 },
      playerCollisionRadius: 16,
      obstaclePosition: { x: 452, y: 300 },
      obstacleVelocity: { x: 120, y: 0 },
      obstacleCollisionRadius: OBSTACLE_COLLISION_RADIUS,
      obstacleInsideVisibleArena: true,
      extraNearMissDistance: 22,
    },
    {
      closestDistanceSq: 1225,
      hadClosingApproach: true,
    },
  ),
  {
    currentDistanceSq: 2704,
    closestDistanceSq: 1225,
    hadClosingApproach: true,
    triggered: true,
  },
  'Near-miss tracking should fire once the obstacle exits a close pass after a real closing approach without requiring a collision.',
);
assert.equal(
  evaluateNearMiss(
    {
      playerPosition: { x: 400, y: 300 },
      playerVelocity: { x: 0, y: 0 },
      playerCollisionRadius: 16,
      obstaclePosition: { x: 470, y: 300 },
      obstacleVelocity: { x: 120, y: 0 },
      obstacleCollisionRadius: OBSTACLE_COLLISION_RADIUS,
      obstacleInsideVisibleArena: true,
      extraNearMissDistance: 22,
    },
    createNearMissState(),
  ).triggered,
  false,
  'Near-miss tracking should ignore obstacles that only move away without ever threatening the player.',
);
assert.equal(
  evaluateNearMiss(
    {
      playerPosition: { x: 400, y: 300 },
      playerVelocity: { x: 0, y: 0 },
      playerCollisionRadius: 16,
      obstaclePosition: { x: 790, y: 300 },
      obstacleVelocity: { x: 120, y: 0 },
      obstacleCollisionRadius: OBSTACLE_COLLISION_RADIUS,
      obstacleInsideVisibleArena: false,
      extraNearMissDistance: 22,
    },
    {
      closestDistanceSq: 1225,
      hadClosingApproach: true,
    },
  ).triggered,
  false,
  'Near-miss tracking should not fire once the obstacle has already left the visible arena.',
);

assert.deepEqual(
  getEscapeGuideVector(0, 0),
  {
    guideOffsetX: 0,
    guideOffsetY: 0,
    isCentered: true,
  },
  'Centered overlaps should keep the escape guide neutral instead of drawing a fake upward lane.',
);
assert.deepEqual(
  getEscapeGuideVector(1, -1),
  {
    guideOffsetX: -1,
    guideOffsetY: 1,
    isCentered: false,
  },
  'Directional overlaps should still point the escape guide away from the fatal lane.',
);

assert.deepEqual(
  getImpactDirection(
    { x: 400, y: 300 },
    { x: 424, y: 300 },
    { x: 140, y: 0 },
  ),
  {
    label: 'right',
    sentence: 'the obstacle closed in from the right',
    offsetX: 1,
    offsetY: 0,
  },
  'Impact direction should prefer the obstacle position over world velocity for same-direction chase collisions.',
);

assert.deepEqual(
  getImpactDirection(
    { x: 400, y: 300 },
    { x: 401, y: 299 },
    { x: 0, y: 180 },
  ),
  {
    label: 'center',
    sentence: 'the impact overlapped your center line',
    offsetX: 0,
    offsetY: 0,
  },
  'Centered overlaps should stay centered so the death guidance can fall back to RESET CENTER instead of inventing a fake lane.',
);
assert.equal(
  selectFatalThreatIndex({
    playerPosition: { x: 400, y: 300 },
    playerVelocity: { x: 0, y: 0 },
    playerCollisionRadius: 16,
    candidates: [
      {
        position: { x: 426, y: 300 },
        velocity: { x: -120, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
      {
        position: { x: 418, y: 300 },
        velocity: { x: -80, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
    ],
  }),
  1,
  'Fatal threat selection should prefer the deepest overlapping obstacle instead of callback order.',
);
assert.equal(
  selectFatalThreatIndex({
    playerPosition: { x: 400, y: 300 },
    playerVelocity: { x: 40, y: 0 },
    playerCollisionRadius: 16,
    candidates: [
      {
        position: { x: 381, y: 300 },
        velocity: { x: 10, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
      {
        position: { x: 419, y: 300 },
        velocity: { x: -140, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
    ],
  }),
  1,
  'Fatal threat selection should break equal-depth ties toward the obstacle with the stronger closing vector.',
);

assert.equal(survivalReport.averageSurvivalTimeSeconds, 26.5, 'Average survival snapshot regressed.');
assert.equal(survivalReport.firstDeathTimeSeconds, 6.3, 'First death snapshot regressed.');
assert.equal(survivalReport.bestSurvivalTimeSeconds, 30, 'Best survival cap changed unexpectedly.');
assert.equal(survivalReport.earlyDeathRatePercent, 4, 'Early death rate snapshot regressed.');
assert.match(
  survivalReport.controller,
  /projected-path forward-alignment rerolls above 0\.5 dot through 6s \(80px-equivalent penalty\), projected-path lane-stack rerolls within 160px above 0\.55 dot through 6s \(120px-equivalent penalty\), .*11px visible-arena hit margin, and 96px offscreen cull margin/,
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
assert.equal(survivalReport.averageSpawnRerolls, 0.4, 'Spawn reroll snapshot changed unexpectedly.');
assert.equal(seed3TrajectoryReport.deathTimeSeconds, 6.3, 'Seed #3 trajectory baseline drifted.');
assert.equal(seed3TrajectoryReport.spawnsBeforeDeath, 6, 'Seed #3 spawn count changed unexpectedly.');
assert.equal(
  seed3TrajectoryReport.spawnRerollsBeforeDeath,
  0,
  'Seed #3 should still reach the 6.3s outlier without spawn rerolls.',
);
assert.deepEqual(
  seed3TrajectoryReport.spawnEvents.map((event) => ({
    spawnIndex: event.spawnIndex,
    timeSeconds: event.timeSeconds,
    spawnPoint: event.spawnPoint,
    visibleObstacleCount: event.visibleObstacleCount,
    nearestVisibleObstacleDistancePx: event.nearestVisibleObstacleDistancePx,
  })),
  [
    {
      spawnIndex: 1,
      timeSeconds: 0.9,
      spawnPoint: { x: 634, y: -56 },
      visibleObstacleCount: 0,
      nearestVisibleObstacleDistancePx: null,
    },
    {
      spawnIndex: 2,
      timeSeconds: 1.9,
      spawnPoint: { x: 856, y: 355 },
      visibleObstacleCount: 1,
      nearestVisibleObstacleDistancePx: 271.3,
    },
    {
      spawnIndex: 3,
      timeSeconds: 3,
      spawnPoint: { x: 3, y: 656 },
      visibleObstacleCount: 2,
      nearestVisibleObstacleDistancePx: 120,
    },
    {
      spawnIndex: 4,
      timeSeconds: 4,
      spawnPoint: { x: 636, y: -56 },
      visibleObstacleCount: 3,
      nearestVisibleObstacleDistancePx: 86.3,
    },
    {
      spawnIndex: 5,
      timeSeconds: 5,
      spawnPoint: { x: 856, y: 150 },
      visibleObstacleCount: 4,
      nearestVisibleObstacleDistancePx: 80.9,
    },
    {
      spawnIndex: 6,
      timeSeconds: 6,
      spawnPoint: { x: -56, y: 242 },
      visibleObstacleCount: 4,
      nearestVisibleObstacleDistancePx: 81.4,
    },
  ],
  'Seed #3 outlier trace changed unexpectedly.',
);
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
  buildValidationReport({
    ...createEmptyTelemetry(),
    totalRuns: 6,
    totalDeaths: 5,
    totalSurvivalTime: 120.5,
    bestSurvivalTime: 30,
    firstDeathTime: 6.3,
    earlyDeathsUnderTarget: 1,
    totalSpawnRerolls: 3,
    lastSurvivalTime: 30,
  }),
  'validation_sample | runs=5 | deaths=5 | avg_survival=24.1s | first_death=6.3s | early_death_rate=20% | avg_retry=n/a | spawn_saves=3 | last_run=30.0s | validation=5/5 runs, review early deaths | baseline=pacing 10/32/76 | deterministic survival 26.5s avg / 6.3s first death / 4% early',
  'Validation export should report only completed runs even if a fresh start increased totalRuns beyond totalDeaths.',
);
assert.equal(
  getCompletedRunCount({
    ...createEmptyTelemetry(),
    totalRuns: 6,
    totalDeaths: 5,
  }),
  5,
  'Completed-run helpers should stay aligned with validation/export semantics when fresh starts outnumber deaths.',
);
assert.deepEqual(
  buildTelemetrySummary('session', {
    ...createEmptyTelemetry(),
    totalRuns: 6,
    totalDeaths: 5,
    totalSurvivalTime: 120.5,
    bestSurvivalTime: 30,
    firstDeathTime: 6.3,
    earlyDeathsUnderTarget: 1,
    totalSpawnRerolls: 3,
    lastSurvivalTime: 30,
  }),
  {
    label: 'session',
    runs: 5,
    startedRuns: 6,
    deaths: 5,
    bestSurvivalTime: 30,
    firstDeathTime: 6.3,
    averageSurvivalTime: 24.1,
    earlyDeathRate: 20,
    averageRetryDelaySeconds: null,
    totalSpawnRerolls: 3,
    recentDeathTimes: [],
    lastSurvivalTime: 30,
  },
  'Telemetry summary should report completed runs while still exposing raw started-run count for debugging.',
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
