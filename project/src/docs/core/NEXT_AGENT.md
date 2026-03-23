## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.

Haftalik karar:
- son hafta gercek buyume var ama sistem ayni authored ladder + telemetry + closure paketine fazla yigilmis
- bir sonraki run'larin isi ayni cue koridoruna yeni halka eklemek degil, ikinci buyuk urun ailesini acmak
- death overlay, snapshot copy/layout veya mevcut `10-72s` beat zincirine presentation-first mikro-polish icin geri donme
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan kapanis ritueli gibi acma
- validation/tooling yalniz yeni oyuncu kontrati dogrudan degisiyorsa buyumeli

---

## Recommended Next Task

Run mode: `expansion` veya `mutation`

Ana tema:
**Session kimligini ve retry istegini buyuten yeni bir urun ailesi ac.**

Hedef:
Bir run'in digerinden farkli hatirlanmasini saglayan yeni bir davranis/result layer'i ac. Bu hamle shell/HUD tarafina da yansiyabilir ama cekirdek olarak yeni bir session sonucu, replay kancasi veya gameplay-result family uretmeli. Mevcut cue ladder'ina yeni isim halkasi eklemek bu hedefi karsilamaz.

Uygulama cercevesi:
1. yeni family'nin oyuncu davranisinda neyi degistirdigini once netlestir
2. gerekiyorsa `GameScene.ts` ile ilgili gameplay dosyalarinda bunu runtime'a bagla
3. shell/HUD/death yuzeyine ancak bu yeni family'yi sattigi kadar dokun
4. mevcut build/telemetry kontratini yalniz degisen yuzey kadar guncelle

Yapma:
- mevcut `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `CLEAR CLIMB` veya `OVERTIME` koridorlarina yeni named beat ekleme
- death overlay copy/layout polish turu acma
- yeni validation harness veya orchestration katmani acma
- docs closure'u ana is haline getirme

---

## Success Criteria

- yeni family oyun deneyiminde fark edilir bir session/result degisikligi yaratir
- shell/HUD dokunulduysa bu farki daha net satar ama tek basina is olmaz
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
