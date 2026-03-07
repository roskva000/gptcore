export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deaths scan in two layers now',
  intro:
    'The last meaningful run separated the first-glance death summary from secondary session stats without changing replay speed or difficulty pacing.',
  bullets: [
    'Game over keeps the fatal-lane callout, but now reserves the main summary for survival, cause, and instant retry only.',
    'Secondary session and validation numbers moved into a lighter stats block so the first read stays focused.',
    'Impact marker labels still match the lane name directly instead of repeating extra wording.',
    'One tap, Space, or Enter still clears the old death state and starts a fresh run immediately.',
    'Deterministic pacing and survival baselines stayed stable after the readability pass.',
  ],
  footer: 'Current build target: keep losses readable at first glance while replay stays instant.',
} as const;
