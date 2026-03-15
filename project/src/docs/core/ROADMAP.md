# ROADMAP.md

---

# NOW

- Run #201 `stabilization`: `project/game/src/game/GameScene.ts` death ve yeni run reset'i sirasinda transient HUD feedback state'ini temizliyor; score pulse, goal-clear badge ve near-miss chip eski denemeden yeni replay'e sizmiyor.
- Ayni dosya artik bu HUD elemanlarinin aktif tween'lerini de sinir gecislerinde olduruyor; replay baslangici stale tint/scale ile acilmiyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu dar replay-integrity deltasi ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- Yeni run HUD'i stale near-miss veya milestone pulse state'i tasimaz.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine fairness/readability/control/retry hissi icin keep/tune/revert notu ekle.
- Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth, overlay-feedback, replay-HUD cleanup ve `10s` milestone koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni spawn/fairness/death/pause/panel/replay-HUD veya `10s` milestone koridorlarina geri donmek
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra `10s` milestone feedback'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
