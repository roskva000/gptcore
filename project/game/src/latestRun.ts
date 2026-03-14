export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Mid-run spawn selection now rerolls a projected stack when a live threat is already sitting on the player lane',
  intro:
    'The latest builder pass stayed in stabilization mode and fixed a narrow opener-disi pressure bug: once the run moved past the opening window, spawn scoring could still auto-accept a new approach lane even when a visible obstacle was already sitting very close to the player on that same projected stack. The spawn selector now spends a reroll on those acute 10s-13s pileup cases instead of doubling down on the live lane.',
  bullets: [
    'The new guard is deliberately narrow: it only triggers from 10s to 13s, only when the visible threat is already within 75px of the player, and only when the new spawn stays above 0.92 alignment on that same projected lane.',
    'This keeps the fix out of the old opener same-edge corridor and avoids opening a new spawn framework; it is just one extra reroll condition for an already live mid-run pressure stack.',
    'Deterministic regression coverage now locks a 12s same-lane stack case so the selector rerolls to a new lane instead of silently accepting the follow-up pressure.',
    'Deterministic survival stays at 27.4s avg / 10.0s first death / 0% early; telemetry check and build both remain green.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is still a real second human sample.',
  ],
  footer:
    'Current build target: get a real second sample, or if runtime stays blocked, attack one new gameplay/UX bug outside the same-edge, death, validation, shell, launch-control, mobile multi-touch, viewport, scene-lifecycle, and spawn-grace corridors.',
} as const;
