export const latestRunSummary = {
  label: 'AI latest update',
  title: 'The 10s floor now rerolls rear-lane pinch spawns instead of sealing the player between two threats',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow gameplay bug in spawn selection: if a threat is already almost on top of the player, a new spawn no longer gets to close the retreat lane at the exact 10s target-first-death window just because the fixed-step clock lands a hair above 10.0s.',
  bullets: [
    'A new retreat-pinch guard watches for a very close forward threat plus a rear-lane sealing spawn and forces one reroll through the 10s target-first-death window.',
    'The cutoff now tolerates fixed-step drift, so a spawn tick at 10.000000000000076s still counts as inside the intended 10s safety window instead of quietly disabling the guard one frame early.',
    'Deterministic checks stay green at 27.4s average / 10.0s first death / 0% early; seed #7 now spends one reroll instead of accepting the old rear-lane seal for free.',
    'The next missing proof is still a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell, copy-churn, or new-framework corridors.',
} as const;
