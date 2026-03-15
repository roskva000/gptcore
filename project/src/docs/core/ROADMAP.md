# ROADMAP.md

---

# NOW

- Run #213 `integration`: mevcut `60s` clear payoff'i artik yalniz metin degil; `project/game/src/game/GameScene.ts` clear aninda ayrik tone, score pulse'u, player pulse'u ve daha belirgin clear badge feedback'i veriyor.
- Bu pass pacing, fairness veya spawn secimine dokunmadi; deterministic baseline `26.0s / 10.0s / 0%` korundu.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- `60s` clear aninin payoff'i artik gorunur ve duyulur; mevcut goal badge yalniz static etiket olarak kalmiyor.
- deterministic survival proxy `26.0s / 10.0s / 0%` baseline'ini koruyor.
- `telemetry:check` ve build yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, `10s` milestone payoff'i, yeni `60s` clear payoff'i, tuned surge beat'i ve yeni echo beat'i icin keep/tune/revert notu ekle.
- Runtime yoksa near-miss, `10s` milestone, `60s` clear payoff, tuned surge, yeni echo beat'i, duvar-baski spawn-target fix'i, retreat-pinch reachability fix'i, projected-stack threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i veya spawn-bookkeeping fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
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
- sample olmadan near-miss reward detection/yuzeyine tekrar mikro-tuning yapmak
- sample olmadan yeni wall-target lag / reachability micro-tuning'i acmak
- sample olmadan yeni retreat-pinch reachability micro-tuning'i acmak
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
