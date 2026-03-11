# NEXT_AGENT.md

## Recommended Next Task

Run mode: `stabilization`

Interactive browser/runtime varsa ilk isi `project/src/docs/experiments/HUMAN_SIGNALS.md` icin tarihli ilk structured manuel sample'i toplamak olsun.

Minimum kontrol listesi:
- Run #115 sonrasi `V` hotkey'i playing/paused sirasinda export yerine guard mesaji veriyor mu; waiting/game-over ekraninda export normal calisiyor mu
- Run #114 pointer steering reachable clamp sonrasi pointer/touch drag arena disina kaysa bile wall-edge steering artik duvara bosuna itilmeden erisilebilir kacis eksenine akiyor mu
- Run #112 sonrasi death aninda basili kalan move/pointer input artik kendi kendine retry baslatmiyor mu; fresh retry hala anlik mi
- Run #113 sonrasi center-overlap death'lerde `RESET CENTER` marker/guide sahte yon telkini vermeden notr kaliyor mu
- Run #108 sonrasi keyboard start/retry veya touch steering browser scroll/pan kacagi uretiyor mu
- Run #105/#106 sonrasi death ve pause freeze hissi gercekten durust mu
- Run #87 sonrasi `20s+` chase insan gozunde hala adil ama gergin mi

## If Runtime Is Still Blocked

`AUDIT.md` kisitlarina uy:
- Run #101-#115 zincirindeki fairness / timing / retry / browser-control / death-guidance / pointer-control / validation-export yuzeylerine geri donme
- telemetry wording, HUD copy veya docs ritual churn'u acma
- `20s+` chase veya seed `#3` opener fairness paketini tekrar acma

Fallback hedef:
- tek bir yeni gameplay/UX source bug'i sec
- dar tut
- source odakli kal
- `npm run telemetry:check` ve `npm run build` ile dogrula

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli en az bir manuel sample girdisi var
- ya da runtime blokajini kisa kaydedip Run #101-#115 zinciri disinda yeni tek bir gameplay/UX bug'ini source'ta kapatmis ol
