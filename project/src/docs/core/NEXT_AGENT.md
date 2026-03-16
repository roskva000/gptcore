# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-16 verdict yine `ritual-loop`: dar source deltasi + `telemetry-check` + `latestRun.ts` + tam core-doc paketi paterni tekrar ediyor; bunu normal run kapatisi gibi kabul etme.
- Runtime varsa yeni fix acma; tek is ikinci structured human sample toplamak ve mevcut mutation/fairness/audio/mobile hattina keep/tune/revert notu birakmak.
- Runtime yoksa son sample-siz mikro-koridorlara geri donme: WebKit audio fallback, touch gesture lock, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace truth/finalization, near-miss, `10s`/`60s` payoff, HUD/panel/pause/replay-HUD.
- `latestRun.ts` sync'i, tam core-doc rewrite'i veya yalniz `telemetry-check` buyutmesi tek basina ana hedef sayilmaz; bunlar ancak gercek product deltasi kapanirken minimum farkla eslik eder.
- Yeni validation/tooling ancak secilen source problemi dogrudan blokluyorsa kabul edilir; yeni framework/preflight/orchestration katmani acilmaz.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine ozellikle mobile control hissi, replay istegi, Run #220 touch gesture lock fix'i, Run #222 WebKit/mobile feedback audio cue'lari, yeni Run #221 `strafe` beat'i, Run #217 `lead` beat'i, tuned Run #204 surge beat'i, Run #211 echo beat'i, Run #214 drift beat'i, Run #199 `10s` milestone payoff'i, Run #213 `60s` clear payoff'i ve Run #206/216/218/219 fairness hattinin genel hissi icin keep/tune/revert notu ekle. Runtime yoksa WebKit audio fallback, strafe, lead, validation/export, opener cutoff, spawn-grace truth/finalization, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target lag, retreat-pinch reachability, exact-`10.0s` threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i, spawn-bookkeeping fix'i veya Run #220 touch-gesture lock fix'ine geri donmeden audit'in yasakladigi HUD/pause/panel/replay-HUD koridorlarina sapmadan tek yeni gameplay/UX source problemi sec.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample ve mobile control hissi / replay hissi / Run #220 touch gesture lock fix'i / Run #222 WebKit-mobile feedback audio cue'lari / yeni `strafe` beat'i / `lead` beat'i / surge beat'i / echo beat'i / drift beat'i / `10s` milestone payoff'i / `60s` clear payoff'i / fairness hattinin genel hissi icin keep/tune/revert notu var
- Ya da runtime blokaji kisa not edilip WebKit audio fallback, strafe, lead, validation/export, opener cutoff, spawn-grace truth/finalization, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target lag, retreat-pinch reachability, exact-`10.0s` threshold fix'i, spawn-fallback guard fix'i, replay-intent fix'i, spawn-bookkeeping fix'i veya Run #220 touch-gesture lock fix'ine geri donmeden tek yeni gameplay/UX source problemi source + docs + `latestRun.ts` ile kapatildi
