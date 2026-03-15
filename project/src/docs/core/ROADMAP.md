# ROADMAP.md

---

# NOW

- Run #209 `stabilization`: replay/resume hareket niyeti artik yon kombinasyonundaki degisimi okuyarak tespit ediliyor; olum veya pause sonrasi ayni hold spam olmuyor, ama yeni yon hemen retry/resume sayiliyor.
- `project/game/src/game/primaryAction.ts` fresh movement kararini movement-state bitmask'ine tasidi; `project/game/src/game/GameScene.ts` bu state'i waiting/pause/game-over/reset akislari boyunca koruyor.
- `project/game/scripts/telemetry-check.ts` yeni direction-change retry/resume kontratini regression altina aldi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- olum veya focus-loss sonrasi yeni yon tusu fresh intent sayilir.
- degismeyen held movement replay/resume spam'i uretmez.
- deterministic survival proxy `26.0s / 10.0s / 0%` baseline'ini korur.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine replay hissi, tuned surge beat'i ve `10s` milestone payoff'i icin keep/tune/revert notu ekle.
- Runtime yoksa near-miss, tuned surge, duvar-baski spawn-target fix'i, projected-stack threshold fix'i, spawn-fallback guard fix'i veya bu yeni replay-intent fix'ine tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
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
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra near-miss reward, `10s` milestone feedback'i ve tuned surge obstacle beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
