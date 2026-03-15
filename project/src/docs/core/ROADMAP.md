# ROADMAP.md

---

# NOW

- Run #210 `stabilization`: spawn bookkeeping artik yalniz gercek obstacle allocation oldugunda ilerliyor; pool bos donerse surge cadence, spawn count ve reroll telemetrisi hayali bir spawn ile kaymiyor.
- `project/game/src/game/GameScene.ts` `runSpawnCount` ve `runSpawnRerolls` sayaçlarini `this.obstacles.get(...)` basarili olduktan sonra arttiriyor.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- obstacle pool canli body vermezse oyun gorunmeyen spawn denemesini cadence veya telemetry'ye yazmaz.
- surge cadence ve spawn-save sayaci yalniz sahneye gercekten threat girdiğinde ilerler.
- deterministic survival proxy `26.0s / 10.0s / 0%` baseline'ini korur.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, tuned surge beat'i ve `10s` milestone payoff'i icin keep/tune/revert notu ekle.
- Runtime yoksa near-miss, tuned surge, duvar-baski spawn-target fix'i, projected-stack threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i veya bu yeni spawn-bookkeeping fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
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
- ikinci sample geldikten sonra near-miss reward, `10s` milestone feedback'i ve tuned surge obstacle beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
