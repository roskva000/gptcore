export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Near-miss reward now survives edge exits when the close shave was visible',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to close an existing near-miss detection gap instead of reopening the banned HUD/pause/panel corridor or re-tuning surge again without human evidence.',
  bullets: [
    '`nearMiss.ts` now remembers whether the closest shave happened inside the visible arena, so a real close pass still pays off even if the obstacle exits on the release frame.',
    '`GameScene.ts` stores the new visibility truth for each obstacle and `telemetry-check.ts` locks both the positive edge-exit case and the offscreen false-positive guard.',
    'Deterministic survival stays at `26.0s` average with a preserved `10.0s` first-death floor and `0%` early deaths, so this pass tightened reward honesty without moving the balance headline.',
    'No new gameplay branch, framework, or orchestration layer was added; this was a single existing-mutation bug fix.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is a real second human sample on near-miss reward and the tuned surge beat.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss or surge again without human evidence.',
} as const;
