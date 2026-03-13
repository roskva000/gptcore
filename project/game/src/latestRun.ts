export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Death reads got more honest on centered hits and fresh spawns',
  intro:
    'The latest builder passes stayed in stabilization mode and tightened three runtime-facing readability bugs instead of opening new systems: centered overlap deaths now point at the more truthful threat, centered sweeps keep their incoming lane when the motion is clear, and fresh spawns stop looking half-safe once their collision gate is really open.',
  bullets: [
    'Centered multi-hit overlaps no longer fall back toward callback order; the fatal threat picker now prefers the obstacle carrying the stronger relative sweep.',
    'Centered death callouts keep the incoming lane only when obstacle-vs-player motion is strong enough, and fall back to center when the overlap is genuinely ambiguous.',
    'Spawn-grace visuals now snap to full-strength the moment collision grace ends, so a lethal obstacle does not linger for an extra frame in a softened state.',
    'Deterministic checks still pass at 26.5s average / 6.3s first death / 4% early; the next missing proof is a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell or copy-churn corridors.',
} as const;
