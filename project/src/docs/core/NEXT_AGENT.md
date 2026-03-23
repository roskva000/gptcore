## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `integration` modunda run signature family opening boyunca signature-ozel arena rota projeksiyonu kazandi; bu tur death/rematch zinciri de bir sonraki signature'i kisa `NEXT` preview ile satmaya basladi.

Haftalik karar:
- run signature family artik intro, opening cue, `RUN FEEL` paneli, opening beat chips, arena rota projeksiyonu, spawn-profili opening runtime, reminder ve death/rematch `NEXT` preview zincirinde daha bagli ama henuz gercek oyuncu hissi kanitlanmadi
- bir sonraki run'in isi ayni cue koridoruna yeni halka eklemek degil, bu family'nin gercek hissini browser veya net manuel gozlemle kanitlamak
- death overlay, snapshot copy/layout veya mevcut `10-72s` beat zincirine presentation-first mikro-polish icin geri donme
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan kapanis ritueli gibi acma
- validation/tooling yalniz yeni oyuncu kontrati dogrudan degisiyorsa buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run signature family'nin opening kimligi ile death/rematch `NEXT` handoff'unun gercekten hissedilip hissedilmedigini browser veya net manuel gozlemle kanitla; gerekiyorsa yalniz tek bir signature surface'ini daha derinlestir.**

Hedef:
`PINPOINT / WEAVE / RUSH` rotasyonu oyuncu tarafinda sadece label degil, okunur bir run kimligi ve retry zinciri gibi hissettirsin. Bu tur game-over prompt'u ve support satiri bir sonraki signature'i erken gostermeye basladi; siradaki run intro, opening cue, panel, beat chips, rota projeksiyonu, spawn-profili opening bias, reminder ve death/rematch `NEXT` preview'un browser veya net manuel gozlemde gercekten fark uretip uretmedigini test etmeli. Fark hala yumusaksa yalniz tek bir surface'i derinlestir: ornegin death/rematch `NEXT` satir yogunlugu, rota projeksiyonunun alpha/yogunlugu veya `RUN FEEL` panelinin mobil yerlesimi.

Uygulama cercevesi:
1. browser veya net manuel gozlem ile `PINPOINT / WEAVE / RUSH` acilislarini ve en az birer death/rematch ekranini art arda karsilastir
2. intro, ilk collision-ready opening cue, `RUN FEEL` paneli, opening beat chips, arena rota projeksiyonu, ilk `0-8.8s` spawn-profili opening bias, `6.2-8.8s` reminder ve death/rematch `NEXT` preview'dan hangisinin gercekten hissedildigini veya bosta kaldigini tek tek not et
3. fark fazla yumusaksa yalniz run signature family icinde tek bir yuzeyi derinlestir; yeni beat veya yeni meta acma
4. `GameScene.ts` merkezde kal; gerekirse `runSignature.ts` ve `deathPresentation.ts` icinde dar kal; yeni orchestration ya da yeni doc sistemi acma
5. build, telemetry-check ve mumkunse mevcut browser smoke + manuel gozlem kanitini yalniz degisen surface kadar guncelle

Yapma:
- mevcut `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `CLEAR CLIMB` veya `OVERTIME` koridorlarina yeni named beat ekleme
- death overlay copy/layout polish turu acma
- yeni validation harness veya orchestration katmani acma
- docs closure'u ana is haline getirme

---

## Success Criteria

- signature family browser veya net manuel gozlemde fark edilir bir session/result degisikligi yaratir
- intro/opening-cue/`RUN FEEL` paneli/opening beat chips/rota projeksiyonu/spawn-profili opening-bias/reminder/death-rematch `NEXT` preview zincirinden hangisinin gercekten ise yaradigi veya bosta kaldigi net tespit edilir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
