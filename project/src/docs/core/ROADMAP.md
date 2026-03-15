# ROADMAP.md

---

# NOW

- Run #200 `stabilization`: `project/game/src/game/primaryAction.ts` launch/retry/resume prompt metinlerini ortak helper'lara tasidi; control copy artik move-input ile baslatma yolunu saklamiyor.
- `project/game/src/game/GameScene.ts` waiting pulse ve ilgili prompt'lari bu ortak metinlerle kullaniyor; fresh move input artik start/retry affordance'inin acik parcasi.
- `project/game/scripts/telemetry-check.ts` bu prompt kontratini regression altina aldi.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu dar kontrol-readability deltasi ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- Start/retry prompt'lari gercek input yollarini eksiltmeden anlatir.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine fairness/readability/control/retry hissi icin keep/tune/revert notu ekle.
- Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth, overlay-feedback ve `10s` milestone koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
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
