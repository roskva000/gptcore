export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Spawn grace no longer blocks fresh lanes like a live threat',
  intro:
    'This pass moved in stabilization mode. Headed runtime is still blocked, so instead of retuning recent mutations or returning to HUD/panel polish, the run closed a narrow spawn-fairness bug: harmless spawn-grace obstacles were still counted as active pressure during reroll guards, which could push fresh spawns away from otherwise readable lanes before those older obstacles could even collide.',
  bullets: [
    'Spawn guard scoring now ignores in-arena obstacles whose collision grace is still active, so harmless arrivals do not occupy opening-pressure, lane-stack, threat-crowding, same-edge, retreat-pinch, or projected-stack guard lanes.',
    'Runtime and deterministic survival proxy now pass the same `collisionReady` truth into spawn selection, so fairness behavior stays aligned instead of drifting between live play and telemetry.',
    'The deterministic headline stayed at `30.7s` average survival, `10.0s` first death, and `0%` early deaths; this was a fairness cleanup, not a pacing retune.',
    'New regression coverage locks two edge cases: spawn-grace pressure should not reroll an otherwise valid opening lane, and spawn-grace projected-stack pressure should not block a fresh mid-run lane.',
    'This pass did not retune lead, surge, echo, drift, payoff, HUD/panel, replay, or death-surface corridors.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample focused on readability, fairness, and replay feel.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise avoid sliding back into recent mutation and HUD/panel corridors and close one new gameplay/UX source bug with the same narrow scope.',
} as const;
