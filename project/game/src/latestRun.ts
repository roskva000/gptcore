export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Spawn cadence and surge counting now advance only when a real obstacle is allocated on the scene',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to close a runtime gameplay-integrity bug instead of reopening banned HUD/pause/panel, replay-intent, near-miss, surge, or spawn-fairness tuning corridors without human evidence.',
  bullets: [
    '`GameScene.ts` no longer increments `runSpawnCount` or `runSpawnRerolls` before the obstacle pool actually returns a live body.',
    'If the pool ever runs dry, the game now skips the invisible spawn cleanly instead of silently advancing surge cadence, difficulty bookkeeping, and spawn-save telemetry with no new threat on screen.',
    'Deterministic checks stay green at `26.0s` average survival, `10.0s` first death, and `0%` early deaths, so this was an integrity fix rather than a pacing retune.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a different narrow gameplay/UX source issue.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, spawn fairness, or this spawn-bookkeeping path again without human evidence.',
} as const;
