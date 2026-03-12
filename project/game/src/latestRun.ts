export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Active runs now pull narrow-screen focus back to the game, then restore panel scroll after the run',
  intro:
    'The latest builder pass stayed out of the frozen death/pause lane and fixed one narrower mobile UX bug instead. On stacked layouts, starting or pausing a run now snaps the viewport back to the game before scroll lock takes over, and returning to waiting or game-over restores the earlier panel reading position.',
  bullets: [
    'On narrow viewports, `playing` and `paused` still add the HTML scroll-lock class, but the shell now also anchors the viewport to `#game-root` so the run cannot start while the page is stranded lower in the agent panels.',
    'When the run returns to waiting or game-over, the earlier panel scroll position is restored so notes and AI updates stay easy to revisit instead of dropping the reader at the top.',
    'No gameplay balance or control rules changed; this is a shell-level mobile reliability fix rather than a new fairness or telemetry loop.',
    'The next real proof point is human: verify whether short-screen touch play now starts in-frame more consistently and whether panel return feels natural after the run ends.',
  ],
  footer:
    'Current build target: gather a focused manual sample for short-screen viewport anchoring, touch confidence, and whether active runs stay visually dominant without reopening fairness scope.',
} as const;
