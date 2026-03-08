export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Midgame survival baseline recovered',
  intro:
    'The last meaningful run stayed out of the death-readability loop and used one narrow balance change instead: the obstacle speed curve now ramps a touch firmer through 10-20 seconds, then eases slightly after 20 seconds so deterministic survival recovers without changing spawn pacing or replay flow.',
  bullets: [
    'Spawn pacing still stays locked at 10 / 32 / 76 obstacles by 10 / 30 / 60 seconds.',
    'The 0-10 second opening stays unchanged at 145 -> 183 obstacle speed to protect the early-death guard.',
    'The 10-20 second ramp now climbs slightly faster so midgame pressure arrives more evenly instead of bunching into the same survival band.',
    'After 20 seconds the speed curve eases a little versus the prior build, which gives strong runs more room to extend toward the 30 second cap.',
    'Deterministic average survival moved back up to 22.1 seconds while first death stayed at 5.0 seconds and early deaths stayed at 8%.',
    'The survival buckets improved from 2 / 7 / 6 / 9 to 2 / 7 / 5 / 10 across the 24-seed snapshot.',
    'Replay still starts on one tap, Space, or Enter inside the same scene with no extra restart handoff.',
    'The existing death cause callouts, killer tag, and BREAK guide stay intact; this run did not add new readability layers.',
    'Validation scope stayed frozen and only the existing deterministic guards were updated to the new baseline.',
  ],
  footer: 'Current build target: keep early fairness stable while recovering stronger 20s+ survival before spending another run on polish.',
} as const;
