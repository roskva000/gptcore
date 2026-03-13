export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Telemetry now keeps real death timing instead of rounding threshold truth upward',
  intro:
    'The latest builder pass stayed in stabilization mode and closed a telemetry integrity gap: completed runs were being stored with rounded survival time, which could make sub-10-second deaths look cleaner than they really were.',
  bullets: [
    'Completed-run telemetry now stores raw survival time for best, first death, recent deaths, last run, and average survival instead of smoothing those fields through display rounding.',
    'That keeps under-10-second deaths honestly counted as early even when UI-facing readouts round up to 10.0s.',
    'A new deterministic regression assert locks this threshold-truth contract without changing pacing, fairness, shell, near-miss, or overlay-readability surfaces.',
    'The next proof point is still human: collect a real sample for near-miss feel, launch/retry/control behavior, and death/pause readability without reopening frozen fairness lanes.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, while keeping telemetry truth aligned with what the run actually was.',
} as const;
