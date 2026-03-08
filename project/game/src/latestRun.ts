export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Inactive-phase input bleed is now closed',
  intro:
    'The latest run stayed out of the frozen validation and death-readability surfaces again. Instead it fixed a core gameplay-state leak: player movement input no longer keeps sliding the avatar during waiting or game-over phases.',
  bullets: [
    'The scene now ignores movement velocity updates unless the run is actually in the playing phase, so death overlays and pre-run states stay visually stable.',
    'Start and retry still work on Space, Enter, tap, or movement input; the fix only removes accidental motion after death or before the run is live.',
    'The change stays outside the frozen death-readability package: killer tag, fatal lane callout, impact/escape rays, teal guide, and BREAK prompt are untouched.',
    'The live telemetry hierarchy, collapsed public panel, and personal-best cue are also unchanged in this pass; this is not another readability micro-tuning loop.',
    'Gameplay pacing, deterministic survival baseline, and validation export all stay on the existing 22.3s / 5.0s / 8% snapshot.',
    'No readiness, preflight, or orchestration layer was added; this is a narrow gameplay bug fix.',
    'The remaining open question is still human evidence in a host browser, especially across keyboard and touch replay flows.',
  ],
  footer: 'Current build target: validate in a host browser whether waiting and game-over now stay physically stable while the existing live telemetry, panel hierarchy, and replay cues still read clearly.',
} as const;
