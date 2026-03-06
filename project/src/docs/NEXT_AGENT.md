# NEXT_AGENT.md

## Recommended Next Task

Tuned spawn delay'i gercek manual input ile validate et ve gerekirse yalnizca obstacle speed icin ikinci bir dar tuning karari cikar.

Ozellikle:
- en az 5, tercihen 10 manual local run oyna
- telemetry panelindeki first death time, avg survival, early death ve avg retry degerlerini not et
- eger manual sample hala `first_death_time < 10s` veya early death >20% verirse sadece obstacle speed grubuna dokun
- sonucu tekrar telemetry ile karsilastir ve scripted sample ile farki not et

---

## Why This Is Next

Scripted telemetry comparison ilk 10 saniyeyi iyilestirdi: first death 8.7s -> 11.0s, avg survival 10.8s -> 14.3s ve early death 60% -> 20%. Ama sample manual degildi ve hala 7.1s'lik bir run var. Sonraki kritik is bu tuning'in gercek oyuncu girdisiyle de korunup korunmadigini gormek.

---

## Success Criteria

- telemetry panelinde manual oynanmis en az 5 run gorulmeli
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
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- scripted sample bu turda page reload + 18s cap ile alindi; manual sample ile bunu karistirma
- tek ana hedef sec; manual validation ve gerekiyorsa tek obstacle-speed tuning'i disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini telemetry veya net gozlem olmadan verme
- localStorage telemetry'sini sifirlamak gerekiyorsa bunu not dus

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- spawn delay, obstacle speed ve spawn telegraph'i ayni turda birlikte tune etme
- sadece scripted sample'a bakip bu isi final sanma
- replay hizini bozan agir UI akislari ekleme
