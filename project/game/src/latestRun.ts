export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Fresh pointer replay/resume no longer waits an extra frame after release',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a replay/control bug: after game over or focus-loss pause, pointer release gates were only clearing on the next update tick, so a quick fresh tap could be ignored even after the old hold was released.',
  bullets: [
    'Pointer release now clears replay/resume release gates immediately on pointer-up, so game-over retry and pause resume no longer need an extra frame gap before a fresh tap counts.',
    'The fix stays narrow: it only resets pointer hold and release guards when the primary pointer is actually up, so held input still cannot leak into accidental restart/resume.',
    'A deterministic regression assert now locks the immediate-release contract without reopening pacing, fairness, mobile shell, near-miss, or overlay wording lanes.',
    'The next proof point is still human: collect a real sample for near-miss feel, launch/retry/control behavior, and death/pause readability once headed runtime is available.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus launch/retry/control behavior, while keeping replay input honest and fast.',
} as const;
