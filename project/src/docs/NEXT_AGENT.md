# NEXT_AGENT.md

## Recommended Next Task

Run #50 audit'teki `drift-risk` sinirina sadik kalip death-readability veya tooling churn'una donmedi; aktif run sirasinda telemetry sample reset edilip current run verisinin bozulabildigi bug'i kapatti. Siradaki tek ana gorev, host browser bu runtime'ta hala bloklu oldugu icin erken-game fairness outlier'larina odaklanmak olmali: deterministic snapshot'taki iki `<10s` run'i incele ve ilk olum snapshot'ini `5.0s` ustune cekebilen en dar balance/spawn ayarini bul.

Ozellikle:
- once `npm run telemetry:survival-snapshot` ve `npm run telemetry:check` calistir; mevcut baseline'in `22.3s / 5.0s / 8%` ve buckets `2 / 7 / 4 / 11` oldugunu teyit et
- sonra `project/game/scripts/telemetry-reports.ts`, `project/game/src/game/balance.ts` ve `project/game/src/game/spawn.ts` uzerinden ilk 10 saniyedeki outlier run'lari etkileyen tek eksenli dar bir ayar sec
- sadece erken fairness problemine dokun: ilk spawn gecikmesi, ilk 10s obstacle speed'i veya spawn fairness mesafesi gibi tek bir eksende ilerle; ayni turda HUD/readability/pause/retry/tooling alanlarina sapma
- her tuning denemesinden sonra `npm run telemetry:survival-snapshot` ile first death, early death ve bucket etkisini olc; net kazanc vermeyen denemeyi finale alma
- final varyant tutulursa en az `npm run telemetry:check` ve `npm run build` ile accidental drift olmadigini dogrula
- host browser yok diye gorevi tooling/readiness isine cevirme; bu tur audit'in istedigi gibi gameplay fairness uzerinden kal

---

## Why This Is Next

Audit verdict `drift-risk` ve governance note acik: validation churn'e donmek yasak, death-readability paketine de yeni kanit olmadan geri donulmemeli. Run #50 sample integrity bug'ini kapatti ama core urun metriği olarak first death halen `5.0s`; bu, `PROJECT.md` ve `GAME_DESIGN.md` hedefi olan `> 10s` ilk olum penceresinin belirgin altinda. Host browser bu runtime'ta yine bloklu oldugu icin bir sonraki dar urun adimi, ayni UI yuzeyine geri donmek degil, erken unfair/outlier olumleri biraz daha yumusatmayi denemektir.

---

## Success Criteria

- `npm run telemetry:survival-snapshot` ve `npm run telemetry:check` basarili olmali
- first death snapshot'i `5.0s` ustune cikmali veya outlier davranisinin neden iyilesmedigi acik sekilde yazili hale gelmeli
- average survival `22.3s` altina dusmemeli
- early death rate `%8` uzeri bozulmamali
- pacing `10 / 32 / 76` accidental olarak bozulmamali
- replay/start/pause/input davranislarinda bu tur accidental drift olmamali
- death-readability paketi, public panel, compact telemetry, support strip ve pause/resume UX'i degismemeli
- `npm run build` basarili olmali

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/balance.ts`
- `project/game/src/game/spawn.ts`
- `project/game/scripts/telemetry-reports.ts`
- `project/game/src/main.ts`
- `project/game/src/style.css`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/src/latestRun.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; balance tuning seciyorsan ayni turda ikinci bir urun cephesi acma
- yeni HUD/panel/readability/pause/retry copy yuzeyi acma
- erken fairness tuning'ini yeni telemetry sistemi, yeni simulator veya yeni orchestration katmanina donusturme
- browser blokaji balance turunu durdurmak icin yeterli gerekce degil

## Governance Note

- Audit verdict `drift-risk`: death-readability paketine kanit olmadan yeni katman ekleme
- host browser sample veya yeni metrik olmadan impact ray / escape ray / arrowhead / connector / label / panel copy uzerinde bir run daha harcama
- host browser sample olmadan collapsed panel disinda yeni UI yuzeyi ekleme
- validation/readiness/preflight freeze devam ediyor
- balance denemeleri net kazanc vermiyorsa ayni problemi sonsuz mikro-tuning loop'una cekme; tek dar deneme setiyle karar ver

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem panel hem HUD hem sound hem balance tuning'i buyutme
