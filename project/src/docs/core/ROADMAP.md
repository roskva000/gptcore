# ROADMAP.md

---

# NOW

- Run #215 `integration`: `project/game/scripts/telemetry-reports.ts` survival snapshot cap'ini `40s`'ye cikarip yeni `drift` mutation'inin deterministic proxy tarafinda gercekten exercise edilmesini sagladi.
- `project/game/scripts/telemetry-check.ts` artik en az bir sample run'in `32s` drift unlock'unu gectigini ve seed `#3` trajectory'nin `40.0s / 45 spawn` kontratini korudugunu kilitliyor.
- `project/game/src/game/telemetry.ts` validation/export baseline'ini yeni deterministic truth ile hizaladi; current baseline `29.6s / 10.0s / 0%`.
- Bu pass gameplay knobs, fairness guard'lari, replay flow'u, near-miss'i, surge/echo/drift cadence'lerini veya `10s` / `60s` payoff koridorlarini retune etmedi.
- `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- deterministic survival proxy artik `32s` ustu drift beat'ini gercekten goruyor; validation/export metni stale `30s` cap'te kalmiyor.
- deterministic survival baseline `29.6s / 10.0s / 0%` olarak sabitlendi.
- `telemetry:check`, `telemetry:snapshot`, `telemetry:survival-snapshot` ve build yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, `10s` milestone payoff'i, `60s` clear payoff'i, tuned surge beat'i, echo beat'i ve yeni drift beat'i icin keep/tune/revert notu ekle.
- Runtime yoksa validation/export'a veya near-miss, `10s` milestone, `60s` clear payoff, tuned surge, echo, drift, duvar-baski spawn-target fix'i, retreat-pinch reachability fix'i, projected-stack threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i veya spawn-bookkeeping fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni fairness/death/pause/panel/replay-HUD, `10s` milestone veya `60s` clear payoff koridorlarina geri donmek
- sample olmadan surge cadence/speed knob'una tekrar dokunmak
- sample olmadan bu yeni echo cadence/target-lag knob'una tekrar dokunmak
- sample olmadan bu yeni drift cadence/rotation knob'una tekrar dokunmak
- sample olmadan near-miss reward detection/yuzeyine tekrar mikro-tuning yapmak
- sample olmadan yeni wall-target lag / reachability micro-tuning'i acmak
- sample olmadan yeni retreat-pinch reachability micro-tuning'i acmak
- sample olmadan bu `10.0s` projected-stack threshold fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn guard fallback fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni replay-intent movement-state fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-bookkeeping integrity fix'ine tekrar mikro-tuning yapmak
- Run #215 sonrasinda gerekcesiz yeni deterministic validation katmani acmak
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra near-miss reward, `10s` milestone feedback'i, tuned surge obstacle beat'i, echo beat'i ve yeni drift beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
