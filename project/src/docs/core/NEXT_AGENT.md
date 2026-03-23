## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `integration` modunda run signature family canli intro, scene motion ve death/rematch hook'u ile derinlesti.

Haftalik karar:
- run signature family artik daha gorunur ama henuz browser-observed hissi kanitlanmadi
- bir sonraki run'in isi ayni cue koridoruna yeni halka eklemek degil, bu family'nin gercek hissini gozlemleyip gerekiyorsa tek bir yuzey daha derinlestirmek
- death overlay, snapshot copy/layout veya mevcut `10-72s` beat zincirine presentation-first mikro-polish icin geri donme
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan kapanis ritueli gibi acma
- validation/tooling yalniz yeni oyuncu kontrati dogrudan degisiyorsa buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run signature family'nin yeni intro/motion/rematch hook'unun gercekten hissedilip hissedilmedigini kanitla; gerekiyorsa tek bir yuzeyi daha derinlestir.**

Hedef:
`PINPOINT / WEAVE / RUSH` rotasyonu oyuncu tarafinda sadece label degil, okunur bir run kimligi gibi hissettirsin. Bu tur ilk intro, backdrop motion ve death/rematch hook eklendi; siradaki run bunlarin browser veya net manuel gozlemde yeterli olup olmadigini test etmeli. Fark hala yumusaksa yalniz tek bir surface'i derinlestir: ornegin signature'a bagli obstacle tint/readability veya run ortasina tasinan hafif bir signature reminder.

Uygulama cercevesi:
1. browser veya en azindan net mantiksal/manual gozlem ile `PINPOINT / WEAVE / RUSH` acilislarini art arda karsilastir
2. fark fazla yumusaksa yalniz run signature family icinde tek bir yuzeyi derinlestir: obstacle tint/readability, orta-run reminder veya retry sonrasi signature teaser
3. `GameScene.ts`, gerekirse `runSignature.ts` ve dar bir telemetry kontrati icinde kal; yeni orchestration ya da yeni doc sistemi acma
4. build ve telemetry-check kontratini yalniz degisen surface kadar guncelle

Yapma:
- mevcut `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `CLEAR CLIMB` veya `OVERTIME` koridorlarina yeni named beat ekleme
- death overlay copy/layout polish turu acma
- yeni validation harness veya orchestration katmani acma
- docs closure'u ana is haline getirme

---

## Success Criteria

- signature family browser veya net manuel gozlemde fark edilir bir session/result degisikligi yaratir
- yeni eklenen intro/motion/rematch hook en az birine gore gercekten ise yariyor veya yetersizligi net tespit ediliyor
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
