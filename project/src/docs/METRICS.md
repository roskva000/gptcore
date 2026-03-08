# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 24.3s in deterministic survival snapshot
baseline: 24.3s
target: hold `>= 24.3s` unless manual sample proves the opener feels too empty

first_death_time:
current: 6.3s in deterministic survival snapshot
baseline: 6.3s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 4% in deterministic survival snapshot
baseline: 4%
target: stay at or below 4%

survival_bucket_distribution:
current: `<10s: 1`, `10-20s: 5`, `20-30s: 6`, `30s cap: 12`
baseline: `1 / 5 / 6 / 12` across 24 deterministic seeds
target: keep `10-20s <= 5`, `<10s <= 1`, and hold `30s cap >= 12`

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 251 at 30s, 304 at 45s, 320 at 60s
baseline: same
target: preserve the early-death guard and validate manually that the softer 20s+ chase still feels tense

early_spawn_collision_grace:
current: first `10s` spawns move immediately but cannot deal damage for `260ms`; after `10s` the grace returns to `0ms`
baseline: added in Run #52 as a narrow fairness guard without changing spawn pacing or obstacle speed anchors
target: confirm manually that this removes cheap spawn-touch moments without making new obstacles feel ghostly or too forgiving

opening_required_spawn_distance:
current: first `6s` add `+160px` to the required spawn distance, then return to the prior baseline
baseline: added in Run #53 to make the existing spawn-reroll fairness helper actually activate during the opener
target: confirm manually that this removes crowded opening lanes without making the first seconds feel empty

validation_export_contract:
current: `5 runs | first death 24.2s | early 20% | 5/5 runs, review early deaths`
baseline: Run #54 aligned the export with actual early-death risk; detailed report carries `avg_survival=24.1s`, `last_run=30.0s`, `spawn_saves=3`, and deterministic baseline text `24.3s avg / 6.3s first death / 4% early`
target: keep `V` export and parser aligned, and never mark a 5-run sample as healthy while it still contains `<10s` deaths

early_spawn_target_lag:
current: first `10s` spawn aim uses `0.18s` of player-velocity lag, then returns to exact-position targeting
baseline: added in Run #51 to soften unfair early intercept lines without changing spawn pacing or obstacle speed anchors
target: confirm manually that this improves fairness without making the opening chase feel soft

manual_validation_sample:
current: not collected in this runtime; browser preflight is now ready but the packaged smoke step fails with CDP `Page.enable`, so real-player sampling is still outstanding
target: 5-10 runs via session telemetry when a suitable browser runtime is available; note whether replay really restarts on one action, whether fresh-press movement-key retry feels natural without accidental auto-replay, whether focus-loss pause/resume feels fair and clear, whether an early pause preserves the remaining coaching-hint window, whether the new personal-best cue plus waiting/support-strip hierarchy increase first-look clarity and retry intent, whether the compact live telemetry block reduces clutter without hiding useful validation affordances, whether the first `6s` `+160px` opening spawn-distance guard feels fair without hollowing out tension, and whether the collapsed narrow-screen run panel reduces clutter without hiding useful context while killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional hit feedback stay readable

telemetry_sample_integrity:
current: `R` reset is blocked while a run is active (`playing` or `paused`), so first-death, retry-delay, and validation sample counters cannot be zeroed mid-run
baseline: fixed in Run #50 after active-play reset could silently corrupt the current sample
target: keep reset available between runs without allowing active-run telemetry corruption

telemetry_regression_check:
current: passes via `npm run telemetry:check` as of Run #53
baseline: as of Run #54 asserts pacing, required spawn distance, survival, survival buckets, honest validation summary/report wording, and early spawn collision grace
target: run before and after any future balance change

build_health:
current: `npm run build` passes; Vite still reports a large chunk warning for the main bundle
baseline: build stayed green in Run #35
target: keep build green; do not chase bundle optimization ahead of gameplay UX unless it blocks shipping

---

# Notes

- source: `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, in-game telemetry HUD
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current tuning signal: deterministic snapshot artik `24.3s / 6.3s / 4%`; opener'da bir `<10s` outlier kaldi ama validation wording artik bunu gizlemiyor
- compact live telemetry, collapsed run panel, personal-best cue, waiting/support-strip copy hiyerarsisi, inactive-phase input freeze ve focus-loss pause'un birlikte nasil algilandigi icin manuel sample hala gerekli
