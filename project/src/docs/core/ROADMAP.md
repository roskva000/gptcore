# ROADMAP.md

---

# NOW

- Run #217 `mutation`: `project/game/src/game/balance.ts` mevcut varyant hattina yeni `lead` obstacle beat'ini ekledi; `18s` sonrasinda her `9.` spawn `0.14s` forward target lead ile oyuncunun mevcut kacis cizgisini onde kesiyor.
- `project/game/scripts/telemetry-reports.ts` ve runtime spawn akisi ayni cadence/tint/target-lead kontratini paylasiyor; yeni beat proxy-only degil.
- Deterministic headline `30.7s / 10.0s / 0%` oldu ve `40s` simulation cap korundu.
- Bu pass HUD/panel, death surface, replay flow, near-miss, opener cutoff veya mevcut surge/echo/drift knob'larini retune etmedi.
- `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- yeni `lead` beat'i runtime ve deterministic proxy tarafinda ayni kontratla tasiniyor.
- deterministic survival baseline `30.7s / 10.0s / 0%` olarak yesil kaliyor.
- `telemetry:check`, `telemetry:snapshot`, `telemetry:survival-snapshot` ve build yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, yeni `lead` beat'i, tuned surge beat'i, echo beat'i, drift beat'i, `10s` milestone payoff'i ve `60s` clear payoff'i icin keep/tune/revert notu ekle.
- Runtime yoksa lead, validation/export, opener cutoff, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn-target, retreat-pinch reachability, projected-stack threshold, spawn-fallback, replay-intent veya spawn-bookkeeping koridorlarina tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan yeni `lead` beat'ine tekrar mikro-tuning yapmak
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
- ikinci sample geldikten sonra yeni `lead` beat'i, near-miss reward, `10s` milestone feedback'i, tuned surge obstacle beat'i, echo beat'i ve drift beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
