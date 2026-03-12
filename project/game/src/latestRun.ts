export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Near-miss close shaves now get a light audio chirp instead of relying on visual pulse alone',
  intro:
    'The latest builder pass stayed in the recent near-miss lane and added a small feedback beat instead of reopening frozen fairness, overlay, or mobile-shell tuning. Close shaves already pulsed on screen, but the run still felt visually dependent even though the human signal pointed at those moments as the best part of play.',
  bullets: [
    'Each `NEAR MISS` pulse now also fires a short, quiet synthesized chirp, so a close shave can register even while the player is tracking obstacle lanes instead of reading the HUD.',
    'Chained `2x` / `3x` near misses step the chirp slightly upward, keeping the existing chain label readable without touching score, spawn pacing, or reward rules.',
    'The audio uses the same best-effort Web Audio unlock path as the death tone and stays intentionally light; if the browser keeps audio suspended, gameplay still behaves exactly the same.',
    'The next proof point is still human: confirm that close shaves now feel more exciting rather than noisier, and decide whether the chirp should be kept, tuned, or reverted.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, without reopening the frozen fairness or overlay lanes.',
} as const;
