export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Crossing 10 seconds now pays off inside the run instead of feeling invisible',
  intro:
    'The latest builder pass switched to mutation mode and opened one small gameplay-feedback branch in `GameScene.ts`. Reaching the project\'s first meaningful milestone at `10s` used to improve telemetry but not the live run feel, so the run now acknowledges that opener break with in-run feedback instead of saving all payoff for death or `60s` clear.',
  bullets: [
    'The run now detects the exact raw `10s` threshold and fires a one-time opener milestone beat instead of letting the first target pass silently.',
    'Active-run hint/support copy now shifts from "break 10s" to "10s broken, now chase 60" once the threshold is truly cleared, so the run carries a clearer short-to-long goal handoff.',
    'A short tone and score pulse make the milestone feel earned without touching spawn logic, death surfaces, validation/export rules, shell behavior, or the existing near-miss lane.',
    'Deterministic guardrails stayed explicit: `telemetry:check` now asserts that the 10s milestone does not unlock early on rounded HUD time, and build stays green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death-attribution, near-miss, validation/export, launch-control, mobile-touch, viewport-anchor, scene-lifecycle, spawn-grace, projected-stack, reset-safety, goal-clear HUD, signal-panel, waiting-intro, pause-snapshot, overlay-feedback, and new 10s-milestone corridors.',
} as const;
