export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Canvas now blocks browser touch gestures in every game phase',
  intro:
    'This pass moved in stabilization mode. Headed runtime is still blocked, so instead of reopening recent fairness, mutation, payoff, or HUD/panel corridors, the run closed a narrow mobile UX bug tied directly to the only human signal on file: the game surface itself could still hand touch gestures back to the browser outside active play, making start, retry, and touch steering feel worse than they needed to on phones.',
  bullets: [
    'The root game surface and the Phaser canvas now keep `touch-action: none` in waiting, playing, paused, and game-over phases instead of only during the gameplay-active shell state.',
    'This keeps taps, drags, and retry inputs on the canvas from competing with browser pan/zoom gesture handling while still leaving the rest of the page unchanged.',
    'The fix targets mobile control and replay friction directly without reopening recent spawn-fairness, mutation, payoff, replay-intent, or HUD/panel tuning corridors.',
    'No pacing, obstacle cadence, fairness guard, or telemetry baseline changed; the deterministic headline stays `30.7s` average survival, `10.0s` first death, and `0%` early deaths.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample focused on readability, fairness, and replay feel.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise keep avoiding the banned micro-corridors and close the next new gameplay/UX issue with the same narrow scope.',
} as const;
