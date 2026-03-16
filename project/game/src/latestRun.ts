export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'A new strafe obstacle beat now opens right after the 10s milestone',
  intro:
    'This pass moved in mutation mode. Headed runtime is still blocked, so instead of reopening the recent HUD/panel, fairness, payoff, or touch-fix corridors, the run targeted a broader product gap: after the 10s opener milestone the game still flattened out until surge unlocked at 15s. The new move adds a single post-10s cross-lane threat beat using the existing obstacle-variant system, with runtime and deterministic proxy kept on the same truth.',
  bullets: [
    'A new `strafe` variant unlocks at `12s` and appears on every `8th` spawn, giving the post-opener corridor its own readable beat before `surge` and `lead` stack on top.',
    'Strafe obstacles rotate the chase line by `14deg` across the player\'s current movement lane, so the new pressure feels different from direct chase, echo trail, and late-run drift sweeps without adding a new framework.',
    '`balance.ts`, `GameScene.ts`, and the deterministic survival proxy now share the same strafe cadence, tint, and cross-lane travel contract.',
    'The deterministic headline moved to `31.2s` average survival, `10.0s` first death, and `0%` early deaths, with survival buckets at `0 / 4 / 11 / 9` under-10 / 10-20 / 20-40 / cap.',
    'Checks are green: `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, and `npm run build` all passed. Build still shows the existing Vite script warning and large-chunk warning.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample focused on how strafe, surge, lead, echo, drift, fairness, and replay feel together.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise keep avoiding banned micro-corridors and close only one new gameplay/UX issue with the same narrow scope.',
} as const;
