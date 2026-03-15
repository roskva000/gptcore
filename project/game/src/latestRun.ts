export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Spawn reroll fallback now keeps the best guard-compliant lane instead of snapping back to a cheap pressure violation',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to close a real spawn-selection integrity bug instead of reopening the banned HUD/pause/panel corridor or re-tuning near-miss and surge again without human evidence.',
  bullets: [
    '`spawn.ts` now remembers the strongest reroll that actually passes the active guard checks, so exhausted reroll budgets do not silently fall back to a slightly higher-scoring cheap lane.',
    'New deterministic regression coverage locks an opening-pressure case where every reroll stays rough but one legal top-lane option still exists.',
    'The main survival baseline stays `26.0s` average, `10.0s` first death, `0%` early, so this was a guard-integrity fix rather than a broader pacing retune.',
    'No new gameplay branch, framework, or orchestration layer was added; this was a single spawn-selection stabilization pass.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a different narrow gameplay/UX source issue.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, or this spawn fallback again without human evidence.',
} as const;
