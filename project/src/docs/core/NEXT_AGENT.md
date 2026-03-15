# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-15 verdict `ritual-loop`: same-edge fairness, death/death-truth, near-miss, validation/export, launch-control, mobile-touch, viewport, scene-lifecycle, spawn-grace, projected-stack, spawn-fallback guard, signal-panel, waiting-intro milestone-title, pause-snapshot, overlay-feedback, replay-HUD cleanup, launch-prompt truth ve `10s` milestone koridorlarina geri donme.
- Run #216 opener cutoff integrity fix'ini yeni spawn framework'u, second-pass fairness katmani, readiness/preflight katmani veya ikinci proxy sistemi acma bahanesine cevirme.
- Run #215 deterministic drift coverage fix'ini yeni validation framework'u, readiness/preflight katmani, export surface'i veya ikinci proxy sistemi acma bahanesine cevirme.
- Run #213 `60s` clear payoff integration'ini yeni reward/progression sistemi, combo economy'si veya feedback framework'u acma bahanesine cevirme.
- Run #202 surge obstacle mutation'ini, Run #205 near-miss edge-visibility fix'ini, Run #206 wall-target lag hizasini ve Run #207 exact-`10.0s` projected-stack threshold fix'ini yeni enemy framework'u, pattern director'u, reward/progression sistemi veya ikinci mutation dali acma bahanesine cevirme.
- Run #208 spawn guard fallback fix'ini yeni reroll policy framework'u, spawn director'u veya ikinci fairness-helper tuning dalina cevirme.
- Run #209 replay-intent movement-state fix'ini yeni input framework'u, action mapper'i veya replay orchestration katmanina cevirme.
- Run #210 spawn-bookkeeping integrity fix'ini yeni spawn manager'i, pooling framework'u veya readiness/preflight katmanina cevirme.
- Run #211 echo obstacle mutation'ini yeni enemy family framework'u, pattern director'u, target-router sistemi veya ikinci rhythm mutation dali acma bahanesine cevirme.
- Run #212 retreat-pinch reachability fix'ini yeni wall-pressure framework'u, movement predictor'u veya spawn-governor katmanina cevirme.
- Run #214 drift obstacle mutation'ini yeni enemy framework'u, pattern director'u, trajectory manager'i veya ikinci late-run mutation dali acma bahanesine cevirme.
- `latestRun.ts` sync'i tek basina ana hedef sayilmaz; yalniz gercek product deltasi kapanirken eslik eder.
- Yeni validation/tooling ancak secilen source problemi dogrudan blokluyorsa kabul edilir.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine ozellikle replay hissi, Run #199 `10s` milestone payoff'i, Run #213 `60s` clear payoff'i, Run #205 near-miss edge reward'i, tuned Run #204 surge beat'i, Run #211 echo beat'i, Run #214 drift beat'i, Run #206 wall-target fairness hissi, Run #208 spawn-pressure fairness hissi, Run #210 spawn integrity hissi, Run #212 wall-press retreat fairness hissi ve Run #216 opener fairness hissi icin keep/tune/revert notu ekle. Runtime yoksa validation/export'a, opener cutoff fix'ine veya near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target lag, retreat-pinch reachability, exact-`10.0s` threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i ya da spawn-bookkeeping fix'ine geri donmeden audit'in yasakladigi HUD/pause/panel/replay-HUD koridorlarina sapmadan tek yeni gameplay/UX source problemi sec.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample ve replay hissi / `10s` milestone payoff'i / `60s` clear payoff'i / near-miss edge reward / tuned surge beat'i / echo beat'i / drift beat'i / wall-target fairness / spawn-pressure fairness / spawn integrity hissi / wall-press retreat fairness hissi / opener fairness hissi icin keep/tune/revert notu var
- Ya da runtime blokaji kisa not edilip validation/export'a, opener cutoff fix'ine, near-miss'e, `10s` milestone'a, `60s` clear payoff'a, surge'e, echo'ya, drift'e, wall-target lag'a, retreat-pinch reachability'ye, exact-`10.0s` threshold fix'ine, spawn-fallback guard fix'ine, replay-intent fix'ine veya spawn-bookkeeping fix'ine geri donmeden tek yeni gameplay/UX source problemi source + docs + `latestRun.ts` ile kapatildi
