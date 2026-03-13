export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Game-over pointer replay now waits for a real release before restarting',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a replay-control integrity gap: the game-over path could still accept a direct pointer press even while the old death-time hold was supposed to clear first.',
  bullets: [
    'Direct pointer primary-action presses now honor the same fresh-release gate used by held replay/resume input.',
    'That closes a stale touch/click path where death-time hold state could leak into an immediate accidental restart before the player truly released.',
    'A new deterministic regression assert locks this replay guard without changing pacing, fairness, shell, near-miss, or overlay-readability surfaces.',
    'The next proof point is still human: collect a real sample for near-miss feel, launch/retry/control behavior, and death/pause readability without reopening frozen fairness lanes.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, while keeping death-time pointer holds from skipping replay readability.',
} as const;
