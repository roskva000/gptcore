export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Late runs now break into a third obstacle beat instead of looping on direct chase',
  intro:
    'This pass moved into mutation mode. Headed runtime is still blocked, so instead of re-entering banned fairness, payoff, replay, or HUD micro-tuning corridors without a second human sample, the run used the existing variant system to open a new late-run rhythm.',
  bullets: [
    'A new `drift` obstacle beat unlocks from `32s` and claims every `7th` spawn, adding a lateral sweep instead of another straight chase.',
    'Drift travel alternates `22deg` left/right rotation off the standard target line, so late runs gain a readable third rhythm without a new enemy framework.',
    'The same drift trajectory helper now drives both runtime movement and deterministic reports, keeping the proxy aligned with live source behavior.',
    'This pass did not retune fairness guards, replay flow, near-miss, surge, echo, or existing payoff beats; it only added a new late-run mutation lane.',
    'Deterministic validation stays green at `26.0s` average survival, `10.0s` first death, and `0%` early deaths.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is a real second human sample focused on whether surge, echo, drift, and recent payoff beats feel worth keeping.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning drift, surge, echo, near-miss, `10s` milestone, `60s` clear payoff, wall-target, retreat-pinch, or spawn-bookkeeping corridors again without human evidence.',
} as const;
