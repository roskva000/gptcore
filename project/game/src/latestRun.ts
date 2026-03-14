export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Death callout labels now clamp using the current label width instead of drifting from the previous death message',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a narrow death-surface readability bug in the overlay rendering path. Impact and killer labels already had clamp logic, but the scene was positioning them before Phaser had measured the new text. That let long or short death messages inherit the previous label width and drift sideways on the next death.',
  bullets: [
    'Impact marker labels now set their new text first and only then ask the horizontal clamp helper for the final X position, so `CENTER` and directional callouts stop reusing stale width from the previous death.',
    'The fatal spotlight label follows the same fix, which keeps multi-line killer labels centered over the actual fatal obstacle even when the previous run used a much wider or narrower message.',
    'This is a rendering-only stabilization pass: death attribution, prompt wording, spawn pacing, and deterministic survival remain unchanged.',
    'Build stays green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, and projected-stack corridors.',
} as const;
