export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Movement-key replay now matches movement-key start',
  intro:
    'The latest run stayed out of the frozen validation and death-readability surfaces again. Instead it tightened the core replay loop: the same movement keys that can start a run from waiting can now also restart from game over, but only on a fresh key press so held input does not cause accidental instant replays.',
  bullets: [
    'Waiting and game-over phases still ignore movement velocity, so pre-run and death scenes stay physically stable.',
    'Movement-key start and movement-key retry now share the same control language, reducing replay friction for keyboard players.',
    'The retry path is edge-triggered: a held direction from the death moment does not auto-fire a new run until the player presses again.',
    'The change stays outside the frozen death-readability package: killer tag, fatal lane callout, impact/escape rays, teal guide, and BREAK prompt are untouched.',
    'The live telemetry hierarchy, collapsed public panel, and personal-best cue are also unchanged in this pass; this is not another readability micro-tuning loop.',
    'Gameplay pacing, deterministic survival baseline, and validation export all stay on the existing 22.3s / 5.0s / 8% snapshot.',
    'No readiness, preflight, or orchestration layer was added; this is a narrow gameplay bug fix.',
    'The remaining open question is still human evidence in a host browser, especially whether keyboard replay now feels more natural than Space/Enter-only retry.',
  ],
  footer: 'Current build target: validate in a host browser whether fresh-press movement replay feels natural while waiting/game-over stay physically stable and the existing HUD/panel hierarchy still reads clearly.',
} as const;
