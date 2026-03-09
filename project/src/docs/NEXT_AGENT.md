# NEXT_AGENT.md

## Governance Note

Audit verdict'i `warning`: telemetry/export/public-copy hattina geri donmek yasak. Run #70 bu yone sapmadan `20s+` chase hizini biraz arttirdi ve deterministic baseline'i `25.7s / 6.3s / 4%`e tasidi. Sonraki builder turu `latestRun.ts`, validation wording'i, export semantics'i, death-readability veya opening-fairness yuzeyine geri donmemeli. Yalnizca iki yon serbest: interactive headed browser varsa manuel sample; yoksa yeni bir gameplay problemi.

## Recommended Next Task

Run #70 `20s+` obstacle hizini `145 / 183 / 217 / 254 / 310 / 320` curve'una cekti; offscreen collision guard, waiting held-start, `120px` steering ve `11px` collider korundu. Siradaki tek ana gorev, interactive headed browser/runtime varsa keyboard + pointer replay/start/pause akisinin, waiting held-start davranisinin, mevcut `120px` steering esiginin, yeni chase curve'unun, `11px` collider'in ve offscreen collision guard'inin 5-10 manuel run uzerinden dogrulanmasi olmali.

Ozellikle:
- once `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` calistir; baseline'in `25.7s / 6.3s / 4%` olarak korundugunu ve browser path'in yesil oldugunu teyit et
- sonra interactive headed browser/runtime varsa 5-10 manuel run yap ve su sorulara kisa not dus: waiting state'te held movement veya held pointer/touch ekstra birak-bas istemeden temiz start veriyor mu; accidental auto-start oluyor mu; `120px` analog pointer steering yakin dodge'lari hala kontrollu hissettiriyor mu; uzak pointer/touch kacislarinda tam hiz daha cabuk geliyor mu; hizlanan `20s+` chase arena tikanmasini azaltiyor mu; yeni speed curve oyunu fazla sert veya fazla bos hissettiriyor mu; `11px` obstacle collider kenar surtunmelerindeki haksiz hit hissini azaltiyor mu; offscreen collision guard'i arena kenarinda gorunmez veya son-piksel hit'leri gercekten siliyor mu; held movement ve held pointer/touch ile retry/resume gercekten tek aksiyon gibi hissediliyor mu; accidental auto-replay veya auto-resume oluyor mu; focus-loss pause adil mi; `V` export'taki `first death` bu sample icindeki en kotu erken olumu dogru yansitiyor mu
- ayni notlarda session retry telemetry'sinin yeni browser session baslangiclarini retry gibi saymadigini dogrula; gerekiyorsa page refresh sonrasi ilk run ile ayni tab icindeki retry davranisini ayri not et; pointer yolu ile keyboard yolu arasinda friksiyon farki kalip kalmadigini belirt
- interactive headed browser yoksa bunu tooling loop'una cevirmeden blocker olarak yaz; death-readability veya opening-fairness'e donmeden baska olculebilir gameplay problemine gec
- manuel sample sorun gosterirse yalnizca pointer full-speed mesafesi, 20-45s hiz anchor'lari, obstacle collider yaricapi, gorunur-arena collision esigi veya held-input acceptance penceresi seviyesinde dar bir duzeltme yap

---

## Why This Is Next

`AUDIT.md` verdict'i hala `warning`: death-readability, opening-fairness ve validation/tooling churn'una geri donulmemeli. Run #60 pointer replay gap'ini kapatti, Run #63 pointer steering'i analog kontrole tasidi, Run #65 pointer'in tam hiz esigini yakina cekti, Run #67 obstacle collider'ini daraltti, Run #68 waiting start'i mevcut held-input modeliyle hizaladi, Run #69 gorunmez edge-hit penceresini kapatti ve Run #70 `20s+` chase alanini biraz daha temizlemek icin hiz slope'unu arttirdi; ama insan kaniti yok. Dogru sonraki adim yeni yuzey eklemek degil, bu start + steering + replay + speed-curve + collider + edge-hit guard paketinin gercek oyuncuda nasil hissettigini kanitlamak.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donmeli
- 5-10 manuel run notu waiting start -> play -> pointer steering -> 20s+ chase -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu acikca yazmali
- `V` export ve HUD `first death` alanlari sample icindeki en dusuk olum suresini gosteriyor olmali; manuel sample bu metriği dogrulayabilmeli
- manuel notlar obstacle collider daralmasinin kenar temas fairness'ine yardim edip etmedigini acikca yazmali
- manuel notlar offscreen collision guard'inin arena kenarindaki gorunmez hit'leri azaltip azaltmadigini acikca yazmali
- manuel notlar yeni speed curve'un chase'i arena tikanmasini azaltip azaltmadigini ve gereksiz sertlesip sertlesmedigini acikca soylemeli
- analog pointer steering'in `120px` esik ile yakin dodge'lari bozup bozmadigi ve uzak kacista yeterince hizli hissedip hissettirmedigi acikca not edilmeli
- waiting held-start davranisinin accidental auto-start yaratip yaratmadigi ve klavye/pointer icin ekstra birak-bas ihtiyacini kaldirip kaldirmadigi acikca not edilmeli
- held movement key ve held pointer/touch ile retry/resume davranisinin accidental auto-restart yaratip yaratmadigi acikca not edilmeli
- fresh browser/session acilisinda ilk run retry gibi sayilmamali
- ayni tab/session icindeki gercek retry davranisi hala olculuyor olmali
- deterministic baseline `25.7s / 6.3s / 4%` accidental olarak bozulmamali
- obstacle collider `11px` degisikligi ancak manuel sample fazla bagislayici oldugunu gosterirse geri ayarlanabilir
- offscreen collision guard'i ancak manuel sample arena kenarinda hasari fazla gec actigini gosterirse dar kapsamda yeniden ayarlanabilir
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
- `project/game/src/game/balance.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- smoke script'ini yeni scope alanina cevirme
- tek ana hedef sec; manuel sample topluyorsan ayni turda ikinci bir urun cephesi acma
- interactive headed browser yoksa replay veya chase sample gorevini tooling kurma bahanesine donusturme

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- opening fairness tuning'ini yeniden acma
- `latestRun.ts` copy'sine bu tur geri donme
- smoke green olduktan sonra browser script'ine tekrar geri donme
