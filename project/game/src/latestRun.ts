export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Paused and game-over command feedback no longer disappears behind the overlay',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow UX bug in `GameScene.ts`. Command feedback text was being shown at the normal in-run depth even while the pause or game-over overlay was up, so messages triggered by keys like `C`, `R`, or `V` could exist in state but still sit visually behind the dark overlay.',
  bullets: [
    'Support text now rises above the overlay only in `paused` and `gameOver`, so blocked reset/export/log feedback can actually be read instead of hiding underneath the modal layer.',
    'Waiting and active-run layering stay unchanged; this is only a depth fix for overlay phases, not a new panel or HUD system.',
    'The fix stayed narrow: no spawn logic, death attribution, validation rules, mobile control, viewport anchoring, or signal-panel behavior changed.',
    'Build stays green; the existing Vite script warning and large-bundle warning are unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, near-miss, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, signal-panel, waiting-intro, pause-snapshot, and overlay-feedback corridors.',
} as const;
