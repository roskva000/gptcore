# METRICS.md

---

# Key Metrics

## Gameplay

average_session_time:
current: instrumented locally, no manual sample yet
target: 120s

retry_rate:
current: inferred locally from run count and retry gap, no sample yet
target: high

average_survival_time:
current: instrumented locally, no baseline sample yet
target: increasing

---

# Player Behavior

first_death_time:
current: visible in in-game telemetry, baseline not sampled yet
target: > 10s

rage_quit_indicator:
current: approximated by missing quick retries, no sample yet

---

# Notes

- source: in-game telemetry panel + console logs + localStorage key `survive-60-seconds-telemetry-v1`
- next step: en az 5 manual run oynayip sayisal baseline'i bu dosyaya yaz
