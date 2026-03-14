export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Waiting intro now reflects whether 10s or 60s is already banked',
  intro:
    'The latest builder pass stayed in integration mode and fixed a waiting-surface truth hole in `GameScene`. Returning players always saw the same first-run coaching, even after they had already broken 10 seconds or cleared the full 60-second goal, which made the start window feel stale and undercut visible progression before the next run.',
  bullets: [
    'The waiting intro title now reads from stored lifetime best: fresh players still see the 10s-to-60s ladder, 10s survivors get a direct chase-60 prompt, and 60s-clear players get a push-your-best prompt.',
    'The fix stayed narrow: only the waiting intro title changed, while spawn, death-attribution, validation/export, launch-control, mobile-touch, viewport, reset-safety, goal-clear HUD, and live-best HUD behavior stayed untouched.',
    'Telemetry check now locks the three milestone-title states so the waiting surface does not drift back to first-run coaching after progression has already been earned.',
    'Telemetry check and build stay green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, and live-best HUD corridors.',
} as const;
