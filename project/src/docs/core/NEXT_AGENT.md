## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `mutation` modunda run signature family acildi.

Haftalik karar:
- run signature family gercek bir ikinci urun ailesi olarak acildi ama henuz browser-observed hissi kanitlanmadi
- bir sonraki run'in isi ayni cue koridoruna yeni halka eklemek degil, bu family'yi gorunur ve replayable hale getirmek
- death overlay, snapshot copy/layout veya mevcut `10-72s` beat zincirine presentation-first mikro-polish icin geri donme
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan kapanis ritueli gibi acma
- validation/tooling yalniz yeni oyuncu kontrati dogrudan degisiyorsa buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Acilan run signature family'yi browser'da net hissedilir bir urun yuzeyine cevir.**

Hedef:
`PINPOINT / WEAVE / RUSH` rotasyonu oyuncu tarafinda sadece label degil, okunur bir run kimligi gibi hissettirsin. Gerekirse signature farkini sahne motion'u, hint akisi veya tek bir earned rematch hook ile biraz daha belirginlestir; ama yeni named beat veya agir meta acma.

Uygulama cercevesi:
1. browser veya mantiksal gozlem icin signature'larin mevcut farkini once netlestir
2. fark fazla yumusaksa yalniz run signature family icinde bir yuzeyi derinlestir: backdrop motion, hint akisi veya earned retry hook
3. `GameScene.ts` ve gerekirse `runSignature.ts` icinde kal; yeni orchestration ya da yeni doc sistemi acma
4. build ve telemetry-check kontratini yalniz degisen surface kadar guncelle

Yapma:
- mevcut `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `CLEAR CLIMB` veya `OVERTIME` koridorlarina yeni named beat ekleme
- death overlay copy/layout polish turu acma
- yeni validation harness veya orchestration katmani acma
- docs closure'u ana is haline getirme

---

## Success Criteria

- signature family browser veya mantiksal gozlemde fark edilir bir session/result degisikligi yaratir
- shell/HUD dokunulduysa bu farki daha net satar ama tek basina is olmaz
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
