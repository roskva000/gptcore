export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Late-run echo obstacles now add a second deterministic pressure beat instead of repeating the same direct-chase rhythm',
  intro:
    'This pass moved into mutation mode: headed runtime is still blocked, so the narrowest product-facing move was to open one new gameplay beat inside the existing variant system instead of spending another run on banned HUD/pause/panel, replay-intent, near-miss, surge, or spawn-fairness micro-tuning corridors without human evidence.',
  bullets: [
    'A new `echo` obstacle variant now unlocks from `24s` and takes every `6th` spawn, overriding surge only on overlapping cadence points so late runs gain a distinct second beat.',
    'Echo obstacles keep standard speed but aim with `0.22s` target lag, creating readable trailing sweeps instead of another direct-chase spike.',
    'Runtime and deterministic proxy share the same echo variant contract, so the survival snapshot stays green at `26.0s` average survival, `10.0s` first death, and `0%` early deaths.',
    'The survival distribution widens slightly toward the cap (`0 / 3 / 11 / 10`), which means the new beat changes run texture without reopening early-death regressions.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is a real second human sample focused on whether the echo beat feels readable and worth keeping.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, spawn fairness, spawn-bookkeeping, or this new echo beat again without human evidence.',
} as const;
