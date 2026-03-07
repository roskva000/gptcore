import Phaser from 'phaser';
import {
  FIRST_SPAWN_DELAY_MS,
  TARGET_FIRST_DEATH_SECONDS,
  getObstacleSpeed,
  getSpawnDelayMs,
} from './balance';
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  selectSpawnPoint,
} from './spawn';
import {
  TELEMETRY_RECENT_RUN_LIMIT,
  buildTelemetrySummary,
  buildValidationReport,
  createEmptyTelemetry,
  formatValidationReportSummaryText,
  getAverageRetryDelaySeconds,
  getAverageRetryDelayText,
  getAverageSurvivalTime,
  getEarlyDeathRate,
  getFirstDeathTimeText,
  getRecentDeathTimesText,
  getValidationProgressText,
  type GameplayTelemetry,
  type TelemetrySummary,
} from './telemetry.ts';

type GamePhase = 'waiting' | 'playing' | 'gameOver';

const PLAYER_SPEED = 260;
const OFFSCREEN_CULL_MARGIN = 96;
const RETRY_GAP_TRACK_WINDOW_MS = 15000;
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
type HitDirection = {
  label: string;
  sentence: string;
  offsetX: number;
  offsetY: number;
};

export class GameScene extends Phaser.Scene {
  private phase: GamePhase = 'waiting';
  private player!: Phaser.Physics.Arcade.Image;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private movementKeys!: MovementKeys;
  private scoreText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
  private telemetryText!: Phaser.GameObjects.Text;
  private hitFlash!: Phaser.GameObjects.Rectangle;
  private impactRay!: Phaser.GameObjects.Line;
  private impactMarker!: Phaser.GameObjects.Arc;
  private impactMarkerLabel!: Phaser.GameObjects.Text;
  private overlay!: Phaser.GameObjects.Rectangle;
  private fatalCallout!: Phaser.GameObjects.Text;
  private overlayTitle!: Phaser.GameObjects.Text;
  private overlayBody!: Phaser.GameObjects.Text;
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
      .setCircle(16)
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
      undefined,
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

    this.hintText = this.add
      .text(
        ARENA_WIDTH / 2,
        78,
        'WASD / arrows to move\nHold click or touch to steer\nPress Space, Enter, or tap to start\nPress R to reset sample, C to log telemetry summary, V to copy validation summary',
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
    this.input.on('pointerdown', this.handlePrimaryAction, this);
  }

  update(time: number): void {
    if (this.phase === 'waiting' && this.hasMovementInput()) {
      this.startRun();
    }

    this.updatePlayerVelocity();
    this.cullObstacles();

    if (this.phase !== 'playing') {
      return;
    }

    this.survivalTime = (time - this.runStartedAt) / 1000;
    this.scoreText.setText(`${this.survivalTime.toFixed(1)}s`);
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
    this.unlockFeedbackAudio();

    if (this.phase === 'waiting') {
      this.startRun();
      return;
    }

    if (this.phase === 'gameOver') {
      this.startRun();
    }
  }

  private handleTelemetryReset(): void {
    this.telemetry = createEmptyTelemetry();
    this.sessionTelemetry = createEmptyTelemetry();
    this.saveTelemetry(TELEMETRY_STORAGE_KEY, window.localStorage, this.telemetry);
    this.saveTelemetry(SESSION_TELEMETRY_STORAGE_KEY, window.sessionStorage, this.sessionTelemetry);
    this.updateTelemetryText();

    this.hintText
      .setText(
        'Telemetry sample reset.\nPlay 5-10 runs, then press V to copy the validation summary.',
      )
      .setVisible(true);

    console.info('[telemetry] reset', this.getTelemetryReport());
  }

  private handleTelemetryLog(): void {
    const report = this.getTelemetryReport();

    console.info('[telemetry] summary', report);
    this.hintText
      .setText(
        'Telemetry summary logged to console.\nUse session metrics for the current validation sample or press V to copy it.',
      )
      .setVisible(true);
  }

  private handleValidationExport(): void {
    const validationReport = buildValidationReport(this.sessionTelemetry);
    this.saveValidationReport(validationReport);

    if (!navigator.clipboard?.writeText) {
      console.info('[telemetry] validation_report', validationReport);
      this.hintText
        .setText(
          `Clipboard unavailable here.\nValidation summary saved locally: ${this.getLastValidationReportSummaryText()}`,
        )
        .setVisible(true);
      return;
    }

    void navigator.clipboard
      .writeText(validationReport)
      .then(() => {
        console.info('[telemetry] validation_report', validationReport);
        this.hintText
          .setText(
            `Validation summary copied.\nLatest export: ${this.getLastValidationReportSummaryText()}`,
          )
          .setVisible(true);
      })
      .catch(() => {
        console.info('[telemetry] validation_report', validationReport);
        this.hintText
          .setText(
            `Clipboard copy failed.\nValidation summary saved locally: ${this.getLastValidationReportSummaryText()}`,
          )
          .setVisible(true);
      });
  }

  private startRun(): void {
    if (this.phase === 'playing') {
      return;
    }

    this.resetArenaForRun();
    this.phase = 'playing';
    this.runStartedAt = this.time.now;
    this.survivalTime = 0;
    this.runSpawnRerolls = 0;
    this.scoreText.setText('0.0s');
    this.hintText.setText(
      'Survive the rush. The arena gets harder every few seconds.\nPress V after a sample to copy the validation summary.',
    );
    this.recordRunStart();

    this.time.delayedCall(1400, () => {
      if (this.phase === 'playing') {
        this.hintText.setVisible(false);
      }
    });

    this.scheduleNextSpawn(FIRST_SPAWN_DELAY_MS);
  }

  private resetArenaForRun(): void {
    this.nextSpawnTimer?.remove(false);
    this.nextSpawnTimer = undefined;
    this.tweens.killTweensOf([
      this.player,
      this.hitFlash,
      this.impactRay,
      this.impactMarker,
      this.impactMarkerLabel,
    ]);
    this.player
      .setPosition(ARENA_WIDTH / 2, ARENA_HEIGHT / 2)
      .setVelocity(0, 0)
      .clearTint()
      .setAlpha(1)
      .setScale(1);
    this.hitFlash.setAlpha(0).setVisible(false);
    this.impactRay.setAlpha(0).setVisible(false);
    this.impactMarker.setAlpha(0).setScale(0.72).setVisible(false);
    this.impactMarkerLabel.setAlpha(0).setVisible(false).setText('');
    this.overlay.setVisible(false);
    this.fatalCallout.setVisible(false).setText('');
    this.overlayTitle.setVisible(false);
    this.overlayBody.setVisible(false);

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      obstacle.disableBody(true, true);
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
      randomInt: Phaser.Math.Between,
    });
    this.runSpawnRerolls += rerollsUsed;
    const obstacle = this.obstacles.get(spawnPoint.x, spawnPoint.y, 'obstacle') as
      | Phaser.Physics.Arcade.Image
      | null;

    if (!obstacle) {
      return;
    }

    obstacle
      .setActive(true)
      .setVisible(true)
      .setDepth(2)
      .setPosition(spawnPoint.x, spawnPoint.y)
      .setCircle(12)
      .setVelocity(0, 0);

    const target = new Phaser.Math.Vector2(this.player.x, this.player.y);
    const velocity = target.subtract(spawnPoint).normalize().scale(this.getObstacleSpeed());
    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body;
    obstacleBody.enable = true;
    obstacle.setVelocity(velocity.x, velocity.y);
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

  private updatePlayerVelocity(): void {
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
      const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2 | null;

      if (worldPoint) {
        const pointerVelocity = new Phaser.Math.Vector2(
          worldPoint.x - this.player.x,
          worldPoint.y - this.player.y,
        );

        if (pointerVelocity.lengthSq() > 100) {
          pointerVelocity.normalize().scale(PLAYER_SPEED);
          this.player.setVelocity(pointerVelocity.x, pointerVelocity.y);
          return;
        }
      }
    }

    this.player.setVelocity(0, 0);
  }

  private cullObstacles(): void {
    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;

      if (
        obstacle.active &&
        (obstacle.x < -OFFSCREEN_CULL_MARGIN ||
          obstacle.x > ARENA_WIDTH + OFFSCREEN_CULL_MARGIN ||
          obstacle.y < -OFFSCREEN_CULL_MARGIN ||
          obstacle.y > ARENA_HEIGHT + OFFSCREEN_CULL_MARGIN)
      ) {
        obstacle.disableBody(true, true);
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

    this.phase = 'gameOver';
    this.nextSpawnTimer?.remove(false);
    this.tweens.killTweensOf([
      this.player,
      this.hitFlash,
      this.impactRay,
      this.impactMarker,
      this.impactMarkerLabel,
    ]);
    this.player.setVelocity(0, 0);
    this.player.setTint(0xffd6cf);
    this.recordRunEnd();

    this.obstacles.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      obstacle.setVelocity(0, 0);

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

    this.overlay.setVisible(true);
    this.fatalCallout
      .setText(`FATAL LANE  ${hitDirection.label.toUpperCase()}`)
      .setVisible(true);
    this.overlayTitle.setText(`Hit from ${hitDirection.label}`).setVisible(true);
    this.overlayBody
      .setText(
        [
          `You survived ${this.survivalTime.toFixed(1)} seconds.`,
          `Cause: ${hitDirection.sentence}.`,
          'Ray, marker, flash, and blip freeze the hit lane for a quick read.',
          '',
          `Session avg ${getAverageSurvivalTime(this.sessionTelemetry).toFixed(1)}s | Retry avg ${getAverageRetryDelayText(this.sessionTelemetry)}`,
          `Early <${TARGET_FIRST_DEATH_SECONDS}s ${getEarlyDeathRate(this.sessionTelemetry)}% | First death ${getFirstDeathTimeText(this.sessionTelemetry)}`,
          `Validation ${getValidationProgressText(this.sessionTelemetry)} | Spawn saves ${this.runSpawnRerolls} this run`,
          'Press Space, Enter, or tap to retry instantly.',
        ].join('\n'),
      )
      .setVisible(true);
    this.hintText
      .setText(
        `Fatal lane: ${hitDirection.label}. Retry should stay instant.`,
      )
      .setVisible(true);
  }

  private showImpactMarker(hitDirection: HitDirection): void {
    const rayLength = 94;
    const rayEndX = this.player.x + hitDirection.offsetX * rayLength;
    const rayEndY = this.player.y + hitDirection.offsetY * rayLength;
    const markerX = Phaser.Math.Clamp(this.player.x + hitDirection.offsetX * 54, 48, ARENA_WIDTH - 48);
    const markerY = Phaser.Math.Clamp(this.player.y + hitDirection.offsetY * 54, 48, ARENA_HEIGHT - 48);

    this.impactRay
      .setTo(this.player.x, this.player.y, rayEndX, rayEndY)
      .setAlpha(0.95)
      .setVisible(true);
    this.impactMarker
      .setPosition(markerX, markerY)
      .setScale(0.72)
      .setAlpha(0.95)
      .setVisible(true);
    this.impactMarkerLabel
      .setPosition(markerX, markerY - 34)
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

  private getHitDirection(obstacle: Phaser.Physics.Arcade.Image): HitDirection {
    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body | undefined;
    const velocityX = obstacleBody?.velocity.x ?? 0;
    const velocityY = obstacleBody?.velocity.y ?? 0;
    const incomingX = velocityX === 0 ? 0 : velocityX > 0 ? -1 : 1;
    const incomingY = velocityY === 0 ? 0 : velocityY > 0 ? -1 : 1;
    const horizontal = incomingX < 0 ? 'left' : incomingX > 0 ? 'right' : '';
    const vertical = incomingY < 0 ? 'top' : incomingY > 0 ? 'bottom' : '';

    if (horizontal && vertical) {
      return {
        label: `${vertical}-${horizontal}`,
        sentence: `the obstacle closed in from the ${vertical}-${horizontal}`,
        offsetX: incomingX,
        offsetY: incomingY,
      };
    }

    if (horizontal) {
      return {
        label: horizontal,
        sentence: `the obstacle closed in from the ${horizontal}`,
        offsetX: incomingX,
        offsetY: 0,
      };
    }

    if (vertical) {
      return {
        label: vertical,
        sentence: `the obstacle closed in from the ${vertical}`,
        offsetX: 0,
        offsetY: incomingY,
      };
    }

    return {
      label: 'center',
      sentence: 'the impact overlapped your center line',
      offsetX: 0,
      offsetY: -1,
    };
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
    let retryDelayMs: number | null = null;

    if (
      this.telemetry.lastDeathAt !== null &&
      startedAt - this.telemetry.lastDeathAt <= RETRY_GAP_TRACK_WINDOW_MS
    ) {
      retryDelayMs = startedAt - this.telemetry.lastDeathAt;
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
    this.telemetry.firstDeathTime ??= roundedSurvivalTime;
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
    this.sessionTelemetry.firstDeathTime ??= roundedSurvivalTime;
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
    this.telemetryText.setText(
      [
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
      ].join('\n'),
    );
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
}
