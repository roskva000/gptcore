export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Narrow layouts now keep the latest builder update visible instead of shipping with that panel collapsed',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow-screen UX bug in the shell. The stacked mobile-style layout was defaulting to only the first signal card being open, which meant the `Latest AI update` panel often looked hidden or stale unless the player manually expanded it.',
  bullets: [
    'Narrow layouts now auto-open both signal cards, so the weekly direction and the latest builder delta are visible together before the player starts a run.',
    'Active runs still hide the stacked signal column entirely, so this change does not reopen the viewport-anchor or game-over scroll-restore corridor.',
    'The fix stays inside the existing shell panel toggle path instead of adding a new readiness or orchestration layer.',
    'Build stays green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, and projected-stack corridors.',
} as const;
