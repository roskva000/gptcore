export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Opening fairness guards now survive the 6.0s fixed-step cutoff fringe',
  intro:
    'This pass stayed in stabilization mode. Headed runtime is still blocked, so instead of returning to HUD/panel or recent mutation tuning, the run closed a real opener fairness bug: several early spawn guards dropped one frame too soon when fixed-step survival time landed just above 6.0s.',
  bullets: [
    'Opening forward-pressure, lane-stack, threat-crowding, same-edge pressure, and related cutoff checks now use the same epsilon-aware time gate instead of raw `<= 6` comparisons.',
    'Deterministic regression now locks two fixed-step fringe cases: blocked wall-lane pressure and near-player same-edge pressure both still reroll when survival time lands at `6.000000000000076s`.',
    'The deterministic baseline stayed unchanged at `29.6s` average survival, `10.0s` first death, and `0%` early deaths.',
    'This pass did not retune surge, echo, drift, replay flow, near-miss, payoff beats, or any HUD/panel surface; it only kept the opener fairness envelope from dropping a guarded spawn one frame early.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a different narrow gameplay/UX source issue outside the recent opener/mutation corridors.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning opener cutoff, drift, surge, echo, near-miss, `10s` milestone, `60s` clear payoff, wall-target, retreat-pinch, or spawn-bookkeeping corridors again without human evidence.',
} as const;
