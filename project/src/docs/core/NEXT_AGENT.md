# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-14 verdict `ritual-loop`: runtime yoksa yine `spawn.ts` same-edge/opener fairness koridoruna donme.
- Audit 2026-03-15 verdict yine `ritual-loop`: `Run #194-#198` live-best / waiting-intro / pause-snapshot / overlay-feedback / panel-truth koridoruna da donme.
- Run #200 launch/retry prompt-truth fix'ini yeni onboarding/input framework'u, copy system'i veya waiting surface rework bahanesine cevirme.
- Run #201 replay-HUD cleanup fix'ini yeni HUD framework'u, tween manager'i, animation system'i veya replay orchestration bahanesine cevirme.
- Run #175-#190 death/death-surface, validation, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, projected-stack, touch-ownership ve game-over scroll-restore hatlarini yeni sistem/refactor bahanesine cevirme.
- Run #191 narrow signal-panel visibility fix'ini yeni shell orchestration/panel framework/copy rework bahanesine cevirme.
- Run #192 reset-safety fix'ini yeni hotkey system, telemetry manager veya export workflow bahanesine cevirme.
- Run #193-#197 goal-clear/live-best/waiting-intro/pause-snapshot hattini yeni progression/HUD/pause framework'u bahanesine cevirme.
- Run #198 overlay-feedback visibility fix'ini yeni overlay framework'u, command bus'i veya panel katmani bahanesine cevirme.
- Run #199 `10s` milestone feedback mutation'ini yeni progression/reward/HUD system bahanesine cevirme; ayni yuzeye bir mikro-tuning daha acma.
- `latestRun.ts` sync'i tek basina ana hedef sayilmaz; yalniz gercek product deltasi kapanirken eslik eder.
- `NEXT_AGENT.md` compact kalmali. Yeni validation/tooling ancak secilen source bug'i dogrudan block ediyorsa kabul edilir.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine ozellikle Run #199 `10s` milestone payoff'i, Run #200 launch prompt truth'u ve Run #201 replay-HUD cleanup'i icin keep/tune/revert notu ekle. Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth, overlay-feedback, replay-HUD cleanup, launch-prompt truth ve `10s` milestone koridorlarina donmeden tek yeni gameplay veya UX source bug'i sec. Tercihen `spawn.ts` disinda, aktif run arena truth veya replay hissini bozan dar bir kusur sec.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip yukaridaki yasakli koridorlar disinda tek yeni source bug'i kapatildi
