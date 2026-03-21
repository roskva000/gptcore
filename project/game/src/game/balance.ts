export const INITIAL_SPAWN_DELAY_MS = 1050;
export const FIRST_SPAWN_DELAY_MS = 900;
export const MIN_SPAWN_DELAY_MS = 320;
export const SURVIVAL_GOAL_SECONDS = 60;
export const TARGET_FIRST_DEATH_SECONDS = 10;
export const EARLY_SPAWN_TARGET_LAG_SECONDS = 0.18;
export const EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS = 10;
export const EARLY_SPAWN_COLLISION_GRACE_MS = 260;
export const EARLY_SPAWN_COLLISION_GRACE_FADE_START_SECONDS = 10;
export const EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS = 11;
export const OPENING_REQUIRED_SPAWN_DISTANCE_BONUS = 160;
export const OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS = 6;
export const SURGE_OBSTACLE_UNLOCK_SECONDS = 15;
export const SURGE_OBSTACLE_CADENCE = 5;
export const SURGE_OBSTACLE_SPEED_MULTIPLIER = 1.14;
export const SURGE_OBSTACLE_TINT = 0xffd38a;
export const STRAFE_OBSTACLE_UNLOCK_SECONDS = 12;
export const STRAFE_OBSTACLE_CADENCE = 8;
export const STRAFE_OBSTACLE_ROTATION_DEGREES = 14;
export const STRAFE_OBSTACLE_TINT = 0xffb88a;
export const LEAD_OBSTACLE_UNLOCK_SECONDS = 18;
export const LEAD_OBSTACLE_CADENCE = 9;
export const LEAD_OBSTACLE_TARGET_LEAD_SECONDS = 0.14;
export const KILLBOX_FORCED_LEAD_WINDOW_SECONDS = 1.4;
export const KILLBOX_FORCED_LEAD_TARGET_LEAD_SECONDS = 0.22;
export const KILLBOX_FORCED_LEAD_CUT_ROTATION_DEGREES = 18;
export const KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_SECONDS = 1.2;
export const KILLBOX_ECHO_FOLLOW_THROUGH_ROTATION_DEGREES = 12;
export const KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS = 21.2;
export const KILLBOX_ECHO_BRIDGE_WINDOW_SECONDS = 1.2;
export const KILLBOX_ECHO_BRIDGE_ROTATION_DEGREES = 10;
export const LEAD_OBSTACLE_TINT = 0xff9eb1;
export const ECHO_OBSTACLE_UNLOCK_SECONDS = 24;
export const ECHO_OBSTACLE_CADENCE = 6;
export const ECHO_OBSTACLE_TARGET_LAG_SECONDS = 0.22;
export const KILLBOX_ECHO_HANDOFF_WINDOW_SECONDS = 1.4;
export const KILLBOX_ECHO_HANDOFF_ROTATION_DEGREES = 6;
export const KILLBOX_ECHO_CADENCE_ROTATION_DEGREES = 6;
export const ECHO_OBSTACLE_TINT = 0x8ad9ff;
export const DRIFT_OBSTACLE_UNLOCK_SECONDS = 32;
export const DRIFT_OBSTACLE_CADENCE = 7;
export const DRIFT_RELEASE_WINDOW_SECONDS = 1.6;
export const DRIFT_RELEASE_ROTATION_DEGREES = 14;
export const DRIFT_OBSTACLE_ROTATION_DEGREES = 22;
export const DRIFT_OBSTACLE_TINT = 0xc8ff9a;
export const BREAKTHROUGH_PHASE_SPAWN_DELAY_MULTIPLIER = 0.94;
export const KILLBOX_PHASE_SPAWN_DELAY_MULTIPLIER = 0.86;
export const ENDGAME_PHASE_SPAWN_DELAY_MULTIPLIER = 0.8;
export const OVERTIME_PHASE_SPAWN_DELAY_MULTIPLIER = 0.78;
export const BREAKTHROUGH_PHASE_OBSTACLE_SPEED_MULTIPLIER = 1.02;
export const KILLBOX_PHASE_OBSTACLE_SPEED_MULTIPLIER = 1.07;
export const ENDGAME_PHASE_OBSTACLE_SPEED_MULTIPLIER = 1.12;
export const OVERTIME_PHASE_OBSTACLE_SPEED_MULTIPLIER = 1.15;

type Point = {
  x: number;
  y: number;
};

export type RunPhasePressureProfile = {
  obstacleSpeedMultiplier: number;
  phaseId: 'opening' | 'breakthrough' | 'killbox' | 'endgame' | 'overtime';
  spawnDelayMultiplier: number;
};

export type ObstacleVariant =
  | 'standard'
  | 'surge'
  | 'strafe'
  | 'lead'
  | 'echo'
  | 'drift';

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const KILLBOX_FORCED_LEAD_WINDOW_END_SECONDS =
  LEAD_OBSTACLE_UNLOCK_SECONDS + KILLBOX_FORCED_LEAD_WINDOW_SECONDS;
const KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_END_SECONDS =
  KILLBOX_FORCED_LEAD_WINDOW_END_SECONDS + KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_SECONDS;
const KILLBOX_ECHO_BRIDGE_WINDOW_END_SECONDS =
  KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS + KILLBOX_ECHO_BRIDGE_WINDOW_SECONDS;
const KILLBOX_ECHO_HANDOFF_WINDOW_END_SECONDS =
  ECHO_OBSTACLE_UNLOCK_SECONDS + KILLBOX_ECHO_HANDOFF_WINDOW_SECONDS;

const isKillboxEchoBridgeWindow = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= KILLBOX_ECHO_BRIDGE_WINDOW_START_SECONDS &&
  survivalTimeSeconds < KILLBOX_ECHO_BRIDGE_WINDOW_END_SECONDS;

const isKillboxEchoFollowThroughWindow = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= KILLBOX_FORCED_LEAD_WINDOW_END_SECONDS &&
  survivalTimeSeconds < KILLBOX_ECHO_FOLLOW_THROUGH_WINDOW_END_SECONDS;

const isKillboxEchoHandoffWindow = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= ECHO_OBSTACLE_UNLOCK_SECONDS &&
  survivalTimeSeconds < KILLBOX_ECHO_HANDOFF_WINDOW_END_SECONDS;

const isKillboxEchoCadenceWindow = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= ECHO_OBSTACLE_UNLOCK_SECONDS &&
  survivalTimeSeconds < DRIFT_OBSTACLE_UNLOCK_SECONDS;

const isDriftReleaseWindow = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= DRIFT_OBSTACLE_UNLOCK_SECONDS &&
  survivalTimeSeconds < DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_WINDOW_SECONDS;

export const getRunPhasePressureProfile = (
  survivalTimeSeconds: number,
): RunPhasePressureProfile => {
  if (survivalTimeSeconds >= SURVIVAL_GOAL_SECONDS) {
    return {
      phaseId: 'overtime',
      spawnDelayMultiplier: OVERTIME_PHASE_SPAWN_DELAY_MULTIPLIER,
      obstacleSpeedMultiplier: OVERTIME_PHASE_OBSTACLE_SPEED_MULTIPLIER,
    };
  }

  if (survivalTimeSeconds >= DRIFT_OBSTACLE_UNLOCK_SECONDS) {
    return {
      phaseId: 'endgame',
      spawnDelayMultiplier: ENDGAME_PHASE_SPAWN_DELAY_MULTIPLIER,
      obstacleSpeedMultiplier: ENDGAME_PHASE_OBSTACLE_SPEED_MULTIPLIER,
    };
  }

  if (survivalTimeSeconds >= LEAD_OBSTACLE_UNLOCK_SECONDS) {
    return {
      phaseId: 'killbox',
      spawnDelayMultiplier: KILLBOX_PHASE_SPAWN_DELAY_MULTIPLIER,
      obstacleSpeedMultiplier: KILLBOX_PHASE_OBSTACLE_SPEED_MULTIPLIER,
    };
  }

  if (survivalTimeSeconds >= TARGET_FIRST_DEATH_SECONDS) {
    return {
      phaseId: 'breakthrough',
      spawnDelayMultiplier: BREAKTHROUGH_PHASE_SPAWN_DELAY_MULTIPLIER,
      obstacleSpeedMultiplier: BREAKTHROUGH_PHASE_OBSTACLE_SPEED_MULTIPLIER,
    };
  }

  return {
    phaseId: 'opening',
    spawnDelayMultiplier: 1,
    obstacleSpeedMultiplier: 1,
  };
};

export const getSpawnDelayMs = (survivalTimeSeconds: number): number =>
  clamp(
    (INITIAL_SPAWN_DELAY_MS - survivalTimeSeconds * 8) *
      getRunPhasePressureProfile(survivalTimeSeconds).spawnDelayMultiplier,
    MIN_SPAWN_DELAY_MS,
    INITIAL_SPAWN_DELAY_MS,
  );

export const getObstacleSpeed = (survivalTimeSeconds: number): number =>
  clamp(
    (survivalTimeSeconds <= 10
      ? 145 + survivalTimeSeconds * 3.8
      : survivalTimeSeconds <= 20
        ? 183 + (survivalTimeSeconds - 10) * 3.4
        : 217 + (survivalTimeSeconds - 20) * 3.62) *
      getRunPhasePressureProfile(survivalTimeSeconds).obstacleSpeedMultiplier,
    145,
    320,
  );

export const getObstacleVariant = ({
  survivalTimeSeconds,
  runSpawnCount,
}: {
  survivalTimeSeconds: number;
  runSpawnCount: number;
}): ObstacleVariant =>
  survivalTimeSeconds >= DRIFT_OBSTACLE_UNLOCK_SECONDS &&
  runSpawnCount > 0 &&
  runSpawnCount % DRIFT_OBSTACLE_CADENCE === 0
    ? 'drift'
    : survivalTimeSeconds >= ECHO_OBSTACLE_UNLOCK_SECONDS &&
  runSpawnCount > 0 &&
  runSpawnCount % ECHO_OBSTACLE_CADENCE === 0
    ? 'echo'
    : isKillboxEchoHandoffWindow(survivalTimeSeconds) ||
        isKillboxEchoBridgeWindow(survivalTimeSeconds) ||
        isKillboxEchoFollowThroughWindow(survivalTimeSeconds)
      ? 'echo'
    : survivalTimeSeconds >= LEAD_OBSTACLE_UNLOCK_SECONDS &&
  survivalTimeSeconds < KILLBOX_FORCED_LEAD_WINDOW_END_SECONDS
      ? 'lead'
    : survivalTimeSeconds >= LEAD_OBSTACLE_UNLOCK_SECONDS &&
  runSpawnCount > 0 &&
  runSpawnCount % LEAD_OBSTACLE_CADENCE === 0
      ? 'lead'
    : survivalTimeSeconds >= STRAFE_OBSTACLE_UNLOCK_SECONDS &&
  runSpawnCount > 0 &&
  runSpawnCount % STRAFE_OBSTACLE_CADENCE === 0
      ? 'strafe'
    : survivalTimeSeconds >= SURGE_OBSTACLE_UNLOCK_SECONDS &&
        runSpawnCount > 0 &&
        runSpawnCount % SURGE_OBSTACLE_CADENCE === 0
      ? 'surge'
      : 'standard';

export const getObstacleSpeedMultiplier = (variant: ObstacleVariant): number =>
  variant === 'surge' ? SURGE_OBSTACLE_SPEED_MULTIPLIER : 1;

export const getObstacleTint = (variant: ObstacleVariant): number | null =>
  variant === 'surge'
    ? SURGE_OBSTACLE_TINT
    : variant === 'strafe'
      ? STRAFE_OBSTACLE_TINT
    : variant === 'lead'
      ? LEAD_OBSTACLE_TINT
    : variant === 'echo'
      ? ECHO_OBSTACLE_TINT
      : variant === 'drift'
        ? DRIFT_OBSTACLE_TINT
        : null;

const normalize = (point: Point): Point => {
  const magnitude = Math.hypot(point.x, point.y);

  if (magnitude === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: point.x / magnitude,
    y: point.y / magnitude,
  };
};

const rotate = (point: Point, degrees: number): Point => {
  const radians = (degrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  };
};

export const getObstacleTravelDirection = ({
  spawnPoint,
  targetPoint,
  playerVelocity,
  survivalTimeSeconds,
  variant,
  runSpawnCount,
}: {
  spawnPoint: Point;
  targetPoint: Point;
  playerVelocity?: Point;
  survivalTimeSeconds?: number;
  variant: ObstacleVariant;
  runSpawnCount: number;
}): Point => {
  const baseDirection = normalize({
    x: targetPoint.x - spawnPoint.x,
    y: targetPoint.y - spawnPoint.y,
  });

  if (variant === 'strafe') {
    const movementDirection =
      playerVelocity && (playerVelocity.x !== 0 || playerVelocity.y !== 0)
        ? normalize(playerVelocity)
        : null;
    const crossProduct =
      movementDirection === null
        ? 0
        : baseDirection.x * movementDirection.y - baseDirection.y * movementDirection.x;
    const rotationDegrees =
      crossProduct === 0
        ? Math.floor(runSpawnCount / STRAFE_OBSTACLE_CADENCE) % 2 === 0
          ? STRAFE_OBSTACLE_ROTATION_DEGREES
          : -STRAFE_OBSTACLE_ROTATION_DEGREES
        : crossProduct > 0
          ? -STRAFE_OBSTACLE_ROTATION_DEGREES
          : STRAFE_OBSTACLE_ROTATION_DEGREES;

    return normalize(rotate(baseDirection, rotationDegrees));
  }

  if (
    variant === 'lead' &&
    survivalTimeSeconds !== undefined &&
    survivalTimeSeconds < KILLBOX_FORCED_LEAD_WINDOW_END_SECONDS &&
    playerVelocity &&
    (playerVelocity.x !== 0 || playerVelocity.y !== 0)
  ) {
    const movementDirection = normalize(playerVelocity);
    const crossProduct =
      baseDirection.x * movementDirection.y - baseDirection.y * movementDirection.x;
    const rotationDegrees =
      crossProduct === 0
        ? Math.floor(runSpawnCount / LEAD_OBSTACLE_CADENCE) % 2 === 0
          ? KILLBOX_FORCED_LEAD_CUT_ROTATION_DEGREES
          : -KILLBOX_FORCED_LEAD_CUT_ROTATION_DEGREES
        : crossProduct > 0
          ? KILLBOX_FORCED_LEAD_CUT_ROTATION_DEGREES
          : -KILLBOX_FORCED_LEAD_CUT_ROTATION_DEGREES;

    return normalize(rotate(baseDirection, rotationDegrees));
  }

  if (
    variant === 'echo' &&
    survivalTimeSeconds !== undefined &&
    (isKillboxEchoFollowThroughWindow(survivalTimeSeconds) ||
      isKillboxEchoBridgeWindow(survivalTimeSeconds) ||
      isKillboxEchoCadenceWindow(survivalTimeSeconds)) &&
    playerVelocity &&
    (playerVelocity.x !== 0 || playerVelocity.y !== 0)
  ) {
    const movementDirection = normalize(playerVelocity);
    const crossProduct =
      baseDirection.x * movementDirection.y - baseDirection.y * movementDirection.x;
    const echoRotationDegrees = isKillboxEchoFollowThroughWindow(survivalTimeSeconds)
      ? KILLBOX_ECHO_FOLLOW_THROUGH_ROTATION_DEGREES
      : isKillboxEchoBridgeWindow(survivalTimeSeconds)
        ? KILLBOX_ECHO_BRIDGE_ROTATION_DEGREES
        : isKillboxEchoHandoffWindow(survivalTimeSeconds)
          ? KILLBOX_ECHO_HANDOFF_ROTATION_DEGREES
          : KILLBOX_ECHO_CADENCE_ROTATION_DEGREES;
    const rotationDegrees =
      crossProduct === 0
        ? Math.floor(runSpawnCount / ECHO_OBSTACLE_CADENCE) % 2 === 0
          ? -echoRotationDegrees
          : echoRotationDegrees
        : crossProduct > 0
          ? -echoRotationDegrees
          : echoRotationDegrees;

    return normalize(rotate(baseDirection, rotationDegrees));
  }

  if (variant !== 'drift') {
    return baseDirection;
  }

  if (
    survivalTimeSeconds !== undefined &&
    isDriftReleaseWindow(survivalTimeSeconds) &&
    playerVelocity &&
    (playerVelocity.x !== 0 || playerVelocity.y !== 0)
  ) {
    const movementDirection = normalize(playerVelocity);
    const crossProduct =
      baseDirection.x * movementDirection.y - baseDirection.y * movementDirection.x;
    const rotationDegrees =
      crossProduct === 0
        ? Math.floor(runSpawnCount / DRIFT_OBSTACLE_CADENCE) % 2 === 0
          ? DRIFT_RELEASE_ROTATION_DEGREES
          : -DRIFT_RELEASE_ROTATION_DEGREES
        : crossProduct > 0
          ? DRIFT_RELEASE_ROTATION_DEGREES
          : -DRIFT_RELEASE_ROTATION_DEGREES;

    return normalize(rotate(baseDirection, rotationDegrees));
  }

  const rotationDegrees =
    Math.floor(runSpawnCount / DRIFT_OBSTACLE_CADENCE) % 2 === 0
      ? DRIFT_OBSTACLE_ROTATION_DEGREES
      : -DRIFT_OBSTACLE_ROTATION_DEGREES;

  return normalize(rotate(baseDirection, rotationDegrees));
};

export const getRequiredSpawnDistance = (survivalTimeSeconds: number): number =>
  clamp(
    210 -
      survivalTimeSeconds * 7 +
      (survivalTimeSeconds <= OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS
        ? OPENING_REQUIRED_SPAWN_DISTANCE_BONUS
        : 0),
    140,
    370,
  );

export const getSpawnTargetLagSeconds = (survivalTimeSeconds: number): number =>
  survivalTimeSeconds <= EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS
    ? EARLY_SPAWN_TARGET_LAG_SECONDS
    : 0;

export const getObstacleTargetLagSeconds = ({
  survivalTimeSeconds,
  variant,
}: {
  survivalTimeSeconds: number;
  variant: ObstacleVariant;
}): number =>
  variant === 'lead'
    ? -(
        survivalTimeSeconds < KILLBOX_FORCED_LEAD_WINDOW_END_SECONDS
          ? KILLBOX_FORCED_LEAD_TARGET_LEAD_SECONDS
          : LEAD_OBSTACLE_TARGET_LEAD_SECONDS
      )
    : variant === 'echo'
    ? Math.max(getSpawnTargetLagSeconds(survivalTimeSeconds), ECHO_OBSTACLE_TARGET_LAG_SECONDS)
    : variant === 'drift' && isDriftReleaseWindow(survivalTimeSeconds)
      ? ECHO_OBSTACLE_TARGET_LAG_SECONDS
    : getSpawnTargetLagSeconds(survivalTimeSeconds);

export const getSpawnCollisionGraceMs = (survivalTimeSeconds: number): number =>
  survivalTimeSeconds <= EARLY_SPAWN_COLLISION_GRACE_FADE_START_SECONDS
    ? EARLY_SPAWN_COLLISION_GRACE_MS
    : survivalTimeSeconds >= EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS
      ? 0
      : Math.round(
          EARLY_SPAWN_COLLISION_GRACE_MS *
            ((EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS - survivalTimeSeconds) /
              (EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS -
                EARLY_SPAWN_COLLISION_GRACE_FADE_START_SECONDS)),
        );

export const hasReachedSurvivalGoal = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= SURVIVAL_GOAL_SECONDS;

export const hasReachedFirstDeathTarget = (survivalTimeSeconds: number): boolean =>
  survivalTimeSeconds >= TARGET_FIRST_DEATH_SECONDS;
