import { getRequiredSpawnDistance } from './balance.ts';

export const ARENA_WIDTH = 800;
export const ARENA_HEIGHT = 600;
export const SPAWN_MARGIN = 56;
export const MAX_SPAWN_REROLLS = 6;
export const OFFSCREEN_CULL_MARGIN = 96;

export type Point = {
  x: number;
  y: number;
};

type SpawnSelectionParams = {
  survivalTimeSeconds: number;
  playerPosition: Point;
  randomInt: (min: number, max: number) => number;
};

export const getSpawnFairnessScore = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  spawnPoint: Point,
): number => {
  const requiredDistance = getRequiredSpawnDistance(survivalTimeSeconds);
  const dx = spawnPoint.x - playerPosition.x;
  const dy = spawnPoint.y - playerPosition.y;
  const actualDistance = Math.hypot(dx, dy);

  return actualDistance - requiredDistance;
};

export const rollSpawnPoint = (randomInt: (min: number, max: number) => number): Point => {
  const edge = randomInt(0, 3);

  if (edge === 0) {
    return { x: randomInt(0, ARENA_WIDTH), y: -SPAWN_MARGIN };
  }

  if (edge === 1) {
    return { x: ARENA_WIDTH + SPAWN_MARGIN, y: randomInt(0, ARENA_HEIGHT) };
  }

  if (edge === 2) {
    return { x: randomInt(0, ARENA_WIDTH), y: ARENA_HEIGHT + SPAWN_MARGIN };
  }

  return { x: -SPAWN_MARGIN, y: randomInt(0, ARENA_HEIGHT) };
};

export const isPointInsideArena = (point: Point): boolean =>
  point.x >= 0 && point.x <= ARENA_WIDTH && point.y >= 0 && point.y <= ARENA_HEIGHT;

export const isPointOutsideCullBounds = (point: Point): boolean =>
  point.x < -OFFSCREEN_CULL_MARGIN ||
  point.x > ARENA_WIDTH + OFFSCREEN_CULL_MARGIN ||
  point.y < -OFFSCREEN_CULL_MARGIN ||
  point.y > ARENA_HEIGHT + OFFSCREEN_CULL_MARGIN;

export const selectSpawnPoint = ({
  survivalTimeSeconds,
  playerPosition,
  randomInt,
}: SpawnSelectionParams): { point: Point; rerollsUsed: number } => {
  let selectedSpawnPoint = rollSpawnPoint(randomInt);
  let bestScore = getSpawnFairnessScore(survivalTimeSeconds, playerPosition, selectedSpawnPoint);

  if (bestScore >= 0) {
    return { point: selectedSpawnPoint, rerollsUsed: 0 };
  }

  let rerollsUsed = 0;

  for (let attempt = 0; attempt < MAX_SPAWN_REROLLS; attempt += 1) {
    rerollsUsed += 1;

    const candidate = rollSpawnPoint(randomInt);
    const candidateScore = getSpawnFairnessScore(survivalTimeSeconds, playerPosition, candidate);

    if (candidateScore > bestScore) {
      selectedSpawnPoint = candidate;
      bestScore = candidateScore;
    }

    if (candidateScore >= 0) {
      return { point: candidate, rerollsUsed };
    }
  }

  return { point: selectedSpawnPoint, rerollsUsed };
};
