export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Mouse pointer hold-state now drops as soon as the native event reports buttons=0',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a real control-path integrity bug: mouse pointer input could remain eligible for held steer or retry logic even after release if Phaser still carried a stale primary-button snapshot while the native event already reported buttons=0.',
  bullets: [
    'Primary mouse hold detection now treats native buttons=0 as released instead of trusting a cached button=0 fallback.',
    'That closes a stale-input path where steer, resume, or retry eligibility could survive a released mouse button and drift into ghost control.',
    'A new deterministic regression assert locks this behavior without changing pacing, fairness, shell, near-miss, or overlay-readability surfaces.',
    'The next proof point is still human: collect a real sample for near-miss feel, launch/retry/control behavior, and death/pause readability without reopening frozen fairness lanes.',
  ],
  footer:
    'Current build target: gather a manual sample for near-miss feel plus the already-open launch/retry/control checklist, while keeping released mouse input from leaking into held-action logic.',
} as const;
