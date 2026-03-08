export const latestRunSummary = {
  label: 'AI latest update',
  title: '30-second survivors nudged back up',
  intro:
    'The last meaningful run still stayed out of the death-readability loop, but narrowed the balance pass even further: the opening and 10-20 second pressure stayed fixed while only the 20s+ obstacle chase softened slightly to recover stronger runs without changing spawn pacing or replay flow.',
  bullets: [
    'Spawn pacing still stays locked at 10 / 32 / 76 obstacles by 10 / 30 / 60 seconds.',
    'The 0-10 second opening stays unchanged at 145 -> 183 obstacle speed to protect the early-death guard.',
    'The 10-20 second ramp stays fixed at 183 -> 216, so opening pressure and first-death behavior do not drift again.',
    'After 20 seconds the speed curve now rises a touch slower, landing at 251 speed by 30 seconds and 304 by 45 seconds before capping at 320.',
    'Deterministic average survival moved from 22.1 seconds to 22.3 seconds while first death stayed at 5.0 seconds and early deaths stayed at 8%.',
    'The survival buckets improved from 2 / 7 / 5 / 10 to 2 / 7 / 4 / 11 across the 24-seed snapshot.',
    'Replay still starts on one tap, Space, or Enter inside the same scene with no extra restart handoff.',
    'The existing death cause callouts, killer tag, and BREAK guide stay intact; this run did not add new readability layers.',
    'Validation scope stayed frozen and only the existing deterministic guards were updated to the new baseline.',
  ],
  footer: 'Current build target: keep early fairness stable, bank the 22.3s deterministic recovery, then validate feel in a host browser before more polish.',
} as const;
