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

export type ObstacleVariant = 'standard' | 'surge';

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const getSpawnDelayMs = (survivalTimeSeconds: number): number =>
  clamp(
    INITIAL_SPAWN_DELAY_MS - survivalTimeSeconds * 8,
    MIN_SPAWN_DELAY_MS,
    INITIAL_SPAWN_DELAY_MS,
  );

export const getObstacleSpeed = (survivalTimeSeconds: number): number =>
  clamp(
    survivalTimeSeconds <= 10
      ? 145 + survivalTimeSeconds * 3.8
      : survivalTimeSeconds <= 20
        ? 183 + (survivalTimeSeconds - 10) * 3.4
        : 217 + (survivalTimeSeconds - 20) * 3.62,
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
  survivalTimeSeconds >= SURGE_OBSTACLE_UNLOCK_SECONDS &&
  runSpawnCount > 0 &&
  runSpawnCount % SURGE_OBSTACLE_CADENCE === 0
    ? 'surge'
    : 'standard';

export const getObstacleSpeedMultiplier = (variant: ObstacleVariant): number =>
  variant === 'surge' ? SURGE_OBSTACLE_SPEED_MULTIPLIER : 1;

export const getObstacleTint = (variant: ObstacleVariant): number | null =>
  variant === 'surge' ? SURGE_OBSTACLE_TINT : null;

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
