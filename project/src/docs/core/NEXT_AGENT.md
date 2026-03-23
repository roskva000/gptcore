## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `mutation` modunda run signature family ilk `0-8.8s` icinde signature-ozel opening target bias kazandi.

Haftalik karar:
- run signature family artik intro, opening runtime, reminder ve death/rematch zincirinde daha bagli ama henuz browser-observed hissi kanitlanmadi
- bir sonraki run'in isi ayni cue koridoruna yeni halka eklemek degil, bu family'nin gercek hissini browser veya net manuel gozlemle kanitlamak
- death overlay, snapshot copy/layout veya mevcut `10-72s` beat zincirine presentation-first mikro-polish icin geri donme
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan kapanis ritueli gibi acma
- validation/tooling yalniz yeni oyuncu kontrati dogrudan degisiyorsa buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run signature family'nin intro + opening runtime bias + mid-run reminder + retry zincirinin gercekten hissedilip hissedilmedigini kanitla; gerekiyorsa yalniz tek bir signature surface'ini daha derinlestir.**

Hedef:
`PINPOINT / WEAVE / RUSH` rotasyonu oyuncu tarafinda sadece label degil, okunur bir run kimligi gibi hissettirsin. Bu tur ilk `0-8.8s` spawn target davranisi signature'a gore farklilastirildi; siradaki run intro, opening bias, reminder, obstacle/HUD renk dili ve death/rematch hook'un browser veya net manuel gozlemde gercekten fark uretip uretmedigini test etmeli. Fark hala yumusaksa yalniz tek bir surface'i derinlestir: ornegin opening bias siddeti veya retry sonrasi teaser netligi.

Uygulama cercevesi:
1. browser veya en azindan net mantiksal/manual gozlem ile `PINPOINT / WEAVE / RUSH` acilislarini ve ilk `15-20s` playing state'ini art arda karsilastir
2. intro, ilk `0-8.8s` opening bias, `6.2-8.8s` reminder, obstacle/HUD renk dili ve death/rematch hook'tan hangisinin gercekten hissedildigini veya bosta kaldigini tek tek not et
3. fark fazla yumusaksa yalniz run signature family icinde tek bir yuzeyi derinlestir; yeni beat veya yeni meta acma
4. `GameScene.ts`, gerekirse `runSignature.ts` ve dar bir telemetry kontrati icinde kal; yeni orchestration ya da yeni doc sistemi acma
5. build ve telemetry-check kontratini yalniz degisen surface kadar guncelle

Yapma:
- mevcut `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `CLEAR CLIMB` veya `OVERTIME` koridorlarina yeni named beat ekleme
- death overlay copy/layout polish turu acma
- yeni validation harness veya orchestration katmani acma
- docs closure'u ana is haline getirme

---

## Success Criteria

- signature family browser veya net manuel gozlemde fark edilir bir session/result degisikligi yaratir
- intro/opening-bias/reminder/readability/retry zincirinden hangisinin gercekten ise yaradigi veya bosta kaldigi net tespit edilir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
