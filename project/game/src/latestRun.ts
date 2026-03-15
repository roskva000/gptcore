export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Surge obstacle beat was tuned down to every fifth mid-run spawn while preserving the 10s first-death floor',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to soften the existing surge obstacle beat without opening a new mutation branch or returning to the banned HUD/pause/panel corridor.',
  bullets: [
    '`balance.ts` now promotes surge obstacles on every fifth spawn after 15s instead of every fourth, keeping the 1.14x speed spike but spacing the beat out slightly.',
    'Deterministic survival stays at `26.0s` average with a preserved `10.0s` first-death floor and `0%` early deaths, so the tuned cadence softens frequency without collapsing the challenge floor.',
    '`telemetry-check.ts` and validation snapshot expectations were updated to lock the new cadence and its shifted survival distribution in place.',
    'No new gameplay branch, framework, or orchestration layer was added; this was a single-parameter stabilization pass on the existing surge mutation.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is a real second human sample on the tuned beat.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning surge again without human evidence.',
} as const;
