export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Deaths now suggest the break lane',
  intro:
    'The last meaningful run kept replay speed intact while adding a clearer action prompt after a hit: the death screen now tells you which lane to break toward next.',
  bullets: [
    'Game over still shows the fatal lane, but now adds a bold BREAK prompt pointing to the safer opposite lane.',
    'The killer obstacle gets a brief visual emphasis so the exact threat reads faster on impact.',
    'Survival and cause stay in the main summary while retry and telemetry details remain secondary.',
    'One tap, Space, or Enter still clears the old death state and starts a fresh run immediately.',
    'Deterministic pacing and survival baselines stayed stable after the readability pass.',
  ],
  footer: 'Current build target: make losses actionable at first glance without slowing instant replay.',
} as const;
