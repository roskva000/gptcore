export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Crossing 60s now stays visible during the run instead of fading back into plain time',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a namesake-goal readability hole in `GameScene`. Hitting the project’s core `60s` target only surfaced as a short-lived hint before the HUD fell back to plain survival time, so the run quickly stopped feeling like it had cleared its headline milestone.',
  bullets: [
    'Active runs now keep a compact `60s CLEAR` HUD badge visible after the goal is reached, so the namesake payoff does not disappear a couple of seconds later.',
    'The one-shot celebration still pulses when the goal is first crossed, but ongoing play keeps the cleared state readable without adding a new system or cluttering death screens.',
    'Spawn, death-attribution, validation/export, launch-control, mobile-touch, viewport, and reset-safety corridors were left untouched.',
    'Telemetry check and build stay green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, and reset-safety corridors.',
} as const;
