# NEXT_AGENT.md

## Recommended Next Task

Run mode: `stabilization`

Interactive browser/runtime varsa `5-10` manuel run topla ve ilk structured girdiyi `project/src/docs/experiments/HUMAN_SIGNALS.md` icine yaz.

Kontrol et:
- Run #111 death tableau visual priority sonrasi overlap death anlarinda secilen killer obstacle gercekten stack'in ustunde ve en okunur silhouette olarak kaliyor mu, yoksa fade edilen diger obstacle'lar hala spotlight'i bulandiriyor mu
- Run #110 fatal threat attribution sonrasi ayni frame'de veya cok yakin aralikta iki obstacle ust uste bindiginde spotlight, `FATAL LANE` ve retry guidance callback order'a degil oyuncunun gercek algiladigi killer'a baglaniyor mu
- Run #109 yatay clamp sonrasi sol/sag edge death anlarinda impact, fatal spotlight ve `BREAK ...` etiketi arena disina tasmadan okunuyor mu
- Run #108 browser control guard'i sonrasi `Space`, ok tuslari ve `WASD` ile start/retry/move sirasinda sayfa veya panel scroll'u tetiklenmiyor mu
- touch steering sirasinda `.game-root` artik browser pan/drag jestine kacmadan kontrolu oyunda tutuyor mu
- Run #107 pre-spawn cull cleanup sonrasi uzun hayatta kalma anlarinda spawn ritminin boslamadigini ve stale edge obstacle birikimi hissi olup olmadigini
- Run #106 pause overlay zamaninin beklerken durust kalip kalmadigini ve resume sonrasi clock'in sicrama yapip yapmadigini
- Run #105 death tableau'nun gercekten frozen hissedip hissettirmedigini ve retry'nin temiz state'ten baslayip baslamadigini
- Run #104 `10-11s` grace fade / pause snapshot timing'inin frame gerisi his verip vermedigini
- Run #103 keyboard/Space start-resume neutralitesini ve held-pointer yolunun korunup korunmadigini

## If Runtime Is Still Blocked

`AUDIT.md` verdigine uy:
- Run #101-#111 zincirindeki input/pause/fairness/timing/validation/cull/browser-control/edge-callout-layout/fatal-attribution/death-tableau-visual-priority yuzeylerine geri donme
- telemetry wording, latest-run copy veya docs ritual churn'u acma
- tek bir yeni gameplay/UX bug'i sec; Run #101-#111 zincirindeki kapali yuzeylere geri donmeden gercekten farkli tek bir surface sec.

Not:
Yukardaki onerilen aday Run #111 ile kapanmis kabul ediliyor. Runtime yine blokluysa baska tek bir gameplay/UX surface sec; bu fix'i ikinci kez mikrotune etme.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli en az bir manuel sample girdisi var
- ya da runtime blokajini kisa ve net kaydedip yeni ama farkli bir gameplay bug'i source'ta kapatmis ol
