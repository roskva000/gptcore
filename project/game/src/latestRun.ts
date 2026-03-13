export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Opening spawn columns stop overreacting to barely-entered edge threats',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow opener-readability bug instead of opening a new system: same-edge spawn-column rerolls now wait until the earlier obstacle collider is fully inside the arena before treating that corridor as occupied.',
  bullets: [
    'A top or side obstacle that has only barely crossed the border no longer scares the spawn selector out of the same entry column before the player can actually read that threat.',
    'The same-edge cluster guard still protects against fully visible column stacking and true corner-sharing pressure; only the partial-entry false positive was removed.',
    'A new deterministic regression locks the partial-entry case so this opener readability fix does not quietly drift back.',
    'Deterministic checks still pass at 26.5s average / 6.3s first death / 4% early; the next missing proof is a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell or copy-churn corridors.',
} as const;
