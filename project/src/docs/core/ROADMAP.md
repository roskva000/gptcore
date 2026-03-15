# ROADMAP.md

---

# NOW

- Run #208 `stabilization`: spawn secici reroll butcesi bittiginde gorulmus en iyi guard-compliant lane'i koruyor; biraz daha yuksek ham skorlu cheap-pressure ihlaline geri dusmuyor.
- `project/game/src/game/spawn.ts` best-raw-score ile best-guard-compliant fallback'i ayirdi; `project/game/scripts/telemetry-check.ts` opening-pressure fallback kontratini kilitledi.
- `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- spawn secici tum reroll'ler zayif kalsa bile gorulmus legal lane'i cheap-pressure ihlaline feda etmez.
- deterministic survival proxy `26.0s / 10.0s / 0%` baseline'ini korur.
- `telemetry:check`, `telemetry:survival-snapshot` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine tuned surge beat'i, `10s` milestone payoff'i ve replay istegi icin keep/tune/revert notu ekle.
- Runtime yoksa near-miss, tuned surge, duvar-baski spawn-target fix'i, projected-stack threshold fix'i veya bu yeni spawn-fallback guard fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
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
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra near-miss reward, `10s` milestone feedback'i ve tuned surge obstacle beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
