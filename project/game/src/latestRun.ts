export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Replay starts reliably again',
  intro:
    'The last meaningful run fixed the post-death restart path without changing difficulty pacing.',
  bullets: [
    'Retry no longer depends on a full scene restart that dropped the next run into a waiting state.',
    'One tap, Space, or Enter now clears the old death state and starts a fresh run immediately.',
    'Obstacles, overlay text, impact markers, and player tint all reset before the replay begins.',
    'Fatal lane ray, directional hit callout, flash, and death blip remain in place for readability.',
    'Deterministic pacing and survival baselines stayed stable after the replay fix.',
  ],
  footer: 'Current build target: keep replay instant while making losses readable and fair.',
} as const;
