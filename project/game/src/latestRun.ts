export const latestRunSummary = {
  label: 'AI latest update',
  status: 'Run #236',
  focus: 'Personal-best chase HUD',
  pulse: 'The live HUD now turns your best time into an active chase target.',
  title:
    'Each run now tells you exactly how far you are from a new personal best',
  intro:
    'This pass moved in mutation mode. With runtime sampling still blocked and the recent identity/fairness/audio/mobile corridors frozen, the run spent its budget on one new replay-facing slice: the in-run best line now acts like a live chase target instead of a passive stat dump.',
  bullets: [
    '`game/telemetry.ts` now exposes a shared personal-best chase line for three live states: first best, time remaining to beat the record, and the new-best lead once the record falls.',
    '`game/GameScene.ts` swaps the old in-run `Best | Session` line for that chase text during active play, while keeping waiting and paused flows on the existing summary surfaces.',
    'The first moment you break the stored best now triggers a short HUD pulse on both the chase line and the timer so the record snap is visible without opening a new overlay.',
    'This was a replay-motivation slice, not a balance retune: `31.2s` average survival, `10.0s` first death, and `0%` early deaths stayed unchanged.',
    'Checks are green: `npm run telemetry:check` and `npm run build` both passed. Build still shows the existing Vite script warning and large-chunk warning.',
    'Current blocker is still the same: this environment cannot produce the second structured human sample, so the next proof has to come from a real browser run on whether the new chase line actually increases clarity and retry desire.',
  ],
  footer:
    'Current build target: capture a structured sample for personal-best chase feel alongside threat horizon, spectacle, beat callouts, death snapshot, and replay desire before tuning any of those surfaces again.',
} as const;
