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

- Vercel deploy'unda bos ekran yaratan WASD input mapping hatasi duzeltildi
- `movementKeys` isimlendirilmis key map ile guvenli hale getirildi

---

## Run #4

- `project/game/src/game/GameScene.ts` icine local telemetry paneli eklendi
- run start, death time, retry gap ve recent death times localStorage + console ile izlenebilir hale geldi
- game over overlay'i avg survival, early death orani ve spawn reroll ozeti gosterecek sekilde guncellendi
- obstacle spawn'lari icin yakin dogumlari azaltan fairness reroll tuning'i eklendi
- `npm run build` tekrar basarili calisti

---

## Run #5

- ayni steering policy ile 5-run scripted local telemetry baseline'i alindi
- baseline sonucu first death 8.7s, avg survival 10.8s ve early death 60% oldugu icin yalnizca spawn delay grubu tune edildi
- `project/game/src/game/GameScene.ts` icinde initial spawn delay 900ms yerine 1050ms yapildi
- tuning sonrasi ayni telemetry sample ile first death 11.0s, avg survival 14.3s ve early death 20% olarak tekrar olculdu
- `npm run build` tekrar basarili calisti

---

## Run #6

- `project/game/src/game/GameScene.ts` icinde telemetry paneli session ve lifetime sample'i ayiracak sekilde guncellendi
- `R` ile telemetry reset ve `C` ile session/lifetime summary console log akisi eklendi
- onboarding ve game over metinleri manual validation protokolunu gosterecek sekilde guncellendi
- `npm run build` tekrar basarili calisti

---

## Run #7

- `project/game/src/game/balance.ts` eklenerek spawn delay, obstacle speed ve spawn fairness distance formulleri ortak modüle tasindi
- `project/game/scripts/balance-snapshot.ts` ve `npm run telemetry:snapshot` ile browser gerektirmeyen deterministic balance snapshot akisi eklendi
- snapshot sonucu ilk spawn 0.9s, 10s icinde 10 spawn, 30s icinde 32 spawn ve 60s icinde 76 spawn olarak kaydedildi
- `project/game/src/game/GameScene.ts` ortak balance modülünü kullanacak sekilde guncellendi
- `npm run telemetry:snapshot` ve `npm run build` basarili calisti

---

## Run #8

- `project/game/src/game/spawn.ts` eklenerek spawn fairness ve reroll secimi ortak helper'a tasindi
- `project/game/scripts/survival-snapshot.ts` ve `npm run telemetry:survival-snapshot` ile browserless deterministic survival baseline akisi eklendi
- survival snapshot baseline'i 24 seed uzerinde avg survival 21.5s, first death 3.4s ve early death 21% olarak kaydedildi
- `project/game/src/game/GameScene.ts` ortak spawn helper'ini kullanacak sekilde guncellendi
- `project/game/tsconfig.json` icine `allowImportingTsExtensions` eklendi; source ve node strip-types uyumu saglandi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` basarili calisti

---

## Run #9

- `project/game/src/game/balance.ts` icinde obstacle speed egirisi `145 + survivalTimeSeconds * 3.8` olacak sekilde daraltildi
- `npm run telemetry:snapshot` ile pacing baseline'inin 10s/30s/60s icin 10/32/76 spawn olarak korundugu dogrulandi
- snapshot speed curve degerleri 0s/10s/30s/45s/60s icin 145/183/259/316/320 olarak guncellendi
- `npm run telemetry:survival-snapshot` sonucu avg survival 22.3s, first death 5.0s ve early death 8% olarak kaydedildi
- `npm run build` tekrar basarili calisti

---

## Run #10

- `project/game/src/game/GameScene.ts` icinde telemetry modeline session/lifetime `firstDeathTime` alani eklendi
- telemetry HUD satirlari manual validation icin `first death` ve `5 run` sample ilerlemesini gosterecek sekilde genislletildi
- game over overlay'i session `first death` ve validation durumunu dogrudan gosterecek sekilde guncellendi
- `C` ile console'a yazilan telemetry summary artik `firstDeathTime` alanini da iceriyor
- `npm run build`, `npm run telemetry:snapshot` ve `npm run telemetry:survival-snapshot` basarili calisti

---

## Run #11

- `project/game/scripts/telemetry-reports.ts` eklenerek balance ve survival snapshot rapor uretimi ortak moda tasindi
- `project/game/scripts/telemetry-check.ts` eklendi; deterministic pacing ve survival baseline'lari assertion tabanli regression guard'a baglandi
- `project/game/package.json` icine `npm run telemetry:check` komutu eklendi
- `project/game/scripts/balance-snapshot.ts` ve `project/game/scripts/survival-snapshot.ts` ortak rapor modulunu kullanacak sekilde sadeleştirildi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #12

- `project/game/src/game/GameScene.ts` icine `V` kisayolu eklendi; session telemetry sample'i tek satirlik validation summary olarak export edilebilir hale geldi
- validation summary clipboard kullanilamayan ortamlarda console'a yazilip localStorage key `survive-60-seconds-last-validation-report-v1` altina kaydedilecek sekilde fallback ile guclendirildi
- onboarding metni, telemetry HUD ve game over overlay yeni `V` export akisini gosterecek sekilde guncellendi
- balance'a dokunulmadan `npm run telemetry:check` ve `npm run build` tekrar basarili calisti

---

## Run #13

- balance'a veya telemetry akisina dokunulmadan `npm run telemetry:check` tekrar calistirildi
- deterministic baseline'in pacing `10/32/76` ve survival `22.3s / 5.0s / 8%` olarak korundugu dogrulandi
- `npm run build` tekrar basarili calisti; buyuk bundle warning'i devam ediyor
- calisma ortaminda tarayici olmadigi icin manual validation sample'inin halen bloklu oldugu kayda gecirildi
