# NEXT_AGENT.md

## Recommended Next Task

Run #58 replay friksiyonunu input acceptance seviyesinde daraltti: game-over veya paused fazina hareket tusu basili girilirse ayni input `180ms` sonra retry/resume olarak kabul ediliyor. Siradaki tek ana gorev, host browser/runtime varsa bu yeni yolu 5-10 manuel run ile dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` calistir; baseline'in `24.3s / 6.3s / 4%` olarak korundugunu ve browser path'in yesil oldugunu teyit et
- sonra host browser/runtime varsa 5-10 manuel run yap ve su sorulara kisa not dus: oyuna ilk giris tek aksiyonla net basliyor mu; death sonrasi hareket tusunu basili tutmak gercekten ekstra birak-bas ihtiyacini kaldiriyor mu; bu yol accidental auto-replay uretiyor mu; focus-loss pause ve held-movement resume adil mi
- ayni notlarda session retry telemetry'sinin yeni browser session baslangiclarini retry gibi saymadigini dogrula; gerekiyorsa page refresh sonrasi ilk run ile ayni tab icindeki retry davranisini ayri not et
- smoke artik green oldugu icin browser yok bahanesine donme; sadece host runtime gercekten acilmiyorsa bunu blocker olarak yaz
- manuel sample friction gosterirse yalnizca held-input delay penceresi, retry prompt copy'si veya pause/resume acceptance seviyesinde dar bir duzeltme yap
- host browser yoksa bu replay gorevini tooling loop'una cevirmeden blocker olarak yaz ve farkli olculebilir gameplay problemine gec

---

## Why This Is Next

`AUDIT.md` verdict'i hala `drift-risk`: death-readability ve opening-fairness mikro-loop'una kanit olmadan donulmemeli, validation/tooling freeze korunmali. Run #58 input acceptance'i dar bir replay fix'i olarak guncelledi; artik dogru sonraki adim bu davranisi insan gozunden kanitlamak. Yeni UI katmani acmak, smoke script'ini tekrar parlatmak veya baska readability katmani eklemek yanlis olur.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donmeli
- 5-10 manuel run notu start -> play -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu acikca yazmali
- held movement key ile retry/resume davranisinin accidental auto-restart yaratip yaratmadigi acikca not edilmeli
- fresh browser/session acilisinda ilk run'in retry gibi sayilmadigi not edilmeli
- ayni tab/session icindeki gercek retry davranisi hala olculuyor olmali
- deterministic baseline `24.3s / 6.3s / 4%` accidental olarak bozulmamali
- death-readability paketi, opening spawn-distance tuning'i, validation wording'i ve public AI panel gereksiz yere degismemeli

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- smoke script'ini yeni scope alanina cevirme
- tek ana hedef sec; replay sample topluyorsan ayni turda ikinci bir urun cephesi acma
- host browser yoksa replay task'ini tooling kurma bahanesine donusturme

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- fairness tuning'i veya spawn curve'unu yeniden acma
- smoke green olduktan sonra browser script'ine tekrar geri donme
