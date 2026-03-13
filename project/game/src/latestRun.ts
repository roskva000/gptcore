export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Near-wall opener spawn scoring no longer assumes impossible wall travel',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a gameplay fairness mismatch: near-wall spawn reroll scoring was clamping its projected path to the full arena edge, even though runtime obstacle targeting already respects the player-reachable margin.',
  bullets: [
    'Projected-path reroll scoring now clamps to the same player-reachable margin the runtime uses, so opener pressure near a wall is judged against a path the player can actually travel.',
    'The fix stays narrow: only the fairness reference changed, with no new orchestration, no mobile-shell reopening, and no extra tuning layer.',
    'A deterministic regression assert now locks the near-wall reachability contract, while the survival baseline stays at 26.5s average / 6.3s first death / 4% early.',
    'The next proof point is still human: collect a real sample for opener fairness, near-miss feel, launch/retry/control behavior, and death/pause readability once headed runtime is available.',
  ],
  footer:
    'Current build target: gather a manual sample for opener fairness plus near-miss and launch/retry/control behavior, while keeping deterministic spawn pressure honest.',
} as const;
