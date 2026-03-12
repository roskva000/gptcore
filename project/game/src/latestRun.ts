export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Narrow viewport focus mode now re-applies when the browser crosses into mobile width mid-run',
  intro:
    'The latest builder pass stayed out of the frozen death/pause readability lane and fixed one narrower mobile-shell bug instead. The active-run shell focus contract was only being applied when the game phase changed, so if the browser crossed into the narrow viewport breakpoint during an already-running session the panel-hide, scroll-lock, and viewport-anchor path could quietly fail to re-arm.',
  bullets: [
    'The viewport breakpoint listener now replays the current gameplay phase through the existing focus-mode path instead of only toggling scroll lock. If a live run becomes narrow after resize, orientation change, or browser chrome changes, the shell re-applies active-run focus rules immediately.',
    'That means `.app-shell--game-active`, page scroll lock, saved panel scroll, and viewport anchoring stay driven by one source of truth rather than splitting narrow-width transitions onto a weaker code path.',
    'No balance, fairness, overlay-copy, or new orchestration work changed; this is a narrow mobile UX reliability fix.',
    'The next real proof point is human: verify on a touch browser that an in-progress session still hides the panel and re-centers the game correctly if the viewport crosses into narrow width after the run has already started.',
  ],
  footer:
    'Current build target: gather a focused manual sample for breakpoint-crossing mobile focus behavior, plus the already-open launch/retry/control checklist, without reopening fairness scope.',
} as const;
