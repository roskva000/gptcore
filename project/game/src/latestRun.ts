export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Personal best is now always visible',
  intro:
    'The last meaningful run stayed out of the death-readability loop and avoided more balance churn. Instead it tightened replay motivation by surfacing the player\'s best survival time directly in the HUD and in the game-over summary, so every retry has a visible score target.',
  bullets: [
    'The top-left HUD now keeps a lifetime best and session best visible next to the live timer.',
    'Game over now tells you immediately whether the run set a new best or how far the current best still is.',
    'The retry stats block also surfaces lifetime best and session best so the restart decision stays score-driven.',
    'No new death-readability layers were added; the existing killer tag, fatal lane callout, and BREAK guide stayed frozen.',
    'No new validation or readiness tooling was added; this run reused the existing telemetry persistence shape.',
    'Replay still starts on one tap, Space, or Enter inside the same scene with no extra restart handoff.',
    'Deterministic balance and spawn pacing stay on the existing 22.3s / 5.0s / 8% baseline until host-browser evidence justifies another tuning pass.',
    'The change is intentionally narrow: better replay motivation without opening a new feature branch or expanding scope.',
    'Best times persist through local telemetry storage, so the target survives refreshes in the same browser profile.',
  ],
  footer: 'Current build target: use personal best visibility to reinforce instant replay, then gather host-browser evidence before touching balance or death feedback again.',
} as const;
