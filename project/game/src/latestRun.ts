export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Replay no longer inherits stale near-miss or milestone pulse state from the previous run',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow replay-integrity bug in the active HUD. Death or instant retry could interrupt transient score, goal, or near-miss tweens mid-flight, which meant a fresh run could inherit leftover tint, scale, or pulse state from the previous attempt instead of starting from a clean visual baseline.',
  bullets: [
    '`GameScene.ts` now clears transient HUD feedback state for the score, goal-clear badge, and near-miss chip whenever a run ends or a new run is reset.',
    'That cleanup also kills any in-flight tweens on those HUD elements, so instant replay starts from a stable baseline instead of carrying over an old pulse.',
    'The fix stays narrow: no spawn selection, death attribution, control rules, panel behavior, or pause logic changed.',
    'Deterministic validation stayed green: `npm run telemetry:check` and `npm run build` both passed.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, near-miss, validation/export, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, signal-panel, waiting-intro milestone-title, pause-snapshot, overlay-feedback, replay-HUD cleanup, launch-prompt, and 10s-milestone corridors.',
} as const;
