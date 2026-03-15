# ROADMAP.md

---

# NOW

- Run #204 `stabilization`: `project/game/src/game/balance.ts` surge obstacle beat'ini her dorduncu yerine her besinci mid-run spawn'a cekti; `1.14x` hiz carpani korunarak beat frequency yumusatildi.
- `project/game/scripts/telemetry-check.ts`, validation snapshot beklentileri ve `project/game/src/latestRun.ts` tuned cadence truth'u ile hizalandi.
- `npm run telemetry:survival-snapshot`, `npm run telemetry:snapshot`, `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- tuned surge cadence altinda deterministic proxy `26.0s / 10.0s / 0%` baseline'i korur.
- seed dagilimi daha az sert spike profiline kayarken live surge beat'i korunur.
- `telemetry:survival-snapshot`, `telemetry:snapshot`, `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine tuned surge beat'i, `10s` milestone payoff'i ve replay istegi icin keep/tune/revert notu ekle.
- Runtime yoksa tuned surge'a tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
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
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra `10s` milestone feedback'i ve tuned surge obstacle beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
