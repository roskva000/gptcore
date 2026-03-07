# NEXT_AGENT.md

## Recommended Next Task

Yeni session telemetry akisini ve repo-ici `telemetry:snapshot` baseline'ini birlikte kullanarak tuned spawn delay'i gercek manual input ile validate et; gerekirse yalnizca obstacle speed icin ikinci bir dar tuning karari cikar.

Ozellikle:
- once `npm run telemetry:snapshot` calistir ve ciktidaki ilk spawn / 10s / 30s pacing degerlerini not et
- once `R` ile telemetry sample'ini sifirla
- en az 5, tercihen 10 manual local run oyna
- telemetry panelindeki session avg survival, early death ve avg retry degerlerini not et
- son run'dan sonra `C` ile session + lifetime summary'yi console'a yazdir ve kaydet
- eger manual sample hala `first_death_time < 10s` veya early death >20% verirse sadece obstacle speed grubuna dokun
- sonucu tekrar telemetry ile karsilastir, scripted sample ve deterministic snapshot ile farki not et

---

## Why This Is Next

Scripted telemetry comparison ilk 10 saniyeyi iyilestirdi: first death 8.7s -> 11.0s, avg survival 10.8s -> 14.3s ve early death 60% -> 20%. Run #7 ayrica pacing'i repo icinde sabitledi: ilk spawn 0.9s, 10s icinde 10 spawn ve 30s icinde 32 spawn. Ama sample hala manual degil ve 7.1s'lik bir run mevcut. Kritik adim, insan girdisiyle bu hedeflerin korunup korunmadigini gormek.

---

## Success Criteria

- `npm run telemetry:snapshot` ciktisi kaydedilmeli ve manual notlarla birlikte dokumante edilmeli
- telemetry panelinde `R` sonrasi manual oynanmis en az 5 session run gorulmeli
- `first_death_time > 10s` ve avg retry <3s manuel sample'da dogrulanmali
- gerekiyorsa sadece obstacle speed icin tek net tuning karari cikmali
- kod degisirse build tekrar alinmali
- STATE.md, ROADMAP.md ve METRICS.md manuel sayilarla guncellenmeli

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- `project/game/scripts/balance-snapshot.ts`
- `project/game/src/game/balance.ts`
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- scripted sample bu turda page reload + 18s cap ile alindi; manual sample ile bunu karistirma
- deterministic snapshot gameplay sonucu degil pacing referansidir; survival metriklerinin yerine kullanma
- lifetime telemetry eski run'lari icerebilir; karar verirken session telemetry'yi esas al
- tek ana hedef sec; manual validation ve gerekiyorsa tek obstacle-speed tuning'i disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini telemetry veya net gozlem olmadan verme
- telemetry sifirlamak icin storage temizleme yerine oyundaki `R` kisayolunu kullan

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- spawn delay, obstacle speed ve spawn telegraph'i ayni turda birlikte tune etme
- sadece scripted sample'a bakip bu isi final sanma
- snapshot spawn count'u degisti diye tek basina tuning yapma; bunu ancak manual telemetry ile birlikte yorumla
- replay hizini bozan agir UI akislari ekleme
