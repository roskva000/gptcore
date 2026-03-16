# ROADMAP.md

---

# NOW

- Run #221 `mutation`: `project/game/src/game/balance.ts` yeni `strafe` obstacle beat'ini `12s` sonrasinda her `8.` spawn icin aciyor.
- `project/game/src/game/GameScene.ts` ve `project/game/scripts/telemetry-reports.ts` bu varyanti ayni `14deg` cross-lane travel kontrati ile tasiyor; runtime ve deterministic proxy ayni truth'u paylasiyor.
- Deterministic headline `31.2s / 10.0s / 0%` ve `40s` simulation cap olarak guncellendi.
- Validation snapshot `31.9s avg / 18.2s first death / 0% early` verdi.
- Bu pass touch-gesture stabilization, lead/surge/echo/drift knob'lari, death surface, replay flow, near-miss, payoff, opener cutoff veya spawn reroll scoring knob'larini retune etmedi.
- `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- `10s` sonrasi `15s` surge unlock'a kadar olan koridor artik kendi ayri gameplay beat'ini tasiyor.
- deterministic proxy yeni `strafe` unlock/cadence/rotation truth'unu yayinliyor.
- deterministic survival baseline `31.2s / 10.0s / 0%` olarak yesil kaliyor.
- build ve telemetry check seti yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, yeni `strafe` beat'i, `lead` beat'i, tuned surge beat'i, echo beat'i, drift beat'i, `10s` milestone payoff'i ve `60s` clear payoff'i icin keep/tune/revert notu ekle.
- Runtime yoksa strafe, lead, validation/export, opener cutoff, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn-target, retreat-pinch reachability, projected-stack threshold, spawn-fallback, replay-intent, spawn-bookkeeping, spawn-grace truth/finalization veya touch-gesture koridoruna tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan yeni `strafe` beat'ine tekrar mikro-tuning yapmak
- sample olmadan yeni `lead` beat'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-grace threat filter fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-grace collision-ready timing fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni touch-gesture lock fix'ine tekrar mikro-tuning yapmak
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
- ikinci sample geldikten sonra yeni `strafe` beat'i, `lead` beat'i, near-miss reward, `10s` milestone feedback'i, tuned surge obstacle beat'i, echo beat'i ve drift beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
