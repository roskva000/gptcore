export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Validation export now stays locked until the promised 5-run sample is actually complete',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a user-facing contract bug: the HUD and support copy kept asking for a fresh 5-run validation sample, but the `V` export hotkey unlocked after the very first death. That made the validation surface look more ready than it really was.',
  bullets: [
    'Validation export readiness now requires 5 completed runs instead of merely one, matching the in-game guidance and intended sample size.',
    'The blocked-export message now tells the player to finish the 5-run sample first, instead of implying that any single completed run is enough.',
    'Waiting and game-over support text now use the same 5-run contract from a shared constant, reducing future copy-versus-behavior drift.',
    'The next proof point is still human: collect a real sample for near-miss feel, launch/retry/control behavior, and death/pause readability without reopening frozen fairness lanes.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, while keeping validation affordances honest about when a sample is actually complete.',
} as const;
