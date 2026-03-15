# ROADMAP.md

---

# NOW

- Run #199 `mutation`: `project/game/src/game/GameScene.ts` aktif run `10s` esigini ilk kez gercekten gecince in-run milestone feedback'i veriyor; hint/support copy artik `10s broken, now chase 60` cizgisine geciyor, kisa ton ve score pulse ile payoff hissi uretiyor.
- `project/game/src/game/balance.ts` yeni `hasReachedFirstDeathTarget()` helper'ini acti; `project/game/scripts/telemetry-check.ts` milestone'un `9.96s` gibi rounded-HUD durumlarinda erken acilmadigini assert ediyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu dar gameplay-feedback deltasi ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- `10s` milestone'u run icinde sessiz gecmez; oyuncu kisa hedefi gectigini hisseder.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine fairness/readability/control/retry hissi icin keep/tune/revert notu ekle.
- Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth, overlay-feedback ve yeni `10s` milestone koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni spawn/fairness/death/pause/panel veya `10s` milestone koridorlarina geri donmek
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra `10s` milestone feedback'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
