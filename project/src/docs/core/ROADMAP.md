# ROADMAP.md

---

# NOW

- Run #211 `mutation`: gec run'a mevcut variant sistemi icinde yeni `echo` obstacle beat'i eklendi; `24s` sonrasinda her `6.` spawn hedefe `0.22s` lag ile bakiyor.
- `project/game/src/game/balance.ts`, `project/game/src/game/GameScene.ts` ve deterministic proxy ayni echo kontratini paylasiyor; runtime/proxy drift'i acilmadi.
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- late-run obstacle ritmi artik yalniz surge ile degil ikinci bir echo beat'i ile kiriliyor.
- deterministic survival proxy `26.0s / 10.0s / 0%` baseline'ini koruyor.
- survival dagilimi `0 / 3 / 11 / 10` olarak gec-run cap tarafina hafif kayiyor.
- `telemetry:snapshot`, `telemetry:survival-snapshot`, `telemetry:check` ve build yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, tuned surge beat'i, yeni echo beat'i ve `10s` milestone payoff'i icin keep/tune/revert notu ekle.
- Runtime yoksa near-miss, tuned surge, yeni echo beat'i, duvar-baski spawn-target fix'i, projected-stack threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i veya spawn-bookkeeping fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni fairness/death/pause/panel/replay-HUD veya `10s` milestone koridorlarina geri donmek
- sample olmadan surge cadence/speed knob'una tekrar dokunmak
- sample olmadan bu yeni echo cadence/target-lag knob'una tekrar dokunmak
- sample olmadan near-miss reward detection/yuzeyine tekrar mikro-tuning yapmak
- sample olmadan yeni wall-target lag / reachability micro-tuning'i acmak
- sample olmadan bu `10.0s` projected-stack threshold fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn guard fallback fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni replay-intent movement-state fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-bookkeeping integrity fix'ine tekrar mikro-tuning yapmak
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra near-miss reward, `10s` milestone feedback'i, tuned surge obstacle beat'i ve yeni echo beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
