export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deaths now spotlight the killer lane',
  intro:
    'The last meaningful run kept replay speed intact while making the fatal threat easier to read: pooled obstacles now reset to a neutral look, and non-fatal threats fade back when you die.',
  bullets: [
    'Game over still shows the fatal lane plus the teal BREAK guide toward the safer opposite lane.',
    'Only the killer obstacle keeps the spotlight on death; the rest of the arena fades back to reduce clutter.',
    'Respawned obstacles now clear any old tint, alpha, or scale so prior death highlights cannot leak into a fresh run.',
    'Survival and cause stay in the main summary while retry and telemetry details remain secondary.',
    'One tap, Space, or Enter still clears the old death state and starts a fresh run immediately.',
    'Deterministic pacing and survival baselines stayed stable after the readability pass.',
  ],
  footer: 'Current build target: keep death feedback instantly readable without leaking old visual state into the next attempt.',
} as const;
