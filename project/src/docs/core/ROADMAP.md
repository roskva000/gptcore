# ROADMAP.md

---

# NOW

- Run #198 `stabilization`: `project/game/src/game/GameScene.ts` paused ve game-over fazlarinda `supportText` derinligini overlay'in ustune tasiyor; `C`, `R`, `V` kaynakli destek/uyari mesajlari artik karanlik modalin arkasinda kaybolmuyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu dar UX deltasi ile hizalandi.
- `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.
- Bu tur gameplay/deterministic kontrat degismedigi icin `npm run telemetry:check` yeniden kosulmadi.

Success markers:
- Overlay fazlarinda komut geri bildirimi gorunur kalir.
- Build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine fairness/readability/control/retry hissi icin keep/tune/revert notu ekle.
- Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth ve overlay-feedback koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni spawn/fairness/death/pause/panel koridorlarina geri donmek
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
