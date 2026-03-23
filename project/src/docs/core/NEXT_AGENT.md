## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `integration` modunda run signature `lock payoff` penceresi arena projeksiyonunda da ayri bir payoff sekli kazandi; `PINPOINT`, `WEAVE` ve `RUSH` artik opening sonrasi earned sonucu sahne diliyle de ayri tasiyor.

Haftalik karar:
- run signature family artik intro, opening cue, `RUN FEEL` paneli, opening beat chips, opening rota projeksiyonu, spawn-profili opening runtime, target/speed/cadence tasiyan `lock payoff`, payoff projeksiyonu, reminder ve death/rematch `NEXT` preview zincirinde daha bagli ama henuz gercek oyuncu hissi kanitlanmadi
- bir sonraki run'in isi ayni cue koridoruna yeni halka eklemek degil, payoff penceresinin runtime + HUD + sahne projeksiyonu birlikteyken gercekten hissedilip hissedilmedigini browser veya net manuel gozlemle kanitlamak
- death overlay, snapshot copy/layout veya mevcut `10-72s` beat zincirine presentation-first mikro-polish icin geri donme
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan kapanis ritueli gibi acma
- validation/tooling yalniz yeni oyuncu kontrati dogrudan degisiyorsa buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run signature family'nin runtime + HUD + payoff projeksiyonu tasiyan yeni `lock payoff` penceresinin gercekten hissedilip hissedilmedigini browser veya net manuel gozlemle kanitla; gerekiyorsa yalniz tek bir payoff projeksiyonu surface'ini daralt ya da sadeleştir.**

Hedef:
`PINPOINT / WEAVE / RUSH` rotasyonu oyuncu tarafinda sadece label degil, opening sonrasinda da ayri bir sonuc gibi hissettirsin. Bu tur `8.8-10.6s` araligindaki payoff penceresi target/speed/cadence farkina ek olarak arena projeksiyonunda da ayri bir sekil kazandi; siradaki run intro, opening cue, panel, beat chips, opening rota projeksiyonu, opening bias, payoff runtime'i, payoff projeksiyonu, reminder ve death/rematch `NEXT` preview'un browser veya net manuel gozlemde gercekten fark uretip uretmedigini test etmeli. Fark hala yumusaksa yalniz tek bir payoff surface'ine dokun: once payoff projeksiyon yogunlugu, sonra payoff suresi, sonra HUD siddeti.

Uygulama cercevesi:
1. browser veya net manuel gozlem ile `PINPOINT / WEAVE / RUSH` acilislarini art arda karsilastir; ozellikle `8.8-10.6s` araliginda payoff runtime'i ile payoff projeksiyonu ayni signature hissini veriyor mu bak
2. intro, ilk collision-ready opening cue, `RUN FEEL` paneli, opening beat chips, opening rota projeksiyonu, ilk `0-8.8s` opening bias, payoff runtime'i, payoff projeksiyonu, `6.2-8.8s` reminder ve death/rematch `NEXT` preview'dan hangisinin gercekten hissedildigini veya bosta kaldigini tek tek not et
3. payoff fazla yumusak veya fazla gurultuluysa yalniz tek bir payoff surface'ini daralt ya da derinlestir; once payoff projeksiyon alpha/geometri yogunlugu, sonra payoff suresi, sonra HUD yogunlugu sirasi ile karar ver; yeni beat veya yeni meta acma
4. `GameScene.ts` merkezde kal; gerekirse `runSignature.ts` icinde dar kal; yeni orchestration ya da yeni doc sistemi acma
5. `npm run telemetry:check` ve `npm run build` yesil kalsin; browser/manual gozlem notunu yalniz karar icin gereken kadar hafizada birak

Yapma:
- mevcut `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `CLEAR CLIMB` veya `OVERTIME` koridorlarina yeni named beat ekleme
- death overlay copy/layout polish turu acma
- yeni validation harness veya orchestration katmani acma
- docs closure'u ana is haline getirme

---

## Success Criteria

- signature family browser veya net manuel gozlemde fark edilir bir session/result degisikligi yaratir
- intro/opening-cue/`RUN FEEL` paneli/opening beat chips/opening rota projeksiyonu/spawn-profili opening-bias/target-speed-cadence tasiyan yeni `lock payoff`/payoff projeksiyonu/reminder/death-rematch `NEXT` preview zincirinden hangisinin gercekten ise yaradigi veya bosta kaldigi net tespit edilir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
