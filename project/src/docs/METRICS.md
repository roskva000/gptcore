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
current: still not collected as of Run #18; `/usr/bin/chromium` ve `dist/index.html` mevcut, fakat yeni `telemetry:browser-preflight` bu sandbox'in `127.0.0.1` loopback socket'ini `EPERM` ile reddettigini acikca raporladi, bu yuzden browser smoke veya interaktif human-input validation yapilamadi
target: 5-10 runs tracked via session telemetry after pressing `R`

deterministic_balance_snapshot:
current: protected in Run #11 by `npm run telemetry:check`; baseline remains first spawn 0.9s, pacing 10 / 32 / 76
target: keep pacing baseline explicit and fail fast on accidental drift before manual balance changes

deterministic_survival_snapshot:
current: protected in Run #11 by `npm run telemetry:check`; baseline remains avg 22.3s, first death 5.0s, early death 8%
baseline: avg survival 22.3s, first death 5.0s, early death 8%, best 30.0s
target: use as a regression guard and avoid regressing past 8% early death without breaking pacing snapshot

telemetry_regression_check:
current: passes via `npm run telemetry:check` as revalidated in Run #18
baseline: asserts first spawn 0.9s, spawn pacing 10 / 32 / 76, speed curve 145 / 183 / 259 / 316 / 320, survival avg 22.3s, first death 5.0s, early death 8%, validation summary `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
target: run before and after future balance changes to catch accidental drift

validation_export_contract:
current: Run #16 deterministic snapshot tekrar `validation_sample | runs=5 | deaths=5 | avg_survival=18.2s | first_death=30.0s | early_death_rate=20% | avg_retry=n/a | spawn_saves=0 | last_run=26.8s | validation=5/5 runs, target met | baseline=pacing 10/32/76 | deterministic survival 22.3s avg / 5.0s first death / 8% early` uretti
baseline: parsed summary `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
target: `V` export string and `Last export` parser stay aligned even when telemetry copy changes

browser_validation_smoke:
current: Run #18'de `npm run telemetry:browser-validation-smoke` yeni preflight helper uzerinden erken `Browser validation preflight failed: ... listen EPERM: operation not permitted 127.0.0.1` hatasi verdi
baseline: uygun ortamda gercek Chromium icinde `R` reset, sample injection, `V` export ve reload sonrasi `Last export` rehydration dogrulanmali
target: socket izinli ortamda smoke komutu basarili calissin; kisitli sandbox'ta 10 saniye bekleyip asilmak yerine net hata versin

browser_validation_preflight:
current: Run #18'de `npm run telemetry:browser-preflight` `status: blocked` sonucu ile chromium=true, dist=true, loopback=false raporu uretti
baseline: uygun ortamda `status: ok`, chromium=true, dist=true, loopback=true
target: smoke veya manual validation'dan once ortamin browser validation icin hazir olup olmadigini tek komutta gostermek

browser_validation_readiness:
current: Run #19'da `npm run telemetry:validation-ready` `status: blocked` sonucu ile guard=true, validation summary=`5 runs | first death 30.0s | early 20% | 5/5 runs, target met`, chromium=true, dist=true, loopback=false raporu uretti
baseline: uygun ortamda `status: ready`; `--with-smoke` ile smoke calisirsa `status: smoke-passed`
target: bir sonraki validator deterministic guard drift'i ve environment blokajini tek JSON cikti ile gorup sonraki adimi hemen secebilmeli

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
current: Run #14 itibariyla `V` kisayolu session sample'i `validation_sample | runs=...` formatinda clipboard'a kopyalamayi deniyor; fallback olarak console + localStorage kullaniliyor ve son export ozetinin HUD/game over uzerinde gorunurlugu var
baseline_before_tuning: tester `C` console summary icindeki objeyi elle tasimak zorundaydi
target: manual sample sonucu tek satir olarak dokumana veya handoff notuna friction'siz tasinabilmeli

last_validation_report_visibility:
current: Run #15 ile son kaydedilen export `runs`, `first death`, `early death` ve validation durumu olarak telemetry HUD ve game over overlay'de truncation olmadan gorunuyor; `validation` alani artik safe separator ile serialize ediliyor
baseline_before_tuning: export localStorage'a yazilsa da oyun ici yuzeyde tekrar okunmuyordu
target: clipboard fallback'inde bile tester sample'in kaydedildigini oyun icinde aninda dogrulayabilmeli

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
- Run #13 verification details:
  - `npm run telemetry:check` sonucu tekrar `status: ok` dondu
  - confirmed balance baseline: first spawn 0.9s, pacing 10 / 32 / 76
  - confirmed survival baseline: avg 22.3s, first death 5.0s, early death 8%
- Run #14 validation visibility details:
  - son validation export localStorage key `survive-60-seconds-last-validation-report-v1` uzerinden scene create asamasinda tekrar okunuyor
  - telemetry HUD ve game over overlay `Last export: ...` satiri ile kaydedilen sample'in kisa ozetini gosteriyor
  - `V` sonrasi hint metni artik son export ozetini de yaziyor; fallback durumunda console acmadan gorulebilir teyit saglaniyor
- Run #15 validation contract details:
  - `telemetry:validation-snapshot` survival snapshot'in ilk 5 deterministic run'ini session telemetry export formatina ceviriyor
  - baseline validation summary: `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
  - export parser bug'i bu script sayesinde bulundu; `validation=5/5 runs, target met` formatina gecilerek `Last export` ozeti tam okunur hale geldi
- Run #16 verification details:
  - `npm run telemetry:check` sonucu tekrar `status: ok` dondu
  - `npm run telemetry:validation-snapshot` sample run seeds `1,2,3,4,5` ve sample run times `30.0, 14.7, 6.2, 13.1, 26.8` ile ayni export kontratini yeniden uretti
  - build tekrar basarili kaldi; chunk size warning'i degismedi
- Run #17 browser smoke details:
  - yeni komut once `127.0.0.1` uzerinde ephemeral loopback bind deniyor; sandbox izin vermiyorsa browser smoke'u hic baslatmadan fail-fast cikariyor
  - mevcut sandbox sonucu: `Loopback socket bind failed in this environment ... listen EPERM: operation not permitted 127.0.0.1`
  - bu sayede blokaj "chromium binary'si eksik" yerine "loopback socket / CDP yasak" olarak ayrildi
- Run #18 browser preflight details:
  - yeni komut chromium executable, `dist/index.html` okunabilirligi ve loopback socket izinlerini ayni JSON cikti icinde raporluyor
  - mevcut sandbox sonucu: `status: blocked`, `chromiumAvailable: true`, `distReady: true`, `loopbackSocketsAvailable: false`
  - smoke komutu ayni helper'i kullandigi icin hata satiri ile preflight JSON ayni blokaji isaret ediyor
- Run #19 browser readiness details:
  - yeni orchestration komutu once `telemetry:check`'i geciriyor, sonra deterministic validation summary ve browser preflight sonucunu ayni JSON ciktida topluyor
  - mevcut sandbox sonucu: `status: blocked`, `guard.ok: true`, `validationSummary: 5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
  - `nextAction` alani socket izinli ortama gecip ayni komutu orada tekrar calistirma talimati veriyor
- next step: socket izinli ortamda once `npm run telemetry:validation-ready` ile guard + readiness'i birlikte teyit et; status `ready` ise `--with-smoke` veya `npm run telemetry:browser-validation-smoke` gecir, smoke temizse bu speed curve'u interaktif browser oturumunda `R` reset sonrasi en az 5 manual run ile caprazla
