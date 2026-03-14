export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Game-over no longer lets an accidental R press wipe the current telemetry sample',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a replay-adjacent UX trap in `GameScene`. Telemetry reset was still bound to `R` outside live runs, so a player sitting on the game-over screen could naturally hit `R` expecting another try and silently erase the current validation sample instead.',
  bullets: [
    'Telemetry reset is now waiting-only, so the game-over screen keeps replay intent and destructive sample reset on separate inputs.',
    'Playing and paused runs still block reset, but game-over now uses the same safety rule instead of being a loophole.',
    'A deterministic regression assert now locks this reset gate so the sample-protection fix does not drift back out later.',
    'Telemetry check and build stay green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, and reset-safety corridors.',
} as const;
