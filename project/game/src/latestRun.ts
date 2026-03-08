export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Opening spawn selection now rerolls crowded lanes so the first seconds stay fairer',
  intro:
    'The latest run stayed inside gameplay and avoided the audit\'s readability/tooling loops. Instead of adding more HUD or orchestration layers, it made the existing spawn-fairness helper actually matter during the opening by requiring extra distance from the player for the first few seconds before accepting a spawn lane.',
  bullets: [
    'For the first 6 seconds only, spawn selection now asks for roughly +160px more distance before it accepts a new obstacle lane, then falls back to the prior baseline.',
    'Pacing 10 / 32 / 76, speed anchors, early spawn target lag, collision grace, replay flow, pause/resume, and death-feedback surfaces are otherwise unchanged.',
    'The deterministic survival baseline moved from 23.4s / 6.3s / 8% early deaths to 24.3s / 6.3s / 4% early deaths, while the 30s-cap bucket rose from 11 to 12 runs.',
    'This pass reuses the existing spawn-reroll path instead of adding a new gameplay layer, and the proxy now shows that helper activating at about 0.3 rerolls per run.',
    'No readiness, preflight, or orchestration layer was added; the change lives entirely inside current spawn/gameplay logic.',
    'A real browser sample is still needed to confirm that the opener feels fairer without making the first 6 seconds too empty, and the packaged smoke script currently fails with a CDP \"Page.enable\" error.',
  ],
  footer: 'Current build target: validate real-player feel for the opening spawn-distance guard without reopening readability churn or browser-tooling scope.',
} as const;
