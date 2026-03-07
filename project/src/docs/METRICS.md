# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 21.8s in deterministic survival snapshot
baseline: 21.8s
target: keep the bucket gain while recovering toward `>= 22.3s`

first_death_time:
current: 5.0s in deterministic survival snapshot
baseline: 5.0s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 8% in deterministic survival snapshot
baseline: 8%
target: stay at or below 8%

survival_bucket_distribution:
current: `<10s: 2`, `10-20s: 7`, `20-30s: 6`, `30s cap: 9`
baseline: `2 / 7 / 6 / 9` across 24 deterministic seeds
target: keep `10-20s <= 7`, `<10s <= 2`, and grow `30s cap` back toward `10`

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 253 at 30s, 310 at 45s, 320 at 60s
baseline: same
target: preserve the `10-20s` bucket gain while recovering deterministic average survival

validation_export_contract:
current: `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
baseline: same
target: keep `V` export and parser aligned

manual_validation_sample:
current: not collected in this runtime; browser validation remains blocked by loopback `EPERM`
target: 5-10 runs via session telemetry when a suitable browser runtime is available

telemetry_regression_check:
current: passes via `npm run telemetry:check` as of Run #24
baseline: asserts pacing, survival, survival buckets and validation summary
target: run before and after any future balance change

---

# Notes

- source: `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, in-game telemetry HUD
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current survival sample first 8 runs: `30.0, 14.7, 6.2, 13.1, 30.0, 22.8, 21.0, 16.4`
- current tuning signal: `10-20s` guard korundu ve `30s cap` conversion `8 -> 9` toparlandi; eski `10` cap seviyesine donus icin manuel sample ile capraz kontrol hala gerekli
