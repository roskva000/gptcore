# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-15 verdict `ritual-loop`: HUD/panel/pause/overlay/death-truth, validation/export ve son fairness mikro-koridorlarina geri donme.
- Run #221 yeni `strafe` mutation'ini samplesiz cadence/rotation/tint mikro-tuning bahanesine cevirme.
- Run #220 mobile gesture lock fix'ini yeni touch/input framework'u, pointer manager'i veya browser-preflight katmani acma bahanesine cevirme.
- Run #217 `lead` mutation'ini ve Run #218 spawn-grace threat filter fix'ini yeni enemy framework'u, pattern director'u, readiness/preflight katmani veya ikinci proxy sistemi acma bahanesine cevirme.
- Run #219 spawn-grace collision-ready timing fix'ini yeni readiness/preflight katmani, ikinci collision state sistemi veya yeni spawn lifecycle framework'u acma bahanesine cevirme.
- Run #216 opener cutoff, Run #215 drift coverage, Run #212 retreat-pinch, Run #208 spawn-fallback, Run #209 replay-intent ve Run #210 spawn-bookkeeping koridorlarina samplesiz mikro-tuning icin geri donme.
- Run #211 echo ve Run #214 drift mutation'larini yeni framework acma bahanesi yapma; keep/tune/revert karari once insan kaniti istiyor.
- `latestRun.ts` sync'i tek basina ana hedef sayilmaz; yalniz gercek product deltasi kapanirken eslik eder.
- Yeni validation/tooling ancak secilen source problemi dogrudan blokluyorsa kabul edilir.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine ozellikle mobile control hissi, replay istegi, Run #220 touch gesture lock fix'i, yeni Run #221 `strafe` beat'i, Run #217 `lead` beat'i, tuned Run #204 surge beat'i, Run #211 echo beat'i, Run #214 drift beat'i, Run #199 `10s` milestone payoff'i, Run #213 `60s` clear payoff'i, Run #205 near-miss edge reward'i ve Run #206/216/218/219 fairness hattinin genel hissi icin keep/tune/revert notu ekle. Runtime yoksa strafe, lead, validation/export, opener cutoff, spawn-grace truth/finalization, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target lag, retreat-pinch reachability, exact-`10.0s` threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i, spawn-bookkeeping fix'i ya da Run #220 touch-gesture lock fix'ine geri donmeden audit'in yasakladigi HUD/pause/panel/replay-HUD koridorlarina sapmadan tek yeni gameplay/UX source problemi sec.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample ve mobile control hissi / replay hissi / Run #220 touch gesture lock fix'i / yeni `strafe` beat'i / `lead` beat'i / surge beat'i / echo beat'i / drift beat'i / `10s` milestone payoff'i / `60s` clear payoff'i / near-miss edge reward / fairness hattinin genel hissi icin keep/tune/revert notu var
- Ya da runtime blokaji kisa not edilip strafe, lead, validation/export, opener cutoff, spawn-grace truth/finalization, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target lag, retreat-pinch reachability, exact-`10.0s` threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i, spawn-bookkeeping fix'i veya Run #220 touch-gesture lock fix'ine geri donmeden tek yeni gameplay/UX source problemi source + docs + `latestRun.ts` ile kapatildi
