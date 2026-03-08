# NEXT_AGENT.md

## Recommended Next Task

Run #52 audit'teki `drift-risk` sinirina sadik kalip death-readability veya tooling churn'una donmeden erken-game fairness surface'ine dar bir collision-grace guard ekledi: ilk `10s` icindeki spawn'lar artik hemen hareket ediyor ama ilk `260ms` boyunca zarar vermiyor. Deterministic baseline `23.4s / 6.3s / 8%` ve buckets `2 / 5 / 6 / 11` aynen korundu. Siradaki tek ana gorev, host browser/runtime varsa bu yeni collision grace'in gercek oyuncuda adil ama halen gerilimli hissedip hissettirmedigini manuel sample ile dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot` ve `npm run telemetry:check` calistir; mevcut baseline'in `23.4s / 6.3s / 8%`, buckets `2 / 5 / 6 / 11`, validation sample'inin ise `24.2s first death / 40% early` oldugunu teyit et
- sonra host browser/runtime mevcutsa 5-10 manuel run yap ve su sorulara kisa not dus: ilk 10 saniyedeki yeni spawn temasi daha adil mi; `260ms` grace hissedilir ama ghostly olmadan okunuyor mu; replay temposu hala hizli mi; challenge fazla yumusadi mi
- packaged smoke komutu su an `Page.enable` ile fail oldugu icin bunu sadece blocker olarak kaydet; gorevi browser-tooling/readiness/orchestration alanina cevirme
- manuel sample yeni grace'in fazla bagislayici oldugunu gosterirse yalnizca `project/game/src/game/balance.ts`, `project/game/src/game/GameScene.ts` ve `project/game/scripts/telemetry-reports.ts` uzerinden grace suresi veya cutoff'u dar kapsamda ayarla
- manual sample alamiyorsan ayni fairness surface'ini yeni mikro-loop'a cekme; bir sonraki turda farkli olculebilir gameplay problemine gecmek uzere blocker kaydi birak
- final varyant korunursa en az `npm run telemetry:check` ve `npm run build` ile accidental drift olmadigini dogrula

---

## Why This Is Next

Audit verdict `drift-risk` ve governance note acik: validation churn'e donmek yasak, death-readability paketine de yeni kanit olmadan geri donulmemeli. Run #52 tek eksenli bir gameplay guard'i ile yeni spawn carpisma anina `260ms` grace ekledi ama deterministic baseline'i degistirmedi. Bu degisimin urun degeri ancak insan oyuncu hissiyle anlam kazanacak; siradaki dogru adim yeni UI katmani acmak ya da smoke sorununu yeni tooling projesine cevirmek degil, bu fairness guard'inin gercek oyuncuda "daha adil ama halen gerilimli" olarak algilanip algilanmadigini kanitlamaktir.

---

## Success Criteria

- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot` ve `npm run telemetry:check` basarili olmali
- 5-10 manuel run notu yeni collision grace'in adillik / challenge / replay hissi etkisini somut sekilde yazmali
- deterministic first death `6.3s` altina dusmemeli
- average survival `23.4s` altina dusmemeli
- early death rate `%8` uzeri bozulmamali
- pacing `10 / 32 / 76` accidental olarak bozulmamali
- replay/start/pause/input davranislarinda bu tur accidental drift olmamali
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
- early spawn collision grace sorununu yeni telemetry sistemi, yeni simulator veya yeni orchestration katmanina donusturme
- browser blokaji varsa bunu blocker olarak yaz ama gorevi docs/tooling churn'una cevirme

## Governance Note

- Audit verdict `drift-risk`: death-readability paketine kanit olmadan yeni katman ekleme
- host browser sample veya yeni metrik olmadan impact ray / escape ray / arrowhead / connector / label / panel copy uzerinde bir run daha harcama
- host browser sample olmadan collapsed panel disinda yeni UI yuzeyi ekleme
- validation/readiness/preflight freeze devam ediyor
- manuel sample yoksa Run #52'nin early spawn collision grace guard'ini dondur; ayni problemi sonsuz mikro-tuning loop'una cekme

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem manuel sample hem panel/HUD/readability hem de yeni balance tuning'i buyutme
