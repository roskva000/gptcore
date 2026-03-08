# STATE.md
Last Updated: 2026-03-08
Updated By: Agent Run #52

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #52 audit'teki `drift-risk` uyarisini izleyip death-readability mikro-loop'una ve validation freeze'ine donmeden tek bir gameplay fairness hedefi secti: ilk 10 saniyedeki yeni spawn carpisma anlarini daha adil hissettirmek icin dar bir collision-grace penceresi eklemek. Validation/tooling kapsam freeze'i korundu; smoke script'te cikan runtime hatasi sadece blocker olarak kaydedildi.

Bu turun ana hedefi:
- ilk `10s` icindeki yepyeni obstacle spawn'larinda "dogar dogmaz hit" hissini dar bir gameplay guard'i ile yumusatmak
- pacing `10 / 32 / 76`, speed curve, replay akisi ve mevcut death-feedback paketini bozmadan fairness'i iyilestirmek
- audit'in istedigi gibi death-readability ve validation/readiness/preflight tarafina sifir yeni alan eklemek

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> tek aksiyonla replay reset + yeni run akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 251 / 304 / 320`
- early fairness bias: ilk `10s` icindeki spawn'lar artik oyuncunun exact anlik pozisyonuna degil, hareket vektorunun `0.18s` gerisine aim ediyor
- early collision grace: ilk `10s` icindeki yeni obstacle'lar hemen hareket ediyor ama collider'lari ilk `260ms` boyunca zarar vermiyor; boylece yeni spawn lane'i keserken oyuncuya kisa bir reaksiyon penceresi birakiyor
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 23.4s / first death 6.3s / early death 8%`
- replay motivation: sol ust HUD artik lifetime best + session best gostermekte; game-over body ve stats blogu yeni record / mevcut hedef bilgisini yaziyor
- replay controls: waiting state'te oldugu gibi game-over fazinda da fresh movement-key press yeni run baslatabiliyor; Space/Enter/tap secenegi korunuyor. Edge-trigger guard'i sayesinde olum aninda basili kalan yon tusu otomatik replay sizmasi yaratmiyor
- focus-loss fairness: aktif run sirasinda `blur` veya `visibilitychange` gelirse oyun `paused` fazina geciyor; obstacle physics, spawn timer, hareket ve survival saati birlikte donuyor. Oyuncu oyuna dondugunde Space/Enter/tap veya fresh movement-key ile explicit resume gerekiyor
- instructional UX: waiting state artik amac + hareket + start aksiyonunu tek oyuncu-odakli blokta veriyor; telemetry hotkey'leri altta ayri support strip'ine tasindi. In-run hint daha kisa hedef odakli, game-over hint'i ise anlik retry aksiyonunu one aliyor. Focus-loss pause artik erken-run coaching hint'ini kalan aktif sure kadar geri getirebiliyor; pencere dolduysa resume HUD'i tekrar sessiz kaliyor
- live HUD hierarchy: sag ust telemetry blogu faza gore degisiyor; waiting ve game-over'da detayli metrics/export satirlari korunurken aktif oynanista sadece kisa session/first-death/early-death/validation ozeti gosteriliyor
- telemetry sample integrity: `R` reset artik sadece waiting ve game-over fazlarinda calisiyor; playing/paused sirasinda engellenerek mevcut run'in first-death ve retry sample'i sifira cekilip bozulmuyor
- inactive-phase input stability: oyuncu artik yalnizca `playing` fazinda hiz aliyor; waiting ve game-over ekranlarinda keyboard/pointer input'u death scene'i veya pre-run yerlesimini kaydirmiyor
- hit feedback: olum aninda flash, hafif kamera shake, player pulse, directional hit callout, fatal-lane callout, oyuncu merkezinde kucuk bosluk birakan arrowhead'li impact ray, lane marker label, killer obstacle icin ayri `KILLER` spotlight etiketi + kisa connector, oyuncu merkezinde kucuk bosluk birakan arrowhead'li teal kacis ray'i, `BREAK ...` marker'i ve kisa death blip aktif; killer obstacle spotlight'ta kalirken diger aktif threat'ler dimleniyor
- death summary: ana blok survival + cause tasiyor; buna ek olarak artik yeni best veya mevcut hedef bilgisi de yaziyor. `BREAK ...` prompt'u bir sonraki denemede hangi yone kirilman gerektigini soyluyor, yeni teal guide bunu sahne icinde de isaret ediyor, session/validation satirlari ayri stats blogunda kaliyor
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; desktop'ta varsayilan olarak acik, dar viewport'ta ise gameplay'i oncelemek icin collapse olmus summary karti olarak basliyor. Copy bu turdaki early collision-grace fairness pass'ini anlatiyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- telemetry yapisi artik `bestSurvivalTime` alanini da tutuyor; lifetime ve session personal best ayni persistence akisi uzerinden saklaniyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness komutlari bu runtime'ta artik hazir durum donuyor; ancak packaged smoke komutu su an CDP `Page.enable` hatasiyla fail ediyor
- current survival bucket baseline: `<10s: 2`, `10-20s: 5`, `20-30s: 6`, `30s cap: 11`
- validation export baseline: deterministic 5-seed sample artik `24.2s first death / 40% early / 17.3s avg` kontratini uretiyor
- `npm run telemetry:check` pacing, survival, validation export, survival bucket dagilimi ve yeni early collision-grace surface'ini birlikte assert ediyor; baseline halen `23.4s / 6.3s / 8%` ve `2 / 5 / 6 / 11`

---

# Completed This Run

- `project/game/src/game/balance.ts` icinde ilk `10s` icin `260ms` early spawn collision-grace helper'i eklendi
- `project/game/src/game/GameScene.ts` icinde yeni obstacle'lar hemen hareket ederken collider'lari grace bittikten sonra aktive olacak sekilde guncellendi; pooled obstacle reuse'i icin token guard eklendi
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni collision-grace surface'ini deterministic rapora ve guard'a ekleyecek sekilde guncellendi
- `project/game/src/latestRun.ts` public AI panel copy'si bu dar early-fairness guard pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check`, `npm run telemetry:browser-preflight`, `npm run telemetry:validation-ready`, `npm run telemetry:validation-ready -- --with-smoke` ve `npm run build` calistirildi; build yesil, smoke ise CDP `Page.enable` hatasiyla fail oldu

---

# Active Problems

- gercek manual browser sample hala yok
- packaged smoke komutu su an CDP `Page.enable` hatasiyla fail oluyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic baseline halen iki `<10s` outlier run uretiyor; first death snapshot'i `6.3s` seviyesine cikti ama urun hedefi `> 10s`in hala belirgin altinda
- yeni pause/resume prompt'unun host browser'da ilk bakista yeterince anlasilir olup olmadigi henuz insan gozunden teyit edilmedi
- yeni coaching-hint geri donusunun host browser'da pause overlay'den sonra dogal hissedip hissettirmedigi henuz insan gozunden teyit edilmedi
- yeni personal-best cue ile sadeleştirilen start/retry instructional copy'nin gercek oyuncuda ilk bakis anlasilirligini artirip artirmadigi host browser sample ile henuz gozlenmedi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- public AI update panelinin yeni collapse davranisi, mevcut death-feedback paketi, personal-best cue ve support strip host browser'da manuel olarak hala birlikte degerlendirilmedi
- compact live telemetry ozeti ile waiting/game-over detay modlari host browser'da insan gozunden henuz birlikte degerlendirilmedi
- replay fix'i, inactive-phase input freeze'i ve yeni focus-loss pause guard'i deterministic guard ile yesil olsa da gercek oyuncu girdisiyle host browser'da dogrudan dogrulanmadi
- movement-key retry parity mantigi ile yeni explicit resume akisi host browser'da keyboard/touch hissi acisindan henuz insan gozunden dogrulanmadi

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel bir ihtiyac olmaya devam ediyor; preflight hazir ama smoke komutu farkli Chromium/CDP uyumsuzluguna takiliyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- telemetry hotkey davranislari icin ayrik unit coverage yok; aktif-run reset guard'i su an build + manual code-path mantik kontrolu ile korunuyor
- production bundle buyuk; build chunk warning'i devam ediyor
- public AI panel su an static content ile besleniyor; otomatik run feed'i yok
- kalici best-score verisi mevcut telemetry yapisina eklendi; ayrik profile/leaderboard sistemi yok
- focus-loss pause UX'i scene icinde overlay/hint/telemetry ile yonetiliyor; ayrik state helper yok

---

# Known Risks

- manual validation olmadan readability veya balance kararlarini fazla ilerletmek controller heuristigine overfit riski tasir
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurur; audit bu alanda freeze istiyor
- mobil cihaz testi yapilmadi
- mevcut deterministic early-death outlier'lari manuel sample olmadan fazla agresif tuning'e overfit etme riski tasir
- yeni early spawn-target lag deterministic outlier'i yumusatti, fakat host browser sample olmadan chase hissini fazla yumusatip yumusatmadigi bilinmiyor
- yeni early spawn collision grace gercek oyuncuda daha adil hissedebilir, fakat manuel sample olmadan fazla bagislayici olup olmadigi bilinmiyor
- mevcut death-feedback paketi ve yeni personal-best cue host browser sample'i olmadan tam hissedilemez
- public panel faydali olabilir ama replay odagini bolme riski tasir; escape guide ile birlikte gorulmeli
- personal-best satiri replay motivasyonu saglayabilir ama HUD yogunlugunu da artirabilir; host browser sample ile gormek gerekiyor
- yeni support strip telemetry bilgisini oyuncu copy'sinden ayiriyor, fakat host browser sample olmadan mobil/kucuk ekranda asiri yogunluk yaratip yaratmadigi bilinmiyor
- yeni collapsed run panel narrow viewport'ta gameplay'i one cekiyor olabilir, ancak summary satirinin fazla kolay kacip kacmadigi manuel sample olmadan bilinmiyor
- compact live telemetry blogu clutter'i azaltabilir ama aktif oynanista validation affordance'larini fazla sakliyor olabilir; host browser sample gerekli
- inactive-phase input fix'i keyboard/touch'ta dogru hissediyor olmali, ancak host browser sample olmadan fiziksel stabilite ve retry hissi insan gozunden henuz teyit edilmedi
- fresh-press movement replay parity'si klavye oyuncusu icin daha dogal olabilir, ancak host browser sample olmadan accidental replay riskini gercek hissiyatla dogrulamak mumkun degil
- yeni focus-loss pause guard'i adil davranis sagliyor olmali, ancak host browser sample olmadan resume prompt'unun yeterince net olup olmadigi ve explicit resume'in fazla surtunme yaratip yaratmadigi bilinmiyor

---

# Observations

- audit'in readability micro-loop uyarisi bu tur de tutuldu; ayni death-feedback paketine yeni yuzey eklenmedi
- yeni collision grace surface'i deterministic baseline'i degistirmedi: `23.4s / 6.3s / 8%` ve `2 / 5 / 6 / 11` aynen korundu
- browser preflight artik hazir, fakat smoke komutu `Page.enable` hatasiyla ayri bir runtime blocker gosteriyor
- siradaki en dar ve anlamli urun adimi, host browser varsa collision-grace hissini 5-10 manuel run ile dogrulamak; yoksa bu fairness surface'ini dondurup baska gameplay problemine gecmek olmalidir
