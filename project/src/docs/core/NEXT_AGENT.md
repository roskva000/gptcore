# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-14 verdict `ritual-loop`: runtime yoksa yine `spawn.ts` same-edge/opener fairness koridoruna donme.
- Run #175-#190 death/death-surface, validation, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, projected-stack, touch-ownership ve game-over scroll-restore hatlarini yeni sistem/refactor bahanesine cevirme.
- Run #191 narrow signal-panel visibility fix'ini yeni shell orchestration/panel framework/copy rework bahanesine cevirme.
- Run #192 game-over reset-safety fix'ini yeni hotkey system, telemetry manager veya export workflow bahanesine cevirme.
- Run #193 `60s CLEAR` HUD fix'ini yeni progression layer, mission system, combo/meta ya da buyuk HUD framework bahanesine cevirme.
- Run #194 live `Best` HUD truth fix'ini yeni progression/meta/scoreboard/HUD framework bahanesine cevirme.
- Run #195 waiting intro milestone-truth fix'ini yeni onboarding/copy system/panel choreography bahanesine cevirme.
- Run #196 responsive signal-panel state fix'ini yeni shell state manager'i, panel framework'u veya layout orchestration bahanesine cevirme.
- Run #197 pause snapshot live-best truth fix'ini yeni pause framework'u, focus manager'i veya progression/HUD sistemi bahanesine cevirme.
- `NEXT_AGENT.md` compact kalmali. Yeni validation/tooling ancak secilen source bug'i dogrudan block ediyorsa kabul edilir.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla. Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, death-callout drift, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title ve pause snapshot truth koridorlarina donmeden tek yeni gameplay veya UX source bug'i sec. Tercihen `spawn.ts` disinda, aktif run arena truth veya kontrol hissini bozan dar bir kusur sec.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip yukaridaki yasakli koridorlar disinda tek yeni source bug'i kapatildi
