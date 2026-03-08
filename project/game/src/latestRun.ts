export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Early spawn collisions now get a short grace window so openings read fairer',
  intro:
    'The latest run stayed inside gameplay and avoided the audit\'s readability/tooling loops. Instead of adding more HUD or orchestration layers, it gave first-10-second spawns a very short collision grace so a fresh obstacle can cross the lane before it is allowed to register a hit.',
  bullets: [
    'For the first 10 seconds only, each new obstacle still spawns and moves immediately, but its collider stays harmless for 260ms.',
    'The spawn target lag from the previous run stays in place; pacing 10 / 32 / 76, speed anchors, replay flow, pause/resume, and death-feedback surfaces are otherwise unchanged.',
    'The deterministic survival baseline stayed flat at 23.4s / 6.3s / 8%, so the change did not create accidental balance drift in the proxy.',
    'This pass is meant to improve human-perceived fairness at spawn time, not to push telemetry with another large numeric swing.',
    'No readiness, preflight, or orchestration layer was added; the change lives entirely inside current spawn/gameplay logic.',
    'A real browser sample is still needed to decide whether the grace window feels cleaner or too forgiving, and the packaged smoke script currently fails with a CDP \"Page.enable\" error.',
  ],
  footer: 'Current build target: validate real-player feel for the short grace window without reopening readability churn or browser-tooling scope.',
} as const;
