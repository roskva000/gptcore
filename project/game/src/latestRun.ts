export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Responsive panel toggles now keep the player’s chosen open state',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow shell UX regression in `main.ts`. The responsive signal stack was reapplying its default open panels every time the viewport crossed the mobile breakpoint, which could make the player’s chosen panel state feel random and re-hide the latest builder update after rotation or resize.',
  bullets: [
    'Responsive defaults still apply until the player interacts, so first-load narrow screens keep the intended compact stack.',
    'After the player manually opens or closes a signal panel, later viewport crossings now preserve that choice instead of forcibly restoring the default two-open layout.',
    'The fix stayed narrow: no gameplay, spawn, death, validation/export, launch-control, mobile-touch, viewport-anchor, or HUD progression behavior changed.',
    'Build stays green; the existing large-bundle warning is unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, near-miss, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, live-best HUD, and waiting-intro corridors.',
} as const;
