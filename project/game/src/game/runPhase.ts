import {
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  SURVIVAL_GOAL_SECONDS,
  TARGET_FIRST_DEATH_SECONDS,
} from './balance.ts';

export type RunPhaseId = 'opening' | 'breakthrough' | 'killbox' | 'endgame' | 'overtime';

export type RunPhaseDefinition = {
  accentColor: number;
  detail: string;
  id: RunPhaseId;
  startSeconds: number;
  title: string;
};

export type RunPhaseState = {
  currentPhase: RunPhaseDefinition;
  nextPhase: RunPhaseDefinition | null;
  secondsUntilNextPhase: number | null;
};

const RUN_PHASES: RunPhaseDefinition[] = [
  {
    id: 'opening',
    title: 'OPENING WINDOW',
    startSeconds: 0,
    accentColor: 0x7ce8ff,
    detail: 'Break 10s, keep air around you, and wake the ladder clean.',
  },
  {
    id: 'breakthrough',
    title: 'BREAKTHROUGH',
    startSeconds: TARGET_FIRST_DEATH_SECONDS,
    accentColor: 0xffc18a,
    detail: 'Strafe and surge are live. Snap into open space before lead wakes up.',
  },
  {
    id: 'killbox',
    title: 'KILLBOX',
    startSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    accentColor: 0xff9eb1,
    detail: 'Lead and echo punish straight lines. Reroute late and stay unpredictable.',
  },
  {
    id: 'endgame',
    title: 'ENDGAME DRIFT',
    startSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS,
    accentColor: 0xc8ff9a,
    detail: 'Drift is live. Stretch the lane and push the run to 60s clear.',
  },
  {
    id: 'overtime',
    title: 'OVERTIME',
    startSeconds: SURVIVAL_GOAL_SECONDS,
    accentColor: 0xfff0c7,
    detail: 'The namesake goal is down. Push your best and keep the lane alive.',
  },
];

const formatRangeLabel = (phase: RunPhaseDefinition, nextPhase: RunPhaseDefinition | null): string => {
  if (nextPhase === null) {
    return `${phase.startSeconds}s+`;
  }

  return `${phase.startSeconds}-${nextPhase.startSeconds}s`;
};

export const getRunPhaseState = (progressSeconds: number): RunPhaseState => {
  const clampedProgressSeconds = Math.max(progressSeconds, 0);
  let currentIndex = 0;

  for (let index = 0; index < RUN_PHASES.length; index += 1) {
    if (clampedProgressSeconds >= RUN_PHASES[index].startSeconds) {
      currentIndex = index;
    }
  }

  const currentPhase = RUN_PHASES[currentIndex];
  const nextPhase = RUN_PHASES[currentIndex + 1] ?? null;

  return {
    currentPhase,
    nextPhase,
    secondsUntilNextPhase:
      nextPhase === null ? null : Math.max(nextPhase.startSeconds - clampedProgressSeconds, 0),
  };
};

export const getRunPhaseStatusText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase, secondsUntilNextPhase } = getRunPhaseState(progressSeconds);

  if (nextPhase === null || secondsUntilNextPhase === null) {
    return `${currentPhase.title} | Goal cleared`;
  }

  return `${currentPhase.title} | ${secondsUntilNextPhase.toFixed(1)}s to ${nextPhase.title}`;
};

export const getRunPhaseDetailText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase } = getRunPhaseState(progressSeconds);

  if (nextPhase === null) {
    return currentPhase.detail;
  }

  return `${currentPhase.detail} Next phase at ${nextPhase.startSeconds}s.`;
};

export const getRunPhaseSupportText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase } = getRunPhaseState(progressSeconds);

  if (nextPhase === null) {
    return `${currentPhase.title}: ${currentPhase.detail}`;
  }

  return `${currentPhase.title}: ${currentPhase.detail} Next shift ${nextPhase.startSeconds}s.`;
};

export const getRunPhaseTimelineText = (progressSeconds: number): string => {
  const { currentPhase } = getRunPhaseState(progressSeconds);
  return [
    `${formatRangeLabel(RUN_PHASES[0], RUN_PHASES[1])} ${RUN_PHASES[0].title} | ${formatRangeLabel(RUN_PHASES[1], RUN_PHASES[2])} ${RUN_PHASES[1].title}`,
    `${formatRangeLabel(RUN_PHASES[2], RUN_PHASES[3])} ${RUN_PHASES[2].title} | ${formatRangeLabel(RUN_PHASES[3], RUN_PHASES[4])} ${RUN_PHASES[3].title}`,
    `${formatRangeLabel(RUN_PHASES[4], null)} ${RUN_PHASES[4].title} | Best reached: ${currentPhase.title}`,
  ].join('\n');
};
