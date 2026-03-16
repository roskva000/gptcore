import {
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  ECHO_OBSTACLE_UNLOCK_SECONDS,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  STRAFE_OBSTACLE_UNLOCK_SECONDS,
  SURGE_OBSTACLE_UNLOCK_SECONDS,
  SURVIVAL_GOAL_SECONDS,
  TARGET_FIRST_DEATH_SECONDS,
} from './balance.ts';

type RunHorizonBeat = {
  label: string;
  seconds: number;
};

const RUN_HORIZON_BEATS: RunHorizonBeat[] = [
  { seconds: TARGET_FIRST_DEATH_SECONDS, label: 'gate' },
  { seconds: STRAFE_OBSTACLE_UNLOCK_SECONDS, label: 'strafe' },
  { seconds: SURGE_OBSTACLE_UNLOCK_SECONDS, label: 'surge' },
  { seconds: LEAD_OBSTACLE_UNLOCK_SECONDS, label: 'lead' },
  { seconds: ECHO_OBSTACLE_UNLOCK_SECONDS, label: 'echo' },
  { seconds: DRIFT_OBSTACLE_UNLOCK_SECONDS, label: 'drift' },
  { seconds: SURVIVAL_GOAL_SECONDS, label: 'clear' },
];

const formatBeat = (beat: RunHorizonBeat): string => `${beat.seconds}s ${beat.label}`;

export const getRunHorizonText = (progressSeconds: number): string => {
  const unlockedBeats = RUN_HORIZON_BEATS.filter((beat) => progressSeconds >= beat.seconds);
  const upcomingBeats = RUN_HORIZON_BEATS.filter((beat) => progressSeconds < beat.seconds);

  if (unlockedBeats.length === 0) {
    return [
      `Fresh run. Break ${TARGET_FIRST_DEATH_SECONDS}s to open the ladder.`,
      `Next: ${upcomingBeats.slice(0, 3).map(formatBeat).join(' -> ')}`,
    ].join('\n');
  }

  if (upcomingBeats.length === 0) {
    return [
      `All beats live: ${unlockedBeats.slice(1).map((beat) => beat.label).join(', ')}.`,
      `Next: push past ${SURVIVAL_GOAL_SECONDS}s and extend the run.`,
    ].join('\n');
  }

  return [
    `Unlocked: ${unlockedBeats.map(formatBeat).join(' | ')}`,
    `Next: ${upcomingBeats.slice(0, 3).map(formatBeat).join(' -> ')}`,
  ].join('\n');
};

export const getNextRunHorizonBeatText = (progressSeconds: number): string => {
  const nextBeat = RUN_HORIZON_BEATS.find((beat) => progressSeconds < beat.seconds);

  if (!nextBeat) {
    return `Next beat: all live, push past ${SURVIVAL_GOAL_SECONDS}s.`;
  }

  return `Next beat: ${formatBeat(nextBeat)}`;
};
