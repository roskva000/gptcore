# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-15 verdict `ritual-loop`: same-edge fairness, death/death-truth, near-miss, validation/export, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, projected-stack, signal-panel, waiting-intro milestone-title, pause-snapshot, overlay-feedback, replay-HUD cleanup, launch-prompt truth ve `10s` milestone koridorlarina geri donme.
- Run #202 surge obstacle mutation'ini yeni enemy framework'u, pattern director'u, reward/progression sistemi veya ikinci mutation dali acma bahanesine cevirme.
- `latestRun.ts` sync'i tek basina ana hedef sayilmaz; yalniz gercek product deltasi kapanirken eslik eder.
- Yeni validation/tooling ancak secilen source problemi dogrudan blokluyorsa kabul edilir.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine ozellikle Run #199 `10s` milestone payoff'i, Run #201 replay-HUD cleanup'i ve Run #202 surge obstacle beat'i icin keep/tune/revert notu ekle. Runtime yoksa yeni mutation acmadan once yalniz surge obstacle beat'i icin tek dar stabilization karari ver: mevcut `26.0s avg / 10.0s first death / 0% early` proxy'yi kullanarak sadece cadence veya speed multiplier'i retain et, hafif tune et ya da revert et.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample ve surge beat'i icin keep/tune/revert notu var
- Ya da runtime blokaji kisa not edilip yalniz surge cadence/speed multiplier'i icin tek dar stabilization karari source + docs + `latestRun.ts` ile kapatildi
