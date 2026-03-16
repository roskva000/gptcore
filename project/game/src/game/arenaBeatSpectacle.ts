import {
  DRIFT_OBSTACLE_TINT,
  DRIFT_OBSTACLE_UNLOCK_SECONDS,
  ECHO_OBSTACLE_TINT,
  ECHO_OBSTACLE_UNLOCK_SECONDS,
  LEAD_OBSTACLE_TINT,
  LEAD_OBSTACLE_UNLOCK_SECONDS,
  STRAFE_OBSTACLE_TINT,
  STRAFE_OBSTACLE_UNLOCK_SECONDS,
  SURGE_OBSTACLE_TINT,
  SURGE_OBSTACLE_UNLOCK_SECONDS,
  SURVIVAL_GOAL_SECONDS,
  TARGET_FIRST_DEATH_SECONDS,
} from './balance.ts';

export type ArenaBeatSpectaclePhase = 'waiting' | 'playing' | 'paused' | 'gameOver';

type ArenaBeatStage = {
  accentColor: number;
  backgroundColor: number;
  glowScale: number;
  label: string;
  seconds: number;
};

export type ArenaBeatSpectacle = {
  activeBeatLabel: string;
  auraAlpha: number;
  auraScale: number;
  backgroundColor: number;
  edgeAlpha: number;
  edgeColor: number;
  frameAlpha: number;
  frameColor: number;
  glowAlpha: number;
  glowColor: number;
  glowScale: number;
  gridAlpha: number;
  nextBeatLabel: string | null;
};

const ARENA_BEAT_STAGES: ArenaBeatStage[] = [
  {
    seconds: 0,
    label: 'opening',
    accentColor: 0x7ce8ff,
    backgroundColor: 0x081018,
    glowScale: 1,
  },
  {
    seconds: TARGET_FIRST_DEATH_SECONDS,
    label: 'gate',
    accentColor: 0x7ce8ff,
    backgroundColor: 0x0a1620,
    glowScale: 1.08,
  },
  {
    seconds: STRAFE_OBSTACLE_UNLOCK_SECONDS,
    label: 'strafe',
    accentColor: STRAFE_OBSTACLE_TINT,
    backgroundColor: 0x171114,
    glowScale: 1.15,
  },
  {
    seconds: SURGE_OBSTACLE_UNLOCK_SECONDS,
    label: 'surge',
    accentColor: SURGE_OBSTACLE_TINT,
    backgroundColor: 0x1b1610,
    glowScale: 1.22,
  },
  {
    seconds: LEAD_OBSTACLE_UNLOCK_SECONDS,
    label: 'lead',
    accentColor: LEAD_OBSTACLE_TINT,
    backgroundColor: 0x1a1018,
    glowScale: 1.3,
  },
  {
    seconds: ECHO_OBSTACLE_UNLOCK_SECONDS,
    label: 'echo',
    accentColor: ECHO_OBSTACLE_TINT,
    backgroundColor: 0x0d1620,
    glowScale: 1.38,
  },
  {
    seconds: DRIFT_OBSTACLE_UNLOCK_SECONDS,
    label: 'drift',
    accentColor: DRIFT_OBSTACLE_TINT,
    backgroundColor: 0x101913,
    glowScale: 1.48,
  },
  {
    seconds: SURVIVAL_GOAL_SECONDS,
    label: 'clear',
    accentColor: 0xfff0c7,
    backgroundColor: 0x17160d,
    glowScale: 1.62,
  },
];

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, amount: number): number => start + (end - start) * amount;

const lerpColorChannel = (start: number, end: number, amount: number): number =>
  Math.round(lerp(start, end, amount));

const mixColor = (start: number, end: number, amount: number): number => {
  const startRed = (start >> 16) & 0xff;
  const startGreen = (start >> 8) & 0xff;
  const startBlue = start & 0xff;
  const endRed = (end >> 16) & 0xff;
  const endGreen = (end >> 8) & 0xff;
  const endBlue = end & 0xff;

  return (
    (lerpColorChannel(startRed, endRed, amount) << 16) |
    (lerpColorChannel(startGreen, endGreen, amount) << 8) |
    lerpColorChannel(startBlue, endBlue, amount)
  );
};

const getPhaseIntensity = (phase: ArenaBeatSpectaclePhase): number => {
  if (phase === 'playing') {
    return 1;
  }

  if (phase === 'waiting') {
    return 0.5;
  }

  if (phase === 'paused') {
    return 0.34;
  }

  return 0.26;
};

export const getArenaBeatSpectacle = ({
  phase,
  progressSeconds,
  pulseMs,
}: {
  phase: ArenaBeatSpectaclePhase;
  progressSeconds: number;
  pulseMs: number;
}): ArenaBeatSpectacle => {
  const clampedProgressSeconds = Math.max(progressSeconds, 0);
  let stageIndex = 0;

  for (let index = 0; index < ARENA_BEAT_STAGES.length; index += 1) {
    if (clampedProgressSeconds >= ARENA_BEAT_STAGES[index].seconds) {
      stageIndex = index;
    }
  }

  const currentStage = ARENA_BEAT_STAGES[Math.max(stageIndex, 0)];
  const nextStage = ARENA_BEAT_STAGES[Math.min(Math.max(stageIndex, 0) + 1, ARENA_BEAT_STAGES.length - 1)];
  const spanSeconds = Math.max(nextStage.seconds - currentStage.seconds, 1);
  const stageProgress =
    currentStage === nextStage
      ? 1
      : clamp((clampedProgressSeconds - currentStage.seconds) / spanSeconds, 0, 1);
  const transitionAmount = phase === 'playing' ? stageProgress : 0;
  const pulse = (Math.sin(pulseMs / 520) + 1) / 2;
  const intensity = getPhaseIntensity(phase);
  const mixedAccentColor = mixColor(
    currentStage.accentColor,
    nextStage.accentColor,
    transitionAmount,
  );
  const mixedBackgroundColor = mixColor(
    currentStage.backgroundColor,
    nextStage.backgroundColor,
    transitionAmount,
  );
  const mixedGlowScale =
    lerp(currentStage.glowScale, nextStage.glowScale, transitionAmount) + pulse * 0.06 * intensity;

  return {
    activeBeatLabel: currentStage.label,
    nextBeatLabel: currentStage === nextStage ? null : nextStage.label,
    backgroundColor: mixedBackgroundColor,
    glowColor: mixedAccentColor,
    glowAlpha: lerp(0.18, 0.42, intensity) + pulse * 0.08 * intensity,
    glowScale: mixedGlowScale,
    auraAlpha: lerp(0.08, 0.2, intensity) + pulse * 0.05 * intensity,
    auraScale: mixedGlowScale + 0.16,
    edgeColor: mixedAccentColor,
    edgeAlpha: lerp(0.04, 0.22, intensity) + pulse * 0.03 * intensity,
    frameColor: mixedAccentColor,
    frameAlpha: lerp(0.35, 0.88, intensity),
    gridAlpha: lerp(0.22, 0.42, intensity),
  };
};
