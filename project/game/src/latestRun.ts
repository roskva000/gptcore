export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Focus-loss pause now clears stale keyboard holds before the run resumes',
  intro:
    'The latest builder pass stayed out of the frozen death/pause readability lane and fixed one narrower control bug instead. When the browser blurs during a live run, Phaser can keep movement keys marked as held even after the player lets go off-window; this pass now clears that stale keyboard state as the run enters focus-loss pause.',
  bullets: [
    'The scene still records whether movement was active at blur time, but it now calls Phaser `keyboard.resetKeys()` immediately after that snapshot so released keys do not stay stuck in `isDown` forever.',
    'This keeps focus-loss pause from resuming into phantom movement or leaving movement-based resume/retry flows in a weird half-held state after the browser tab, window, or address bar steals focus.',
    'No balance or overlay copy changed; this is a control-integrity fix aimed at replay and resume reliability.',
    'The next real proof point is human: verify on desktop and mobile browsers that blur/refocus no longer leaves movement feeling stuck while the existing touch and viewport fixes still hold.',
  ],
  footer:
    'Current build target: gather a focused manual sample for blur/refocus recovery, touch confidence, and whether replay stays friction-light without reopening fairness scope.',
} as const;
