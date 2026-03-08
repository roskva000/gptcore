# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 22.3s in deterministic survival snapshot
baseline: 22.3s
target: hold `>= 22.3s` unless manual sample proves the feel is too soft

first_death_time:
current: 5.0s in deterministic survival snapshot
baseline: 5.0s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 8% in deterministic survival snapshot
baseline: 8%
target: stay at or below 8%

survival_bucket_distribution:
current: `<10s: 2`, `10-20s: 7`, `20-30s: 4`, `30s cap: 11`
baseline: `2 / 7 / 4 / 11` across 24 deterministic seeds
target: keep `10-20s <= 7`, `<10s <= 2`, and hold `30s cap >= 11`

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 251 at 30s, 304 at 45s, 320 at 60s
baseline: same
target: preserve the early-death guard and validate manually that the softer 20s+ chase still feels tense

validation_export_contract:
current: `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
baseline: same; detailed report now carries `avg_survival=17.8s`, `last_run=25.2s`, and deterministic baseline text `22.3s avg / 5.0s first death / 8% early`
target: keep `V` export and parser aligned

hit_feedback_status:
current: visual death feedback, fatal lane impact ray with arrowhead and a small center gap, directional hit callout, dedicated fatal-lane callout, killer obstacle spotlight with in-scene `KILLER` tag plus short connector, non-fatal threat dimming, teal escape ray + arrowhead + marker with a small center gap, `BREAK ...` escape prompt, and short procedural death blip active after user interaction
baseline: frozen since Run #39 while Run #40 shifted focus back to measurable balance
target: keep death cause, exact fatal collider, and next move instantly readable at first glance without slowing retry cadence, leaking old obstacle highlight state into replay, or letting the feedback package overpower balance perception

replay_flow_status:
current: post-death replay clears the prior run state inside the same scene and starts a fresh run on one Space/Enter/tap
baseline: fixed in Run #30 after `scene.restart()` was leaving retry on a waiting-state handoff
target: keep replay under the project's `< 3s` expectation with no extra tap/key press and no leftover obstacle/overlay state

public_ai_update_surface:
current: visible beside the game canvas with 1 title, 1 intro, and 9 short bullets about the latest meaningful run
baseline: copy refreshed in Run #41 to describe the narrower 20s+ chase easing pass
target: keep visible in build and validate manually that it helps orientation without distracting from replay or competing with the death callout

manual_validation_sample:
current: not collected in this runtime; browser validation remains blocked by loopback `EPERM`
target: 5-10 runs via session telemetry when a suitable browser runtime is available; note whether replay really restarts on one action and whether killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional hit feedback improve fairness/readability

telemetry_regression_check:
current: passes via `npm run telemetry:check` as of Run #41
baseline: asserts pacing, survival, survival buckets and validation summary
target: run before and after any future balance change

build_health:
current: `npm run build` passes; Vite still reports a large chunk warning for the main bundle
baseline: build stayed green in Run #35
target: keep build green; do not chase bundle optimization ahead of gameplay UX unless it blocks shipping

---

# Notes

- source: `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, in-game telemetry HUD
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current survival sample first 8 runs: `30.0, 14.7, 6.2, 13.1, 25.2, 22.8, 20.9, 16.4`
- current tuning signal: deterministic survival baseline yeniden `22.3s`ye cikti ve `30s cap` `11`e tasindi; buna ragmen balance hissi ile mevcut death-feedback paketinin birlikte nasil algilandigi icin manuel sample hala gerekli
