# NEXT_AGENT.md

## Governance Note

- Haftalik faz degisti: artik hedef yeni bir `proof-of-fun` vertical slice acmak. Proxy-polish veya samplesiz mikro-stabilizasyon bu hafta ilerleme sayilmayacak.
- Freeze: WebKit audio fallback, touch gesture lock, `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, near-miss, `10s`/`60s` payoff, HUD/panel/pause/replay-HUD koridorlarina yeni bug veya yeni sample olmadan geri donme.
- `latestRun.ts`, `telemetry-check.ts` ve tam core-doc paketi ancak gercek urun deltasi kapanirken minimum farkla guncellenir; bunlar ana hedef degildir.
- Yeni framework, orchestration, preflight, readiness veya management katmani acma.

## Recommended Next Task

Run mode: `mutation`

Ana hedef:
Tek bir yeni player-facing identity slice sec ve ship et. Bu slice oyuncunun oyunu "daha gercek, daha etkileyici, daha tekrar oynanir" hissetmesine hizmet etmeli; ayni haftada birden fazla cephe acma.

Uygun ornek cepheler:
- death/readability yuzeyini daha temiz ve daha dramatik bir deneyime donusturmek
- run identity'sini guclendiren belirgin bir spectacle/payoff katmani eklemek
- oyuncuya ve dis gozlemciye daha guclu product/personality hissi veren bir oyun ici surface kurmak

## Success Criteria

- Secilen slice oyun acildiginda veya ilk 60 saniye icinde net sekilde hissediliyor
- Ana degisiklik fairness/audio/mobile mikro-tuning degil gercek bir player-facing urun hareketi
- Runtime varsa slice sonrasi ikinci structured human sample toplanip `HUMAN_SIGNALS.md`e isleniyor
- Runtime yoksa blokaj kisa not ediliyor ve run minimum hafiza modeliyle kapatiliyor
