import { getRequiredSpawnDistance } from './balance.ts';

export const ARENA_WIDTH = 800;
export const ARENA_HEIGHT = 600;
export const SPAWN_MARGIN = 56;
export const MAX_SPAWN_REROLLS = 6;
export const OFFSCREEN_CULL_MARGIN = 96;
export const EARLY_FORWARD_SPAWN_REROLL_CUTOFF_SECONDS = 6;
export const EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD = 0.5;
export const EARLY_FORWARD_SPAWN_ALIGNMENT_PENALTY = 80;

export type Point = {
  x: number;
  y: number;
};

type SpawnSelectionParams = {
  survivalTimeSeconds: number;
  playerPosition: Point;
  playerVelocity?: Point;
  randomInt: (min: number, max: number) => number;
};

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

const getForwardSpawnPenalty = (
  survivalTimeSeconds: number,
  playerPosition: Point,
  playerVelocity: Point | undefined,
  spawnPoint: Point,
): number => {
  if (
    survivalTimeSeconds > EARLY_FORWARD_SPAWN_REROLL_CUTOFF_SECONDS ||
    !playerVelocity ||
    (playerVelocity.x === 0 && playerVelocity.y === 0)
  ) {
    return 0;
  }

  const movementDirection = normalize(playerVelocity);
  const spawnDirection = normalize({
    x: spawnPoint.x - playerPosition.x,
    y: spawnPoint.y - playerPosition.y,
  });
  const alignment = movementDirection.x * spawnDirection.x + movementDirection.y * spawnDirection.y;

  if (alignment <= EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD) {
    return 0;
  }

  return (alignment - EARLY_FORWARD_SPAWN_ALIGNMENT_THRESHOLD) * EARLY_FORWARD_SPAWN_ALIGNMENT_PENALTY;
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
  playerVelocity,
  randomInt,
}: SpawnSelectionParams): { point: Point; rerollsUsed: number } => {
  let selectedSpawnPoint = rollSpawnPoint(randomInt);
  let bestScore =
    getSpawnFairnessScore(survivalTimeSeconds, playerPosition, selectedSpawnPoint) -
    getForwardSpawnPenalty(
      survivalTimeSeconds,
      playerPosition,
      playerVelocity,
      selectedSpawnPoint,
    );

  if (bestScore >= 0) {
    return { point: selectedSpawnPoint, rerollsUsed: 0 };
  }

  let rerollsUsed = 0;

  for (let attempt = 0; attempt < MAX_SPAWN_REROLLS; attempt += 1) {
    rerollsUsed += 1;

    const candidate = rollSpawnPoint(randomInt);
    const candidateScore =
      getSpawnFairnessScore(survivalTimeSeconds, playerPosition, candidate) -
      getForwardSpawnPenalty(survivalTimeSeconds, playerPosition, playerVelocity, candidate);

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
