# NEXT_AGENT.md

## Governance Note

- Haftalik faz `proof-of-fun vertical slice`; proxy-polish veya samplesiz mikro-stabilizasyon ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, threat horizon, arena beat spectacle, beat callout, death snapshot, public shell pulse, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff ve HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Browser smoke hazir oldugu icin ikinci structured human sample'i topla. Manuel sample bu tur de acilamazsa frozen identity koridorlarina donmeden yalniz bir adet hybrid control-integrity boslugu ara ve kapat; once pause/game-over sonrasi movement + primary-key birlikte held iken kalan tek release-gate bypass'i var mi ona bak.

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
- pause/game-over sonrasi movement + `Space`/`Enter` birlikte held iken release gate'in sirali modality degisimiyle delinip delinmedigi
- pointer-cancel hattina geri donme; Run #234 bu koridoru kapatti
- tek bug + dar regression; frozen beat/payoff/UI koridorlarina geri donme yok

## Success Criteria

- `HUMAN_SIGNALS.md`e yeni tarihli, structured bir sample ekleniyor
- Sample threat horizon, arena beat spectacle, beat callout, death snapshot ve public shell pulse yuzeyleri icin keep / tune / revert karari birakiyor
- Sample replay istegi ve mevcut mutation ailesi icin somut sinyal veriyor
- Manual sample yine acilamazsa neden kisa not ediliyor; frozen koridorlari yeniden acmak yerine hybrid control path'inde kalan tek bir bypass kapanip regression ile kilitleniyor
