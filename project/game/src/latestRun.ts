export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Death screen now lands as a cleaner snapshot instead of a text dump',
  intro:
    'This pass moved in mutation mode. With headed runtime still blocked and the recent fairness/audio/mobile corridors frozen, the run spent its budget on one proof-of-fun surface the human signal called out directly: the game-over view now reads like a compact death snapshot instead of a noisy wall of copy.',
  bullets: [
    'A new `deathPresentation.ts` helper now composes the death callout, badge, body, prompt, and compact stats block from live run/session truth instead of ad-hoc strings inside `GameScene.ts`.',
    'The overlay now promotes a single snapshot rhythm: `DEATH SNAPSHOT`, a conditional badge (`NEW BEST`, `10s BROKEN`, or `60s CLEAR`), a short progress line, the escape-lane hint, and a compact recent-runs/validation footer.',
    'This keeps the hit direction explicit while reducing the feeling of an overloaded death screen; the player sees what happened, what progress was banked, and how to retry without reopening panel/HUD churn.',
    '`scripts/telemetry-check.ts` now regression-tests the new death presentation copy so the cleaner game-over surface does not silently drift back into noisy text.',
    'Deterministic gameplay headline is unchanged at `31.2s` average survival, `10.0s` first death, and `0%` early deaths; this was a player-facing readability slice, not a balance retune.',
    'Checks are green: `npm run telemetry:check` and `npm run build` both passed. Build still shows the existing Vite script warning and large-chunk warning.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value proof is a real browser sample on whether the new death snapshot actually feels clearer and more game-like.',
  ],
  footer:
    'Current build target: if runtime opens, capture a structured sample for death readability and retry desire; otherwise keep avoiding banned micro-corridors and close only one new gameplay/UX issue with the same narrow scope.',
} as const;
