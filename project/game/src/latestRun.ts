export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Early spawn aim now lags behind player movement to cut unfair first deaths',
  intro:
    'The latest run stayed inside the gameplay balance surface the audit asked for. Instead of adding more readability UI or tooling, it targeted early unfair deaths directly: obstacles spawned in the first 10 seconds no longer aim at the player\'s exact current position, but at a short lagged point behind that motion.',
  bullets: [
    'For the first 10 seconds only, each spawn now aims 0.18 seconds behind the player\'s current movement instead of snapping to the exact live position.',
    'Spawn pacing, speed curve, retry flow, pause/resume behavior, and death-feedback surfaces are otherwise unchanged.',
    'The deterministic survival snapshot moved from 22.3s / 5.0s / 8% to 23.4s / 6.3s / 8%.',
    'The worst two early deaths still exist, but they now land at 6.3s and 6.5s instead of 6.2s and 5.0s.',
    'No readiness, preflight, or orchestration layer was added; this is a narrow fairness tuning pass inside the current spawn logic.',
    'The remaining open question is whether the new early chase line still feels tense enough in a real browser sample, since host browser validation is still blocked here.',
  ],
  footer: 'Current build target: keep the new first-death gain while validating real-player feel, not by reopening readability or tooling drift.',
} as const;
