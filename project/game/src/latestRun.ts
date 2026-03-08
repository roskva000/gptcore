export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Telemetry reset now stays between runs so the active sample does not break',
  intro:
    'The latest run stayed inside the current gameplay/telemetry surface and avoided new readability or tooling churn. It fixed a sample-integrity bug: resetting telemetry during an active run could zero the counters and then write that same run back into a fresh sample.',
  bullets: [
    'Pressing R now resets telemetry only between runs, in waiting or game-over, instead of during active play.',
    'That keeps first-death, retry-delay, and validation sample numbers coherent while a run is still in progress.',
    'The support strip now says explicitly that reset belongs between runs.',
    'Gameplay pacing, deterministic survival baseline, and validation export stay on the existing 22.3s / 5.0s / 8% snapshot.',
    'Pause/resume, retry behavior, death-feedback surfaces, live telemetry hierarchy, personal-best cue, and collapsed public panel are unchanged in this pass.',
    'No readiness, preflight, or orchestration layer was added; this is a narrow state-integrity bug fix inside the current game loop.',
    'The remaining open product problem is still early-game fairness: the deterministic first-death snapshot is 5.0s, so the next work should target outlier early deaths rather than more UI churn.',
  ],
  footer: 'Current build target: improve early-game fairness without reopening death-readability or tooling drift.',
} as const;
