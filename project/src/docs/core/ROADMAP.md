# ROADMAP.md

---

# NOW

- Run #218 `stabilization`: `project/game/src/game/spawn.ts` spawn reroll guard'larinin collision grace'i henuz bitmemis obstacle'lari canli tehdit gibi saymasini kapatti.
- `project/game/src/game/GameScene.ts` ile `project/game/scripts/telemetry-reports.ts` runtime ve deterministic proxy'ye ayni `collisionReady` truth'unu tasidi; harmless arrivals artik opening ve projected-stack koridorlarini gereksiz bloke etmiyor.
- Deterministic headline `30.7s / 10.0s / 0%` ve `40s` simulation cap korundu.
- Bu pass lead/surge/echo/drift, death surface, replay flow, near-miss, payoff veya opener cutoff knob'larini retune etmedi.
- `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- harmless spawn-grace obstacle'lar artik opening ve projected-stack guard'larinda lane blocker sayilmiyor.
- runtime ve deterministic proxy ayni `collisionReady` truth'u ile spawn secimi yapiyor.
- deterministic survival baseline `30.7s / 10.0s / 0%` olarak yesil kaliyor.
- `telemetry:check`, `telemetry:snapshot`, `telemetry:survival-snapshot` ve build yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, yeni `lead` beat'i, tuned surge beat'i, echo beat'i, drift beat'i, `10s` milestone payoff'i ve `60s` clear payoff'i icin keep/tune/revert notu ekle.
- Runtime yoksa lead, validation/export, opener cutoff, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn-target, retreat-pinch reachability, projected-stack threshold, spawn-fallback, replay-intent, spawn-bookkeeping veya spawn-grace threat filter koridorlarina tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan yeni `lead` beat'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-grace threat filter fix'ine tekrar mikro-tuning yapmak
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
