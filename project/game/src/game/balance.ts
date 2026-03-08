export const INITIAL_SPAWN_DELAY_MS = 1050;
export const FIRST_SPAWN_DELAY_MS = 900;
export const MIN_SPAWN_DELAY_MS = 320;
export const TARGET_FIRST_DEATH_SECONDS = 10;

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
        ? 183 + (survivalTimeSeconds - 10) * 3.3
        : 216 + (survivalTimeSeconds - 20) * 3.5,
    145,
    320,
  );

export const getRequiredSpawnDistance = (survivalTimeSeconds: number): number =>
  clamp(210 - survivalTimeSeconds * 7, 140, 210);
