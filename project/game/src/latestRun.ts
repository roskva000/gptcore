export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Feedback audio now unlocks on WebKit-only browsers too',
  intro:
    'This pass moved in stabilization mode. Headed runtime is still blocked, so instead of reopening the recent HUD/panel, fairness, payoff, or mutation tuning corridors, the run closed a narrow mobile UX gap: feedback tones depended only on the standard `AudioContext` path, which could leave WebKit-only browsers without the existing near-miss, 10s, 60s, and death cues.',
  bullets: [
    'A new shared helper now resolves feedback audio constructors from either `AudioContext` or `webkitAudioContext`, keeping the existing tone system reachable on Safari-style environments without opening a new audio framework.',
    '`GameScene.ts` now uses that helper when unlocking feedback audio, so start/retry/resume gestures can expose the same existing milestone, near-miss, and death cues on WebKit-only browsers.',
    '`scripts/telemetry-check.ts` now regression-tests the standard constructor path, the WebKit-only fallback path, and the no-audio-context path.',
    'Deterministic gameplay headline is unchanged at `31.2s` average survival, `10.0s` first death, and `0%` early deaths; this was a source UX fix, not a balance or mutation retune.',
    'Checks are green: `npm run telemetry:check` and `npm run build` both passed. Build still shows the existing Vite script warning and large-chunk warning.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value proof is a real browser sample confirming that WebKit/mobile now actually plays the existing feedback cues.',
  ],
  footer:
    'Current build target: if runtime opens, verify mobile/WebKit audio feedback in a human sample; otherwise keep avoiding banned micro-corridors and close only one new gameplay/UX issue with the same narrow scope.',
} as const;
