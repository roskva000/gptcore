export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Saved validation exports no longer pretend to be current after newer runs change the live sample',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow telemetry-surface UX bug: once a saved validation export drifted behind the current session sample, the waiting/game-over status lines could still read like that export was ready. The UI now distinguishes current exports from older ones instead of silently trusting stale state.',
  bullets: [
    'A new helper compares the saved validation report against the live completed sample before the HUD calls it current.',
    'Waiting and game-over status text now split three states cleanly: current export ready, older export from a previous sample, or stale export that should be refreshed with V.',
    'Deterministic checks and build stay green; no spawn, near-miss, or death-surface behavior changed in this pass.',
    'The next missing proof is still a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay or UX bug at a time without reopening the mobile-shell, copy-churn, or new-framework corridors.',
} as const;
