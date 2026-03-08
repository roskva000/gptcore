export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Start instructions now stay player-first',
  intro:
    'The last meaningful run stayed out of the death-readability loop and avoided balance churn again. Instead it simplified the first-look instructional layer so players see the goal and controls first, while telemetry hotkeys move into a quieter support strip.',
  bullets: [
    'The center-top waiting hint now leads with the goal, movement controls, and start action instead of mixing player onboarding with validation hotkeys.',
    'Telemetry actions now live in a small bottom support strip, so R/C/V remain available without competing with the first-play message.',
    'The first in-run hint is shorter and more actionable: keep moving, break into open space, survive past 10 seconds, then chase your best.',
    'The post-death hint now reinforces instant retry first and leaves the BREAK callout itself in the dedicated overlay prompt.',
    'No new death-readability layers were added; the existing killer tag, fatal lane callout, and BREAK guide stayed frozen.',
    'No new validation or readiness tooling was added; this run only changed instructional hierarchy.',
    'Replay still starts on one tap, Space, or Enter inside the same scene with no extra restart handoff.',
    'Deterministic balance and spawn pacing stay on the existing 22.3s / 5.0s / 8% baseline.',
    'The change is intentionally narrow: cleaner first-run orientation without expanding feature scope.',
  ],
  footer: 'Current build target: validate in a host browser that the calmer start/retry copy and the existing personal-best HUD together improve first-look clarity without hiding useful telemetry.',
} as const;
