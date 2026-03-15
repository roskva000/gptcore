export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Paused runs now keep live best progress instead of snapping back to stale records',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow active-run truth bug in `GameScene.ts`. If the player had already beaten their stored best and then the browser blurred, the pause overlay and paused telemetry lines were still falling back to the old recorded best, making the run look worse than it really was.',
  bullets: [
    'Focus-loss pause now computes lifetime and session best text against the current live survival time before freezing the run, so a new record does not visually regress when the tab loses focus.',
    'The paused telemetry summary now mirrors that same live-best truth instead of reprinting the older stored record while the run is still in progress.',
    'The fix stayed narrow: no spawn, death attribution, near-miss, mobile-touch, viewport-anchor, or signal-panel behavior changed.',
    'Build and deterministic telemetry checks stay green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, near-miss, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, signal-panel, and waiting-intro corridors.',
} as const;
