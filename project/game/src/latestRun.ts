export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Deterministic survival proxy now models the live surge obstacle beat instead of reporting a stale pre-mutation baseline',
  intro:
    'This pass stayed in integration mode: headed runtime is still blocked, so the highest-value move was to make the existing deterministic proxy reflect the live Run #202 surge mutation instead of pretending the old flat mid-run baseline was still current.',
  bullets: [
    '`telemetry-reports.ts` now applies the same surge cadence and 1.14x speed multiplier that the runtime uses after 15s, so survival snapshots and seed traces include the live mid-run threat beat.',
    'The deterministic baseline moved from `27.4s` average survival to `26.0s` while preserving the `10.0s` first-death floor, which is a cleaner retain signal for the mutation than the old stale snapshot.',
    '`telemetry.ts` and `telemetry-check.ts` were updated so validation exports and regression assertions describe the live surge-aware baseline instead of the pre-mutation numbers.',
    'No new gameplay branch, framework, or orchestration layer was added; this was only a proxy-truth integration pass.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a narrow surge keep/tune/revert call informed by it.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens, otherwise use this surge-aware baseline to make one narrow retain/tune/revert decision before any further mutation.',
} as const;
