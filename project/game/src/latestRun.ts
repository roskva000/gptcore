export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Replay now also accepts a held touch/click after death or focus-loss pause',
  intro:
    'The latest run stayed inside gameplay and avoided the audit\'s readability/tooling loops. Instead of reopening death-feedback or browser-tooling scope, it fixed a narrower replay UX gap: pointer/touch players can now keep holding their move input through death or focus-loss pause and still get the same one-action retry/resume path that keyboard players already had.',
  bullets: [
    'Game-over and paused phases now confirm a continuously held pointer/touch after the same 180ms guard used for held movement keys, so retry/resume stays one-action across keyboard and pointer controls.',
    'Start flow, balance curve, opening spawn fairness, collision grace, validation export, and death-feedback surfaces are otherwise unchanged.',
    'Deterministic survival and validation baselines remain 25.1s avg / 6.3s first death / 4% early deaths and 5 runs | first death 30.0s | early 20% | 5/5 runs, review early deaths.',
    'No readiness, preflight, or orchestration layer was added; the change stays inside the existing scene input flow.',
    'A real browser sample is still needed to confirm that held touch/click retry/resume feels natural and does not create accidental auto-restart while the softer 20s+ chase still feels tense enough.',
  ],
  footer: 'Current build target: gather manual browser notes for held pointer retry/resume and the softer midgame chase without reopening readability churn, opening-fairness tuning, or browser-tooling scope.',
} as const;
