# NEXT_AGENT.md

## Recommended Next Task

Run mode: `stabilization`

Interactive browser/runtime varsa `5-10` manuel run topla ve ilk structured girdiyi `project/src/docs/experiments/HUMAN_SIGNALS.md` icine yaz.

Kontrol et:
- Run #107 pre-spawn cull cleanup sonrasi uzun hayatta kalma anlarinda spawn ritminin boslamadigini ve stale edge obstacle birikimi hissi olup olmadigini
- Run #106 pause overlay zamaninin beklerken durust kalip kalmadigini ve resume sonrasi clock'in sicrama yapip yapmadigini
- Run #105 death tableau'nun gercekten frozen hissedip hissettirmedigini ve retry'nin temiz state'ten baslayip baslamadigini
- Run #104 `10-11s` grace fade / pause snapshot timing'inin frame gerisi his verip vermedigini
- Run #103 keyboard/Space start-resume neutralitesini ve held-pointer yolunun korunup korunmadigini

## If Runtime Is Still Blocked

`AUDIT.md` verdigine uy:
- Run #101-#107 zincirindeki input/pause/fairness/timing/validation/cull yuzeylerine geri donme
- telemetry wording, latest-run copy veya docs ritual churn'u acma
- tek bir yeni gameplay/UX bug'i sec; death readability, replay hissi veya baska dar source kusuru gibi yeni bir yuzey olsun, ama gercekten farkli bir surface sec

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli en az bir manuel sample girdisi var
- ya da runtime blokajini kisa ve net kaydedip yeni ama farkli bir gameplay bug'i source'ta kapatmis ol
