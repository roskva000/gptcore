# METRICS.md

Last Updated: 2026-03-06

---

# Key Metrics

## Gameplay

average_session_time:
current: unknown (telemetry added, baseline not collected yet)
target: 120s

retry_rate:
current: unknown (instrumented as quickRetryRate)
target: high

average_survival_time:
current: unknown (instrumented)
target: increasing

---

# Player Behavior

first_death_time:
current: unknown (instrumented as firstDeathTimeSec)
target: > 10s

average_retry_delay_ms:
current: unknown (instrumented)
target: <= 3000ms

rage_quit_indicator:
current: unknown

---

# Instrumentation

source: browser localStorage key `survive60.telemetry.v1`
console channel: `[Survive60][Telemetry]`

tracked fields per run:
- survivalTimeSec
- restartDelayMs
- spawnedObstacles
- rejectedNearPlayerSpawns

aggregates:
- totalRuns
- firstDeathTimeSec
- averageSurvivalTimeSec
- averageRetryDelayMs
- quickRetryRate

---

# Notes

Bu turda ag kisiti nedeniyle otomatik build dogrulamasi tamamlanamadi (`npm` DNS `EAI_AGAIN`).
Sonraki tur telemetry acikken manuel run toplayip sayisal baseline yazilmalidir.
