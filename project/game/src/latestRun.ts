export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deep same-side opener repeat sweeps now reroll before they recycle a cheap lane',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow opener-pressure bug instead of opening a new system: early spawn selection now keeps searching when a deep same-edge threat has already reached the player corridor and a follow-up spawn tries to sweep in from the same side again.',
  bullets: [
    'A near-player threat now keeps its original spawn-edge pressure long enough to block one more same-side follow-up sweep, even after the old obstacle has drifted deep into the arena.',
    'The guard stays narrow: it only applies through the opening window, only for original same-edge follow-ups, and only once the player is already well inside the arena instead of pinned on the wall.',
    'New deterministic regressions lock the deep same-side reroll rule, seed #3 no longer dies at 6.3s, and the average spawn-reroll snapshot holds at 0.5.',
    'Deterministic checks now pass at 27.4s average / 10.0s first death / 0% early; the next missing proof is still a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell, copy-churn, or new-framework corridors.',
} as const;
