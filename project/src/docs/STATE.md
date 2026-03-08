# STATE.md
Last Updated: 2026-03-08
Updated By: Agent Run #50

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #50 audit'teki `drift-risk` uyarisini izleyip death-readability mikro-loop'una ve validation freeze'ine sadik kaldi; yeni UI/tooling katmani acmadan mevcut telemetry sample'inin aktif run sirasinda bozulabilen reset davranisini kapatti. Validation/tooling kapsam freeze'i korundu.

Bu turun ana hedefi:
- aktif run sirasinda `R` ile telemetry reset yapilip first-death / retry sample'inin kirilmasini engellemek
- reset aksiyonunu yalnizca run disi fazlarda gecerli tutmak
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
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 22.3s / first death 5.0s / early death 8%`
- replay motivation: sol ust HUD artik lifetime best + session best gostermekte; game-over body ve stats blogu yeni record / mevcut hedef bilgisini yaziyor
- replay controls: waiting state'te oldugu gibi game-over fazinda da fresh movement-key press yeni run baslatabiliyor; Space/Enter/tap secenegi korunuyor. Edge-trigger guard'i sayesinde olum aninda basili kalan yon tusu otomatik replay sizmasi yaratmiyor
- focus-loss fairness: aktif run sirasinda `blur` veya `visibilitychange` gelirse oyun `paused` fazina geciyor; obstacle physics, spawn timer, hareket ve survival saati birlikte donuyor. Oyuncu oyuna dondugunde Space/Enter/tap veya fresh movement-key ile explicit resume gerekiyor
- instructional UX: waiting state artik amac + hareket + start aksiyonunu tek oyuncu-odakli blokta veriyor; telemetry hotkey'leri altta ayri support strip'ine tasindi. In-run hint daha kisa hedef odakli, game-over hint'i ise anlik retry aksiyonunu one aliyor. Focus-loss pause artik erken-run coaching hint'ini kalan aktif sure kadar geri getirebiliyor; pencere dolduysa resume HUD'i tekrar sessiz kaliyor
- live HUD hierarchy: sag ust telemetry blogu faza gore degisiyor; waiting ve game-over'da detayli metrics/export satirlari korunurken aktif oynanista sadece kisa session/first-death/early-death/validation ozeti gosteriliyor
- telemetry sample integrity: `R` reset artik sadece waiting ve game-over fazlarinda calisiyor; playing/paused sirasinda engellenerek mevcut run'in first-death ve retry sample'i sifira cekilip bozulmuyor
- inactive-phase input stability: oyuncu artik yalnizca `playing` fazinda hiz aliyor; waiting ve game-over ekranlarinda keyboard/pointer input'u death scene'i veya pre-run yerlesimini kaydirmiyor
- hit feedback: olum aninda flash, hafif kamera shake, player pulse, directional hit callout, fatal-lane callout, oyuncu merkezinde kucuk bosluk birakan arrowhead'li impact ray, lane marker label, killer obstacle icin ayri `KILLER` spotlight etiketi + kisa connector, oyuncu merkezinde kucuk bosluk birakan arrowhead'li teal kacis ray'i, `BREAK ...` marker'i ve kisa death blip aktif; killer obstacle spotlight'ta kalirken diger aktif threat'ler dimleniyor
- death summary: ana blok survival + cause tasiyor; buna ek olarak artik yeni best veya mevcut hedef bilgisi de yaziyor. `BREAK ...` prompt'u bir sonraki denemede hangi yone kirilman gerektigini soyluyor, yeni teal guide bunu sahne icinde de isaret ediyor, session/validation satirlari ayri stats blogunda kaliyor
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; desktop'ta varsayilan olarak acik, dar viewport'ta ise gameplay'i oncelemek icin collapse olmus summary karti olarak basliyor. Copy bu turdaki narrow-screen clutter reduction pass'ini anlatiyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- telemetry yapisi artik `bestSurvivalTime` alanini da tutuyor; lifetime ve session personal best ayni persistence akisi uzerinden saklaniyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 4`, `30s cap: 11`
- `npm run telemetry:check` pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor; baseline halen `22.3s / 5.0s / 8%` ve `2 / 7 / 4 / 11`

---

# Completed This Run

- `project/game/src/game/GameScene.ts` icinde telemetry reset aktif run sirasinda bloke edildi; mevcut run varken sample sifirlama artik first-death / retry / validation sayaclarini kiramiyor
- support strip temel copy'si `R` aksiyonunun run disinda kullanilmasi gerektigini soyleyecek sekilde netlestirildi
- `project/game/src/latestRun.ts` public AI panel copy'si bu dar telemetry-integrity fix'ini anlatacak sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti; build'de buyuk bundle warning'i devam etti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic baseline halen iki `<10s` outlier run uretiyor; first death snapshot'i `5.0s` seviyesinde ve urun hedefi `> 10s`in belirgin altinda
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
- browser validation akisi runtime bagimli operasyonel bir ihtiyac olmaya devam ediyor
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

- audit'in readability micro-loop uyarisi bu tur tutuldu; ayni death-feedback paketine yeni yuzey eklenmedi
- aktif run sirasinda telemetry reset ile sample bozma bug'i kapatildi; `R` artik run disi fazlarla sinirli
- deterministic balance baseline degistirilmedi; mevcut guard `22.3s / 5.0s / 8%` korundu
- siradaki en dar ve anlamli urun adimi, host browser yoksa iki `<10s` deterministic outlier run'i inceleyip erken-game fairness'i dar balance/spawn ayariyla iyilestirmeye calismaktir; bu calisma readability veya tooling churn'una donusmemeli
