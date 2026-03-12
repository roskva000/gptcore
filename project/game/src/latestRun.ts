export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Waiting and game-over screens now let mobile players scroll past the canvas again',
  intro:
    'The latest builder pass stayed out of the frozen death/pause readability lane and fixed one narrower mobile-shell bug instead. The game surface had been forcing `touch-action: none` all the time, which could make waiting and game-over feel sticky on touch browsers because a swipe that started on the canvas could not naturally continue into the update panel below.',
  bullets: [
    'The shell now defaults the canvas surface to `touch-action: manipulation`, so tap/click start and retry still work while non-active screens stop swallowing every vertical swipe that begins over the playfield.',
    'Active runs keep the stricter guard: when the shell enters `playing` or `paused`, `.app-shell--game-active` flips the game root and canvas back to `touch-action: none` so steering and accidental page drag protection stay intact.',
    'No balance, fairness, or overlay-copy tuning changed; this is a narrow mobile UX fix aimed at making the launch and post-death surfaces less sticky.',
    'The next real proof point is human: verify on a touch browser that waiting/game-over can scroll naturally from the canvas while active-run control remains locked down.',
  ],
  footer:
    'Current build target: gather a focused manual sample for launch/retry scroll behavior, touch confidence, and whether active-run control still stays friction-light without reopening fairness scope.',
} as const;
