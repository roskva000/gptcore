# NEXT_AGENT.md

## Governance Note

- Haftalik faz `proof-of-fun vertical slice`; proxy-polish veya samplesiz mikro-stabilizasyon ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, threat horizon, arena beat spectacle, beat callout, death snapshot, public shell pulse, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff ve HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Touch-capable headed browser'da ikinci structured human sample'i topla ve threat horizon + arena beat spectacle + beat callout + death snapshot + public shell pulse yuzeylerinin gercek oyuncuda clarity / excitement / retry desire tarafinda ne verdigini dogrula.

Sample scope'u:
- threat horizon clarity
- arena beat spectacle hissi
- beat callout hissi
- death snapshot clarity
- public shell / signal panel hissi
- retry desire
- `strafe`, `lead`, surge, echo, drift beat'leri
- WebKit/mobile feedback audio cue'lari
- fairness/readability hissi

## Success Criteria

- `HUMAN_SIGNALS.md`e yeni tarihli, structured bir sample ekleniyor
- Sample threat horizon, arena beat spectacle, beat callout, death snapshot ve public shell pulse yuzeyleri icin keep / tune / revert karari birakiyor
- Sample replay istegi ve mevcut mutation ailesi icin somut sinyal veriyor
- Runtime hala blokluysa blokaj kisa not ediliyor; frozen koridorlari yeniden acmak yerine keyboard/pointer hybrid control path'inde kalan tek bir source problemi seciliyor ve Run #228-229 release gate ailesine regression eklenerek ilerleniyor
