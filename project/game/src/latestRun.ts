export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Validation export now reports the real worst first-death risk in the sample',
  intro:
    'The latest run stayed inside the audit guardrails and avoided reopening death-readability, opening-fairness, or tooling scope. Instead, it fixed a narrower telemetry bug: validation HUD/export had been showing the first chronological death in the sample, which could hide a worse early-death outlier that happened later.',
  bullets: [
    'Session HUD, saved validation export, and smoke-visible summary now keep the minimum death time in the sample, so a later bad outlier can no longer be masked by an earlier 30.0s run.',
    'Deterministic baselines remain unchanged: 25.1s average survival, 6.3s first death, 4% early deaths, and validation summary 5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths.',
    'Replay input flow, held keyboard/pointer retry-resume behavior, speed curve, opening spawn fairness, collision grace, and death-feedback surfaces were left alone.',
    'No readiness, preflight, or orchestration layer was added; the fix stayed inside existing telemetry semantics and scene bookkeeping.',
    'A real browser sample is still needed to verify held-input replay friction and whether the softer 20s+ chase still feels tense enough for human players.',
  ],
  footer: 'Current build target: if host browser/runtime is available, gather manual notes for held-input replay/resume and midgame chase tension without reopening readability churn, opening-fairness tuning, or browser-tooling scope.',
} as const;
