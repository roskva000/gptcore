# CHANGELOG.md

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
