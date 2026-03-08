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
current: `V` export still produces `5 runs | first death 24.2s | early 20% | 5/5 runs, review early deaths`, and `R` reset now clears the saved export so HUD summary returns to `not saved yet`
baseline: Run #54 aligned the export with actual early-death risk; Run #55 aligned sample reset with that export by clearing stale saved summaries instead of carrying them into a fresh session
target: keep `V` export and parser aligned, never mark a 5-run sample as healthy while it still contains `<10s` deaths, and never let a fresh reset show a stale export as if it belongs to the new sample

retry_delay_integrity:
current: retry delay is now counted only when the same browser session has a recorded `lastDeathAt`; a fresh tab/session start no longer inherits lifetime `lastDeathAt` as a fake replay
baseline: Run #56 fixed `recordRunStart` so stale localStorage deaths cannot inflate replay-speed telemetry after a new session opens
target: keep retry telemetry honest across reload/new-session boundaries while preserving same-session instant replay measurement

early_spawn_target_lag:
current: first `10s` spawn aim uses `0.18s` of player-velocity lag, then returns to exact-position targeting
baseline: added in Run #51 to soften unfair early intercept lines without changing spawn pacing or obstacle speed anchors
target: confirm manually that this improves fairness without making the opening chase feel soft

manual_validation_sample:
current: not collected in this runtime; browser smoke now passes and confirms injected validation export persistence across reload, but real-player replay/start/pause sampling is still outstanding
target: 5-10 runs via session telemetry when a suitable browser runtime is available; note whether replay really restarts on one action, whether fresh-press movement-key retry feels natural without accidental auto-replay, whether focus-loss pause/resume feels fair and clear, whether an early pause preserves the remaining coaching-hint window, whether the new personal-best cue plus waiting/support-strip hierarchy increase first-look clarity and retry intent, whether the compact live telemetry block reduces clutter without hiding useful validation affordances, whether the first `6s` `+160px` opening spawn-distance guard feels fair without hollowing out tension, and whether the collapsed narrow-screen run panel reduces clutter without hiding useful context while killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional hit feedback stay readable

telemetry_sample_integrity:
current: `R` reset is blocked while a run is active (`playing` or `paused`), so first-death, retry-delay, and validation sample counters cannot be zeroed mid-run
baseline: fixed in Run #50 after active-play reset could silently corrupt the current sample
target: keep reset available between runs without allowing active-run telemetry corruption

telemetry_regression_check:
current: `npm run telemetry:check` passes on the Run #56 baseline and now also asserts fresh-session retry remains `null` while same-session retry delay is still tracked
baseline: as of Run #56 asserts pacing, required spawn distance, survival, survival buckets, honest validation summary/report wording, early spawn collision grace, and retry-delay session integrity
target: run before and after any future balance or telemetry change; runtime-only UX fixes can stay on build verification when deterministic contracts are unchanged

browser_validation_smoke:
current: `npm run telemetry:browser-validation-smoke` and `npm run telemetry:validation-ready -- --with-smoke` pass; smoke injects 5 sample runs, exports validation summary, and confirms `Last export` survives reload
baseline: Run #57 fixed the smoke script to connect to a page CDP target instead of the browser websocket and to verify reset/export through scene methods plus storage state
target: keep smoke green as a lightweight browser harness, but treat it as prerequisite evidence only; replay/start/pause friction still requires human sample

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
