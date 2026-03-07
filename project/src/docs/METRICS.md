# METRICS.md

---

# Key Metrics

## Gameplay

average_survival_time:
current: 22.3s in deterministic survival snapshot
baseline: 22.3s
target: increase without breaking pacing

first_death_time:
current: 5.0s in deterministic survival snapshot
baseline: 5.0s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 8% in deterministic survival snapshot
baseline: 8%
target: stay at or below 8%

survival_bucket_distribution:
current: `<10s: 2`, `10-20s: 8`, `20-30s: 4`, `30s cap: 10`
baseline: `2 / 8 / 4 / 10` across 24 deterministic seeds
target: reduce the `10-20s` bucket without increasing `<10s` above 2

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 259 at 30s, 316 at 45s, 320 at 60s
baseline: same
target: keep early readability while preserving late pressure

validation_export_contract:
current: `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
baseline: same
target: keep `V` export and parser aligned

manual_validation_sample:
current: not collected in this runtime; browser validation remains blocked by loopback `EPERM`
target: 5-10 runs via session telemetry when a suitable browser runtime is available

telemetry_regression_check:
current: passes via `npm run telemetry:check` as of Run #22
baseline: asserts pacing, survival, survival buckets and validation summary
target: run before and after any future balance change

---

# Notes

- source: `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, in-game telemetry HUD
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current survival sample first 8 runs: `30.0, 14.7, 6.2, 13.1, 26.8, 27.3, 30.0, 16.3`
- current tuning signal: main pressure cluster is `10-20s`, not `<10s`
