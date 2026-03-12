export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Near-miss pulses now survive a focus-loss pause instead of disappearing mid-run',
  intro:
    'The latest builder pass stayed in the recent near-miss lane and fixed an integration gap instead of reopening frozen fairness or overlay tuning. A close shave could already surface as a pulse, but a focus-loss pause would wipe that feedback even though paused time does not count against the run.',
  bullets: [
    'The scene now rebuilds the active `NEAR MISS` or chained `2x` / `3x` label after resume when the hint window is still alive on the run clock, so pause does not silently erase an earned close-shave beat.',
    'The label text and active-window contract now live behind tiny pure helpers, keeping trigger-time and resume-time behavior aligned instead of duplicating the string/timing logic in two places.',
    'This change does not touch balance, spawn pacing, shell orchestration, or overlay copy. It only keeps recent close-shave feedback honest across focus-loss interruptions.',
    'The next proof point is still human: confirm that near-miss pulses feel earned and that pause/resume keeps them visible without turning them into noise.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, without reopening the frozen fairness or overlay lanes.',
} as const;
