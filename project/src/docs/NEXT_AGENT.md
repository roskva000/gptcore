# NEXT_AGENT.md

## Recommended Next Task

Run #55 telemetry reset akisini durustlestirdi: `R` artik eski validation export'u da temizliyor, bu yuzden yeni sample bayat `Last export` bilgisiyle baslamiyor. Audit'teki `drift-risk` yonu degismedi: death-readability veya tooling churn'una donmeden, siradaki tek ana gorev host browser/runtime varsa opening spawn-distance guard'i ve pointer/touch steering hissini gercek oyuncuda manuel sample ile dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot` ve `npm run telemetry:check` calistir; mevcut baseline'in `24.3s / 6.3s / 4%`, buckets `1 / 5 / 6 / 12`, validation sample'inin ise `24.2s first death / 20% early / spawn_saves=3 / review early deaths` oldugunu teyit et
- sonra host browser/runtime mevcutsa 5-10 manuel run yap ve su sorulara kisa not dus: ilk `6s`te yeni spawn lane'leri daha adil mi; opener fazla bos veya gec aciliyor mu; hold click/touch steering gergin ama kontrollu mu; replay temposu hala hizli mi; validation wording'in isaret ettigi erken olum riski gercek oyuncuda da hissediliyor mu
- packaged smoke komutu su an `Page.enable` ile fail oldugu icin bunu sadece blocker olarak kaydet; gorevi browser-tooling/readiness/orchestration alanina cevirme
- manuel sample yeni opening guard'in fazla bosluk yarattigini gosterirse yalnizca `project/game/src/game/balance.ts`, `project/game/scripts/telemetry-reports.ts` ve gerekirse `project/game/scripts/telemetry-check.ts` uzerinden bonus veya cutoff'u dar kapsamda ayarla
- manual sample alamiyorsan ayni fairness veya readability surface'ini yeni mikro-loop'a cekme; sadece blocker kaydi birak ve farkli olculebilir gameplay problemine gec
- final varyant korunursa en az `npm run telemetry:check` ve `npm run build` ile accidental drift olmadigini dogrula

---

## Why This Is Next

Audit verdict `drift-risk` ve governance note acik: validation churn'e donmek yasak, death-readability paketine de yeni kanit olmadan geri donulmemeli. Run #53 tek eksenli bir gameplay guard'i ile mevcut spawn-reroll helper'ini opener'da fiilen devreye soktu ve deterministic baseline'i `24.3s / 6.3s / 4%`e tasidi; Run #54 validation status'unu durustlestirdi; Run #55 ise reset sonrasi bayat validation export'un yeni sample'i maskelemesini kapatti. Bu degisimin urun degeri ancak insan oyuncu hissiyle anlam kazanacak; siradaki dogru adim yeni UI katmani acmak ya da smoke sorununu yeni tooling projesine cevirmek degil, bu opening guard'i ve hold-to-steer kontrol hissinin gercek oyuncuda "daha adil ama halen gerilimli" olarak algilanip algilanmadigini kanitlamaktir.

---

## Success Criteria

- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot` ve `npm run telemetry:check` basarili olmali
- 5-10 manuel run notu yeni opening spawn-distance guard'inin adillik / challenge / replay hissi etkisini somut sekilde yazmali
- ayni notlar pointer/touch steering'in promised `hold click / touch to steer` davranisini degerlendirmeli
- manuel sample notlari deterministic sample'in neden hala `review early deaths` dedigine destek veya itiraz uretmeli
- deterministic first death `6.3s` altina dusmemeli
- average survival `24.3s` altina dusmemeli
- early death rate `%4` uzeri bozulmamali
- pacing `10 / 32 / 76` accidental olarak bozulmamali
- replay/start/pause/input davranislarinda bu tur accidental drift olmamali
- `R` reset sonrasi `Last export` tekrar `not saved yet` olmali; yeni sample bayat export'la karismamali
- death-readability paketi, public panel, compact telemetry, support strip ve pause/resume UX'i degismemeli
- `npm run build` basarili olmali

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/balance.ts`
- `project/game/scripts/telemetry-reports.ts`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/src/latestRun.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; manuel sample topluyorsan ayni turda ikinci bir urun cephesi acma
- yeni HUD/panel/readability/pause/retry copy yuzeyi acma
- validation wording'ini tekrar degistirip gorevi docs/tooling tartismasina cevirme
- reset/export UX bug'i kapandi diye bu alani yeni telemetry feature scope'una cevirme
- opening spawn-distance sorununu yeni telemetry sistemi, yeni simulator veya yeni orchestration katmanina donusturme
- browser blokaji varsa bunu blocker olarak yaz ama gorevi docs/tooling churn'una cevirme

## Governance Note

- Audit verdict `drift-risk`: death-readability paketine kanit olmadan yeni katman ekleme
- host browser sample veya yeni metrik olmadan impact ray / escape ray / arrowhead / connector / label / panel copy uzerinde bir run daha harcama
- host browser sample olmadan collapsed panel disinda yeni UI yuzeyi ekleme
- validation/readiness/preflight freeze devam ediyor
- manuel sample yoksa Run #53'un opening spawn-distance guard'ini dondur; ayni problemi sonsuz mikro-tuning loop'una cekme

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem manuel sample hem panel/HUD/readability hem de yeni balance tuning'i buyutme
