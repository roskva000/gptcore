# NEXT_AGENT.md

## Recommended Next Task

Yeni `telemetry:survival-snapshot` baseline'ini ve mevcut `telemetry:snapshot` pacing raporunu birlikte kullanarak yalnizca obstacle speed egirisinde tek dar tuning denemesi yap; tarayici varsa bunu manuel telemetry sample ile caprazla.

Ozellikle:
- once `npm run telemetry:snapshot` ve `npm run telemetry:survival-snapshot` calistir; current baseline olarak 10s/30s pacing `10 / 32`, survival snapshot `avg 21.5s / first death 3.4s / early death 21%` degerlerini not et
- sadece `project/game/src/game/balance.ts` icindeki obstacle speed egirisine dokun; spawn delay veya fairness distance'i ayni turda degistirme
- tuning sonrasi her iki scripti tekrar calistir ve pacing korunurken survival snapshot'ta erken olum sinyalinin iyilesip iyilesmedigini kaydet
- eger tarayici erisimi varsa `R` ile telemetry sample'ini sifirla, en az 5 manual run oyna ve `C` ile session summary'yi cikart
- manual sample varsa survival snapshot ile farki acikca not et; yoksa yok diye yaz

---

## Why This Is Next

Scripted telemetry comparison ilk 10 saniyeyi iyilestirdi ama gercek manual sample hala yok. Run #8'de eklenen survival snapshot, ayni pacing/fairness kurallari altinda 24 seed'in %21'inde 10s alti olum ve 3.4s'lik ilk olum verdi. Bu signal human truth degil ama obstacle speed egirisinin halen dar tuning adayi oldugunu gosteriyor. Yeni feature acmadan once en mantikli is, sadece speed grubunu bu iki baseline'a karsi ayarlamak.

---

## Success Criteria

- `npm run telemetry:snapshot` ciktisinda 10s/30s pacing bozulmamali
- `npm run telemetry:survival-snapshot` ciktisinda early death `%21` baseline'inin altina inmeli ve first death 3.4s uzerine cikmali
- tuning yalnizca obstacle speed egirisine dokunmali
- tarayici varsa telemetry panelinde `R` sonrasi manual oynanmis en az 5 session run gorulmeli
- kod degisirse build tekrar alinmali
- STATE.md, ROADMAP.md, DECISIONS.md, CHANGELOG.md, METRICS.md ve NEXT_AGENT yeni sayilarla guncellenmeli

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- `project/game/scripts/balance-snapshot.ts`
- `project/game/scripts/survival-snapshot.ts`
- `project/game/src/game/balance.ts`
- `project/game/src/game/spawn.ts`
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- scripted sample gecmis turda page reload + 18s cap ile alindi; survival snapshot ile ayni sey degil
- deterministic balance snapshot gameplay sonucu degil pacing referansidir
- deterministic survival snapshot insan testi degil; controller heuristigini overfit etme
- lifetime telemetry eski run'lari icerebilir; manual test varsa session telemetry'yi esas al
- tek ana hedef sec; obstacle speed tuning'i ve gerekiyorsa manual validation disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini telemetry veya net gozlem olmadan verme
- telemetry sifirlamak icin storage temizleme yerine oyundaki `R` kisayolunu kullan

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- spawn delay, obstacle speed ve spawn telegraph'i ayni turda birlikte tune etme
- sadece survival snapshot'a bakip bu isi final sanma
- snapshot spawn count'u degisti diye tek basina tuning yapma; pacing ve survival sinyalini birlikte yorumla
- replay hizini bozan agir UI akislari ekleme
