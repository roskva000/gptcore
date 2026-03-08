export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Midgame obstacle speed ramps a touch slower so more runs stay alive into the 30s chase',
  intro:
    'The latest run stayed inside gameplay and avoided the audit\'s readability/tooling loops. Instead of adding more death-feedback or readiness scope, it trimmed the 10-45s obstacle speed ramp just enough to keep the midgame chase alive longer without touching replay input, opening spawn fairness, or validation tooling.',
  bullets: [
    'The 10-20s speed ramp now climbs at 3.1 instead of 3.3 per second, then hands off into a 20s+ ramp that starts at 214 instead of 216.',
    'Opening spawn-distance guard, early target lag, collision grace, replay input, pause/resume, and death-feedback surfaces are otherwise unchanged.',
    'The deterministic survival baseline moved from 24.3s avg / 6.3s first death / 4% early deaths to 25.1s avg / 6.3s first death / 4% early deaths.',
    'Bucket distribution improved from 1 / 5 / 6 / 12 to 1 / 4 / 5 / 14, so more proxy runs now survive to the 30s cap without hollowing out the opener.',
    'No readiness, preflight, or orchestration layer was added; the change lives entirely inside the existing balance curve.',
    'A real browser sample is still needed to judge whether the 20s+ chase still feels tense enough, because the first-death outlier at 6.3s still exists in deterministic proxy runs.',
  ],
  footer: 'Current build target: validate real-player feel for the softer midgame chase without reopening readability churn, opening-fairness tuning, or browser-tooling scope.',
} as const;
