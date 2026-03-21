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

export type RunPhaseShiftAnnouncement = {
  body: string;
  title: string;
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
    detail: 'Cadence tightens and strafe/surge wake up. Snap into open space before lead wakes up.',
  },
  {
    id: 'killbox',
    title: 'KILLBOX',
    startSeconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    accentColor: 0xff9eb1,
    detail:
      'Lead cuts hit first, shadow echoes keep scissoring the lane into 24s echo lock-in, then echo cadence keeps folding the lane while speed pins straight escapes. Break your line late and escape sideways.',
  },
  {
    id: 'endgame',
    title: 'ENDGAME DRIFT',
    startSeconds: DRIFT_OBSTACLE_UNLOCK_SECONDS,
    accentColor: 0xc8ff9a,
    detail:
      'Killbox fold releases sideways, then drift keeps bending the lane into a wider lateral sweep. Stretch the release lane and push for 60s.',
  },
  {
    id: 'overtime',
    title: 'OVERTIME',
    startSeconds: SURVIVAL_GOAL_SECONDS,
    accentColor: 0xfff0c7,
    detail: 'The goal is cleared but pressure stays hot. Push your best and keep the lane alive.',
  },
];

const formatRangeLabel = (phase: RunPhaseDefinition, nextPhase: RunPhaseDefinition | null): string => {
  if (nextPhase === null) {
    return `${phase.startSeconds}s+`;
  }

  return `${phase.startSeconds}-${nextPhase.startSeconds}s`;
};

const RUN_PHASE_ONSET_DURATION_SECONDS = 1.6;

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

export const getRunPhaseReachedBadgeText = (progressSeconds: number): string | null => {
  const { currentPhase } = getRunPhaseState(progressSeconds);

  switch (currentPhase.id) {
    case 'breakthrough':
      return 'BREAKTHROUGH';
    case 'killbox':
      return 'KILLBOX';
    case 'endgame':
      return 'ENDGAME';
    case 'overtime':
      return 'OVERTIME';
    default:
      return null;
  }
};

export const getRunPhaseDeathSummaryText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase, secondsUntilNextPhase } = getRunPhaseState(progressSeconds);

  if (nextPhase === null || secondsUntilNextPhase === null) {
    return `${currentPhase.title} reached. ${SURVIVAL_GOAL_SECONDS}s clear is banked.`;
  }

  if (currentPhase.id === 'opening') {
    return `Opening window snapped. Break ${TARGET_FIRST_DEATH_SECONDS}s to start the ladder.`;
  }

  return `${currentPhase.title} reached. ${secondsUntilNextPhase.toFixed(1)}s short of ${nextPhase.title}.`;
};

export const getRunPhaseRetryGoalText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase, secondsUntilNextPhase } = getRunPhaseState(progressSeconds);

  if (nextPhase === null || secondsUntilNextPhase === null) {
    return `${currentPhase.title} live. Push past ${SURVIVAL_GOAL_SECONDS}s.`;
  }

  return `Reach ${nextPhase.title} in +${secondsUntilNextPhase.toFixed(1)}s`;
};

export const getRunPhaseTimelineText = (progressSeconds: number): string => {
  const { currentPhase } = getRunPhaseState(progressSeconds);
  return [
    `${formatRangeLabel(RUN_PHASES[0], RUN_PHASES[1])} ${RUN_PHASES[0].title} | ${formatRangeLabel(RUN_PHASES[1], RUN_PHASES[2])} ${RUN_PHASES[1].title}`,
    `${formatRangeLabel(RUN_PHASES[2], RUN_PHASES[3])} ${RUN_PHASES[2].title} | ${formatRangeLabel(RUN_PHASES[3], RUN_PHASES[4])} ${RUN_PHASES[3].title}`,
    `${formatRangeLabel(RUN_PHASES[4], null)} ${RUN_PHASES[4].title} | Best reached: ${currentPhase.title}`,
  ].join('\n');
};

export const getRunPhaseShiftAnnouncement = (
  phaseId: RunPhaseId,
): RunPhaseShiftAnnouncement | null => {
  switch (phaseId) {
    case 'breakthrough':
      return {
        title: 'BREAKTHROUGH LIVE',
        body: 'Gate broken. The arena heats up and strafe/surge pressure starts stacking.',
      };
    case 'killbox':
      return {
        title: 'KILLBOX LIVE',
        body: 'A hard lead cut opens the trap, shadow echoes fold the lane into 24s echo lock-in, then the live echo cadence keeps the trap folding while speed pins straight escapes.',
      };
    case 'endgame':
      return {
        title: 'ENDGAME DRIFT LIVE',
        body:
          'Killbox releases sideways into drift. The first bend opens a new lateral lane, then the sweep keeps stretching the arena late.',
      };
    case 'overtime':
      return {
        title: 'OVERTIME LIVE',
        body: 'The goal is cleared, but the arena stays hot. Push the run past your best.',
      };
    default:
      return null;
  }
};

export const getRunPhaseOnsetIntensity = (
  progressSeconds: number,
  phaseId: RunPhaseId,
): number => {
  if (phaseId === 'opening') {
    return 0;
  }

  const phase = RUN_PHASES.find((candidate) => candidate.id === phaseId);

  if (!phase) {
    return 0;
  }

  const elapsedSincePhaseStart = Math.max(progressSeconds - phase.startSeconds, 0);

  if (elapsedSincePhaseStart > RUN_PHASE_ONSET_DURATION_SECONDS) {
    return 0;
  }

  return 1 - elapsedSincePhaseStart / RUN_PHASE_ONSET_DURATION_SECONDS;
};
