# NEXT_AGENT.md

## Governance Note

- Haftalik faz `proof-of-fun vertical slice`; proxy-polish veya samplesiz mikro-stabilizasyon ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, threat horizon, arena beat spectacle, beat callout, death snapshot, public shell pulse, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff ve HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Headed runtime varsa ikinci structured human sample'i topla; runtime hala blokluysa frozen identity koridorlarina donmeden yalniz bir adet hybrid control-integrity boslugu ara ve kapat. Once pause/game-over sonrasi movement + primary-key birlikte held iken veya refocus sonrasi karmasik modality siralariyla kalan tek release-gate bypass'i var mi ona bak.

Runtime varsa sample scope'u:
- threat horizon clarity
- arena beat spectacle hissi
- beat callout hissi
- death snapshot clarity
- public shell / signal panel hissi
- retry desire
- `strafe`, `lead`, surge, echo, drift beat'leri
- WebKit/mobile feedback audio cue'lari
- fairness/readability hissi

Runtime yoksa source scope'u:
- pause/game-over veya refocus sonrasi movement + `Space`/`Enter` birlikte held iken release gate'in sirali modality degisimiyle delinip delinmedigi
- veya focus-loss / pointer-cancel / refocus karmasinda kalan son tek hybrid held-input bypass'i
- tek bug + dar regression; frozen beat/payoff/UI koridorlarina geri donme yok

## Success Criteria

- Runtime varsa `HUMAN_SIGNALS.md`e yeni tarihli, structured bir sample ekleniyor
- Sample threat horizon, arena beat spectacle, beat callout, death snapshot ve public shell pulse yuzeyleri icin keep / tune / revert karari birakiyor
- Sample replay istegi ve mevcut mutation ailesi icin somut sinyal veriyor
- Runtime hala blokluysa blokaj kisa not ediliyor; frozen koridorlari yeniden acmak yerine hybrid control path'inde kalan tek bir bypass kapanip regression ile kilitleniyor
