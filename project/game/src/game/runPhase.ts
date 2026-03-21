import {
  DRIFT_AFTERSHOCK_WINDOW_SECONDS,
  DRIFT_CLEAR_CLIMB_ASCENT_WINDOW_END_SECONDS,
  DRIFT_CLEAR_CLIMB_WINDOW_START_SECONDS,
  DRIFT_PRECLEAR_WINDOW_SECONDS,
  DRIFT_RECENTER_WINDOW_SECONDS,
  DRIFT_RELEASE_WINDOW_SECONDS,
  DRIFT_SWEEP_WINDOW_START_SECONDS,
  DRIFT_SWEEP_WINDOW_SECONDS,
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  DRIFT_REBOUND_WINDOW_SECONDS,
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

export type EndgameDriftCueId =
  | 'release'
  | 'rebound'
  | 'late-sweep'
  | 'aftershock'
  | 'recenter'
  | 'preclear';

export type EndgameDriftCue = {
  accentColor: number;
  body: string;
  hudLabel: string;
  id: EndgameDriftCueId;
  rematchLabel: string;
  snapshotLabel: string;
  title: string;
};

export type EndgameClearClimbState = {
  accentColor: number;
  body: string;
  hudLabel: string;
  rematchLabel: string;
  snapshotLabel: string;
  threatLabel: string;
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
      'Killbox fold releases sideways, rebounds once, then drift whips the lane through a wider late sweep, an aftershock clamp, a short recenter handoff, and a preclear squeeze before clear climb starts stair-stepping upward and snapping back near the summit. Stretch the release lane and push for 60s.',
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
const DRIFT_REBOUND_WINDOW_START_SECONDS =
  DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_WINDOW_SECONDS;
const DRIFT_REBOUND_WINDOW_END_SECONDS =
  DRIFT_REBOUND_WINDOW_START_SECONDS + DRIFT_REBOUND_WINDOW_SECONDS;
const DRIFT_RELEASE_WINDOW_END_SECONDS =
  DRIFT_OBSTACLE_UNLOCK_SECONDS + DRIFT_RELEASE_WINDOW_SECONDS;
const DRIFT_SWEEP_WINDOW_END_SECONDS =
  DRIFT_SWEEP_WINDOW_START_SECONDS + DRIFT_SWEEP_WINDOW_SECONDS;
const DRIFT_AFTERSHOCK_WINDOW_START_SECONDS =
  DRIFT_SWEEP_WINDOW_END_SECONDS;
const DRIFT_AFTERSHOCK_WINDOW_END_SECONDS =
  DRIFT_AFTERSHOCK_WINDOW_START_SECONDS + DRIFT_AFTERSHOCK_WINDOW_SECONDS;
const DRIFT_RECENTER_WINDOW_START_SECONDS =
  DRIFT_AFTERSHOCK_WINDOW_END_SECONDS;
const DRIFT_RECENTER_WINDOW_END_SECONDS =
  DRIFT_RECENTER_WINDOW_START_SECONDS + DRIFT_RECENTER_WINDOW_SECONDS;
const DRIFT_PRECLEAR_WINDOW_START_SECONDS =
  DRIFT_RECENTER_WINDOW_END_SECONDS;
const DRIFT_PRECLEAR_WINDOW_END_SECONDS =
  DRIFT_PRECLEAR_WINDOW_START_SECONDS + DRIFT_PRECLEAR_WINDOW_SECONDS;

export const ENDGAME_CLEAR_CLIMB_START_SECONDS = DRIFT_CLEAR_CLIMB_WINDOW_START_SECONDS;

export const getEndgameClearClimbState = (
  progressSeconds: number,
): EndgameClearClimbState | null => {
  if (
    progressSeconds < ENDGAME_CLEAR_CLIMB_START_SECONDS ||
    progressSeconds >= SURVIVAL_GOAL_SECONDS
  ) {
    return null;
  }

  const secondsToClear = Math.max(SURVIVAL_GOAL_SECONDS - progressSeconds, 0);
  const inSummitSnapWindow = progressSeconds >= DRIFT_CLEAR_CLIMB_ASCENT_WINDOW_END_SECONDS;

  return {
    title: inSummitSnapWindow ? 'SUMMIT SNAP LIVE' : 'ASCENT STAIR LIVE',
    hudLabel: inSummitSnapWindow ? 'SUMMIT SNAP' : 'ASCENT STAIR',
    accentColor: inSummitSnapWindow ? 0xff9eb1 : 0xfff0c7,
    snapshotLabel: 'CLEAR CLIMB',
    rematchLabel: 'the clear climb',
    threatLabel: inSummitSnapWindow ? 'SUMMIT SNAP' : 'ASCENT STAIR',
    body: inSummitSnapWindow
      ? `The summit snap is live. Drift whips back across the opened lane while ${secondsToClear.toFixed(1)}s remain; keep the route alive and finish the ${SURVIVAL_GOAL_SECONDS}s clear under the snapback.`
      : `Preclear squeeze gives way to an ascent stair. Drift keeps stair-stepping up the release lane for ${secondsToClear.toFixed(1)}s more; hold the climb and carry the run clean into ${SURVIVAL_GOAL_SECONDS}s.`,
  };
};

export const getEndgameDriftCue = (progressSeconds: number): EndgameDriftCue | null => {
  if (progressSeconds < DRIFT_OBSTACLE_UNLOCK_SECONDS || progressSeconds >= SURVIVAL_GOAL_SECONDS) {
    return null;
  }

  if (progressSeconds < DRIFT_RELEASE_WINDOW_END_SECONDS) {
    return {
      id: 'release',
      title: 'RELEASE CUT LIVE',
      hudLabel: 'RELEASE LIVE',
      snapshotLabel: 'RELEASE CUT',
      rematchLabel: 'the release cut',
      accentColor: 0x7ce8ff,
      body: 'Killbox opens sideways here. Stretch the release lane before the rebound clamps onto the same answer.',
    };
  }

  if (progressSeconds < DRIFT_REBOUND_WINDOW_END_SECONDS) {
    return {
      id: 'rebound',
      title: 'REBOUND LIVE',
      hudLabel: 'REBOUND LIVE',
      snapshotLabel: 'REBOUND',
      rematchLabel: 'the rebound hold',
      accentColor: 0xc8ff9a,
      body: 'The first rebound stays on the release side. Hold the opened lane before the wider sweep flips back across it.',
    };
  }

  if (progressSeconds >= DRIFT_SWEEP_WINDOW_START_SECONDS && progressSeconds < DRIFT_SWEEP_WINDOW_END_SECONDS) {
    return {
      id: 'late-sweep',
      title: 'LATE SWEEP LIVE',
      hudLabel: 'LATE SWEEP LIVE',
      snapshotLabel: 'LATE SWEEP',
      rematchLabel: 'the late sweep snapback',
      accentColor: 0xfff0c7,
      body: 'The late sweep whips back across the arena. Read the cross-lane turn and keep the run alive through the snapback.',
    };
  }

  if (
    progressSeconds >= DRIFT_AFTERSHOCK_WINDOW_START_SECONDS &&
    progressSeconds < DRIFT_AFTERSHOCK_WINDOW_END_SECONDS
  ) {
    return {
      id: 'aftershock',
      title: 'AFTERSHOCK HOLD LIVE',
      hudLabel: 'AFTERSHOCK LIVE',
      snapshotLabel: 'AFTERSHOCK HOLD',
      rematchLabel: 'the aftershock clamp',
      accentColor: 0xff9eb1,
      body: 'Late sweep does not fully let go. The aftershock clamp stays on the sweep side and tries to pin the escape lane one beat longer.',
    };
  }

  if (
    progressSeconds >= DRIFT_RECENTER_WINDOW_START_SECONDS &&
    progressSeconds < DRIFT_RECENTER_WINDOW_END_SECONDS
  ) {
    return {
      id: 'recenter',
      title: 'RECENTER LIVE',
      hudLabel: 'RECENTER LIVE',
      snapshotLabel: 'RECENTER',
      rematchLabel: 'the recenter handoff',
      accentColor: 0x7ce8ff,
      body: 'Aftershock finally loosens, but drift still leans across the sweep lane long enough to hand the run into the 40s instead of snapping straight back to generic cadence.',
    };
  }

  if (
    progressSeconds >= DRIFT_PRECLEAR_WINDOW_START_SECONDS &&
    progressSeconds < DRIFT_PRECLEAR_WINDOW_END_SECONDS
  ) {
    return {
      id: 'preclear',
      title: 'PRECLEAR SQUEEZE LIVE',
      hudLabel: 'PRECLEAR LIVE',
      snapshotLabel: 'PRECLEAR SQUEEZE',
      rematchLabel: 'the preclear squeeze',
      accentColor: 0xd8fff4,
      body: 'Recenter does not settle the lane. Drift folds back toward the reopened side and keeps a bounded squeeze on the run so 45s+ still feels live before the long 60s push.',
    };
  }

  return null;
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
  const endgameCue = currentPhase.id === 'endgame' ? getEndgameDriftCue(progressSeconds) : null;
  const clearClimbState =
    currentPhase.id === 'endgame' ? getEndgameClearClimbState(progressSeconds) : null;

  if (nextPhase === null) {
    return currentPhase.detail;
  }

  if (endgameCue !== null) {
    return `${endgameCue.body} Next phase at ${nextPhase.startSeconds}s.`;
  }

  if (clearClimbState !== null) {
    return `${clearClimbState.body} Next phase at ${nextPhase.startSeconds}s.`;
  }

  return `${currentPhase.detail} Next phase at ${nextPhase.startSeconds}s.`;
};

export const getRunPhaseSupportText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase } = getRunPhaseState(progressSeconds);
  const endgameCue = currentPhase.id === 'endgame' ? getEndgameDriftCue(progressSeconds) : null;
  const clearClimbState =
    currentPhase.id === 'endgame' ? getEndgameClearClimbState(progressSeconds) : null;

  if (nextPhase === null) {
    return `${currentPhase.title}: ${currentPhase.detail}`;
  }

  if (endgameCue !== null) {
    return `${currentPhase.title} ${endgameCue.hudLabel}: ${endgameCue.body} Next shift ${nextPhase.startSeconds}s.`;
  }

  if (clearClimbState !== null) {
    return `${currentPhase.title} ${clearClimbState.hudLabel}: ${clearClimbState.body} Next shift ${nextPhase.startSeconds}s.`;
  }

  return `${currentPhase.title}: ${currentPhase.detail} Next shift ${nextPhase.startSeconds}s.`;
};

export const getRunPhaseReachedBadgeText = (progressSeconds: number): string | null => {
  const { currentPhase } = getRunPhaseState(progressSeconds);
  const endgameCue = currentPhase.id === 'endgame' ? getEndgameDriftCue(progressSeconds) : null;
  const clearClimbState =
    currentPhase.id === 'endgame' ? getEndgameClearClimbState(progressSeconds) : null;

  switch (currentPhase.id) {
    case 'breakthrough':
      return 'BREAKTHROUGH';
    case 'killbox':
      return 'KILLBOX';
    case 'endgame':
      return clearClimbState?.snapshotLabel ?? endgameCue?.snapshotLabel ?? 'ENDGAME';
    case 'overtime':
      return 'OVERTIME';
    default:
      return null;
  }
};

export const getRunPhaseDeathSummaryText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase, secondsUntilNextPhase } = getRunPhaseState(progressSeconds);
  const endgameCue = currentPhase.id === 'endgame' ? getEndgameDriftCue(progressSeconds) : null;
  const clearClimbState =
    currentPhase.id === 'endgame' ? getEndgameClearClimbState(progressSeconds) : null;

  if (nextPhase === null || secondsUntilNextPhase === null) {
    return `${currentPhase.title} reached. ${SURVIVAL_GOAL_SECONDS}s clear is banked.`;
  }

  if (currentPhase.id === 'opening') {
    return `Opening window snapped. Break ${TARGET_FIRST_DEATH_SECONDS}s to start the ladder.`;
  }

  if (endgameCue !== null) {
    return `${endgameCue.snapshotLabel} snapped inside ${currentPhase.title}. ${secondsUntilNextPhase.toFixed(1)}s short of ${nextPhase.title}.`;
  }

  if (clearClimbState !== null) {
    return `${clearClimbState.snapshotLabel} snapped inside ${currentPhase.title}. ${secondsUntilNextPhase.toFixed(1)}s short of ${SURVIVAL_GOAL_SECONDS}s CLEAR.`;
  }

  return `${currentPhase.title} reached. ${secondsUntilNextPhase.toFixed(1)}s short of ${nextPhase.title}.`;
};

export const getRunPhaseRetryGoalText = (progressSeconds: number): string => {
  const { currentPhase, nextPhase, secondsUntilNextPhase } = getRunPhaseState(progressSeconds);
  const endgameCue = currentPhase.id === 'endgame' ? getEndgameDriftCue(progressSeconds) : null;
  const clearClimbState =
    currentPhase.id === 'endgame' ? getEndgameClearClimbState(progressSeconds) : null;

  if (nextPhase === null || secondsUntilNextPhase === null) {
    return `${currentPhase.title} live. Push past ${SURVIVAL_GOAL_SECONDS}s.`;
  }

  if (clearClimbState !== null) {
    return `Rematch ${clearClimbState.rematchLabel} and carry it to ${SURVIVAL_GOAL_SECONDS}s clear in +${secondsUntilNextPhase.toFixed(1)}s`;
  }

  if (endgameCue !== null) {
    return `Rematch ${endgameCue.rematchLabel} and carry it to ${SURVIVAL_GOAL_SECONDS}s clear in +${secondsUntilNextPhase.toFixed(1)}s`;
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
          'Killbox releases sideways into drift. The first bend rebounds once, a wider sweep flips back across the lane, then aftershock, recenter, preclear, and a clear-climb summit snap keep the 40s alive.',
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
