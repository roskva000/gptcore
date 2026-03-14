export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Best HUD now updates live instead of waiting for the run to end',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed an active-run progression hole in `GameScene`. Once a run quietly passed the stored best, the HUD kept showing the old `Best` value until death, which weakened the sense that the player was actively extending a record.',
  bullets: [
    'Active runs now promote both lifetime and session `Best` text as soon as the current survival time beats the stored record, so progress is visible before the death screen.',
    'The fix stayed narrow: stored telemetry behavior did not change, only live HUD best-text truth while the run is still in progress.',
    'Spawn, death-attribution, validation/export, launch-control, mobile-touch, viewport, reset-safety, and goal-clear surfaces were left untouched.',
    'Telemetry check and build stay green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, and live-best HUD corridors.',
} as const;
