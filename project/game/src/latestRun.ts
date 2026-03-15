export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Spawn target lag now respects wall-blocked movement instead of aiming through it',
  intro:
    'This pass stayed in stabilization mode: headed runtime is still blocked, so the narrowest product-facing move was to close a real spawn-trajectory fairness drift instead of reopening the banned HUD/pause/panel corridor or re-tuning near-miss and surge again without human evidence.',
  bullets: [
    '`spawn.ts` now exposes one shared spawn-target helper, so reachability clamp and target-lag aim use the same wall-aware truth.',
    '`GameScene.ts` and `telemetry-reports.ts` both switched to that helper; obstacles no longer lead as if the player could keep moving into a blocked wall, and the deterministic proxy matches runtime.',
    'New regression coverage locks right-wall partial blocking and fully corner-blocked target cases while the main survival baseline stays `26.0s` average, `10.0s` first death, `0%` early.',
    'No new gameplay branch, framework, or orchestration layer was added; this was a single spawn-fairness integrity fix.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample or a different narrow gameplay/UX source issue.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise move to a different narrow gameplay/UX source issue instead of re-tuning near-miss, surge, or this wall-target fix again without human evidence.',
} as const;
