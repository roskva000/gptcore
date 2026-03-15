export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Start and retry prompts now tell the truth about every live launch path',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a small but real control-readability bug. The game already allowed launch and retry through fresh move input, but the start pulse and related prompts still implied a narrower button-only path, which made the control contract look more limited than the actual runtime behavior.',
  bullets: [
    '`primaryAction.ts` now owns the launch, retry, and resume prompt strings so the public wording follows the same primary-action contract as the actual input rules.',
    '`GameScene.ts` uses that shared launch prompt for the waiting pulse and the related retry/resume copy, so fresh move input is no longer a hidden way to start playing.',
    'The fix stays narrow: no spawn, death, near-miss, validation/export, pause-state, or shell behavior changed.',
    'Deterministic guardrails stayed explicit: `telemetry:check` now locks the prompt copy, and build stays green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, near-miss, validation/export, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, signal-panel, waiting-intro milestone-title, pause-snapshot, overlay-feedback, and 10s-milestone corridors.',
} as const;
