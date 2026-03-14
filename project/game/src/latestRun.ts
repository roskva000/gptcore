export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Narrow-layout runs no longer auto-jump back to the side panels on game over before the player can retry',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a replay-friction bug in the shell focus logic. While a narrow mobile-style layout kept the active run anchored correctly, the app was restoring the pre-run panel scroll as soon as the phase flipped to game over. That could move the death overlay and retry prompt off screen right when the player should be able to jump straight back in.',
  bullets: [
    'A small shell focus helper now distinguishes active-run anchoring from panel-scroll restoration, so only `playing` and `paused` phases keep the forced gameplay anchor.',
    '`gameOver` no longer triggers an automatic scroll restore to the stacked panels, which keeps the death overlay and instant retry path in view on narrow layouts.',
    'The old panel position is still eligible to restore from `waiting`, so this change narrows replay friction without reopening the active-run viewport-anchor corridor.',
    'Deterministic checks and build stay green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, and projected-stack corridors.',
} as const;
