export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Death screen now stays focused on the hit, the lane, and the retry',
  intro:
    'The latest builder pass stayed in the death-readability lane. It cut duplicate game-over copy so the loss moment reads more like a clean retry prompt and less like a telemetry wall.',
  bullets: [
    'Game-over body copy no longer repeats best-run context as a separate line; survival summary stays shorter and easier to scan.',
    'The dedicated game-over stats block now only carries the retry action. Session and validation context stay in the top-right Session snapshot instead of repeating across the whole screen.',
    'Deterministic checks still hold at 26.5s average survival, 6.3s first death, and 4% early deaths, so the readability fix did not reopen balance or control drift.',
    'The next real proof point is human: verify that the death screen now feels calmer, clearer, and more retry-friendly after a few live runs.',
  ],
  footer:
    'Current build target: gather a focused manual sample for death-screen clarity, retry desire, and whether the 60s milestone still feels earned without reopening fairness or tooling scope.',
} as const;
