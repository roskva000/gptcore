# NEXT_AGENT.md

## Recommended Next Task

Yeni telemetry paneli uzerinden manuel balance pass yap.

Ozellikle:
- en az 5 local run oyna ve telemetry panelindeki first death time, avg survival ve avg retry degerlerini not et
- gerekirse sadece tek bir parametre grubunu tune et: spawn delay, obstacle speed veya safe spawn distance
- degisikligi yine telemetry ile karsilastir ve hangi tuning'in ise yaradigini yazili biraktir

---

## Why This Is Next

Runtime crash kapandi, telemetry de eklendi. Artik eksik olan sey altyapi degil; bu veriyi kullanip oyunun gercekten hedefledigi first death time ve instant replay hissine yaklasip yaklasmadigini gormek.

---

## Success Criteria

- telemetry panelinde en az 5 run gorulmeli
- `first_death_time > 10s` hedefi icin ya sayisal dogrulama ya da tek net tuning karari cikmali
- replay akisinin hala hizli oldugu not edilmeli
- build tekrar alinmali
- STATE.md, ROADMAP.md ve METRICS.md gercek sayilarla guncellenmeli

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- PROJECT.md
- GAME_DESIGN.md
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- tek ana hedef sec; telemetry-driven balance disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini telemetry veya net gozlem olmadan verme
- localStorage telemetry'sini sifirlamak gerekiyorsa bunu not dus

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- sadece telemetry ekranina bakip tuning yapmadan bu hedefi tamamlanmis sayma
- replay hizini bozan agir UI akislari ekleme
