export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Fatal lane is easier to read now',
  intro:
    'The last meaningful run focused on making each loss clearer without slowing replay.',
  bullets: [
    'A short impact ray now points through the fatal lane as the hit lands.',
    'The hit callout still names which side the fatal obstacle closed in from.',
    'The flash and short death blip still mark the exact hit frame.',
    'Restart flow stays instant, so another run starts with one tap or key press.',
    'Difficulty pacing and deterministic survival baselines stayed stable after the UX pass.',
  ],
  footer: 'Current build target: keep losses readable, fair, and worth retrying.',
} as const;
