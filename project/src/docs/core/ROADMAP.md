# ROADMAP.md

---

# NOW

- Run #216 `stabilization`: `project/game/src/game/spawn.ts` opening guard cutoff'larini ortak epsilon-aware zaman penceresiyle hizaladi; fixed-step survival time `6.000000000000076s` oldugunda opener fairness envelope bir frame erken dusmuyor.
- `project/game/scripts/telemetry-check.ts` yeni regression'larla blocked wall-lane pressure ve near-player same-edge pressure senaryolarinin 6s sacakta da reroll korudugunu kilitliyor.
- Deterministic headline degismedi: `29.6s / 10.0s / 0%` ve `40s` simulation cap korunuyor.
- Bu pass mutation cadence'lerini, replay flow'unu, near-miss'i veya `10s` / `60s` payoff koridorlarini retune etmedi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- opener fairness guard'lari `6.0s` fixed-step fuzz yuzunden son korunan spawn'i kacirmiyor.
- deterministic survival baseline `29.6s / 10.0s / 0%` olarak korunuyor.
- `telemetry:check` ve build yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, `10s` milestone payoff'i, `60s` clear payoff'i, tuned surge beat'i, echo beat'i ve yeni drift beat'i icin keep/tune/revert notu ekle.
- Runtime yoksa validation/export'a, opener cutoff fix'ine veya near-miss, `10s` milestone, `60s` clear payoff, tuned surge, echo, drift, duvar-baski spawn-target fix'i, retreat-pinch reachability fix'i, projected-stack threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i veya spawn-bookkeeping fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan Run #216 opener cutoff koridoruna geri donmek
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
