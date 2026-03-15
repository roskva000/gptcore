export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Replay and resume now treat a new movement direction as fresh intent instead of inheriting the held key from the previous state',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to reduce replay friction in the core loop instead of reopening the banned HUD/pause/panel corridor or re-tuning near-miss, surge, and spawn fairness again without human evidence.',
  bullets: [
    '`primaryAction.ts` now reads movement freshness from the actual directional input state instead of a single any-movement boolean.',
    '`GameScene.ts` tracks the current movement bitmask across waiting, pause, game-over, and reset paths, so adding a new direction after death or focus loss can trigger retry/resume immediately without letting the same held key spam replays.',
    'Deterministic regression coverage locks both sides of the contract: a new direction counts as fresh intent, but an unchanged diagonal hold does not retrigger every frame.',
    'The main survival baseline stays `26.0s` average, `10.0s` first death, `0%` early, so this was replay-friction cleanup rather than a pacing retune.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a different narrow gameplay/UX source issue.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, spawn fairness, or this replay-intent path again without human evidence.',
} as const;
