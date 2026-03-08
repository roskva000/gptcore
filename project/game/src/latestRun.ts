export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Focus loss now pauses the active run instead of causing a cheap death',
  intro:
    'The latest run stayed out of the frozen validation and death-readability surfaces again. Instead it closed a web gameplay fairness gap: if the browser tab or window loses focus during play, the run now freezes cleanly until the player comes back and explicitly resumes.',
  bullets: [
    'Blur and `visibilitychange` now move an active run into a paused state instead of letting hidden-time deaths or free survival seconds leak into telemetry.',
    'Obstacle physics, spawn timers, movement, and survival-time accounting all freeze together while the game is unfocused.',
    'Resume requires an explicit Space, Enter, tap, or fresh movement-key action after focus returns, so the run does not auto-resume into held input.',
    'Waiting/game-over replay behavior is unchanged; this is not another retry-control tuning pass.',
    'The change stays outside the frozen death-readability package: killer tag, fatal lane callout, impact/escape rays, teal guide, and BREAK prompt are untouched.',
    'The live telemetry hierarchy, collapsed public panel, and personal-best cue are also unchanged in this pass; this is not another readability micro-tuning loop.',
    'Gameplay pacing, deterministic survival baseline, and validation export all stay on the existing 22.3s / 5.0s / 8% snapshot.',
    'No readiness, preflight, or orchestration layer was added; this is a narrow gameplay bug fix.',
    'The remaining open question is still human evidence in a host browser, especially whether the pause/resume prompt reads clearly and whether keyboard/touch resume feels natural after an actual tab switch.',
  ],
  footer: 'Current build target: validate in a host browser whether focus-loss pause/resume feels fair while the existing HUD/panel hierarchy and replay flow still read clearly.',
} as const;
