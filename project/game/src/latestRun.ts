export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Projected-stack spawn guard now starts exactly at 10.0s instead of leaking the threshold frame',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to close a real mid-run spawn fairness bug instead of reopening the banned HUD/pause/panel corridor or re-tuning near-miss and surge again without human evidence.',
  bullets: [
    '`spawn.ts` now treats the `10.0s` projected-stack window as inclusive, so the first spawn on that threshold no longer slips past the same-lane reroll guard.',
    'New deterministic regression coverage locks the exact `10.0s` case beside the existing `12s` projected-stack contract.',
    'The main survival baseline stays `26.0s` average, `10.0s` first death, `0%` early, so this was a boundary bug fix rather than a broader pacing retune.',
    'No new gameplay branch, framework, or orchestration layer was added; this was a single spawn-fairness threshold fix.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a different narrow gameplay/UX source issue.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, or this threshold fix again without human evidence.',
} as const;
