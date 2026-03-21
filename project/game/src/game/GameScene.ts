import Phaser from 'phaser';
import {
  EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS,
  EARLY_SPAWN_TARGET_LAG_SECONDS,
  FIRST_SPAWN_DELAY_MS,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  SURVIVAL_GOAL_SECONDS,
  TARGET_FIRST_DEATH_SECONDS,
  getObstacleTint,
  getObstacleTargetLagSeconds,
  getObstacleSpeed,
  getObstacleSpeedMultiplier,
  getObstacleVariant,
  getObstacleTravelDirection,
  hasReachedFirstDeathTarget,
  hasReachedSurvivalGoal,
  getSpawnDelayMs,
  getSpawnCollisionGraceMs,
  getSpawnTargetLagSeconds,
} from './balance';
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  OBSTACLE_COLLISION_RADIUS,
  clampPointToArena,
  getSpawnEdge,
  getSpawnTargetPoint,
  isPointInsideArena,
  isPointOutsideCullBounds,
  selectSpawnPoint,
} from './spawn';
import { selectFatalThreatIndex, type FatalThreatCandidate } from './deathAttribution';
import {
  getHorizontalCalloutCenterX,
  getVerticalCalloutPlacement,
} from './deathOverlayLayout';
import { getDeathPresentation } from './deathPresentation.ts';
import { getImpactDirection, type ImpactDirection } from './impactDirection';
import {
  TELEMETRY_RECENT_RUN_LIMIT,
  VALIDATION_SAMPLE_RUN_TARGET,
  buildTelemetrySummary,
  buildValidationReport,
  createEmptyTelemetry,
  getCompletedRunCount,
  hasCompletedRunSample,
  getBestSurvivalTime,
  getBestSurvivalTimeText,
  getLiveBestSurvivalTimeText,
  getPersonalBestChaseText,
  getWaitingIntroTitleText,
  formatValidationReportSummaryText,
  getAverageRetryDelaySeconds,
  getAverageRetryDelayText,
  getAverageSurvivalTime,
  canResetTelemetrySample,
  getEarlyDeathRate,
  getFirstDeathTimeText,
  getLowestDeathTime,
  getRecentDeathTimesText,
  getRetryDelayMs,
  getSurvivalGoalChaseText,
  getValidationProgressText,
  isValidationReportCurrent,
  type GameplayTelemetry,
  type TelemetrySummary,
} from './telemetry.ts';
import { getPointerSteeringVelocity } from './pointerSteering.ts';
import {
  NEAR_MISS_CHASE_DURATION_MS,
  NEAR_MISS_CHASE_ACCENT_COLOR,
  NEAR_MISS_CHASE_FATAL_LABEL_BACKGROUND,
  NEAR_MISS_CHASE_IMPACT_COLOR,
  NEAR_MISS_CHASE_IMPACT_TEXT,
  createNearMissState,
  evaluateNearMiss,
  getNearMissChaseFatalLabelText,
  getNearMissChaseHudText,
  getNearMissChaseImpactLabelText,
  getNearMissChaseRetryText,
  getNearMissChaseStepAnnouncement,
  getNearMissChaseStepTint,
  getNearMissChaseSupportText,
  getNearMissChaseTargetOffset,
  getNearMissChaseVisualIntensity,
  getNearMissLaneDirection,
  getNearMissLabel,
  isNearMissChaseActive,
  isNearMissHintActive,
  type NearMissChaseSpawnStep,
} from './nearMiss.ts';
import { getArenaBeatSpectacle } from './arenaBeatSpectacle.ts';
import { getRunBeatAnnouncement, getRunHorizonText } from './runHorizon.ts';
import {
  ENDGAME_CLEAR_CLIMB_START_SECONDS,
  getEndgameClearClimbState,
  getEndgameDriftCue,
  getRunPhaseDetailText,
  getRunPhaseOnsetIntensity,
  getRunPhaseState,
  getRunPhaseStatusText,
  getRunPhaseShiftAnnouncement,
  getRunPhaseSupportText,
  getRunPhaseTimelineText,
  type EndgameDriftCue,
  type RunPhaseId,
} from './runPhase.ts';
import {
  getLaunchActionPromptText as getPrimaryLaunchActionPromptText,
  getResumeActionPromptText as getPrimaryResumeActionPromptText,
  getRetryActionPromptText as getPrimaryRetryActionPromptText,
  hasFreshMovementInput,
  hasPrimaryActionReleaseRequirement,
  isPrimaryPointerDown,
  shouldAllowPrimaryActionKeyPress,
  shouldAllowFreshMovementPrimaryAction,
  shouldAllowHeldPrimaryAction,
  shouldDelayPointerSteeringAfterPrimaryAction,
  shouldAllowPointerPrimaryActionPress,
  shouldClearPrimaryActionKeyReleaseRequirement,
  shouldObserveMovementReleaseAfterReset,
  shouldObservePointerReleaseAfterFocusLoss,
  shouldObservePrimaryActionKeyReleaseAfterReset,
  shouldClearMovementReleaseRequirement,
  shouldClearPointerReleaseRequirement,
  shouldRequirePointerReleaseAfterPause,
  shouldRequirePointerReleaseObservationAfterFocusLoss,
} from './primaryAction.ts';
import {
  COLLISION_READY_OBSTACLE_DEPTH,
  getSpawnGraceVisualState,
  getObstacleDepth,
  SPAWN_GRACE_INITIAL_ALPHA,
  SPAWN_GRACE_INITIAL_SCALE,
} from './spawnGrace.ts';
import { getFeedbackAudioContextCtor } from './feedbackAudio.ts';

type GamePhase = 'waiting' | 'playing' | 'paused' | 'gameOver';

const PLAYER_SPEED = 260;
const PLAYER_COLLISION_RADIUS = 16;
const POINTER_DEAD_ZONE_PX = 10;
const POINTER_FULL_SPEED_DISTANCE_PX = 120;
const RETRY_GAP_TRACK_WINDOW_MS = 15000;
const IN_RUN_HINT_DURATION_MS = 1400;
const FIRST_TARGET_HINT_DURATION_MS = 1800;
const SURVIVAL_GOAL_HINT_DURATION_MS = 2200;
const NEAR_MISS_EXTRA_DISTANCE_PX = 22;
const NEAR_MISS_CHAIN_WINDOW_MS = 1800;
const NEAR_MISS_HINT_DURATION_MS = 900;
const NEAR_MISS_STEP_CALLOUT_DURATION_MS = 1100;
const RUN_BEAT_CALLOUT_DURATION_MS = 1700;
const RUN_PHASE_SHIFT_CALLOUT_DURATION_MS = 1900;
const ENDGAME_DRIFT_CUE_CALLOUT_DURATION_MS = 1500;
const CLEAR_CLIMB_BACKDROP_ASCENT_OFFSET_X = 22;
const CLEAR_CLIMB_BACKDROP_ASCENT_OFFSET_Y = -18;
const CLEAR_CLIMB_BACKDROP_SUMMIT_OFFSET_X = -34;
const CLEAR_CLIMB_BACKDROP_SUMMIT_OFFSET_Y = -10;
const NEAR_MISS_BACKDROP_PULSE_MS = 150;
const HELD_MOVEMENT_ACTION_DELAY_MS = 180;
const OBSTACLE_DEPTH = COLLISION_READY_OBSTACLE_DEPTH;
const FATAL_OBSTACLE_DEPTH = 3;
const SUPPORT_TEXT_DEPTH = 3;
const OVERLAY_SUPPORT_TEXT_DEPTH = 12;
const IMPACT_LABEL_HALF_HEIGHT_PX = 12;
const IMPACT_LABEL_GAP_PX = 22;
const IMPACT_LABEL_MIN_Y_PX = 28;
const IMPACT_LABEL_MAX_Y_PX = ARENA_HEIGHT - 28;
const IMPACT_LABEL_MIN_X_PX = 20;
const IMPACT_LABEL_MAX_X_PX = ARENA_WIDTH - 20;
const FATAL_LABEL_HALF_HEIGHT_PX = 20;
const FATAL_LABEL_GAP_PX = 18;
const FATAL_LABEL_MIN_Y_PX = 40;
const FATAL_LABEL_MAX_Y_PX = ARENA_HEIGHT - 40;
const FATAL_LABEL_MIN_X_PX = 20;
const FATAL_LABEL_MAX_X_PX = ARENA_WIDTH - 20;
const TELEMETRY_STORAGE_KEY = 'survive-60-seconds-telemetry-v1';
const SESSION_TELEMETRY_STORAGE_KEY = 'survive-60-seconds-session-telemetry-v1';
const VALIDATION_REPORT_STORAGE_KEY = 'survive-60-seconds-last-validation-report-v1';
const CAPTURED_GAMEPLAY_KEYS = [
  Phaser.Input.Keyboard.KeyCodes.SPACE,
  Phaser.Input.Keyboard.KeyCodes.ENTER,
  Phaser.Input.Keyboard.KeyCodes.UP,
  Phaser.Input.Keyboard.KeyCodes.DOWN,
  Phaser.Input.Keyboard.KeyCodes.LEFT,
  Phaser.Input.Keyboard.KeyCodes.RIGHT,
  Phaser.Input.Keyboard.KeyCodes.W,
  Phaser.Input.Keyboard.KeyCodes.A,
  Phaser.Input.Keyboard.KeyCodes.S,
  Phaser.Input.Keyboard.KeyCodes.D,
];
const MOVEMENT_KEY_UP_EVENTS = [
  'keyup-UP',
  'keyup-DOWN',
  'keyup-LEFT',
  'keyup-RIGHT',
  'keyup-W',
  'keyup-A',
  'keyup-S',
  'keyup-D',
] as const;
const PRIMARY_ACTION_KEY_UP_EVENTS = ['keyup-SPACE', 'keyup-ENTER'] as const;

const colorToCssHex = (value: number): string => `#${value.toString(16).padStart(6, '0')}`;

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

type PrimaryActionKeys = {
  space: Phaser.Input.Keyboard.Key;
  enter: Phaser.Input.Keyboard.Key;
};

type FeedbackAudioContext = AudioContext | null;
type EscapePrompt = {
  title: string;
};

type PrimaryActionSource =
  | 'primary-key'
  | 'movement-fresh'
  | 'movement-held'
  | 'pointer-press'
  | 'pointer-held';

export class GameScene extends Phaser.Scene {
  private phase: GamePhase = 'waiting';
  private previousMovementInputState = 0;
  private movementHoldActionStartedAt: number | null = null;
  private pointerHoldActionStartedAt: number | null = null;
  private pointerCancellationActive = false;
  private pointerSteeringNeedsRelease = false;
  private pauseResumeNeedsMovementRelease = false;
  private pauseResumeNeedsPointerRelease = false;
  private pauseResumeNeedsPrimaryActionKeyRelease = false;
  private gameOverRetryNeedsMovementRelease = false;
  private gameOverRetryNeedsPointerRelease = false;
  private gameOverRetryNeedsPrimaryActionKeyRelease = false;
  private movementReleaseObservationPendingAfterReset = false;
  private primaryActionKeyReleaseObservationPendingAfterReset = false;
  private pointerReleaseObservationPendingAfterFocusLoss = false;
  private playingHintHideAtElapsedMs: number | null = null;
  private firstDeathTargetReachedThisRun = false;
  private runPersonalBestTargetTime: number | null = null;
  private personalBestCelebratedThisRun = false;
  private pausedRunElapsedMs = 0;
  private pauseStartedAt: number | null = null;
  private readonly handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.pauseRunForFocusLoss();
    }
  };
  private readonly handleWindowBlur = (): void => {
    this.pauseRunForFocusLoss();
  };
  private readonly handleNativePointerCancel = (): void => {
    this.pointerCancellationActive = true;
    this.pointerHoldActionStartedAt = null;
    this.pointerSteeringNeedsRelease = false;
    this.pointerReleaseObservationPendingAfterFocusLoss = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.gameOverRetryNeedsPointerRelease = false;

    if (this.phase === 'playing' && !this.hasMovementInput()) {
      this.player.setVelocity(0, 0);
    }
  };
  private readonly handlePointerRelease = (_pointer: Phaser.Input.Pointer): void => {
    this.pointerCancellationActive = false;

    if (
      !shouldClearPointerReleaseRequirement(
        this.input.activePointer,
        false,
        this.pointerReleaseObservationPendingAfterFocusLoss,
      )
    ) {
      return;
    }

    this.pointerHoldActionStartedAt = null;
    this.pointerSteeringNeedsRelease = false;
    this.pointerReleaseObservationPendingAfterFocusLoss = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.gameOverRetryNeedsPointerRelease = false;
  };
  private readonly handleMovementRelease = (): void => {
    const movementInputState = this.getMovementInputState();
    const movementInputActive = movementInputState !== 0;

    if (
      shouldObserveMovementReleaseAfterReset({
        movementInputActive,
        postResetReleaseObservationPending: this.movementReleaseObservationPendingAfterReset,
      })
    ) {
      this.movementReleaseObservationPendingAfterReset = false;
      return;
    }

    if (
      !shouldClearMovementReleaseRequirement({
        movementInputActive,
        postResetReleaseObservationPending: this.movementReleaseObservationPendingAfterReset,
      })
    ) {
      return;
    }

    this.movementHoldActionStartedAt = null;
    this.previousMovementInputState = 0;
    this.pauseResumeNeedsMovementRelease = false;
    this.gameOverRetryNeedsMovementRelease = false;
    this.movementReleaseObservationPendingAfterReset = false;
  };
  private readonly handlePrimaryActionKeyRelease = (): void => {
    const primaryActionKeyActive = this.hasPrimaryActionKeyInput();

    if (
      shouldObservePrimaryActionKeyReleaseAfterReset({
        primaryActionKeyActive,
        postResetReleaseObservationPending:
          this.primaryActionKeyReleaseObservationPendingAfterReset,
      })
    ) {
      this.primaryActionKeyReleaseObservationPendingAfterReset = false;
      return;
    }

    if (
      !shouldClearPrimaryActionKeyReleaseRequirement({
        primaryActionKeyActive,
        postResetReleaseObservationPending:
          this.primaryActionKeyReleaseObservationPendingAfterReset,
      })
    ) {
      return;
    }

    this.pauseResumeNeedsPrimaryActionKeyRelease = false;
    this.gameOverRetryNeedsPrimaryActionKeyRelease = false;
    this.primaryActionKeyReleaseObservationPendingAfterReset = false;
  };
  private resetKeyboardState(): void {
    this.input.keyboard?.resetKeys();
  }
  private player!: Phaser.Physics.Arcade.Image;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private movementKeys!: MovementKeys;
  private primaryActionKeys!: PrimaryActionKeys;
  private scoreText!: Phaser.GameObjects.Text;
  private bestText!: Phaser.GameObjects.Text;
  private goalStatusText!: Phaser.GameObjects.Text;
  private phaseStatusText!: Phaser.GameObjects.Text;
  private phaseDetailText!: Phaser.GameObjects.Text;
  private waitingIntroPanel!: Phaser.GameObjects.Rectangle;
  private waitingIntroAccent!: Phaser.GameObjects.Rectangle;
  private waitingIntroEyebrow!: Phaser.GameObjects.Text;
  private waitingIntroTitle!: Phaser.GameObjects.Text;
  private waitingHorizonLabel!: Phaser.GameObjects.Text;
  private waitingHorizonText!: Phaser.GameObjects.Text;
  private waitingPhaseLabel!: Phaser.GameObjects.Text;
  private waitingPhaseText!: Phaser.GameObjects.Text;
  private waitingPulseCore!: Phaser.GameObjects.Arc;
  private waitingPulseRing!: Phaser.GameObjects.Arc;
  private waitingPulseLabel!: Phaser.GameObjects.Text;
  private beatCalloutText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
  private nearMissText!: Phaser.GameObjects.Text;
  private supportText!: Phaser.GameObjects.Text;
  private telemetryText!: Phaser.GameObjects.Text;
  private hitFlash!: Phaser.GameObjects.Rectangle;
  private impactRay!: Phaser.GameObjects.Line;
  private impactArrowHead!: Phaser.GameObjects.Triangle;
  private impactMarker!: Phaser.GameObjects.Arc;
  private impactMarkerLabel!: Phaser.GameObjects.Text;
  private fatalSpotlight!: Phaser.GameObjects.Arc;
  private fatalSpotlightConnector!: Phaser.GameObjects.Line;
  private fatalSpotlightLabel!: Phaser.GameObjects.Text;
  private overlay!: Phaser.GameObjects.Rectangle;
  private fatalCallout!: Phaser.GameObjects.Text;
  private overlayBadge!: Phaser.GameObjects.Text;
  private overlayTitle!: Phaser.GameObjects.Text;
  private overlayBody!: Phaser.GameObjects.Text;
  private overlayPrompt!: Phaser.GameObjects.Text;
  private overlayStats!: Phaser.GameObjects.Text;
  private runStartedAt = 0;
  private survivalTime = 0;
  private survivalGoalReachedThisRun = false;
  private nearMissChainCount = 0;
  private nearMissChainExpiresAtElapsedMs = 0;
  private nearMissChaseExpiresAtElapsedMs: number | null = null;
  private nearMissHintHideAtElapsedMs: number | null = null;
  private lastNearMissChainCount = 0;
  private nearMissChaseLaneDirection: { x: number; y: number } | null = null;
  private nearMissChasePendingSpawnSteps: NearMissChaseSpawnStep[] = [];
  private nearMissLiveSpawnStep: NearMissChaseSpawnStep | null = null;
  private nearMissLiveSpawnStepHideAtElapsedMs: number | null = null;
  private beatCalloutHideAtElapsedMs: number | null = null;
  private lastAnnouncedRunBeatLabel: string | null = null;
  private lastShownRunPhaseId: RunPhaseId | null = null;
  private lastShownEndgameDriftCueId: EndgameDriftCue['id'] | 'clear-climb' | null = null;
  private runSpawnRerolls = 0;
  private runSpawnCount = 0;
  private telemetry = createEmptyTelemetry();
  private sessionTelemetry = createEmptyTelemetry();
  private lastValidationReport: string | null = null;
  private nextSpawnTimer?: Phaser.Time.TimerEvent;
  private feedbackAudioContext: FeedbackAudioContext = null;
  private waitingPulseCoreTween?: Phaser.Tweens.Tween;
  private waitingPulseRingTween?: Phaser.Tweens.Tween;
  private inputCanvasElement: HTMLCanvasElement | null = null;
  private backdropBase!: Phaser.GameObjects.Rectangle;
  private backdropGlow!: Phaser.GameObjects.Arc;
  private backdropAura!: Phaser.GameObjects.Arc;
  private backdropTopBand!: Phaser.GameObjects.Rectangle;
  private backdropBottomBand!: Phaser.GameObjects.Rectangle;
  private backdropGrid!: Phaser.GameObjects.Graphics;
  private backdropFrame!: Phaser.GameObjects.Rectangle;

  constructor() {
    super('GameScene');
  }

  private setPhase(phase: GamePhase): void {
    this.phase = phase;
    window.dispatchEvent(
      new CustomEvent('survive60:phasechange', {
        detail: { phase },
      }),
    );
  }

  create(): void {
    this.createTextures();
    this.createBackdrop();

    this.physics.world.setBounds(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    this.player = this.physics.add
      .image(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 'player')
      .setDepth(2)
      .setCollideWorldBounds(true)
      .setCircle(PLAYER_COLLISION_RADIUS)
      .setDrag(1400, 1400);
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setMaxVelocity(PLAYER_SPEED, PLAYER_SPEED);

    this.obstacles = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 128,
      runChildUpdate: false,
    });

    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.handlePlayerHit,
      this.canObstacleHitPlayer,
      this,
    );

    const keyboard = this.input.keyboard;

    if (!keyboard) {
      throw new Error('Keyboard input is not available.');
    }

    this.cursors = keyboard.createCursorKeys();
    this.movementKeys = keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as MovementKeys;
    this.primaryActionKeys = keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    }) as PrimaryActionKeys;
    keyboard.addCapture(CAPTURED_GAMEPLAY_KEYS);

    this.scoreText = this.add.text(24, 20, '0.0s', {
      color: '#f5f7ff',
      fontFamily: 'Trebuchet MS',
      fontSize: '28px',
      fontStyle: 'bold',
    });

    this.bestText = this.add.text(24, 56, 'Best n/a', {
      color: '#8db7cb',
      fontFamily: 'Trebuchet MS',
      fontSize: '16px',
      fontStyle: 'bold',
    });

    this.goalStatusText = this.add.text(24, 82, `${SURVIVAL_GOAL_SECONDS}s CLEAR`, {
      color: '#d8fff4',
      fontFamily: 'Trebuchet MS',
      fontSize: '15px',
      fontStyle: 'bold',
      backgroundColor: '#123f36',
      padding: {
        x: 10,
        y: 5,
      },
    })
      .setDepth(4)
      .setVisible(false);

    this.phaseStatusText = this.add.text(24, 116, '', {
      color: '#7ce8ff',
      fontFamily: 'Trebuchet MS',
      fontSize: '15px',
      fontStyle: 'bold',
    })
      .setDepth(4)
      .setVisible(false);

    this.phaseDetailText = this.add.text(24, 140, '', {
      color: '#8db7cb',
      fontFamily: 'Trebuchet MS',
      fontSize: '13px',
      lineSpacing: 4,
      wordWrap: {
        width: 320,
      },
    })
      .setDepth(4)
      .setVisible(false);

    this.waitingIntroPanel = this.add
      .rectangle(ARENA_WIDTH / 2, 174, 560, 224, 0x08131d, 0.82)
      .setDepth(2)
      .setStrokeStyle(2, 0x2e596c, 0.95);

    this.waitingIntroAccent = this.add
      .rectangle(ARENA_WIDTH / 2, 80, 560, 30, 0x123f36, 0.9)
      .setDepth(2);

    this.waitingIntroEyebrow = this.add
      .text(ARENA_WIDTH / 2, 80, 'START WINDOW', {
        align: 'center',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '14px',
        fontStyle: 'bold',
      })
      .setDepth(3)
      .setOrigin(0.5);

    this.waitingIntroTitle = this.add
      .text(ARENA_WIDTH / 2, 116, '', {
        align: 'center',
        color: '#f5f7ff',
        fontFamily: 'Trebuchet MS',
        fontSize: '28px',
        fontStyle: 'bold',
      })
      .setDepth(3)
      .setOrigin(0.5);

    this.waitingHorizonLabel = this.add
      .text(ARENA_WIDTH / 2, 154, 'THREAT HORIZON', {
        align: 'center',
        color: '#7ce8ff',
        fontFamily: 'Trebuchet MS',
        fontSize: '14px',
        fontStyle: 'bold',
      })
      .setDepth(3)
      .setOrigin(0.5);

    this.waitingHorizonText = this.add
      .text(ARENA_WIDTH / 2, 186, '', {
        align: 'center',
        color: '#b8cde0',
        fontFamily: 'Trebuchet MS',
        fontSize: '16px',
        lineSpacing: 6,
      })
      .setDepth(3)
      .setOrigin(0.5);

    this.waitingPhaseLabel = this.add
      .text(ARENA_WIDTH / 2, 232, 'RUN PHASES', {
        align: 'center',
        color: '#7ce8ff',
        fontFamily: 'Trebuchet MS',
        fontSize: '14px',
        fontStyle: 'bold',
      })
      .setDepth(3)
      .setOrigin(0.5);

    this.waitingPhaseText = this.add
      .text(ARENA_WIDTH / 2, 272, '', {
        align: 'center',
        color: '#b8cde0',
        fontFamily: 'Trebuchet MS',
        fontSize: '14px',
        lineSpacing: 5,
      })
      .setDepth(3)
      .setOrigin(0.5);

    this.waitingPulseCore = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 34, 0x123f36, 0.28)
      .setDepth(1)
      .setVisible(false);

    this.waitingPulseRing = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 54)
      .setDepth(1)
      .setStrokeStyle(3, 0x7ce8ff, 0.68)
      .setFillStyle(0x000000, 0)
      .setVisible(false);

    this.waitingPulseLabel = this.add
      .text(ARENA_WIDTH / 2, ARENA_HEIGHT / 2 + 72, getPrimaryLaunchActionPromptText(), {
        align: 'center',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '15px',
        fontStyle: 'bold',
      })
      .setDepth(3)
      .setOrigin(0.5)
      .setVisible(false);

    this.beatCalloutText = this.add
      .text(ARENA_WIDTH / 2, 120, '', {
        align: 'center',
        backgroundColor: '#123f36',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '18px',
        fontStyle: 'bold',
        lineSpacing: 4,
        padding: {
          x: 16,
          y: 8,
        },
      })
      .setDepth(4)
      .setOrigin(0.5)
      .setVisible(false);

    this.hintText = this.add
      .text(
        ARENA_WIDTH / 2,
        332,
        this.getWaitingHintText(),
        {
          align: 'center',
          color: '#b8cde0',
          fontFamily: 'Trebuchet MS',
          fontSize: '18px',
          lineSpacing: 7,
        },
      )
      .setDepth(3)
      .setOrigin(0.5, 0);

    this.nearMissText = this.add
      .text(ARENA_WIDTH / 2, 208, '', {
        align: 'center',
        backgroundColor: '#123f36',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '18px',
        fontStyle: 'bold',
        padding: {
          x: 12,
          y: 6,
        },
      })
      .setDepth(4)
      .setOrigin(0.5)
      .setVisible(false);

    this.supportText = this.add
      .text(
        ARENA_WIDTH / 2,
        ARENA_HEIGHT - 24,
        this.getBaseSupportText(),
        {
          align: 'center',
          color: '#7f9aad',
          fontFamily: 'Trebuchet MS',
          fontSize: '14px',
          lineSpacing: 4,
        },
      )
      .setDepth(SUPPORT_TEXT_DEPTH)
      .setOrigin(0.5, 1);

    this.hitFlash = this.add
      .rectangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, ARENA_WIDTH, ARENA_HEIGHT, 0xff8a73, 0)
      .setDepth(8)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setVisible(false);

    this.impactRay = this.add
      .line(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 0, 0, 0, -84, 0xffb29f, 0.95)
      .setDepth(9)
      .setLineWidth(5, 5)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setVisible(false);

    this.impactArrowHead = this.add
      .triangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 0, -15, 26, 0, 0, 15, 0xffb29f, 0.98)
      .setDepth(9)
      .setAlpha(0)
      .setVisible(false);

    this.impactMarker = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 28)
      .setDepth(9)
      .setStrokeStyle(4, 0xffd2cb, 0.95)
      .setFillStyle(0x000000, 0)
      .setVisible(false);

    this.impactMarkerLabel = this.add
      .text(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, '', {
        align: 'center',
        color: '#ffd9d2',
        fontFamily: 'Trebuchet MS',
        fontSize: '18px',
        fontStyle: 'bold',
      })
      .setDepth(9)
      .setOrigin(0.5)
      .setVisible(false);

    this.fatalSpotlight = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 26)
      .setDepth(11)
      .setStrokeStyle(5, 0xfff0c7, 0.98)
      .setFillStyle(0x000000, 0)
      .setVisible(false);

    this.fatalSpotlightConnector = this.add
      .line(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 0, 0, 0, -30, 0xfff0c7, 0.96)
      .setDepth(11)
      .setLineWidth(3, 3)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setVisible(false);

    this.fatalSpotlightLabel = this.add
      .text(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, '', {
        align: 'center',
        backgroundColor: '#4c2414',
        color: '#fff3d1',
        fontFamily: 'Trebuchet MS',
        fontSize: '16px',
        fontStyle: 'bold',
        padding: {
          x: 10,
          y: 6,
        },
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlay = this.add
      .rectangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, ARENA_WIDTH, ARENA_HEIGHT, 0x02050a, 0.84)
      .setDepth(10)
      .setVisible(false);

    this.fatalCallout = this.add
      .text(ARENA_WIDTH / 2, 156, '', {
        align: 'center',
        backgroundColor: '#2f0d12',
        color: '#ffd9d2',
        fontFamily: 'Trebuchet MS',
        fontSize: '18px',
        fontStyle: 'bold',
        padding: {
          x: 14,
          y: 8,
        },
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlayTitle = this.add
      .text(ARENA_WIDTH / 2, 220, 'Game Over', {
        color: '#f5f7ff',
        fontFamily: 'Trebuchet MS',
        fontSize: '44px',
        fontStyle: 'bold',
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlayBadge = this.add
      .text(ARENA_WIDTH / 2, 182, '', {
        align: 'center',
        backgroundColor: '#123f36',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '16px',
        fontStyle: 'bold',
        padding: {
          x: 12,
          y: 6,
        },
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlayBody = this.add
      .text(ARENA_WIDTH / 2, 300, '', {
        align: 'center',
        color: '#b8cde0',
        fontFamily: 'Trebuchet MS',
        fontSize: '22px',
        lineSpacing: 8,
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlayPrompt = this.add
      .text(ARENA_WIDTH / 2, 382, '', {
        align: 'center',
        backgroundColor: '#123f36',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '20px',
        fontStyle: 'bold',
        lineSpacing: 6,
        padding: {
          x: 16,
          y: 10,
        },
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlayStats = this.add
      .text(ARENA_WIDTH / 2, 452, '', {
        align: 'center',
        color: '#8db7cb',
        fontFamily: 'Trebuchet MS',
        fontSize: '16px',
        lineSpacing: 6,
      })
      .setDepth(11)
      .setOrigin(0.5)
      .setVisible(false);

    this.telemetry = this.loadTelemetry(TELEMETRY_STORAGE_KEY, window.localStorage);
    this.sessionTelemetry = this.loadTelemetry(SESSION_TELEMETRY_STORAGE_KEY, window.sessionStorage);
    this.lastValidationReport = this.loadValidationReport();
    this.telemetryText = this.add
      .text(ARENA_WIDTH - 24, 20, '', {
        align: 'right',
        color: '#8db7cb',
        fontFamily: 'Trebuchet MS',
        fontSize: '15px',
        lineSpacing: 6,
      })
      .setDepth(4)
      .setOrigin(1, 0);
    this.updateTelemetryText();

    keyboard.on('keydown-SPACE', this.handlePrimaryAction, this);
    keyboard.on('keydown-ENTER', this.handlePrimaryAction, this);
    keyboard.on('keydown-R', this.handleTelemetryReset, this);
    keyboard.on('keydown-C', this.handleTelemetryLog, this);
    keyboard.on('keydown-V', this.handleValidationExport, this);
    for (const eventName of MOVEMENT_KEY_UP_EVENTS) {
      keyboard.on(eventName, this.handleMovementRelease, this);
    }
    for (const eventName of PRIMARY_ACTION_KEY_UP_EVENTS) {
      keyboard.on(eventName, this.handlePrimaryActionKeyRelease, this);
    }
    this.input.on('pointerdown', this.handlePointerPrimaryAction, this);
    this.input.on('pointerup', this.handlePointerRelease, this);
    this.input.on('pointerupoutside', this.handlePointerRelease, this);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('blur', this.handleWindowBlur);
    this.inputCanvasElement = this.input.manager.canvas;
    this.inputCanvasElement?.addEventListener('pointercancel', this.handleNativePointerCancel);
    this.inputCanvasElement?.addEventListener('touchcancel', this.handleNativePointerCancel);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanupFocusListeners, this);
    this.events.once(Phaser.Scenes.Events.DESTROY, this.cleanupFocusListeners, this);
    this.waitingPulseCoreTween = this.tweens.add({
      targets: this.waitingPulseCore,
      scale: { from: 0.92, to: 1.08 },
      alpha: { from: 0.32, to: 0.14 },
      duration: 1300,
      repeat: -1,
      yoyo: true,
      ease: 'Sine.InOut',
      paused: true,
    });
    this.waitingPulseRingTween = this.tweens.add({
      targets: this.waitingPulseRing,
      scale: { from: 0.88, to: 1.16 },
      alpha: { from: 0.8, to: 0.18 },
      duration: 1450,
      repeat: -1,
      ease: 'Sine.Out',
      paused: true,
    });
    this.setPhase('waiting');
    this.updateWaitingPresentation();
  }

  update(time: number): void {
    const movementInputState = this.getMovementInputState();
    const movementInputActive = movementInputState !== 0;
    const movementJustStarted = hasFreshMovementInput(
      movementInputState,
      this.previousMovementInputState,
    );
    const primaryActionKeyActive = this.hasPrimaryActionKeyInput();
    const hasConfirmedHeldMovementInput = this.hasConfirmedHeldMovementInput(
      time,
      movementInputActive,
    );
    const hasConfirmedHeldPointerInput =
      this.phase === 'waiting' || this.phase === 'gameOver' || this.phase === 'paused'
        ? this.hasConfirmedHeldPointerInput(time)
        : false;
    const gameOverReleaseRequired = hasPrimaryActionReleaseRequirement({
      movementReleaseRequired: this.gameOverRetryNeedsMovementRelease,
      pointerReleaseRequired: this.gameOverRetryNeedsPointerRelease,
      keyReleaseRequired: this.gameOverRetryNeedsPrimaryActionKeyRelease,
    });
    const pauseReleaseRequired = hasPrimaryActionReleaseRequirement({
      movementReleaseRequired: this.pauseResumeNeedsMovementRelease,
      pointerReleaseRequired: this.pauseResumeNeedsPointerRelease,
      keyReleaseRequired: this.pauseResumeNeedsPrimaryActionKeyRelease,
    });

    if (
      this.phase === 'waiting' || this.phase === 'gameOver'
    ) {
      if (
        shouldAllowFreshMovementPrimaryAction({
          hasFreshMovementInput: movementJustStarted,
          releaseRequired: gameOverReleaseRequired,
        })
      ) {
        this.activatePrimaryAction('movement-fresh');
      } else if (
        shouldAllowHeldPrimaryAction({
          hasHeldInput: hasConfirmedHeldMovementInput,
          releaseRequired: gameOverReleaseRequired,
        })
      ) {
        this.activatePrimaryAction('movement-held');
      } else if (
        shouldAllowHeldPrimaryAction({
          hasHeldInput: hasConfirmedHeldPointerInput,
          releaseRequired: gameOverReleaseRequired,
        })
      ) {
        this.activatePrimaryAction('pointer-held');
      }
    }

    if (
      this.phase === 'paused' &&
      !document.hidden &&
      document.hasFocus()
    ) {
      if (
        shouldAllowFreshMovementPrimaryAction({
          hasFreshMovementInput: movementJustStarted,
          releaseRequired: pauseReleaseRequired,
        })
      ) {
        this.activatePrimaryAction('movement-fresh');
      } else if (
        shouldAllowHeldPrimaryAction({
          hasHeldInput: hasConfirmedHeldMovementInput,
          releaseRequired: pauseReleaseRequired,
        })
      ) {
        this.activatePrimaryAction('movement-held');
      } else if (
        shouldAllowHeldPrimaryAction({
          hasHeldInput: hasConfirmedHeldPointerInput,
          releaseRequired: pauseReleaseRequired,
        })
      ) {
        this.activatePrimaryAction('pointer-held');
      }
    }

    if (
      shouldObservePrimaryActionKeyReleaseAfterReset({
        primaryActionKeyActive,
        postResetReleaseObservationPending:
          this.primaryActionKeyReleaseObservationPendingAfterReset,
      })
    ) {
      this.primaryActionKeyReleaseObservationPendingAfterReset = false;
    }

    if (
      shouldObservePointerReleaseAfterFocusLoss({
        pointerInputActive: isPrimaryPointerDown(
          this.input.activePointer,
          this.pointerCancellationActive,
        ),
        postFocusLossReleaseObservationPending:
          this.pointerReleaseObservationPendingAfterFocusLoss,
      })
    ) {
      this.pointerReleaseObservationPendingAfterFocusLoss = false;
    }

    this.updatePlayerVelocity();
    this.previousMovementInputState = movementInputState;

    if (this.phase !== 'playing') {
      this.updateArenaBeatSpectacle(time);
      return;
    }

    this.cullObstacles();

    const activeRunElapsedMs = this.getActiveRunElapsedMs(time);
    this.survivalTime = activeRunElapsedMs / 1000;
    this.scoreText.setText(`${this.survivalTime.toFixed(1)}s`);
    this.updateBestText();
    this.updateRunPhaseHud();
    this.maybeShowRunPhaseShiftHint(activeRunElapsedMs);
    this.maybeShowEndgameDriftCue(activeRunElapsedMs);
    this.updatePersonalBestChase();
    this.updateNearMissTracking(activeRunElapsedMs);
    this.updateNearMissHud(activeRunElapsedMs);
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.updateArenaBeatSpectacle(time);
    this.updateRunBeatAnnouncement(activeRunElapsedMs);

    if (
      this.playingHintHideAtElapsedMs !== null &&
      activeRunElapsedMs >= this.playingHintHideAtElapsedMs
    ) {
      this.hintText.setVisible(false);
      this.playingHintHideAtElapsedMs = null;
    }

    if (
      this.beatCalloutHideAtElapsedMs !== null &&
      activeRunElapsedMs >= this.beatCalloutHideAtElapsedMs
    ) {
      this.beatCalloutText.setVisible(false).setText('');
      this.beatCalloutHideAtElapsedMs = null;
    }

    if (
      !this.firstDeathTargetReachedThisRun &&
      hasReachedFirstDeathTarget(this.survivalTime)
    ) {
      this.celebrateFirstDeathTarget(activeRunElapsedMs);
    }

    if (!this.survivalGoalReachedThisRun && hasReachedSurvivalGoal(this.survivalTime)) {
      this.celebrateSurvivalGoal(activeRunElapsedMs);
    }
  }

  private createTextures(): void {
    if (this.textures.exists('player')) {
      return;
    }

    const graphics = this.add.graphics();
    graphics.setVisible(false);

    graphics.fillStyle(0x5ce1e6, 1);
    graphics.lineStyle(4, 0xe8fbff, 1);
    graphics.fillCircle(20, 20, 16);
    graphics.strokeCircle(20, 20, 16);
    graphics.generateTexture('player', 40, 40);

    graphics.clear();
    graphics.fillStyle(0xff6f61, 1);
    graphics.lineStyle(4, 0xffd2cb, 1);
    graphics.fillCircle(16, 16, 12);
    graphics.strokeCircle(16, 16, 12);
    graphics.generateTexture('obstacle', 32, 32);

    graphics.destroy();
  }

  private createBackdrop(): void {
    this.backdropBase = this.add
      .rectangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, ARENA_WIDTH, ARENA_HEIGHT, 0x081018)
      .setDepth(-6);

    this.backdropGlow = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 220, 0x12304a, 0.38)
      .setDepth(-5);

    this.backdropAura = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 292)
      .setDepth(-4)
      .setStrokeStyle(4, 0x7ce8ff, 0.16)
      .setFillStyle(0x000000, 0);

    this.backdropTopBand = this.add
      .rectangle(ARENA_WIDTH / 2, 0, ARENA_WIDTH, 120, 0x7ce8ff, 0.06)
      .setDepth(-4)
      .setOrigin(0.5, 0);

    this.backdropBottomBand = this.add
      .rectangle(ARENA_WIDTH / 2, ARENA_HEIGHT, ARENA_WIDTH, 136, 0x7ce8ff, 0.04)
      .setDepth(-4)
      .setOrigin(0.5, 1);

    this.backdropGrid = this.add.graphics().setDepth(-3);
    this.backdropGrid.lineStyle(1, 0x1f3240, 0.42);

    for (let x = 40; x < ARENA_WIDTH; x += 40) {
      this.backdropGrid.lineBetween(x, 0, x, ARENA_HEIGHT);
    }

    for (let y = 40; y < ARENA_HEIGHT; y += 40) {
      this.backdropGrid.lineBetween(0, y, ARENA_WIDTH, y);
    }

    this.backdropFrame = this.add
      .rectangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, ARENA_WIDTH - 24, ARENA_HEIGHT - 24)
      .setDepth(-2)
      .setFillStyle(0x000000, 0)
      .setStrokeStyle(3, 0x7ce8ff, 0.9);
  }

  private updateArenaBeatSpectacle(time: number): void {
    const progressSeconds =
      this.phase === 'playing' || this.phase === 'paused' || this.phase === 'gameOver'
        ? this.survivalTime
        : getBestSurvivalTime(this.telemetry) ?? 0;
    const spectacle = getArenaBeatSpectacle({
      phase: this.phase,
      progressSeconds,
      pulseMs: time,
    });
    const breakthroughOnsetIntensity =
      this.phase === 'playing' ? getRunPhaseOnsetIntensity(this.survivalTime, 'breakthrough') : 0;
    const endgameCue = this.phase === 'playing' ? getEndgameDriftCue(this.survivalTime) : null;
    const clearClimbState =
      this.phase === 'playing' ? getEndgameClearClimbState(this.survivalTime) : null;
    const endgameCueIntensity = this.getEndgameDriftCueIntensity(endgameCue);
    const clearClimbIntensity = this.getEndgameClearClimbIntensity(clearClimbState);
    const nearMissChaseIntensity = this.getNearMissChaseBackdropIntensity(time);
    const breakthroughOnsetAlphaBoost = breakthroughOnsetIntensity * 0.2;
    const breakthroughOnsetScaleBoost = breakthroughOnsetIntensity * 0.2;
    const breakthroughTellColor = 0xffc18a;
    const endgameCueAlphaBoost = endgameCueIntensity * 0.18;
    const endgameCueScaleBoost = endgameCueIntensity * 0.12;
    const clearClimbAlphaBoost = clearClimbIntensity * 0.14;
    const clearClimbScaleBoost = clearClimbIntensity * 0.08;
    const nearMissChaseAlphaBoost = nearMissChaseIntensity * 0.16;
    const nearMissChaseScaleBoost = nearMissChaseIntensity * 0.1;
    const endgameCueColor =
      endgameCue?.accentColor ?? clearClimbState?.accentColor ?? spectacle.glowColor;
    const clearClimbBackdropMotion = this.getClearClimbBackdropMotion(clearClimbState, time);
    const nearMissBackdropMotion = this.getNearMissBackdropMotion(time, nearMissChaseIntensity);
    const accentColor =
      breakthroughOnsetIntensity > 0
        ? breakthroughTellColor
        : nearMissChaseIntensity > 0
          ? NEAR_MISS_CHASE_ACCENT_COLOR
          : endgameCueIntensity > 0 || clearClimbIntensity > 0
            ? endgameCueColor
            : spectacle.glowColor;

    this.backdropBase.setFillStyle(spectacle.backgroundColor, 1);
    this.backdropGlow
      .setPosition(
        ARENA_WIDTH / 2 +
          clearClimbBackdropMotion.glowOffsetX +
          nearMissBackdropMotion.glowOffsetX,
        ARENA_HEIGHT / 2 +
          clearClimbBackdropMotion.glowOffsetY +
          nearMissBackdropMotion.glowOffsetY,
      )
      .setFillStyle(
        accentColor,
        spectacle.glowAlpha +
          breakthroughOnsetAlphaBoost +
          endgameCueAlphaBoost +
          clearClimbAlphaBoost +
          nearMissChaseAlphaBoost,
      )
      .setScale(
        spectacle.glowScale +
          breakthroughOnsetScaleBoost +
          endgameCueScaleBoost +
          clearClimbScaleBoost +
          nearMissChaseScaleBoost,
      );
    this.backdropAura
      .setPosition(
        ARENA_WIDTH / 2 +
          clearClimbBackdropMotion.glowOffsetX * 0.7 +
          nearMissBackdropMotion.glowOffsetX * 0.6,
        ARENA_HEIGHT / 2 +
          clearClimbBackdropMotion.glowOffsetY * 0.6 +
          nearMissBackdropMotion.glowOffsetY * 0.6,
      )
      .setStrokeStyle(
        4 +
          breakthroughOnsetIntensity * 2 +
          endgameCueIntensity * 1.6 +
          clearClimbIntensity +
          nearMissChaseIntensity * 1.1,
        accentColor,
        spectacle.auraAlpha +
          breakthroughOnsetAlphaBoost +
          endgameCueAlphaBoost +
          clearClimbAlphaBoost +
          nearMissChaseAlphaBoost,
      )
      .setScale(
        spectacle.auraScale +
          breakthroughOnsetScaleBoost +
          endgameCueScaleBoost +
          clearClimbScaleBoost +
          nearMissChaseScaleBoost * 0.9,
      );
    this.backdropTopBand
      .setPosition(
        ARENA_WIDTH / 2 +
          clearClimbBackdropMotion.topBandOffsetX +
          nearMissBackdropMotion.topBandOffsetX,
        0,
      )
      .setAngle(clearClimbBackdropMotion.topBandAngle + nearMissBackdropMotion.topBandAngle)
      .setFillStyle(
        accentColor,
        spectacle.edgeAlpha +
          breakthroughOnsetAlphaBoost +
          endgameCueAlphaBoost * 0.92 +
          clearClimbAlphaBoost * 0.86 +
          nearMissChaseAlphaBoost * 0.7,
      );
    this.backdropBottomBand
      .setPosition(
        ARENA_WIDTH / 2 +
          clearClimbBackdropMotion.bottomBandOffsetX +
          nearMissBackdropMotion.bottomBandOffsetX,
        ARENA_HEIGHT,
      )
      .setAngle(
        clearClimbBackdropMotion.bottomBandAngle + nearMissBackdropMotion.bottomBandAngle,
      )
      .setFillStyle(
        accentColor,
        spectacle.edgeAlpha * 0.88 +
          breakthroughOnsetAlphaBoost * 0.88 +
          endgameCueAlphaBoost * 0.8 +
          clearClimbAlphaBoost * 0.76 +
          nearMissChaseAlphaBoost * 0.62,
      );
    this.backdropGrid.setAlpha(
      spectacle.gridAlpha +
        endgameCueAlphaBoost * 0.28 +
        clearClimbAlphaBoost * 0.22 +
        nearMissChaseAlphaBoost * 0.18,
    );
    this.backdropFrame
      .setStrokeStyle(
        3 +
          breakthroughOnsetIntensity +
          endgameCueIntensity * 0.8 +
          clearClimbIntensity * 0.7 +
          nearMissChaseIntensity * 0.9,
        breakthroughOnsetIntensity > 0
          ? breakthroughTellColor
          : nearMissChaseIntensity > 0
            ? NEAR_MISS_CHASE_ACCENT_COLOR
            : endgameCueIntensity > 0 || clearClimbIntensity > 0
              ? endgameCueColor
              : spectacle.frameColor,
        spectacle.frameAlpha +
          breakthroughOnsetAlphaBoost +
          endgameCueAlphaBoost +
          clearClimbAlphaBoost +
          nearMissChaseAlphaBoost,
      )
      .setPosition(
        ARENA_WIDTH / 2 +
          clearClimbBackdropMotion.frameOffsetX +
          nearMissBackdropMotion.frameOffsetX,
        ARENA_HEIGHT / 2 +
          clearClimbBackdropMotion.frameOffsetY +
          nearMissBackdropMotion.frameOffsetY,
      )
      .setScale(
        clearClimbBackdropMotion.frameScaleX + nearMissBackdropMotion.frameScaleBoostX,
        clearClimbBackdropMotion.frameScaleY + nearMissBackdropMotion.frameScaleBoostY,
      );
  }

  private handlePrimaryAction(event?: KeyboardEvent): void {
    const movementReleaseRequired =
      (this.phase === 'paused' && this.pauseResumeNeedsMovementRelease) ||
      (this.phase === 'gameOver' && this.gameOverRetryNeedsMovementRelease);
    const pointerReleaseRequired =
      (this.phase === 'paused' && this.pauseResumeNeedsPointerRelease) ||
      (this.phase === 'gameOver' && this.gameOverRetryNeedsPointerRelease);
    const keyReleaseRequired =
      (this.phase === 'paused' && this.pauseResumeNeedsPrimaryActionKeyRelease) ||
      (this.phase === 'gameOver' && this.gameOverRetryNeedsPrimaryActionKeyRelease);

    if (
      !shouldAllowPrimaryActionKeyPress({
        event,
        movementReleaseRequired,
        pointerReleaseRequired,
        keyReleaseRequired,
      })
    ) {
      return;
    }

    this.activatePrimaryAction('primary-key');
  }

  private handlePointerPrimaryAction(pointer: Phaser.Input.Pointer): void {
    const movementReleaseRequired =
      (this.phase === 'paused' && this.pauseResumeNeedsMovementRelease) ||
      (this.phase === 'gameOver' && this.gameOverRetryNeedsMovementRelease);
    const pointerReleaseRequired =
      (this.phase === 'paused' && this.pauseResumeNeedsPointerRelease) ||
      (this.phase === 'gameOver' && this.gameOverRetryNeedsPointerRelease);
    const keyReleaseRequired =
      (this.phase === 'paused' && this.pauseResumeNeedsPrimaryActionKeyRelease) ||
      (this.phase === 'gameOver' && this.gameOverRetryNeedsPrimaryActionKeyRelease);

    if (
      !shouldAllowPointerPrimaryActionPress({
        pointer,
        pointerWasCancelled: this.pointerCancellationActive,
        movementReleaseRequired,
        pointerReleaseRequired,
        keyReleaseRequired,
      })
    ) {
      return;
    }

    this.pointerCancellationActive = false;
    this.activatePrimaryAction('pointer-press');
  }

  private activatePrimaryAction(source: PrimaryActionSource): void {
    this.unlockFeedbackAudio();

    if (this.phase === 'waiting') {
      this.startRun(source, 'waiting');
      return;
    }

    if (this.phase === 'paused') {
      this.resumePausedRun(source);
      return;
    }

    if (this.phase === 'gameOver') {
      this.startRun(source, 'gameOver');
    }
  }

  private handleTelemetryReset(): void {
    if (!canResetTelemetrySample(this.phase)) {
      this.supportText.setText(
        this.phase === 'gameOver'
          ? 'Telemetry reset is waiting-only so retry intent on the game-over screen cannot wipe the current sample by accident.'
          : 'Finish the current run before resetting telemetry so first-death and retry samples stay coherent.',
      ).setVisible(true);
      return;
    }

    this.telemetry = createEmptyTelemetry();
    this.sessionTelemetry = createEmptyTelemetry();
    this.saveTelemetry(TELEMETRY_STORAGE_KEY, window.localStorage, this.telemetry);
    this.saveTelemetry(SESSION_TELEMETRY_STORAGE_KEY, window.sessionStorage, this.sessionTelemetry);
    this.clearValidationReport();
    this.updateTelemetryText();

    this.supportText.setText(
      `Telemetry sample reset. Previous validation export cleared; play ${VALIDATION_SAMPLE_RUN_TARGET}-${VALIDATION_SAMPLE_RUN_TARGET * 2} runs, then press V to copy a fresh summary.`,
    ).setVisible(true);

    console.info('[telemetry] reset', this.getTelemetryReport());
  }

  private handleTelemetryLog(): void {
    const report = this.getTelemetryReport();

    console.info('[telemetry] summary', report);
    this.supportText.setText(
      'Telemetry summary logged to console. Use session metrics for the current validation sample or press V to copy it.',
    ).setVisible(true);
  }

  private handleValidationExport(): void {
    if (this.phase === 'playing' || this.phase === 'paused') {
      this.supportText.setText(
        'Finish the current run before exporting validation so the summary reflects only completed attempts.',
      ).setVisible(true);
      return;
    }

    if (!hasCompletedRunSample(this.sessionTelemetry)) {
      this.supportText.setText(
        `Validation export unlocks after ${VALIDATION_SAMPLE_RUN_TARGET} completed runs. Finish the sample first.`,
      ).setVisible(true);
      return;
    }

    const validationReport = buildValidationReport(this.sessionTelemetry);
    this.saveValidationReport(validationReport);

    if (!navigator.clipboard?.writeText) {
      console.info('[telemetry] validation_report', validationReport);
      this.supportText.setText(
        `Clipboard unavailable here. Validation summary saved locally: ${this.getLastValidationReportSummaryText()}`,
      ).setVisible(true);
      return;
    }

    void navigator.clipboard
      .writeText(validationReport)
      .then(() => {
        console.info('[telemetry] validation_report', validationReport);
        this.supportText.setText(
          `Validation summary copied. Latest export: ${this.getLastValidationReportSummaryText()}`,
        ).setVisible(true);
      })
      .catch(() => {
        console.info('[telemetry] validation_report', validationReport);
        this.supportText.setText(
          `Clipboard copy failed. Validation summary saved locally: ${this.getLastValidationReportSummaryText()}`,
        ).setVisible(true);
      });
  }

  private startRun(source: PrimaryActionSource, phaseBeforeActivation: 'waiting' | 'gameOver'): void {
    if (this.phase === 'playing') {
      return;
    }

    this.resetArenaForRun();
    this.setPhase('playing');
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pointerCancellationActive = false;
    this.pointerSteeringNeedsRelease = false;
    this.pauseResumeNeedsMovementRelease = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.gameOverRetryNeedsMovementRelease = false;
    this.gameOverRetryNeedsPointerRelease = false;
    this.pausedRunElapsedMs = 0;
    this.pauseStartedAt = null;
    this.runStartedAt = this.time.now;
    this.survivalTime = 0;
    this.firstDeathTargetReachedThisRun = false;
    this.survivalGoalReachedThisRun = false;
    this.runPersonalBestTargetTime = getBestSurvivalTime(this.telemetry);
    this.personalBestCelebratedThisRun = false;
    this.lastShownRunPhaseId = getRunPhaseState(0).currentPhase.id;
    this.nearMissChainCount = 0;
    this.nearMissChainExpiresAtElapsedMs = 0;
    this.nearMissChaseExpiresAtElapsedMs = null;
    this.nearMissHintHideAtElapsedMs = null;
    this.lastNearMissChainCount = 0;
    this.nearMissChaseLaneDirection = null;
    this.nearMissChasePendingSpawnSteps = [];
    this.nearMissLiveSpawnStep = null;
    this.nearMissLiveSpawnStepHideAtElapsedMs = null;
    this.beatCalloutHideAtElapsedMs = null;
    this.lastAnnouncedRunBeatLabel = null;
    this.lastShownEndgameDriftCueId = null;
    this.runSpawnRerolls = 0;
    this.runSpawnCount = 0;
    this.updateHudChromeVisibility();
    this.scoreText.setText('0.0s');
    this.hintText.setText(this.getPlayingHintText()).setVisible(true);
    this.beatCalloutText.setVisible(false).setText('');
    this.nearMissText.setVisible(false).setText('');
    this.updateRunPhaseHud();
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.playingHintHideAtElapsedMs = IN_RUN_HINT_DURATION_MS;
    this.recordRunStart();
    this.armPointerSteeringGuardAfterActivation(source, phaseBeforeActivation);

    this.scheduleNextSpawn(FIRST_SPAWN_DELAY_MS);
  }

  private pauseRunForFocusLoss(): void {
    if (this.phase !== 'playing') {
      return;
    }

    const pausedAtSeconds = this.getCurrentSurvivalTimeSeconds();
    const lifetimeBestText = getLiveBestSurvivalTimeText({
      telemetry: this.telemetry,
      currentSurvivalTime: pausedAtSeconds,
    });
    const sessionBestText = getLiveBestSurvivalTimeText({
      telemetry: this.sessionTelemetry,
      currentSurvivalTime: pausedAtSeconds,
    });
    this.setPhase('paused');
    const movementInputState = this.getMovementInputState();
    const movementInputActive = movementInputState !== 0;
    const primaryActionKeyActive = this.hasPrimaryActionKeyInput();
    const pointerInputActive = shouldRequirePointerReleaseAfterPause(
      this.input.activePointer,
      this.pointerCancellationActive,
    );
    const pointerEngagedBeforePause =
      pointerInputActive ||
      this.pointerHoldActionStartedAt !== null ||
      this.pointerSteeringNeedsRelease;
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pauseResumeNeedsMovementRelease = movementInputActive;
    this.pauseResumeNeedsPointerRelease = pointerEngagedBeforePause;
    this.pauseResumeNeedsPrimaryActionKeyRelease = primaryActionKeyActive;
    this.movementReleaseObservationPendingAfterReset = movementInputActive;
    this.primaryActionKeyReleaseObservationPendingAfterReset = primaryActionKeyActive;
    this.pointerReleaseObservationPendingAfterFocusLoss =
      shouldRequirePointerReleaseObservationAfterFocusLoss({
        pointerInputActive,
        pointerEngagedBeforePause,
      });
    this.resetKeyboardState();
    this.pauseStartedAt = this.time.now;
    this.physics.world.pause();
    if (this.nextSpawnTimer) {
      this.nextSpawnTimer.paused = true;
    }
    this.pauseActiveObstacleSpawnGraceTweens();
    this.player.setVelocity(0, 0);
    this.pointerSteeringNeedsRelease = false;
    this.previousMovementInputState = movementInputState;
    this.overlay.setVisible(true);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayBadge.setVisible(false).setText('');
    this.setOverlayLayout(false);
    this.overlayTitle.setText('Run paused').setVisible(true);
    this.overlayBody
      .setText(
        [
          `Run frozen at ${pausedAtSeconds.toFixed(1)}s.`,
          'No time passes while focus is away.',
        ].join('\n'),
      )
      .setVisible(true);
    this.overlayPrompt
      .setText(
        `Refocus, then ${this.getResumeActionText()} to resume.`,
      )
      .setVisible(true);
    this.overlayStats
      .setText(
        [
          `Session best ${sessionBestText} | Avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
          `Validation ${getValidationProgressText(this.sessionTelemetry)} | First death ${getFirstDeathTimeText(this.sessionTelemetry)}`,
        ].join('\n'),
      )
      .setVisible(true);
    this.hintText.setVisible(false);
    this.beatCalloutText.setVisible(false).setText('');
    this.nearMissText.setVisible(false).setText('');
    this.supportText.setVisible(false);
    this.survivalTime = pausedAtSeconds;
    this.updateHudChromeVisibility();
    this.updateTelemetryText();
  }

  private resumePausedRun(source: PrimaryActionSource): void {
    if (this.phase !== 'paused' || document.hidden || !document.hasFocus()) {
      return;
    }

    if (this.pauseStartedAt !== null) {
      this.pausedRunElapsedMs += this.time.now - this.pauseStartedAt;
    }

    this.pauseStartedAt = null;
    this.setPhase('playing');
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pointerCancellationActive = false;
    this.pauseResumeNeedsMovementRelease = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.pauseResumeNeedsPrimaryActionKeyRelease = false;
    this.movementReleaseObservationPendingAfterReset = false;
    this.primaryActionKeyReleaseObservationPendingAfterReset = false;
    this.pointerReleaseObservationPendingAfterFocusLoss = false;
    this.physics.world.resume();
    if (this.nextSpawnTimer) {
      this.nextSpawnTimer.paused = false;
    }
    this.resumeActiveObstacleSpawnGraceTweens();
    this.overlay.setVisible(false);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayBadge.setVisible(false).setText('');
    this.setOverlayLayout(false);
    this.overlayTitle.setVisible(false);
    this.overlayBody.setVisible(false).setText('');
    this.overlayPrompt.setVisible(false).setText('');
    this.overlayStats.setVisible(false).setText('');
    this.restoreBeatCalloutAfterPause();
    this.nearMissText.setVisible(false).setText('');
    this.restorePlayingHintAfterPause();
    this.restoreNearMissHintAfterPause();
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.previousMovementInputState = this.getMovementInputState();
    this.armPointerSteeringGuardAfterActivation(source, 'paused');
    this.updateHudChromeVisibility();
    this.updateTelemetryText();
  }

  private resetArenaForRun(): void {
    this.nextSpawnTimer?.remove(false);
    this.nextSpawnTimer = undefined;
    this.physics.world.resume();
    this.playingHintHideAtElapsedMs = null;
    this.nearMissChainCount = 0;
    this.nearMissChainExpiresAtElapsedMs = 0;
    this.nearMissChaseExpiresAtElapsedMs = null;
    this.nearMissHintHideAtElapsedMs = null;
    this.lastNearMissChainCount = 0;
    this.nearMissChaseLaneDirection = null;
    this.nearMissChasePendingSpawnSteps = [];
    this.nearMissLiveSpawnStep = null;
    this.nearMissLiveSpawnStepHideAtElapsedMs = null;
    this.beatCalloutHideAtElapsedMs = null;
    this.pausedRunElapsedMs = 0;
    this.pauseStartedAt = null;
    this.pointerSteeringNeedsRelease = false;
    this.survivalGoalReachedThisRun = false;
    this.firstDeathTargetReachedThisRun = false;
    this.runPersonalBestTargetTime = null;
    this.personalBestCelebratedThisRun = false;
    this.lastAnnouncedRunBeatLabel = null;
    this.lastShownRunPhaseId = null;
    this.lastShownEndgameDriftCueId = null;
    this.runSpawnCount = 0;
    this.tweens.killTweensOf([
      this.player,
      this.scoreText,
      this.bestText,
      this.goalStatusText,
      this.beatCalloutText,
      this.nearMissText,
      this.hitFlash,
      this.impactRay,
      this.impactArrowHead,
      this.impactMarker,
      this.impactMarkerLabel,
      this.fatalSpotlight,
      this.fatalSpotlightConnector,
      this.fatalSpotlightLabel,
    ]);
    this.player
      .setPosition(ARENA_WIDTH / 2, ARENA_HEIGHT / 2)
      .setVelocity(0, 0)
      .clearTint()
      .setAlpha(1)
      .setScale(1);
    this.resetTransientHudFeedbackState();
    this.hitFlash.setAlpha(0).setVisible(false);
    this.impactRay.setAlpha(0).setVisible(false);
    this.impactArrowHead.setAlpha(0).setScale(0.72).setVisible(false);
    this.impactMarker.setAlpha(0).setScale(0.72).setVisible(false);
    this.impactMarkerLabel.setAlpha(0).setVisible(false).setText('');
    this.fatalSpotlight.setAlpha(0).setScale(0.72).setVisible(false);
    this.fatalSpotlightConnector.setAlpha(0).setVisible(false);
    this.fatalSpotlightLabel.setAlpha(0).setVisible(false).setText('');
    this.overlay.setVisible(false);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayBadge.setVisible(false).setText('');
    this.setOverlayLayout(false);
    this.overlayTitle.setVisible(false);
    this.overlayBody.setVisible(false);
    this.overlayPrompt.setVisible(false).setText('');
    this.overlayStats.setVisible(false).setText('');
    this.nearMissText.setVisible(false).setText('');
    this.previousMovementInputState = this.getMovementInputState();
    this.pointerHoldActionStartedAt = null;
    this.pauseResumeNeedsPointerRelease = false;
    this.pauseResumeNeedsPrimaryActionKeyRelease = false;
    this.gameOverRetryNeedsMovementRelease = false;
    this.gameOverRetryNeedsPointerRelease = false;
    this.gameOverRetryNeedsPrimaryActionKeyRelease = false;
    this.movementReleaseObservationPendingAfterReset = false;
    this.primaryActionKeyReleaseObservationPendingAfterReset = false;
    this.pointerReleaseObservationPendingAfterFocusLoss = false;
    this.updateHudChromeVisibility();

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      this.deactivateObstacle(obstacle);
      return true;
    });
  }

  private scheduleNextSpawn(delay: number): void {
    this.nextSpawnTimer?.remove(false);

    if (this.phase !== 'playing') {
      return;
    }

    this.nextSpawnTimer = this.time.delayedCall(delay, () => {
      if (this.phase !== 'playing') {
        return;
      }

      this.spawnObstacle();
      this.scheduleNextSpawn(this.getSpawnDelayMs());
    });
  }

  private getSpawnDelayMs(): number {
    return getSpawnDelayMs(this.getCurrentSurvivalTimeSeconds());
  }

  private getObstacleSpeed(): number {
    return getObstacleSpeed(this.getCurrentSurvivalTimeSeconds());
  }

  private applySpawnGraceVisualState(
    obstacle: Phaser.Physics.Arcade.Image,
    collisionReady: boolean,
  ): void {
    const visualState = getSpawnGraceVisualState(collisionReady);
    const nearMissChaseSpawnStep = obstacle.getData('nearMissChaseSpawnStep') as
      | NearMissChaseSpawnStep
      | null;
    const readyTint =
      nearMissChaseSpawnStep === null
        ? getObstacleTint(
            (obstacle.getData('variant') as ReturnType<typeof getObstacleVariant> | undefined) ??
              'standard',
          )
        : getNearMissChaseStepTint(nearMissChaseSpawnStep);
    obstacle
      .setAlpha(visualState.alpha)
      .setScale(visualState.scale)
      .setDepth(getObstacleDepth(collisionReady));

    const tint = collisionReady ? readyTint : visualState.tint;

    if (tint === null) {
      obstacle.clearTint();
      return;
    }

    obstacle.setTint(tint);
  }

  private finalizeObstacleCollisionReady(obstacle: Phaser.Physics.Arcade.Image): void {
    obstacle.setData('collisionReady', true);
    obstacle.setData('collisionUnlockElapsedMs', null);
    obstacle.setData('spawnGraceTween', null);
    this.applySpawnGraceVisualState(obstacle, true);
  }

  private spawnObstacle(): void {
    // Timer callbacks can fire before the next update tick; reclaim stale offscreen entries first.
    this.cullObstacles();
    const currentSurvivalTimeSeconds = this.getCurrentSurvivalTimeSeconds();
    const { point: spawnPoint, rerollsUsed } = selectSpawnPoint({
      survivalTimeSeconds: currentSurvivalTimeSeconds,
      playerPosition: { x: this.player.x, y: this.player.y },
      playerVelocity: {
        x: (this.player.body as Phaser.Physics.Arcade.Body).velocity.x,
        y: (this.player.body as Phaser.Physics.Arcade.Body).velocity.y,
      },
      playerReachabilityMargin: PLAYER_COLLISION_RADIUS,
      activeObstaclePositions: this.obstacles
        .getChildren()
        .filter(
          (entry): entry is Phaser.Physics.Arcade.Image =>
            entry instanceof Phaser.Physics.Arcade.Image && entry.active,
        )
        .map((obstacle) => ({
          x: obstacle.x,
          y: obstacle.y,
          collisionReady: this.isObstacleCollisionReady(obstacle),
          spawnEdge: obstacle.getData('spawnEdge') as ReturnType<typeof getSpawnEdge> | undefined,
        })),
      randomInt: Phaser.Math.Between,
    });
    const obstacle = this.obstacles.get(spawnPoint.x, spawnPoint.y, 'obstacle') as
      | Phaser.Physics.Arcade.Image
      | null;

    if (!obstacle) {
      return;
    }

    this.runSpawnCount += 1;
    this.runSpawnRerolls += rerollsUsed;
    const obstacleVariant = getObstacleVariant({
      survivalTimeSeconds: currentSurvivalTimeSeconds,
      runSpawnCount: this.runSpawnCount,
    });

    this.tweens.killTweensOf(obstacle);
    obstacle
      .setActive(true)
      .setVisible(true)
      .clearTint()
      .setDepth(OBSTACLE_DEPTH)
      .setPosition(spawnPoint.x, spawnPoint.y)
      .setCircle(OBSTACLE_COLLISION_RADIUS)
      .setVelocity(0, 0);

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    const nearMissChaseSpawnPlan = this.consumeNearMissChaseSpawnStep();
    const spawnTargetLagSeconds = getObstacleTargetLagSeconds({
      survivalTimeSeconds: currentSurvivalTimeSeconds,
      variant: obstacleVariant,
    });
    const baseTargetPoint = getSpawnTargetPoint({
      playerPosition: { x: this.player.x, y: this.player.y },
      playerVelocity: {
        x: playerBody.velocity.x,
        y: playerBody.velocity.y,
      },
      playerReachabilityMargin: PLAYER_COLLISION_RADIUS,
      targetLagSeconds: spawnTargetLagSeconds,
    });
    const targetPoint =
      nearMissChaseSpawnPlan === null
        ? baseTargetPoint
        : clampPointToArena(
            {
              x: baseTargetPoint.x + nearMissChaseSpawnPlan.targetOffset.x,
              y: baseTargetPoint.y + nearMissChaseSpawnPlan.targetOffset.y,
            },
            { margin: PLAYER_COLLISION_RADIUS },
          );
    const travelDirection = getObstacleTravelDirection({
      spawnPoint,
      targetPoint,
      playerVelocity: {
        x: playerBody.velocity.x,
        y: playerBody.velocity.y,
      },
      survivalTimeSeconds: currentSurvivalTimeSeconds,
      variant: obstacleVariant,
      runSpawnCount: this.runSpawnCount,
    });
    const velocity = new Phaser.Math.Vector2(travelDirection.x, travelDirection.y).scale(
      getObstacleSpeed(currentSurvivalTimeSeconds) *
        getObstacleSpeedMultiplier(obstacleVariant),
    );
    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body;
    const collisionGraceMs = getSpawnCollisionGraceMs(currentSurvivalTimeSeconds);
    const collisionUnlockElapsedMs =
      collisionGraceMs > 0 ? this.getActiveRunElapsedMs(this.time.now) + collisionGraceMs : null;

    obstacleBody.enable = true;
    obstacle.setData('variant', obstacleVariant);
    obstacle.setData('spawnEdge', getSpawnEdge(spawnPoint));
    obstacle.setData('collisionReady', collisionGraceMs === 0);
    obstacle.setData('collisionUnlockElapsedMs', collisionUnlockElapsedMs);
    obstacle.setData('nearMissConsumed', false);
    obstacle.setData('nearMissState', createNearMissState());
    obstacle.setData('nearMissChaseSpawnStep', nearMissChaseSpawnPlan?.step ?? null);
    obstacle.setData('spawnGraceTween', null);
    obstacle.setVelocity(velocity.x, velocity.y);
    this.applySpawnGraceVisualState(obstacle, collisionGraceMs === 0);
    if (nearMissChaseSpawnPlan !== null) {
      this.showNearMissChaseSpawnStep(
        this.getActiveRunElapsedMs(this.time.now),
        nearMissChaseSpawnPlan.step,
      );
    }

    if (collisionGraceMs === 0) {
      return;
    }

    const spawnGraceTween = this.tweens.add({
      targets: obstacle,
      alpha: { from: SPAWN_GRACE_INITIAL_ALPHA, to: 1 },
      scaleX: { from: SPAWN_GRACE_INITIAL_SCALE, to: 1 },
      scaleY: { from: SPAWN_GRACE_INITIAL_SCALE, to: 1 },
      duration: collisionGraceMs,
      ease: 'Quad.Out',
      onComplete: () => {
        this.finalizeObstacleCollisionReady(obstacle);
      },
    });
    obstacle.setData('spawnGraceTween', spawnGraceTween);

  }

  private getMovementInputState(): number {
    let movementInputState = 0;

    if (this.cursors.left.isDown || this.movementKeys.left.isDown) {
      movementInputState |= 1;
    }

    if (this.cursors.right.isDown || this.movementKeys.right.isDown) {
      movementInputState |= 1 << 1;
    }

    if (this.cursors.up.isDown || this.movementKeys.up.isDown) {
      movementInputState |= 1 << 2;
    }

    if (this.cursors.down.isDown || this.movementKeys.down.isDown) {
      movementInputState |= 1 << 3;
    }

    return movementInputState;
  }

  private hasMovementInput(): boolean {
    return this.getMovementInputState() !== 0;
  }

  private hasPrimaryActionKeyInput(): boolean {
    return this.primaryActionKeys.space.isDown || this.primaryActionKeys.enter.isDown;
  }

  private hasConfirmedHeldMovementInput(time: number, movementInputActive: boolean): boolean {
    if (!movementInputActive) {
      this.movementHoldActionStartedAt = null;
      if (
        shouldClearMovementReleaseRequirement({
          movementInputActive,
          postResetReleaseObservationPending: this.movementReleaseObservationPendingAfterReset,
        })
      ) {
        this.pauseResumeNeedsMovementRelease = false;
        this.gameOverRetryNeedsMovementRelease = false;
      }
      return false;
    }

    if (this.phase === 'paused' && this.pauseResumeNeedsMovementRelease) {
      this.movementHoldActionStartedAt = null;
      return false;
    }

    if (this.phase === 'gameOver' && this.gameOverRetryNeedsMovementRelease) {
      this.movementHoldActionStartedAt = null;
      return false;
    }

    if (this.movementHoldActionStartedAt === null) {
      this.movementHoldActionStartedAt = time;
      return false;
    }

    return time - this.movementHoldActionStartedAt >= HELD_MOVEMENT_ACTION_DELAY_MS;
  }

  private hasConfirmedHeldPointerInput(time: number): boolean {
    if (!isPrimaryPointerDown(this.input.activePointer, this.pointerCancellationActive)) {
      this.pointerHoldActionStartedAt = null;
      this.pointerSteeringNeedsRelease = false;
      if (!this.pointerReleaseObservationPendingAfterFocusLoss) {
        this.pauseResumeNeedsPointerRelease = false;
      }
      this.gameOverRetryNeedsPointerRelease = false;
      return false;
    }

    if (this.phase === 'paused' && this.pauseResumeNeedsPointerRelease) {
      this.pointerHoldActionStartedAt = null;
      return false;
    }

    if (this.phase === 'gameOver' && this.gameOverRetryNeedsPointerRelease) {
      this.pointerHoldActionStartedAt = null;
      return false;
    }

    if (this.pointerHoldActionStartedAt === null) {
      this.pointerHoldActionStartedAt = time;
      return false;
    }

    return time - this.pointerHoldActionStartedAt >= HELD_MOVEMENT_ACTION_DELAY_MS;
  }

  private armPointerSteeringGuardAfterActivation(
    source: PrimaryActionSource,
    phaseBeforeActivation: 'waiting' | 'paused' | 'gameOver',
  ): void {
    if (
      !shouldDelayPointerSteeringAfterPrimaryAction({
        source,
        phaseBeforeActivation,
      }) ||
      !isPrimaryPointerDown(this.input.activePointer, this.pointerCancellationActive)
    ) {
      return;
    }

    this.pointerSteeringNeedsRelease = true;
    this.pointerHoldActionStartedAt = this.time.now;
  }

  private canObstacleHitPlayer(
    _playerGameObject: unknown,
    obstacleGameObject: unknown,
  ): boolean {
    const obstacle = obstacleGameObject as Phaser.Physics.Arcade.Image;
    return (
      this.isObstacleCollisionReady(obstacle) &&
      this.isObstacleInsideVisibleArena(obstacle)
    );
  }

  private isObstacleCollisionReady(obstacle: Phaser.Physics.Arcade.Image): boolean {
    if (obstacle.getData('collisionReady') !== false) {
      return true;
    }

    const collisionUnlockElapsedMs = obstacle.getData('collisionUnlockElapsedMs');

    if (
      typeof collisionUnlockElapsedMs !== 'number' ||
      this.getActiveRunElapsedMs(this.time.now) < collisionUnlockElapsedMs
    ) {
      return false;
    }

    const spawnGraceTween = obstacle.getData('spawnGraceTween') as Phaser.Tweens.Tween | null;
    spawnGraceTween?.stop();
    this.finalizeObstacleCollisionReady(obstacle);
    return true;
  }

  private isObstacleInsideVisibleArena(obstacle: Phaser.Physics.Arcade.Image): boolean {
    return isPointInsideArena(obstacle, { margin: OBSTACLE_COLLISION_RADIUS });
  }

  private updatePlayerVelocity(): void {
    if (this.phase !== 'playing') {
      this.player.setVelocity(0, 0);
      return;
    }

    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.cursors.left.isDown || this.movementKeys.left.isDown) {
      velocity.x -= 1;
    }

    if (this.cursors.right.isDown || this.movementKeys.right.isDown) {
      velocity.x += 1;
    }

    if (this.cursors.up.isDown || this.movementKeys.up.isDown) {
      velocity.y -= 1;
    }

    if (this.cursors.down.isDown || this.movementKeys.down.isDown) {
      velocity.y += 1;
    }

    if (velocity.lengthSq() > 0) {
      velocity.normalize().scale(PLAYER_SPEED);
      this.player.setVelocity(velocity.x, velocity.y);
      return;
    }

    const pointer = this.input.activePointer;

    if (!isPrimaryPointerDown(pointer, this.pointerCancellationActive)) {
      this.pointerSteeringNeedsRelease = false;
      this.pointerHoldActionStartedAt = null;
      this.player.setVelocity(0, 0);
      return;
    }

    if (this.pointerSteeringNeedsRelease) {
      if (
        this.pointerHoldActionStartedAt !== null &&
        this.time.now - this.pointerHoldActionStartedAt >= HELD_MOVEMENT_ACTION_DELAY_MS
      ) {
        this.pointerSteeringNeedsRelease = false;
      } else {
        this.player.setVelocity(0, 0);
        return;
      }
    }

    const pointerVelocity = this.getPointerVelocity();

    if (pointerVelocity) {
      this.player.setVelocity(pointerVelocity.x, pointerVelocity.y);
      return;
    }

    this.player.setVelocity(0, 0);
  }

  private getPointerVelocity(): Phaser.Math.Vector2 | null {
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main,
    ) as Phaser.Math.Vector2 | null;

    if (!worldPoint) {
      return null;
    }

    const pointerVelocity = getPointerSteeringVelocity({
      playerPosition: { x: this.player.x, y: this.player.y },
      pointerPosition: { x: worldPoint.x, y: worldPoint.y },
      playerReachabilityMargin: PLAYER_COLLISION_RADIUS,
      playerSpeed: PLAYER_SPEED,
      deadZonePx: POINTER_DEAD_ZONE_PX,
      fullSpeedDistancePx: POINTER_FULL_SPEED_DISTANCE_PX,
    });

    if (!pointerVelocity) {
      return null;
    }

    return new Phaser.Math.Vector2(pointerVelocity.x, pointerVelocity.y);
  }

  private cullObstacles(): void {
    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;

      if (
        obstacle.active &&
        isPointOutsideCullBounds(obstacle)
      ) {
        this.deactivateObstacle(obstacle);
      }

      return true;
    });
  }

  private handlePlayerHit(
    _playerGameObject: unknown,
    obstacleGameObject: unknown,
  ): void {
    if (this.phase !== 'playing') {
      return;
    }

    this.survivalTime = this.getCurrentSurvivalTimeSeconds();
    const movementInputActive = this.hasMovementInput();
    const pointerInputActive = isPrimaryPointerDown(
      this.input.activePointer,
      this.pointerCancellationActive,
    );
    const fatalObstacle = this.resolveFatalObstacle(
      obstacleGameObject as Phaser.Physics.Arcade.Image,
    );
    const activeRunElapsedMs = this.getActiveRunElapsedMs(this.time.now);
    const hitDirection = this.getHitDirection(fatalObstacle);
    const escapePrompt = this.getEscapePrompt(hitDirection);
    const reachedSurvivalGoal = hasReachedSurvivalGoal(this.survivalTime);
    const previousBestSurvivalTime = getBestSurvivalTime(this.telemetry);
    const isNewBest =
      previousBestSurvivalTime === null || this.survivalTime > previousBestSurvivalTime;
    const nearMissDeathSnapshotChainCount =
      this.getNearMissDeathSnapshotChainCount(activeRunElapsedMs);
    const nearMissDeathPromptText = this.getNearMissDeathPromptText(activeRunElapsedMs);
    const deathPresentation = getDeathPresentation({
      hitDirection,
      survivalTimeSeconds: this.survivalTime,
      sessionTelemetry: this.sessionTelemetry,
      isNewBest,
      bestSurvivalTimeText: getBestSurvivalTimeText(this.telemetry),
      reachedSurvivalGoal,
      retryPromptText: this.getRetryActionPromptText(),
      escapePromptTitle: escapePrompt.title,
      nearMissChainCount: nearMissDeathSnapshotChainCount,
      nearMissPromptText: nearMissDeathPromptText,
    });

    this.setPhase('gameOver');
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pointerCancellationActive = false;
    this.pointerSteeringNeedsRelease = false;
    this.pauseResumeNeedsMovementRelease = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.pauseResumeNeedsPrimaryActionKeyRelease = false;
    this.pointerReleaseObservationPendingAfterFocusLoss = false;
    this.gameOverRetryNeedsMovementRelease = movementInputActive;
    this.gameOverRetryNeedsPointerRelease = pointerInputActive;
    this.gameOverRetryNeedsPrimaryActionKeyRelease = this.hasPrimaryActionKeyInput();
    this.pauseStartedAt = null;
    this.primaryActionKeyReleaseObservationPendingAfterReset = false;
    this.playingHintHideAtElapsedMs = null;
    this.nextSpawnTimer?.remove(false);
    this.nextSpawnTimer = undefined;
    this.physics.world.pause();
    this.tweens.killTweensOf([
      this.player,
      this.scoreText,
      this.bestText,
      this.goalStatusText,
      this.nearMissText,
      this.hitFlash,
      this.impactRay,
      this.impactArrowHead,
      this.impactMarker,
      this.impactMarkerLabel,
      this.fatalSpotlight,
      this.fatalSpotlightConnector,
      this.fatalSpotlightLabel,
    ]);
    this.player.setVelocity(0, 0);
    this.player.setTint(0xffd6cf);
    this.recordRunEnd();
    this.tweens.killTweensOf(fatalObstacle);
    fatalObstacle.setTint(0xfff0c7).setScale(1.12).setAlpha(1).setDepth(FATAL_OBSTACLE_DEPTH);

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      const isFatalObstacle = obstacle === fatalObstacle;

      this.tweens.killTweensOf(obstacle);
      obstacle.setVelocity(0, 0);

      if (!isFatalObstacle) {
        obstacle.clearTint().setScale(1).setAlpha(0.24).setDepth(OBSTACLE_DEPTH);
      }

      return true;
    });

    this.cameras.main.shake(90, 0.0035);
    this.playDeathFeedbackTone();
    this.resetTransientHudFeedbackState();
    this.hitFlash.setAlpha(0.55).setVisible(true);
    this.tweens.add({
      targets: this.hitFlash,
      alpha: 0,
      duration: 160,
      ease: 'Quad.Out',
      onComplete: () => {
        this.hitFlash.setVisible(false);
      },
    });
    this.tweens.add({
      targets: this.player,
      scaleX: 1.22,
      scaleY: 0.82,
      alpha: 0.88,
      duration: 85,
      yoyo: true,
      ease: 'Cubic.Out',
    });
    this.showImpactMarker(hitDirection, nearMissDeathSnapshotChainCount);
    this.showFatalSpotlight(fatalObstacle, hitDirection, nearMissDeathSnapshotChainCount);

    this.overlay.setVisible(true);
    const hasOverlayBadge = deathPresentation.badge !== null;
    this.setOverlayLayout(hasOverlayBadge);
    this.fatalCallout
      .setText(deathPresentation.callout)
      .setVisible(true);
    this.overlayBadge
      .setText(deathPresentation.badge ?? '')
      .setVisible(hasOverlayBadge);
    this.overlayTitle.setText(deathPresentation.title).setVisible(true);
    this.overlayBody
      .setText(deathPresentation.body)
      .setVisible(true);
    this.overlayPrompt
      .setText(deathPresentation.prompt)
      .setBackgroundColor(deathPresentation.promptBackgroundColor)
      .setColor(deathPresentation.promptTextColor)
      .setVisible(true);
    this.fatalCallout.setColor(
      deathPresentation.hasNearMissChaseSnapshot ? '#7ce8d7' : '#ff8a73',
    );
    this.overlayStats
      .setText(deathPresentation.stats)
      .setVisible(true);
    this.hintText.setVisible(false);
    this.nearMissText.setVisible(false).setText('');
    this.supportText.setText(this.getGameOverSupportText()).setVisible(false);
    this.updateHudChromeVisibility();
  }

  private setOverlayLayout(hasBadge: boolean): void {
    this.overlayTitle.setY(hasBadge ? 228 : 220);
    this.overlayBody.setY(hasBadge ? 314 : 300);
    this.overlayPrompt.setY(hasBadge ? 396 : 382);
    this.overlayStats.setY(hasBadge ? 466 : 452);
  }

  private deactivateObstacle(obstacle: Phaser.Physics.Arcade.Image): void {
    this.tweens.killTweensOf(obstacle);
    obstacle.setData('collisionReady', false);
    obstacle.setData('collisionUnlockElapsedMs', null);
    obstacle.setData('nearMissConsumed', false);
    obstacle.setData('nearMissState', createNearMissState());
    obstacle.setData('nearMissChaseSpawnStep', null);
    obstacle.setData('spawnGraceTween', null);
    obstacle.clearTint().setAlpha(1).setScale(1).setDepth(OBSTACLE_DEPTH).setVelocity(0, 0);
    obstacle.disableBody(true, true);
  }

  private resetTransientHudFeedbackState(): void {
    this.scoreText.clearTint().setAlpha(1).setScale(1);
    this.bestText.clearTint().setAlpha(1).setScale(1);
    this.goalStatusText.setAlpha(1).setScale(1);
    this.beatCalloutText.setAlpha(1).setScale(1).setVisible(false).setText('');
    this.nearMissText.setAlpha(1).setScale(1).setVisible(false).setText('');
  }

  private updateNearMissTracking(activeRunElapsedMs: number): void {
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body | undefined;

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;

      if (
        !obstacle.active ||
        obstacle.getData('nearMissConsumed') === true ||
        !this.isObstacleCollisionReady(obstacle)
      ) {
        return true;
      }

      const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body | undefined;
      const previousState = obstacle.getData('nearMissState') as
        | ReturnType<typeof createNearMissState>
        | undefined;
      const nextState = evaluateNearMiss(
        {
          playerPosition: { x: this.player.x, y: this.player.y },
          playerVelocity: {
            x: playerBody?.velocity.x ?? 0,
            y: playerBody?.velocity.y ?? 0,
          },
          playerCollisionRadius: PLAYER_COLLISION_RADIUS,
          obstaclePosition: { x: obstacle.x, y: obstacle.y },
          obstacleVelocity: {
            x: obstacleBody?.velocity.x ?? 0,
            y: obstacleBody?.velocity.y ?? 0,
          },
          obstacleCollisionRadius: OBSTACLE_COLLISION_RADIUS,
          obstacleInsideVisibleArena: this.isObstacleInsideVisibleArena(obstacle),
          extraNearMissDistance: NEAR_MISS_EXTRA_DISTANCE_PX,
        },
        previousState ?? createNearMissState(),
      );

      obstacle.setData('nearMissState', {
        closestDistanceSq: nextState.closestDistanceSq,
        closestDistanceWasVisible: nextState.closestDistanceWasVisible,
        hadClosingApproach: nextState.hadClosingApproach,
      });

      if (nextState.triggered) {
        obstacle.setData('nearMissConsumed', true);
        this.triggerNearMissFeedback(
          activeRunElapsedMs,
          getNearMissLaneDirection(
            { x: this.player.x, y: this.player.y },
            { x: obstacle.x, y: obstacle.y },
          ),
        );
      }

      return true;
    });
  }

  private triggerNearMissFeedback(
    activeRunElapsedMs: number,
    laneDirection: { x: number; y: number },
  ): void {
    const withinChainWindow = activeRunElapsedMs <= this.nearMissChainExpiresAtElapsedMs;
    this.nearMissChainCount = withinChainWindow ? this.nearMissChainCount + 1 : 1;
    this.nearMissChainExpiresAtElapsedMs = activeRunElapsedMs + NEAR_MISS_CHAIN_WINDOW_MS;
    this.nearMissChaseExpiresAtElapsedMs = activeRunElapsedMs + NEAR_MISS_CHASE_DURATION_MS;
    this.nearMissHintHideAtElapsedMs = activeRunElapsedMs + NEAR_MISS_HINT_DURATION_MS;
    this.lastNearMissChainCount = this.nearMissChainCount;
    this.nearMissChaseLaneDirection = laneDirection;
    this.nearMissChasePendingSpawnSteps = ['reopen', 'cut'];
    this.nearMissLiveSpawnStep = null;
    this.nearMissLiveSpawnStepHideAtElapsedMs = null;

    this.tweens.killTweensOf(this.nearMissText);
    this.tweens.killTweensOf(this.player);
    this.nearMissText
      .setText(this.getNearMissHudText(activeRunElapsedMs))
      .setAlpha(1)
      .setScale(0.92)
      .setVisible(true);
    this.playNearMissFeedbackTone(this.nearMissChainCount);
    this.player.clearTint();
    this.player.setTint(0xd8fff4);

    this.tweens.add({
      targets: this.nearMissText,
      scale: 1,
      alpha: 0.82,
      duration: 140,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.player,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 90,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.player.clearTint();
        this.player.setScale(1);
      },
    });
  }

  private updateNearMissHud(activeRunElapsedMs: number): void {
    const hintActive = isNearMissHintActive(activeRunElapsedMs, this.nearMissHintHideAtElapsedMs);
    const chaseActive = isNearMissChaseActive(
      activeRunElapsedMs,
      this.nearMissChaseExpiresAtElapsedMs,
    );
    const liveSpawnStep = this.getActiveNearMissSpawnStep(activeRunElapsedMs);

    if (this.nearMissChainCount <= 0 || (!hintActive && !chaseActive)) {
      this.nearMissText.setVisible(false).setText('');
      this.nearMissHintHideAtElapsedMs = null;
      this.nearMissChaseExpiresAtElapsedMs = chaseActive ? this.nearMissChaseExpiresAtElapsedMs : null;

      if (!chaseActive) {
        this.nearMissChainCount = 0;
        this.nearMissChaseLaneDirection = null;
        this.nearMissChasePendingSpawnSteps = [];
        this.nearMissLiveSpawnStep = null;
        this.nearMissLiveSpawnStepHideAtElapsedMs = null;
        this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
      }

      return;
    }

    this.nearMissText
      .setText(this.getNearMissHudText(activeRunElapsedMs, liveSpawnStep))
      .setAlpha(hintActive ? 0.82 : 0.7)
      .setScale(1)
      .setVisible(true);
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
  }

  private pauseActiveObstacleSpawnGraceTweens(): void {
    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      const spawnGraceTween = obstacle.getData('spawnGraceTween') as Phaser.Tweens.Tween | null;

      if (obstacle.active && spawnGraceTween?.isPlaying()) {
        spawnGraceTween.pause();
      }

      return true;
    });
  }

  private resumeActiveObstacleSpawnGraceTweens(): void {
    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      const spawnGraceTween = obstacle.getData('spawnGraceTween') as Phaser.Tweens.Tween | null;

      if (obstacle.active && spawnGraceTween?.isPaused()) {
        spawnGraceTween.resume();
      }

      return true;
    });
  }

  private showImpactMarker(
    hitDirection: ImpactDirection,
    nearMissChainCount: number | null,
  ): void {
    const hasNearMissChaseSnapshot = nearMissChainCount !== null;
    const impactStrokeColor = hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_IMPACT_COLOR : 0xffd2cb;
    const impactAccentColor = hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_IMPACT_COLOR : 0xffb29f;
    const impactLabelText = hasNearMissChaseSnapshot
      ? getNearMissChaseImpactLabelText(
          hitDirection.label,
          hitDirection.offsetX === 0 && hitDirection.offsetY === 0,
        )
      : hitDirection.offsetX === 0 && hitDirection.offsetY === 0
        ? 'CENTER'
        : hitDirection.label.toUpperCase();

    if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
      this.impactRay.setAlpha(0).setVisible(false);
      this.impactArrowHead.setAlpha(0).setVisible(false);
      this.impactMarker
        .setStrokeStyle(4, impactStrokeColor, 0.95)
        .setPosition(this.player.x, this.player.y)
        .setScale(0.72)
        .setAlpha(0.95)
        .setVisible(true);
      this.impactMarkerLabel.setColor(
        hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_IMPACT_TEXT : '#ffd9d2',
      );
      this.impactMarkerLabel.setText(impactLabelText);
      this.impactMarkerLabel
        .setPosition(
          getHorizontalCalloutCenterX({
            preferredCenterX: this.player.x,
            labelHalfWidth: this.impactMarkerLabel.displayWidth / 2,
            minX: IMPACT_LABEL_MIN_X_PX,
            maxX: IMPACT_LABEL_MAX_X_PX,
          }),
          this.player.y,
        )
        .setAlpha(1)
        .setVisible(true);

      this.tweens.add({
        targets: this.impactMarker,
        scale: 1,
        alpha: 0.7,
        duration: 150,
        ease: 'Quad.Out',
      });
      this.tweens.add({
        targets: this.impactMarkerLabel,
        alpha: 0.84,
        duration: 150,
        ease: 'Quad.Out',
      });
      return;
    }

    const rayStartOffset = 24;
    const rayLength = 94;
    const rayStartX = this.player.x + hitDirection.offsetX * rayStartOffset;
    const rayStartY = this.player.y + hitDirection.offsetY * rayStartOffset;
    const rayEndX = this.player.x + hitDirection.offsetX * rayLength;
    const rayEndY = this.player.y + hitDirection.offsetY * rayLength;
    const markerX = Phaser.Math.Clamp(this.player.x + hitDirection.offsetX * 54, 48, ARENA_WIDTH - 48);
    const markerY = Phaser.Math.Clamp(this.player.y + hitDirection.offsetY * 54, 48, ARENA_HEIGHT - 48);
    const impactLabelPlacement = getVerticalCalloutPlacement({
      anchorY: markerY,
      gap: IMPACT_LABEL_GAP_PX,
      labelHalfHeight: IMPACT_LABEL_HALF_HEIGHT_PX,
      minY: IMPACT_LABEL_MIN_Y_PX,
      maxY: IMPACT_LABEL_MAX_Y_PX,
    });

    this.impactRay
      .setStrokeStyle(5, impactAccentColor, 0.95)
      .setTo(rayStartX, rayStartY, rayEndX, rayEndY)
      .setAlpha(0.95)
      .setVisible(true);
    this.impactArrowHead
      .setFillStyle(impactAccentColor, 0.98)
      .setPosition(rayEndX, rayEndY)
      .setRotation(this.getDirectionRotation(hitDirection.offsetX, hitDirection.offsetY))
      .setScale(0.72)
      .setAlpha(0.98)
      .setVisible(true);
    this.impactMarker
      .setStrokeStyle(4, impactStrokeColor, 0.95)
      .setPosition(markerX, markerY)
      .setScale(0.72)
      .setAlpha(0.95)
      .setVisible(true);
    this.impactMarkerLabel
      .setColor(hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_IMPACT_TEXT : '#ffd9d2')
      .setText(impactLabelText);
    this.impactMarkerLabel
      .setPosition(
        getHorizontalCalloutCenterX({
          preferredCenterX: markerX,
          labelHalfWidth: this.impactMarkerLabel.displayWidth / 2,
          minX: IMPACT_LABEL_MIN_X_PX,
          maxX: IMPACT_LABEL_MAX_X_PX,
        }),
        impactLabelPlacement.labelY,
      )
      .setAlpha(1)
      .setVisible(true);

    this.tweens.add({
      targets: this.impactRay,
      alpha: 0.2,
      duration: 180,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.impactArrowHead,
      scale: 1,
      alpha: 0.32,
      duration: 180,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.impactMarker,
      scale: 1,
      alpha: 0.7,
      duration: 150,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.impactMarkerLabel,
      alpha: 0.84,
      duration: 150,
      ease: 'Quad.Out',
    });
  }

  private showFatalSpotlight(
    obstacle: Phaser.Physics.Arcade.Image,
    hitDirection: ImpactDirection,
    nearMissChainCount: number | null,
  ): void {
    const hasNearMissChaseSnapshot = nearMissChainCount !== null;
    const spotlightColor = hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_IMPACT_COLOR : 0xfff0c7;
    const spotlightX = Phaser.Math.Clamp(obstacle.x, 44, ARENA_WIDTH - 44);
    const spotlightY = Phaser.Math.Clamp(obstacle.y, 44, ARENA_HEIGHT - 44);
    const fatalLabelPlacement = getVerticalCalloutPlacement({
      anchorY: spotlightY,
      gap: FATAL_LABEL_GAP_PX,
      labelHalfHeight: FATAL_LABEL_HALF_HEIGHT_PX,
      minY: FATAL_LABEL_MIN_Y_PX,
      maxY: FATAL_LABEL_MAX_Y_PX,
    });
    const connectorStartY = fatalLabelPlacement.placeBelow ? spotlightY + 16 : spotlightY - 16;
    const connectorEndY = fatalLabelPlacement.placeBelow
      ? Math.max(fatalLabelPlacement.labelY - 18, spotlightY + 12)
      : Math.min(fatalLabelPlacement.labelY + 18, spotlightY - 12);

    this.fatalSpotlight
      .setStrokeStyle(5, spotlightColor, 0.98)
      .setPosition(spotlightX, spotlightY)
      .setScale(0.72)
      .setAlpha(1)
      .setVisible(true);
    this.fatalSpotlightConnector
      .setStrokeStyle(3, spotlightColor, 0.96)
      .setTo(spotlightX, connectorStartY, spotlightX, connectorEndY)
      .setAlpha(0.96)
      .setVisible(true);
    this.fatalSpotlightLabel
      .setBackgroundColor(
        hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_FATAL_LABEL_BACKGROUND : '#4c2414',
      )
      .setColor(hasNearMissChaseSnapshot ? NEAR_MISS_CHASE_IMPACT_TEXT : '#fff3d1')
      .setText(this.getFatalSpotlightLabelText(hitDirection, nearMissChainCount));
    this.fatalSpotlightLabel
      .setPosition(
        getHorizontalCalloutCenterX({
          preferredCenterX: spotlightX,
          labelHalfWidth: this.fatalSpotlightLabel.displayWidth / 2,
          minX: FATAL_LABEL_MIN_X_PX,
          maxX: FATAL_LABEL_MAX_X_PX,
        }),
        fatalLabelPlacement.labelY,
      )
      .setAlpha(1)
      .setVisible(true);

    this.tweens.add({
      targets: this.fatalSpotlight,
      scale: 1.18,
      alpha: 0.42,
      duration: 240,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.fatalSpotlightConnector,
      alpha: 0.48,
      duration: 220,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.fatalSpotlightLabel,
      y: fatalLabelPlacement.labelY + (fatalLabelPlacement.placeBelow ? 8 : -8),
      alpha: 0.86,
      duration: 220,
      ease: 'Quad.Out',
    });
  }

  private resolveFatalObstacle(
    callbackObstacle: Phaser.Physics.Arcade.Image,
  ): Phaser.Physics.Arcade.Image {
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body | undefined;
    const overlappingObstacles: Phaser.Physics.Arcade.Image[] = [];
    const fatalThreatCandidates: FatalThreatCandidate[] = [];

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;

      if (
        !obstacle.active ||
        !this.isObstacleCollisionReady(obstacle) ||
        !this.isObstacleInsideVisibleArena(obstacle) ||
        !this.isObstacleOverlappingPlayer(obstacle)
      ) {
        return true;
      }

      const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body | undefined;
      overlappingObstacles.push(obstacle);
      fatalThreatCandidates.push({
        position: { x: obstacle.x, y: obstacle.y },
        velocity: {
          x: obstacleBody?.velocity.x ?? 0,
          y: obstacleBody?.velocity.y ?? 0,
        },
        collisionRadius: OBSTACLE_COLLISION_RADIUS,
      });

      return true;
    });

    if (overlappingObstacles.length <= 1) {
      return overlappingObstacles[0] ?? callbackObstacle;
    }

    const fatalThreatIndex = selectFatalThreatIndex({
      playerPosition: { x: this.player.x, y: this.player.y },
      playerVelocity: {
        x: playerBody?.velocity.x ?? 0,
        y: playerBody?.velocity.y ?? 0,
      },
      playerCollisionRadius: PLAYER_COLLISION_RADIUS,
      candidates: fatalThreatCandidates,
      preferredIndex: overlappingObstacles.indexOf(callbackObstacle),
    });

    return overlappingObstacles[fatalThreatIndex] ?? callbackObstacle;
  }

  private isObstacleOverlappingPlayer(obstacle: Phaser.Physics.Arcade.Image): boolean {
    const deltaX = this.player.x - obstacle.x;
    const deltaY = this.player.y - obstacle.y;
    const combinedRadius = PLAYER_COLLISION_RADIUS + OBSTACLE_COLLISION_RADIUS;
    return deltaX * deltaX + deltaY * deltaY <= combinedRadius * combinedRadius;
  }

  private getHitDirection(obstacle: Phaser.Physics.Arcade.Image): ImpactDirection {
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body | undefined;
    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body | undefined;
    return getImpactDirection(
      { x: this.player.x, y: this.player.y },
      { x: obstacle.x, y: obstacle.y },
      {
        x: obstacleBody?.velocity.x ?? 0,
        y: obstacleBody?.velocity.y ?? 0,
      },
      {
        x: playerBody?.velocity.x ?? 0,
        y: playerBody?.velocity.y ?? 0,
      },
    );
  }

  private getDirectionRotation(offsetX: number, offsetY: number): number {
    return Phaser.Math.Angle.Between(0, 0, offsetX, offsetY);
  }

  private getEscapePrompt(hitDirection: ImpactDirection): EscapePrompt {
    const horizontal = hitDirection.offsetX < 0 ? 'right' : hitDirection.offsetX > 0 ? 'left' : '';
    const vertical = hitDirection.offsetY < 0 ? 'down' : hitDirection.offsetY > 0 ? 'up' : '';
    const direction = [vertical, horizontal].filter(Boolean).join('-');

    if (direction) {
      return {
        title: `BREAK ${direction.toUpperCase()}`,
      };
    }

    return {
      title: 'RESET CENTER',
    };
  }

  private getFatalSpotlightLabelText(
    hitDirection: ImpactDirection,
    nearMissChainCount: number | null,
  ): string {
    if (nearMissChainCount !== null) {
      return getNearMissChaseFatalLabelText(
        hitDirection.label,
        hitDirection.offsetX === 0 && hitDirection.offsetY === 0,
      );
    }

    if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
      return 'KILLER\nCENTER';
    }

    return `KILLER\n${hitDirection.label.toUpperCase()}`;
  }

  private unlockFeedbackAudio(): void {
    const AudioContextCtor = getFeedbackAudioContextCtor(window);

    if (!AudioContextCtor) {
      return;
    }

    if (!this.feedbackAudioContext) {
      this.feedbackAudioContext = new AudioContextCtor();
    }

    if (this.feedbackAudioContext.state === 'suspended') {
      void this.feedbackAudioContext.resume().catch(() => {
        // Audio resume is best-effort only.
      });
    }
  }

  private playDeathFeedbackTone(): void {
    const audioContext = this.feedbackAudioContext;

    if (!audioContext || audioContext.state !== 'running') {
      return;
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.exponentialRampToValueAtTime(124, now + 0.11);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(920, now);
    filter.Q.setValueAtTime(1.8, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.045, now + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.14);
  }

  private playNearMissFeedbackTone(chainCount: number): void {
    const audioContext = this.feedbackAudioContext;

    if (!audioContext || audioContext.state !== 'running') {
      return;
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const clampedChainCount = Phaser.Math.Clamp(chainCount, 1, 3);
    const baseFrequency = 560 + (clampedChainCount - 1) * 48;
    const endFrequency = baseFrequency * 1.16;
    const peakGain = 0.011 + (clampedChainCount - 1) * 0.003;

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(baseFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + 0.06);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFrequency * 1.35, now);
    filter.Q.setValueAtTime(2.4, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(peakGain, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  private playFirstTargetFeedbackTone(): void {
    const audioContext = this.feedbackAudioContext;

    if (!audioContext || audioContext.state !== 'running') {
      return;
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(420, now);
    oscillator.frequency.exponentialRampToValueAtTime(560, now + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(720, now);
    filter.Q.setValueAtTime(2, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.015, now + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.13);
  }

  private playSurvivalGoalFeedbackTone(): void {
    const audioContext = this.feedbackAudioContext;

    if (!audioContext || audioContext.state !== 'running') {
      return;
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(520, now);
    oscillator.frequency.exponentialRampToValueAtTime(780, now + 0.08);
    oscillator.frequency.exponentialRampToValueAtTime(980, now + 0.18);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(980, now);
    filter.Q.setValueAtTime(1.7, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.02, now + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.22);
  }

  private loadTelemetry(
    storageKey: string,
    storage: Pick<Storage, 'getItem'>,
  ): GameplayTelemetry {
    const fallback = createEmptyTelemetry();

    try {
      const rawTelemetry = storage.getItem(storageKey);

      if (!rawTelemetry) {
        return fallback;
      }

      const parsedTelemetry = JSON.parse(rawTelemetry) as Partial<GameplayTelemetry>;

      return {
        totalRuns: this.readNumber(parsedTelemetry.totalRuns),
        totalDeaths: this.readNumber(parsedTelemetry.totalDeaths),
        totalSurvivalTime: this.readNumber(parsedTelemetry.totalSurvivalTime),
        bestSurvivalTime: this.readNullableNumber(parsedTelemetry.bestSurvivalTime),
        firstDeathTime: this.readNullableNumber(parsedTelemetry.firstDeathTime),
        earlyDeathsUnderTarget: this.readNumber(parsedTelemetry.earlyDeathsUnderTarget),
        totalRetryDelayMs: this.readNumber(parsedTelemetry.totalRetryDelayMs),
        retryCount: this.readNumber(parsedTelemetry.retryCount),
        totalSpawnRerolls: this.readNumber(parsedTelemetry.totalSpawnRerolls),
        recentDeathTimes: this.readRecentDeathTimes(parsedTelemetry.recentDeathTimes),
        lastDeathAt: this.readNullableNumber(parsedTelemetry.lastDeathAt),
        lastRetryDelayMs: this.readNullableNumber(parsedTelemetry.lastRetryDelayMs),
        lastRunStartedAt: this.readNullableNumber(parsedTelemetry.lastRunStartedAt),
        lastRunSpawnRerolls: this.readNumber(parsedTelemetry.lastRunSpawnRerolls),
        lastSurvivalTime: this.readNullableNumber(parsedTelemetry.lastSurvivalTime),
      };
    } catch {
      return fallback;
    }
  }

  private saveTelemetry(
    storageKey: string,
    storage: Pick<Storage, 'setItem'>,
    telemetry: GameplayTelemetry,
  ): void {
    try {
      storage.setItem(storageKey, JSON.stringify(telemetry));
    } catch {
      // Local telemetry is best-effort only.
    }
  }

  private readNumber(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : 0;
  }

  private readNullableNumber(value: unknown): number | null {
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
  }

  private readRecentDeathTimes(value: unknown): number[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter((entry): entry is number => typeof entry === 'number' && Number.isFinite(entry))
      .slice(0, TELEMETRY_RECENT_RUN_LIMIT)
      .map((entry) => Number(entry.toFixed(1)));
  }

  private recordRunStart(): void {
    const startedAt = Date.now();
    const retryDelayMs = getRetryDelayMs({
      startedAt,
      sessionLastDeathAt: this.sessionTelemetry.lastDeathAt,
      retryWindowMs: RETRY_GAP_TRACK_WINDOW_MS,
    });

    if (retryDelayMs !== null) {
      this.telemetry.totalRetryDelayMs += retryDelayMs;
      this.telemetry.retryCount += 1;
    }

    this.telemetry.totalRuns += 1;
    this.telemetry.lastRunStartedAt = startedAt;
    this.telemetry.lastRetryDelayMs = retryDelayMs;
    this.sessionTelemetry.totalRuns += 1;
    this.sessionTelemetry.lastRunStartedAt = startedAt;
    this.sessionTelemetry.lastRetryDelayMs = retryDelayMs;

    if (retryDelayMs !== null) {
      this.sessionTelemetry.totalRetryDelayMs += retryDelayMs;
      this.sessionTelemetry.retryCount += 1;
    }

    this.saveTelemetry(TELEMETRY_STORAGE_KEY, window.localStorage, this.telemetry);
    this.saveTelemetry(SESSION_TELEMETRY_STORAGE_KEY, window.sessionStorage, this.sessionTelemetry);
    this.updateTelemetryText();

    console.info('[telemetry] run_start', {
      startedAt,
      runNumber: this.telemetry.totalRuns,
      retryDelayMs,
    });
  }

  private recordRunEnd(): void {
    const survivalTime = this.survivalTime;
    const roundedSurvivalTime = Number(survivalTime.toFixed(1));

    this.telemetry.totalDeaths += 1;
    this.telemetry.totalSurvivalTime += survivalTime;
    this.telemetry.bestSurvivalTime = Math.max(this.telemetry.bestSurvivalTime ?? 0, survivalTime);
    this.telemetry.firstDeathTime = getLowestDeathTime(
      this.telemetry.firstDeathTime,
      survivalTime,
    );
    this.telemetry.lastDeathAt = Date.now();
    this.telemetry.lastSurvivalTime = survivalTime;
    this.telemetry.lastRunSpawnRerolls = this.runSpawnRerolls;
    this.telemetry.totalSpawnRerolls += this.runSpawnRerolls;

    if (survivalTime < TARGET_FIRST_DEATH_SECONDS) {
      this.telemetry.earlyDeathsUnderTarget += 1;
    }

    this.telemetry.recentDeathTimes = [
      survivalTime,
      ...this.telemetry.recentDeathTimes,
    ].slice(0, TELEMETRY_RECENT_RUN_LIMIT);

    this.sessionTelemetry.totalDeaths += 1;
    this.sessionTelemetry.totalSurvivalTime += survivalTime;
    this.sessionTelemetry.bestSurvivalTime = Math.max(
      this.sessionTelemetry.bestSurvivalTime ?? 0,
      survivalTime,
    );
    this.sessionTelemetry.firstDeathTime = getLowestDeathTime(
      this.sessionTelemetry.firstDeathTime,
      survivalTime,
    );
    this.sessionTelemetry.lastDeathAt = this.telemetry.lastDeathAt;
    this.sessionTelemetry.lastSurvivalTime = survivalTime;
    this.sessionTelemetry.lastRunSpawnRerolls = this.runSpawnRerolls;
    this.sessionTelemetry.totalSpawnRerolls += this.runSpawnRerolls;

    if (survivalTime < TARGET_FIRST_DEATH_SECONDS) {
      this.sessionTelemetry.earlyDeathsUnderTarget += 1;
    }

    this.sessionTelemetry.recentDeathTimes = [
      survivalTime,
      ...this.sessionTelemetry.recentDeathTimes,
    ].slice(0, TELEMETRY_RECENT_RUN_LIMIT);

    this.saveTelemetry(TELEMETRY_STORAGE_KEY, window.localStorage, this.telemetry);
    this.saveTelemetry(SESSION_TELEMETRY_STORAGE_KEY, window.sessionStorage, this.sessionTelemetry);
    this.updateTelemetryText();

    console.info('[telemetry] run_end', {
      survivalTime: roundedSurvivalTime,
      averageSurvivalTime: getAverageSurvivalTime(this.sessionTelemetry),
      earlyDeathRate: getEarlyDeathRate(this.sessionTelemetry),
      retryAverageSeconds: getAverageRetryDelaySeconds(this.sessionTelemetry),
      spawnRerollsThisRun: this.runSpawnRerolls,
    });
  }

  private updateBestText(): void {
    if (this.phase === 'playing') {
      this.bestText.setText(
        getPersonalBestChaseText({
          telemetry: this.telemetry,
          currentSurvivalTime: this.survivalTime,
        }),
      );
      return;
    }

    const lifetimeBestText = getBestSurvivalTimeText(this.telemetry);
    const sessionBestText = getBestSurvivalTimeText(this.sessionTelemetry);

    this.bestText.setText(
      `Best ${lifetimeBestText} | Session ${sessionBestText}`,
    );
  }

  private updateGoalStatusText(): void {
    if (this.phase !== 'playing') {
      this.goalStatusText
        .setText(`${SURVIVAL_GOAL_SECONDS}s CLEAR`)
        .setColor('#d8fff4')
        .setBackgroundColor('#123f36');
      return;
    }

    const clearClimbState = getEndgameClearClimbState(this.survivalTime);
    this.goalStatusText.setText(
      clearClimbState === null
        ? getSurvivalGoalChaseText({
            currentSurvivalTime: this.survivalTime,
          })
        : `${clearClimbState.threatLabel} | ${(SURVIVAL_GOAL_SECONDS - this.survivalTime).toFixed(1)}s to ${SURVIVAL_GOAL_SECONDS}s`,
    );
    this.goalStatusText
      .setColor(clearClimbState === null ? '#d8fff4' : colorToCssHex(clearClimbState.accentColor))
      .setBackgroundColor(
        clearClimbState === null
          ? '#123f36'
          : clearClimbState.threatLabel === 'SUMMIT SNAP'
            ? '#4a1620'
            : '#4c2414',
      );
  }

  private updateRunPhaseHud(): void {
    const { currentPhase } = getRunPhaseState(this.survivalTime);
    const endgameCue = currentPhase.id === 'endgame' ? getEndgameDriftCue(this.survivalTime) : null;
    const clearClimbState =
      currentPhase.id === 'endgame' ? getEndgameClearClimbState(this.survivalTime) : null;
    const phaseStatusText = getRunPhaseStatusText(this.survivalTime);
    this.phaseStatusText
      .setText(
        endgameCue !== null
          ? `${phaseStatusText} | ${endgameCue.hudLabel}`
          : clearClimbState !== null
            ? `${phaseStatusText} | ${clearClimbState.hudLabel}`
            : phaseStatusText,
      )
      .setColor(
        colorToCssHex(endgameCue?.accentColor ?? clearClimbState?.accentColor ?? currentPhase.accentColor),
      );
    this.phaseDetailText
      .setText(getRunPhaseDetailText(this.survivalTime))
      .setColor(
        colorToCssHex(endgameCue?.accentColor ?? clearClimbState?.accentColor ?? currentPhase.accentColor),
      );
  }

  private maybeShowRunPhaseShiftHint(activeRunElapsedMs: number): void {
    const { currentPhase } = getRunPhaseState(this.survivalTime);

    if (currentPhase.id === this.lastShownRunPhaseId) {
      return;
    }

    this.lastShownRunPhaseId = currentPhase.id;
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);

    const shiftAnnouncement = getRunPhaseShiftAnnouncement(currentPhase.id);

    if (shiftAnnouncement !== null) {
      this.beatCalloutHideAtElapsedMs = activeRunElapsedMs + RUN_PHASE_SHIFT_CALLOUT_DURATION_MS;
      this.tweens.killTweensOf(this.beatCalloutText);
      this.beatCalloutText
        .setText(`${shiftAnnouncement.title}\n${shiftAnnouncement.body}`)
        .setAlpha(1)
        .setScale(0.92)
        .setVisible(true);
      this.tweens.add({
        targets: this.beatCalloutText,
        scale: 1,
        alpha: 0.92,
        duration: 180,
        ease: 'Quad.Out',
      });
    }

    const shiftHint = this.getRunPhaseShiftHintText(currentPhase.id);

    if (shiftHint === null) {
      return;
    }

    this.hintText
      .setText(`${currentPhase.title}\n${shiftHint}`)
      .setVisible(true);
    this.playingHintHideAtElapsedMs = activeRunElapsedMs + FIRST_TARGET_HINT_DURATION_MS;
  }

  private maybeShowEndgameDriftCue(activeRunElapsedMs: number): void {
    const endgameCue = getEndgameDriftCue(this.survivalTime);
    const clearClimbState = getEndgameClearClimbState(this.survivalTime);

    if (endgameCue === null && clearClimbState === null) {
      this.lastShownEndgameDriftCueId = null;
      return;
    }

    const cueId = endgameCue?.id ?? 'clear-climb';

    if (cueId === this.lastShownEndgameDriftCueId) {
      return;
    }

    this.lastShownEndgameDriftCueId = cueId;
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.hintText
      .setText(
        `${endgameCue?.title ?? clearClimbState?.title ?? 'ENDGAME DRIFT'}\n${endgameCue?.body ?? clearClimbState?.body ?? ''}`,
      )
      .setVisible(true);
    this.playingHintHideAtElapsedMs = activeRunElapsedMs + FIRST_TARGET_HINT_DURATION_MS;

    if (endgameCue?.id === 'release') {
      return;
    }

    this.beatCalloutHideAtElapsedMs = activeRunElapsedMs + ENDGAME_DRIFT_CUE_CALLOUT_DURATION_MS;
    this.tweens.killTweensOf(this.beatCalloutText);
    this.beatCalloutText
      .setText(
        `${endgameCue?.title ?? clearClimbState?.title ?? 'ENDGAME DRIFT'}\n${endgameCue?.body ?? clearClimbState?.body ?? ''}`,
      )
      .setAlpha(1)
      .setScale(0.94)
      .setVisible(true);
    this.tweens.add({
      targets: this.beatCalloutText,
      scale: 1,
      alpha: 0.92,
      duration: 160,
      ease: 'Quad.Out',
    });
  }

  private updatePersonalBestChase(): void {
    if (
      this.phase !== 'playing' ||
      this.personalBestCelebratedThisRun ||
      this.runPersonalBestTargetTime === null ||
      this.survivalTime <= this.runPersonalBestTargetTime
    ) {
      return;
    }

    this.personalBestCelebratedThisRun = true;
    this.tweens.killTweensOf(this.bestText);
    this.tweens.killTweensOf(this.scoreText);
    this.bestText.setTint(0xfff0c7).setScale(1.02).setAlpha(1);
    this.scoreText.setTint(0xfff0c7);
    this.tweens.add({
      targets: this.bestText,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 180,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.bestText.clearTint();
        this.bestText.setScale(1);
      },
    });
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 180,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.scoreText.clearTint();
        this.scoreText.setScale(1);
      },
    });
  }

  private updateTelemetryText(): void {
    this.updateBestText();
    this.updateGoalStatusText();
    this.updateRunPhaseHud();
    this.waitingIntroTitle.setText(getWaitingIntroTitleText(getBestSurvivalTime(this.telemetry)));
    this.waitingHorizonText.setText(
      getRunHorizonText(getBestSurvivalTime(this.telemetry) ?? 0),
    );
    this.waitingPhaseText.setText(
      getRunPhaseTimelineText(getBestSurvivalTime(this.telemetry) ?? 0),
    );
    this.telemetryText.setText(this.getTelemetryLinesForCurrentPhase().join('\n'));
    this.telemetryText.setVisible(this.phase !== 'paused' && this.phase !== 'gameOver');
    this.telemetryText.setAlpha(this.phase === 'playing' ? 0.9 : 1);
  }

  private updateHudChromeVisibility(): void {
    const hudVisible = this.phase === 'waiting' || this.phase === 'playing';
    this.scoreText.setVisible(hudVisible);
    this.bestText.setVisible(hudVisible);
    this.goalStatusText.setVisible(this.phase === 'playing');
    this.phaseStatusText.setVisible(this.phase === 'playing');
    this.phaseDetailText.setVisible(this.phase === 'playing');
    this.supportText.setDepth(
      this.phase === 'paused' || this.phase === 'gameOver'
        ? OVERLAY_SUPPORT_TEXT_DEPTH
        : SUPPORT_TEXT_DEPTH,
    );
    if (this.phase !== 'playing') {
      this.beatCalloutText.setVisible(false);
      this.nearMissText.setVisible(false);
    }
    this.updateWaitingPresentation();
  }

  private updateWaitingPresentation(): void {
    const waitingVisible = this.phase === 'waiting';

    this.waitingIntroPanel.setVisible(waitingVisible);
    this.waitingIntroAccent.setVisible(waitingVisible);
    this.waitingIntroEyebrow.setVisible(waitingVisible);
    this.waitingIntroTitle.setVisible(waitingVisible);
    this.waitingHorizonLabel.setVisible(waitingVisible);
    this.waitingHorizonText.setVisible(waitingVisible);
    this.waitingPhaseLabel.setVisible(waitingVisible);
    this.waitingPhaseText.setVisible(waitingVisible);
    this.waitingPulseCore.setVisible(waitingVisible);
    this.waitingPulseRing.setVisible(waitingVisible);
    this.waitingPulseLabel.setVisible(waitingVisible);

    if (waitingVisible) {
      this.waitingPulseCore
        .setScale(1)
        .setAlpha(0.28);
      this.waitingPulseRing
        .setScale(1)
        .setAlpha(0.68);
      this.waitingPulseCoreTween?.resume();
      this.waitingPulseRingTween?.resume();
      return;
    }

    this.waitingPulseCoreTween?.pause();
    this.waitingPulseRingTween?.pause();
  }

  private getTelemetryLinesForCurrentPhase(): string[] {
    if (this.phase === 'playing') {
      return [
        'Local telemetry',
        `Completed runs ${getCompletedRunCount(this.sessionTelemetry)} | Avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
        `First death ${getFirstDeathTimeText(this.sessionTelemetry)} | Early <${TARGET_FIRST_DEATH_SECONDS}s ${getEarlyDeathRate(this.sessionTelemetry)}%`,
        `Validation ${getValidationProgressText(this.sessionTelemetry)} | Press V to export`,
      ];
    }

    if (this.phase === 'gameOver') {
      return [
        'Session snapshot',
        this.getGameOverSessionSummaryLine(),
        this.getGameOverValidationSummaryLine(),
      ];
    }

    if (this.phase === 'paused') {
      return [
        'Local telemetry',
        `Run paused at ${this.survivalTime.toFixed(1)}s | Session avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
        `Session first death: ${getFirstDeathTimeText(this.sessionTelemetry)} | Early <${TARGET_FIRST_DEATH_SECONDS}s: ${getEarlyDeathRate(this.sessionTelemetry)}%`,
        `Validation: ${getValidationProgressText(this.sessionTelemetry)} | Best ${getLiveBestSurvivalTimeText({
          telemetry: this.telemetry,
          currentSurvivalTime: this.survivalTime,
        })}`,
        `Refocus, then press ${this.getResumeActionText()} to resume.`,
      ];
    }

    return [
      'Local telemetry',
      this.getWaitingProgressLine(),
      this.getWaitingRiskLine(),
      this.getValidationExportLine(),
      this.getWaitingLifetimeLine(),
    ];
  }

  private getBaseSupportText(): string {
    return `Opening window: break ${TARGET_FIRST_DEATH_SECONDS}s, then climb the phase ladder to ${SURVIVAL_GOAL_SECONDS}s. C summary | V export | R reset between runs.`;
  }

  private getRetryActionText(): string {
    return getPrimaryLaunchActionPromptText();
  }

  private getRetryActionPromptText(): string {
    return getPrimaryRetryActionPromptText();
  }

  private getResumeActionText(): string {
    return getPrimaryResumeActionPromptText();
  }

  private getPlayingHintText(): string {
    return `OPENING WINDOW\nStay moving, protect open air, and break ${TARGET_FIRST_DEATH_SECONDS}s clean.`;
  }

  private getFirstDeathTargetHintText(): string {
    return `${TARGET_FIRST_DEATH_SECONDS}s broken!\nBREAKTHROUGH is live. Strafe and surge are awake now.`;
  }

  private getSurvivalGoalHintText(): string {
    return `${SURVIVAL_GOAL_SECONDS}s clear!\nYou beat the namesake goal. Keep the lane open and push your best.`;
  }

  private getCurrentPlayingHintText(): string {
    if (this.survivalGoalReachedThisRun) {
      return this.getSurvivalGoalHintText();
    }

    if (this.firstDeathTargetReachedThisRun && this.survivalTime < LEAD_OBSTACLE_UNLOCK_SECONDS) {
      return this.getFirstDeathTargetHintText();
    }

    const { currentPhase } = getRunPhaseState(this.survivalTime);
    const clearClimbState =
      currentPhase.id === 'endgame' ? getEndgameClearClimbState(this.survivalTime) : null;

    if (clearClimbState !== null) {
      return `${clearClimbState.title}\n${clearClimbState.body}`;
    }

    return `${currentPhase.title}\n${currentPhase.detail}`;
  }

  private getNearMissChaseRemainingMs(activeRunElapsedMs: number): number {
    if (
      !isNearMissChaseActive(activeRunElapsedMs, this.nearMissChaseExpiresAtElapsedMs) ||
      this.nearMissChainCount <= 0
    ) {
      return 0;
    }

    return Math.max((this.nearMissChaseExpiresAtElapsedMs ?? activeRunElapsedMs) - activeRunElapsedMs, 0);
  }

  private getActiveNearMissSpawnStep(
    activeRunElapsedMs: number,
  ): NearMissChaseSpawnStep | null {
    if (
      !isNearMissChaseActive(activeRunElapsedMs, this.nearMissChaseExpiresAtElapsedMs) ||
      this.nearMissLiveSpawnStep === null ||
      this.nearMissLiveSpawnStepHideAtElapsedMs === null
    ) {
      this.nearMissLiveSpawnStep = null;
      this.nearMissLiveSpawnStepHideAtElapsedMs = null;
      return null;
    }

    if (activeRunElapsedMs >= this.nearMissLiveSpawnStepHideAtElapsedMs) {
      this.nearMissLiveSpawnStep = null;
      this.nearMissLiveSpawnStepHideAtElapsedMs = null;
      return null;
    }

    return this.nearMissLiveSpawnStep;
  }

  private consumeNearMissChaseSpawnStep():
    | { step: NearMissChaseSpawnStep; targetOffset: { x: number; y: number } }
    | null {
    const activeRunElapsedMs = this.getActiveRunElapsedMs(this.time.now);

    if (
      !isNearMissChaseActive(activeRunElapsedMs, this.nearMissChaseExpiresAtElapsedMs) ||
      this.nearMissChainCount <= 0 ||
      this.nearMissChaseLaneDirection === null
    ) {
      this.nearMissChasePendingSpawnSteps = [];
      return null;
    }

    const nextStep = this.nearMissChasePendingSpawnSteps.shift() ?? null;

    if (nextStep === null) {
      return null;
    }

    const targetOffset = getNearMissChaseTargetOffset(
      nextStep,
      this.nearMissChaseLaneDirection,
    );

    if (this.nearMissChasePendingSpawnSteps.length === 0) {
      this.nearMissChaseLaneDirection = null;
    }

    return {
      step: nextStep,
      targetOffset,
    };
  }

  private getNearMissHudText(
    activeRunElapsedMs: number,
    liveSpawnStep: NearMissChaseSpawnStep | null = this.getActiveNearMissSpawnStep(activeRunElapsedMs),
  ): string {
    const chaseRemainingMs = this.getNearMissChaseRemainingMs(activeRunElapsedMs);

    if (chaseRemainingMs > 0) {
      return getNearMissChaseHudText(
        this.nearMissChainCount,
        chaseRemainingMs,
        liveSpawnStep,
      );
    }

    return getNearMissLabel(this.nearMissChainCount);
  }

  private getNearMissDeathPromptText(activeRunElapsedMs: number): string | null {
    const nearMissChainCount = this.getNearMissDeathSnapshotChainCount(activeRunElapsedMs);

    if (nearMissChainCount === null) {
      return null;
    }

    return getNearMissChaseRetryText(nearMissChainCount);
  }

  private getNearMissDeathSnapshotChainCount(activeRunElapsedMs: number): number | null {
    const chaseRemainingMs = this.getNearMissChaseRemainingMs(activeRunElapsedMs);

    if (chaseRemainingMs <= 0 || this.lastNearMissChainCount <= 0) {
      return null;
    }

    return this.lastNearMissChainCount;
  }

  private getCurrentPlayingSupportText(): string {
    if (this.survivalGoalReachedThisRun) {
      return `${SURVIVAL_GOAL_SECONDS}s clear. The core goal is done; stay alive and see how far the run can stretch.`;
    }

    const activeRunElapsedMs = this.getActiveRunElapsedMs(this.time.now);
    const chaseRemainingMs = this.getNearMissChaseRemainingMs(activeRunElapsedMs);
    const liveSpawnStep = this.getActiveNearMissSpawnStep(activeRunElapsedMs);

    if (chaseRemainingMs > 0) {
      return getNearMissChaseSupportText(
        this.nearMissChainCount,
        chaseRemainingMs,
        liveSpawnStep,
      );
    }

    return getRunPhaseSupportText(this.survivalTime);
  }

  private getRunPhaseShiftHintText(phaseId: RunPhaseId): string | null {
    if (phaseId === 'breakthrough') {
      return 'Breakthrough is live. The arena warms up and the first pressure stack starts now.';
    }

    if (phaseId === 'killbox') {
      return 'Killbox is live. The first lead cut opens the trap, shadow echoes fold the lane into 24s lock-in, then live echo cadence keeps the trap folding while speed crushes straight escapes.';
    }

    if (phaseId === 'endgame') {
      return 'Endgame drift is live. Killbox releases sideways, rebounds once, flips into a wider late sweep, then aftershock, recenter, and a preclear squeeze keep the 40s lane under pressure.';
    }

    if (phaseId === 'overtime') {
      return 'Overtime is live. The goal is down, but the arena stays hot.';
    }

    return null;
  }

  private getEndgameDriftCueIntensity(endgameCue: EndgameDriftCue | null): number {
    if (endgameCue === null) {
      return 0;
    }

    switch (endgameCue.id) {
      case 'release':
        return 0.9;
      case 'rebound':
        return 0.75;
      case 'late-sweep':
        return 0.82;
      case 'aftershock':
        return 0.88;
      case 'recenter':
        return 0.7;
      case 'preclear':
        return 0.78;
      default:
        return 0;
    }
  }

  private getEndgameClearClimbIntensity(
    clearClimbState: ReturnType<typeof getEndgameClearClimbState>,
  ): number {
    if (clearClimbState === null) {
      return 0;
    }

    const secondsIntoClearClimb = this.survivalTime - ENDGAME_CLEAR_CLIMB_START_SECONDS;

    if (secondsIntoClearClimb <= 0) {
      return 0.86;
    }

    return Math.max(0.32, 0.86 - secondsIntoClearClimb * 0.12);
  }

  private getClearClimbBackdropMotion(
    clearClimbState: ReturnType<typeof getEndgameClearClimbState>,
    time: number,
  ): {
    bottomBandAngle: number;
    bottomBandOffsetX: number;
    frameOffsetX: number;
    frameOffsetY: number;
    frameScaleX: number;
    frameScaleY: number;
    glowOffsetX: number;
    glowOffsetY: number;
    topBandAngle: number;
    topBandOffsetX: number;
  } {
    if (clearClimbState === null) {
      return {
        glowOffsetX: 0,
        glowOffsetY: 0,
        topBandOffsetX: 0,
        bottomBandOffsetX: 0,
        topBandAngle: 0,
        bottomBandAngle: 0,
        frameOffsetX: 0,
        frameOffsetY: 0,
        frameScaleX: 1,
        frameScaleY: 1,
      };
    }

    const pulse = Math.sin(time / 180);

    if (clearClimbState.threatLabel === 'SUMMIT SNAP') {
      return {
        glowOffsetX: CLEAR_CLIMB_BACKDROP_SUMMIT_OFFSET_X + pulse * 12,
        glowOffsetY: CLEAR_CLIMB_BACKDROP_SUMMIT_OFFSET_Y + Math.cos(time / 210) * 6,
        topBandOffsetX: -20 + pulse * 10,
        bottomBandOffsetX: 28 - pulse * 8,
        topBandAngle: -4.2,
        bottomBandAngle: 3.4,
        frameOffsetX: -8 + pulse * 4,
        frameOffsetY: -2,
        frameScaleX: 1.018,
        frameScaleY: 0.988,
      };
    }

    const stairStepPulse = Math.max(0, Math.sin(time / 220));

    return {
      glowOffsetX: CLEAR_CLIMB_BACKDROP_ASCENT_OFFSET_X + stairStepPulse * 10,
      glowOffsetY: CLEAR_CLIMB_BACKDROP_ASCENT_OFFSET_Y - stairStepPulse * 8,
      topBandOffsetX: 18 + stairStepPulse * 8,
      bottomBandOffsetX: -14 + stairStepPulse * 6,
      topBandAngle: 2.8,
      bottomBandAngle: -2.2,
      frameOffsetX: 5 + stairStepPulse * 3,
      frameOffsetY: -4 - stairStepPulse * 2,
      frameScaleX: 1.012,
      frameScaleY: 0.992,
    };
  }

  private getNearMissChaseBackdropIntensity(time: number): number {
    if (this.phase !== 'playing') {
      return 0;
    }

    const remainingMs = this.getNearMissChaseRemainingMs(this.getActiveRunElapsedMs(time));

    if (remainingMs <= 0) {
      return 0;
    }

    const pulse = 0.82 + Math.max(0, Math.sin(time / NEAR_MISS_BACKDROP_PULSE_MS)) * 0.18;

    return getNearMissChaseVisualIntensity(remainingMs) * pulse;
  }

  private getNearMissBackdropMotion(
    time: number,
    intensity: number,
  ): {
    bottomBandAngle: number;
    bottomBandOffsetX: number;
    frameOffsetX: number;
    frameOffsetY: number;
    frameScaleBoostX: number;
    frameScaleBoostY: number;
    glowOffsetX: number;
    glowOffsetY: number;
    topBandAngle: number;
    topBandOffsetX: number;
  } {
    if (intensity <= 0) {
      return {
        glowOffsetX: 0,
        glowOffsetY: 0,
        topBandOffsetX: 0,
        bottomBandOffsetX: 0,
        topBandAngle: 0,
        bottomBandAngle: 0,
        frameOffsetX: 0,
        frameOffsetY: 0,
        frameScaleBoostX: 0,
        frameScaleBoostY: 0,
      };
    }

    const pulse = Math.sin(time / NEAR_MISS_BACKDROP_PULSE_MS);

    return {
      glowOffsetX: pulse * 10 * intensity,
      glowOffsetY: -6 * intensity + Math.cos(time / 190) * 4 * intensity,
      topBandOffsetX: 14 * intensity + pulse * 8 * intensity,
      bottomBandOffsetX: -12 * intensity - pulse * 6 * intensity,
      topBandAngle: 2.6 * intensity,
      bottomBandAngle: -2.2 * intensity,
      frameOffsetX: pulse * 3 * intensity,
      frameOffsetY: -3 * intensity,
      frameScaleBoostX: 0.012 * intensity,
      frameScaleBoostY: -0.01 * intensity,
    };
  }

  private getWaitingHintText(): string {
    return [
      'Steer with WASD / arrows or hold click / touch.',
      'Start with Space, Enter, tap, or any move input.',
    ].join('\n');
  }

  private celebrateSurvivalGoal(activeRunElapsedMs: number): void {
    this.survivalGoalReachedThisRun = true;
    this.goalStatusText
      .setText(`${SURVIVAL_GOAL_SECONDS}s CLEAR`)
      .setAlpha(1)
      .setScale(0.92)
      .setVisible(true);
    this.hintText
      .setText(this.getSurvivalGoalHintText())
      .setVisible(true);
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.playingHintHideAtElapsedMs = activeRunElapsedMs + SURVIVAL_GOAL_HINT_DURATION_MS;
    this.playSurvivalGoalFeedbackTone();
    this.tweens.killTweensOf(this.goalStatusText);
    this.tweens.killTweensOf(this.scoreText);
    this.tweens.killTweensOf(this.player);
    this.scoreText.setTint(0xfff0c7);
    this.player.clearTint();
    this.player.setTint(0xfff0c7);
    this.tweens.add({
      targets: this.goalStatusText,
      scale: 1.08,
      alpha: 0.96,
      duration: 200,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.goalStatusText.setScale(1).setAlpha(1);
      },
    });
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 180,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.scoreText.clearTint();
        this.scoreText.setScale(1);
      },
    });
    this.tweens.add({
      targets: this.player,
      scaleX: 1.14,
      scaleY: 1.14,
      duration: 180,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.player.clearTint();
        this.player.setScale(1);
      },
    });
  }

  private celebrateFirstDeathTarget(activeRunElapsedMs: number): void {
    this.firstDeathTargetReachedThisRun = true;
    this.hintText
      .setText(this.getFirstDeathTargetHintText())
      .setVisible(true);
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.playingHintHideAtElapsedMs = activeRunElapsedMs + FIRST_TARGET_HINT_DURATION_MS;
    this.playFirstTargetFeedbackTone();
    this.tweens.killTweensOf(this.scoreText);
    this.scoreText.setTint(0xd8fff4);
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 120,
      yoyo: true,
      ease: 'Quad.Out',
      onComplete: () => {
        this.scoreText.clearTint();
        this.scoreText.setScale(1);
      },
    });
  }

  private getActiveRunElapsedMs(time: number): number {
    const elapsedReferenceTime =
      this.phase === 'paused' && this.pauseStartedAt !== null ? this.pauseStartedAt : time;

    return elapsedReferenceTime - this.runStartedAt - this.pausedRunElapsedMs;
  }

  private getCurrentSurvivalTimeSeconds(time = this.time.now): number {
    if (this.phase !== 'playing' && this.phase !== 'paused') {
      return this.survivalTime;
    }

    return this.getActiveRunElapsedMs(time) / 1000;
  }

  private restorePlayingHintAfterPause(): void {
    if (this.playingHintHideAtElapsedMs === null) {
      this.hintText.setVisible(false);
      return;
    }

    const activeRunElapsedMs = this.getActiveRunElapsedMs(this.time.now);

    if (activeRunElapsedMs >= this.playingHintHideAtElapsedMs) {
      this.hintText.setVisible(false);
      this.playingHintHideAtElapsedMs = null;
      return;
    }

    this.hintText.setText(this.getCurrentPlayingHintText()).setVisible(true);
  }

  private restoreNearMissHintAfterPause(): void {
    if (this.nearMissHintHideAtElapsedMs === null || this.nearMissChainCount <= 0) {
      this.updateNearMissHud(this.getActiveRunElapsedMs(this.time.now));
      return;
    }

    this.updateNearMissHud(this.getActiveRunElapsedMs(this.time.now));
  }

  private showNearMissChaseSpawnStep(
    activeRunElapsedMs: number,
    step: NearMissChaseSpawnStep,
  ): void {
    const announcement = getNearMissChaseStepAnnouncement(step);
    this.nearMissLiveSpawnStep = step;
    this.nearMissLiveSpawnStepHideAtElapsedMs =
      activeRunElapsedMs + NEAR_MISS_STEP_CALLOUT_DURATION_MS;
    this.supportText.setText(this.getCurrentPlayingSupportText()).setVisible(true);
    this.beatCalloutHideAtElapsedMs = activeRunElapsedMs + NEAR_MISS_STEP_CALLOUT_DURATION_MS;
    this.tweens.killTweensOf(this.beatCalloutText);
    this.beatCalloutText
      .setText(`${announcement.title}\n${announcement.body}`)
      .setAlpha(1)
      .setScale(0.94)
      .setVisible(true);

    this.tweens.add({
      targets: this.beatCalloutText,
      scale: 1,
      alpha: 0.92,
      duration: 150,
      ease: 'Quad.Out',
    });
  }

  private updateRunBeatAnnouncement(activeRunElapsedMs: number): void {
    const announcement = getRunBeatAnnouncement(this.survivalTime);

    if (!announcement || announcement.label === this.lastAnnouncedRunBeatLabel) {
      return;
    }

    this.lastAnnouncedRunBeatLabel = announcement.label;
    this.beatCalloutHideAtElapsedMs = activeRunElapsedMs + RUN_BEAT_CALLOUT_DURATION_MS;
    this.tweens.killTweensOf(this.beatCalloutText);
    this.beatCalloutText
      .setText(`${announcement.title}\n${announcement.body}`)
      .setAlpha(1)
      .setScale(0.94)
      .setVisible(true);

    this.tweens.add({
      targets: this.beatCalloutText,
      scale: 1,
      alpha: 0.9,
      duration: 160,
      ease: 'Quad.Out',
    });
  }

  private restoreBeatCalloutAfterPause(): void {
    if (this.beatCalloutHideAtElapsedMs === null) {
      this.beatCalloutText.setVisible(false).setText('');
      return;
    }

    const activeRunElapsedMs = this.getActiveRunElapsedMs(this.time.now);
    const nearMissStepAnnouncement = this.getActiveNearMissSpawnStep(activeRunElapsedMs);

    if (activeRunElapsedMs >= this.beatCalloutHideAtElapsedMs) {
      this.beatCalloutText.setVisible(false).setText('');
      this.beatCalloutHideAtElapsedMs = null;
      return;
    }

    if (nearMissStepAnnouncement !== null) {
      const announcement = getNearMissChaseStepAnnouncement(nearMissStepAnnouncement);
      this.beatCalloutText
        .setText(`${announcement.title}\n${announcement.body}`)
        .setAlpha(0.92)
        .setScale(1)
        .setVisible(true);
      return;
    }

    const endgameCue = getEndgameDriftCue(this.survivalTime);
    const clearClimbState = getEndgameClearClimbState(this.survivalTime);

    if (endgameCue !== null && endgameCue.id !== 'release') {
      this.beatCalloutText
        .setText(`${endgameCue.title}\n${endgameCue.body}`)
        .setAlpha(0.92)
        .setScale(1)
        .setVisible(true);
      return;
    }

    if (clearClimbState !== null) {
      this.beatCalloutText
        .setText(`${clearClimbState.title}\n${clearClimbState.body}`)
        .setAlpha(0.92)
        .setScale(1)
        .setVisible(true);
      return;
    }

    const announcement = getRunBeatAnnouncement(this.survivalTime);

    if (!announcement) {
      this.beatCalloutText.setVisible(false).setText('');
      return;
    }

    this.beatCalloutText
      .setText(`${announcement.title}\n${announcement.body}`)
      .setAlpha(0.9)
      .setScale(1)
      .setVisible(true);
  }

  private getWaitingProgressLine(): string {
    if (this.sessionTelemetry.totalDeaths === 0) {
      return `No completed runs yet | Goal: survive past ${TARGET_FIRST_DEATH_SECONDS}s`;
    }

    return `Completed runs ${getCompletedRunCount(this.sessionTelemetry)} | Avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s | Best ${getBestSurvivalTimeText(this.sessionTelemetry)}`;
  }

  private getWaitingRiskLine(): string {
    if (this.sessionTelemetry.totalDeaths === 0) {
      return `Build a ${VALIDATION_SAMPLE_RUN_TARGET}-run sample, then press V to export the validation snapshot.`;
    }

    return `First death ${getFirstDeathTimeText(this.sessionTelemetry)} | Early <${TARGET_FIRST_DEATH_SECONDS}s ${getEarlyDeathRate(this.sessionTelemetry)}% | Retry ${getAverageRetryDelayText(this.sessionTelemetry)}`;
  }

  private getWaitingLifetimeLine(): string {
    if (this.telemetry.totalDeaths === 0) {
      return `Lifetime runs ${this.telemetry.totalRuns} | Spawn saves ${this.sessionTelemetry.totalSpawnRerolls} session / ${this.telemetry.totalSpawnRerolls} lifetime`;
    }

    return `Lifetime best ${getBestSurvivalTimeText(this.telemetry)} | Avg ${getAverageSurvivalTime(this.telemetry).toFixed(1)}s | Spawn saves ${this.sessionTelemetry.totalSpawnRerolls}/${this.telemetry.totalSpawnRerolls}`;
  }

  private getValidationExportLine(): string {
    const validationProgress = getValidationProgressText(this.sessionTelemetry);
    const validationReportCurrent = isValidationReportCurrent(
      this.lastValidationReport,
      this.sessionTelemetry,
    );

    if (this.lastValidationReport && validationReportCurrent) {
      return `Last export ${this.getLastValidationReportSummaryText()}`;
    }

    if (this.lastValidationReport) {
      if (hasCompletedRunSample(this.sessionTelemetry)) {
        return `Saved export stale | Validation ${validationProgress} | Press V to refresh`;
      }

      return `Saved export older sample | Validation ${validationProgress}`;
    }

    return `No saved export yet | Press V after a fresh ${VALIDATION_SAMPLE_RUN_TARGET}-run sample.`;
  }

  private getGameOverSessionSummaryLine(): string {
    return `Run ${this.getLastRunTimeText(this.sessionTelemetry)} | Session best ${getBestSurvivalTimeText(this.sessionTelemetry)}`;
  }

  private getGameOverValidationSummaryLine(): string {
    const validationProgress = getValidationProgressText(this.sessionTelemetry);
    const validationReportCurrent = isValidationReportCurrent(
      this.lastValidationReport,
      this.sessionTelemetry,
    );

    if (!hasCompletedRunSample(this.sessionTelemetry)) {
      if (this.lastValidationReport) {
        return `Validation ${validationProgress} | Saved export older sample`;
      }

      return `Validation ${validationProgress} | First death ${getFirstDeathTimeText(this.sessionTelemetry)}`;
    }

    if (validationReportCurrent) {
      return `Validation ${validationProgress} | Export ready`;
    }

    return `Validation ${validationProgress} | Press V to refresh`;
  }

  private getGameOverSupportText(): string {
    if (this.lastValidationReport) {
      return `Retry when ready. Press V to refresh the saved validation export after a new ${VALIDATION_SAMPLE_RUN_TARGET}-run sample.`;
    }

    return `Retry when ready. Press V after a fresh ${VALIDATION_SAMPLE_RUN_TARGET}-run sample to save a validation export.`;
  }

  private getLastRunTimeText(telemetry: GameplayTelemetry): string {
    return telemetry.lastSurvivalTime === null ? 'n/a' : `${telemetry.lastSurvivalTime.toFixed(1)}s`;
  }

  private buildTelemetrySummary(label: string, telemetry: GameplayTelemetry): TelemetrySummary {
    return buildTelemetrySummary(label, telemetry);
  }

  private getTelemetryReport(): { session: TelemetrySummary; lifetime: TelemetrySummary } {
    return {
      session: this.buildTelemetrySummary('session', this.sessionTelemetry),
      lifetime: this.buildTelemetrySummary('lifetime', this.telemetry),
    };
  }

  private saveValidationReport(report: string): void {
    this.lastValidationReport = report;

    try {
      window.localStorage.setItem(VALIDATION_REPORT_STORAGE_KEY, report);
    } catch {
      // Validation export persistence is best-effort only.
    }

    this.updateTelemetryText();
  }

  private clearValidationReport(): void {
    this.lastValidationReport = null;

    try {
      window.localStorage.removeItem(VALIDATION_REPORT_STORAGE_KEY);
    } catch {
      // Validation export persistence is best-effort only.
    }
  }

  private loadValidationReport(): string | null {
    try {
      return window.localStorage.getItem(VALIDATION_REPORT_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private getLastValidationReportSummaryText(): string {
    return formatValidationReportSummaryText(this.lastValidationReport);
  }

  private cleanupFocusListeners(): void {
    this.input.keyboard?.off('keydown-SPACE', this.handlePrimaryAction, this);
    this.input.keyboard?.off('keydown-ENTER', this.handlePrimaryAction, this);
    this.input.keyboard?.off('keydown-R', this.handleTelemetryReset, this);
    this.input.keyboard?.off('keydown-C', this.handleTelemetryLog, this);
    this.input.keyboard?.off('keydown-V', this.handleValidationExport, this);
    for (const eventName of MOVEMENT_KEY_UP_EVENTS) {
      this.input.keyboard?.off(eventName, this.handleMovementRelease, this);
    }
    for (const eventName of PRIMARY_ACTION_KEY_UP_EVENTS) {
      this.input.keyboard?.off(eventName, this.handlePrimaryActionKeyRelease, this);
    }
    this.input.keyboard?.removeCapture(CAPTURED_GAMEPLAY_KEYS);
    this.input.off('pointerdown', this.handlePointerPrimaryAction, this);
    this.input.off('pointerup', this.handlePointerRelease, this);
    this.input.off('pointerupoutside', this.handlePointerRelease, this);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
    this.inputCanvasElement?.removeEventListener('pointercancel', this.handleNativePointerCancel);
    this.inputCanvasElement?.removeEventListener('touchcancel', this.handleNativePointerCancel);
    this.inputCanvasElement = null;
  }
}
