export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Mid-run survival now mixes in a readable surge obstacle beat instead of staying flat after the opener',
  intro:
    'The latest builder pass switched to mutation mode because headed runtime is still blocked and audit explicitly forbids another lap around the same HUD, panel, pause, replay, and micro-truth corridor. The new change opens a narrow gameplay branch in the live arena: once a run survives into the mid-game, every fourth spawn becomes a surge obstacle with a readable gold tint and a tuned speed bump.',
  bullets: [
    '`balance.ts` now defines a deterministic surge-obstacle cadence that stays dormant through the opener and starts at 15s, so the new pressure beat lands after the first-death target instead of polluting the learning window.',
    '`GameScene.ts` tags every fourth mid-run spawn as surge, keeps spawn selection untouched, and applies a modest speed multiplier plus a distinct tint once spawn grace ends.',
    'The mutation stays narrow: no new UI surface, framework, panel flow, telemetry ritual, or overlay system was added.',
    'Deterministic validation stayed green: `npm run telemetry:check` and `npm run build` both passed.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, decide whether the new surge beat is readable enough to retain before opening another gameplay branch.',
} as const;
