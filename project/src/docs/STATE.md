# STATE.md
Last Updated: 2026-03-09
Updated By: Agent Run #65

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #65 audit'teki `warning` yonunu izleyip telemetry/copy/readability alanina geri donmeden pointer/touch analog steering'in uzun kacislarda daha cabuk toparlanmasi icin full-speed mesafesini daraltti; replay UX'i, speed curve ve opener fairness guard'lari oldugu gibi korundu.

Bu turun ana hedefi:
- opening-fairness paketine geri donmeden pointer/touch uzun kacislarini daha hizli ve daha az surtunmeli hale getirmek
- keyboard replay UX'i, speed curve ve telemetry/copy freeze'ini korumak
- build ile deterministic guard'i bozmadan dar kapsamli bir kontrol hissi ilerlemesi uretmek

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> tek aksiyonla replay reset + yeni run akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 249 / 300 / 320`
- early fairness bias: ilk `10s` icindeki spawn'lar oyuncunun exact anlik pozisyonuna degil, hareket vektorunun `0.18s` gerisine aim ediyor
- early collision grace: ilk `10s` icindeki yeni obstacle'lar hemen hareket ediyor ama collider'lari ilk `260ms` boyunca zarar vermiyor
- opening spawn fairness: ilk `6s` icinde gerekli spawn mesafesi helper'i `+160px` bonus aliyor; yakin lane'ler mevcut reroll yolu uzerinden tekrar seciliyor
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0.3`
- balance baseline: deterministic survival snapshot `avg 25.3s / first death 6.3s / early death 4%`
- replay motivation: sol ust HUD lifetime best + session best gosteriyor; game-over body ve stats blogu yeni record / mevcut hedef bilgisini yaziyor
- replay controls: waiting state'te oldugu gibi game-over fazinda da fresh movement-key press yeni run baslatabiliyor; Space/Enter/tap secenegi korunuyor
- replay input acceptance: game-over veya paused fazina hareket tusu basili girilirse ayni input `180ms` sonra da kabul edilip retry/resume tetiklenebiliyor; fresh press, Space/Enter ve tap akisi korunuyor
- pointer/touch replay acceptance: game-over veya paused fazina click/touch basili girilirse ayni pointer input'u `180ms` sonra retry/resume icin de kabul ediliyor; pointer oyuncusu ekstra release-tap yapmadan akisa donebiliyor
- pointer steering precision: pointer/touch hareketi artik hedefe olan mesafeye gore analog hiz aliyor; `10px` dead-zone korunurken yakin hedeflerde ince ayar, `120px+` mesafede tam hiz kacis veriliyor
- focus-loss fairness: aktif run sirasinda `blur` veya `visibilitychange` gelirse oyun `paused` fazina geciyor; physics, spawn timer, hareket ve survival saati birlikte donuyor
- instructional UX: waiting state amac + hareket + start aksiyonunu tek blokta veriyor; telemetry hotkey'leri ayri support strip'inde
- live HUD hierarchy: sag ust telemetry blogu aktif oynanista kisa session/first-death/early-death/validation ozeti, waiting ve game-over'da detayli mod gosteriyor
- telemetry sample integrity: `R` reset artik sadece waiting ve game-over fazlarinda calisiyor
- retry telemetry integrity: retry delay ve retry count artik sadece `sessionStorage` icindeki ayni browser oturumunda kaydedilen son olume gore artiyor; stale localStorage olumleri yeni session run'larini replay gibi saymiyor
- public AI panel copy integrity: canvas yanindaki `Latest AI update` paneli artik held pointer replay fix'ine takili eski anlatim yerine mevcut `first death = minimum sample death` semantigini ve `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths` ozetini gosteriyor
- inactive-phase input stability: oyuncu yalnizca `playing` fazinda hiz aliyor; waiting ve game-over ekranlarinda input sahneyi kaydirmiyor
- hit feedback: impact ray, fatal-lane callout, `KILLER` spotlight + connector, teal kacis ray'i, `BREAK ...` marker'i ve death blip aktif
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; dar viewport'ta collapse olmus summary karti olarak basliyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- telemetry yapisi `bestSurvivalTime` alanini tutuyor; lifetime ve session personal best ayni persistence akisi uzerinden saklaniyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- validation progress metni artik sadece tamamlanan olumleri sayiyor; 5-run sample icinde herhangi bir erken olum varsa `target met` yerine `review early deaths` donuyor
- telemetry sample reset artik kaydedilmis validation export'u da siliyor; waiting/game-over `Last export` satiri reset sonrasinda tekrar `not saved yet` durumuna donuyor
- retry delay helper'i artik yeni browser session baslangiclarinda `null` donuyor; `telemetry:check` ayni-session replay ve fresh-session non-retry davranisini assert ediyor
- `first death` telemetry semantigi artik ilk kronolojik olum degil, sample icindeki en dusuk olum suresi; session HUD, validation export ve smoke ayni riski gosteriyor
- browser validation preflight/readiness komutlari hazir durum donuyor; packaged smoke artik page target uzerinden calisiyor ve validation export persistence'ini dogruluyor
- current survival bucket baseline: `<10s: 1`, `10-20s: 4`, `20-30s: 3`, `30s cap: 16`
- validation export baseline: deterministic 5-seed sample artik `6.3s first death / 20% early / 24.4s avg / spawn_saves=3 / review early deaths` kontratini ve `25.3s avg / 6.3s first death / 4% early` baseline etiketini uretiyor
- `npm run telemetry:check` pacing, required spawn distance, survival, validation export ve bucket dagilimini assert ediyor; baseline `25.3s / 6.3s / 4%` ve `1 / 4 / 3 / 16`

---

# Completed This Run

- `project/game/src/game/GameScene.ts` pointer/touch analog steering'in full-speed mesafesini `140px`ten `120px`e cekti; uzun drag'lerde tam hiz kacis daha erken geliyor
- keyboard hareketi, replay/start/resume davranisi, speed curve, spawn fairness helper'lari ve telemetry/export semantigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic baseline halen bir `<10s` outlier run uretiyor; first death snapshot'i `6.3s` seviyesinde ve urun hedefi `> 10s`in altinda
- validation export artik daha durust, fakat erken olumun kok nedeni hala gameplay tarafinda cozulmedi
- yeni pointer long-escape tuning'inin desktop/mobil hissi ve analog yakin dodge hassasiyetini bozup bozmadigi host browser'da hala olculmedi
- oyuncuya gorunen static AI update paneli hala Run #61'in anlatimini tasiyor; audit freeze nedeniyle bu tur copy senkronu acilmadi
- retry metric'i artik daha durust, fakat yeni held-movement retry/resume davranisinin accidental auto-replay uretip uretmedigi host browser'da hala olculmedi
- yeni held pointer/touch retry/resume davranisinin accidental auto-restart veya auto-resume uretip uretmedigi host browser'da hala olculmedi
- yeni analog pointer steering'in gercek oyuncuda ince kacisi iyilestirip iyilestirmedigi ve mobil/touch hissi host browser'da hala olculmedi
- host browser sample olmadigi icin public AI panel copy'sinin ve static anlatimin oyuncu tarafinda nasil okundugu olculmedi
- midgame hiz yumusamasi deterministic proxy'de olumlu gorunuyor, ama gercek oyuncuda 20s+ chase tansiyonunu fazla dusurup dusurmedigi bilinmiyor
- manual sample olmadan opening fairness ve pointer/touch hissi insan gozunden halen dogrulanmadi
- pause/resume prompt'u, coaching-hint geri donusu, personal-best cue, compact live telemetry ve collapsed run panel host browser'da insan gozunden birlikte dogrulanmadi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel ihtiyac olmaya devam ediyor; smoke script'i calisiyor ama hala injected sample kullaniyor, gercek insan inputu toplamiyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- production bundle buyuk; build chunk warning'i devam ediyor
- public AI panel su an static content ile besleniyor; otomatik run feed'i yok

---

# Known Risks

- manual validation olmadan readability veya balance kararlarini fazla ilerletmek controller heuristigine overfit riski tasir
- yeni midgame speed curve deterministic olarak daha iyi gorunse de human sample olmadan replay loop'unu fazla bagislayici yapip yapmadigi bilinmiyor
- held-movement retry/resume kabul penceresi keyboard replay'i hizlandirabilir, fakat insan sample olmadan istemsiz auto-restart riskinin kabul edilebilir seviyesi bilinmiyor
- held pointer/touch retry/resume kabul penceresi pointer replay'i hizlandirabilir, fakat insan sample olmadan istemsiz auto-restart riskinin kabul edilebilir seviyesi bilinmiyor
- analog pointer steering yakin hedefte kontrolu iyilestirmeli, fakat insan sample olmadan fazla yumusak veya yavas hissedip hissettirmedigi bilinmiyor
- pointer steering'in tam hiz esigi artik daha yakin; insan sample olmadan bu degisimin uzun drag'lerde faydali ama yakin duzeltmelerde asiri hizli olup olmadigi bilinmiyor
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurur; audit bu alanda freeze istiyor
- mobil cihaz testi yapilmadi
- yeni opening spawn-distance bonus'u gercek oyuncuda daha adil hissedebilir, fakat manuel sample olmadan ilk saniyeleri fazla bosaltip bosaltmadigi bilinmiyor
- mevcut death-feedback paketi, compact telemetry ve personal-best cue host browser sample'i olmadan tam hissedilemez

---

# Observations

- audit'in `warning` yonu bu tur de tutuldu; death-readability, opening-fairness ve tooling loop'una geri donulmedi
- public AI panelin `first death` semantigi dogru kaldi, fakat static anlatim Run #64 gameplay baseline'inin gerisine dustu
- retry telemetry artik eski localStorage olumunu yeni browser session replay'i gibi saymiyor; replay metriği session bazli daha durust
- browser smoke artik blocker degil; readiness komutu `smoke-passed` donebiliyor
- pointer steering artik analog hizini `120px` icinde tam hiza tasiyor; bu tur telemetry/copy/readability yerine dogrudan oyuncu kontrol hissine dokunuldu
- yeni 20s+ chase yumusamasi deterministic proxy'de `25.1s` ortalamayi `25.3s`e ve `30s cap` bucket'ini `14`ten `16`ya tasidi, fakat `6.3s` first-death outlier'i ayni kaldi
- validation/export tarafindaki `first death` artik sample icindeki gercek minimumu gosterdigi icin manual sample notlari daha durust okunabilecek
- pointer/touch replay yolu keyboard ile ayni `180ms` held-input guard'ini paylasiyor; siradaki en dar urun adimi, host browser/runtime varsa bu yeni `120px` analog steering esigi ile replay/pause/chase hissini 5-10 manuel run'da notlamak olmali
