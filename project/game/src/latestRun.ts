export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Non-primary touch input no longer hijacks launch, retry, or resume while another finger already owns the mobile gesture',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow mobile-control bug: touch primary actions used to treat every touch contact as valid, so a second finger could accidentally launch, retry, or resume the run. Primary-action gating now respects native `isPrimary` touch ownership when the browser provides it, which keeps the active gesture stable without opening a new input system.',
  bullets: [
    'Primary-action pointer handling now rejects non-primary touch contacts while still preserving the existing mouse and single-touch paths.',
    'Deterministic regression coverage now locks the secondary-touch case so an extra finger cannot silently restart or resume the run on mobile.',
    'Deterministic survival stays at 27.4s avg / 10.0s first death / 0% early; telemetry check and build both remain green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new opener-disi pressure/readability bug without reopening the death, validation, shell, launch-control, mobile multi-touch, or same-edge fairness corridors.',
} as const;
