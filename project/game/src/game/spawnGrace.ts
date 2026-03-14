export const SPAWN_GRACE_INITIAL_ALPHA = 0.58;
export const SPAWN_GRACE_INITIAL_SCALE = 0.88;
export const SPAWN_GRACE_INITIAL_TINT = 0xffd6cf;
export const SPAWN_GRACE_DEPTH = 1.5;
export const COLLISION_READY_OBSTACLE_DEPTH = 2;

export const getSpawnGraceVisualState = (
  collisionReady: boolean,
): {
  alpha: number;
  scale: number;
  tint: number | null;
} =>
  collisionReady
    ? {
        alpha: 1,
        scale: 1,
        tint: null,
      }
    : {
        alpha: SPAWN_GRACE_INITIAL_ALPHA,
        scale: SPAWN_GRACE_INITIAL_SCALE,
        tint: SPAWN_GRACE_INITIAL_TINT,
      };

export const getObstacleDepth = (collisionReady: boolean): number =>
  collisionReady ? COLLISION_READY_OBSTACLE_DEPTH : SPAWN_GRACE_DEPTH;
