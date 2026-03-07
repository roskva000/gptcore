import {
  FIRST_SPAWN_DELAY_MS,
  getObstacleSpeed,
  getRequiredSpawnDistance,
  getSpawnDelayMs,
  TARGET_FIRST_DEATH_SECONDS,
} from '../src/game/balance.ts';

const SAMPLE_TIMES_SECONDS = [0, 5, 10, 15, 20, 30, 45, 60];
const SPAWN_COUNT_LIMITS_SECONDS = [10, 30, 60];

type SpawnSimulation = {
  spawnTimes: number[];
  firstSpawnAt: number;
};

const round = (value: number): number => Number(value.toFixed(1));

const simulateSpawns = (limitSeconds: number): SpawnSimulation => {
  const spawnTimes: number[] = [];
  let nextSpawnAtSeconds = FIRST_SPAWN_DELAY_MS / 1000;

  while (nextSpawnAtSeconds <= limitSeconds) {
    spawnTimes.push(round(nextSpawnAtSeconds));
    nextSpawnAtSeconds += getSpawnDelayMs(nextSpawnAtSeconds) / 1000;
  }

  return {
    spawnTimes,
    firstSpawnAt: FIRST_SPAWN_DELAY_MS / 1000,
  };
};

const longestLimit = Math.max(...SPAWN_COUNT_LIMITS_SECONDS);
const simulated = simulateSpawns(longestLimit);

const spawnCounts = SPAWN_COUNT_LIMITS_SECONDS.map((limitSeconds) => ({
  seconds: limitSeconds,
  count: simulated.spawnTimes.filter((spawnAt) => spawnAt <= limitSeconds).length,
}));

const report = {
  targetFirstDeathSeconds: TARGET_FIRST_DEATH_SECONDS,
  firstSpawnAtSeconds: simulated.firstSpawnAt,
  balanceCurve: SAMPLE_TIMES_SECONDS.map((seconds) => ({
    seconds,
    spawnDelayMs: Math.round(getSpawnDelayMs(seconds)),
    obstacleSpeed: Math.round(getObstacleSpeed(seconds)),
    requiredSpawnDistance: Math.round(getRequiredSpawnDistance(seconds)),
  })),
  spawnCounts,
  firstTenSpawnTimes: simulated.spawnTimes.slice(0, 10),
};

console.log(JSON.stringify(report, null, 2));
