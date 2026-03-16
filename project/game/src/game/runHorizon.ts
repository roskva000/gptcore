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

export type RunBeatAnnouncement = {
  label: string;
  title: string;
  body: string;
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

const RUN_BEAT_ANNOUNCEMENTS: Record<string, RunBeatAnnouncement> = {
  strafe: {
    label: 'strafe',
    title: 'STRAFE LIVE',
    body: 'Cross-lane cuts are online. Break the sweep.',
  },
  surge: {
    label: 'surge',
    title: 'SURGE LIVE',
    body: 'Fast pressure just woke up. Keep open space.',
  },
  lead: {
    label: 'lead',
    title: 'LEAD LIVE',
    body: 'Predictive cuts are online. Snap out of straight lines.',
  },
  echo: {
    label: 'echo',
    title: 'ECHO LIVE',
    body: 'Lagging copies are online. Reroute late and clean.',
  },
  drift: {
    label: 'drift',
    title: 'DRIFT LIVE',
    body: 'Late-run drift is online. Stretch the lane.',
  },
};

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

export const getRunBeatAnnouncement = (
  progressSeconds: number,
): RunBeatAnnouncement | null => {
  for (let index = RUN_HORIZON_BEATS.length - 1; index >= 0; index -= 1) {
    const beat = RUN_HORIZON_BEATS[index];

    if (progressSeconds < beat.seconds) {
      continue;
    }

    return RUN_BEAT_ANNOUNCEMENTS[beat.label] ?? null;
  }

  return null;
};
