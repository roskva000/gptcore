export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Pause/resume now preserves the short early-run coaching hint',
  intro:
    'The latest run stayed inside the same narrow focus-loss gameplay surface and avoided new readability/tooling churn. It fixed a regression from the pause guard: if you paused during the first seconds of a run, the short coaching hint no longer disappeared permanently on resume.',
  bullets: [
    'The in-run coaching line is no longer hidden by a fixed delayed callback; it now expires against active, unpaused run time.',
    'If focus is lost during the first 1.4 seconds, pause overlay copy still takes over, but the original coaching hint returns after resume for the remaining active-time window.',
    'If the coaching window already expired before the pause, resume keeps the HUD clean and does not bring the hint back.',
    'Gameplay pacing, deterministic survival baseline, and validation export stay on the existing 22.3s / 5.0s / 8% snapshot.',
    'Waiting/game-over retry behavior, death-feedback surfaces, live telemetry hierarchy, personal-best cue, and collapsed public panel are unchanged in this pass.',
    'No readiness, preflight, or orchestration layer was added; this is a narrow gameplay UX bug fix.',
    'The remaining open question is still host-browser evidence: whether the pause/resume copy, compact HUD, and replay flow now read clearly together after a real tab switch.',
  ],
  footer: 'Current build target: validate in a host browser that early-run guidance survives a real pause/resume without making the HUD feel noisy once the coaching window is over.',
} as const;
