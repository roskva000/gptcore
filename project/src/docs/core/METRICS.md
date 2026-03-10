# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 26.5s in deterministic survival snapshot
baseline: 26.5s
target: hold `>= 26.5s` while checking manually that the slightly firmer `20s+` chase plus the forward-pressure and lane-stack spawn filters still feel fair and readable

first_death_time:
current: 6.3s in deterministic survival snapshot
baseline: 6.3s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 4% in deterministic survival snapshot
baseline: 4%
target: stay at or below 4%

survival_bucket_distribution:
current: `<10s: 1`, `10-20s: 3`, `20-30s: 3`, `30s cap: 17`
baseline: `1 / 3 / 3 / 17` across 24 deterministic seeds
target: keep `10-20s <= 3`, `<10s <= 1`, and avoid drifting below `30s cap = 17` unless headed sample justifies a harder chase

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 217 at 20s, 253 at 30s, 308 at 45s, 320 at 60s
baseline: Run #87 nudged only the `20s+` speed slope from `3.6` to `3.62` after the prior softened chase had drifted to `18/24` deterministic `30s` caps; opener pacing, spawn-distance helpers, lag/grace guards, collider, and input/pause surfaces were intentionally left untouched
target: preserve the early-death guard and validate manually that the slightly firmer `20s+` chase restores tension without feeling sharp or cheap

obstacle_collision_radius:
current: obstacle sprite still reads as a `12px` disc, but the active obstacle collider is now `11px`
baseline: Run #67 narrowed only the obstacle hitbox to reduce cheap edge grazes without changing player speed, spawn pacing, steering, replay flow, or the opening-fairness helpers
target: confirm manually that this trims unfair edge hits without making obstacle contact feel vague or too forgiving

death_callout_edge_safety:
current: Run #91 makes impact and killer callout labels flip above/below their anchor when a top-edge or bottom-edge death would otherwise push them out of the arena; deterministic guards now cover one top-edge impact placement and one bottom-edge fatal placement
baseline: before Run #91 `impactMarkerLabel` and `fatalSpotlightLabel` were vertically biased toward "always above", which could clip readability near the arena border even when the death-direction logic itself was correct
target: confirm manually that edge deaths keep the direction labels readable without making the death tableau feel jumpy or visually noisy

center_overlap_death_guidance:
current: Run #93 now keeps fully centered overlaps as `center`, collapses the impact marker onto the player instead of inventing a fake top/bottom lane, switches the death copy to `CENTER COLLISION` / `Caught at center`, and lets retry guidance fall back to `RESET CENTER`
baseline: before Run #93 centered overlaps could still borrow obstacle velocity and surface a fake lane label, which meant the same death tableau could mix overlap copy with directional blame and a misleading escape prompt
target: confirm manually that center-overlap deaths now read as honest overlap moments rather than fabricated lane mistakes, while still leaving enough information to make the retry feel actionable

offscreen_collision_guard:
current: obstacle overlap now requires the obstacle center to clear an `11px` visible-arena margin, so the collider must be fully inside the playfield before `collisionReady` obstacles can damage the player
baseline: Run #69 added the initial narrow guard to remove invisible or last-pixel edge hits without changing pacing, speed anchors, replay/start flow, obstacle radius, or telemetry/export semantics; Run #71 aligned the deterministic survival proxy with the same visible-arena hit rule and `96px` offscreen cull margin used by runtime; Run #88 tightened the hit rule from center-only visibility to a full `11px` collider margin while preserving the checked aggregate snapshot
target: confirm manually that wall-hugging players no longer take unfair offscreen hits and that the full-collider visibility rule does not make edge contact feel ghostly or delayed

early_spawn_collision_grace:
current: first `10s` spawns move immediately but cannot deal damage for `260ms`; Run #92 now fades that protection through `10-11s` instead of dropping it to `0ms` in one frame, and Run #72 had already made the unlock depend on active run elapsed time so focus-loss pause no longer burns the remaining grace window
baseline: added in Run #52 as a narrow fairness guard without changing spawn pacing or obstacle speed anchors; Run #72 aligned runtime activation with the pause-frozen survival clock instead of wall-clock scene time; Run #92 preserved the checked aggregate snapshot while guarding `10.5s -> 130ms` and `11s -> 0ms` as the new transition
target: confirm manually that this removes cheap spawn-touch moments around the `10s` boundary without making new obstacles feel ghostly or too forgiving, and that pause/resume does not silently consume the remaining grace window

opening_required_spawn_distance:
current: first `6s` add `+160px` to the required spawn distance, then return to the prior baseline
baseline: added in Run #53 to make the existing spawn-reroll fairness helper actually activate during the opener
target: confirm manually that this removes crowded opening lanes without making the first seconds feel empty

validation_export_contract:
current: `V` export now produces `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths`, counts `runs=` from completed sample deaths instead of raw start count, and `R` reset still clears the saved export so HUD summary returns to `not saved yet`
baseline: Run #54 aligned the export with actual early-death risk; Run #55 aligned sample reset with that export by clearing stale saved summaries instead of carrying them into a fresh session; Run #61 aligned `first death` with the minimum death in the sample instead of the first chronological run; Run #87 moved the checked deterministic baseline text to `26.5s avg / 6.3s first death / 4% early` while the 5-seed validation sample average stayed `24.1s`
target: keep `V` export and parser aligned, count validation sample size from completed runs only, never mark a 5-run sample as healthy while it still contains `<10s` deaths, never let a fresh reset show a stale export as if it belongs to the new sample, and keep the embedded deterministic baseline text synchronized with the latest checked gameplay snapshot

forward_pressure_spawn_filter:
current: first `6s` spawn selection now scores forward-alignment from the player's projected `0.18s` path instead of the exact current center, so the existing reroll helper can still deflect cheap oncoming crossfire without needlessly rejecting safe edge spawns while the player is already escaping into that lane
baseline: Run #73 added this narrow gameplay filter after outlier-specific lag/trajectory experiments either failed or regressed the deterministic guard set; Run #83 aligned the forward-pressure reference with the same projected-path logic already used by the lane-stack filter while holding the checked aggregate snapshot at `26.6s` average / `1 / 3 / 2 / 18` buckets / `0.4` average rerolls and adding a targeted opener regression assert for the preserved left-edge spawn case
target: confirm manually that this reduces cheap oncoming opener pressure without making spawn variety feel scripted or hollow, and that projected-path scoring preserves readable escape lanes better than exact-center scoring

projected_path_wall_edge_clamp:
current: Run #84 now clamps the projected-path spawn reference to the visible arena before forward-pressure or lane-stack scoring, so wall-edge escape lines are judged against reachable space instead of imaginary offscreen lanes
baseline: before Run #84 the projected reference could slip outside the arena when the player was already pressed into a wall, undercounting nearby same-side pressure in those edge cases; the new regression guard rerolls a dangerous left-edge spawn into a safe right-edge lane for a player at `{18,300}` moving left
target: confirm manually that wall-hugging escapes no longer get opener spawns scored against unreachable offscreen space, without making edge spawns feel overly scripted

lane_stack_spawn_filter:
current: first `6s` spawn selection still penalizes candidates that arrive from the same lane as an active obstacle already within `160px`, and Run #89 now requires that nearby obstacle's full `11px` collider to be visible inside the arena before it counts as lane pressure; projected-path scoring and deterministic average spawn reroll stay at `0.4`
baseline: Run #74 added this narrow gameplay filter after more aggressive center-cut and intercept ideas regressed the deterministic guard set; Run #76 constrained the filter to visible threats only and added a deterministic regression check for offscreen-vs-visible behavior while holding the checked snapshot at `26.6s` average / `1 / 3 / 2 / 18` buckets / `0.5` average rerolls; Run #78 kept the same checked survival guards while trimming average rerolls from `0.5` to `0.4`; Run #89 aligned "visible threat" with the same full-collider `11px` margin already used by runtime hit logic while preserving the checked aggregate snapshot
target: confirm manually that this trims repeated same-lane opener pressure without letting partial-visible edge obstacles script rerolls too early, and that the projected-path reference still feels natural rather than softer or less readable

seed3_outlier_trace:
current: existing deterministic telemetry now also captures the seed `#3` opener trace that still dies at `6.3s`: `6 spawn / 0 reroll`, with spawn times `0.9 / 1.9 / 3.0 / 4.0 / 5.0 / 6.0`, `spawn#4` from `{636,-56}` under `86.3px` nearest visible pressure and `spawn#6` from `{-56,242}` under `81.4px` nearest visible pressure
baseline: Run #77 added this trace to the existing `telemetry-reports.ts` and `telemetry-check.ts` surface after several narrow spawn-selection experiments improved seed `#3` only by breaking the checked guard set elsewhere
target: future spawn-selection tuning should move at least one of these pinch moments while preserving `avg >= 26.5s`, `<10s <= 1`, `10-20s <= 3`, and `30s cap >= 17`

public_ai_panel_accuracy:
current: the player-facing `Latest AI update` panel still mirrors the same `first death 6.3s` validation summary and minimum-death semantics used by telemetry HUD/export, but its static copy now lags the latest `26.5s` deterministic baseline
baseline: Run #62 removed the stale Run #60 copy and obsolete `30.0s first death` text that had drifted from the real validation/export contract; later runs intentionally left public copy untouched to respect the audit freeze on copy churn
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
current: game-over still accepts a continuously held pointer/touch after `180ms`, but Run #81 now makes focus-loss pause consume the refocus click/tap first; paused pointer resume arms only after a release, then accepts a fresh tap/click or a newly held pointer
baseline: Run #60 added held pointer retry/resume to close the replay-friction gap with keyboard; Run #81 narrowed only the focus-loss pause branch after source review showed the refocus click itself could resume the run accidentally
target: confirm in manual browser sample that game-over pointer retry still feels friction-light while focus-loss pause no longer creates accidental auto-resume and still resumes cleanly after a fresh tap/hold

pointer_tap_start_neutrality:
current: Run #97 keeps waiting/game-over `tap/click` primary actions neutral, but now also clears the steering lock on pointer release and rearms deliberate held-pointer start/retry steering after the same `180ms` confirmation window; pointer control should no longer stay blocked for the whole run after a pointer-led start
baseline: Run #96 removed same-press accidental steering on pointer start/retry, but source review showed that the new guard could also trap pointer steering behind a release-only lock and break intentional held-pointer start/retry flow in live play
target: confirm manually that tap/click start and retry now feel neutral and controlled, and that deliberate hold-to-steer players regain movement either by release-then-steer or by simply holding through the `180ms` start confirmation on desktop and touch devices

held_start_acceptance:
current: waiting state now also accepts a continuously held movement key or held pointer/touch after `180ms`, so initial start uses the same one-action input acceptance model as replay/resume
baseline: Run #68 extended the existing held-input acceptance window to the waiting screen without changing balance, telemetry/export wording, or the opening-fairness helpers
target: confirm in manual browser sample that this removes extra release-repress friction on start without causing accidental auto-start on desktop or mobile

input_audio_unlock_parity:
current: Run #79 routes movement-key fresh press and held-input start/resume through the same `activatePrimaryAction()` path as Space/Enter/tap, so keyboard-first runs now also call `unlockFeedbackAudio()` before gameplay begins or resumes
baseline: before Run #79 only explicit primary-action events unlocked the audio context; movement-key-led starts could leave death feedback silent for the whole run
target: verify in manual browser sample that keyboard-first starts/resumes consistently play the death feedback tone without causing accidental starts or audio pops

focus_loss_pointer_resume_guard:
current: Run #81 makes the first pointer click/tap after a focus-loss pause restore focus only; paused pointer resume is ignored until the pointer is released once, then a fresh tap/click or newly held pointer can resume the run
baseline: before Run #81 paused `pointerdown` could fire on the same gesture used to refocus the window, creating a source-level accidental auto-resume risk without changing deterministic telemetry
target: confirm manually that refocus no longer resumes by surprise and that the extra release requirement does not make pointer/touch resume feel clumsy

focus_loss_movement_resume_guard:
current: Run #82 requires any movement key that was already held when focus loss paused the run to be released before paused held-movement resume can arm again, and Run #95 keeps blur-sonrasi fresh movement resume immediate by remembering whether movement was actually active at blur time instead of forcing stale-held state for everyone
baseline: before Run #82 the pause flow guarded pointer refocus clicks, but a movement key kept held across blur/refocus could still resume the run after the normal `180ms` held-action window without a new player decision; before Run #95 even players who were not holding movement at blur could lose their first fresh refocus press to the held-input delay because `movementInputWasActive` was forced `true`
target: confirm manually that keyboard players no longer get surprise auto-resume after alt-tab/refocus and that intentional fresh press/hold resume still feels immediate enough

focus_loss_spawn_grace_visual_freeze:
current: Run #86 now pauses active obstacle spawn-grace alpha/scale tweens during focus-loss pause and resumes them only when gameplay resumes, so the visual onboarding stays aligned with the pause-safe collision-grace window instead of silently finishing behind the pause overlay
baseline: before Run #86 collision readiness already froze on active run elapsed time, but the obstacle's spawn-grace tween could keep animating during focus loss and make a still-graced obstacle look fully settled when the run resumed
target: confirm manually that pausing during an early spawn keeps both the grace logic and the obstacle's visual read in sync, without leaving reused obstacles stuck half-faded or replaying the tween twice after resume

freeze_state_obstacle_cull:
current: Run #90 now runs obstacle cull only while `playing`, so focus-loss pause and game-over freeze no longer let offscreen obstacles silently drop back into the pool behind the overlay/tableau
baseline: before Run #90 `update()` called `cullObstacles()` before the phase guard, which meant a supposedly frozen run could still mutate obstacle lifecycle state while paused or after death
target: confirm manually that pause/game-over still look stable and honest without creating visible pool artifacts or retry-state carry-over

pooled_obstacle_tween_integrity:
current: Run #80 kills obstacle-local tweens before reuse, cull, reset, and death freeze, so the early collision-grace fade/scale animation should no longer leak into later pooled obstacle presentations
baseline: before Run #80 pooled obstacles could keep an old tween alive after `disableBody(true, true)`, allowing reused obstacles to inherit stale alpha/scale motion across spawn or game-over transitions
target: confirm in manual browser sample that reused obstacles never pop in half-faded, over-scaled, or oddly re-animating after cull/restart/game-over

pointer_steering_precision:
current: pointer/touch steering now uses analog speed scaling with a `10px` dead-zone and reaches full `260` speed by `120px`, so short drags still allow finer dodge adjustments while longer escapes hit full speed sooner
baseline: Run #63 changed pointer steering to analog control; Run #65 tightened only the full-speed distance from `140px` to `120px` without changing keyboard movement, replay acceptance, pacing, or deterministic telemetry contracts
target: confirm in manual browser sample that close-range pointer/touch corrections still feel controllable while long escapes no longer feel sluggish on desktop or mobile

waiting_gameover_hud_clarity:
current: Run #94 compacts waiting and game-over telemetry into shorter summary blocks, hides verbose export detail unless a saved export exists, and shifts the support strip to a player-first `break 10s, then chase your best` goal line
baseline: before Run #94 waiting/game-over HUD repeated session, lifetime, recent-death, export, and telemetry-hotkey detail across too many lines, which risked crowding first-look clarity and retry focus even though the underlying telemetry contract was correct
target: confirm manually that the HUD now feels less bureaucratic without hiding validation/export affordances or making progress harder to read after a death

early_spawn_target_lag:
current: first `10s` spawn aim uses `0.18s` of player-velocity lag, then returns to exact-position targeting
baseline: added in Run #51 to soften unfair early intercept lines without changing spawn pacing or obstacle speed anchors
target: confirm manually that this improves fairness without making the opening chase feel soft

manual_validation_sample:
current: not collected in this runtime; browser smoke passes and Chromium exists, but `DISPLAY`/`WAYLAND_DISPLAY` are absent so no headed manual sample was possible here. Real-player sampling is still needed to verify waiting held-start acceptance, Run #79 input-audio parity, Run #80 pooled obstacle tween cleanup, Run #81 focus-loss pointer resume guard, Run #82/95 movement resume behavior, Run #83 forward-pressure projected-path scoring, Run #84 wall-edge projected-path clamp, Run #85 death-direction readability for chase/catch-up hits, Run #86 spawn-grace visual freeze on focus-loss pause, Run #87's slightly firmer `20s+` chase, Run #88's full `11px visible-arena hit margin`, Run #90's freeze-state cull fix, Run #93 center-overlap honesty, Run #94 compact waiting/game-over HUD hierarchy, Run #97 pointer start/retry neutrality plus held re-arm behavior, the tighter `120px` analog pointer steering threshold, held movement, held pointer/touch retry/resume, the narrower Run #67 obstacle collider, the Run #72 pause-safe collision-grace fix, and the Run #73-78 spawn filters
target: 5-10 runs via session telemetry when a suitable interactive browser runtime is available; note whether waiting start and replay really restart on one action, whether pointer tap/click start ve retry artik ayni basisi istemsiz steering'e cevirmeden neutral hissediyor, whether pointer steering release sonrasi hemen geri geliyor ve held-pointer start/retry `180ms` sonra akici sekilde yeniden devreye giriyor, whether keyboard-first starts/resumes now consistently unlock death audio, whether blur-sonrasi first movement resume artik gereksiz held-delay almadan taze hissediyor, whether analog pointer steering still improves close-range dodge control while long escapes now reach speed fast enough, whether held movement-key and held pointer/touch retry/resume feel natural without accidental auto-replay, whether focus-loss pause now requires an intentional second pointer action without feeling clumsy, whether pausing during an early spawn freezes both collision grace and the obstacle's fade/scale onboarding together, whether paused/game-over freeze also leaves obstacle cull state stable, whether the slightly firmer `20s+` chase restores tension without turning cheap, whether the `11px` obstacle collider plus full visible-arena hit margin remove cheap edge hits without making contact feel mushy or delayed, whether the projected-path forward-pressure, wall-edge clamp, and lane-stack filters trim cheap opener pressure without making spawns feel scripted, whether same-direction chase deaths now label the real threat lane instead of the obstacle's travel direction, whether an early pause preserves the remaining coaching-hint window, whether the compact waiting/game-over HUD and support strip now increase first-look clarity and retry intent without hiding validation affordances, whether the first `6s` `+160px` opening spawn-distance guard feels fair without hollowing out tension, and whether the collapsed narrow-screen run panel reduces clutter without hiding useful context while killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional hit feedback stay readable

telemetry_sample_integrity:
current: `R` reset is blocked while a run is active (`playing` or `paused`), so first-death, retry-delay, and validation sample counters cannot be zeroed mid-run
baseline: fixed in Run #50 after active-play reset could silently corrupt the current sample
target: keep reset available between runs without allowing active-run telemetry corruption

telemetry_regression_check:
current: `npm run telemetry:check` passes on the Run #96 codebase and still asserts fresh-session retry remains `null`, same-session retry delay is still tracked, the deterministic survival proxy still models runtime `11px visible-arena hit margin` plus `96px` offscreen cull margin, offscreen obstacle'larin lane-stack reroll tetiklememesi guard altinda, partial-visible edge obstacle'larin da lane-stack reroll tetiklememesi guard altinda, projected-path forward-pressure preserved left-edge opener senaryosu sabit, wall-edge projected-path reference arena icine clamp'leniyor, death-direction helper ayni-yon chase carpismasinda gercek threat lane'i koruyor, centered overlap durumda sahte velocity lane'i yerine `center` korunuyor, top-edge impact ve bottom-edge fatal callout placement'lari arena icinde kalacak sekilde guard altinda, `10.5s -> 130ms` ve `11s -> 0ms` collision-grace fade'i guard altinda, and seed `#3`un ilk alti spawn trace'i yeni visible-count farki ile sabit kaliyor
baseline: as of Run #95 asserts pacing, required spawn distance, projected-path forward-pressure and lane-stack spawn reroll behavior through the checked snapshot, the wall-edge projected-path clamp, visible-only ve full-collider-visible lane-stack guard'larini, slightly firmer `20s+` speed anchors, survival, survival buckets, honest validation summary/report wording, early spawn collision grace plus its `10-11s` fade, the narrower obstacle collider, full visible-arena hit margin, retry-delay session integrity, runtime-aligned collision/cull proxy behavior, death-direction chase/collision readability guards, centered overlap fallback honesty, edge-safe death callout placement, and the seed `#3` outlier trace
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
- partner layer note: factory-level kararlar verilirken bu metrikler human signals, experiments ve retention notlari ile birlikte okunmalidir
- player-facing AI panel copy still reflects the same validation semantics, but its static narrative now lags the latest 20s+ chase tuning because audit governance froze copy churn this turn
- player-facing AI panel copy still reflects the same validation semantics, but its static narrative now also lags the new `26.5s` deterministic baseline because audit governance still freezes copy churn on that surface
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current tuning signal: deterministic snapshot artik `26.5s / 6.3s / 4%`; Run #78 projected-path lane-stack referansi average spawn reroll'u `0.4`e indirdi, Run #83 ayni projected-path mantigini forward-pressure scoring'e de tasidi, Run #84 bu projected-path referansini duvar-kenarinda arena icine clamp'ledi, Run #87 ise `20s+` chase'i kucuk bir kademe tekrar sikilastirdi, Run #88 tam gorunmeden gelen edge hit'leri kapatan `11px visible-arena hit margin` ekledi ve Run #93 center-overlap death guidance'i sahte lane uydurmadan daha durust hale getirdi; ama opener'da bir `<10s` outlier hala var
- deterministic survival proxy artik runtime ile ayni `11px visible-arena hit margin` ve `96px` offscreen cull margin'ini modelledigi icin collision/cull tarafinda sessiz drift riski azaldi
- seed `#3` outlier'i artik tek satir `6.3s` metric olarak degil, hangi spawn zinciriyle geldigini gosteren sabit bir deterministic trace olarak da tutuluyor
- Run #72 collision grace unlock'unu aktif run elapsed zamanina tasidigi icin focus-loss pause sirasinda "run is frozen" vaadi gameplay tarafinda daha tutarli
- compact waiting/game-over telemetry, collapsed run panel, support-strip copy hiyerarsisi, inactive-phase input freeze ve focus-loss pause'un birlikte nasil algilandigi icin manuel sample hala gerekli
