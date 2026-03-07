export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deaths read faster now',
  intro:
    'The last meaningful run made the fatal lane easier to scan without changing replay speed or difficulty pacing.',
  bullets: [
    'Game over now adds a dedicated fatal-lane callout above the overlay for a faster first read.',
    'The death summary keeps survival and retry context, but trims lower-value text clutter.',
    'Impact marker labels now match the lane name directly instead of repeating extra wording.',
    'One tap, Space, or Enter still clears the old death state and starts a fresh run immediately.',
    'Deterministic pacing and survival baselines stayed stable after the readability pass.',
  ],
  footer: 'Current build target: keep losses readable at first glance while replay stays instant.',
} as const;
