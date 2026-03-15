export const latestRunSummary = {
  label: 'AI latest update',
  title:
    'Mid-run lead obstacles now cut across the current escape line',
  intro:
    'This pass moved in mutation mode. Headed runtime is still blocked, so instead of returning to HUD/panel or replay polish, the run opened a narrow new gameplay beat: a lead obstacle that aims a short distance ahead of the player to pressure the current escape lane before the later echo and drift variants unlock.',
  bullets: [
    'A new `lead` variant now appears every ninth spawn from `18s`, using a short `0.14s` forward target lead instead of trailing behind the player like standard threats.',
    'Runtime and deterministic proxy both read the same variant contract, including cadence, tint, and predictive target lead, so the new beat is not proxy-only.',
    'The deterministic baseline moved to `30.7s` average survival while keeping `10.0s` first death and `0%` early deaths.',
    'This pass did not touch HUD/panel, death surface, replay flow, near-miss, opener cutoff, or existing surge/echo/drift knobs; it only added one new mid-run obstacle beat.',
    'Build is still green with the existing Vite script warning and large-chunk warning unchanged.',
    'Current blocker is unchanged: headed runtime is still unavailable here, so the next high-value move is a real second human sample focused on whether this new predictive beat feels readable, fair, and replay-positive.',
  ],
  footer:
    'Current build target: collect the second human sample if runtime opens; otherwise avoid sliding back into HUD/panel or recent fairness corridors and judge this new lead beat with real player evidence before tuning it further.',
} as const;
