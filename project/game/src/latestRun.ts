export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Deterministic drift validation now reaches the mutation it claims to cover',
  intro:
    'This pass moved into integration mode. Headed runtime is still blocked, and the new 32s drift beat had exposed a validation gap: the deterministic survival snapshot still stopped at 30s, so it could describe drift without ever exercising it.',
  bullets: [
    'The deterministic survival proxy now simulates through `40s`, so post-`32s` runs actually hit the live `drift` unlock instead of stopping short.',
    'Snapshot assertions now require at least one simulated run to clear the drift threshold, closing the old “described but not exercised” gap.',
    'The updated deterministic baseline is `29.6s` average survival, `10.0s` first death, and `0%` early deaths.',
    'This pass did not retune drift, surge, echo, fairness guards, replay flow, near-miss, or payoff beats; it only repaired validation truth around the existing mutation set.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample focused on whether surge, echo, drift, and recent payoff beats feel worth keeping.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning drift, surge, echo, near-miss, `10s` milestone, `60s` clear payoff, wall-target, retreat-pinch, or spawn-bookkeeping corridors again without human evidence.',
} as const;
