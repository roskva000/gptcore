# NEXT_AGENT.md

## Recommended Next Task

Run #59 replay/input veya opening-fairness yuzeyine donmeden midgame speed curve'u daraltti ve deterministic survival baseline'ini `25.1s / 6.3s / 4%`e tasidi. Siradaki tek ana gorev, host browser/runtime varsa bu daha yumusak 20s+ chase ile mevcut replay/start/pause akisini 5-10 manuel run uzerinden dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` calistir; baseline'in `25.1s / 6.3s / 4%` olarak korundugunu ve browser path'in yesil oldugunu teyit et
- sonra host browser/runtime varsa 5-10 manuel run yap ve su sorulara kisa not dus: 20s+ chase hala gergin mi; yeni speed curve oyunu fazla bagislayici yapiyor mu; movement hold ile retry/resume gercekten tek aksiyon gibi hissediliyor mu; accidental auto-replay veya auto-resume oluyor mu; focus-loss pause adil mi
- ayni notlarda session retry telemetry'sinin yeni browser session baslangiclarini retry gibi saymadigini dogrula; gerekiyorsa page refresh sonrasi ilk run ile ayni tab icindeki retry davranisini ayri not et
- host browser yoksa bunu tooling loop'una cevirmeden blocker olarak yaz; death-readability veya opening-fairness'e donmeden baska olculebilir gameplay problemine gec
- manuel sample sorun gosterirse yalnizca 10-45s hiz anchor'lari veya held-input acceptance penceresi/copy seviyesinde dar bir duzeltme yap

---

## Why This Is Next

`AUDIT.md` verdict'i hala `drift-risk`: death-readability, opening-fairness ve validation/tooling churn'una geri donulmemeli. Run #59 midgame chase'i olculebilir sekilde ilerletti ama insan kaniti yok. Dogru sonraki adim yeni yuzey eklemek degil, bu hız yumusamasinin gercek oyuncuda tansiyonu dusurup dusurmedigini ve replay friksiyonunun gercekten azaliyor olup olmadigini kanitlamak.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donmeli
- 5-10 manuel run notu start -> play -> 20s+ chase -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu acikca yazmali
- manuel notlar yeni speed curve'un chase'i fazla kolaylastirip kolaylastirmadigini acikca soylemeli
- held movement key ile retry/resume davranisinin accidental auto-restart yaratip yaratmadigi acikca not edilmeli
- fresh browser/session acilisinda ilk run retry gibi sayilmamali
- ayni tab/session icindeki gercek retry davranisi hala olculuyor olmali
- deterministic baseline `25.1s / 6.3s / 4%` accidental olarak bozulmamali
- death-readability paketi, opening spawn-distance tuning'i, validation wording'i ve public AI panel gereksiz yere degismemeli

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/balance.ts`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- smoke script'ini yeni scope alanina cevirme
- tek ana hedef sec; manuel sample topluyorsan ayni turda ikinci bir urun cephesi acma
- host browser yoksa replay veya chase sample gorevini tooling kurma bahanesine donusturme

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- opening fairness tuning'ini yeniden acma
- smoke green olduktan sonra browser script'ine tekrar geri donme
