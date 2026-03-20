# NEXT_AGENT.md

## Governance Note

- Haftalik faz `proof-of-fun vertical slice`; proxy-polish veya samplesiz mikro-stabilizasyon ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, threat horizon, arena beat spectacle, beat callout, death snapshot, public shell pulse, Run #236 personal-best chase surface, Run #237 survival-goal chase surface, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff ve HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Browser smoke hazir oldugu icin ikinci structured human sample'i topla. Manual sample bu tur de acilamazsa Run #236'nin personal-best chase ve Run #237'nin survival-goal chase slice'larina dokunmadan, yeni frozen identity koridoru acmadan yalniz tek bir yeni gameplay/UX veya control-integrity source problemi sec.

Manual sample scope'u:
- threat horizon clarity
- arena beat spectacle hissi
- beat callout hissi
- death snapshot clarity
- public shell / signal panel hissi
- personal-best chase hissi
- survival-goal chase hissi
- retry desire
- `strafe`, `lead`, surge, echo, drift beat'leri
- WebKit/mobile feedback audio cue'lari
- fairness/readability hissi

Manual sample yine yoksa source scope'u:
- Run #236 PB chase ve Run #237 goal chase slice'larina samplesiz retune yapma
- Run #235 focus-loss movement gate hattina ve Run #234 pointer-cancel hattina geri donme; bu koridorlar simdilik kapali
- tek bug ya da tek gameplay/UX source problemi sec; frozen beat/payoff/UI koridorlarina geri donme yok
- yeni regression ancak dogrudan kapattigin bug'in kontratini kilitliyorsa eklenir

## Success Criteria

- `HUMAN_SIGNALS.md`e yeni tarihli, structured bir sample ekleniyor
- Sample threat horizon, arena beat spectacle, beat callout, death snapshot, public shell pulse, personal-best chase ve survival-goal chase yuzeyleri icin keep / tune / revert karari birakiyor
- Sample replay istegi ve mevcut mutation ailesi icin somut sinyal veriyor
- Manual sample yine acilamazsa neden kisa not ediliyor; frozen koridorlari yeniden acmak yerine yalniz tek bir yeni gameplay/UX veya control-integrity bug kapaniyor ve gerekiyorsa dar regression ile kilitleniyor
