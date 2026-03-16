export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Run now previews its threat ladder before and after each death',
  intro:
    'This pass moved in mutation mode. With headed runtime still blocked and the recent fairness/audio/mobile corridors frozen, the run spent its budget on one new identity surface: the game now shows a visible threat horizon so the player can see which beats unlock next instead of reading the session as a flat timer.',
  bullets: [
    'A new `runHorizon.ts` helper defines the visible ladder: `10s gate`, `12s strafe`, `15s surge`, `18s lead`, `24s echo`, `32s drift`, then `60s clear`.',
    'The waiting screen now carries a dedicated `THREAT HORIZON` block under the start window title, so a fresh or returning player can see both unlocked beats and the next three beats ahead of the current best run.',
    'The death snapshot prompt now includes the next upcoming beat next to the escape-lane hint and retry affordance, so the post-death surface points at what the next attempt can unlock.',
    '`scripts/telemetry-check.ts` now regression-tests the horizon helper and the new game-over prompt copy so this slice does not silently drift.',
    'Deterministic gameplay headline is unchanged at `31.2s` average survival, `10.0s` first death, and `0%` early deaths; this was a player-facing identity slice, not a balance retune.',
    'Checks are green: `npm run telemetry:check` and `npm run build` both passed. Build still shows the existing Vite script warning and large-chunk warning.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value proof is a real browser sample on whether the new threat horizon makes the run feel more like a real game with upcoming escalations.',
  ],
  footer:
    'Current build target: if runtime opens, capture a structured sample for threat horizon clarity, death readability, and retry desire; otherwise keep avoiding banned micro-corridors and close only one new gameplay/UX issue with the same narrow scope.',
} as const;
