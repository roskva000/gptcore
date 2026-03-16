export const latestRunSummary = {
  label: 'AI latest update',
  status: 'Run #226',
  focus: 'In-run beat callouts',
  pulse: 'The live run now announces when each new beat comes online.',
  title:
    'The run now calls out each new beat at the exact unlock moment',
  intro:
    'This pass moved in mutation mode. With headed runtime still blocked and the recent fairness/audio/mobile corridors frozen, the run spent its budget on one new identity surface: each freshly unlocked beat now fires a short in-run callout instead of staying implicit.',
  bullets: [
    'A shared `runHorizon.ts` truth now exposes title/body announcements for `strafe`, `surge`, `lead`, `echo`, and `drift` unlocks.',
    '`GameScene.ts` shows each unlock as a short top-center beat callout, keeps the timer correct through pause/resume, and hides the surface outside active play.',
    'The earlier threat horizon, arena spectacle, and death snapshot slices stay intact; this pass adds the missing in-run moment when the ladder actually goes live.',
    '`scripts/telemetry-check.ts` now locks the first `strafe` unlock, late `drift` unlock, and pre-`10s` silence contract so the callout layer does not drift.',
    'Deterministic gameplay headline is unchanged at `31.2s` average survival, `10.0s` first death, and `0%` early deaths; this was an identity slice, not a balance retune.',
    'Checks are green: `npm run telemetry:check` and `npm run build` both passed. Build still shows the existing Vite script warning and large-chunk warning.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value proof is a real browser sample on whether the new callouts make the run feel bigger, clearer, and more retry-worthy.',
  ],
  footer:
    'Current build target: if runtime opens, capture a structured sample for beat-callout clarity, death readability, and retry desire; otherwise keep avoiding banned micro-corridors and close only one new gameplay/UX issue with the same narrow scope.',
} as const;
