export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Exact-tie death spotlighting now keeps the obstacle that actually won the overlap callback instead of drifting to group order',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow death-truth bug: when two centered obstacles overlapped the player with exactly equal penetration, distance, and closing speed, the fatal spotlight could still drift to whichever obstacle happened to be iterated first. Exact ties now preserve the overlap callback winner, so the death lane callout stays attached to the collider that actually triggered the kill without opening a new death framework.',
  bullets: [
    'Fatal threat selection still prefers deeper or faster-closing threats first; the new preference only applies when every existing tie-break is truly exhausted.',
    'GameScene now forwards the overlap callback obstacle index into fatal threat selection, which keeps centered multi-hit deaths from collapsing back to display or group ordering.',
    'Deterministic regression coverage now locks the exact-tie callback-preference case so the spotlight and lane truth do not silently drift again.',
    'Deterministic survival stays at 27.4s avg / 10.0s first death / 0% early; telemetry check and build both remain green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new opener-disi pressure/readability bug without reopening the death, validation, shell, launch-control, mobile multi-touch, or same-edge fairness corridors.',
} as const;
