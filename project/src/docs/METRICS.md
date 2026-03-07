# METRICS.md

---

# Key Metrics

## Gameplay

average_session_time:
current: 14.3s in 5-run scripted local sample after spawn-delay tuning
baseline_before_tuning: 10.8s
target: 120s

retry_rate:
current: 4 quick retries with avg retry gap 2.0s in scripted sample
baseline_before_tuning: avg retry gap 1.9s
target: high

average_survival_time:
current: 14.3s after spawn-delay tuning
baseline_before_tuning: 10.8s
target: increasing

manual_validation_sample:
current: not yet collected in Run #6; environment had no browser for direct human-input validation
target: 5-10 runs tracked via session telemetry after pressing `R`

---

# Player Behavior

first_death_time:
current: 11.0s after spawn-delay tuning
baseline_before_tuning: 8.7s
target: > 10s

rage_quit_indicator:
current: low in scripted sample; all observed retries stayed near 2.0s

early_death_rate_under_10s:
current: 20% after spawn-delay tuning
baseline_before_tuning: 60%
target: <= 20%

---

# Notes

- source: in-game telemetry panel + console logs + localStorage key `survive-60-seconds-telemetry-v1`
- method: same 5-run headless local Chromium steering sample before/after tuning, page reload between runs, 18s cap with forced game over if still alive
- post-tune run times: 11.0s, 18.2s, 16.8s, 18.3s, 7.1s
- pre-tune run times: 8.7s, 12.4s, 5.8s, 8.9s, 18.1s
- spawn reroll totali her iki karsilastirmada da 0 kaldi; bu tuning pass yogunluga odaklandi
- Run #6 instrumentation update: session telemetry artik sessionStorage key `survive-60-seconds-session-telemetry-v1` altinda ayri tutuluyor; `R` reset, `C` summary log
- next step: `R` ile sample'i sifirlayip gercek manual sample ile bu iyilestirmenin scripted sample disinda da korundugunu dogrula
