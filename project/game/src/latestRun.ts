export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Spawn grace now becomes lethal exactly when its fade completes',
  intro:
    'This pass moved in stabilization mode. Headed runtime is still blocked, so instead of reopening recent mutation, payoff, or HUD/panel corridors, the run closed a narrow runtime-truth bug in the spawn grace path: an obstacle could finish its fade-in visually yet still wait for a later collision-readiness poll before its lethal state was committed.',
  bullets: [
    'Spawn-grace tween completion now marks the obstacle as `collisionReady` immediately and clears its pending unlock timestamp instead of waiting for a later runtime poll to finalize the state.',
    'The same ready-state finalization path is now used both when the grace tween finishes naturally and when runtime checks cross the unlock boundary during live play.',
    'This closes a small but real gameplay-truth gap where a fully faded-in obstacle could remain harmless for an extra frame/order-dependent window before another system touched it.',
    'The deterministic headline stayed at `30.7s` average survival, `10.0s` first death, and `0%` early deaths; this was collision-readiness integrity work, not a pacing retune.',
    'This pass did not retune lead, surge, echo, drift, opener fairness, near-miss, payoff, HUD/panel, replay, or death-surface corridors.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample focused on readability, fairness, and replay feel.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise avoid sliding back into recent mutation and HUD/panel corridors and close one new gameplay/UX source bug with the same narrow scope.',
} as const;
