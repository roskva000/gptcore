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

---

## Run #14

- `project/game/src/game/GameScene.ts` icinde son `V` validation export'u localStorage'dan okunup telemetry HUD ve game over overlay'e `Last export` ozeti olarak eklendi
- `V` sonrasi hint metni artik son kaydedilen export ozetini de gosterecek sekilde guncellendi
- balance'a dokunulmadan `npm run telemetry:check` tekrar temiz gecirildi
- `npm run build` tekrar basarili calisti; buyuk bundle warning'i devam ediyor

---

## Run #15

- `project/game/src/game/telemetry.ts` eklenerek telemetry hesaplari ile validation export builder/parser'i ortak modüle tasindi
- `project/game/src/game/GameScene.ts` validation export, summary parse ve telemetry hesaplari icin bu ortak helper'i kullanacak sekilde sadeleştirildi
- `project/game/scripts/validation-snapshot.ts` ve `npm run telemetry:validation-snapshot` eklendi; deterministic 5-run sample ile `validation_sample` kontrati browser disinda uretilebilir hale geldi
- validation export parser'inin `validation` alanindaki `|` ayirici yuzunden durumu truncation ile kaybetmesi, export'ta safe separator kullanilarak duzeltildi
- `project/game/scripts/telemetry-check.ts` deterministic validation export summary ve full report string'ini assert edecek sekilde genisletildi
- balance'a dokunulmadan `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti; buyuk bundle warning'i devam ediyor

---

## Run #16

- balance'a dokunulmadan `npm run telemetry:check` tekrar calistirildi ve deterministic baseline'in pacing `10/32/76`, survival `22.3s / 5.0s / 8%` ve validation summary `5 runs | first death 30.0s | early 20% | 5/5 runs, target met` olarak korundugu dogrulandi
- `npm run telemetry:validation-snapshot` tekrar calistirildi; validation export kontrati ve parse edilen summary baseline ile uyumlu kaldi
- `npm run build` tekrar basarili calisti; buyuk bundle warning'i devam ediyor
- ortamda `/usr/bin/chromium` binary'si goruldu, ancak bu turda interaktif manual telemetry sample'i yine alinmadigi icin blokaj dokumanlarda bu sekilde netlestirildi

---

## Run #17

- `project/game/scripts/browser-validation-smoke.ts` eklendi; gercek Chromium validation akisina gitmeden once loopback socket preflight'i yapan repo-ici browser smoke harness olusturuldu
- `project/game/package.json` icine `npm run telemetry:browser-validation-smoke` komutu eklendi
- balance'a dokunulmadan `npm run telemetry:check`, `npm run telemetry:validation-snapshot` ve `npm run build` tekrar basarili calisti
- `npm run telemetry:browser-validation-smoke` mevcut sandbox'ta hizli sekilde `listen EPERM 127.0.0.1` blokajini raporlayacak hale getirildi; hanging davranisi kaldirildi

---

## Run #18

- `project/game/scripts/browser-validation-support.ts` eklenerek browser validation icin ortak preflight helper'i olusturuldu
- `project/game/scripts/browser-validation-preflight.ts` ve `npm run telemetry:browser-preflight` eklendi; chromium binary, `dist` hazirligi ve loopback socket durumu tek JSON cikti ile raporlanir hale geldi
- `project/game/scripts/browser-validation-smoke.ts` yeni preflight helper'ini kullanacak sekilde guncellendi; blokajlar artik smoke baslamadan once toplu hata olarak raporlaniyor
- `npm run telemetry:browser-preflight` mevcut sandbox'ta `status: blocked` sonucu ile loopback `EPERM` blokajini tekrar netlestirdi
- balance'a dokunulmadan `npm run telemetry:check`, `npm run telemetry:validation-snapshot` ve `npm run build` tekrar basarili calisti

---

## Run #19

- `project/game/scripts/browser-validation-ready.ts` eklendi; deterministic guard, validation snapshot ve browser preflight sonucunu tek JSON raporda toplayan orchestration komutu olusturuldu
- `project/game/package.json` icine `npm run telemetry:validation-ready` komutu eklendi
- yeni komut `--with-smoke` argumani ile socket izinli ortamda smoke adimina ayni entry point uzerinden ilerleyebilecek sekilde tasarlandi
- `npm run telemetry:validation-ready` bu sandbox'ta guard'lari temiz gecip `status: blocked` sonucu ile loopback `EPERM` blokajini tekrar netlestirdi
- `npm run build` tekrar basarili calisti; buyuk bundle warning'i devam ediyor

---

## Run #20

- `project/game/scripts/browser-validation-support.ts` loopback hata dilini `current agent runtime` seviyesine daraltti; `socketProbeHost` ve `socketProbeCommand` alanlari JSON ciktiya eklendi
- `project/game/scripts/browser-validation-ready.ts` `nextAction` metni host shell probe'unu ilk adim yapacak sekilde guncellendi
- `npm run telemetry:browser-preflight` ve `npm run telemetry:validation-ready` tekrar calistirildi; blocker host geneli gibi degil mevcut runtime'a ozgu olarak raporlandi
- `npm run telemetry:check` ve `npm run build` basarili calisti; buyuk bundle warning'i devam ediyor

---

## Run #21

- `project/game/scripts/browser-validation-support.ts` icine `blockerScope` ve yapilandirilmis `nextSteps` action-plan helper'lari eklendi
- `project/game/scripts/browser-validation-preflight.ts` ve `project/game/scripts/browser-validation-ready.ts` JSON ciktilarina `blockerScope` ve `nextSteps` alanlari eklendi
- `npm run telemetry:browser-preflight` tekrar calistirildi; mevcut agent runtime'ta `status: blocked` sonucu host shell probe -> readiness -> smoke -> manual sample sirasini artik acikca verdi
- `npm run telemetry:validation-ready` tekrar calistirildi; guard temiz kalirken ayni host-shell handoff adimlari JSON icinde listelendi
- `npm run telemetry:check` ve `npm run build` tekrar basarili calisti; buyuk bundle warning'i devam ediyor
