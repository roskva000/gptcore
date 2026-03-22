import assert from 'node:assert/strict';
import {
  getHorizontalCalloutCenterX,
  getVerticalCalloutPlacement,
} from '../src/game/deathOverlayLayout.ts';
import {
  BREAKTHROUGH_STRAFE_FORK_ROTATION_DEGREES,
  BREAKTHROUGH_STRAFE_FORK_WINDOW_SECONDS,
  BREAKTHROUGH_SURGE_SNAP_ROTATION_DEGREES,
  BREAKTHROUGH_SURGE_SNAP_TARGET_LEAD_SECONDS,
  BREAKTHROUGH_SURGE_SNAP_WINDOW_SECONDS,
  DRIFT_AFTERSHOCK_ROTATION_DEGREES,
  DRIFT_AFTERSHOCK_TARGET_LAG_SECONDS,
  DRIFT_AFTERSHOCK_WINDOW_SECONDS,
  DRIFT_CLEAR_CLIMB_ASCENT_ROTATION_DEGREES,
  DRIFT_CLEAR_CLIMB_ASCENT_TARGET_LAG_SECONDS,
  DRIFT_CLEAR_CLIMB_ASCENT_WINDOW_END_SECONDS,
  DRIFT_CLEAR_CLIMB_WINDOW_START_SECONDS,
  DRIFT_FALSE_CLEAR_ROTATION_DEGREES,
  DRIFT_FALSE_CLEAR_TARGET_LAG_SECONDS,
  DRIFT_FALSE_CLEAR_WINDOW_SECONDS,
  DRIFT_CLEAR_CLIMB_SUMMIT_ROTATION_DEGREES,
  DRIFT_CLEAR_CLIMB_SUMMIT_TARGET_LAG_SECONDS,
  DRIFT_PRECLEAR_ROTATION_DEGREES,
  DRIFT_PRECLEAR_TARGET_LAG_SECONDS,
  DRIFT_PRECLEAR_WINDOW_SECONDS,
  DRIFT_OBSTACLE_CADENCE,
  DRIFT_RELEASE_FOLD_CARRY_ROTATION_DEGREES,
  DRIFT_RELEASE_FOLD_CARRY_WINDOW_SECONDS,
  DRIFT_RELEASE_ROTATION_DEGREES,
  DRIFT_RELEASE_TARGET_LAG_SECONDS,
  DRIFT_RECENTER_ROTATION_DEGREES,
  DRIFT_RECENTER_TARGET_LAG_SECONDS,
  DRIFT_RECENTER_WINDOW_SECONDS,
  DRIFT_REBOUND_ROTATION_DEGREES,
  DRIFT_REBOUND_HOLD_WINDOW_SECONDS,
  DRIFT_REBOUND_PUNISH_ROTATION_DEGREES,
  DRIFT_REBOUND_PUNISH_TARGET_LAG_SECONDS,
  DRIFT_REBOUND_TARGET_LAG_SECONDS,
  DRIFT_REBOUND_WINDOW_SECONDS,
  DRIFT_RELEASE_WINDOW_SECONDS,
  DRIFT_OBSTACLE_ROTATION_DEGREES,
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  DRIFT_SWEEP_LOCK_ROTATION_DEGREES,
  DRIFT_SWEEP_LOCK_TARGET_LAG_SECONDS,
  DRIFT_SWEEP_LOCK_WINDOW_SECONDS,
  DRIFT_SWEEP_ROTATION_DEGREES,
  DRIFT_SWEEP_TARGET_LAG_SECONDS,
  DRIFT_SWEEP_WINDOW_SECONDS,
  DRIFT_SWEEP_WINDOW_START_SECONDS,
  ECHO_OBSTACLE_CADENCE,
  ECHO_OBSTACLE_TARGET_LAG_SECONDS,
  ECHO_OBSTACLE_UNLOCK_SECONDS,
  KILLBOX_FOLD_SNAP_ROTATION_DEGREES,
  KILLBOX_FOLD_SNAP_TARGET_LAG_SECONDS,
  KILLBOX_FOLD_SNAP_WINDOW_START_SECONDS,
  KILLBOX_FOLD_SNAP_WINDOW_SECONDS,
  KILLBOX_ECHO_BRIDGE_ROTATION_DEGREES,
  KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS,
  KILLBOX_ECHO_CADENCE_ROTATION_DEGREES,
  KILLBOX_ECHO_FOLLOW_THROUGH_ROTATION_DEGREES,
  KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_SECONDS,
  KILLBOX_ECHO_HANDOFF_ROTATION_DEGREES,
  KILLBOX_ECHO_HANDOFF_WINDOW_SECONDS,
  KILLBOX_FORCED_LEAD_TARGET_LEAD_SECONDS,
  KILLBOX_FORCED_LEAD_WINDOW_SECONDS,
  KILLBOX_PINCH_LOCK_ROTATION_DEGREES,
  KILLBOX_PINCH_LOCK_TARGET_LEAD_SECONDS,
  KILLBOX_PINCH_LOCK_WINDOW_START_SECONDS,
  KILLBOX_PINCH_LOCK_WINDOW_SECONDS,
  KILLBOX_SEAL_SNAP_ROTATION_DEGREES,
  KILLBOX_SEAL_SNAP_TARGET_LAG_SECONDS,
  KILLBOX_SEAL_SNAP_WINDOW_START_SECONDS,
  LEAD_OBSTACLE_CADENCE,
  LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  STRAFE_OBSTACLE_CADENCE,
  STRAFE_OBSTACLE_ROTATION_DEGREES,
  STRAFE_OBSTACLE_UNLOCK_SECONDS,
  SURGE_OBSTACLE_CADENCE,
  SURGE_OBSTACLE_SPEED_MULTIPLIER,
  SURGE_OBSTACLE_UNLOCK_SECONDS,
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
  NEAR_MISS_CHASE_DURATION_MS,
  NEAR_MISS_CHASE_CUT_TARGET_OFFSET_PX,
  NEAR_MISS_CHASE_REOPEN_TARGET_OFFSET_PX,
  getNearMissChaseFatalLabelText,
  getNearMissChaseImpactLabelText,
  getNearMissChaseTargetOffset,
  getNearMissChaseTitleText,
  NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND,
  NEAR_MISS_CHASE_SNAPSHOT_TEXT,
  createNearMissState,
  evaluateNearMiss,
  getNearMissChaseHudText,
  getNearMissChaseRetryText,
  getNearMissChaseStepAnnouncement,
  getNearMissChaseStepTint,
  getNearMissChaseSupportText,
  getNearMissChaseVisualIntensity,
  getNearMissLaneDirection,
  getNearMissLabel,
  isNearMissChaseActive,
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
  getBreakthroughCue,
  getKillboxCue,
  getEndgameClearClimbState,
  getEndgameDriftCue,
  getRunPhaseDeathSummaryText,
  getRunPhaseReachedBadgeText,
  getRunPhaseRetryGoalText,
  getRunPhaseDetailText,
  getRunPhaseOnsetIntensity,
  getRunPhaseState,
  getRunPhaseStatusText,
  getRunPhaseShiftAnnouncement,
  getRunPhaseSupportText,
  getRunPhaseTimelineText,
} from '../src/game/runPhase.ts';
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
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  deathPresentation.callout,
  'DEATH SNAPSHOT',
  'Death overlay should open with a stable snapshot label instead of repeating the same lane wording in multiple places.',
);
assert.equal(
  deathPresentation.badge,
  'NEW BEST',
  'A new-best death should keep its high-priority badge even after phase-payoff copy is added to the death overlay.',
);
const nearMissPromptDeathPresentation = getDeathPresentation({
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
  isNewBest: false,
  bestSurvivalTimeText: '14.1s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK RIGHT',
  nearMissChainCount: 2,
  nearMissPromptText: '2x near-miss chase snapped. Reopen that lane.',
});
assert.equal(
  nearMissPromptDeathPresentation.badge,
  'STRAFE FORK | 2x CHASE SNAP',
  'A snapped near-miss chase should reach the badge so the overlay owns the earned state before the retry prompt.',
);
assert.equal(
  nearMissPromptDeathPresentation.title,
  'Lane snapped from left',
  'A snapped near-miss chase should retitle the death snapshot around the broken lane instead of falling back to a generic hit direction sentence.',
);
assert.equal(
  nearMissPromptDeathPresentation.body,
  'Run 12.3s. Best 14.1s.\n2x near-miss chase snapped before the lane cooled. STRAFE FORK snapped inside BREAKTHROUGH. 5.7s short of KILLBOX.',
  'A snapped near-miss chase should rewrite the body summary around the earned state without hiding the structural phase progress.',
);
assert.equal(
  nearMissPromptDeathPresentation.prompt,
  'Next lane: BREAK RIGHT\n2x near-miss chase snapped. Reopen that lane.\nRetry: Space, Enter, tap/click, or move',
  'A live near-miss chase should take over the retry middle line so the death screen feeds straight back into another risky run.',
);
assert.equal(
  nearMissPromptDeathPresentation.hasNearMissChaseSnapshot,
  true,
  'A snapped near-miss chase should mark the death snapshot so the overlay can visibly own that earned state.',
);
assert.equal(
  nearMissPromptDeathPresentation.promptBackgroundColor,
  NEAR_MISS_CHASE_SNAPSHOT_BACKGROUND,
  'A snapped near-miss chase should tint the retry prompt background so the death snapshot keeps the lane-hot state visually alive.',
);
assert.equal(
  nearMissPromptDeathPresentation.promptTextColor,
  NEAR_MISS_CHASE_SNAPSHOT_TEXT,
  'Near-miss chase snapshot text should keep its readable accent palette instead of falling back to the generic overlay styling.',
);
assert.equal(
  deathPresentation.hasNearMissChaseSnapshot,
  false,
  'Normal deaths should keep the generic snapshot styling when no near-miss chase was active.',
);
assert.equal(
  deathPresentation.title,
  'Hit from left',
  'Death overlay title should keep the hit direction explicit for readability.',
);
assert.equal(
  deathPresentation.calloutBackgroundColor,
  '#4b2418',
  'Deaths inside the strafe fork should warm the snapshot callout so the authored breakthrough beat owns the overlay tone.',
);
assert.equal(
  deathPresentation.promptBackgroundColor,
  '#5a2b1b',
  'Deaths inside the strafe fork should tint the retry block around the same fork accent instead of falling back to the generic game-over palette.',
);
const surgeSnapDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 1, offsetY: 0, label: 'right' },
  survivalTimeSeconds: 15.2,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 4,
    totalRuns: 4,
    firstDeathTime: 8.4,
    totalRetryDelayMs: 5600,
    retryCount: 4,
    recentDeathTimes: [8.4, 10.2, 12.3, 15.2],
  },
  isNewBest: false,
  bestSurvivalTimeText: '15.8s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK LEFT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  surgeSnapDeathPresentation.calloutBackgroundColor,
  '#5a3114',
  'Deaths inside the surge snap should shift the snapshot callout to a hotter snapback tone so the second authored breakthrough beat reads differently from the strafe opener.',
);
assert.equal(
  surgeSnapDeathPresentation.titleTextColor,
  '#ffe9b2',
  'Deaths inside the surge snap should brighten the title around the hotter snapback accent instead of reusing the strafe palette.',
);
assert.equal(
  surgeSnapDeathPresentation.promptBackgroundColor,
  '#6a3916',
  'Deaths inside the surge snap should keep the retry block on the same snapback palette so the overlay tone matches the authored beat that failed.',
);
const pinchLockDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: -1, offsetY: 0, label: 'left' },
  survivalTimeSeconds: 20.8,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 5,
    totalRuns: 5,
    firstDeathTime: 10,
    totalRetryDelayMs: 7100,
    retryCount: 5,
    recentDeathTimes: [10.4, 14.8, 18.6, 20.1, 20.8],
  },
  isNewBest: false,
  bestSurvivalTimeText: '22.4s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK RIGHT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  pinchLockDeathPresentation.calloutBackgroundColor,
  '#482717',
  'Deaths inside pinch lock should keep a warm clamp tone so the first killbox close reads differently from the later seal snap.',
);
assert.equal(
  pinchLockDeathPresentation.promptBackgroundColor,
  '#5b3418',
  'Deaths inside pinch lock should tint the retry block around the bounded bend-back accent instead of falling back to the generic overlay palette.',
);
const sealSnapDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 1, offsetY: 0, label: 'right' },
  survivalTimeSeconds: 22.8,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 6,
    totalRuns: 6,
    firstDeathTime: 10,
    totalRetryDelayMs: 8400,
    retryCount: 6,
    recentDeathTimes: [10.4, 14.8, 18.6, 20.1, 21.7, 22.8],
  },
  isNewBest: false,
  bestSurvivalTimeText: '24.9s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK LEFT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  sealSnapDeathPresentation.calloutBackgroundColor,
  '#561d23',
  'Deaths inside seal snap should shift the snapshot callout into a hotter close-out tone so the post-bridge shutoff reads differently from pinch lock.',
);
assert.equal(
  sealSnapDeathPresentation.titleTextColor,
  '#ffd9d2',
  'Deaths inside seal snap should brighten the title around the harder late snap so the snapshot tone clearly separates the second killbox close.',
);
assert.equal(
  sealSnapDeathPresentation.promptBackgroundColor,
  '#6d262b',
  'Deaths inside seal snap should keep the retry block on the hotter late-close palette so the overlay stays aligned with the failed post-bridge snapback.',
);
const foldSnapDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: -1, offsetY: 0, label: 'left' },
  survivalTimeSeconds: 27.6,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 7,
    totalRuns: 7,
    firstDeathTime: 10,
    totalRetryDelayMs: 9700,
    retryCount: 7,
    recentDeathTimes: [10.4, 14.8, 18.6, 20.1, 21.7, 24.4, 27.6],
  },
  isNewBest: false,
  bestSurvivalTimeText: '29.8s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK RIGHT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  foldSnapDeathPresentation.calloutBackgroundColor,
  '#173648',
  'Deaths inside fold snap should shift the snapshot callout into a colder echo-tightening tone so the post-lock-in beat reads differently from the earlier seal snap.',
);
assert.equal(
  foldSnapDeathPresentation.titleTextColor,
  '#d5f2ff',
  'Deaths inside fold snap should brighten the title around the colder echo-tightening accent instead of reusing the hotter killbox close palettes.',
);
assert.equal(
  foldSnapDeathPresentation.promptBackgroundColor,
  '#1f4357',
  'Deaths inside fold snap should keep the retry block on the echo-tightening palette so the overlay stays aligned with the failed post-lock-in beat.',
);
assert.equal(
  getNearMissChaseImpactLabelText('left', false),
  'LEFT SNAP',
  'Near-miss impact labels should turn the generic direction tag into a snapped-lane marker.',
);
assert.equal(
  getNearMissChaseFatalLabelText('left', false),
  'SNAP\nLEFT LANE',
  'Near-miss fatal spotlight labels should name the broken lane instead of the generic killer direction.',
);
assert.equal(
  getNearMissChaseTitleText('left', false),
  'Lane snapped from left',
  'Near-miss death titles should keep the copy aligned with the snapped-lane truth used by the live hit marker and fatal spotlight.',
);
assert.deepEqual(
  getNearMissLaneDirection(
    { x: 400, y: 300 },
    { x: 332, y: 292 },
  ),
  { x: -1, y: 0 },
  'Near-miss chase runtime should collapse the last close shave into a dominant lane so follow-up spawns can reopen or cut that same space without inventing a new manager.',
);
assert.deepEqual(
  getNearMissChaseTargetOffset('reopen', { x: -1, y: 0 }),
  { x: NEAR_MISS_CHASE_REOPEN_TARGET_OFFSET_PX, y: 0 },
  'The first near-miss chase runtime beat should shove the next spawn target away from the snapped lane so the player feels a brief lane reopen while the chase is hot.',
);
assert.deepEqual(
  getNearMissChaseTargetOffset('cut', { x: -1, y: 0 }),
  { x: -NEAR_MISS_CHASE_CUT_TARGET_OFFSET_PX, y: 0 },
  'The second near-miss chase runtime beat should cut back into the same lane so the live chase earns a visible reopen-then-snap rhythm instead of staying presentation-only.',
);
assert.equal(
  deathPresentation.body,
  'Run 12.3s. New best set.\nSTRAFE FORK snapped inside BREAKTHROUGH. 5.7s short of KILLBOX.',
  'Death overlay body should summarize the run result and the coarse phase reached so the game-over screen sells structural progress instead of only timer math.',
);
assert.equal(
  deathPresentation.prompt,
  'Next lane: BREAK RIGHT\nRematch the strafe fork and carry it to KILLBOX in +5.7s | Next beat: 15s surge\nRetry: Space, Enter, tap/click, or move',
  'Death overlay prompt should pair the next coarse retry target with the immediate beat and retry affordance in one compact block.',
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
assert.equal(
  getRunPhaseState(0).currentPhase.id,
  'opening',
  'Fresh runs should begin in the opening window before the 10s gate is cleared.',
);
assert.equal(
  getRunPhaseState(12).currentPhase.id,
  'breakthrough',
  'Cross-lane and surge pressure should live inside the breakthrough phase once the opener is cleared.',
);
assert.equal(
  getRunPhaseState(20).currentPhase.id,
  'killbox',
  'Lead pressure should mark the start of the killbox phase instead of reading like a flat continuation of the opener.',
);
assert.equal(
  getRunPhaseState(40).currentPhase.id,
  'endgame',
  'Late-run drift coverage should read as a distinct endgame phase before the 60s clear.',
);
assert.equal(
  getRunPhaseStatusText(12),
  'BREAKTHROUGH | 6.0s to KILLBOX',
  'The phase HUD should tell the player which coarse run state is live and how far the next structural shift sits ahead.',
);
assert.equal(
  getRunPhaseDetailText(20),
  'Lead cuts hit first, shadow echoes keep scissoring the lane, a bounded pinch lock bends back into the straight escape, bridge echo gives one step back, seal snap shuts it again just before 24s lock-in, and a later fold snap tightens the echo lane once more before drift release. Break your line late and keep changing across the fold. Next phase at 32s.',
  'The phase detail line should describe the active structural pressure instead of restating raw timer data.',
);
assert.equal(
  getRunPhaseDetailText(34),
  'The first rebound still rides the release side. Hold the opened lane briefly, then get ready to cross before the same-side punish snaps shut. Next phase at 60s.',
  'Endgame detail should surface the live rebound window so the 32-40s chain reads like staged arena behavior instead of a single generic drift paragraph.',
);
assert.equal(
  getRunPhaseDetailText(34.6),
  'The release lane stops being safe here. Cross back out before rebound punish pinches the same side shut ahead of the wider sweep. Next phase at 60s.',
  'The late rebound slice should expose the same-side punish so the player-facing truth turns into a hold-or-cross decision instead of one long same-lane sustain.',
);
assert.equal(
  getRunPhaseDetailText(37.1),
  'Late sweep cashes in here. Sweep lock keeps biting on the crossed lane before aftershock slams down; do not leak back into the first reopen. Next phase at 60s.',
  'The late-sweep follow-through should expose a second bounded lock so the 36-38s band creates a fresh spatial consequence instead of one long whip.',
);
assert.equal(
  getRunPhaseDetailText(37.8),
  'Late sweep does not fully let go. The aftershock clamp stays on the sweep side and tries to pin the escape lane one beat longer. Next phase at 60s.',
  'The late band should keep a dedicated follow-through cue after the sweep so 37.6-40s does not flatten back into generic drift copy.',
);
assert.equal(
  getRunPhaseDetailText(40),
  'Aftershock finally loosens, but drift still leans across the sweep lane long enough to hand the run into the 40s instead of snapping straight back to generic cadence. Next phase at 60s.',
  'The 40s handoff should stay tellable on the phase detail line instead of collapsing back into generic endgame copy as soon as aftershock ends.',
);
assert.equal(
  getRunPhaseDetailText(42),
  'Recenter opens just enough air to bait a hold. Drift briefly shows a safer lane, then preclear snaps back across it; take the baited reopen only if you are ready to cut again. Next phase at 60s.',
  'The first 41s+ slice should surface its own false-clear bait so the endgame does not flatten back into generic drift right after recenter ends.',
);
assert.equal(
  getRunPhaseDetailText(44),
  'The fake reopen cashes in here. Preclear squeezes back across the baited lane and keeps the run under bounded pressure so 45s+ still feels earned before the long 60s push. Next phase at 60s.',
  'The second 41s+ slice should surface a distinct preclear squeeze so the baited reopen cashes in before clear climb.',
);
assert.equal(
  getRunPhaseDetailText(50),
  'Preclear squeeze gives way to an ascent stair. Drift keeps stair-stepping up the release lane for 10.0s more; hold the climb and carry the run clean into 60s. Next phase at 60s.',
  'Once preclear ends, the phase detail should turn into a visible clear-climb ascent threat instead of falling back to a generic 60s countdown.',
);
assert.equal(
  getRunPhaseDetailText(54),
  'The summit snap is live. Drift whips back across the opened lane while 6.0s remain; keep the route alive and finish the 60s clear under the snapback. Next phase at 60s.',
  'Late clear-climb detail should expose the summit snap so the final seconds read like a live threat, not a flat victory lap.',
);
assert.deepEqual(
  getEndgameDriftCue(32.2),
  {
    id: 'release',
    title: 'RELEASE CUT LIVE',
    hudLabel: 'RELEASE LIVE',
    snapshotLabel: 'RELEASE CUT',
    rematchLabel: 'the release cut',
    accentColor: 0x7ce8ff,
    body: 'Fold snap cracks open sideways here. Cut off the snapped fold first, then stretch the release lane before the rebound clamps onto the same opened side.',
  },
  'The first endgame cue should mark the lateral release so the killbox handoff stays explicit on the HUD.',
);
assert.deepEqual(
  getEndgameDriftCue(33.8),
  {
    id: 'rebound',
    title: 'REBOUND HOLD LIVE',
    hudLabel: 'REBOUND HOLD',
    snapshotLabel: 'REBOUND',
    rematchLabel: 'the rebound hold',
    accentColor: 0xc8ff9a,
    body: 'The first rebound still rides the release side. Hold the opened lane briefly, then get ready to cross before the same-side punish snaps shut.',
  },
  'The mid-band rebound should expose its own cue so the first post-release answer reads as a distinct player-facing event.',
);
assert.deepEqual(
  getEndgameDriftCue(34.5),
  {
    id: 'rebound-punish',
    title: 'REBOUND PUNISH LIVE',
    hudLabel: 'REBOUND PUNISH',
    snapshotLabel: 'REBOUND PUNISH',
    rematchLabel: 'the rebound punish',
    accentColor: 0xfff0c7,
    body: 'The release lane stops being safe here. Cross back out before rebound punish pinches the same side shut ahead of the wider sweep.',
  },
  'The late rebound slice should flip into an explicit punish cue so the player reads a real hold-or-cross decision before late sweep.',
);
assert.deepEqual(
  getEndgameDriftCue(36.4),
  {
    id: 'late-sweep',
    title: 'LATE SWEEP LIVE',
    hudLabel: 'LATE SWEEP LIVE',
    snapshotLabel: 'LATE SWEEP',
    rematchLabel: 'the late sweep snapback',
    accentColor: 0xfff0c7,
    body: 'The late sweep whips back across the arena. Read the first cross-lane turn, then stay off that closed side before sweep lock tightens it again.',
  },
  'The late sweep should expose a separate cue so the second half of the chain does not collapse back into generic drift copy.',
);
assert.deepEqual(
  getEndgameDriftCue(37.1),
  {
    id: 'sweep-lock',
    title: 'SWEEP LOCK LIVE',
    hudLabel: 'SWEEP LOCK',
    snapshotLabel: 'SWEEP LOCK',
    rematchLabel: 'the sweep lock',
    accentColor: 0xffd6a5,
    body: 'Late sweep cashes in here. Sweep lock keeps biting on the crossed lane before aftershock slams down; do not leak back into the first reopen.',
  },
  'The late-sweep tail should expose a second bounded cue so the cross-lane turn produces a fresh player-facing consequence before aftershock.',
);
assert.deepEqual(
  getEndgameDriftCue(38),
  {
    id: 'aftershock',
    title: 'AFTERSHOCK HOLD LIVE',
    hudLabel: 'AFTERSHOCK LIVE',
    snapshotLabel: 'AFTERSHOCK HOLD',
    rematchLabel: 'the aftershock clamp',
    accentColor: 0xff9eb1,
    body: 'Late sweep does not fully let go. The aftershock clamp stays on the sweep side and tries to pin the escape lane one beat longer.',
  },
  'The late band follow-through should expose its own cue so the post-sweep window stays tellable instead of falling straight back to generic drift.',
);
assert.deepEqual(
  getEndgameDriftCue(40),
  {
    id: 'recenter',
    title: 'RECENTER LIVE',
    hudLabel: 'RECENTER LIVE',
    snapshotLabel: 'RECENTER',
    rematchLabel: 'the recenter handoff',
    accentColor: 0x7ce8ff,
    body: 'Aftershock finally loosens, but drift still leans across the sweep lane long enough to hand the run into the 40s instead of snapping straight back to generic cadence.',
  },
  'The first 40s handoff should expose its own cue so the endgame finale keeps reading as a chain instead of dropping straight into generic drift.',
);
assert.deepEqual(
  getEndgameDriftCue(42),
  {
    id: 'false-clear',
    title: 'FALSE CLEAR LIVE',
    hudLabel: 'FALSE CLEAR',
    snapshotLabel: 'FALSE CLEAR',
    rematchLabel: 'the false-clear bait',
    accentColor: 0xd8fff4,
    body: 'Recenter opens just enough air to bait a hold. Drift briefly shows a safer lane, then preclear snaps back across it; take the baited reopen only if you are ready to cut again.',
  },
  'The first post-recenter slice should expose a false-clear bait so the 41s+ band asks for a fresh route read before preclear cashes in.',
);
assert.deepEqual(
  getEndgameDriftCue(44),
  {
    id: 'preclear',
    title: 'PRECLEAR SQUEEZE LIVE',
    hudLabel: 'PRECLEAR LIVE',
    snapshotLabel: 'PRECLEAR SQUEEZE',
    rematchLabel: 'the preclear squeeze',
    accentColor: 0xfff0c7,
    body: 'The fake reopen cashes in here. Preclear squeezes back across the baited lane and keeps the run under bounded pressure so 45s+ still feels earned before the long 60s push.',
  },
  'The second 41s+ slice should expose a distinct preclear squeeze so the false-clear bait cashes in before the long 60s climb.',
);
assert.deepEqual(
  getEndgameClearClimbState(50),
  {
    title: 'ASCENT STAIR LIVE',
    hudLabel: 'ASCENT STAIR',
    accentColor: 0xfff0c7,
    snapshotLabel: 'CLEAR CLIMB',
    rematchLabel: 'the clear climb',
    threatLabel: 'ASCENT STAIR',
    body: 'Preclear squeeze gives way to an ascent stair. Drift keeps stair-stepping up the release lane for 10.0s more; hold the climb and carry the run clean into 60s.',
  },
  'The early clear-climb stretch should expose an ascent-stair state so HUD and spectacle can sell the push to 60s as an authored threat window.',
);
assert.deepEqual(
  getEndgameClearClimbState(54),
  {
    title: 'SUMMIT SNAP LIVE',
    hudLabel: 'SUMMIT SNAP',
    accentColor: 0xff9eb1,
    snapshotLabel: 'CLEAR CLIMB',
    rematchLabel: 'the clear climb',
    threatLabel: 'SUMMIT SNAP',
    body: 'The summit snap is live. Drift whips back across the opened lane while 6.0s remain; keep the route alive and finish the 60s clear under the snapback.',
  },
  'The late clear-climb stretch should expose a summit-snap variant so the final seconds gain a sharper spatial identity before 60s.',
);
assert.equal(
  getEndgameClearClimbState(42),
  null,
  'The clear-climb state should stay closed before the preclear squeeze finishes.',
);
assert.equal(
  getEndgameDriftCue(35.4),
  null,
  'Cue windows should stay bounded so the live callouts highlight the release-rebound-sweep chain instead of permanently occupying the endgame HUD.',
);
assert.equal(
  getRunPhaseReachedBadgeText(0),
  null,
  'Opening deaths should stay badge-light instead of manufacturing fake payoff before the first gate is broken.',
);
assert.equal(
  getRunPhaseReachedBadgeText(20),
  'KILLBOX',
  'Deaths after the lead unlock should surface the coarse phase reached as a compact fallback badge.',
);
assert.equal(
  getRunPhaseReachedBadgeText(20.8),
  'PINCH LOCK',
  'Deaths inside the bounded killbox pinch should surface the named trap beat instead of generic killbox fallback.',
);
assert.equal(
  getRunPhaseReachedBadgeText(22.8),
  'SEAL SNAP',
  'Deaths inside the post-bridge seal snap should surface the second bounded killbox close instead of flattening back to generic killbox wording.',
);
assert.equal(
  getRunPhaseReachedBadgeText(27.6),
  'FOLD SNAP',
  'Deaths inside the later killbox fold snap should surface the new post-lock-in beat instead of falling back to generic killbox wording.',
);
assert.equal(
  getRunPhaseReachedBadgeText(33.8),
  'REBOUND',
  'Bounded endgame deaths should surface the live cue as the fallback badge so late failures stay tellable on the death screen.',
);
assert.equal(
  getRunPhaseReachedBadgeText(34.5),
  'REBOUND PUNISH',
  'Deaths in the late rebound punish should surface the crossed-lane punish beat instead of flattening back to the generic rebound badge.',
);
assert.equal(
  getRunPhaseReachedBadgeText(37.1),
  'SWEEP LOCK',
  'Deaths in the late sweep lock should surface the new cross-lane clamp instead of jumping straight from late sweep to aftershock.',
);
assert.equal(
  getRunPhaseReachedBadgeText(38),
  'AFTERSHOCK HOLD',
  'Deaths inside the post-sweep clamp should expose the new late follow-through badge instead of collapsing back to generic endgame wording.',
);
assert.equal(
  getRunPhaseReachedBadgeText(40),
  'RECENTER',
  'Deaths in the 40s handoff should expose the recenter badge so the finale does not collapse back to generic endgame wording once aftershock ends.',
);
assert.equal(
  getRunPhaseReachedBadgeText(42),
  'FALSE CLEAR',
  'Deaths right after recenter should expose the false-clear bait badge so the 41s band does not flatten back into generic endgame wording.',
);
assert.equal(
  getRunPhaseReachedBadgeText(44),
  'PRECLEAR SQUEEZE',
  'Deaths after the false-clear bait should expose the preclear squeeze badge so 43s+ failures stay attributable before the long clear climb.',
);
assert.equal(
  getRunPhaseReachedBadgeText(50),
  'CLEAR CLIMB',
  'Deaths in the final 45.6s+ stretch should surface the clear climb badge so the last push does not collapse back to generic endgame wording.',
);
assert.equal(
  getRunPhaseDeathSummaryText(7.4),
  'Opening window snapped. Break 10s to start the ladder.',
  'Opening deaths should convert the miss into a clear next threshold instead of dumping generic survival-goal copy.',
);
assert.equal(
  getRunPhaseDeathSummaryText(20),
  'KILLBOX reached. 12.0s short of ENDGAME DRIFT.',
  'Death summary text should tell the player which structural phase they reached and how far the next one sits ahead.',
);
assert.equal(
  getRunPhaseDeathSummaryText(20.8),
  'PINCH LOCK snapped inside KILLBOX. 11.2s short of ENDGAME DRIFT.',
  'Deaths inside the new killbox trap beat should explain the missed bounded answer instead of collapsing back to generic killbox wording.',
);
assert.equal(
  getRunPhaseDeathSummaryText(22.8),
  'SEAL SNAP snapped inside KILLBOX. 9.2s short of ENDGAME DRIFT.',
  'Deaths inside the post-bridge seal snap should explain that the recovery lane closed again before 24s lock-in.',
);
assert.equal(
  getRunPhaseDeathSummaryText(27.6),
  'FOLD SNAP snapped inside KILLBOX. 4.4s short of ENDGAME DRIFT.',
  'Deaths inside the post-lock-in fold snap should explain that echo cadence tightened again before drift release.',
);
assert.equal(
  getRunPhaseDeathSummaryText(33.8),
  'REBOUND snapped inside ENDGAME DRIFT. 26.2s short of OVERTIME.',
  'Late-run death summary should say which endgame ring broke instead of collapsing every 32-40s death into the same generic endgame line.',
);
assert.equal(
  getRunPhaseDeathSummaryText(34.5),
  'REBOUND PUNISH snapped inside ENDGAME DRIFT. 25.5s short of OVERTIME.',
  'Deaths in the punish slice should explain that the release lane closed again before late sweep takes over.',
);
assert.equal(
  getRunPhaseDeathSummaryText(37.1),
  'SWEEP LOCK snapped inside ENDGAME DRIFT. 22.9s short of OVERTIME.',
  'Deaths in the sweep-lock slice should explain that the cross-lane whip stayed shut for one more beat before aftershock took over.',
);
assert.equal(
  getRunPhaseDeathSummaryText(38),
  'AFTERSHOCK HOLD snapped inside ENDGAME DRIFT. 22.0s short of OVERTIME.',
  'The post-sweep follow-through should carry through to the death summary so late failures stay attributable in the retry payoff.',
);
assert.equal(
  getRunPhaseDeathSummaryText(40),
  'RECENTER snapped inside ENDGAME DRIFT. 20.0s short of OVERTIME.',
  'The 40s handoff should carry through to the death summary so late failures stay attributable after aftershock ends.',
);
assert.equal(
  getRunPhaseDeathSummaryText(42),
  'FALSE CLEAR snapped inside ENDGAME DRIFT. 18.0s short of OVERTIME.',
  'The false-clear bait should carry through to the death summary so 41s+ deaths still point at the baited late-run miss.',
);
assert.equal(
  getRunPhaseDeathSummaryText(44),
  'PRECLEAR SQUEEZE snapped inside ENDGAME DRIFT. 16.0s short of OVERTIME.',
  'The post-bait squeeze should carry through to the death summary so 43s+ deaths still point at the authored late-run miss.',
);
assert.equal(
  getRunPhaseDeathSummaryText(50),
  'CLEAR CLIMB snapped inside ENDGAME DRIFT. 10.0s short of 60s CLEAR.',
  'The final 45.6s+ death summary should frame the miss as a failed clear climb, not merely another generic step toward overtime.',
);
assert.equal(
  getRunPhaseRetryGoalText(20),
  'Reach ENDGAME DRIFT in +12.0s',
  'Retry goal text should turn the next phase into an immediate rematch target.',
);
assert.equal(
  getRunPhaseRetryGoalText(20.8),
  'Rematch the pinch lock and carry it to ENDGAME DRIFT in +11.2s',
  'Retry guidance should send the player back to the authored killbox pinch instead of generic phase progression.',
);
assert.equal(
  getRunPhaseRetryGoalText(22.8),
  'Rematch the seal snap and carry it to ENDGAME DRIFT in +9.2s',
  'Retry guidance should send the player back to the late killbox snapback once the bridge echo has already reopened the lane.',
);
assert.equal(
  getRunPhaseRetryGoalText(27.6),
  'Rematch the fold snap and carry it to ENDGAME DRIFT in +4.4s',
  'Retry guidance should send the player back to the post-lock-in fold snap so the 24-32s band sells a concrete rematch target.',
);
assert.equal(
  getRunPhaseRetryGoalText(33.8),
  'Rematch the rebound hold and carry it to 60s clear in +26.2s',
  'Late-run retry text should pitch the missed ring as the rematch target so endgame deaths feel worth replaying.',
);
assert.equal(
  getRunPhaseRetryGoalText(34.5),
  'Rematch the rebound punish and carry it to 60s clear in +25.5s',
  'Retry guidance should name the punish slice directly so the player knows the same-side hold stopped being safe.',
);
assert.equal(
  getRunPhaseRetryGoalText(37.1),
  'Rematch the sweep lock and carry it to 60s clear in +22.9s',
  'Retry guidance should name the sweep lock directly so the late sweep now sells a concrete second consequence instead of one generic crossback.',
);
assert.equal(
  getRunPhaseRetryGoalText(38),
  'Rematch the aftershock clamp and carry it to 60s clear in +22.0s',
  'The post-sweep follow-through should become the retry target instead of dropping the player back to generic endgame phrasing.',
);
assert.equal(
  getRunPhaseRetryGoalText(40),
  'Rematch the recenter handoff and carry it to 60s clear in +20.0s',
  'The 40s handoff should become the retry target instead of dropping the player back to generic endgame phrasing as soon as aftershock ends.',
);
assert.equal(
  getRunPhaseRetryGoalText(42),
  'Rematch the false-clear bait and carry it to 60s clear in +18.0s',
  'The false-clear bait should become the retry target so the first 41s handoff sells a concrete rematch hook.',
);
assert.equal(
  getRunPhaseRetryGoalText(44),
  'Rematch the preclear squeeze and carry it to 60s clear in +16.0s',
  'The post-bait squeeze should become the retry target so the late 40s band still sells a concrete rematch hook.',
);
assert.equal(
  getRunPhaseRetryGoalText(50),
  'Rematch the clear climb and carry it to 60s clear in +10.0s',
  'The final 45.6s+ retry goal should sell the missed clear push directly instead of routing the player through generic overtime wording.',
);
const lateEndgameDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 1, offsetY: 0, label: 'right' },
  survivalTimeSeconds: 33.8,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 4,
    totalRuns: 4,
    firstDeathTime: 10,
    totalRetryDelayMs: 8000,
    retryCount: 4,
    recentDeathTimes: [20.1, 29.7, 32.4, 33.8],
  },
  isNewBest: false,
  bestSurvivalTimeText: '36.0s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK LEFT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  lateEndgameDeathPresentation.badge,
  'REBOUND',
  'Late endgame deaths should surface the active rebound ring as the fallback badge when no higher-priority milestone overrides it.',
);
assert.equal(
  lateEndgameDeathPresentation.body,
  'Run 33.8s. Best 36.0s.\nREBOUND snapped inside ENDGAME DRIFT. 26.2s short of OVERTIME.',
  'Late endgame death body should carry the missed rebound ring so the game-over surface explains which late chain segment failed.',
);
assert.equal(
  lateEndgameDeathPresentation.prompt,
  'Next lane: BREAK LEFT\nRematch the rebound hold and carry it to 60s clear in +26.2s\nRetry: Space, Enter, tap/click, or move',
  'Late endgame retry prompt should frame the active ring as the rematch target without falling back to a generic next-beat line.',
);
const lateSweepDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: -1, offsetY: 0, label: 'left' },
  survivalTimeSeconds: 36.4,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 5,
    totalRuns: 5,
    firstDeathTime: 10,
    totalRetryDelayMs: 9100,
    retryCount: 5,
    recentDeathTimes: [20.1, 29.7, 33.8, 34.5, 36.4],
  },
  isNewBest: false,
  bestSurvivalTimeText: '38.2s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK RIGHT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  lateSweepDeathPresentation.calloutBackgroundColor,
  '#4b2714',
  'Deaths inside late sweep should keep a warm crossback tone so the first wide turn reads differently from the tighter sweep lock that follows.',
);
assert.equal(
  lateSweepDeathPresentation.promptBackgroundColor,
  '#5c3416',
  'Deaths inside late sweep should tint the retry block around the first cross-lane whip instead of falling back to the generic endgame palette.',
);
const sweepLockDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 1, offsetY: 0, label: 'right' },
  survivalTimeSeconds: 37.1,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 6,
    totalRuns: 6,
    firstDeathTime: 10,
    totalRetryDelayMs: 10200,
    retryCount: 6,
    recentDeathTimes: [20.1, 29.7, 33.8, 34.5, 36.4, 37.1],
  },
  isNewBest: false,
  bestSurvivalTimeText: '38.2s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK LEFT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  sweepLockDeathPresentation.calloutBackgroundColor,
  '#592117',
  'Deaths inside sweep lock should shift into a hotter clamp tone so the second late-band closure reads differently from the opening late sweep.',
);
assert.equal(
  sweepLockDeathPresentation.titleTextColor,
  '#ffd8cd',
  'Deaths inside sweep lock should brighten the title around the tighter lock palette so the overlay keeps the second closure legible.',
);
assert.equal(
  sweepLockDeathPresentation.promptBackgroundColor,
  '#6d2a1c',
  'Deaths inside sweep lock should keep the retry block on the tighter clamp palette so the overlay stays aligned with the failed second closure.',
);
const aftershockDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 0, offsetY: -1, label: 'up' },
  survivalTimeSeconds: 38,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 7,
    totalRuns: 7,
    firstDeathTime: 10,
    totalRetryDelayMs: 11600,
    retryCount: 7,
    recentDeathTimes: [20.1, 29.7, 33.8, 34.5, 36.4, 37.1, 38.0],
  },
  isNewBest: false,
  bestSurvivalTimeText: '39.1s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK DOWN',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  aftershockDeathPresentation.calloutBackgroundColor,
  '#401a26',
  'Deaths inside aftershock should move into a heavier clamp tone so the final late-band follow-through reads differently from sweep lock.',
);
assert.equal(
  aftershockDeathPresentation.titleTextColor,
  '#ffd8e3',
  'Deaths inside aftershock should brighten the title around the heavier clamp palette instead of reusing the sweep-lock tone.',
);
assert.equal(
  aftershockDeathPresentation.promptBackgroundColor,
  '#4f2331',
  'Deaths inside aftershock should keep the retry block on the post-sweep clamp palette so the overlay stays aligned with the final late-band hold.',
);
const falseClearDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: -1, offsetY: 0, label: 'left' },
  survivalTimeSeconds: 42,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 8,
    totalRuns: 8,
    firstDeathTime: 10,
    totalRetryDelayMs: 12900,
    retryCount: 8,
    recentDeathTimes: [20.1, 29.7, 33.8, 34.5, 36.4, 37.1, 38.0, 42.0],
  },
  isNewBest: false,
  bestSurvivalTimeText: '42.6s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK RIGHT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  falseClearDeathPresentation.calloutBackgroundColor,
  '#173b31',
  'Deaths inside false clear should cool into a tempting reopen tone so the bait reads differently from the heavier preclear cash-in that follows.',
);
assert.equal(
  falseClearDeathPresentation.titleTextColor,
  '#d3ffec',
  'Deaths inside false clear should brighten the title around the reopen palette so the snapshot keeps the bait readable instead of falling back to generic endgame tones.',
);
assert.equal(
  falseClearDeathPresentation.promptBackgroundColor,
  '#204a3e',
  'Deaths inside false clear should keep the retry block on the reopen palette so the overlay stays aligned with the baited lane.',
);
const preclearDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 1, offsetY: 0, label: 'right' },
  survivalTimeSeconds: 44,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 9,
    totalRuns: 9,
    firstDeathTime: 10,
    totalRetryDelayMs: 14100,
    retryCount: 9,
    recentDeathTimes: [20.1, 29.7, 33.8, 34.5, 36.4, 37.1, 38.0, 42.0, 44.0],
  },
  isNewBest: false,
  bestSurvivalTimeText: '44.8s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK LEFT',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  preclearDeathPresentation.calloutBackgroundColor,
  '#541917',
  'Deaths inside preclear should shift into a hotter squeeze tone so the baited late-run cash-in reads differently from false clear.',
);
assert.equal(
  preclearDeathPresentation.titleTextColor,
  '#ffddd4',
  'Deaths inside preclear should brighten the title around the harder squeeze palette so the snapshot keeps the second closure legible before clear climb.',
);
assert.equal(
  preclearDeathPresentation.promptBackgroundColor,
  '#6a2320',
  'Deaths inside preclear should keep the retry block on the squeeze palette so the overlay stays aligned with the failed cash-in beat.',
);
const clearClimbDeathPresentation = getDeathPresentation({
  hitDirection: { offsetX: 0, offsetY: -1, label: 'up' },
  survivalTimeSeconds: 50,
  sessionTelemetry: {
    ...createEmptyTelemetry(),
    totalDeaths: 5,
    totalRuns: 5,
    firstDeathTime: 10,
    totalRetryDelayMs: 9200,
    retryCount: 5,
    recentDeathTimes: [20.1, 29.7, 42.0, 47.4, 50.0],
  },
  isNewBest: false,
  bestSurvivalTimeText: '54.3s',
  reachedSurvivalGoal: false,
  retryPromptText: 'Space, Enter, tap/click, or move',
  escapePromptTitle: 'BREAK DOWN',
  nearMissChainCount: null,
  nearMissPromptText: null,
});
assert.equal(
  clearClimbDeathPresentation.badge,
  'CLEAR CLIMB',
  'Final-stretch deaths should surface the clear climb badge so the player sees the missed finish window immediately.',
);
assert.equal(
  clearClimbDeathPresentation.body,
  'Run 50.0s. Best 54.3s.\nCLEAR CLIMB snapped inside ENDGAME DRIFT. 10.0s short of 60s CLEAR.',
  'Final-stretch death body should explain that the player missed the named clear push, not just another generic endgame segment.',
);
assert.equal(
  clearClimbDeathPresentation.prompt,
  'Next lane: BREAK DOWN\nRematch the clear climb and carry it to 60s clear in +10.0s\nRetry: Space, Enter, tap/click, or move',
  'Final-stretch retry prompt should push the player straight back toward the missed 60s clear instead of generic overtime phrasing.',
);
assert.equal(
  getRunPhaseTimelineText(20),
  [
    '0-10s OPENING WINDOW | 10-18s BREAKTHROUGH',
    '18-32s KILLBOX | 32-60s ENDGAME DRIFT',
    '60s+ OVERTIME | Best reached: KILLBOX',
  ].join('\n'),
  'Waiting presentation should forecast the coarse run ladder and mark the best phase reached so far.',
);
assert.deepEqual(
  getKillboxCue(20.8),
  {
    id: 'pinch-lock',
    title: 'PINCH LOCK LIVE',
    hudLabel: 'PINCH LOCK',
    snapshotLabel: 'PINCH LOCK',
    rematchLabel: 'the pinch lock',
    accentColor: 0xffd6a5,
    body: 'Killbox bends back here. A bounded lead lock pinches the straight escape, then bridge echo gives one step back before the final close. Hold the first sidestep and stay ready to cut late again.',
  },
  'Killbox should expose a bounded pinch-lock cue so the 20s trap beat reads like a named spatial event rather than generic mid-phase pressure.',
);
assert.equal(
  getRunPhaseSupportText(20.8),
  'KILLBOX PINCH LOCK: Killbox bends back here. A bounded lead lock pinches the straight escape, then bridge echo gives one step back before the final close. Hold the first sidestep and stay ready to cut late again. Next shift 32s.',
  'Killbox support text should surface the bounded trap beat while it is live instead of flattening the whole phase into one paragraph.',
);
assert.deepEqual(
  getKillboxCue(22.8),
  {
    id: 'seal-snap',
    title: 'SEAL SNAP LIVE',
    hudLabel: 'SEAL SNAP',
    snapshotLabel: 'SEAL SNAP',
    rematchLabel: 'the seal snap',
    accentColor: 0xffc18a,
    body: 'Bridge echo gives back a step, then seal snap shuts the lane again before 24s lock-in. Take the brief reopen, then cut late across the snapback instead of holding the first recovery line.',
  },
  'Killbox should expose a second bounded seal-snap cue so the bridge recovery does not flatten into generic echo pressure before 24s.',
);
assert.equal(
  getRunPhaseSupportText(22.8),
  'KILLBOX SEAL SNAP: Bridge echo gives back a step, then seal snap shuts the lane again before 24s lock-in. Take the brief reopen, then cut late across the snapback instead of holding the first recovery line. Next shift 32s.',
  'Killbox support text should surface the post-bridge seal snap while it is live so the late 22-24s route break stays readable.',
);
assert.deepEqual(
  getKillboxCue(27.6),
  {
    id: 'fold-snap',
    title: 'FOLD SNAP LIVE',
    hudLabel: 'FOLD SNAP',
    snapshotLabel: 'FOLD SNAP',
    rematchLabel: 'the fold snap',
    accentColor: 0xbcecff,
    body: 'Lock-in settles into echo cadence, then fold snap tightens the lane one more time before drift release. Do not hold the first fold; cut back across the tightening echo and reopen space for 32s.',
  },
  'Killbox should expose a bounded fold-snap cue inside the 24-32s lock-in band so cadence does not flatten into a single unbroken echo paragraph.',
);
assert.equal(
  getRunPhaseSupportText(27.6),
  'KILLBOX FOLD SNAP: Lock-in settles into echo cadence, then fold snap tightens the lane one more time before drift release. Do not hold the first fold; cut back across the tightening echo and reopen space for 32s. Next shift 32s.',
  'Killbox support text should surface the later fold snap while it is live so the 24-32s band keeps a readable bounded decision point.',
);
assert.deepEqual(
  getBreakthroughCue(12.4),
  {
    id: 'strafe-fork',
    title: 'STRAFE FORK LIVE',
    hudLabel: 'STRAFE FORK',
    snapshotLabel: 'STRAFE FORK',
    rematchLabel: 'the strafe fork',
    accentColor: 0xffb88a,
    body: 'Breakthrough peels sideways here. A bounded strafe fork reopens one lane first; take the fresh air before surge snaps the answer shut.',
  },
  'Breakthrough should expose an authored strafe-fork cue once the 12s window opens so early-mid play reads like a named spatial event.',
);
assert.deepEqual(
  getBreakthroughCue(15.2),
  {
    id: 'surge-snap',
    title: 'SURGE SNAP LIVE',
    hudLabel: 'SURGE SNAP',
    snapshotLabel: 'SURGE SNAP',
    rematchLabel: 'the surge snapback',
    accentColor: 0xffd38a,
    body: 'The fork cashes in here. Surge rushes back through the reopened lane with a forward snap; break across the closing line before killbox wakes up.',
  },
  'Breakthrough should expose a second cue when surge snaps back so the 15-18s answer chain stays readable.',
);
assert.equal(
  getRunPhaseStatusText(12.4),
  'BREAKTHROUGH | 5.6s to KILLBOX',
  'Run-phase status should keep the coarse countdown stable while authored breakthrough cues live inside the same band.',
);
assert.equal(
  getRunPhaseDetailText(12.4),
  'Breakthrough peels sideways here. A bounded strafe fork reopens one lane first; take the fresh air before surge snaps the answer shut. Next phase at 18s.',
  'Breakthrough detail text should describe the authored strafe fork instead of falling back to generic cadence copy during the live cue window.',
);
assert.equal(
  getRunPhaseSupportText(15.2),
  'BREAKTHROUGH SURGE SNAP: The fork cashes in here. Surge rushes back through the reopened lane with a forward snap; break across the closing line before killbox wakes up. Next shift 18s.',
  'Breakthrough support text should surface the surge snapback as the current live answer, not only as future cadence flavor.',
);
assert.equal(
  getRunPhaseReachedBadgeText(12.4),
  'STRAFE FORK',
  'Deaths inside the first authored breakthrough window should surface the named fork badge instead of generic breakthrough fallback.',
);
assert.equal(
  getRunPhaseDeathSummaryText(15.2),
  'SURGE SNAP snapped inside BREAKTHROUGH. 2.8s short of KILLBOX.',
  'Deaths inside the surge snapback should explain the missed authored early-mid beat instead of generic breakthrough phrasing.',
);
assert.equal(
  getRunPhaseRetryGoalText(15.2),
  'Rematch the surge snapback and carry it to KILLBOX in +2.8s',
  'Retry guidance should send the player back to the authored breakthrough answer chain before killbox.',
);
assert.deepEqual(
  getRunPhaseShiftAnnouncement('breakthrough'),
  {
    title: 'BREAKTHROUGH LIVE',
    body: 'Gate broken. A bounded strafe fork opens the early-mid lane, then surge snaps back through it before killbox wakes up.',
  },
  'The first major phase shift should announce the authored early-mid fork instead of only saying that generic pressure has increased.',
);
assert.deepEqual(
  getRunPhaseShiftAnnouncement('killbox'),
  {
    title: 'KILLBOX LIVE',
    body: 'A hard lead cut opens the trap, shadow echoes fold the lane, a bounded pinch lock bends back into the straight escape, bridge echo gives one step back, seal snap shuts the lane again before 24s lock-in, then fold snap tightens the echo lane once more before drift release.',
  },
  'Killbox should announce an immediate lead-cut trap instead of reading like a generic late speed bump.',
);
assert.deepEqual(
  getRunPhaseShiftAnnouncement('endgame'),
  {
    title: 'ENDGAME DRIFT LIVE',
    body: 'Fold snap cracks open sideways into drift. The first bend keeps that opened side alive, rebound hold briefly sustains it, rebound punish pinches the same lane shut, then a wider sweep flips back across the lane, sweep lock keeps that crossed route tight for one more beat, and aftershock, recenter, false clear, preclear, plus a clear-climb summit snap keep the 40s alive.',
  },
  'Endgame should announce the authored late-run chain instead of sounding like a disconnected late-run reset.',
);
assert.equal(
  getRunPhaseOnsetIntensity(10, 'breakthrough'),
  1,
  'Breakthrough onset intensity should peak right when the 10s gate breaks so the arena tell can hit immediately.',
);
assert.ok(
  getRunPhaseOnsetIntensity(10.8, 'breakthrough') > 0,
  'Breakthrough onset intensity should stay alive briefly after the gate break so the tell remains readable in motion.',
);
assert.equal(
  getRunPhaseOnsetIntensity(12, 'breakthrough'),
  0,
  'Breakthrough onset intensity should decay away before later strafe/surge beat callouts take over the presentation.',
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
    runSpawnCount: 1,
  }),
  'strafe',
  'Breakthrough should force an immediate strafe fork when 12s opens so the early-mid band reads like a spatial event instead of waiting for cadence luck.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: STRAFE_OBSTACLE_UNLOCK_SECONDS + BREAKTHROUGH_STRAFE_FORK_WINDOW_SECONDS + 0.1,
    runSpawnCount: STRAFE_OBSTACLE_CADENCE,
  }),
  'strafe',
  'The regular strafe cadence should still resume after the bounded fork window instead of disappearing once the authored opener ends.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: SURGE_OBSTACLE_UNLOCK_SECONDS,
    runSpawnCount: 1,
  }),
  'surge',
  'Breakthrough should force an immediate surge snap when 15s opens so the authored answer chain arrives before killbox.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: SURGE_OBSTACLE_UNLOCK_SECONDS + BREAKTHROUGH_SURGE_SNAP_WINDOW_SECONDS + 0.1,
    runSpawnCount: SURGE_OBSTACLE_CADENCE,
  }),
  'surge',
  'The regular surge cadence should still resume after the bounded snapback window instead of being replaced by the opener forever.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    runSpawnCount: 1,
  }),
  'lead',
  'Killbox onset should force an immediate lead threat so the 18s transition reads like a real trap instead of waiting for cadence luck.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 19.6,
    runSpawnCount: 2,
  }),
  'echo',
  'Killbox onset should hand off into a short echo follow-through so the trap reads like a spatial state instead of a single ambush.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: KILLBOX_PINCH_LOCK_WINDOW_START_SECONDS + 0.1,
    runSpawnCount: 4,
  }),
  'lead',
  'Killbox should force a bounded pinch-lock lead before the bridge echo so straight escapes stop feeling like the stable answer through 21s.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS + 0.1,
    runSpawnCount: 3,
  }),
  'echo',
  'Killbox should fire a late bridge echo before 24s so the band reads like a continuing spatial regime instead of going quiet after the opener.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: KILLBOX_SEAL_SNAP_WINDOW_START_SECONDS + 0.1,
    runSpawnCount: 4,
  }),
  'echo',
  'Killbox should force a bounded seal snap after the bridge echo so the brief recovery lane closes again before 24s lock-in.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: 24.2,
    runSpawnCount: 3,
  }),
  'echo',
  'The first post-24s echo should lock into the same killbox language immediately instead of waiting for cadence luck to reconnect the state.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: KILLBOX_FOLD_SNAP_WINDOW_START_SECONDS + 0.1,
    runSpawnCount: 5,
  }),
  'echo',
  'Killbox should force a later fold snap inside the 24-32s lock-in band so cadence gains one more bounded decision point before drift release.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds:
      ECHO_OBSTACLE_UNLOCK_SECONDS + KILLBOX_ECHO_HANDOFF_WINDOW_SECONDS + 0.1,
    runSpawnCount: 3,
  }),
  'standard',
  'Forced killbox echo bridges should stay bounded instead of replacing the whole phase with permanent echo pressure before cadence earns it.',
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
    survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_WINDOW_SECONDS + 0.1,
    runSpawnCount: 1,
  }),
  'drift',
  'The first post-release drift rebound should stay forced so the handoff does not immediately fall back to generic cadence luck.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: DRIFT_SWEEP_WINDOW_START_SECONDS + 0.1,
    runSpawnCount: 2,
  }),
  'drift',
  'A second bounded drift sweep should arrive later in the 32-40s band so endgame reads like a continuing chain instead of one opening cut.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: DRIFT_SWEEP_WINDOW_START_SECONDS + DRIFT_SWEEP_WINDOW_SECONDS + 0.2,
    runSpawnCount: 1,
  }),
  'drift',
  'A post-sweep aftershock window should keep the late band on a bounded drift follow-through instead of reverting to generic cadence immediately.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      DRIFT_SWEEP_WINDOW_SECONDS +
      DRIFT_AFTERSHOCK_WINDOW_SECONDS +
      0.2,
    runSpawnCount: 1,
  }),
  'drift',
  'A post-aftershock recenter window should keep the 40s handoff on bounded drift pressure instead of dropping straight to generic cadence.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      DRIFT_SWEEP_WINDOW_SECONDS +
      DRIFT_AFTERSHOCK_WINDOW_SECONDS +
      DRIFT_RECENTER_WINDOW_SECONDS +
      0.2,
    runSpawnCount: 1,
  }),
  'drift',
  'A post-recenter preclear window should keep the 41s+ band on bounded drift pressure instead of dropping straight to generic cadence.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      DRIFT_SWEEP_WINDOW_SECONDS +
      DRIFT_AFTERSHOCK_WINDOW_SECONDS +
      DRIFT_RECENTER_WINDOW_SECONDS +
      DRIFT_PRECLEAR_WINDOW_SECONDS +
      0.2,
    runSpawnCount: 1,
  }),
  'drift',
  'Clear-climb onset should now force drift pressure immediately so 45.6s+ reads like a live final threat instead of a flat victory lap.',
);
assert.equal(
  getObstacleVariant({
    survivalTimeSeconds: DRIFT_CLEAR_CLIMB_ASCENT_WINDOW_END_SECONDS + 0.2,
    runSpawnCount: 1,
  }),
  'drift',
  'The summit snap should keep the final clear-climb seconds on bounded drift pressure instead of falling back to generic cadence before 60s.',
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
        survivalTimeSeconds: STRAFE_OBSTACLE_UNLOCK_SECONDS + 0.2,
        runSpawnCount: 1,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.94,
    y: 0.342,
  },
  'The breakthrough strafe fork should cut harder across the current movement lane so the 12s opener reads like a fresh authored fork instead of ordinary cadence.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: SURGE_OBSTACLE_UNLOCK_SECONDS + 0.2,
        variant: 'surge',
        runSpawnCount: 1,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.961,
    y: -0.276,
  },
  'The breakthrough surge snap should whip back across the reopened lane instead of acting like a faster straight chase.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
        variant: 'lead',
        runSpawnCount: 1,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.951,
    y: -0.309,
  },
  'Killbox onset lead should slice across the current escape line instead of reading like another straight chase from the edge.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: 19.6,
        variant: 'echo',
        runSpawnCount: 2,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.978,
    y: 0.208,
  },
  'Killbox follow-through echo should scissor across the recovery lane instead of trailing on the same flat chase line as the later echo cadence.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: KILLBOX_PINCH_LOCK_WINDOW_START_SECONDS + 0.1,
        variant: 'lead',
        runSpawnCount: 4,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.899,
    y: -0.438,
  },
  'Killbox pinch lock should bend harder back into the straight escape lane so the mid-band trap beat feels distinct from the opening lead cut.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS + 0.1,
        variant: 'echo',
        runSpawnCount: 3,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.985,
    y: 0.174,
  },
  'Late killbox bridge echoes should keep folding the recovery lane so 18-24s still reads like one spatial state.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: KILLBOX_SEAL_SNAP_WINDOW_START_SECONDS + 0.1,
        variant: 'echo',
        runSpawnCount: 4,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.951,
    y: 0.309,
  },
  'The killbox seal snap should whip back harder than the bridge echo so the reopened lane closes again before 24s lock-in.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: 24.2,
        variant: 'echo',
        runSpawnCount: 3,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.995,
    y: 0.105,
  },
  'The first post-24s echo should still carry a lighter scissor cut so the normal cadence feels like the same regime locking in.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: 27,
        variant: 'echo',
        runSpawnCount: ECHO_OBSTACLE_CADENCE,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.995,
    y: 0.105,
  },
  'Killbox-phase echo cadence should keep folding the lane after 24s instead of dropping back to a flat chase until drift takes over.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: KILLBOX_FOLD_SNAP_WINDOW_START_SECONDS + 0.1,
        variant: 'echo',
        runSpawnCount: 5,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.97,
    y: 0.242,
  },
  'The killbox fold snap should tighten the post-lock-in echo lane harder than normal cadence so 24-32s gains a fresh bounded route break before drift release.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        survivalTimeSeconds: 22,
        variant: 'lead',
        runSpawnCount: LEAD_OBSTACLE_CADENCE,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -1,
    y: 0,
  },
  'Later lead beats should keep their base chase line once the killbox onset ambush window has passed.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: DRIFT_OBSTACLE_CADENCE,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.951,
    y: -0.309,
  },
  'The first drift release should cut harder off the fold-snap side so 32s feels like that final killbox clamp cracking open into a new lateral response.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_FOLD_CARRY_WINDOW_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: DRIFT_OBSTACLE_CADENCE,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.97,
    y: -0.242,
  },
  'Once the fold-carry slice ends, release should relax back to the milder drift cut instead of staying permanently over-rotated.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_WINDOW_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: 1,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.883,
    y: -0.469,
  },
  'The first post-release rebound hold should stay on the same lateral answer as the opening cut so endgame feels chained instead of reset.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_OBSTACLE_UNLOCK_SECONDS +
          DRIFT_RELEASE_WINDOW_SECONDS +
          DRIFT_REBOUND_HOLD_WINDOW_SECONDS +
          0.1,
        variant: 'drift',
        runSpawnCount: 1,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.927,
    y: 0.375,
  },
  'The late rebound punish should flip back across the opened lane so holding the same side no longer stays free until late sweep.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: DRIFT_SWEEP_WINDOW_START_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: 2,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.951,
    y: 0.309,
  },
  'The late bounded sweep should whip back across the lane so the 32-40s band tells a release-then-rebound story instead of one-sided drift spam.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_SWEEP_WINDOW_START_SECONDS +
          (DRIFT_SWEEP_WINDOW_SECONDS - DRIFT_SWEEP_LOCK_WINDOW_SECONDS) +
          0.1,
        variant: 'drift',
        runSpawnCount: 2,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.914,
    y: 0.407,
  },
  'The late sweep lock should tighten the crossed lane one more step so the cross-lane whip produces a second bounded consequence before aftershock.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_SWEEP_WINDOW_START_SECONDS + DRIFT_SWEEP_WINDOW_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: 3,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.866,
    y: 0.5,
  },
  'The aftershock clamp should stay on the sweep side with a harder angle so the final late-band beat feels like a real follow-through instead of generic drift cadence.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_SWEEP_WINDOW_START_SECONDS +
          DRIFT_SWEEP_WINDOW_SECONDS +
          DRIFT_AFTERSHOCK_WINDOW_SECONDS +
          0.1,
        variant: 'drift',
        runSpawnCount: 4,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.94,
    y: 0.342,
  },
  'The recenter handoff should still lean across the sweep lane before the endgame drops back to alternating drift cadence.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_SWEEP_WINDOW_START_SECONDS +
          DRIFT_SWEEP_WINDOW_SECONDS +
          DRIFT_AFTERSHOCK_WINDOW_SECONDS +
          DRIFT_RECENTER_WINDOW_SECONDS +
          0.1,
        variant: 'drift',
        runSpawnCount: 5,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.985,
    y: -0.174,
  },
  'The false-clear bait should briefly reopen the safer lane so the first 41s slice asks for a fresh route read instead of blending into recenter.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds:
          DRIFT_SWEEP_WINDOW_START_SECONDS +
          DRIFT_SWEEP_WINDOW_SECONDS +
          DRIFT_AFTERSHOCK_WINDOW_SECONDS +
          DRIFT_RECENTER_WINDOW_SECONDS +
          DRIFT_FALSE_CLEAR_WINDOW_SECONDS +
          0.1,
        variant: 'drift',
        runSpawnCount: 5,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.951,
    y: 0.309,
  },
  'The preclear squeeze should cash in across the baited lane so the late 40s read like a fresh authored pinch instead of generic drift.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: DRIFT_CLEAR_CLIMB_WINDOW_START_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: 6,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.961,
    y: -0.276,
  },
  'Clear-climb ascent should keep stair-stepping up the release side so 45.6s+ still feels spatially alive after preclear ends.',
);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(
      getObstacleTravelDirection({
        spawnPoint: { x: 856, y: 300 },
        targetPoint: { x: 400, y: 300 },
        playerVelocity: { x: 0, y: -214 },
        survivalTimeSeconds: DRIFT_CLEAR_CLIMB_ASCENT_WINDOW_END_SECONDS + 0.1,
        variant: 'drift',
        runSpawnCount: 7,
      }),
    ).map(([axis, value]) => [axis, Number(value.toFixed(3))]),
  ),
  {
    x: -0.899,
    y: 0.438,
  },
  'The summit snap should whip back across the opened lane so the last seconds before 60s gain a sharper final-threat character.',
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
    survivalTimeSeconds: SURGE_OBSTACLE_UNLOCK_SECONDS + 0.2,
    variant: 'surge',
  }),
  -BREAKTHROUGH_SURGE_SNAP_TARGET_LEAD_SECONDS,
  'The breakthrough surge snap should aim slightly ahead so the response beat closes the reopened lane instead of trailing behind it.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    variant: 'lead',
  }),
  -KILLBOX_FORCED_LEAD_TARGET_LEAD_SECONDS,
  'The first killbox lead should aim farther ahead so the phase opens with a readable line-cut instead of another shallow chase.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: KILLBOX_PINCH_LOCK_WINDOW_START_SECONDS + 0.1,
    variant: 'lead',
  }),
  -KILLBOX_PINCH_LOCK_TARGET_LEAD_SECONDS,
  'Killbox pinch lock should keep a dedicated forward lead so the bounded trap beat pinches the escape lane without inheriting the full onset ambush.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: 22,
    variant: 'lead',
  }),
  -LEAD_OBSTACLE_TARGET_LEAD_SECONDS,
  'Later lead beats should fall back to the normal predictive offset instead of keeping the onset ambush permanently maxed out.',
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
    survivalTimeSeconds: KILLBOX_FOLD_SNAP_WINDOW_START_SECONDS + 0.1,
    variant: 'echo',
  }),
  KILLBOX_FOLD_SNAP_TARGET_LAG_SECONDS,
  'The killbox fold snap should tighten lag so the later 24-32s beat reads like a fresh lane clamp instead of another soft cadence echo.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: KILLBOX_SEAL_SNAP_WINDOW_START_SECONDS + 0.1,
    variant: 'echo',
  }),
  KILLBOX_SEAL_SNAP_TARGET_LAG_SECONDS,
  'The killbox seal snap should tighten lag so the late 22-24s close reads like a fresh snapback instead of another soft echo.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS + 0.1,
    variant: 'drift',
  }),
  KILLBOX_FOLD_SNAP_TARGET_LAG_SECONDS,
  'The first drift release should inherit fold-snap lag so the endgame onset feels like a direct handoff out of the last killbox clamp instead of a cold reset.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_FOLD_CARRY_WINDOW_SECONDS + 0.1,
    variant: 'drift',
  }),
  DRIFT_RELEASE_TARGET_LAG_SECONDS,
  'Once the fold-carry slice passes, release should loosen slightly while still staying tighter than the old echo-style handoff.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_WINDOW_SECONDS + 0.1,
    variant: 'drift',
  }),
  DRIFT_REBOUND_TARGET_LAG_SECONDS,
  'The rebound beat should keep a shorter inherited lag so the lane still feels chained to killbox without trailing as softly as the opening release.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_OBSTACLE_UNLOCK_SECONDS +
      DRIFT_RELEASE_WINDOW_SECONDS +
      DRIFT_REBOUND_HOLD_WINDOW_SECONDS +
      0.1,
    variant: 'drift',
  }),
  DRIFT_REBOUND_PUNISH_TARGET_LAG_SECONDS,
  'Once the rebound hold expires, the punish slice should tighten lag so the same-side lane closure feels sharper before late sweep.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: DRIFT_SWEEP_WINDOW_START_SECONDS + 0.1,
    variant: 'drift',
  }),
  DRIFT_SWEEP_TARGET_LAG_SECONDS,
  'The late sweep should tighten its lag further so the second handoff reads like a sharper lane whip instead of another echo clone.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      (DRIFT_SWEEP_WINDOW_SECONDS - DRIFT_SWEEP_LOCK_WINDOW_SECONDS) +
      0.1,
    variant: 'drift',
  }),
  DRIFT_SWEEP_LOCK_TARGET_LAG_SECONDS,
  'The sweep lock should tighten lag beyond late sweep so the crossed lane stays threatening for one more bounded beat before aftershock.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS + DRIFT_SWEEP_WINDOW_SECONDS + 0.1,
    variant: 'drift',
  }),
  DRIFT_AFTERSHOCK_TARGET_LAG_SECONDS,
  'The aftershock clamp should tighten lag again so the post-sweep follow-through feels like a pin on the crossed lane instead of a soft reset.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      DRIFT_SWEEP_WINDOW_SECONDS +
      DRIFT_AFTERSHOCK_WINDOW_SECONDS +
      0.1,
    variant: 'drift',
  }),
  DRIFT_RECENTER_TARGET_LAG_SECONDS,
  'The first 40s handoff should keep a small carry-over lag so the finale eases into late drift instead of snapping straight back to generic cadence.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      DRIFT_SWEEP_WINDOW_SECONDS +
      DRIFT_AFTERSHOCK_WINDOW_SECONDS +
      DRIFT_RECENTER_WINDOW_SECONDS +
      0.1,
    variant: 'drift',
  }),
  DRIFT_FALSE_CLEAR_TARGET_LAG_SECONDS,
  'The false-clear bait should keep its own bounded lag so the first 41s slice reads like a tempting reopen instead of recenter copy.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_SWEEP_WINDOW_START_SECONDS +
      DRIFT_SWEEP_WINDOW_SECONDS +
      DRIFT_AFTERSHOCK_WINDOW_SECONDS +
      DRIFT_RECENTER_WINDOW_SECONDS +
      DRIFT_FALSE_CLEAR_WINDOW_SECONDS +
      0.1,
    variant: 'drift',
  }),
  DRIFT_PRECLEAR_TARGET_LAG_SECONDS,
  'The preclear squeeze should keep its own tighter lag so the false-clear bait cashes in as a fresh authored pinch.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds:
      DRIFT_CLEAR_CLIMB_WINDOW_START_SECONDS + 0.1,
    variant: 'drift',
  }),
  DRIFT_CLEAR_CLIMB_ASCENT_TARGET_LAG_SECONDS,
  'Clear-climb ascent should keep a dedicated lag so the newly opened lane still feels hunted instead of immediately flattening out.',
);
assert.equal(
  getObstacleTargetLagSeconds({
    survivalTimeSeconds: DRIFT_CLEAR_CLIMB_ASCENT_WINDOW_END_SECONDS + 0.1,
    variant: 'drift',
  }),
  DRIFT_CLEAR_CLIMB_SUMMIT_TARGET_LAG_SECONDS,
  'The summit snap should tighten lag again so the last seconds before 60s feel like a sharper snapback instead of a victory coast.',
);
assert.equal(
  KILLBOX_ECHO_CADENCE_ROTATION_DEGREES,
  6,
  'Killbox-phase echo cadence should keep a bounded scissor rotation so the live echo rhythm preserves the trap language without inventing a new threat family.',
);
assert.equal(
  KILLBOX_PINCH_LOCK_ROTATION_DEGREES,
  26,
  'Killbox pinch lock should hit harder than the onset lead so the new bounded beat visibly bends back into the straight escape lane.',
);
assert.equal(
  KILLBOX_SEAL_SNAP_ROTATION_DEGREES,
  18,
  'Killbox seal snap should stay firmer than the bridge echo so the brief reopen actually closes again before 24s lock-in.',
);
assert.equal(
  KILLBOX_FOLD_SNAP_ROTATION_DEGREES,
  14,
  'Killbox fold snap should sit between seal snap and normal echo cadence so the 24-32s band gains a clear bounded clamp without inventing a new threat family.',
);
assert.equal(
  DRIFT_RELEASE_FOLD_CARRY_ROTATION_DEGREES,
  18,
  'The fold-carry slice should hit harder than the rest of release so the first 32s cut reads like inherited killbox pressure cracking open.',
);
assert.equal(
  DRIFT_RELEASE_ROTATION_DEGREES,
  14,
  'The later release stretch should settle below the fold-carry cut and the full drift sweep so the handoff keeps shape without turning into an instant hard reset.',
);
assert.equal(
  DRIFT_RELEASE_TARGET_LAG_SECONDS,
  0.18,
  'The later release stretch should keep a tighter lag than old echo handoff while still opening more than the inherited fold-carry slice.',
);
assert.equal(
  DRIFT_RELEASE_FOLD_CARRY_WINDOW_SECONDS,
  0.8,
  'The fold-carry slice should stay short so the handoff gains a visible inherited crack without turning release into a full second killbox beat.',
);
assert.equal(
  DRIFT_REBOUND_HOLD_WINDOW_SECONDS,
  0.7,
  'The rebound hold should stay short so the player gets only a brief same-lane sustain before the punish asks for a cross.',
);
assert.equal(
  DRIFT_REBOUND_PUNISH_ROTATION_DEGREES,
  22,
  'The rebound punish should flip hard enough to close the held lane again without fully stealing late sweep’s wider cross-lane whip.',
);
assert.equal(
  DRIFT_REBOUND_PUNISH_TARGET_LAG_SECONDS,
  0.1,
  'The rebound punish should tighten lag versus rebound hold so the same-side closure feels intentional before the wider sweep.',
);
assert.equal(
  DRIFT_SWEEP_LOCK_WINDOW_SECONDS,
  0.6,
  'The sweep lock should stay short so late sweep gains a second consequence without stretching the entire 36-38s band into another long clamp.',
);
assert.equal(
  DRIFT_SWEEP_LOCK_ROTATION_DEGREES,
  24,
  'The sweep lock should hit harder than late sweep so the crossed lane stays closed for one more beat before aftershock.',
);
assert.equal(
  DRIFT_SWEEP_LOCK_TARGET_LAG_SECONDS,
  0.05,
  'The sweep lock should keep a tighter lag than late sweep so the follow-through feels like an intentional cross-lane lock instead of a soft drift tail.',
);
assert.equal(
  DRIFT_AFTERSHOCK_ROTATION_DEGREES,
  30,
  'The aftershock clamp should hit harder than the late sweep so the final late-band follow-through reads like a real pin instead of generic drift cadence.',
);
assert.equal(
  DRIFT_RECENTER_ROTATION_DEGREES,
  20,
  'The recenter handoff should stay firmer than generic drift but softer than aftershock so the 40s transition feels like a controlled release instead of another full clamp.',
);
assert.equal(
  DRIFT_FALSE_CLEAR_ROTATION_DEGREES,
  10,
  'The false-clear bait should stay milder than recenter so the reopened lane feels tempting without reading like a full reset.',
);
assert.equal(
  DRIFT_PRECLEAR_ROTATION_DEGREES,
  18,
  'The preclear squeeze should hit harder than the false-clear bait so the late 40s pressure cashes in as a real lane close instead of another soft reopen.',
);
assert.equal(
  DRIFT_CLEAR_CLIMB_ASCENT_ROTATION_DEGREES,
  16,
  'Clear-climb ascent should stay firmer than preclear so the 45.6s+ lane keeps climbing under visible pressure.',
);
assert.equal(
  DRIFT_CLEAR_CLIMB_SUMMIT_ROTATION_DEGREES,
  26,
  'The summit snap should hit harder than clear-climb ascent so the final seconds before 60s gain a distinct snapback character.',
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
    currentSurvivalTime: 50,
  }),
  'CLEAR CLIMB | 10.0s to 60s',
  'The late-run goal badge should switch from a generic clear countdown to a named clear climb once preclear hands the run into the final stretch.',
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
assert.equal(spawnsBy(30), 35, '30s spawn pacing regressed.');
assert.equal(spawnsBy(60), 89, '60s spawn pacing regressed.');
assert.equal(speedAt(0), 145, '0s obstacle speed changed unexpectedly.');
assert.equal(speedAt(10), 187, '10s obstacle speed changed unexpectedly.');
assert.equal(speedAt(15), 204, '15s obstacle speed changed unexpectedly.');
assert.equal(speedAt(20), 232, '20s obstacle speed changed unexpectedly.');
assert.equal(speedAt(30), 271, '30s obstacle speed changed unexpectedly.');
assert.equal(speedAt(45), 320, '45s obstacle speed changed unexpectedly.');
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
  getNearMissChaseHudText(2, 2300),
  '2x NEAR MISS\nCHASE LIVE 2.3s',
  'Near-miss chase HUD should turn a close shave into a short live countdown instead of dropping back to a one-frame pulse.',
);
assert.equal(
  getNearMissChaseHudText(2, 2300, 'reopen'),
  '2x NEAR MISS\nLANE REOPEN 2.3s',
  'The first live near-miss chase beat should switch the HUD into a lane-reopen label so the runtime slice reads as more than a generic timer.',
);
assert.equal(
  getNearMissChaseHudText(2, 1700, 'cut'),
  '2x NEAR MISS\nLANE CUT 1.7s',
  'The follow-up near-miss chase beat should read as a lane cut on the HUD so the snapback stays distinguishable while the chase is live.',
);
assert.equal(
  getNearMissChaseSupportText(1, 1800),
  'Near-miss chase live. Thread another close shave within 1.8s to keep the lane hot.',
  'Near-miss chase support copy should sell the short replay-worthy follow-up without opening a new progression system.',
);
assert.equal(
  getNearMissChaseSupportText(2, 2300, 'reopen'),
  '2x near-miss chase live. The next threat reopens the snapped lane for 2.3s; hold the air before the cut snaps back.',
  'The reopen beat should use support text to tell the player that the hot lane is briefly breathing open before the snapback.',
);
assert.equal(
  getNearMissChaseSupportText(2, 1700, 'cut'),
  '2x near-miss chase live. The cut is snapping back into the hot lane with 1.7s left; break across it before the space closes.',
  'The cut beat should turn support text into a direct snapback warning instead of leaving the runtime slice implicit.',
);
assert.deepEqual(
  getNearMissChaseStepAnnouncement('reopen'),
  {
    title: 'LANE REOPEN LIVE',
    body: 'The next threat peels off the snapped lane for one beat. Hold the breathing room before the cut swings back.',
  },
  'The reopen beat should have a dedicated bounded callout so the player sees the lane open in live feedback, not just in obstacle motion.',
);
assert.deepEqual(
  getNearMissChaseStepAnnouncement('cut'),
  {
    title: 'LANE CUT LIVE',
    body: 'The lane snaps shut again. Read the snapback and break across the closing line before the chase cools.',
  },
  'The cut beat should have its own bounded callout so the player can read the snapback as a separate live event.',
);
assert.equal(
  getNearMissChaseStepTint('reopen'),
  0xa8fff0,
  'Reopen-step threats should carry a cooler mint tint so the briefly opened lane reads differently from the snapback.',
);
assert.equal(
  getNearMissChaseStepTint('cut'),
  0xffd4de,
  'Cut-step threats should carry a warmer tint so the follow-up snapback reads differently from the reopen beat.',
);
assert.equal(
  getNearMissChaseRetryText(3),
  '3x near-miss chase snapped. Reopen that lane.',
  'A death during the chase window should turn the earned close-shave chain into a direct retry hook.',
);
assert.equal(
  Number(getNearMissChaseVisualIntensity(NEAR_MISS_CHASE_DURATION_MS).toFixed(2)),
  1,
  'A fresh near-miss chase should drive the full heat accent so the arena visibly owns the earned state.',
);
assert.equal(
  Number(getNearMissChaseVisualIntensity(0).toFixed(2)),
  0,
  'Expired near-miss chase state should fully drop its heat accent instead of reviving stale spectacle.',
);
assert.equal(
  isNearMissChaseActive(6400, 6400 + NEAR_MISS_CHASE_DURATION_MS),
  true,
  'Near-miss chase should stay active through its short earned follow-up window.',
);
assert.equal(
  isNearMissChaseActive(6400 + NEAR_MISS_CHASE_DURATION_MS, 6400 + NEAR_MISS_CHASE_DURATION_MS),
  false,
  'Near-miss chase should expire exactly at the configured deadline instead of reviving stale tension.',
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
assert.equal(survivalReport.averageSurvivalTimeSeconds, 30.2, 'Average survival snapshot regressed.');
assert.equal(survivalReport.firstDeathTimeSeconds, 10, 'First death snapshot regressed.');
assert.equal(survivalReport.bestSurvivalTimeSeconds, 40, 'Best survival cap changed unexpectedly.');
assert.equal(survivalReport.earlyDeathRatePercent, 0, 'Early death rate snapshot regressed.');
assert.match(
  survivalReport.controller,
  /projected-path forward-alignment rerolls above 0\.5 dot through 6s \(80px-equivalent penalty\), projected-path lane-stack rerolls within 160px above 0\.55 dot through 6s \(120px-equivalent penalty\), .*near-player same-edge rerolls within 96px and 180px lateral below score 190 through 6s, deep same-side follow-up sweeps stay reroll-eligible out to 340px, retreat-pinch rerolls within 60px above 0\.35 forward alignment when the new spawn seals the rear lane within 200px through 10s, mid-run projected-stack rerolls within 75px above 0\.92 alignment from 10s to 13s, breakthrough forces a 1\.4s strafe fork from 12s at 20deg cross-lane travel, then a 1\.6s surge snap from 15s at 16deg with 0\.08s forward lead before cadence resumes, strafe obstacles every 8th spawn from 12s with 14deg cross-lane travel, surge obstacles every 5th spawn from 15s with 1\.14x speed, killbox onset forces a 1\.4s lead cut with 0\.22s forward target lead, then a 1\.2s echo follow-through with 12deg scissor travel, a 1\.0s pinch lock from 20\.6s at 26deg with 0\.18s forward target lead, a 1\.2s bridge echo at 21\.2s with 10deg travel, a 1\.2s seal snap from 22\.4s at 18deg with 0\.10s lag, a 1\.4s echo lock-in from 24s with 6deg travel, then a 1\.2s fold snap from 27\.2s at 14deg with 0\.14s lag before killbox cadence echoes keep 6deg lane-fold travel through 32s, lead obstacles every 9th spawn from 18s with 0\.14s forward target lead, echo obstacles every 6th spawn from 24s with 0\.22s target lag, drift obstacles every 7th spawn from 32s with a 0\.8s fold-carry cut at 18deg and 0\.14s lag, then a 0\.8s release stretch at 14deg with 0\.18s lag, a 0\.7s rebound hold at 28deg with 0\.16s lag, then a 0\.7s rebound punish at 22deg with 0\.10s lag, a 0\.8s late sweep from 36\.2s at 18deg with 0\.08s lag, then a 0\.6s sweep lock at 37\.0s with 24deg travel and 0\.05s lag before a 1\.4s aftershock clamp at 30deg with 0\.04s lag, followed by a 2\.2s recenter handoff at 20deg with 0\.06s lag, a 1\.6s false-clear bait at 41\.2s with 10deg travel and 0\.12s lag, then a 2\.8s preclear squeeze at 42\.8s with 18deg travel and 0\.06s lag, then forced clear-climb drift from 45\.6s with a 6\.4s ascent stair at 16deg and 0\.12s lag before a summit snap at 26deg with 0\.03s lag, .*11px visible-arena hit margin, and 96px offscreen cull margin/,
  'Deterministic survival proxy no longer matches runtime spawn-selection, killbox-to-drift handoff, collision, and cull guards.',
);
assert.deepEqual(
  survivalReport.survivalBuckets,
  {
    under10Seconds: 0,
    between10And20Seconds: 6,
    between20And30Seconds: 10,
    reachedSimulationCap: 8,
  },
  'Survival bucket distribution regressed.',
);
assert.ok(
  survivalReport.sampleRuns.some(
    (run) => run.survivalTimeSeconds >= DRIFT_OBSTACLE_UNLOCK_SECONDS,
  ),
  'Deterministic survival sample should include at least one post-32s run so the drift mutation is actually exercised.',
);
assert.equal(survivalReport.averageSpawnCount, 36.1, 'Average spawn count snapshot changed unexpectedly.');
assert.equal(survivalReport.averageSpawnRerolls, 0.6, 'Spawn reroll snapshot changed unexpectedly.');
assert.equal(seed3TrajectoryReport.deathTimeSeconds, 29.2, 'Seed #3 trajectory baseline drifted.');
assert.equal(seed3TrajectoryReport.spawnsBeforeDeath, 34, 'Seed #3 spawn count changed unexpectedly.');
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
  '5 runs | first death 19.6s | early 0% | 5/5 runs, target met',
  'Validation export summary regressed.',
);
assert.equal(
  validationReport.validationReport,
  'validation_sample | runs=5 | deaths=5 | avg_survival=30.2s | first_death=19.6s | early_death_rate=0% | avg_retry=n/a | spawn_saves=4 | last_run=19.6s | validation=5/5 runs, target met | baseline=pacing 10/35/89 | deterministic survival 30.2s avg / 10.0s first death / 0% early',
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
  'validation_sample | runs=5 | deaths=5 | avg_survival=24.1s | first_death=6.3s | early_death_rate=20% | avg_retry=n/a | spawn_saves=3 | last_run=30.0s | validation=5/5 runs, review early deaths | baseline=pacing 10/35/89 | deterministic survival 30.2s avg / 10.0s first death / 0% early',
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
  'validation_sample | runs=1 | deaths=1 | avg_survival=10.0s | first_death=10.0s | early_death_rate=100% | avg_retry=n/a | spawn_saves=0 | last_run=10.0s | validation=1/5 runs | baseline=pacing 10/35/89 | deterministic survival 30.2s avg / 10.0s first death / 0% early',
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
