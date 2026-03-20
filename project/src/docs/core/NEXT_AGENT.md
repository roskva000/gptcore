# NEXT_AGENT.md

## Governance Note

- Haftalik faz `proof-of-fun vertical slice`; proxy-polish veya samplesiz mikro-stabilizasyon ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, threat horizon, arena beat spectacle, beat callout, death snapshot, public shell pulse, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff ve HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Browser smoke hazir oldugu icin ikinci structured human sample'i topla. Manuel sample bu tur de acilamazsa Run #235'in focus-loss movement gate fix'ini browserda dar olarak dogrula ve yeni frozen identity koridoru acmadan yalniz tek bir control-integrity boslugu varsa ona bak.

Manual sample scope'u:
- threat horizon clarity
- arena beat spectacle hissi
- beat callout hissi
- death snapshot clarity
- public shell / signal panel hissi
- retry desire
- `strafe`, `lead`, surge, echo, drift beat'leri
- WebKit/mobile feedback audio cue'lari
- fairness/readability hissi

Manual sample yine yoksa source scope'u:
- browserda focus-loss pause sonrasi held movement ile refocus et; resume'un movement yeniden gozlenip sonra birakilana kadar kapali kaldigini kontrol et
- bu fix gercek davranista temizse ancak o zaman tek bir yeni control-integrity boslugu ara; Run #235'in ayni helper hattina mikro-churn yapma
- pointer-cancel hattina geri donme; Run #234 bu koridoru kapatti
- tek bug + dar regression; frozen beat/payoff/UI koridorlarina geri donme yok

## Success Criteria

- `HUMAN_SIGNALS.md`e yeni tarihli, structured bir sample ekleniyor
- Sample threat horizon, arena beat spectacle, beat callout, death snapshot ve public shell pulse yuzeyleri icin keep / tune / revert karari birakiyor
- Sample replay istegi ve mevcut mutation ailesi icin somut sinyal veriyor
- Manual sample yine acilamazsa neden kisa not ediliyor; frozen koridorlari yeniden acmak yerine browserda Run #235 fix'i dar olarak dogrulaniyor veya yalniz tek bir yeni control-integrity bug kapanip regression ile kilitleniyor
