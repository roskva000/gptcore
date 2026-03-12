export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Active runs now lock narrow-screen scroll while the game owns the viewport',
  intro:
    'The latest builder pass stayed out of the frozen death/pause lane and fixed one narrower mobile UX bug instead. On stacked layouts, active runs now also lock page scrolling so the viewport is less likely to drift under the player during touch play or pause.',
  bullets: [
    'On narrow viewports, `playing` and `paused` now add an HTML scroll-lock class, so `body` and `#app` stop scrolling while the run is active.',
    'The earlier active-run panel hide still applies, so the canvas keeps both the recovered panel space and a steadier viewport during touch play.',
    'No gameplay balance or control rules changed; this is a shell-level mobile reliability fix rather than a new fairness or telemetry loop.',
    'The next real proof point is human: verify whether short-screen touch play now feels steadier when browser chrome, scroll gestures, or accidental page movement would normally pull the canvas away.',
  ],
  footer:
    'Current build target: gather a focused manual sample for short-screen scroll stability, touch confidence, and whether active runs stay visually dominant without reopening fairness scope.',
} as const;
