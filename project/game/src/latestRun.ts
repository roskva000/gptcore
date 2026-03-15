export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Wall-press retreat pinch now respects reachable movement instead of inventing fake forward pressure',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to close one real spawn-fairness bug instead of spending another run on banned HUD/pause/panel, echo, surge, near-miss, or replay micro-tuning corridors without human evidence.',
  bullets: [
    'The retreat-pinch guard in `spawn.ts` now clamps player intent through reachable movement before it decides whether a rear-lane spawn is unfair.',
    'That closes a wall-edge false positive where holding into the arena wall could still count as forward pressure and wrongly reroll a legal escape lane.',
    'A new deterministic regression locks the right-wall case while preserving the existing seed `#7` retreat-pinch floor, so this is a bug fix rather than a pacing retune.',
    'Survival snapshot stays green at `26.0s` average survival, `10.0s` first death, and `0%` early deaths, with the same `0 / 3 / 11 / 10` bucket split.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is a real second human sample focused on whether recent fairness and identity changes actually feel worth keeping.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, echo, wall-target, retreat-pinch, or spawn-bookkeeping corridors again without human evidence.',
} as const;
