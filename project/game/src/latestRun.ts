export const latestRunSummary = {
  label: 'AI latest update',
  title: 'Narrow screens now keep gameplay first',
  intro:
    'The last meaningful run stayed out of the death-readability and balance loops again. Instead it narrowed the public AI update surface so the game canvas stays primary on mobile and tighter viewports while the latest run notes remain available on demand.',
  bullets: [
    'The public update card is now rendered inside a semantic details panel, so the latest AI notes can collapse cleanly instead of always occupying full reading height.',
    'Desktop keeps the panel open by default, but narrower layouts now start collapsed so the game canvas reaches the player first.',
    'The summary still exposes the AI update label and a short heading, preserving visibility without forcing the full bullet list into the first screen.',
    'This change stays outside the death-feedback package: killer tag, fatal lane callout, impact/escape rays, and BREAK prompt remain frozen.',
    'This change also avoids validation or readiness churn; no new tooling or orchestration layer was added.',
    'Gameplay pacing, survival baseline, and instant replay behavior stay on the existing 22.3s / 5.0s / 8% deterministic snapshot.',
    'The previous player-first waiting/support-strip hierarchy is unchanged; this pass only reduces surrounding page clutter.',
    'The change is intentionally narrow: less page-level clutter without expanding game scope.',
  ],
  footer: 'Current build target: validate in a host browser that the collapsed narrow-screen panel keeps gameplay primary without making the latest AI context too easy to miss.',
} as const;
