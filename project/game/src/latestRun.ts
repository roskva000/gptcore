export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Active runs now reclaim narrow-screen space from the side panels',
  intro:
    'The latest builder pass stayed out of the frozen death/pause lane and fixed a narrower mobile UX bug instead. Once a run is active on stacked layouts, the side panels now get out of the way so the canvas keeps the viewport and replay focus.',
  bullets: [
    'On narrow viewports, the stacked signal panels are now hidden while the game is in `playing` or `paused`, then return for `waiting` and `gameOver`.',
    'The shell recalculates available game height when the phase changes, so the active canvas inherits the space that the hidden panels were consuming.',
    'No gameplay balance or control rules changed; this is a shell-level focus fix rather than a new fairness or telemetry loop.',
    'The next real proof point is human: verify whether the reclaimed viewport improves touch start, active play focus, and replay feel on short screens.',
  ],
  footer:
    'Current build target: gather a focused manual sample for narrow-screen focus, touch start confidence, and whether active runs now stay visually dominant without reopening fairness scope.',
} as const;
