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
current: still not collected as of Run #12; environment had no browser for direct human-input validation, but `V` export now packages the session sample into a single validation line
target: 5-10 runs tracked via session telemetry after pressing `R`

deterministic_balance_snapshot:
current: protected in Run #11 by `npm run telemetry:check`; baseline remains first spawn 0.9s, pacing 10 / 32 / 76
target: keep pacing baseline explicit and fail fast on accidental drift before manual balance changes

deterministic_survival_snapshot:
current: protected in Run #11 by `npm run telemetry:check`; baseline remains avg 22.3s, first death 5.0s, early death 8%
baseline: avg survival 22.3s, first death 5.0s, early death 8%, best 30.0s
target: use as a regression guard and avoid regressing past 8% early death without breaking pacing snapshot

telemetry_regression_check:
current: passes via `npm run telemetry:check`
baseline: asserts first spawn 0.9s, spawn pacing 10 / 32 / 76, speed curve 145 / 183 / 259 / 316 / 320, survival avg 22.3s, first death 5.0s, early death 8%
target: run before and after future balance changes to catch accidental drift

---

# Player Behavior

first_death_time:
current: 11.0s after spawn-delay tuning
baseline_before_tuning: 8.7s
target: > 10s

session_first_death_visibility:
current: Run #10 ile HUD, game over overlay ve `C` summary uzerinde explicit olarak gorunuyor
baseline_before_tuning: yalnizca recent deaths listesinden cikarim yapiliyordu
target: manual validator `first death` sinyalini dogrudan okuyabilmeli

manual_validation_export:
current: Run #12 ile `V` kisayolu session sample'i `validation_sample | runs=...` formatinda clipboard'a kopyalamayi deniyor; fallback olarak console + localStorage kullaniliyor
baseline_before_tuning: tester `C` console summary icindeki objeyi elle tasimak zorundaydi
target: manual sample sonucu tek satir olarak dokumana veya handoff notuna friction'siz tasinabilmeli

rage_quit_indicator:
current: low in scripted sample; all observed retries stayed near 2.0s

early_death_rate_under_10s:
current: 20% after spawn-delay tuning
baseline_before_tuning: 60%
target: <= 20%

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
target: adjust only when telemetry or manual sample justifies a pacing change

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 259 at 30s, 316 at 45s, capped 320 by 60s
target: keep first 10s readable while preserving late-run pressure

browserless_first_death_proxy:
current: 5.0s in deterministic survival snapshot
target: increase while keeping 10s/30s pacing baseline intact

---

# Notes

- source: in-game telemetry panel + console logs + localStorage key `survive-60-seconds-telemetry-v1`
- method: same 5-run headless local Chromium steering sample before/after tuning, page reload between runs, 18s cap with forced game over if still alive
- post-tune run times: 11.0s, 18.2s, 16.8s, 18.3s, 7.1s
- pre-tune run times: 8.7s, 12.4s, 5.8s, 8.9s, 18.1s
- spawn reroll totali her iki karsilastirmada da 0 kaldi; bu tuning pass yogunluga odaklandi
- Run #6 instrumentation update: session telemetry artik sessionStorage key `survive-60-seconds-session-telemetry-v1` altinda ayri tutuluyor; `R` reset, `C` summary log
- Run #7 deterministic snapshot details:
  - first spawn at 0.9s
  - first ten spawn times: 0.9s, 1.9s, 3.0s, 4.0s, 5.0s, 6.0s, 7.0s, 8.0s, 9.0s, 10.0s
  - required spawn distance floor reaches 140 by 10s and stays there
- Run #8 deterministic survival snapshot details:
  - method: 24 seed, 30s cap, same spawn delay/speed/fairness rules, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
  - sample run times: 28.3s, 10.8s, 6.1s, 30.0s, 24.2s, 30.0s, 28.9s, 6.1s
  - average spawn count 22.5, average spawn rerolls 0
- Run #9 deterministic snapshot details:
  - pacing still 10 spawn by 10s, 32 by 30s, 76 by 60s
  - speed curve sample points: 145 at 0s, 164 at 5s, 183 at 10s, 259 at 30s, 316 at 45s
- Run #9 deterministic survival snapshot details:
  - method ayni tutuldu; yalnizca obstacle speed egirisi degisti
  - sample run times: 30.0s, 14.7s, 6.2s, 13.1s, 26.8s, 27.3s, 30.0s, 16.3s
  - average spawn count 23.1, average spawn rerolls 0
- Run #10 telemetry validation details:
  - session ve lifetime telemetry artik `firstDeathTime` sakliyor
  - HUD validation satiri `0/5 runs` ile basliyor, 5 run sonrasinda `target met` veya `review early deaths` sinyali veriyor
  - console summary `session.firstDeathTime` ve `lifetime.firstDeathTime` alanlarini raporluyor
- Run #11 regression details:
  - `telemetry:check` mevcut deterministic balance ve survival snapshot raporlarini tek komutta assert ediyor
  - fail durumunda hangi pacing veya survival sinyalinin bozuldugu dogrudan mesaj olarak donuyor
- Run #12 validation export details:
  - `V` export satiri avg survival, first death, early death, avg retry, spawn saves, son run ve validation progress alanlarini tasiyor
  - export string deterministic baseline referansini da tasidigi icin manual sample ile browserless baseline ayni satirda karsilastirilabilir
- next step: bu speed curve'u tarayici varsa `R` reset sonrasi en az 5 manual run ile caprazla, sample sonunda `V` export satirini kaydet; tarayici yoksa blokaji not et ve yeni tuning'e gecme
