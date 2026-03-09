# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 25.1s in deterministic survival snapshot
baseline: 25.1s
target: hold `>= 25.1s` unless manual sample proves the 20s+ chase feels too soft

first_death_time:
current: 6.3s in deterministic survival snapshot
baseline: 6.3s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 4% in deterministic survival snapshot
baseline: 4%
target: stay at or below 4%

survival_bucket_distribution:
current: `<10s: 1`, `10-20s: 4`, `20-30s: 5`, `30s cap: 14`
baseline: `1 / 4 / 5 / 14` across 24 deterministic seeds
target: keep `10-20s <= 4`, `<10s <= 1`, and hold `30s cap >= 14`

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 214 at 20s, 249 at 30s, 302 at 45s, 320 at 60s
baseline: Run #59 softened the midgame ramp without changing pacing or opening-fairness guards
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
current: `V` export now produces `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths`, and `R` reset still clears the saved export so HUD summary returns to `not saved yet`
baseline: Run #54 aligned the export with actual early-death risk; Run #55 aligned sample reset with that export by clearing stale saved summaries instead of carrying them into a fresh session; Run #59 moved the deterministic sample average to `24.4s`; Run #61 aligned `first death` with the minimum death in the sample instead of the first chronological run
target: keep `V` export and parser aligned, never mark a 5-run sample as healthy while it still contains `<10s` deaths, never let a fresh reset show a stale export as if it belongs to the new sample, and do not let a good opening run hide a later worse outlier inside the same sample

public_ai_panel_accuracy:
current: the player-facing `Latest AI update` panel now mirrors the same `first death 6.3s` validation summary and minimum-death semantics used by telemetry HUD/export
baseline: Run #62 removed the stale Run #60 copy and obsolete `30.0s first death` text that had drifted from the real validation/export contract
target: keep player-facing AI copy synchronized with the actual deterministic baseline and validation summary whenever telemetry semantics change

retry_delay_integrity:
current: retry delay is now counted only when the same browser session has a recorded `lastDeathAt`; a fresh tab/session start no longer inherits lifetime `lastDeathAt` as a fake replay
baseline: Run #56 fixed `recordRunStart` so stale localStorage deaths cannot inflate replay-speed telemetry after a new session opens
target: keep retry telemetry honest across reload/new-session boundaries while preserving same-session instant replay measurement

held_movement_retry_resume:
current: game-over and paused states now accept a continuously held movement key after `180ms`, so keyboard players can retry/resume without an extra release-press cycle; Space/Enter/tap and fresh movement press still work
baseline: added in Run #58 as a narrow replay-friction fix without touching pacing, fairness, validation contracts, or touch pointer steering
target: confirm in manual browser sample that this reduces keyboard replay friction without causing accidental auto-restart or auto-resume

held_pointer_retry_resume:
current: game-over and paused states now also accept a continuously held pointer/touch after `180ms`, so pointer players can retry/resume without an extra release-tap cycle after death or focus-loss pause
baseline: added in Run #60 to close the replay-friction gap between keyboard and pointer controls without changing pacing, fairness, validation contracts, or death-feedback surfaces
target: confirm in manual browser sample that held pointer/touch feels natural and does not create accidental auto-restart or auto-resume

pointer_steering_precision:
current: pointer/touch steering now uses analog speed scaling with a `10px` dead-zone and reaches full `260` speed by `140px`, so short drags can produce finer dodge adjustments instead of always snapping to max speed
baseline: Run #63 changed pointer steering only; keyboard movement, replay acceptance, pacing, and deterministic telemetry contracts stayed unchanged
target: confirm in manual browser sample that close-range pointer/touch corrections feel more controllable without making escape movement sluggish on desktop or mobile

early_spawn_target_lag:
current: first `10s` spawn aim uses `0.18s` of player-velocity lag, then returns to exact-position targeting
baseline: added in Run #51 to soften unfair early intercept lines without changing spawn pacing or obstacle speed anchors
target: confirm manually that this improves fairness without making the opening chase feel soft

manual_validation_sample:
current: not collected in this runtime; browser smoke passes, but real-player sampling is still needed to verify analog pointer steering, held movement, held pointer/touch retry/resume, and the softer 20s+ chase
target: 5-10 runs via session telemetry when a suitable browser runtime is available; note whether replay really restarts on one action, whether analog pointer steering improves close-range dodge control without making long escapes feel slow, whether held movement-key and held pointer/touch retry/resume feel natural without accidental auto-replay, whether focus-loss pause/resume feels fair and clear, whether the 20s+ chase still feels tense after the Run #59 speed-curve softening, whether an early pause preserves the remaining coaching-hint window, whether the new personal-best cue plus waiting/support-strip hierarchy increase first-look clarity and retry intent, whether the compact live telemetry block reduces clutter without hiding useful validation affordances, whether the first `6s` `+160px` opening spawn-distance guard feels fair without hollowing out tension, and whether the collapsed narrow-screen run panel reduces clutter without hiding useful context while killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional hit feedback stay readable

telemetry_sample_integrity:
current: `R` reset is blocked while a run is active (`playing` or `paused`), so first-death, retry-delay, and validation sample counters cannot be zeroed mid-run
baseline: fixed in Run #50 after active-play reset could silently corrupt the current sample
target: keep reset available between runs without allowing active-run telemetry corruption

telemetry_regression_check:
current: `npm run telemetry:check` passes on the Run #59 baseline and still asserts fresh-session retry remains `null` while same-session retry delay is still tracked
baseline: as of Run #59 asserts pacing, required spawn distance, softened midgame speed anchors, survival, survival buckets, honest validation summary/report wording, early spawn collision grace, and retry-delay session integrity
target: run before and after any future balance or telemetry change; runtime-only UX fixes can stay on build verification when deterministic contracts are unchanged

browser_validation_smoke:
current: `npm run telemetry:browser-validation-smoke` and `npm run telemetry:validation-ready -- --with-smoke` pass; smoke injects 5 sample runs, exports validation summary, confirms `Last export` survives reload, and now shows the minimum injected death (`9.8s`) as `first death`
baseline: Run #57 fixed the smoke script to connect to a page CDP target instead of the browser websocket and to verify reset/export through scene methods plus storage state; Run #61 aligned smoke-visible `first death` with the same minimum-death semantics used by deterministic validation
target: keep smoke green as a lightweight browser harness, but treat it as prerequisite evidence only; replay/start/pause friction still requires human sample

build_health:
current: `npm run build` passes; Vite still reports a large chunk warning for the main bundle
baseline: build stayed green in Run #35
target: keep build green; do not chase bundle optimization ahead of gameplay UX unless it blocks shipping

---

# Notes

- source: `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, in-game telemetry HUD
- player-facing AI panel copy now also reflects the same validation baseline instead of an older run summary
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current tuning signal: deterministic snapshot artik `25.1s / 6.3s / 4%`; 30s cap bucket'i `14`e cikti ama opener'da bir `<10s` outlier hala var
- compact live telemetry, collapsed run panel, personal-best cue, waiting/support-strip copy hiyerarsisi, inactive-phase input freeze ve focus-loss pause'un birlikte nasil algilandigi icin manuel sample hala gerekli
