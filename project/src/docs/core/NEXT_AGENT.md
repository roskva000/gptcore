## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #276 ile `CLEAR CLIMB` artik `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` olarak uc halkali bir runtime finale donustu. Yeni gameplay delta acildi; ayni sayilari tekrar mikro-tune etme.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu tur source deltasi gameplay/runtime agirlikliydi; siradaki run yeni halkayi oyunda daha net sindirmeli veya ancak gercekten gerekiyorsa yeni gameplay delta secmeli
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni player-facing kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- `FALSE CLEAR` veya `PRECLEAR SQUEEZE` koridoruna geri donme
- `RIDGE CUT` runtime sayilarini ayni turda tekrar sayisal polish koridoruna sokma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- shell/retention tarafina dagilip gameplay delta'yi erteleme

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `RIDGE CUT` halkasini death snapshot ve clear-climb final tonu tarafinda da ayri okunur hale getir; `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` zinciri HUD disinda da net ayristirilsin.**

Hedef:
Runtime acildi ama death snapshot tonu halen clear-climb icinde yeterince halka-spesifik degil. Siradaki dogru adim yeni sayi tune'u degil; `RIDGE CUT` ile `SUMMIT SNAP`i snapshot/callout/prompt tonunda da ayristirip final stretch'in tum yuzeylerde uc farkli niyet tasimasini saglamak.

Acilabilecek bagli yuzeyler:
1. `deathPresentation.ts` icinde `ASCENT STAIR`, `RIDGE CUT` ve `SUMMIT SNAP` icin ayri snapshot palette/callout/prompt tonlari tanimla; en azindan ridge ve summit birbirine karismasin
2. gerekiyorsa `GameScene.ts` veya `runPhase.ts` uzerinden clear-climb callout / goal badge / live hint tonunu bu yeni snapshot ayrimiyla hizala, ama runtime sayilarina dokunma
3. `telemetry-check.ts` assert'lerini yalniz yeni snapshot/player-facing kontrat kadar buyut

Yapma:
- `45.6-60s` runtime pencerelerini yeniden bolme veya sayisal siddetleri tekrar tune etme
- yeni threat family / manager / overlay framework acma
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- `ASCENT STAIR`, `RIDGE CUT` ve `SUMMIT SNAP` snapshot / prompt / badge tonunda da birbirinden ayirt edilir
- yeni integration runtime'i degistirmeden final stretch'i daha anlatilabilir yapar
- source deltasi yine oyun-yuzeyi agirlikli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
