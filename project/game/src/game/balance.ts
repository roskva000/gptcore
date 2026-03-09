export const INITIAL_SPAWN_DELAY_MS = 1050;
export const FIRST_SPAWN_DELAY_MS = 900;
export const MIN_SPAWN_DELAY_MS = 320;
export const TARGET_FIRST_DEATH_SECONDS = 10;
export const EARLY_SPAWN_TARGET_LAG_SECONDS = 0.18;
export const EARLY_SPAWN_TARGET_LAG_CUTOFF_SECONDS = 10;
export const EARLY_SPAWN_COLLISION_GRACE_MS = 260;
export const EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS = 10;
export const OPENING_REQUIRED_SPAWN_DISTANCE_BONUS = 160;
export const OPENING_REQUIRED_SPAWN_DISTANCE_CUTOFF_SECONDS = 6;

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
        : 217 + (survivalTimeSeconds - 20) * 3.6,
    145,
    320,
  );

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
  survivalTimeSeconds <= EARLY_SPAWN_COLLISION_GRACE_CUTOFF_SECONDS
    ? EARLY_SPAWN_COLLISION_GRACE_MS
    : 0;
