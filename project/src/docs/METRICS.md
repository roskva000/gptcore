# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 26.6s in deterministic survival snapshot
baseline: 26.6s
target: hold `>= 26.6s` while checking manually that the softened `20s+` chase plus the forward-pressure and lane-stack spawn filters still feel fair and readable

first_death_time:
current: 6.3s in deterministic survival snapshot
baseline: 6.3s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 4% in deterministic survival snapshot
baseline: 4%
target: stay at or below 4%

survival_bucket_distribution:
current: `<10s: 1`, `10-20s: 3`, `20-30s: 2`, `30s cap: 18`
baseline: `1 / 3 / 2 / 18` across 24 deterministic seeds
target: keep `10-20s <= 3`, `<10s <= 1`, and hold `30s cap >= 18`

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 217 at 20s, 253 at 30s, 307 at 45s, 320 at 60s
baseline: Run #75 lowered only the `20s+` speed slope from `3.7` to `3.6` after the new opener spawn filters had already improved average survival, converting one deterministic `20-30s` tail into a `30s` cap without changing pacing or opening-fairness guards
target: preserve the early-death guard and validate manually that the softened `20s+` chase still clears space without feeling mushy or overly sharp

obstacle_collision_radius:
current: obstacle sprite still reads as a `12px` disc, but the active obstacle collider is now `11px`
baseline: Run #67 narrowed only the obstacle hitbox to reduce cheap edge grazes without changing player speed, spawn pacing, steering, replay flow, or the opening-fairness helpers
target: confirm manually that this trims unfair edge hits without making obstacle contact feel vague or too forgiving

offscreen_collision_guard:
current: obstacle overlap now requires the obstacle center to be inside the arena bounds, so `collisionReady` obstacles cannot damage the player before fully entering or after leaving the visible playfield
baseline: Run #69 added this narrow guard to remove invisible or last-pixel edge hits without changing pacing, speed anchors, replay/start flow, obstacle radius, or telemetry/export semantics; Run #71 aligned the deterministic survival proxy with the same visible-arena hit rule and `96px` offscreen cull margin used by runtime
target: confirm manually that wall-hugging players no longer take unfair offscreen hits and that contact does not start so late that edge dodges feel mushy

early_spawn_collision_grace:
current: first `10s` spawns move immediately but cannot deal damage for `260ms`; after `10s` the grace returns to `0ms`, and Run #72 made that unlock depend on active run elapsed time so focus-loss pause no longer burns the remaining grace window
baseline: added in Run #52 as a narrow fairness guard without changing spawn pacing or obstacle speed anchors; Run #72 aligned runtime activation with the pause-frozen survival clock instead of wall-clock scene time
target: confirm manually that this removes cheap spawn-touch moments without making new obstacles feel ghostly or too forgiving, and that pause/resume does not silently consume the remaining grace window

opening_required_spawn_distance:
current: first `6s` add `+160px` to the required spawn distance, then return to the prior baseline
baseline: added in Run #53 to make the existing spawn-reroll fairness helper actually activate during the opener
target: confirm manually that this removes crowded opening lanes without making the first seconds feel empty

validation_export_contract:
current: `V` export now produces `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths`, and `R` reset still clears the saved export so HUD summary returns to `not saved yet`
baseline: Run #54 aligned the export with actual early-death risk; Run #55 aligned sample reset with that export by clearing stale saved summaries instead of carrying them into a fresh session; Run #61 aligned `first death` with the minimum death in the sample instead of the first chronological run; Run #75 moved the checked deterministic baseline text to `26.6s avg / 6.3s first death / 4% early` while the 5-seed validation sample average stayed `24.1s`
target: keep `V` export and parser aligned, never mark a 5-run sample as healthy while it still contains `<10s` deaths, never let a fresh reset show a stale export as if it belongs to the new sample, and keep the embedded deterministic baseline text synchronized with the latest checked gameplay snapshot

forward_pressure_spawn_filter:
current: first `6s` spawn selection now penalizes candidates that align more than `0.5` dot with the player's current movement direction, so the existing reroll helper can deflect some early oncoming crossfire without touching opening distance, target lag, or collision grace
baseline: Run #73 added this narrow gameplay filter after outlier-specific lag/trajectory experiments either failed or regressed the deterministic guard set; the resulting checked snapshot moved from `25.7s` average / `1 / 4 / 2 / 17` buckets to `26.4s` average / `1 / 3 / 3 / 17`
target: confirm manually that this reduces cheap oncoming opener pressure without making spawn variety feel scripted or hollow

lane_stack_spawn_filter:
current: first `6s` spawn selection now also penalizes candidates that arrive from the same lane as an active obstacle already within `160px` of the player when that lane alignment exceeds `0.55`, so early stacked crossfire is less likely to pile up from one direction without touching opening distance, target lag, or collision grace
baseline: Run #74 added this narrow gameplay filter after more aggressive center-cut and intercept ideas regressed the deterministic guard set; the checked snapshot moved from `26.4s` average / `27.8` average spawns / `0.4` average rerolls to `26.5s` average / `28` average spawns / `0.5` average rerolls while holding buckets at `1 / 3 / 3 / 17`
target: confirm manually that this trims repeated same-lane opener pressure without making spawn variety feel scripted or too empty on one edge

public_ai_panel_accuracy:
current: the player-facing `Latest AI update` panel still mirrors the same `first death 6.3s` validation summary and minimum-death semantics used by telemetry HUD/export, but its static copy now lags the latest `26.6s` deterministic baseline
baseline: Run #62 removed the stale Run #60 copy and obsolete `30.0s first death` text that had drifted from the real validation/export contract; Run #66 intentionally left public copy untouched to respect the audit freeze on copy churn
target: keep player-facing AI copy synchronized with the actual deterministic baseline and validation summary once a manual-sample-backed product delta justifies touching that surface again

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

held_start_acceptance:
current: waiting state now also accepts a continuously held movement key or held pointer/touch after `180ms`, so initial start uses the same one-action input acceptance model as replay/resume
baseline: Run #68 extended the existing held-input acceptance window to the waiting screen without changing balance, telemetry/export wording, or the opening-fairness helpers
target: confirm in manual browser sample that this removes extra release-repress friction on start without causing accidental auto-start on desktop or mobile

pointer_steering_precision:
current: pointer/touch steering now uses analog speed scaling with a `10px` dead-zone and reaches full `260` speed by `120px`, so short drags still allow finer dodge adjustments while longer escapes hit full speed sooner
baseline: Run #63 changed pointer steering to analog control; Run #65 tightened only the full-speed distance from `140px` to `120px` without changing keyboard movement, replay acceptance, pacing, or deterministic telemetry contracts
target: confirm in manual browser sample that close-range pointer/touch corrections still feel controllable while long escapes no longer feel sluggish on desktop or mobile

early_spawn_target_lag:
current: first `10s` spawn aim uses `0.18s` of player-velocity lag, then returns to exact-position targeting
baseline: added in Run #51 to soften unfair early intercept lines without changing spawn pacing or obstacle speed anchors
target: confirm manually that this improves fairness without making the opening chase feel soft

manual_validation_sample:
current: not collected in this runtime; browser smoke passes and Chromium exists, but `DISPLAY`/`WAYLAND_DISPLAY` are absent so no headed manual sample was possible here. Real-player sampling is still needed to verify waiting held-start acceptance, the tighter `120px` analog pointer steering threshold, held movement, held pointer/touch retry/resume, the softened Run #75 `20s+` chase, the narrower Run #67 obstacle collider, the Run #69 offscreen collision guard, the Run #72 pause-safe collision-grace fix, and the Run #73-74 spawn filters. Run #75 improved deterministic midgame-to-late survival, but it did not replace human evidence
target: 5-10 runs via session telemetry when a suitable interactive browser runtime is available; note whether waiting start and replay really restart on one action, whether analog pointer steering still improves close-range dodge control while long escapes now reach speed fast enough, whether held movement-key and held pointer/touch retry/resume feel natural without accidental auto-replay, whether focus-loss pause/resume feels fair and clear, whether pause after an early spawn preserves the remaining collision-grace window, whether the softened `20s+` chase still clears arena traffic without feeling mushy, whether the `11px` obstacle collider removes cheap edge hits without making contact feel mushy, whether the new offscreen collision guard removes invisible edge hits without making arena-edge contact feel delayed, whether the new forward-pressure and lane-stack filters trim cheap opener pressure without making spawns feel scripted, whether an early pause preserves the remaining coaching-hint window, whether the new personal-best cue plus waiting/support-strip hierarchy increase first-look clarity and retry intent, whether the compact live telemetry block reduces clutter without hiding useful validation affordances, whether the first `6s` `+160px` opening spawn-distance guard feels fair without hollowing out tension, and whether the collapsed narrow-screen run panel reduces clutter without hiding useful context while killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional hit feedback stay readable

telemetry_sample_integrity:
current: `R` reset is blocked while a run is active (`playing` or `paused`), so first-death, retry-delay, and validation sample counters cannot be zeroed mid-run
baseline: fixed in Run #50 after active-play reset could silently corrupt the current sample
target: keep reset available between runs without allowing active-run telemetry corruption

telemetry_regression_check:
current: `npm run telemetry:check` passes on the Run #75 baseline and still asserts fresh-session retry remains `null`, same-session retry delay is still tracked, and the deterministic survival proxy still models runtime visible-arena hit guard plus `96px` offscreen cull margin
baseline: as of Run #75 asserts pacing, required spawn distance, forward-pressure and lane-stack spawn reroll behavior through the checked snapshot, softened `20s+` speed anchors, survival, survival buckets, honest validation summary/report wording, early spawn collision grace, the narrower obstacle collider, retry-delay session integrity, and runtime-aligned collision/cull proxy behavior
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
- strategic layer note: bu metrikler artik tek basina yon belirleyici degil; God katmani bunlari haftalik faz hedefleriyle birlikte yorumlar
- player-facing AI panel copy still reflects the same validation semantics, but its static narrative now lags the latest 20s+ chase tuning because audit governance froze copy churn this turn
- player-facing AI panel copy still reflects the same validation semantics, but its static narrative now also lags the new `26.6s` deterministic baseline because audit governance still freezes copy churn on that surface
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current tuning signal: deterministic snapshot artik `26.6s / 6.3s / 4%`; Run #75 yumusatilan `20s+` curve bir `20-30s` kuyruğunu `30s` cap'e tasidi ama opener'da bir `<10s` outlier hala var, Run #67'nin daralttigi obstacle collider ise bu metrigi degistirmeden insan hissinde fairness kazanimi ariyor
- deterministic survival proxy artik runtime ile ayni gorunur-arena hit guard'i ve `96px` offscreen cull margin'ini modelledigi icin collision/cull tarafinda sessiz drift riski azaldi
- Run #72 collision grace unlock'unu aktif run elapsed zamanina tasidigi icin focus-loss pause sirasinda "run is frozen" vaadi gameplay tarafinda daha tutarli
- compact live telemetry, collapsed run panel, personal-best cue, waiting/support-strip copy hiyerarsisi, inactive-phase input freeze ve focus-loss pause'un birlikte nasil algilandigi icin manuel sample hala gerekli
