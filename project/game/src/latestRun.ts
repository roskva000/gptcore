export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deaths now tag the killer obstacle',
  intro:
    'The last meaningful run stayed inside death readability: the fatal obstacle now gets its own in-scene spotlight tag, while pooled obstacles still reset to neutral and non-fatal threats fade back on death.',
  bullets: [
    'Game over still shows the fatal lane plus the teal BREAK guide toward the safer opposite lane.',
    'The killer obstacle now carries a dedicated KILLER tag in-scene so the exact collider reads faster than the overlay alone.',
    'Only the fatal obstacle keeps the spotlight on death; the rest of the arena fades back to reduce clutter.',
    'Respawned obstacles still clear any old tint, alpha, or scale so prior death highlights cannot leak into a fresh run.',
    'Survival and cause stay in the main summary while retry and telemetry details remain secondary.',
    'One tap, Space, or Enter still clears the old death state and starts a fresh run immediately.',
    'Deterministic pacing and survival baselines stayed stable after the readability pass.',
  ],
  footer: 'Current build target: keep the fatal collider obvious at first glance without slowing retry or leaking old visual state into the next attempt.',
} as const;
