export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Fresh spawn-grace obstacles now sit beneath live threats so harmless arrivals stop masking the real danger lane',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow gameplay-readability bug: newly spawned obstacles already had a collision-grace window, but they still rendered at the same depth as live threats. That let a harmless arrival visually sit on top of a collision-ready lane. Spawn-grace visuals now stay underneath live obstacles until the grace window actually ends.',
  bullets: [
    'A shared spawn-grace helper now owns both the softened visual state and the obstacle depth contract, so harmless arrivals render below collision-ready threats instead of competing with them.',
    'GameScene applies that same helper on spawn, grace unlock, and cleanup, keeping the change narrow and avoiding new gameplay logic or pacing changes.',
    'Deterministic survival stays at 27.4s avg / 10.0s first death / 0% early; telemetry check and build both remain green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new opener-disi pressure/readability bug without reopening the death, validation, shell, launch-control, or same-edge fairness corridors.',
} as const;
