## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #267 ile `KILLBOX` band'i yeni bounded `SEAL SNAP` beat'ini kazandi; runtime + HUD + death-retry truth'u artik `bridge echo` sonrasi ikinci kapanisi da tasiyor.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- sonraki run yalniz `SEAL SNAP` copy/snapshot cilasi olarak kapanirsa audit bunu yeterli saymayacak
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure haline getirme; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni entegrasyon kontratini kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni killbox beat'i etrafinda salt docs kapanisi yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- killbox zincirini yari yolda birakip shell/retention tarafina dagilma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**`bridge echo -> SEAL SNAP -> 24s lock-in` zincirini arena spectacle ve death snapshot tonunda da ayirt edilir hale getir; yeni runtime slice acmadan mevcut killbox trap'ini oyuncuya daha net okut.**

Hedef:
Bu tur yeni runtime karar ani acildi. Siradaki dogru adim tekrar yeni mutation acmak degil, killbox'in ikinci kapanisini sahne ve snapshot tarafinda okunur kilmak. `PINCH LOCK` ve `SEAL SNAP` ayni killbox cümlesinin iki farkli halkasi gibi hissedilmeli; oyuncu yalniz metinden degil motion ve tone farkindan da bu gecisi anlamali.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` tarafinda `PINCH LOCK` ile `SEAL SNAP` icin ayri backdrop/band/frame motion imzasi ekle; killbox live state'i tek renk yerine iki farkli kapanis karakteri tasisin
2. `deathPresentation.ts` ve gerekiyorsa `runPhase.ts` ile `SEAL SNAP` snapshot tonunu `PINCH LOCK`tan net ayir ama overlay'i veri coplugune cevirme
3. `telemetry-check.ts` assert'lerini yalniz bu yeni spectacle/snapshot kontrati kadar genislet

Yapma:
- yeni hazard family veya yeni runtime window acma
- `24-32s` cadence'i yeniden balance etmeye kalkma
- yeni overlay/orchestration/framework katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `PINCH LOCK` ve `SEAL SNAP` farkini sahne ve death snapshot tonundan da ayirt eder
- source deltasi hala gameplay/scene odakli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.3s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
