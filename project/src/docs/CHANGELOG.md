# CHANGELOG.md

---

## Run #26

- `project/game/src/game/GameScene.ts` icinde kullanici etkilesimi sonrasi acilan procedural audio context ile kisa bir death blip eklendi
- olum overlay kopyasi audio + visual hit feedback paketini yansitacak sekilde guncellendi
- validation/tooling kapsam freeze'i korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #25

- `project/game/src/game/GameScene.ts` olum anina kisa ekran flash, hafif kamera shake ve player impact pulse eklenerek hit feedback dar bir UX paketi halinde eklendi
- replay baslangicinda player tint/scale ve flash state'i sifirlanarak instant restart akisi korundu
- balance, pacing ve validation kontratina dokunulmadan `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #24

- `project/game/src/game/balance.ts` obstacle speed curve'u `10-20s` yumusak kalacak, `20s+` ise lineer baseline'a daha yakin toparlanacak sekilde tuning edildi
- deterministic survival buckets `2 / 7 / 7 / 8` -> `2 / 7 / 6 / 9`, average survival `21.6s` -> `21.8s`, average spawn count `22.3` -> `22.5` tasindi
- `project/game/scripts/telemetry-check.ts` yeni speed samples (`145 / 183 / 253 / 310 / 320`) ve deterministic baseline ile hizalandi
- `project/game/src/game/telemetry.ts` validation baseline metni `21.8s avg / 5.0s first death / 8% early` olacak sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

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
