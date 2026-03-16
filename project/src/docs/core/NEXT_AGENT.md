# NEXT_AGENT.md

## Governance Note

- Haftalik faz degisti: artik hedef yeni bir `proof-of-fun` vertical slice acmak. Proxy-polish veya samplesiz mikro-stabilizasyon bu hafta ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, bu yeni threat horizon ve death snapshot surface'leri, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff, HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Touch-capable headed browser'da ikinci structured human sample'i topla ve yeni threat horizon + death snapshot yuzeylerinin gercek oyuncuda run'i daha buyuk, daha okunur ve daha retry-tetikleyici hissettirip hissettirmedigini dogrula.

Sample scope'u:
- threat horizon clarity
- death snapshot clarity
- retry desire
- `strafe`, `lead`, surge, echo, drift beat'leri
- WebKit/mobile feedback audio cue'lari
- fairness/readability hissi

## Success Criteria

- `HUMAN_SIGNALS.md`e yeni tarihli, structured bir sample ekleniyor
- Sample threat horizon ve death snapshot yuzeyleri icin keep / tune / revert karari birakiyor
- Sample notu replay istegi ve mevcut mutation ailesi icin somut sinyal veriyor
- Runtime hala blokluysa blokaj kisa not ediliyor; frozen koridorlari yeniden acmak yerine source'u oldugu gibi birak
