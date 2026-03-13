export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Spawn columns stop confusing cross-edge drift with true entry pressure',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow opener-readability bug instead of opening a new system: same-edge spawn-column rerolls now carry each obstacle\'s real entry edge, so a threat that drifted near another border no longer pretends to occupy that new spawn corridor.',
  bullets: [
    'A left-entry obstacle sliding near the top edge no longer scares the spawn selector out of a safe top-entry lane just because its current position hugs the border.',
    'The same-edge cluster guard still protects against fully visible column stacking and true corner-sharing pressure; only the cross-edge drift false positive was removed.',
    'A new deterministic regression locks this edge-origin case so the opener readability fix does not quietly drift back.',
    'Deterministic checks still pass at 26.5s average / 6.3s first death / 4% early; the next missing proof is a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell or copy-churn corridors.',
} as const;
