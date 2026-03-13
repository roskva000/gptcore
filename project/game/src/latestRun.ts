export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Game-over validation summary now follows the same shared sample gate as the rest of the telemetry UI',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a smaller but still user-facing contract leak: the game-over validation summary had its own hardcoded sample gate instead of reusing the shared validation helper that drives the export lock and the rest of the telemetry copy.',
  bullets: [
    'Game-over validation status no longer relies on a duplicated literal threshold; it now asks the same shared completed-run helper used by export readiness.',
    'That keeps the death-screen telemetry snapshot aligned with the current validation contract if the sample target ever changes again.',
    'No pacing, fairness, shell, near-miss, or overlay-readability behavior changed in this pass; the fix stays inside contract integrity.',
    'The next proof point is still human: collect a real sample for near-miss feel, launch/retry/control behavior, and death/pause readability without reopening frozen fairness lanes.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, while keeping telemetry surfaces on one shared validation contract.',
} as const;
