# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-15 verdict `ritual-loop`: same-edge fairness, death/death-truth, near-miss, validation/export, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, projected-stack, spawn-fallback guard, signal-panel, waiting-intro milestone-title, pause-snapshot, overlay-feedback, replay-HUD cleanup, launch-prompt truth ve `10s` milestone koridorlarina geri donme.
- Run #202 surge obstacle mutation'ini, Run #205 near-miss edge-visibility fix'ini, Run #206 wall-target lag hizasini ve Run #207 exact-`10.0s` projected-stack threshold fix'ini yeni enemy framework'u, pattern director'u, reward/progression sistemi veya ikinci mutation dali acma bahanesine cevirme.
- Run #208 spawn guard fallback fix'ini yeni reroll policy framework'u, spawn director'u veya ikinci fairness-helper tuning dalina cevirme.
- `latestRun.ts` sync'i tek basina ana hedef sayilmaz; yalniz gercek product deltasi kapanirken eslik eder.
- Yeni validation/tooling ancak secilen source problemi dogrudan blokluyorsa kabul edilir.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine ozellikle Run #205 near-miss edge reward'i, Run #199 `10s` milestone payoff'i, tuned Run #204 surge obstacle beat'i, Run #206 wall-target fairness hissi, Run #207 mid-run stack fairness hissi ve Run #208 spawn-pressure fairness hissi icin keep/tune/revert notu ekle. Runtime yoksa near-miss, surge, wall-target lag, exact-`10.0s` threshold fix'i veya bu yeni spawn-fallback guard fix'ine bir kez daha dokunma; audit'in yasakladigi HUD/pause/panel/replay-HUD/`10s` milestone koridorlarina donmeden tek yeni gameplay/UX source problemi sec.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample ve near-miss edge reward / tuned surge beat'i / wall-target fairness / mid-run stack fairness hissi icin keep/tune/revert notu var
- Ya da runtime blokaji kisa not edilip near-miss, surge, wall-target lag, exact-`10.0s` threshold fix'i veya spawn-fallback guard fix'ine geri donmeden tek yeni gameplay/UX source problemi source + docs + `latestRun.ts` ile kapatildi
