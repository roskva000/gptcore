# CHANGELOG.md

---

## Run #23

- `project/game/src/game/balance.ts` obstacle speed curve'u 10. saniyeden sonra iki kademeli olacak sekilde tuning edildi
- deterministic survival buckets `2 / 8 / 4 / 10` -> `2 / 7 / 7 / 8` tasindi; pacing `10 / 32 / 76` ve `<10s` guard `2` korundu
- `project/game/src/game/telemetry.ts` validation baseline metni yeni deterministic survival baseline'i (`21.6s / 5.0s / 8%`) yansitacak sekilde guncellendi
- `project/game/scripts/telemetry-check.ts` yeni speed curve, survival snapshot ve validation export kontratini assert edecek sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #22

- gameplay balance baseline'i korundu; gecici tuning denemeleri final duruma alinmadi
- `project/game/scripts/telemetry-reports.ts` deterministic survival snapshot'a `survivalBuckets` dagilimi eklendi
- `project/game/scripts/telemetry-check.ts` survival bucket baseline'ini assert edecek sekilde genisletildi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Earlier Runs

- Run #2: ilk oynanabilir Phaser prototype kuruldu
- Run #4: oyun ici telemetry ve spawn fairness reroll eklendi
- Run #5: spawn delay tuning ile erken olumler azaltildi
- Run #9: obstacle speed curve tuning ile deterministic survival baseline `22.3s / 5.0s / 8%` seviyesine cekildi
- Run #10-15: session telemetry, validation export ve deterministic export guard katmani olusturuldu
- Run #17-21: browser validation smoke/preflight/readiness komutlari eklendi ve runtime-scoped blocker dili netlestirildi
