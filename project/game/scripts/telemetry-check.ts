import assert from 'node:assert/strict';
import {
  getHorizontalCalloutCenterX,
  getVerticalCalloutPlacement,
} from '../src/game/deathOverlayLayout.ts';
import {
  DRIFT_OBSTACLE_CADENCE,
  DRIFT_OBSTACLE_ROTATION_DEGREES,
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  ECHO_OBSTACLE_TARGET_LAG_SECONDS,
  LEAD_OBSTACLE_CADENCE,
  LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  STRAFE_OBSTACLE_CADENCE,
  STRAFE_OBSTACLE_ROTATION_DEGREES,
  STRAFE_OBSTACLE_UNLOCK_SECONDS,
  SURGE_OBSTACLE_SPEED_MULTIPLIER,
  getObstacleTravelDirection,
  getObstacleTargetLagSeconds,
  getSpawnCollisionGraceMs,
  getObstacleSpeedMultiplier,
  getObstacleTint,
  getObstacleVariant,
  hasReachedFirstDeathTarget,
  hasReachedSurvivalGoal,
} from '../src/game/balance.ts';
import {
  OBSTACLE_COLLISION_RADIUS,
  clampPointToArena,
  getSpawnTargetPoint,
  isPointInsideArena,
  selectSpawnPoint,
} from '../src/game/spawn.ts';
import { selectFatalThreatIndex } from '../src/game/deathAttribution.ts';
import { getImpactDirection } from '../src/game/impactDirection.ts';
import { getDeathPresentation } from '../src/game/deathPresentation.ts';
import { getPointerSteeringVelocity } from '../src/game/pointerSteering.ts';
import {
  COLLISION_READY_OBSTACLE_DEPTH,
  getObstacleDepth,
  getSpawnGraceVisualState,
  SPAWN_GRACE_DEPTH,
} from '../src/game/spawnGrace.ts';
import {
  createNearMissState,
  evaluateNearMiss,
  getNearMissLabel,
  isNearMissHintActive,
} from '../src/game/nearMiss.ts';
import { getFeedbackAudioContextCtor } from '../src/game/feedbackAudio.ts';
import { getArenaBeatSpectacle } from '../src/game/arenaBeatSpectacle.ts';
import {
  getNextRunHorizonBeatText,
  getRunBeatAnnouncement,
  getRunHorizonText,
} from '../src/game/runHorizon.ts';
import {
  hasFreshMovementInput,
  hasPrimaryActionReleaseRequirement,
  getLaunchActionPromptText,
  getResumeActionPromptText,
  getRetryActionPromptText,
  isPrimaryPointerDown,
  shouldAllowPrimaryActionKeyPress,
  shouldAllowFreshMovementPrimaryAction,
  shouldAllowHeldPrimaryAction,
  shouldDelayPointerSteeringAfterPrimaryAction,
  shouldRequirePointerReleaseAfterPause,
  shouldAllowPointerPrimaryActionPress,
  shouldClearPrimaryActionKeyReleaseRequirement,
  shouldClearMovementReleaseRequirement,
  shouldClearPointerReleaseRequirement,
  shouldHandlePrimaryActionKey,
  shouldHandlePrimaryActionPointer,
  shouldObservePointerReleaseAfterFocusLoss,
  shouldObservePrimaryActionKeyReleaseAfterReset,
  shouldObserveMovementReleaseAfterReset,
  shouldRequirePointerReleaseObservationAfterFocusLoss,
} from '../src/game/primaryAction.ts';
import {
  isGameplayViewportAnchorPhase,
  shouldRestorePanelScroll,
} from '../src/shell/focusMode.ts';
import {
  buildValidationReport,
  canResetTelemetrySample,
  buildTelemetrySummary,
  createEmptyTelemetry,
  getCompletedRunCount,
  getLiveBestSurvivalTimeText,
  getSurvivalGoalChaseText,
  getWaitingIntroTitleText,
  hasCompletedRunSample,
  getRetryDelayMs,
  isValidationReportCurrent,
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

const FakeAudioContext = class FakeAudioContext {} as typeof AudioContext;
const deathPresentation = getDeathPresentation({
  hitDirection: { offsetX: -1, offsetY: 0, label: 'left' },
  survivalTimeSeconds: 12.3,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 3,
    totalRuns: 3,
    firstDeathTime: 8.4,
    totalRetryDelayMs: 4200,
    retryCount: 3,
    recentDeathTimes: [8.4, 10.2, 12.3],
  },
  isNewBest: true,
  bestSurvivalTimeText: '12.3s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK RIGHT',
});
assert.equal(
  deathPresentation.callout,
  'DEATH SNAPSHOT',
  'Death overlay should open with a stable snapshot label instead of repeating the same lane wording in multiple places.',
);
assert.equal(
  deathPresentation.badge,
  'NEW BEST',
  'A new-best death should earn a compact badge so the game-over surface feels more like a dramatic snapshot than a wall of text.',
);
assert.equal(
  deathPresentation.title,
  'Hit from left',
  'Death overlay title should keep the hit direction explicit for readability.',
);
assert.equal(
  deathPresentation.body,
  'Run 12.3s. New best set.\n10s gate cleared. 60s is still live.',
  'Death overlay body should summarize both the run result and the next objective in two short lines.',
);
assert.equal(
  deathPresentation.prompt,
  'Next lane: BREAK RIGHT\nNext beat: 15s surge\nRetry: Space, Enter, tap/click, or move',
  'Death overlay prompt should pair the escape lane hint with the next unlock beat and the retry affordance in one compact block.',
);
assert.equal(
  deathPresentation.stats,
  'Recent 8.4s, 10.2s, 12.3s\nValidation 3/5 runs | Retry 1.4s',
  'Death overlay stats should keep recent runs and retry pace visible without reopening the full telemetry wall.',
);
assert.equal(
  getRunHorizonText(0),
  'Fresh run. Break 10s to open the ladder.\nNext: 10s gate -> 12s strafe -> 15s surge',
  'Waiting horizon should preview the first visible beats so the run reads like a ladder instead of a flat survival timer.',
);
assert.equal(
  getRunHorizonText(16),
  'Unlocked: 10s gate | 12s strafe | 15s surge\nNext: 18s lead -> 24s echo -> 32s drift',
  'Mid-run horizon should show both cleared beats and the next mutations that still sit ahead of the player.',
);
assert.equal(
  getNextRunHorizonBeatText(12.3),
  'Next beat: 15s surge',
  'Game-over horizon text should point at the next upcoming beat after the current death time.',
);
assert.deepEqual(
  getRunBeatAnnouncement(12),
  {
    label: 'strafe',
    title: 'STRAFE LIVE',
    body: 'Cross-lane cuts are online. Break the sweep.',
  },
  'The first active-run mutation should announce its strafe identity as soon as the beat unlocks.',
);
assert.deepEqual(
  getRunBeatAnnouncement(34),
  {
    label: 'drift',
    title: 'DRIFT LIVE',
    body: 'Late-run drift is online. Stretch the lane.',
  },
  'Late-run announcements should point at the newest live beat instead of repeating an earlier unlock.',
);
assert.equal(
  getRunBeatAnnouncement(9.9),
  null,
  'No beat announcement should fire before the first post-gate mutation is actually live.',
);
const openingSpectacle = getArenaBeatSpectacle({
  phase: 'playing',
  progressSeconds: 0,
  pulseMs: 0,
});
assert.equal(
  openingSpectacle.activeBeatLabel,
  'opening',
  'Arena spectacle should start in the opening phase before the first visible beat is reached.',
);
assert.equal(
  openingSpectacle.nextBeatLabel,
  'gate',
  'Opening spectacle should still preview the first gate beat instead of jumping straight to a later mutation color.',
);
const driftSpectacle = getArenaBeatSpectacle({
  phase: 'playing',
  progressSeconds: 34,
  pulseMs: 0,
});
assert.equal(
  driftSpectacle.activeBeatLabel,
  'drift',
  'Arena spectacle should switch to the drift phase once the late-run mutation is live.',
);
assert.equal(
  driftSpectacle.nextBeatLabel,
  'clear',
  'Late-run spectacle should still point toward the 60s clear instead of treating drift as the final run identity.',
);
const waitingSpectacle = getArenaBeatSpectacle({
  phase: 'waiting',
  progressSeconds: 34,
  pulseMs: 0,
});
assert.ok(
  waitingSpectacle.glowAlpha < driftSpectacle.glowAlpha,
  'Waiting spectacle should preview the unlocked beat ladder more softly than the active run version.',
);
assert.equal(
  getFeedbackAudioContextCtor({ AudioContext: FakeAudioContext }),
  FakeAudioContext,
  'Standard AudioContext environments should keep using the primary constructor path.',
);
const FakeWebkitAudioContext = class FakeWebkitAudioContext {} as typeof AudioContext;
assert.equal(
  getFeedbackAudioContextCtor({ webkitAudioContext: FakeWebkitAudioContext }),
  FakeWebkitAudioContext,
  'WebKit-only environments should still expose feedback audio so mobile Safari can play the existing milestone and death cues.',
);
assert.equal(
  getFeedbackAudioContextCtor({}),
  null,
  'Environments without any audio context constructor should skip feedback audio gracefully.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 14.9,
    runSpawnCount: 4,
  }),
  'standard',
  'Surge obstacles should stay locked until the run has moved past the flat opener and into mid-run play.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 15,
    runSpawnCount: 5,
  }),
  'surge',
  'Every fifth spawn after the unlock point should become a surge obstacle so the new pressure beat stays readable without turning into a constant spike.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: STRAFE_OBSTACLE_UNLOCK_SECONDS,
    runSpawnCount: STRAFE_OBSTACLE_CADENCE,
  }),
  'strafe',
  'Every eighth spawn after 12s should become a strafe obstacle so the post-10s corridor gains a fresh cross-lane beat before surge and lead stack on top.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    runSpawnCount: LEAD_OBSTACLE_CADENCE,
  }),
  'lead',
  'Every ninth spawn after 18s should become a lead obstacle so mid-run play gains a fresh predictive beat before the later echo and drift variants unlock.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 24,
    runSpawnCount: 6,
  }),
  'echo',
  'Every sixth spawn after 24s should become an echo obstacle so later runs gain a new beat instead of repeating the same direct-chase rhythm forever.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 27,
    runSpawnCount: 18,
  }),
  'echo',
  'Echo cadence should take priority when a mid-late spawn lands on both the lead and echo cadences so the newer beat stays visible.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS,
    runSpawnCount: DRIFT_OBSTACLE_CADENCE,
  }),
  'drift',
  'Every seventh spawn after 32s should become a drift obstacle so late runs gain a fresh lateral beat instead of only more direct-chase pressure.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 42,
    runSpawnCount: 42,
  }),
  'drift',
  'Drift cadence should take priority when a late-run spawn lands on every mutation cadence so the newest beat stays visible.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 30,
    runSpawnCount: 30,
  }),
  'echo',
  'Echo cadence should take priority when a late-run spawn lands on both mutation cadences so the second beat stays visible.',
);
assert.equal(
  getObstacleSpeedMultiplier('standard'),
  1,
  'Standard obstacles should keep the base speed curve unchanged.',
);
assert.equal(
  getObstacleSpeedMultiplier('surge'),
  SURGE_OBSTACLE_SPEED_MULTIPLIER,
  'Surge obstacles should apply the tuned speed multiplier instead of inventing a second balance curve.',
);
assert.equal(
  getObstacleTint('surge'),
  0xffd38a,
  'Surge obstacles should expose a dedicated tint so the faster threat stays visually readable.',
);
assert.equal(
  getObstacleTint('strafe'),
  0xffb88a,
  'Strafe obstacles should expose their own tint so the new post-10s beat reads separately from surge, lead, echo, and drift threats.',
);
assert.equal(
  getObstacleTint('lead'),
  0xff9eb1,
  'Lead obstacles should expose their own tint so the predictive mid-run beat reads separately from surge, echo, and drift threats.',
);
assert.equal(
  getObstacleTint('echo'),
  0x8ad9ff,
  'Echo obstacles should expose their own tint so the late-run mutation reads as a distinct threat family.',
);
assert.equal(
  getObstacleTint('drift'),
  0xc8ff9a,
  'Drift obstacles should expose their own tint so the lateral late-run beat stays readable.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        variant: 'strafe',
        runSpawnCount: STRAFE_OBSTACLE_CADENCE,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.97,
    y: 0.242,
  },
  'Strafe beats should cut across the current movement lane instead of reading like another straight chase obstacle right after the 10s milestone.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        variant: 'drift',
        runSpawnCount: DRIFT_OBSTACLE_CADENCE,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.927,
    y: 0.375,
  },
  'The first drift beat should rotate its travel line off the direct chase vector instead of feeling identical to a standard obstacle.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        variant: 'drift',
        runSpawnCount: DRIFT_OBSTACLE_CADENCE * 2,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.927,
    y: -0.375,
  },
  'Alternating drift beats should sweep to the opposite side so the new mutation does not lock into a single repeated lane.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    variant: 'lead',
  }),
  -LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
  'Lead obstacles should aim a short distance ahead of the player so the new beat cuts off the current escape line instead of trailing behind it like standard threats.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: 24,
    variant: 'echo',
  }),
  ECHO_OBSTACLE_TARGET_LAG_SECONDS,
  'Echo obstacles should trail the player with a dedicated target lag once the late-run mutation unlocks.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: 5,
    variant: 'standard',
  }),
  0.18,
  'Standard obstacles should keep the original early target lag contract.',
);
assert.deepEqual(
  getSpawnTargetPoint({
    playerPosition: { x: 784, y: 300 },
    playerVelocity: { x: 214, y: -120 },
    playerReachabilityMargin: 16,
    targetLagSeconds: 0.18,
  }),
  {
    x: 784,
    y: 321.6,
  },
  'Spawn target lag should ignore the blocked rightward wall push while still honoring the reachable vertical drift.',
);
assert.deepEqual(
  getSpawnTargetPoint({
    playerPosition: { x: 16, y: 16 },
    playerVelocity: { x: -214, y: -120 },
    playerReachabilityMargin: 16,
    targetLagSeconds: 0.18,
  }),
  {
    x: 16,
    y: 16,
  },
  'Spawn target lag should collapse to the clamped player position when both movement axes are blocked by arena walls.',
);
assert.equal(
  balanceReport.surgeObstacleUnlockSeconds,
  15,
  'Balance snapshot should publish the surge unlock second so deterministic reports expose when the mutation begins.',
);
assert.equal(
  balanceReport.surgeObstacleCadence,
  5,
  'Balance snapshot should publish the surge cadence so deterministic reports expose how often the faster threat appears.',
);
assert.equal(
  balanceReport.surgeObstacleSpeedMultiplier,
  SURGE_OBSTACLE_SPEED_MULTIPLIER,
  'Balance snapshot should publish the surge speed multiplier so runtime and proxy stay aligned.',
);
assert.equal(
  balanceReport.strafeObstacleUnlockSeconds,
  STRAFE_OBSTACLE_UNLOCK_SECONDS,
  'Balance snapshot should publish the strafe unlock second so deterministic reports expose when the new post-10s beat begins.',
);
assert.equal(
  balanceReport.strafeObstacleCadence,
  STRAFE_OBSTACLE_CADENCE,
  'Balance snapshot should publish the strafe cadence so runtime and deterministic proxy stay aligned on the new cross-lane beat.',
);
assert.equal(
  balanceReport.strafeObstacleRotationDegrees,
  STRAFE_OBSTACLE_ROTATION_DEGREES,
  'Balance snapshot should publish the strafe travel rotation so deterministic reports describe the actual post-10s trajectory change.',
);
assert.equal(
  balanceReport.leadObstacleUnlockSeconds,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  'Balance snapshot should publish the lead unlock second so deterministic reports expose when the new mid-run beat begins.',
);
assert.equal(
  balanceReport.leadObstacleCadence,
  LEAD_OBSTACLE_CADENCE,
  'Balance snapshot should publish the lead cadence so runtime and proxy stay aligned on the predictive mid-run beat.',
);
assert.equal(
  balanceReport.leadObstacleTargetLeadSeconds,
  LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
  'Balance snapshot should publish the lead target lead so deterministic reports describe the actual predictive trajectory.',
);
assert.equal(
  balanceReport.driftObstacleUnlockSeconds,
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  'Balance snapshot should publish the drift unlock second so deterministic reports expose when the third beat begins.',
);
assert.equal(
  balanceReport.driftObstacleCadence,
  DRIFT_OBSTACLE_CADENCE,
  'Balance snapshot should publish the drift cadence so runtime and proxy stay aligned on the new late-run beat.',
);
assert.equal(
  balanceReport.driftObstacleRotationDegrees,
  DRIFT_OBSTACLE_ROTATION_DEGREES,
  'Balance snapshot should publish the drift travel rotation so deterministic reports describe the actual late-run trajectory.',
);
assert.equal(
  balanceReport.echoObstacleUnlockSeconds,
  24,
  'Balance snapshot should publish the echo unlock second so deterministic reports expose when the late-run mutation begins.',
);
assert.equal(
  balanceReport.echoObstacleCadence,
  6,
  'Balance snapshot should publish the echo cadence so runtime and proxy stay aligned on the late-run beat.',
);
assert.equal(
  balanceReport.echoObstacleTargetLagSeconds,
  ECHO_OBSTACLE_TARGET_LAG_SECONDS,
  'Balance snapshot should publish the echo target lag so deterministic and runtime trajectories stay aligned.',
);

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
  isGameplayViewportAnchorPhase('playing'),
  true,
  'Narrow-layout focus mode should keep the game anchored while a run is active.',
);
assert.equal(
  isGameplayViewportAnchorPhase('gameOver'),
  false,
  'Game-over should release the active-run anchor without pretending the run is still live.',
);
assert.equal(
  shouldRestorePanelScroll({
    phase: 'gameOver',
    savedPanelScrollY: 320,
  }),
  false,
  'Game-over should keep the death overlay in view instead of auto-jumping back to the panels before the player can retry.',
);
assert.equal(
  shouldRestorePanelScroll({
    phase: 'waiting',
    savedPanelScrollY: 320,
  }),
  true,
  'Waiting can restore the pre-run panel scroll because the instant-retry loop is no longer in focus.',
);
assert.equal(
  canResetTelemetrySample('waiting'),
  true,
  'Telemetry reset should stay available from the waiting screen where no live retry intent can be confused with a destructive command.',
);
assert.equal(
  canResetTelemetrySample('gameOver'),
  false,
  'Game-over should not allow telemetry reset directly because players may press R expecting a retry and accidentally wipe the current sample.',
);
assert.equal(
  getLiveBestSurvivalTimeText({
    telemetry: createEmptyTelemetry(),
    currentSurvivalTime: 12.6,
  }),
  '12.6s',
  'Active HUD best text should surface the current run immediately when there is no stored best yet.',
);
assert.equal(
  getLiveBestSurvivalTimeText({
    telemetry: {
      ...createEmptyTelemetry(),
      bestSurvivalTime: 18.4,
    },
    currentSurvivalTime: 24.2,
  }),
  '24.2s',
  'Active HUD best text should promote a live run once it beats the stored best instead of waiting for death.',
);
assert.equal(
  getLiveBestSurvivalTimeText({
    telemetry: {
      ...createEmptyTelemetry(),
      bestSurvivalTime: 24.2,
    },
    currentSurvivalTime: 18.4,
  }),
  '24.2s',
  'Active HUD best text should keep the stored best when the current run has not surpassed it yet.',
);
assert.equal(
  getWaitingIntroTitleText(null),
  'Break 10s. Then chase 60.',
  'Fresh waiting copy should keep the first-run coaching when no best is stored yet.',
);
assert.equal(
  getWaitingIntroTitleText(10),
  '10s broken. Now chase 60.',
  'Waiting copy should acknowledge when the player has already cleared the first-death target.',
);
assert.equal(
  getWaitingIntroTitleText(60),
  '60s cleared. Push your best.',
  'Waiting copy should acknowledge when the namesake goal is already banked.',
);
assert.equal(
  getSurvivalGoalChaseText({
    currentSurvivalTime: 18.4,
  }),
  '41.6s TO 60s CLEAR',
  'The live goal badge should keep the namesake clear target visible before the run reaches 60s.',
);
assert.equal(
  getSurvivalGoalChaseText({
    currentSurvivalTime: 60,
  }),
  '60s CLEAR',
  'The live goal badge should collapse to a clean clear label once the namesake target is reached.',
);
assert.equal(
  getLaunchActionPromptText(),
  'Space, Enter, tap/click, or press/hold a move input',
  'Launch prompt copy should advertise the move-input path instead of hiding a valid start action.',
);
assert.equal(
  getRetryActionPromptText(),
  'Space, Enter, tap/click, or move',
  'Retry prompt copy should stay compact while matching the valid primary-action routes.',
);
assert.equal(
  getResumeActionPromptText(),
  'Space, Enter, tap/click again, or press/hold your move input again',
  'Resume prompt copy should keep the release-then-act contract explicit after focus loss.',
);
assert.equal(
  shouldHandlePrimaryActionKey(),
  true,
  'Primary action keys should still work for fresh Space/Enter presses.',
);
assert.equal(
  hasFreshMovementInput(1, 0),
  true,
  'A fresh movement press should be recognized immediately after all movement keys were released.',
);
assert.equal(
  hasFreshMovementInput(1, 1),
  false,
  'Held movement should not be misread as a fresh press every frame.',
);
assert.equal(
  hasFreshMovementInput(1 | 4, 1),
  true,
  'Adding a new movement direction should count as fresh retry/resume intent instead of inheriting the held key from the previous run state.',
);
assert.equal(
  hasFreshMovementInput(1 | 4, 1 | 4),
  false,
  'An unchanged diagonal hold should not retrigger replay/resume every frame after the new direction is already active.',
);
assert.equal(
  shouldAllowFreshMovementPrimaryAction({
    hasFreshMovementInput: true,
    releaseRequired: true,
  }),
  false,
  'Fresh movement directions should stay blocked while pause/retry still requires the previous held input to be fully released.',
);
assert.equal(
  shouldAllowFreshMovementPrimaryAction({
    hasFreshMovementInput: true,
    releaseRequired: false,
  }),
  true,
  'Fresh movement directions should resume/start immediately once the held-input release gate is cleared.',
);
assert.equal(
  shouldAllowFreshMovementPrimaryAction({
    hasFreshMovementInput: false,
    releaseRequired: false,
  }),
  false,
  'Movement gating should not fabricate a fresh primary action when the directional state never changed.',
);
assert.equal(
  hasPrimaryActionReleaseRequirement({
    movementReleaseRequired: true,
  }),
  true,
  'Any armed movement release gate should block cross-input primary actions until the stale hold is released.',
);
assert.equal(
  hasPrimaryActionReleaseRequirement({
    pointerReleaseRequired: true,
  }),
  true,
  'Any armed pointer release gate should block cross-input primary actions until the stale hold is released.',
);
assert.equal(
  hasPrimaryActionReleaseRequirement({
    keyReleaseRequired: true,
  }),
  true,
  'Any armed Space/Enter release gate should block cross-input primary actions until the stale hold is released.',
);
assert.equal(
  hasPrimaryActionReleaseRequirement(),
  false,
  'Cross-input primary actions should stay available when no release gate is armed.',
);
assert.equal(
  shouldAllowHeldPrimaryAction({
    hasHeldInput: true,
    releaseRequired: true,
  }),
  false,
  'Held movement or pointer paths should stay blocked while any stale release gate is still armed.',
);
assert.equal(
  shouldAllowHeldPrimaryAction({
    hasHeldInput: true,
    releaseRequired: false,
  }),
  true,
  'Held movement or pointer paths should reactivate once every stale release gate has cleared.',
);
assert.equal(
  shouldClearMovementReleaseRequirement({
    movementInputActive: false,
  }),
  true,
  'Movement release should clear replay/resume release gates immediately when no movement key remains held.',
);
assert.equal(
  shouldClearMovementReleaseRequirement({
    movementInputActive: true,
  }),
  false,
  'Movement release gates must stay armed while at least one movement key is still held.',
);
assert.equal(
  shouldClearMovementReleaseRequirement({
    movementInputActive: false,
    postResetReleaseObservationPending: true,
  }),
  false,
  'Focus-loss keyboard resets should not clear a held-movement release gate until movement is observed again after refocus.',
);
assert.equal(
  shouldObserveMovementReleaseAfterReset({
    movementInputActive: true,
    postResetReleaseObservationPending: true,
  }),
  true,
  'The first refocused movement state after a keyboard reset should only re-arm release observation, not silently unblock resume/retry.',
);
assert.equal(
  shouldObserveMovementReleaseAfterReset({
    movementInputActive: false,
    postResetReleaseObservationPending: true,
  }),
  false,
  'A still-idle keyboard after focus loss should keep waiting for observed movement before a later release can clear the gate.',
);
assert.equal(
  shouldClearMovementReleaseRequirement({
    movementInputActive: false,
    postResetReleaseObservationPending: false,
  }),
  true,
  'Once movement has been observed again after refocus, releasing it should clear the held-movement gate normally.',
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
  shouldAllowPrimaryActionKeyPress({
    event: { repeat: false } as KeyboardEvent,
    movementReleaseRequired: true,
  }),
  false,
  'Space/Enter should stay blocked while pause/retry still requires a stale movement hold to be fully released.',
);
assert.equal(
  shouldAllowPrimaryActionKeyPress({
    event: { repeat: false } as KeyboardEvent,
    pointerReleaseRequired: true,
  }),
  false,
  'Space/Enter should stay blocked while pause/retry still requires the stale pointer hold to be fully released.',
);
assert.equal(
  shouldAllowPrimaryActionKeyPress({
    event: { repeat: false } as KeyboardEvent,
    keyReleaseRequired: true,
  }),
  false,
  'Space/Enter should stay blocked while pause/retry still requires the stale primary-key hold to be released.',
);
assert.equal(
  shouldAllowPrimaryActionKeyPress({
    event: { repeat: false } as KeyboardEvent,
    pointerReleaseRequired: false,
    keyReleaseRequired: false,
  }),
  true,
  'Fresh primary-key presses should resume/start immediately once the stale pointer release gate is cleared.',
);
assert.equal(
  shouldClearPrimaryActionKeyReleaseRequirement({
    primaryActionKeyActive: false,
  }),
  true,
  'Primary-action key release should clear resume/retry gates immediately once Space/Enter is no longer held.',
);
assert.equal(
  shouldClearPrimaryActionKeyReleaseRequirement({
    primaryActionKeyActive: true,
  }),
  false,
  'Primary-action key release gates must stay armed while Space/Enter is still held.',
);
assert.equal(
  shouldClearPrimaryActionKeyReleaseRequirement({
    primaryActionKeyActive: false,
    postResetReleaseObservationPending: true,
  }),
  false,
  'Focus-loss keyboard resets should not clear a held Space/Enter release gate until the key is observed again after refocus.',
);
assert.equal(
  shouldObservePrimaryActionKeyReleaseAfterReset({
    primaryActionKeyActive: true,
    postResetReleaseObservationPending: true,
  }),
  true,
  'The first refocused Space/Enter state after a keyboard reset should only re-arm release observation.',
);
assert.equal(
  shouldObservePrimaryActionKeyReleaseAfterReset({
    primaryActionKeyActive: false,
    postResetReleaseObservationPending: true,
  }),
  false,
  'An idle Space/Enter state after focus loss should keep waiting for an observed press before a later release clears the gate.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({ button: 0 }),
  true,
  'Primary pointer presses should still trigger start/retry/resume.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({ wasTouch: true }),
  true,
  'Primary touch pointers should still trigger start/retry/resume without depending on mouse-button semantics.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({
    wasTouch: true,
    event: { isPrimary: false } as PointerEvent,
  }),
  false,
  'Non-primary touch pointers should not trigger start/retry/resume on mobile while another finger already owns the gesture.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({
    wasTouch: true,
    event: { isPrimary: true } as PointerEvent,
  }),
  true,
  'Primary touch pointers should still trigger start/retry/resume when the native event marks them as the active touch.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
      event: { isPrimary: false } as PointerEvent,
    },
  }),
  false,
  'A secondary touch should not restart or resume the run while a different finger owns the primary gesture.',
);
assert.equal(
  shouldHandlePrimaryActionPointer({ button: 1 }),
  false,
  'Middle-click should not trigger primary actions.',
);
assert.deepEqual(
  getSpawnGraceVisualState(false),
  {
    alpha: 0.58,
    scale: 0.88,
    tint: 0xffd6cf,
  },
  'Spawn-grace obstacles should stay visibly softened until their collision gate opens.',
);
assert.deepEqual(
  getSpawnGraceVisualState(true),
  {
    alpha: 1,
    scale: 1,
    tint: null,
  },
  'Collision-ready obstacles should return to their full-strength visual state immediately.',
);
assert.equal(
  getObstacleDepth(false),
  SPAWN_GRACE_DEPTH,
  'Spawn-grace obstacles should render beneath collision-ready threats so harmless arrivals do not mask live danger lanes.',
);
assert.equal(
  getObstacleDepth(true),
  COLLISION_READY_OBSTACLE_DEPTH,
  'Collision-ready obstacles should keep the main live-threat depth once their grace window ends.',
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
  shouldDelayPointerSteeringAfterPrimaryAction({
    source: 'pointer-press',
    phaseBeforeActivation: 'waiting',
  }),
  false,
  'A fresh tap/click used to launch from waiting should steer immediately instead of burning the first 180ms of mobile control.',
);
assert.equal(
  shouldDelayPointerSteeringAfterPrimaryAction({
    source: 'pointer-press',
    phaseBeforeActivation: 'gameOver',
  }),
  true,
  'Retry taps should still arm the short pointer-steering delay so restart release guards do not regress.',
);
assert.equal(
  shouldDelayPointerSteeringAfterPrimaryAction({
    source: 'pointer-held',
    phaseBeforeActivation: 'paused',
  }),
  false,
  'Held pointer activation paths should not re-arm a redundant steering delay.',
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
  isPrimaryPointerDown({
    isDown: true,
    wasTouch: true,
    primaryDown: true,
    button: 0,
    event: { isPrimary: false } as PointerEvent,
  }),
  false,
  'Non-primary touch pointers should not keep live steering or held-input guards active once another finger owns the touch gesture.',
);
assert.equal(
  isPrimaryPointerDown({
    isDown: true,
    wasTouch: true,
    primaryDown: false,
    button: 0,
    event: { isPrimary: true } as PointerEvent,
  }),
  true,
  'Primary-touch steering should follow the native isPrimary signal when browsers expose it.',
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
  isPrimaryPointerDown({
    isDown: true,
    wasTouch: false,
    button: 0,
    event: { buttons: 0 } as PointerEvent,
  }),
  false,
  'Mouse pointers with native buttons=0 should be treated as released so stale cached button state cannot keep steering or retry eligibility alive.',
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
assert.equal(
  shouldRequirePointerReleaseObservationAfterFocusLoss({
    pointerInputActive: false,
    pointerEngagedBeforePause: true,
  }),
  true,
  'Focus-loss pause should keep a release gate armed when pointer steering was active just before the browser reset pointer state.',
);
assert.equal(
  shouldRequirePointerReleaseObservationAfterFocusLoss({
    pointerInputActive: true,
    pointerEngagedBeforePause: true,
  }),
  false,
  'A still-observed held pointer should not add extra focus-loss observation work on top of the existing release gate.',
);
assert.equal(
  shouldObservePointerReleaseAfterFocusLoss({
    pointerInputActive: true,
    postFocusLossReleaseObservationPending: true,
  }),
  true,
  'The first refocused pointer-down state after focus loss should only re-arm release observation.',
);
assert.equal(
  shouldObservePointerReleaseAfterFocusLoss({
    pointerInputActive: false,
    postFocusLossReleaseObservationPending: true,
  }),
  false,
  'Idle pointer state after focus loss should keep waiting for a fresh pointer observation before release can clear the gate.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
    },
    pointerReleaseRequired: true,
  }),
  false,
  'Direct pointer presses should stay blocked while replay still requires a fresh release.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
      event: { isPrimary: true } as PointerEvent,
    },
    movementReleaseRequired: true,
  }),
  false,
  'A fresh tap/click should not bypass a stale movement release gate just because the release came from another input modality.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
      event: { isPrimary: true } as PointerEvent,
    },
    keyReleaseRequired: true,
  }),
  false,
  'A fresh tap/click should not bypass a stale Space/Enter release gate just because the release came from another input modality.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
      event: { isPrimary: true } as PointerEvent,
    },
    pointerReleaseRequired: false,
  }),
  true,
  'A fresh primary touch press should be allowed again once the held-input release gate is cleared.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
    },
    pointerWasCancelled: true,
    pointerReleaseRequired: true,
  }),
  true,
  'Canceled pointers should not keep direct replay/start presses blocked after the browser already released the old hold.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
      event: { isPrimary: true } as PointerEvent,
    },
    pointerWasCancelled: true,
    movementReleaseRequired: true,
  }),
  false,
  'Pointer cancel should only clear stale pointer ownership; it must not let a fresh tap bypass a held movement release gate.',
);
assert.equal(
  shouldAllowPointerPrimaryActionPress({
    pointer: {
      isDown: true,
      wasTouch: true,
      primaryDown: true,
      button: 0,
      event: { isPrimary: true } as PointerEvent,
    },
    pointerWasCancelled: true,
    keyReleaseRequired: true,
  }),
  false,
  'Pointer cancel should not let a fresh tap bypass a stale Space/Enter release gate either.',
);
assert.equal(
  shouldClearPointerReleaseRequirement({
    isDown: false,
    wasTouch: true,
    primaryDown: false,
    button: 0,
  }, false, false),
  true,
  'Pointer release should clear replay/resume release gates immediately instead of waiting for another update tick.',
);
assert.equal(
  shouldClearPointerReleaseRequirement({
    isDown: true,
    wasTouch: true,
    primaryDown: true,
    button: 0,
    event: { isPrimary: false } as PointerEvent,
  }, false, false),
  true,
  'A released or non-primary touch should clear replay/resume release gates instead of keeping stale touch ownership alive.',
);
assert.equal(
  shouldClearPointerReleaseRequirement({
    isDown: false,
    wasTouch: true,
    primaryDown: false,
    button: 0,
  }, false, true),
  false,
  'Pointer release should stay blocked until a post-focus-loss pointer hold is observed once and then released.',
);
assert.equal(
  shouldClearPointerReleaseRequirement({
    isDown: true,
    wasTouch: false,
    button: 0,
    event: { buttons: 1 } as PointerEvent,
  }, false, false),
  false,
  'Release gates should stay armed while the primary pointer is still held down.',
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
  hasReachedFirstDeathTarget(9.9),
  false,
  'The 10s first-death target should not unlock early.',
);
assert.equal(
  hasReachedFirstDeathTarget(9.96),
  false,
  'The 10s first-death target should stay locked until the raw run clock clears the threshold, even if the HUD rounds up.',
);
assert.equal(
  hasReachedFirstDeathTarget(10),
  true,
  'The 10s first-death target should trigger as soon as the run clears the opener milestone.',
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
assert.equal(
  getNearMissLabel(1),
  'NEAR MISS',
  'Single close shaves should keep the compact near-miss label.',
);
assert.equal(
  getNearMissLabel(3),
  '3x NEAR MISS',
  'Chained close shaves should restore the earned multiplier label after interruptions.',
);
assert.equal(
  isNearMissHintActive(6400, 6500),
  true,
  'Near-miss feedback should stay restorable while its active-run hint window is still open.',
);
assert.equal(
  isNearMissHintActive(6500, 6500),
  false,
  'Near-miss feedback should expire exactly at the configured hide time instead of reviving stale pulses.',
);
assert.equal(
  isNearMissHintActive(6400, null),
  false,
  'Near-miss feedback should not restore after pause when no hint window is armed.',
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

const projectedThreatCrowdingSelection = selectSpawnPoint({
  survivalTimeSeconds: 4,
  playerPosition: { x: 320, y: 320 },
  playerVelocity: { x: 0, y: -200 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 360, y: 250 },
    { x: 390, y: 210 },
  ],
  randomInt: createQueuedRandom([0, 620, 3, 120]),
});
assert.deepEqual(
  projectedThreatCrowdingSelection,
  {
    point: { x: -56, y: 120 },
    rerollsUsed: 1,
  },
  'Opening spawn scoring should reroll a new projected corridor when a visible near-player threat cluster already occupies the same approach lane.',
);

const earlySpawnEdgeClusterSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 404, y: 280 },
  playerVelocity: { x: -24, y: 140 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 628, y: 34 },
    { x: 724, y: 140 },
  ],
  randomInt: createQueuedRandom([0, 632, 1, 146]),
});
assert.deepEqual(
  earlySpawnEdgeClusterSelection,
  {
    point: { x: 856, y: 146 },
    rerollsUsed: 1,
  },
  'Opening spawn scoring should reroll a second obstacle out of the same top-entry column when an earlier threat is still descending through that corridor.',
);

const offscreenSameEdgeClusterSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 404, y: 280 },
  playerVelocity: { x: -24, y: 140 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 632, y: -8 }],
  randomInt: createQueuedRandom([0, 632, 1, 146]),
});
assert.deepEqual(
  offscreenSameEdgeClusterSelection,
  {
    point: { x: 632, y: -56 },
    rerollsUsed: 0,
  },
  'Same-edge spawn-column rerolls should ignore matching-edge threats that are still fully offscreen instead of treating unreadable pre-entry pressure as an occupied corridor.',
);

const partialEntrySameEdgeClusterSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 404, y: 280 },
  playerVelocity: { x: -24, y: 140 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 632, y: 6 }],
  randomInt: createQueuedRandom([0, 632, 1, 146]),
});
assert.deepEqual(
  partialEntrySameEdgeClusterSelection,
  {
    point: { x: 632, y: -56 },
    rerollsUsed: 0,
  },
  'Same-edge spawn-column rerolls should wait until the earlier threat collider fully clears the arena instead of treating a barely-entered edge sprite as an occupied corridor.',
);

const crossEdgeDriftSameEdgeClusterSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 404, y: 280 },
  playerVelocity: { x: -24, y: 140 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 120, y: 12, spawnEdge: 'left' }],
  randomInt: createQueuedRandom([0, 120, 1, 146]),
});
assert.deepEqual(
  crossEdgeDriftSameEdgeClusterSelection,
  {
    point: { x: 120, y: -56 },
    rerollsUsed: 0,
  },
  'Same-edge spawn-column rerolls should not treat a left-entry obstacle that merely drifted near the top edge as if it still occupied the top-entry corridor.',
);

const crossEdgeCornerDriftSameEdgeClusterSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 180, y: 280 },
  playerVelocity: { x: 0, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 20, y: 20, spawnEdge: 'left' }],
  randomInt: createQueuedRandom([0, 12, 1, 400]),
});
assert.deepEqual(
  crossEdgeCornerDriftSameEdgeClusterSelection,
  {
    point: { x: 12, y: -56 },
    rerollsUsed: 0,
  },
  'Same-edge spawn-column rerolls should stop treating a left-entry obstacle as top-entry pressure once its dominant edge has drifted to the top corner.',
);

const originDominantCornerShareSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 180, y: 280 },
  playerVelocity: { x: 0, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 20, y: 12, spawnEdge: 'top' }],
  randomInt: createQueuedRandom([3, 12, 1, 400]),
});
assert.deepEqual(
  originDominantCornerShareSelection,
  {
    point: { x: 856, y: 400 },
    rerollsUsed: 1,
  },
  'Same-edge spawn-column rerolls should still treat a true top-entry corner threat as occupying the adjacent left-entry corridor while top remains its dominant edge.',
);

const crossEdgeCornerSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 180, y: 280 },
  playerVelocity: { x: 0, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 8, y: 20 }],
  randomInt: createQueuedRandom([0, 0, 2, 400]),
});
assert.deepEqual(
  crossEdgeCornerSelection,
  {
    point: { x: 0, y: -56 },
    rerollsUsed: 0,
  },
  'Same-edge spawn-column rerolls should ignore near-corner threats whose closest arena edge is different from the new spawn edge.',
);

const cornerSharingLeftSelection = selectSpawnPoint({
  survivalTimeSeconds: 3,
  playerPosition: { x: 180, y: 280 },
  playerVelocity: { x: 0, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 20, y: 20 }],
  randomInt: createQueuedRandom([3, 12, 1, 400]),
});
assert.deepEqual(
  cornerSharingLeftSelection,
  {
    point: { x: 856, y: 400 },
    rerollsUsed: 1,
  },
  'Same-edge spawn-column rerolls should still treat true corner-sharing threats as occupying the matching spawn edge instead of only the single closest edge.',
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
  'Validation export readiness should stay false before the sample reaches five completed runs.',
);

const completedRunSampleTelemetry = createEmptyTelemetry();
completedRunSampleTelemetry.totalRuns = 4;
completedRunSampleTelemetry.totalDeaths = 4;
assert.equal(
  hasCompletedRunSample(completedRunSampleTelemetry),
  false,
  'Validation export readiness should stay locked while the sample is still below five completed runs.',
);

completedRunSampleTelemetry.totalRuns = 5;
completedRunSampleTelemetry.totalDeaths = 5;
assert.equal(
  hasCompletedRunSample(completedRunSampleTelemetry),
  true,
  'Validation export readiness should unlock once five runs have ended.',
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
const exactCutoffWallEdgeProjectedSelection = selectSpawnPoint({
  survivalTimeSeconds: 6.000000000000076,
  playerPosition: { x: 18, y: 300 },
  playerVelocity: { x: -260, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 96, y: 300 }],
  randomInt: createQueuedRandom([3, 300, 1, 300]),
});
assert.deepEqual(
  exactCutoffWallEdgeProjectedSelection,
  {
    point: { x: 856, y: 300 },
    rerollsUsed: 1,
  },
  'Opening projected-path protection should still hold on a fixed-step frame that lands a hair above 6.0s instead of reopening the blocked wall lane for one frame.',
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

const nearWallReachabilitySelection = selectSpawnPoint({
  survivalTimeSeconds: 2,
  playerPosition: { x: 17, y: 80 },
  playerVelocity: { x: -260, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 100, y: 80 },
    { x: 150, y: 120 },
    { x: 200, y: 100 },
  ],
  randomInt: createQueuedRandom([0, 40, 0, 120, 0, 400, 1, 300, 2, 300, 3, 300, 0, 300]),
});
assert.deepEqual(
  nearWallReachabilitySelection,
  {
    point: { x: 856, y: 300 },
    rerollsUsed: 3,
  },
  'Projected-path spawn scoring should clamp near-wall movement to the same player-reachable margin the runtime uses, instead of overvaluing impossible top-lane travel while the player is pinned near the left wall.',
);

const pressuredOpeningSelection = selectSpawnPoint({
  survivalTimeSeconds: 5,
  playerPosition: { x: 690, y: 220 },
  playerVelocity: { x: -120, y: 80 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 640, y: 250, spawnEdge: 'right' },
  ],
  randomInt: createQueuedRandom([1, 210, 0, 400]),
});
assert.deepEqual(
  pressuredOpeningSelection,
  {
    point: { x: 400, y: -56 },
    rerollsUsed: 1,
  },
  'Opening spawn selection should reroll a merely-positive same-edge candidate when a visible same-edge threat is already sitting near the player.',
);
const spawnGracePressuredOpeningSelection = selectSpawnPoint({
  survivalTimeSeconds: 5,
  playerPosition: { x: 690, y: 220 },
  playerVelocity: { x: -120, y: 80 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    {
      x: 560,
      y: 160,
      collisionReady: false,
      spawnEdge: 'right',
    },
  ],
  randomInt: createQueuedRandom([0, 480]),
});
assert.deepEqual(
  spawnGracePressuredOpeningSelection,
  {
    point: { x: 480, y: -56 },
    rerollsUsed: 0,
  },
  'Opening spawn selection should ignore same-edge pressure from a spawn-grace obstacle that is still harmless instead of rerolling away from a readable lane.',
);
const exactCutoffPressuredOpeningSelection = selectSpawnPoint({
  survivalTimeSeconds: 6.000000000000076,
  playerPosition: { x: 690, y: 220 },
  playerVelocity: { x: -120, y: 80 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 640, y: 250, spawnEdge: 'right' },
  ],
  randomInt: createQueuedRandom([1, 210, 0, 400]),
});
assert.deepEqual(
  exactCutoffPressuredOpeningSelection,
  {
    point: { x: 400, y: -56 },
    rerollsUsed: 1,
  },
  'Opening same-edge pressure protection should survive the 6.0s cutoff fuzz so fixed-step drift cannot reopen a cheap near-player lane for one frame.',
);

const pressuredSameSideSweepSelection = selectSpawnPoint({
  survivalTimeSeconds: 4,
  playerPosition: { x: 304, y: 327 },
  playerVelocity: { x: -99, y: -190 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 390, y: 337, spawnEdge: 'top' },
  ],
  randomInt: createQueuedRandom([0, 636, 1, 300]),
});
assert.deepEqual(
  pressuredSameSideSweepSelection,
  {
    point: { x: 856, y: 300 },
    rerollsUsed: 1,
  },
  'Opening spawn selection should reroll a same-edge follow-up sweep that stays on the same side of a near-player threat even when the raw lateral gap is wider than the base near-player band.',
);

const guardCompliantFallbackSelection = selectSpawnPoint({
  survivalTimeSeconds: 5,
  playerPosition: { x: 120, y: 80 },
  playerVelocity: { x: 0, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 40, y: 80, spawnEdge: 'left' },
  ],
  randomInt: createQueuedRandom([3, 200, 0, 40, 0, 40, 0, 40, 0, 40, 0, 40, 0, 40]),
});
assert.deepEqual(
  guardCompliantFallbackSelection,
  {
    point: { x: 40, y: -56 },
    rerollsUsed: 6,
  },
  'Spawn selection should keep the best guard-compliant reroll when every option stays rough, instead of falling back to a slightly higher-scoring same-edge pressure violation after the reroll budget runs out.',
);

const retreatPinchSelection = selectSpawnPoint({
  survivalTimeSeconds: 10.000000000000076,
  playerPosition: { x: 347.7, y: 311.3 },
  playerVelocity: { x: 214, y: -0.9 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    { x: 378, y: 299.3, spawnEdge: 'right' },
    { x: 250.9, y: 307, spawnEdge: 'left' },
    { x: 605.1, y: 347.2, spawnEdge: 'left' },
    { x: 114, y: 164.6, spawnEdge: 'left' },
    { x: 89.7, y: 123.6, spawnEdge: 'bottom' },
  ],
  randomInt: createQueuedRandom([3, 501, 2, 450]),
});
assert.deepEqual(
  retreatPinchSelection,
  {
    point: { x: 450, y: 656 },
    rerollsUsed: 1,
  },
  'Spawn selection should treat a right-in-front threat plus a rear-lane seal as a retreat pinch through the 10s target-first-death window, even when the fixed-step clock lands a hair above 10.0s.',
);

const wallPressRetreatSelection = selectSpawnPoint({
  survivalTimeSeconds: 10,
  playerPosition: { x: 784, y: 300 },
  playerVelocity: { x: 214, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 740, y: 300, spawnEdge: 'right' }],
  randomInt: createQueuedRandom([3, 300]),
});
assert.deepEqual(
  wallPressRetreatSelection,
  {
    point: { x: -56, y: 300 },
    rerollsUsed: 0,
  },
  'Retreat-pinch guard should ignore outward wall-press velocity so a player already pinned against the wall does not lose a legal rear-lane spawn to an unreachable forward direction.',
);

const midRunProjectedStackSelection = selectSpawnPoint({
  survivalTimeSeconds: 12,
  playerPosition: { x: 400, y: 300 },
  playerVelocity: { x: 180, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 470, y: 300 }],
  randomInt: createQueuedRandom([1, 300, 2, 100]),
});
assert.deepEqual(
  midRunProjectedStackSelection,
  {
    point: { x: 100, y: 656 },
    rerollsUsed: 1,
  },
  'Mid-run spawn selection should reroll a new approach lane when a visible threat is already sitting close to the player on the same projected stack.',
);
const spawnGraceProjectedStackSelection = selectSpawnPoint({
  survivalTimeSeconds: 12,
  playerPosition: { x: 400, y: 300 },
  playerVelocity: { x: 0, y: -214 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [
    {
      x: 340,
      y: 260,
      collisionReady: false,
      spawnEdge: 'top',
    },
  ],
  randomInt: createQueuedRandom([
    3,
    80,
  ]),
});
assert.deepEqual(
  spawnGraceProjectedStackSelection,
  {
    point: { x: -56, y: 80 },
    rerollsUsed: 0,
  },
  'Mid-run projected-stack rerolls should ignore a near-player obstacle while its collision grace is still active instead of treating a harmless arrival as a live lane blocker.',
);
const exactThresholdProjectedStackSelection = selectSpawnPoint({
  survivalTimeSeconds: 10,
  playerPosition: { x: 400, y: 300 },
  playerVelocity: { x: 180, y: 0 },
  playerReachabilityMargin: 16,
  activeObstaclePositions: [{ x: 470, y: 300 }],
  randomInt: createQueuedRandom([1, 300, 2, 100]),
});
assert.deepEqual(
  exactThresholdProjectedStackSelection,
  {
    point: { x: 100, y: 656 },
    rerollsUsed: 1,
  },
  'Mid-run projected-stack protection should already apply on the exact 10.0s threshold instead of leaving the first post-target follow-up spawn outside the guard window.',
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
    closestDistanceWasVisible: true,
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
      closestDistanceWasVisible: true,
      hadClosingApproach: true,
    },
  ),
  {
    currentDistanceSq: 2704,
    closestDistanceSq: 1225,
    closestDistanceWasVisible: true,
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
      closestDistanceWasVisible: true,
      hadClosingApproach: true,
    },
  ).triggered,
  true,
  'Near-miss tracking should still fire when the closest visible shave has already happened and the obstacle exits the arena on the release frame.',
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
      closestDistanceWasVisible: false,
      hadClosingApproach: true,
    },
  ).triggered,
  false,
  'Near-miss tracking should stay silent when the closest approach happened offscreen and never became a visible shave.',
);

assert.deepEqual(
  getImpactDirection(
    { x: 400, y: 300 },
    { x: 424, y: 300 },
    { x: 140, y: 0 },
  ),
  {
    label: 'right',
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
    { x: 0, y: 0 },
  ),
  {
    label: 'top',
    offsetX: 0,
    offsetY: -1,
  },
  'Centered overlaps with strong relative motion should preserve the incoming lane instead of collapsing to a generic center hit.',
);
assert.deepEqual(
  getImpactDirection(
    { x: 400, y: 300 },
    { x: 401, y: 299 },
    { x: 40, y: 30 },
    { x: 0, y: 0 },
  ),
  {
    label: 'center',
    offsetX: 0,
    offsetY: 0,
  },
  'Centered overlaps with only weak relative motion should still fall back to the center-call guidance.',
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
assert.equal(
  selectFatalThreatIndex({
    playerPosition: { x: 400, y: 300 },
    playerVelocity: { x: 0, y: 0 },
    playerCollisionRadius: 16,
    candidates: [
      {
        position: { x: 400, y: 300 },
        velocity: { x: 40, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
      {
        position: { x: 400, y: 300 },
        velocity: { x: -180, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
    ],
  }),
  1,
  'Fatal threat selection should break fully centered overlap ties toward the obstacle with the stronger relative sweep instead of callback order.',
);
assert.equal(
  selectFatalThreatIndex({
    playerPosition: { x: 400, y: 300 },
    playerVelocity: { x: 0, y: 0 },
    playerCollisionRadius: 16,
    preferredIndex: 1,
    candidates: [
      {
        position: { x: 400, y: 300 },
        velocity: { x: 140, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
      {
        position: { x: 400, y: 300 },
        velocity: { x: 140, y: 0 },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      },
    ],
  }),
  1,
  'Fatal threat selection should keep the overlap callback winner when penetration, distance, and closing speed are identical instead of falling back to group iteration order.',
);

assert.equal(
  survivalReport.maxSimulationSeconds,
  40,
  'Deterministic survival snapshot should stay long enough to exercise the 32s drift mutation.',
);
assert.equal(survivalReport.averageSurvivalTimeSeconds, 31.2, 'Average survival snapshot regressed.');
assert.equal(survivalReport.firstDeathTimeSeconds, 10, 'First death snapshot regressed.');
assert.equal(survivalReport.bestSurvivalTimeSeconds, 40, 'Best survival cap changed unexpectedly.');
assert.equal(survivalReport.earlyDeathRatePercent, 0, 'Early death rate snapshot regressed.');
assert.match(
  survivalReport.controller,
  /projected-path forward-alignment rerolls above 0\.5 dot through 6s \(80px-equivalent penalty\), projected-path lane-stack rerolls within 160px above 0\.55 dot through 6s \(120px-equivalent penalty\), .*near-player same-edge rerolls within 96px and 180px lateral below score 190 through 6s, deep same-side follow-up sweeps stay reroll-eligible out to 340px, retreat-pinch rerolls within 60px above 0\.35 forward alignment when the new spawn seals the rear lane within 200px through 10s, mid-run projected-stack rerolls within 75px above 0\.92 alignment from 10s to 13s, strafe obstacles every 8th spawn from 12s with 14deg cross-lane travel, surge obstacles every 5th spawn from 15s with 1\.14x speed, lead obstacles every 9th spawn from 18s with 0\.14s forward target lead, echo obstacles every 6th spawn from 24s with 0\.22s target lag, .*11px visible-arena hit margin, and 96px offscreen cull margin/,
  'Deterministic survival proxy no longer matches runtime spawn-selection, collision, and cull guards.',
);
assert.deepEqual(
  survivalReport.survivalBuckets,
  {
    under10Seconds: 0,
    between10And20Seconds: 4,
    between20And30Seconds: 11,
    reachedSimulationCap: 9,
  },
  'Survival bucket distribution regressed.',
);
assert.ok(
  survivalReport.sampleRuns.some(
    (run) => run.survivalTimeSeconds >= DRIFT_OBSTACLE_UNLOCK_SECONDS,
  ),
  'Deterministic survival sample should include at least one post-32s run so the drift mutation is actually exercised.',
);
assert.equal(survivalReport.averageSpawnCount, 34.1, 'Average spawn count snapshot changed unexpectedly.');
assert.equal(survivalReport.averageSpawnRerolls, 0.5, 'Spawn reroll snapshot changed unexpectedly.');
assert.equal(seed3TrajectoryReport.deathTimeSeconds, 21.2, 'Seed #3 trajectory baseline drifted.');
assert.equal(seed3TrajectoryReport.spawnsBeforeDeath, 22, 'Seed #3 spawn count changed unexpectedly.');
assert.equal(
  seed3TrajectoryReport.spawnRerollsBeforeDeath,
  1,
  'Seed #3 should now spend one reroll escaping the old 6.3s opener outlier.',
);
const seed7TrajectoryReport = createSeedTrajectoryReport(7, 12);
assert.equal(seed7TrajectoryReport.deathTimeSeconds, 10, 'Seed #7 target-first-death trace drifted.');
assert.equal(seed7TrajectoryReport.spawnsBeforeDeath, 10, 'Seed #7 spawn count changed unexpectedly.');
assert.equal(
  seed7TrajectoryReport.spawnRerollsBeforeDeath,
  1,
  'Seed #7 should now spend one reroll escaping the retreat-pinch floor at the 10s window.',
);
assert.deepEqual(
  seed7TrajectoryReport.spawnEvents.at(-1),
  {
    spawnIndex: 10,
    timeSeconds: 10,
    spawnPoint: { x: 450, y: 656 },
    rerollsUsed: 1,
    playerPosition: { x: 347.7, y: 311.3 },
    playerVelocity: { x: 214, y: -0.9 },
    visibleObstacleCount: 5,
    nearestVisibleObstacleDistancePx: 32.6,
  },
  'Seed #7 should reroll the rear-lane seal once the near-front retreat pinch is detected at the 10s floor.',
);
assert.deepEqual(
  seed3TrajectoryReport.spawnEvents.map((event) => ({
    spawnIndex: event.spawnIndex,
    timeSeconds: event.timeSeconds,
    spawnPoint: event.spawnPoint,
    rerollsUsed: event.rerollsUsed,
    visibleObstacleCount: event.visibleObstacleCount,
    nearestVisibleObstacleDistancePx: event.nearestVisibleObstacleDistancePx,
  })),
  [
    {
      spawnIndex: 1,
      timeSeconds: 0.9,
      spawnPoint: { x: 634, y: -56 },
      rerollsUsed: 0,
      visibleObstacleCount: 0,
      nearestVisibleObstacleDistancePx: null,
    },
    {
      spawnIndex: 2,
      timeSeconds: 1.9,
      spawnPoint: { x: 856, y: 355 },
      rerollsUsed: 0,
      visibleObstacleCount: 1,
      nearestVisibleObstacleDistancePx: 271.3,
    },
    {
      spawnIndex: 3,
      timeSeconds: 3,
      spawnPoint: { x: 3, y: 656 },
      rerollsUsed: 0,
      visibleObstacleCount: 2,
      nearestVisibleObstacleDistancePx: 120,
    },
    {
      spawnIndex: 4,
      timeSeconds: 4,
      spawnPoint: { x: 856, y: 509 },
      rerollsUsed: 1,
      visibleObstacleCount: 3,
      nearestVisibleObstacleDistancePx: 86.3,
    },
    {
      spawnIndex: 5,
      timeSeconds: 5,
      spawnPoint: { x: 856, y: 294 },
      rerollsUsed: 0,
      visibleObstacleCount: 4,
      nearestVisibleObstacleDistancePx: 98.9,
    },
    {
      spawnIndex: 6,
      timeSeconds: 6,
      spawnPoint: { x: 589, y: -56 },
      rerollsUsed: 0,
      visibleObstacleCount: 4,
      nearestVisibleObstacleDistancePx: 83,
    },
  ],
  'Seed #3 outlier trace changed unexpectedly.',
);
assert.equal(
  validationReport.validationSummary,
  '5 runs | first death 18.2s | early 0% | 5/5 runs, target met',
  'Validation export summary regressed.',
);
assert.equal(
  validationReport.validationReport,
  'validation_sample | runs=5 | deaths=5 | avg_survival=31.9s | first_death=18.2s | early_death_rate=0% | avg_retry=n/a | spawn_saves=4 | last_run=18.2s | validation=5/5 runs, target met | baseline=pacing 10/32/76 | deterministic survival 31.2s avg / 10.0s first death / 0% early',
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
  'validation_sample | runs=5 | deaths=5 | avg_survival=24.1s | first_death=6.3s | early_death_rate=20% | avg_retry=n/a | spawn_saves=3 | last_run=30.0s | validation=5/5 runs, review early deaths | baseline=pacing 10/32/76 | deterministic survival 31.2s avg / 10.0s first death / 0% early',
  'Validation export should report only completed runs even if a fresh start increased totalRuns beyond totalDeaths.',
);
assert.equal(
  buildValidationReport({
    ...createEmptyTelemetry(),
    totalRuns: 1,
    totalDeaths: 1,
    totalSurvivalTime: 9.96,
    bestSurvivalTime: 9.96,
    firstDeathTime: 9.96,
    earlyDeathsUnderTarget: 1,
    lastSurvivalTime: 9.96,
  }),
  'validation_sample | runs=1 | deaths=1 | avg_survival=10.0s | first_death=10.0s | early_death_rate=100% | avg_retry=n/a | spawn_saves=0 | last_run=10.0s | validation=1/5 runs | baseline=pacing 10/32/76 | deterministic survival 31.2s avg / 10.0s first death / 0% early',
  'Telemetry exports should keep under-10s deaths flagged even when UI-facing times round up to 10.0s.',
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
assert.equal(
  isValidationReportCurrent(
    buildValidationReport({
      ...createEmptyTelemetry(),
      totalRuns: 5,
      totalDeaths: 5,
      totalSurvivalTime: 144,
      bestSurvivalTime: 30,
      firstDeathTime: 24.2,
      totalSpawnRerolls: 4,
      lastSurvivalTime: 30,
    }),
    {
      ...createEmptyTelemetry(),
      totalRuns: 5,
      totalDeaths: 5,
      totalSurvivalTime: 144,
      bestSurvivalTime: 30,
      firstDeathTime: 24.2,
      totalSpawnRerolls: 4,
      lastSurvivalTime: 30,
    },
  ),
  true,
  'Saved validation exports should stay marked current when they still match the active completed sample.',
);
assert.equal(
  isValidationReportCurrent(
    buildValidationReport({
      ...createEmptyTelemetry(),
      totalRuns: 5,
      totalDeaths: 5,
      totalSurvivalTime: 144,
      bestSurvivalTime: 30,
      firstDeathTime: 24.2,
      totalSpawnRerolls: 4,
      lastSurvivalTime: 30,
    }),
    {
      ...createEmptyTelemetry(),
      totalRuns: 6,
      totalDeaths: 6,
      totalSurvivalTime: 170,
      bestSurvivalTime: 30,
      firstDeathTime: 24.2,
      totalSpawnRerolls: 5,
      lastSurvivalTime: 26,
    },
  ),
  false,
  'Saved validation exports should turn stale as soon as a newer completed sample changes the current session snapshot.',
);
assert.equal(
  isValidationReportCurrent(
    buildValidationReport({
      ...createEmptyTelemetry(),
      totalRuns: 5,
      totalDeaths: 5,
      totalSurvivalTime: 144,
      bestSurvivalTime: 30,
      firstDeathTime: 24.2,
      totalSpawnRerolls: 4,
      lastSurvivalTime: 30,
    }),
    {
      ...createEmptyTelemetry(),
      totalRuns: 3,
      totalDeaths: 3,
      totalSurvivalTime: 48,
      bestSurvivalTime: 20,
      firstDeathTime: 12.4,
      lastSurvivalTime: 20,
    },
  ),
  false,
  'Saved validation exports should not read as current while the new session sample is still incomplete.',
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
