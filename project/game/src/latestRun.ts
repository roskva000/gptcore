export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Same-edge opener pressure now rerolls marginal repeat lanes near the player',
  intro:
    'The latest builder pass stayed in stabilization mode and closed one narrow opener-pressure bug instead of opening a new system: early spawn selection now keeps searching when a merely-positive same-edge entry would stack onto a visible same-edge threat that is already sitting near the player.',
  bullets: [
    'A visible same-edge threat near the player can now force one more reroll even if the first new spawn still scores slightly positive on raw distance alone.',
    'The guard is narrow: it only applies through the opening window, only when the old and new entries share the same edge, and it does not move the deterministic survival baseline off 26.5s average / 6.3s first death / 4% early.',
    'New deterministic regressions lock the same-edge near-player reroll rule, and the average spawn-reroll snapshot updates from 0.4 to 0.5 to reflect that extra opening caution.',
    'Deterministic checks still pass at 26.5s average / 6.3s first death / 4% early; the next missing proof is a headed human sample for opener fairness, near-miss feel, and death/pause readability.',
  ],
  footer:
    'Current build target: get a real second sample, or keep closing one narrow gameplay bug at a time without reopening the mobile-shell, copy-churn, or new-framework corridors.',
} as const;
