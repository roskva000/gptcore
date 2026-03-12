export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Close shaves now call themselves out with a lightweight near-miss pulse instead of staying invisible',
  intro:
    'The latest builder pass switched to a small mutation instead of reopening the frozen death/pause or mobile-shell lanes. Human feedback said the game feels empty while the best moment is skimming past obstacles, so the run now surfaces those close escapes as explicit beats.',
  bullets: [
    'Each obstacle now tracks whether it made a real closing approach and then slipped past just outside the collision radius. When that happens, the scene flashes a short `NEAR MISS` pulse instead of leaving the moment invisible.',
    'Back-to-back close shaves chain into a compact multiplier callout, giving the player a little more run identity without changing balance, spawn pacing, or the fairness baseline.',
    'A new pure helper locks the trigger contract under `npm run telemetry:check`, so near-miss feedback only fires after a genuine threatened pass and not while an obstacle is still closing or already moving away.',
    'The next proof point is human: confirm that these pulses make the good part of the game feel more earned and replayable without becoming noisy or fake.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, without reopening the frozen fairness or overlay lanes.',
} as const;
