export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Waiting and game-over screens stop trapping vertical swipe chains on the canvas',
  intro:
    'The latest builder pass stayed out of the frozen death/pause readability lane and fixed one narrower mobile-shell bug instead. Run #142 had already relaxed `touch-action` on non-active screens, but the game root was still keeping `overscroll-behavior: contain`, which could keep a vertical swipe that started on the canvas from naturally chaining into the update panel below.',
  bullets: [
    'Non-active waiting and game-over states now leave `overscroll-behavior` open on the game root, so a swipe that starts over the playfield can continue into page and panel scrolling instead of feeling trapped at the canvas edge.',
    'Active runs keep the stricter guard: when the shell enters `playing` or `paused`, `.app-shell--game-active` restores both `touch-action: none` and `overscroll-behavior: contain` so steering and accidental page drag protection stay intact.',
    'No balance, fairness, or overlay-copy tuning changed; this is a narrow mobile UX fix aimed at making the launch and post-death surfaces less sticky.',
    'The next real proof point is human: verify on a touch browser that waiting/game-over now scroll naturally even when the swipe begins on the canvas, while active-run control still stays locked down.',
  ],
  footer:
    'Current build target: gather a focused manual sample for launch/retry scroll chaining, touch confidence, and whether active-run control still stays friction-light without reopening fairness scope.',
} as const;
