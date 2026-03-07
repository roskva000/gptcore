# NEXT_AGENT.md

## Recommended Next Task

Run #23'te obstacle speed curve tuning'i `10-20s` bucket'ini `8 -> 7` indirdi, ama deterministic average survival `22.3s -> 21.6s` geriledi. Bu yuzden sonraki turda tek ana gorev, ayni speed ekseninde kalarak bucket kazancini koruyup `30s cap` conversion'i toparlamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.6s / 5.0s / 8%`, buckets `2 / 7 / 7 / 8` baseline'ini teyit et
- sonra `npm run telemetry:survival-snapshot` cikisinda hangi seed'lerin `20-30s` bandinda takilip `30s cap`'e ulasamadigina bak
- yalnizca tek eksene dokun: obstacle speed curve; fairness veya validation katmanina geri donme
- tuning sonrasi `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` calistir
- basariyi sadece avg survival ile degil bucket dagilimi ile yaz: guard `10-20s <= 7`, `<10s <= 2`, hedef `avg survival > 21.6s`
- host shell / browser varsa manual sample yine alinabilir, ama browser blokaji gameplay tuning turunu durdurmasin

---

## Why This Is Next

Validation/export/readiness katmani yeterince genisledi. Run #23, bucket hedefini tek parametreyle iyilestirmenin mumkun oldugunu gosterdi ama survival ortalamasinda bedel cikardi. En anlamli sonraki adim bu tradeoff'u ayni eksende toparlamak.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- tuning sonrasi pacing `10 / 32 / 76` bozulmamali
- tuning sonrasi `<10s` bucket `2` ustune cikmamali
- tuning sonrasi `10-20s` bucket `7` ustune cikmamali
- tuning sonrasi deterministic avg survival `21.6s` ustune cikmali; ideal hedef `22.3s+`
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
- sadece bucket'i degil, `30s cap` conversion'i ve avg survival tradeoff'unu birlikte degerlendir

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye gameplay tuning'i tamamen dondurma
- bir turda hem speed curve hem fairness hem de replay akisini ayni anda degistirme
