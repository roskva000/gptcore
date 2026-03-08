export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Telemetry now stays quieter during live play',
  intro:
    'The latest run kept the death-feedback package and balance baseline frozen again. Instead it reduced live HUD clutter by shrinking the right-side telemetry block during active play while preserving richer validation detail when the run is waiting or already over.',
  bullets: [
    'During active play the in-canvas telemetry block now collapses to a short session summary, so the player is not competing with the full validation readout while dodging.',
    'Waiting and game-over phases still show the richer multi-line telemetry detail, so local validation and export workflows remain available without adding new tooling.',
    'Top-left personal-best visibility is unchanged; this pass only trims the competing right-side detail during the action-heavy phase.',
    'The change stays outside the frozen death-readability package: killer tag, fatal lane callout, impact/escape rays, teal guide, and BREAK prompt are untouched.',
    'Gameplay pacing, deterministic survival baseline, and instant replay behavior stay on the existing 22.3s / 5.0s / 8% snapshot.',
    'No readiness, preflight, or orchestration layer was added; this is a pure gameplay-surface hierarchy change.',
    'The goal is narrower and more measurable first-look focus, not a new HUD system.',
  ],
  footer: 'Current build target: validate in a host browser whether the quieter live telemetry block improves first-look focus without hiding the validation affordances players or testers still need between runs.',
} as const;
