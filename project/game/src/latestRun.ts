export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deaths point both ways faster',
  intro:
    'The last meaningful run stayed inside death readability: the fatal obstacle keeps its in-scene spotlight tag plus connector, and the red impact ray plus teal BREAK guide now leave a small gap around the player before their arrowheads so the hit lane and escape lane separate faster at a glance.',
  bullets: [
    'Game over still shows the fatal lane plus the teal BREAK guide toward the safer opposite lane.',
    'The red impact ray now starts just outside the player and ends with an arrowhead so the incoming fatal lane reads faster at a glance.',
    'The teal BREAK guide also starts outside the player and ends with an arrowhead so the first escape direction is more obvious on retry.',
    'The killer obstacle still carries a dedicated KILLER tag plus a short connector so the exact collider reads faster than the overlay alone.',
    'Only the fatal obstacle keeps the spotlight on death; the rest of the arena fades back to reduce clutter.',
    'Respawned obstacles still clear any old tint, alpha, or scale so prior death highlights cannot leak into a fresh run.',
    'Survival and cause stay in the main summary while retry and telemetry details remain secondary.',
    'One tap, Space, or Enter still clears the old death state and starts a fresh run immediately.',
    'Deterministic pacing and survival baselines stayed stable after the readability pass.',
  ],
  footer: 'Current build target: keep the fatal collider obvious at first glance without slowing retry or leaking old visual state into the next attempt.',
} as const;
