export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Spawn columns stop treating corner drift as a new entry lane',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow opener-readability bug instead of opening a new system: same-edge spawn-column rerolls now stop treating a left-entry threat as fresh top-entry pressure after it has drifted far enough into the corner that top became its dominant edge.',
  bullets: [
    'A left-entry obstacle that has actually become top-dominant near the corner no longer scares the spawn selector out of a safe top-entry lane.',
    'True top-entry corner pressure still blocks the adjacent left-entry corridor while top remains the obstacle\'s dominant edge, so the opener guard does not collapse into a free-corner loophole.',
    'New deterministic regressions lock both halves of that rule so the corner-drift false positive does not quietly return.',
    'Deterministic checks still pass at 26.5s average / 6.3s first death / 4% early; the next missing proof is a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell or copy-churn corridors.',
} as const;
