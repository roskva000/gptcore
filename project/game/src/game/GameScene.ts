import Phaser from 'phaser';
import {
  EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS,
  EARLY_SPAWN_TARGET_LAG_SECONDS,
  FIRST_SPAWN_DELAY_MS,
  TARGET_FIRST_DEATH_SECONDS,
  getObstacleSpeed,
  getSpawnDelayMs,
  getSpawnCollisionGraceMs,
  getSpawnTargetLagSeconds,
} from './balance';
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  OBSTACLE_COLLISION_RADIUS,
  isPointInsideArena,
  isPointOutsideCullBounds,
  OFFSCREEN_CULL_MARGIN,
  selectSpawnPoint,
} from './spawn';
import { getVerticalCalloutPlacement } from './deathOverlayLayout';
import { getImpactDirection, type ImpactDirection } from './impactDirection';
import {
  TELEMETRY_RECENT_RUN_LIMIT,
  buildTelemetrySummary,
  buildValidationReport,
  createEmptyTelemetry,
  getBestSurvivalTime,
  getBestSurvivalTimeText,
  formatValidationReportSummaryText,
  getAverageRetryDelaySeconds,
  getAverageRetryDelayText,
  getAverageSurvivalTime,
  getEarlyDeathRate,
  getFirstDeathTimeText,
  getLowestDeathTime,
  getRecentDeathTimesText,
  getRetryDelayMs,
  getValidationProgressText,
  type GameplayTelemetry,
  type TelemetrySummary,
} from './telemetry.ts';

type GamePhase = 'waiting' | 'playing' | 'paused' | 'gameOver';

const PLAYER_SPEED = 260;
const PLAYER_COLLISION_RADIUS = 16;
const POINTER_DEAD_ZONE_PX = 10;
const POINTER_FULL_SPEED_DISTANCE_PX = 120;
const RETRY_GAP_TRACK_WINDOW_MS = 15000;
const IN_RUN_HINT_DURATION_MS = 1400;
const HELD_MOVEMENT_ACTION_DELAY_MS = 180;
const IMPACT_LABEL_HALF_HEIGHT_PX = 12;
const IMPACT_LABEL_GAP_PX = 22;
const IMPACT_LABEL_MIN_Y_PX = 28;
const IMPACT_LABEL_MAX_Y_PX = ARENA_HEIGHT - 28;
const FATAL_LABEL_HALF_HEIGHT_PX = 20;
const FATAL_LABEL_GAP_PX = 18;
const FATAL_LABEL_MIN_Y_PX = 40;
const FATAL_LABEL_MAX_Y_PX = ARENA_HEIGHT - 40;
const TELEMETRY_STORAGE_KEY = 'survive-60-seconds-telemetry-v1';
const SESSION_TELEMETRY_STORAGE_KEY = 'survive-60-seconds-session-telemetry-v1';
const VALIDATION_REPORT_STORAGE_KEY = 'survive-60-seconds-last-validation-report-v1';

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

type FeedbackAudioContext = AudioContext | null;
type EscapePrompt = {
  title: string;
  sentence: string;
};

export class GameScene extends Phaser.Scene {
  private phase: GamePhase = 'waiting';
  private movementInputWasActive = false;
  private movementHoldActionStartedAt: number | null = null;
  private pointerHoldActionStartedAt: number | null = null;
  private pauseResumeNeedsMovementRelease = false;
  private pauseResumeNeedsPointerRelease = false;
  private playingHintHideAtElapsedMs: number | null = null;
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
  private player!: Phaser.Physics.Arcade.Image;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private movementKeys!: MovementKeys;
  private scoreText!: Phaser.GameObjects.Text;
  private bestText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
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
  private escapeRay!: Phaser.GameObjects.Line;
  private escapeArrowHead!: Phaser.GameObjects.Triangle;
  private escapeMarker!: Phaser.GameObjects.Arc;
  private escapeMarkerLabel!: Phaser.GameObjects.Text;
  private overlay!: Phaser.GameObjects.Rectangle;
  private fatalCallout!: Phaser.GameObjects.Text;
  private overlayTitle!: Phaser.GameObjects.Text;
  private overlayBody!: Phaser.GameObjects.Text;
  private overlayPrompt!: Phaser.GameObjects.Text;
  private overlayStats!: Phaser.GameObjects.Text;
  private runStartedAt = 0;
  private survivalTime = 0;
  private runSpawnRerolls = 0;
  private telemetry = createEmptyTelemetry();
  private sessionTelemetry = createEmptyTelemetry();
  private lastValidationReport: string | null = null;
  private nextSpawnTimer?: Phaser.Time.TimerEvent;
  private feedbackAudioContext: FeedbackAudioContext = null;

  constructor() {
    super('GameScene');
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

    this.hintText = this.add
      .text(
        ARENA_WIDTH / 2,
        78,
        'Survive 60 seconds.\nMove with WASD / arrows or hold click / touch to steer.\nPress Space, Enter, tap, or any movement key to start.',
        {
          align: 'center',
          color: '#b8cde0',
          fontFamily: 'Trebuchet MS',
          fontSize: '20px',
          lineSpacing: 8,
        },
      )
      .setDepth(3)
      .setOrigin(0.5, 0);

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
      .setDepth(3)
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

    this.escapeRay = this.add
      .line(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 0, 0, 0, 84, 0x88ffe4, 0.92)
      .setDepth(9)
      .setLineWidth(5, 5)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setVisible(false);

    this.escapeArrowHead = this.add
      .triangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 0, -15, 26, 0, 0, 15, 0x88ffe4, 0.98)
      .setDepth(9)
      .setAlpha(0)
      .setVisible(false);

    this.escapeMarker = this.add
      .circle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 30)
      .setDepth(9)
      .setStrokeStyle(4, 0x88ffe4, 0.95)
      .setFillStyle(0x0a1f1a, 0.35)
      .setVisible(false);

    this.escapeMarkerLabel = this.add
      .text(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, '', {
        align: 'center',
        color: '#d8fff4',
        fontFamily: 'Trebuchet MS',
        fontSize: '16px',
        fontStyle: 'bold',
      })
      .setDepth(9)
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
    this.input.on('pointerdown', this.handlePointerPrimaryAction, this);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('blur', this.handleWindowBlur);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanupFocusListeners, this);
    this.events.once(Phaser.Scenes.Events.DESTROY, this.cleanupFocusListeners, this);
  }

  update(time: number): void {
    const movementInputActive = this.hasMovementInput();
    const hasFreshMovementInput = movementInputActive && !this.movementInputWasActive;
    const hasConfirmedHeldMovementInput = this.hasConfirmedHeldMovementInput(
      time,
      movementInputActive,
    );
    const hasConfirmedHeldPointerInput =
      this.phase === 'waiting' || this.phase === 'gameOver' || this.phase === 'paused'
        ? this.hasConfirmedHeldPointerInput(time)
        : false;
    const hasConfirmedHeldStartInput =
      hasConfirmedHeldMovementInput || hasConfirmedHeldPointerInput;

    if (
      (this.phase === 'waiting' || this.phase === 'gameOver') &&
      (hasFreshMovementInput || hasConfirmedHeldStartInput)
    ) {
      this.activatePrimaryAction();
    }

    if (
      this.phase === 'paused' &&
      (hasFreshMovementInput || hasConfirmedHeldMovementInput || hasConfirmedHeldPointerInput) &&
      !document.hidden &&
      document.hasFocus()
    ) {
      this.activatePrimaryAction();
    }

    this.updatePlayerVelocity();
    this.movementInputWasActive = movementInputActive;

    if (this.phase !== 'playing') {
      return;
    }

    this.cullObstacles();

    const activeRunElapsedMs = this.getActiveRunElapsedMs(time);
    this.survivalTime = activeRunElapsedMs / 1000;
    this.scoreText.setText(`${this.survivalTime.toFixed(1)}s`);

    if (
      this.playingHintHideAtElapsedMs !== null &&
      activeRunElapsedMs >= this.playingHintHideAtElapsedMs
    ) {
      this.hintText.setVisible(false);
      this.playingHintHideAtElapsedMs = null;
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
    this.add.rectangle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, ARENA_WIDTH, ARENA_HEIGHT, 0x081018);

    const glow = this.add.graphics();
    glow.fillStyle(0x12304a, 0.38);
    glow.fillCircle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 220);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x1f3240, 0.42);

    for (let x = 40; x < ARENA_WIDTH; x += 40) {
      grid.lineBetween(x, 0, x, ARENA_HEIGHT);
    }

    for (let y = 40; y < ARENA_HEIGHT; y += 40) {
      grid.lineBetween(0, y, ARENA_WIDTH, y);
    }

    const frame = this.add.graphics();
    frame.lineStyle(3, 0x7ce8ff, 0.9);
    frame.strokeRoundedRect(12, 12, ARENA_WIDTH - 24, ARENA_HEIGHT - 24, 24);
  }

  private handlePrimaryAction(): void {
    this.activatePrimaryAction();
  }

  private handlePointerPrimaryAction(): void {
    if (this.phase === 'paused' && this.pauseResumeNeedsPointerRelease) {
      return;
    }

    this.activatePrimaryAction();
  }

  private activatePrimaryAction(): void {
    this.unlockFeedbackAudio();

    if (this.phase === 'waiting') {
      this.startRun();
      return;
    }

    if (this.phase === 'paused') {
      this.resumePausedRun();
      return;
    }

    if (this.phase === 'gameOver') {
      this.startRun();
    }
  }

  private handleTelemetryReset(): void {
    if (this.phase === 'playing' || this.phase === 'paused') {
      this.supportText.setText(
        'Finish the current run before resetting telemetry so first-death and retry samples stay coherent.',
      );
      return;
    }

    this.telemetry = createEmptyTelemetry();
    this.sessionTelemetry = createEmptyTelemetry();
    this.saveTelemetry(TELEMETRY_STORAGE_KEY, window.localStorage, this.telemetry);
    this.saveTelemetry(SESSION_TELEMETRY_STORAGE_KEY, window.sessionStorage, this.sessionTelemetry);
    this.clearValidationReport();
    this.updateTelemetryText();

    this.supportText.setText(
      'Telemetry sample reset. Previous validation export cleared; play 5-10 runs, then press V to copy a fresh summary.',
    );

    console.info('[telemetry] reset', this.getTelemetryReport());
  }

  private handleTelemetryLog(): void {
    const report = this.getTelemetryReport();

    console.info('[telemetry] summary', report);
    this.supportText.setText(
      'Telemetry summary logged to console. Use session metrics for the current validation sample or press V to copy it.',
    );
  }

  private handleValidationExport(): void {
    const validationReport = buildValidationReport(this.sessionTelemetry);
    this.saveValidationReport(validationReport);

    if (!navigator.clipboard?.writeText) {
      console.info('[telemetry] validation_report', validationReport);
      this.supportText.setText(
        `Clipboard unavailable here. Validation summary saved locally: ${this.getLastValidationReportSummaryText()}`,
      );
      return;
    }

    void navigator.clipboard
      .writeText(validationReport)
      .then(() => {
        console.info('[telemetry] validation_report', validationReport);
        this.supportText.setText(
          `Validation summary copied. Latest export: ${this.getLastValidationReportSummaryText()}`,
        );
      })
      .catch(() => {
        console.info('[telemetry] validation_report', validationReport);
        this.supportText.setText(
          `Clipboard copy failed. Validation summary saved locally: ${this.getLastValidationReportSummaryText()}`,
        );
      });
  }

  private startRun(): void {
    if (this.phase === 'playing') {
      return;
    }

    this.resetArenaForRun();
    this.phase = 'playing';
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pauseResumeNeedsMovementRelease = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.pausedRunElapsedMs = 0;
    this.pauseStartedAt = null;
    this.runStartedAt = this.time.now;
    this.survivalTime = 0;
    this.runSpawnRerolls = 0;
    this.scoreText.setText('0.0s');
    this.hintText.setText(this.getPlayingHintText()).setVisible(true);
    this.supportText.setText(this.getBaseSupportText());
    this.playingHintHideAtElapsedMs = IN_RUN_HINT_DURATION_MS;
    this.recordRunStart();

    this.scheduleNextSpawn(FIRST_SPAWN_DELAY_MS);
  }

  private pauseRunForFocusLoss(): void {
    if (this.phase !== 'playing') {
      return;
    }

    this.phase = 'paused';
    const movementInputActive = this.hasMovementInput();
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pauseResumeNeedsMovementRelease = movementInputActive;
    this.pauseResumeNeedsPointerRelease = true;
    this.pauseStartedAt = this.time.now;
    this.physics.world.pause();
    if (this.nextSpawnTimer) {
      this.nextSpawnTimer.paused = true;
    }
    this.pauseActiveObstacleSpawnGraceTweens();
    this.player.setVelocity(0, 0);
    this.movementInputWasActive = true;
    this.overlay.setVisible(true);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayTitle.setText('Run paused').setVisible(true);
    this.overlayBody
      .setText(
        [
          `You made it ${this.survivalTime.toFixed(1)} seconds before the pause.`,
          'The run is frozen so focus loss does not turn into a cheap death.',
        ].join('\n'),
      )
      .setVisible(true);
    this.overlayPrompt
      .setText(
        `Return to the game, then press ${this.getResumeActionText()} to resume.`,
      )
      .setVisible(true);
    this.overlayStats
      .setText(
        [
          `Best ${getBestSurvivalTimeText(this.telemetry)} lifetime | Session best ${getBestSurvivalTimeText(this.sessionTelemetry)}`,
          `Session avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s | Retry avg ${getAverageRetryDelayText(this.sessionTelemetry)}`,
          `Validation ${getValidationProgressText(this.sessionTelemetry)} | Spawn saves ${this.runSpawnRerolls} this run`,
        ].join('\n'),
      )
      .setVisible(true);
    this.hintText
      .setText(
        `Run paused on focus loss.\nRefocus, then press ${this.getResumeActionText()} to resume.`,
      )
      .setVisible(true);
    this.supportText.setText(
      'Pause guard active: refocus click only restores focus, and any held move key must be released before it can resume. No spawn, movement, or survival time advances while unfocused.',
    );
    this.updateTelemetryText();
  }

  private resumePausedRun(): void {
    if (this.phase !== 'paused' || document.hidden || !document.hasFocus()) {
      return;
    }

    if (this.pauseStartedAt !== null) {
      this.pausedRunElapsedMs += this.time.now - this.pauseStartedAt;
    }

    this.pauseStartedAt = null;
    this.phase = 'playing';
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.pauseResumeNeedsMovementRelease = false;
    this.pauseResumeNeedsPointerRelease = false;
    this.physics.world.resume();
    if (this.nextSpawnTimer) {
      this.nextSpawnTimer.paused = false;
    }
    this.resumeActiveObstacleSpawnGraceTweens();
    this.overlay.setVisible(false);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayTitle.setVisible(false);
    this.overlayBody.setVisible(false).setText('');
    this.overlayPrompt.setVisible(false).setText('');
    this.overlayStats.setVisible(false).setText('');
    this.restorePlayingHintAfterPause();
    this.supportText.setText(this.getBaseSupportText());
    this.movementInputWasActive = this.hasMovementInput();
    this.updateTelemetryText();
  }

  private resetArenaForRun(): void {
    this.nextSpawnTimer?.remove(false);
    this.nextSpawnTimer = undefined;
    this.physics.world.resume();
    this.playingHintHideAtElapsedMs = null;
    this.pausedRunElapsedMs = 0;
    this.pauseStartedAt = null;
    this.tweens.killTweensOf([
      this.player,
      this.hitFlash,
      this.impactRay,
      this.impactArrowHead,
      this.impactMarker,
      this.impactMarkerLabel,
      this.fatalSpotlight,
      this.fatalSpotlightConnector,
      this.fatalSpotlightLabel,
      this.escapeRay,
      this.escapeArrowHead,
      this.escapeMarker,
      this.escapeMarkerLabel,
    ]);
    this.player
      .setPosition(ARENA_WIDTH / 2, ARENA_HEIGHT / 2)
      .setVelocity(0, 0)
      .clearTint()
      .setAlpha(1)
      .setScale(1);
    this.hitFlash.setAlpha(0).setVisible(false);
    this.impactRay.setAlpha(0).setVisible(false);
    this.impactArrowHead.setAlpha(0).setScale(0.72).setVisible(false);
    this.impactMarker.setAlpha(0).setScale(0.72).setVisible(false);
    this.impactMarkerLabel.setAlpha(0).setVisible(false).setText('');
    this.fatalSpotlight.setAlpha(0).setScale(0.72).setVisible(false);
    this.fatalSpotlightConnector.setAlpha(0).setVisible(false);
    this.fatalSpotlightLabel.setAlpha(0).setVisible(false).setText('');
    this.escapeRay.setAlpha(0).setVisible(false);
    this.escapeArrowHead.setAlpha(0).setScale(0.76).setVisible(false);
    this.escapeMarker.setAlpha(0).setScale(0.78).setVisible(false);
    this.escapeMarkerLabel.setAlpha(0).setVisible(false).setText('');
    this.overlay.setVisible(false);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayTitle.setVisible(false);
    this.overlayBody.setVisible(false);
    this.overlayPrompt.setVisible(false).setText('');
    this.overlayStats.setVisible(false).setText('');
    this.movementInputWasActive = this.hasMovementInput();
    this.pointerHoldActionStartedAt = null;
    this.pauseResumeNeedsPointerRelease = false;

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
    return getSpawnDelayMs(this.survivalTime);
  }

  private getObstacleSpeed(): number {
    return getObstacleSpeed(this.survivalTime);
  }

  private spawnObstacle(): void {
    const { point: spawnPoint, rerollsUsed } = selectSpawnPoint({
      survivalTimeSeconds: this.survivalTime,
      playerPosition: { x: this.player.x, y: this.player.y },
      playerVelocity: {
        x: (this.player.body as Phaser.Physics.Arcade.Body).velocity.x,
        y: (this.player.body as Phaser.Physics.Arcade.Body).velocity.y,
      },
      activeObstaclePositions: this.obstacles
        .getChildren()
        .filter(
          (entry): entry is Phaser.Physics.Arcade.Image =>
            entry instanceof Phaser.Physics.Arcade.Image && entry.active,
        )
        .map((obstacle) => ({ x: obstacle.x, y: obstacle.y })),
      randomInt: Phaser.Math.Between,
    });
    this.runSpawnRerolls += rerollsUsed;
    const obstacle = this.obstacles.get(spawnPoint.x, spawnPoint.y, 'obstacle') as
      | Phaser.Physics.Arcade.Image
      | null;

    if (!obstacle) {
      return;
    }

    this.tweens.killTweensOf(obstacle);
    obstacle
      .setActive(true)
      .setVisible(true)
      .clearTint()
      .setAlpha(1)
      .setDepth(2)
      .setPosition(spawnPoint.x, spawnPoint.y)
      .setCircle(OBSTACLE_COLLISION_RADIUS)
      .setScale(1)
      .setVelocity(0, 0);

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    const spawnTargetLagSeconds = getSpawnTargetLagSeconds(this.survivalTime);
    const target = new Phaser.Math.Vector2(
      Phaser.Math.Clamp(
        this.player.x - playerBody.velocity.x * spawnTargetLagSeconds,
        0,
        ARENA_WIDTH,
      ),
      Phaser.Math.Clamp(
        this.player.y - playerBody.velocity.y * spawnTargetLagSeconds,
        0,
        ARENA_HEIGHT,
      ),
    );
    const velocity = target.subtract(spawnPoint).normalize().scale(this.getObstacleSpeed());
    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body;
    const collisionGraceMs = getSpawnCollisionGraceMs(this.survivalTime);
    const collisionUnlockElapsedMs =
      collisionGraceMs > 0 ? this.getActiveRunElapsedMs(this.time.now) + collisionGraceMs : null;

    obstacleBody.enable = true;
    obstacle.setData('collisionReady', collisionGraceMs === 0);
    obstacle.setData('collisionUnlockElapsedMs', collisionUnlockElapsedMs);
    obstacle.setData('spawnGraceTween', null);
    obstacle.setVelocity(velocity.x, velocity.y);

    if (collisionGraceMs === 0) {
      return;
    }

    const spawnGraceTween = this.tweens.add({
      targets: obstacle,
      alpha: { from: 0.58, to: 1 },
      scaleX: { from: 0.88, to: 1 },
      scaleY: { from: 0.88, to: 1 },
      duration: collisionGraceMs,
      ease: 'Quad.Out',
      onComplete: () => {
        obstacle.setData('spawnGraceTween', null);
      },
    });
    obstacle.setData('spawnGraceTween', spawnGraceTween);

  }

  private hasMovementInput(): boolean {
    return (
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown ||
      this.movementKeys.left.isDown ||
      this.movementKeys.right.isDown ||
      this.movementKeys.up.isDown ||
      this.movementKeys.down.isDown
    );
  }

  private hasConfirmedHeldMovementInput(time: number, movementInputActive: boolean): boolean {
    if (!movementInputActive) {
      this.movementHoldActionStartedAt = null;
      this.pauseResumeNeedsMovementRelease = false;
      return false;
    }

    if (this.phase === 'paused' && this.pauseResumeNeedsMovementRelease) {
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
    if (!this.input.activePointer.isDown) {
      this.pointerHoldActionStartedAt = null;
      this.pauseResumeNeedsPointerRelease = false;
      return false;
    }

    if (this.phase === 'paused' && this.pauseResumeNeedsPointerRelease) {
      this.pointerHoldActionStartedAt = null;
      return false;
    }

    if (this.pointerHoldActionStartedAt === null) {
      this.pointerHoldActionStartedAt = time;
      return false;
    }

    return time - this.pointerHoldActionStartedAt >= HELD_MOVEMENT_ACTION_DELAY_MS;
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

    obstacle.setData('collisionReady', true);
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

    if (pointer.isDown) {
      const pointerVelocity = this.getPointerVelocity();

      if (pointerVelocity) {
        this.player.setVelocity(pointerVelocity.x, pointerVelocity.y);
        return;
      }
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

    const pointerVelocity = new Phaser.Math.Vector2(
      worldPoint.x - this.player.x,
      worldPoint.y - this.player.y,
    );
    const distance = pointerVelocity.length();

    if (distance <= POINTER_DEAD_ZONE_PX) {
      return null;
    }

    const normalizedDistance = Phaser.Math.Clamp(
      (distance - POINTER_DEAD_ZONE_PX) /
        (POINTER_FULL_SPEED_DISTANCE_PX - POINTER_DEAD_ZONE_PX),
      0,
      1,
    );
    const pointerSpeed = PLAYER_SPEED * Math.sqrt(normalizedDistance);

    return pointerVelocity.scale(pointerSpeed / distance);
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

    const obstacle = obstacleGameObject as Phaser.Physics.Arcade.Image;
    const hitDirection = this.getHitDirection(obstacle);
    const escapePrompt = this.getEscapePrompt(hitDirection);
    const roundedSurvivalTime = Number(this.survivalTime.toFixed(1));
    const previousBestSurvivalTime = getBestSurvivalTime(this.telemetry);
    const isNewBest =
      previousBestSurvivalTime === null || roundedSurvivalTime > previousBestSurvivalTime;
    const bestSurvivalSummary = isNewBest
      ? `New best ${roundedSurvivalTime.toFixed(1)}s.`
      : `Best ${getBestSurvivalTimeText(this.telemetry)}.`;

    this.phase = 'gameOver';
    this.movementHoldActionStartedAt = null;
    this.pointerHoldActionStartedAt = null;
    this.nextSpawnTimer?.remove(false);
    this.tweens.killTweensOf([
      this.player,
      this.hitFlash,
      this.impactRay,
      this.impactArrowHead,
      this.impactMarker,
      this.impactMarkerLabel,
      this.fatalSpotlight,
      this.fatalSpotlightConnector,
      this.fatalSpotlightLabel,
      this.escapeRay,
      this.escapeArrowHead,
      this.escapeMarker,
      this.escapeMarkerLabel,
    ]);
    this.player.setVelocity(0, 0);
    this.player.setTint(0xffd6cf);
    this.recordRunEnd();
    this.tweens.killTweensOf(obstacle);
    obstacle.setTint(0xfff0c7).setScale(1.12).setAlpha(1);

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      const isFatalObstacle = obstacle === obstacleGameObject;

      this.tweens.killTweensOf(obstacle);
      obstacle.setVelocity(0, 0);

      if (!isFatalObstacle) {
        obstacle.clearTint().setAlpha(0.24);
      }

      return true;
    });

    this.cameras.main.shake(90, 0.0035);
    this.playDeathFeedbackTone();
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
    this.showImpactMarker(hitDirection);
    this.showFatalSpotlight(obstacle, hitDirection);
    this.showEscapeGuide(hitDirection, escapePrompt.title);

    this.overlay.setVisible(true);
    this.fatalCallout
      .setText(this.getFatalCalloutText(hitDirection))
      .setVisible(true);
    this.overlayTitle.setText(this.getDeathOverlayTitle(hitDirection)).setVisible(true);
    this.overlayBody
      .setText(
        [
          bestSurvivalSummary,
          `You survived ${roundedSurvivalTime.toFixed(1)} seconds.`,
          `Cause: ${hitDirection.sentence}.`,
        ].join('\n'),
      )
      .setVisible(true);
    this.overlayPrompt
      .setText(`${escapePrompt.title}\n${escapePrompt.sentence}`)
      .setVisible(true);
    this.overlayStats
      .setText(
        [
          `Press ${this.getRetryActionText()} to retry instantly.`,
          `Best ${getBestSurvivalTimeText(this.telemetry)} lifetime | Session best ${getBestSurvivalTimeText(this.sessionTelemetry)}`,
          `Session avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s | Retry avg ${getAverageRetryDelayText(this.sessionTelemetry)}`,
          `Early <${TARGET_FIRST_DEATH_SECONDS}s ${getEarlyDeathRate(this.sessionTelemetry)}% | First death ${getFirstDeathTimeText(this.sessionTelemetry)}`,
          `Validation ${getValidationProgressText(this.sessionTelemetry)} | Spawn saves ${this.runSpawnRerolls} this run`,
        ].join('\n'),
      )
      .setVisible(true);
    this.hintText
      .setText(
        `Retry now: ${this.getRetryActionText()}.\nThen ${escapePrompt.title.toLowerCase()} on the next rush.`,
      )
      .setVisible(true);
  }

  private deactivateObstacle(obstacle: Phaser.Physics.Arcade.Image): void {
    this.tweens.killTweensOf(obstacle);
    obstacle.setData('collisionReady', false);
    obstacle.setData('collisionUnlockElapsedMs', null);
    obstacle.setData('spawnGraceTween', null);
    obstacle.clearTint().setAlpha(1).setScale(1).setVelocity(0, 0);
    obstacle.disableBody(true, true);
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

  private showImpactMarker(hitDirection: ImpactDirection): void {
    if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
      this.impactRay.setAlpha(0).setVisible(false);
      this.impactArrowHead.setAlpha(0).setVisible(false);
      this.impactMarker
        .setPosition(this.player.x, this.player.y)
        .setScale(0.72)
        .setAlpha(0.95)
        .setVisible(true);
      this.impactMarkerLabel
        .setPosition(this.player.x, this.player.y)
        .setText('CENTER')
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
      .setTo(rayStartX, rayStartY, rayEndX, rayEndY)
      .setAlpha(0.95)
      .setVisible(true);
    this.impactArrowHead
      .setPosition(rayEndX, rayEndY)
      .setRotation(this.getDirectionRotation(hitDirection.offsetX, hitDirection.offsetY))
      .setScale(0.72)
      .setAlpha(0.98)
      .setVisible(true);
    this.impactMarker
      .setPosition(markerX, markerY)
      .setScale(0.72)
      .setAlpha(0.95)
      .setVisible(true);
    this.impactMarkerLabel
      .setPosition(markerX, impactLabelPlacement.labelY)
      .setText(hitDirection.label.toUpperCase())
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
  ): void {
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
      .setPosition(spotlightX, spotlightY)
      .setScale(0.72)
      .setAlpha(1)
      .setVisible(true);
    this.fatalSpotlightConnector
      .setTo(spotlightX, connectorStartY, spotlightX, connectorEndY)
      .setAlpha(0.96)
      .setVisible(true);
    this.fatalSpotlightLabel
      .setPosition(spotlightX, fatalLabelPlacement.labelY)
      .setText(this.getFatalSpotlightLabelText(hitDirection))
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

  private showEscapeGuide(hitDirection: ImpactDirection, promptTitle: string): void {
    const guideOffsetX =
      hitDirection.offsetX === 0 && hitDirection.offsetY === 0 ? 0 : -hitDirection.offsetX;
    const guideOffsetY =
      hitDirection.offsetX === 0 && hitDirection.offsetY === 0 ? -1 : -hitDirection.offsetY;
    const guideStartOffset = 28;
    const guideLength = 122;
    const guideStartX = this.player.x + guideOffsetX * guideStartOffset;
    const guideStartY = this.player.y + guideOffsetY * guideStartOffset;
    const guideEndX = this.player.x + guideOffsetX * guideLength;
    const guideEndY = this.player.y + guideOffsetY * guideLength;
    const markerX = Phaser.Math.Clamp(this.player.x + guideOffsetX * 70, 56, ARENA_WIDTH - 56);
    const markerY = Phaser.Math.Clamp(this.player.y + guideOffsetY * 70, 56, ARENA_HEIGHT - 56);

    this.escapeRay
      .setTo(guideStartX, guideStartY, guideEndX, guideEndY)
      .setAlpha(0.96)
      .setVisible(true);
    this.escapeArrowHead
      .setPosition(guideEndX, guideEndY)
      .setRotation(this.getDirectionRotation(guideOffsetX, guideOffsetY))
      .setScale(0.76)
      .setAlpha(0.98)
      .setVisible(true);
    this.escapeMarker
      .setPosition(markerX, markerY)
      .setScale(0.78)
      .setAlpha(0.92)
      .setVisible(true);
    this.escapeMarkerLabel
      .setPosition(markerX, markerY)
      .setText(promptTitle.replace(' ', '\n'))
      .setAlpha(1)
      .setVisible(true);

    this.tweens.add({
      targets: this.escapeRay,
      alpha: 0.34,
      duration: 210,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.escapeArrowHead,
      scale: 1,
      alpha: 0.34,
      duration: 210,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.escapeMarker,
      scale: 1,
      alpha: 0.72,
      duration: 180,
      ease: 'Quad.Out',
    });
    this.tweens.add({
      targets: this.escapeMarkerLabel,
      alpha: 0.86,
      duration: 180,
      ease: 'Quad.Out',
    });
  }

  private getHitDirection(obstacle: Phaser.Physics.Arcade.Image): ImpactDirection {
    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body | undefined;
    return getImpactDirection(
      { x: this.player.x, y: this.player.y },
      { x: obstacle.x, y: obstacle.y },
      {
        x: obstacleBody?.velocity.x ?? 0,
        y: obstacleBody?.velocity.y ?? 0,
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
        sentence: `On the retry, clear space toward the ${direction} lane first.`,
      };
    }

    return {
      title: 'RESET CENTER',
      sentence: 'On the retry, move off the center line before the next rush closes in.',
    };
  }

  private getFatalCalloutText(hitDirection: ImpactDirection): string {
    if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
      return 'CENTER COLLISION';
    }

    return `FATAL LANE  ${hitDirection.label.toUpperCase()}`;
  }

  private getDeathOverlayTitle(hitDirection: ImpactDirection): string {
    if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
      return 'Caught at center';
    }

    return `Hit from ${hitDirection.label}`;
  }

  private getFatalSpotlightLabelText(hitDirection: ImpactDirection): string {
    if (hitDirection.offsetX === 0 && hitDirection.offsetY === 0) {
      return 'KILLER\nCENTER';
    }

    return `KILLER\n${hitDirection.label.toUpperCase()}`;
  }

  private unlockFeedbackAudio(): void {
    const AudioContextCtor = window.AudioContext ?? null;

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
    const roundedSurvivalTime = Number(this.survivalTime.toFixed(1));

    this.telemetry.totalDeaths += 1;
    this.telemetry.totalSurvivalTime += roundedSurvivalTime;
    this.telemetry.bestSurvivalTime = Math.max(this.telemetry.bestSurvivalTime ?? 0, roundedSurvivalTime);
    this.telemetry.firstDeathTime = getLowestDeathTime(
      this.telemetry.firstDeathTime,
      roundedSurvivalTime,
    );
    this.telemetry.lastDeathAt = Date.now();
    this.telemetry.lastSurvivalTime = roundedSurvivalTime;
    this.telemetry.lastRunSpawnRerolls = this.runSpawnRerolls;
    this.telemetry.totalSpawnRerolls += this.runSpawnRerolls;

    if (roundedSurvivalTime < TARGET_FIRST_DEATH_SECONDS) {
      this.telemetry.earlyDeathsUnderTarget += 1;
    }

    this.telemetry.recentDeathTimes = [
      roundedSurvivalTime,
      ...this.telemetry.recentDeathTimes,
    ].slice(0, TELEMETRY_RECENT_RUN_LIMIT);

    this.sessionTelemetry.totalDeaths += 1;
    this.sessionTelemetry.totalSurvivalTime += roundedSurvivalTime;
    this.sessionTelemetry.bestSurvivalTime = Math.max(
      this.sessionTelemetry.bestSurvivalTime ?? 0,
      roundedSurvivalTime,
    );
    this.sessionTelemetry.firstDeathTime = getLowestDeathTime(
      this.sessionTelemetry.firstDeathTime,
      roundedSurvivalTime,
    );
    this.sessionTelemetry.lastDeathAt = this.telemetry.lastDeathAt;
    this.sessionTelemetry.lastSurvivalTime = roundedSurvivalTime;
    this.sessionTelemetry.lastRunSpawnRerolls = this.runSpawnRerolls;
    this.sessionTelemetry.totalSpawnRerolls += this.runSpawnRerolls;

    if (roundedSurvivalTime < TARGET_FIRST_DEATH_SECONDS) {
      this.sessionTelemetry.earlyDeathsUnderTarget += 1;
    }

    this.sessionTelemetry.recentDeathTimes = [
      roundedSurvivalTime,
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

  private updateTelemetryText(): void {
    this.bestText.setText(
      `Best ${getBestSurvivalTimeText(this.telemetry)} | Session ${getBestSurvivalTimeText(this.sessionTelemetry)}`,
    );
    this.telemetryText
      .setText(this.getTelemetryLinesForCurrentPhase().join('\n'))
      .setAlpha(this.phase === 'playing' ? 0.9 : 1);
  }

  private getTelemetryLinesForCurrentPhase(): string[] {
    if (this.phase === 'playing') {
      return [
        'Local telemetry',
        `Session runs ${this.sessionTelemetry.totalRuns} | Avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
        `First death ${getFirstDeathTimeText(this.sessionTelemetry)} | Early <${TARGET_FIRST_DEATH_SECONDS}s ${getEarlyDeathRate(this.sessionTelemetry)}%`,
        `Validation ${getValidationProgressText(this.sessionTelemetry)} | Press V to export`,
      ];
    }

    if (this.phase === 'gameOver') {
      return [
        'Local telemetry',
        `Session runs: ${this.sessionTelemetry.totalRuns} | Avg life: ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
        `Session first death: ${getFirstDeathTimeText(this.sessionTelemetry)} | Early <${TARGET_FIRST_DEATH_SECONDS}s: ${getEarlyDeathRate(this.sessionTelemetry)}%`,
        `Retry avg: ${getAverageRetryDelayText(this.sessionTelemetry)} | Validation: ${getValidationProgressText(this.sessionTelemetry)}`,
        `Recent session deaths: ${getRecentDeathTimesText(this.sessionTelemetry)}`,
        `Last export: ${this.getLastValidationReportSummaryText()}`,
      ];
    }

    if (this.phase === 'paused') {
      return [
        'Local telemetry',
        `Run paused at ${this.survivalTime.toFixed(1)}s | Session avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
        `Session first death: ${getFirstDeathTimeText(this.sessionTelemetry)} | Early <${TARGET_FIRST_DEATH_SECONDS}s: ${getEarlyDeathRate(this.sessionTelemetry)}%`,
        `Validation: ${getValidationProgressText(this.sessionTelemetry)} | Best ${getBestSurvivalTimeText(this.telemetry)}`,
        `Refocus, then press ${this.getResumeActionText()} to resume.`,
      ];
    }

    return [
      'Local telemetry',
      `Session runs: ${this.sessionTelemetry.totalRuns} | Avg life: ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s`,
      `Session first death: ${getFirstDeathTimeText(this.sessionTelemetry)} | Validation: ${getValidationProgressText(this.sessionTelemetry)}`,
      `Session early <${TARGET_FIRST_DEATH_SECONDS}s: ${getEarlyDeathRate(this.sessionTelemetry)}% | Retry: ${getAverageRetryDelayText(this.sessionTelemetry)}`,
      `Lifetime runs: ${this.telemetry.totalRuns} | Avg life: ${getAverageSurvivalTime(this.telemetry).toFixed(1)}s`,
      `Lifetime first death: ${getFirstDeathTimeText(this.telemetry)}`,
      `Lifetime early <${TARGET_FIRST_DEATH_SECONDS}s: ${getEarlyDeathRate(this.telemetry)}%`,
      `Last export: ${this.getLastValidationReportSummaryText()}`,
      `Spawn saves: ${this.sessionTelemetry.totalSpawnRerolls} session / ${this.telemetry.totalSpawnRerolls} lifetime`,
      'Export current sample: press V',
      `Recent session deaths: ${getRecentDeathTimesText(this.sessionTelemetry)}`,
    ];
  }

  private getBaseSupportText(): string {
    return `Telemetry hotkeys: C log summary | V copy validation | R reset sample between runs | early spawn lag ${EARLY_SPAWN_TARGET_LAG_SECONDS.toFixed(2)}s through ${EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS.toFixed(0)}s`;
  }

  private getRetryActionText(): string {
    return 'Space, Enter, tap/click, or keep holding your move input';
  }

  private getResumeActionText(): string {
    return 'Space, Enter, tap/click again, or press/hold your move input again';
  }

  private getPlayingHintText(): string {
    return 'Stay moving and break into open space.\nTarget: survive past 10s, then chase your best.';
  }

  private getActiveRunElapsedMs(time: number): number {
    return time - this.runStartedAt - this.pausedRunElapsedMs;
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

    this.hintText.setText(this.getPlayingHintText()).setVisible(true);
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
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
  }
}
