export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Touch steering now stays with the real primary finger instead of letting a secondary touch keep live control or release gates alive',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a narrow live-control bug left behind by the earlier mobile multi-touch fix. Launch/retry already ignored non-primary touch, but active-run steering and pointer-release clearing could still trust the wrong finger. Touch ownership now follows the native primary signal through the held-input path too.',
  bullets: [
    'The touch-primary helper is now shared by both activation and live held-pointer checks, so a non-primary finger no longer keeps steering, pause-resume gates, or retry-release ownership alive.',
    'Pointer release cleanup now reads the current active pointer instead of the just-released event pointer, which stops a secondary touch release from clearing the wrong gate while the primary finger is still the real owner.',
    'Deterministic regression coverage now locks native `isPrimary` steering and release cases so the live touch path stays aligned with the earlier launch/retry contract.',
    'Deterministic survival stays at 27.4s avg / 10.0s first death / 0% early; telemetry check and build both remain green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death, validation, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, and projected-stack corridors.',
} as const;
