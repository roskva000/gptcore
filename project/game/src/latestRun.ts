export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Active runs on narrow screens now re-anchor to the canvas after viewport drift instead of staying half out of frame',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow run-surface UX bug: the mobile/narrow focus mode already anchored the game when a run started, but later viewport scroll or browser-chrome shifts could still leave the canvas partially out of frame. The shell now snaps the active run back to the game root when that drift happens.',
  bullets: [
    'Active-run viewport anchoring is now driven by one shared helper, so scroll lock and anchor decisions use the same narrow-screen focus rule.',
    'Viewport position changes and game-height recalculations both re-anchor the active run to `#game-root` instead of only doing it on phase change.',
    'The scroll path bails out when the target is already aligned, which keeps the fix narrow and avoids forcing redundant `scrollTo()` churn.',
    'Deterministic checks and build stay green; spawn, near-miss, death, and validation behavior are unchanged in this pass.',
  ],
  footer:
    'Current build target: get a real second sample, including narrow-screen focus behavior, or keep closing one narrow gameplay or UX bug at a time without reopening the spawn, death, validation, or new-framework corridors.',
} as const;
