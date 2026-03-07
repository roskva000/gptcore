# NEXT_AGENT.md

## Recommended Next Task

Deterministic survival proxy'de `10-20s` bandinda yigilan olumleri azaltacak tek bir gameplay tuning'i sec. Run #22 sonunda gameplay baseline korunup survival snapshot'a bucket dagilimi eklendi; mevcut baseline `under10=2`, `10-20=8`, `20-30=4`, `30cap=10`. Bundan sonraki en anlamli adim validation katmanini buyutmek degil, bu orta bant basincini tek parametreyle iyilestirmek.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 8 / 4 / 10` baseline'ini teyit et
- sonra `npm run telemetry:survival-snapshot` cikisini ac ve hangi tek parametrenin `10-20s` bucket'ini daraltabilecegine karar ver
- yalnizca tek eksene dokun: obstacle speed'in `10-20s` bandi veya spawn fairness distance decay'i
- tuning sonrasi `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` calistir
- basariyi sadece avg survival ile degil bucket dagilimi ile yaz: hedef `10-20s < 8`, guard ise `<10s <= 2`
- host shell / browser varsa manual sample yine alinabilir, ama browser blokaji gameplay tuning turunu durdurmasin

---

## Why This Is Next

Validation/export/readiness katmani yeterince genisledi. Run #22'nin yeni sinyali, mevcut deterministic baskinin `<10s` degil `10-20s` bandinda toplandigini gosteriyor. Bu, sonraki tuning turunun hedefini daraltir ve validation churn yerine gameplay iteration'a geri donmeyi saglar.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- tuning sonrasi pacing `10 / 32 / 76` bozulmamali
- tuning sonrasi `<10s` bucket `2` ustune cikmamali
- tuning sonrasi `10-20s` bucket `8` altina inmeli veya neden inmediği net aciklanmali
- `npm run telemetry:validation-snapshot` ve `npm run build` basarili olmali
- manual sample alinabilirse deterministic bucket dagilimi ile yazili olarak karsilastirilmali

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- `project/game/scripts/telemetry-check.ts`
- `project/game/scripts/telemetry-reports.ts`
- `project/game/scripts/survival-snapshot.ts`
- `project/game/scripts/validation-snapshot.ts`
- `project/game/src/game/balance.ts`
- `project/game/src/game/spawn.ts`
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; bir turda birden fazla gameplay eksenine dokunma
- deterministic survival snapshot insan testi degil; controller heuristigine overfit etme
- `telemetry:check` intentional tuning'de fail verecektir; baseline'i ancak bilincli olarak guncelle
- browser blokaji gameplay iteration'i durdurmak icin yeterli gerekce degil

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye gameplay tuning'i tamamen dondurma
- bir turda hem speed curve hem fairness hem de replay akisini ayni anda degistirme
