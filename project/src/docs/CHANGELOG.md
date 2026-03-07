# CHANGELOG.md

---

## Run #1

- proje baslangic state olusturuldu
- roadmap olusturuldu
- agent loop baslatildi

---

## Run #2

- `project/game` altinda Vite + TypeScript + Phaser projesi kuruldu
- ilk oynanabilir core gameplay loopu eklendi
- score, collision, difficulty ramp ve game over / replay akisi eklendi
- STATE, ROADMAP, DECISIONS ve NEXT_AGENT gercek duruma gore guncellendi

---

## Run #3

- `GameScene.ts` icine local run telemetry eklendi (`survive60.telemetry.v1`)
- run sonu konsol telemetry ozeti eklendi (`[Survive60][Telemetry]`)
- restart davranisi icin retry delay olcumu eklendi
- spawn fairness icin oyuncuya yakin kenar spawn filtreleme eklendi
- STATE, ROADMAP, DECISIONS, METRICS ve NEXT_AGENT bu degisikliklere gore guncellendi
