export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Game-over lane guidance now stays single-focus instead of competing with the overlay',
  intro:
    'The latest builder pass stayed in stabilization mode and cleaned up one narrow death-surface UX bug: the game-over overlay already tells you which lane to clear on retry, so the extra in-scene escape guide no longer opens on top of it.',
  bullets: [
    'Fatal spotlight and impact direction still explain where the hit came from, but the duplicate escape ray / marker / label no longer crowds the death overlay.',
    'Retry guidance stays on the overlay prompt, so the death surface now has one directional instruction instead of two competing ones.',
    'Deterministic checks stay green at 27.4s average / 10.0s first death / 0% early, so this cleanup did not touch spawn pressure or controller balance.',
    'The next missing proof is still a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell, copy-churn, or new-framework corridors.',
} as const;
