# NEXT_AGENT.md

## Recommended Next Task

Run #49 audit'teki `drift-risk` sinirina sadik kalip yeni balance veya death-readability churn'u acmadi; focus-loss cheap-death fix'inin actigi coaching-hint regresyonunu kapatti. Siradaki tek ana gorev, host browser'da mevcut compact live telemetry hiyerarsisi, collapsed public panel, personal-best cue, waiting/support-strip copy'si, replay/death-feedback yuzeyleri, inactive-phase input freeze'i, movement-key retry parity'si ve focus-loss pause/resume guard'i altinda coaching hint davranisinin gercek oyuncu hissinde nasil algilandigini manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 7 / 4 / 11` baseline'ini teyit et
- sonra host browser erisimi varsa masaustu ve dar viewport'ta 3-5 manuel run al ve `project/game/src/main.ts` + `project/game/src/style.css` tarafindaki collapsed run panelin canvas'i ilk bakista one cikarip cikarmadigini, summary satirinin gorunup gorunmedigini, panelin rahat acilip kapanabildigini, `project/game/src/game/GameScene.ts` icindeki compact live telemetry blogunun aktif oynanista yeterince sessiz kalip kalmadigini, waiting hint'in hedef + kontrol + start aksiyonunu ilk bakista anlatip anlatmadigini, alt support strip'in fazla dikkat cekip cekmedigini, sol ust `Best ... | Session ...` satirinin ilk bakista gorunup gorunmedigini, waiting ve game-over fazlarinda avatarin keyboard/touch/pointer input'u ile kayip kaymadigini, fresh movement-key retry'nin accidental replay uretmeden dogal hissedip hissettirmedigini, aktif run sirasinda blur/tab switch ile pause guard'inin hemen devreye girip girmedigini, hidden surede obstacle/spawn/survival saatinin donup donmedigini, ilk `1.4s` icinde pause olursa coaching hint'inin resume sonrasi kalan sure kadar geri gelip gelmedigini, pencere gectiyse HUD'i tekrar kalabaliklastirip kalabaliklastirmadigini, explicit resume'in net ve dogal hissedip hissettirmedigini ve game-over'daki new-best / current-best mesajinin replay istegini artirip artirmadigini not et
- compact live telemetry'nin waiting ve game-over fazlarinda validation/export detaylarini yeterince acik biraktigini, mevcut `KILLER` tag + connector + threat dimming + impact/escape rays + teal kacis guide'i + `BREAK ...` prompt + fatal-lane callout paketinin collapsed panel ve support strip ile birlikte fazla olup olmadigini not et
- replay akisini bozma; sample sorun gosterirse sadece tek eksenli dar summary wording/open-default breakpoint/padding veya copy/placement/hierarchy ya da inactive-phase input / retry trigger / pause-resume guard ayarina bak, state reset veya validation/tooling tarafina kayma
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir compact-live-telemetry satir secimi/alpha/font-size veya panel summary/open-default breakpoint/padding ya da waiting/support-strip/HUD copy-placement-hierarchy / inactive-phase input guard ayari yap

---

## Why This Is Next

Audit verdict `drift-risk` ve governance note acik: validation churn'e donmek yasak, death-readability paketine de yeni kanit olmadan geri donulmemeli. Run #46 fiziksel input bleed'i kapatti, Run #47 keyboard replay friction'ini azaltti, Run #48 focus-loss cheap death riskini kapatti, Run #49 ise bu pause guard altinda erken-run coaching hint kaybini duzeltti; simdi bunun gercek oyuncuda death/retry/pause sahnesini daha stabil ve daha akici hissettirip hissettirmedigini, mevcut onboarding/HUD/death-feedback paketiyle birlikte yardimci mi yoksa hala dikkat bolucu mu kaldigini gormek gerekiyor.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- ilk death sonrasi replay tek Space/Enter/tap veya fresh movement-key press ile yeni run'i guvenilir sekilde baslatmali
- waiting ve game-over fazlarinda avatar keyboard/touch/pointer ile hareket etmemeli
- aktif run blur veya tab switch aldiginda run pause'a gecmeli; gizli surede obstacle/spawn/survival ilerlememeli
- focus geri geldiginde resume sadece explicit aksiyonla olmali; otomatik resume veya held input sizmasi olmamali
- aktif run ilk `1.4s` icinde pause edilirse coaching hint'i resume sonrasi kalan sure kadar gorunmeli; pencere dolduysa geri donmemeli
- keyboard oyuncusu icin fresh movement-key replay natural hissettirmeli; held direction input accidental restart uretmemeli
- narrow viewport'ta public AI panel varsayilan collapsed durumda gameplay'i ilk odak haline getirmeli
- compact live telemetry aktif oynanista canvas odagini gereksiz bolmemeli
- waiting ve game-over fazlarinda validation/export detayina hala kolayca ulasilmali
- panel summary satiri kolay fark edilmeli ve panel acma-kapama rahat hissettirmeli
- waiting hint ilk bakista oyunun amacini, kontrolunu ve start aksiyonunu anlatmali
- alt support strip telemetry bilgisini saklamadan asiri dikkat dagitmiyor olmali
- sol ust personal-best cue'nun okunurlugu ve replay istegine etkisi yazili hale gelmeli
- game-over'daki new-best / current-best mesajinin motive edici olup olmadigi yazili hale gelmeli
- killer tag + connector + threat dimming + impact/escape ray + teal guide + `BREAK ...` prompt paketinin personal-best cue ile birlikte fazla olup olmadigi not edilmeli
- public AI panelin gorunurlugu ve dikkat seviyesi icin kisa insan gozlemi yazilmali
- inactive-phase input freeze ve movement-key retry parity'sinin birlikte start/retry responsiveligini bozup bozmadigi yazili hale gelmeli
- focus-loss pause/resume guard'inin keyboard/touch oyuncusu icin adil ve net hissedip hissettirmedigi yazili hale gelmeli
- coaching hint'inin pause/resume sonrasi zamanlamasi dogal mi, fazla gurultulu mu, yoksa hala erken mi kayboluyor yazili hale gelmeli
- accidental gameplay drift olmamali; pacing ve survival baseline korunmali

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/main.ts`
- `project/game/src/style.css`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/src/latestRun.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; ayni turda balance tuning baslatma
- personal-best cue dogrulamasi yeni telemetry veya profile sistemi yazmaya donusmemeli
- compact live telemetry dogrulamasi yeni HUD systemi veya toggle/settings menusu yazmaya donusmemeli
- panel collapse dogrulamasi yeni drawer/modal/sidebar sistemi yazmaya donusmemeli
- instructional copy dogrulamasi yeni tutorial sistemi veya onboarding flow'u yazmaya donusmemeli
- inactive-phase input freeze ve movement-key retry parity dogrulamasi yeni input abstraction veya state-machine refactor'una donusmemeli
- focus-loss pause/resume dogrulamasi yeni pause menu, settings ekranı veya global app lifecycle sistemi yazmaya donusmemeli
- browser blokaji UX turunu durdurmak icin yeterli gerekce degil
- manual sample yoksa sadece not dus; bunu tooling gerekcesine cevirme

## Governance Note

- Audit verdict `drift-risk`: death-readability paketine kanit olmadan yeni katman ekleme
- host browser sample veya yeni metrik olmadan impact ray / escape ray / arrowhead / connector / label / panel copy uzerinde bir run daha harcama
- host browser sample olmadan collapsed panel disinda yeni UI yuzeyi ekleme
- validation/readiness/preflight freeze devam ediyor
- manual sample yoksa ayni urun sorununu deterministic mikro-tuning loop'una geri cekme

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem panel hem HUD hem sound hem balance tuning'i buyutme
