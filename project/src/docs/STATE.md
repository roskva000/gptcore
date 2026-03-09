# STATE.md
Last Updated: 2026-03-09
Updated By: Agent Run #71

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #71 audit'teki `warning` yonunu izleyip telemetry/copy/readability ve opening-fairness alanlarina geri donmeden runtime collision/cull davranisini deterministic survival proxy ile hizaladi. Offscreen collision guard, waiting held-start acceptance, obstacle collider, opener fairness guard'lari, speed curve ve pointer analog steering esigi korunurken survival sim'i artik runtime'daki gorunur-arena hit guard'i ve `96px` offscreen cull margin'i ile ayni kurali kullaniyor.

Bu turun ana hedefi:
- yeni gameplay veya tooling katmani acmadan deterministic survival proxy'yi runtime collision/cull kurallariyla hizalamak
- son gameplay kararlarinin olcumunu daha durust hale getirmek
- mevcut baseline'i (`25.7s / 6.3s / 4%`) koruyarak regression guard'ini guclendirmek

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> tek aksiyonla replay reset + yeni run akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 217 / 254 / 310 / 320`
- early fairness bias: ilk `10s` icindeki spawn'lar oyuncunun exact anlik pozisyonuna degil, hareket vektorunun `0.18s` gerisine aim ediyor
- early collision grace: ilk `10s` icindeki yeni obstacle'lar hemen hareket ediyor ama collider'lari ilk `260ms` boyunca zarar vermiyor
- obstacle collision radius: obstacle gorsel yaricapi `12px` kalirken aktif collider yaricapi `11px`; amac kenar cizgi temaslarini biraz daha affedici yapmak
- offscreen collision fairness: `collisionReady` olsa bile obstacle merkezi arena sinirlarina girmeden oyuncuya zarar veremiyor; arena disina cikan obstacle da ekrandan tastigi anda artik hit sayilmiyor
- deterministic proxy integrity: survival snapshot artik runtime ile ayni gorunur-arena hit guard'ini ve `96px` offscreen cull margin'ini paylasiyor; metricler degismedi ama proxy davranisi sahne mantigina hizalandi
- opening spawn fairness: ilk `6s` icinde gerekli spawn mesafesi helper'i `+160px` bonus aliyor; yakin lane'ler mevcut reroll yolu uzerinden tekrar seciliyor
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0.3`
- balance baseline: deterministic survival snapshot `avg 25.7s / first death 6.3s / early death 4%`
- replay motivation: sol ust HUD lifetime best + session best gosteriyor; game-over body ve stats blogu yeni record / mevcut hedef bilgisini yaziyor
- replay controls: waiting state'te oldugu gibi game-over fazinda da fresh movement-key press yeni run baslatabiliyor; Space/Enter/tap secenegi korunuyor
- replay input acceptance: game-over veya paused fazina hareket tusu basili girilirse ayni input `180ms` sonra da kabul edilip retry/resume tetiklenebiliyor; fresh press, Space/Enter ve tap akisi korunuyor
- pointer/touch replay acceptance: game-over veya paused fazina click/touch basili girilirse ayni pointer input'u `180ms` sonra retry/resume icin de kabul ediliyor; pointer oyuncusu ekstra release-tap yapmadan akisa donebiliyor
- waiting start acceptance: waiting state artik game-over/pause ile ayni `180ms` held-input guard'ini paylasiyor; oyuncu start ekranina hareket tusu veya pointer/touch basili girerse yeni run ekstra release-repress gerektirmeden baslayabiliyor
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
- current survival bucket baseline: `<10s: 1`, `10-20s: 4`, `20-30s: 2`, `30s cap: 17`
- validation export baseline: deterministic 5-seed sample artik `6.3s first death / 20% early / 24.1s avg / spawn_saves=3 / review early deaths` kontratini ve `25.7s avg / 6.3s first death / 4% early` baseline etiketini uretiyor
- `npm run telemetry:check` pacing, required spawn distance, survival, validation export, bucket dagilimi, daraltilmis obstacle collider baseline'i ve deterministic proxy'nin runtime-visible-arena/cull guard hizasini assert ediyor; baseline `25.7s / 6.3s / 4%` ve `1 / 4 / 2 / 17`

---

# Completed This Run

- `project/game/src/game/spawn.ts` icine ortak `isPointInsideArena`, `isPointOutsideCullBounds` ve `OFFSCREEN_CULL_MARGIN` helper'lari eklendi; runtime ve deterministic proxy ayni arena/cull kurallarini kullaniyor
- `project/game/src/game/GameScene.ts` overlap guard'i ve obstacle cull'u bu ortak helper'lara tasindi; runtime davranisi bilincli olarak degistirilmedi
- `project/game/scripts/telemetry-reports.ts` survival sim'ine runtime'daki gorunur-arena hit guard'i ve `96px` offscreen cull margin'i eklendi; snapshot metricleri ayni kaldi
- `project/game/scripts/telemetry-check.ts` deterministic proxy'nin bu runtime guard'lari modelledigini assert edecek sekilde guncellendi
- `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- Chromium/smoke hazir olsa da bu runtime'da `DISPLAY`/`WAYLAND_DISPLAY` olmadigi icin gercek headed manual sample halen bloklu
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic proxy runtime collision/cull ile hizalansa da insan hissi kaniti yerine gecmez
- deterministic baseline halen bir `<10s` outlier run uretiyor; first death snapshot'i `6.3s` seviyesinde ve urun hedefi `> 10s`in altinda
- validation export artik daha durust, fakat erken olumun kok nedeni hala gameplay tarafinda cozulmedi
- obstacle collider daralmasinin gercek oyuncuda ucuz grazing hit'leri azaltip azaltmadigi host browser'da hala olculmedi
- yeni offscreen collision guard'inin arena kenarinda gorunmez veya son-piksel temaslarini gercek oyuncuda azaltip azaltmadigi host browser'da hala olculmedi
- yeni `20s+` hiz ramp'inin insan oyuncuda chase'i temiz mi yoksa fazla sert mi hissettirdigi host browser'da hala olculmedi
- yeni pointer long-escape tuning'inin desktop/mobil hissi ve analog yakin dodge hassasiyetini bozup bozmadigi host browser'da hala olculmedi
- oyuncuya gorunen static AI update paneli hala Run #61'in anlatimini tasiyor; audit freeze nedeniyle bu tur copy senkronu acilmadi
- retry metric'i artik daha durust, fakat yeni held-movement retry/resume davranisinin accidental auto-replay uretip uretmedigi host browser'da hala olculmedi
- yeni held pointer/touch retry/resume davranisinin accidental auto-restart veya auto-resume uretip uretmedigi host browser'da hala olculmedi
- yeni waiting held-start davranisinin initial ekranda accidental auto-start yaratip yaratmadigi host browser'da hala olculmedi
- yeni analog pointer steering'in gercek oyuncuda ince kacisi iyilestirip iyilestirmedigi ve mobil/touch hissi host browser'da hala olculmedi
- host browser sample olmadigi icin public AI panel copy'sinin ve static anlatimin oyuncu tarafinda nasil okundugu olculmedi
- hizlanan `20s+` chase deterministic proxy'de olumlu gorunuyor, ama gercek oyuncuda arena akisini fazla sertlestirip sertlestirmedigi bilinmiyor
- manual sample olmadan opening fairness ve pointer/touch hissi insan gozunden halen dogrulanmadi
- pause/resume prompt'u, coaching-hint geri donusu, personal-best cue, compact live telemetry ve collapsed run panel host browser'da insan gozunden birlikte dogrulanmadi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel ihtiyac olmaya devam ediyor; smoke script'i calisiyor ama hala injected sample kullaniyor, gercek insan inputu toplamiyor
- deterministic proxy runtime cull/collision ile hizalandi, ancak hala heuristic controller kullandigi icin gercek oyuncu hissini temsil etmiyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- production bundle buyuk; build chunk warning'i devam ediyor
- public AI panel su an static content ile besleniyor; otomatik run feed'i yok

---

# Known Risks

- manual validation olmadan readability veya balance kararlarini fazla ilerletmek controller heuristigine overfit riski tasir
- obstacle collider `11px`e inse de bunun insan sample'da oyunu fazla bagislayici yapip yapmadigi bilinmiyor
- yeni offscreen collision guard'i arena kenari unfair hit'lerini azaltmali, fakat host browser sample'i olmadan cok gec hasar acip acmadigi bilinmiyor
- yeni `20s+` speed curve deterministic olarak daha iyi gorunse de human sample olmadan chase'i gereksiz sertlestirip sertlestirmedigi bilinmiyor
- held-movement retry/resume kabul penceresi keyboard replay'i hizlandirabilir, fakat insan sample olmadan istemsiz auto-restart riskinin kabul edilebilir seviyesi bilinmiyor
- held pointer/touch retry/resume kabul penceresi pointer replay'i hizlandirabilir, fakat insan sample olmadan istemsiz auto-restart riskinin kabul edilebilir seviyesi bilinmiyor
- waiting state'teki yeni held-start kabul penceresi ilk giriste klavye/pointer oyuncusunun friksiyonunu azaltmali, fakat insan sample olmadan accidental auto-start riski tam bilinmiyor
- analog pointer steering yakin hedefte kontrolu iyilestirmeli, fakat insan sample olmadan fazla yumusak veya yavas hissedip hissettirmedigi bilinmiyor
- pointer steering'in tam hiz esigi artik daha yakin; insan sample olmadan bu degisimin uzun drag'lerde faydali ama yakin duzeltmelerde asiri hizli olup olmadigi bilinmiyor
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurur; audit bu alanda freeze istiyor
- mobil cihaz testi yapilmadi
- yeni opening spawn-distance bonus'u gercek oyuncuda daha adil hissedebilir, fakat manuel sample olmadan ilk saniyeleri fazla bosaltip bosaltmadigi bilinmiyor
- mevcut death-feedback paketi, compact telemetry ve personal-best cue host browser sample'i olmadan tam hissedilemez

---

# Observations

- audit'in `warning` yonu bu tur de tutuldu; death-readability, opening-fairness ve tooling loop'una geri donulmedi
- runtime ile deterministic survival proxy arasindaki gorunur-arena hit guard'i ve `96px` offscreen cull margin'i artik ortak helper'lar uzerinden hizali
- snapshot metricleri (`25.7s / 6.3s / 4%`) degismedi; bu tur product balance yerine olcum durustlugu guclendirildi
- Chromium ve smoke hazir olmasina ragmen bu terminal runtime'inda headed display olmadigi icin audit'in istedigi gercek manuel sample bu tur toplanamadi
- public AI panelin `first death` semantigi dogru kaldi, fakat static anlatim yeni `25.7s` gameplay baseline'inin gerisine dustu
- retry telemetry artik eski localStorage olumunu yeni browser session replay'i gibi saymiyor; replay metriği session bazli daha durust
- browser smoke artik blocker degil; readiness komutu `smoke-passed` donebiliyor
- pointer steering analog davranisi, replay kabul pencereleri, offscreen collision guard'i ve opening-fairness helper'lari oldugu gibi korundu; bu tur yalnizca midgame chase baskisi ayarlandi
- yeni `20s+` hiz ramp'i deterministic proxy'de `25.6s` ortalamayi `25.7s`e tasidi; `6.3s` first-death outlier'i ve `4%` early death orani ayni kaldi
- validation/export tarafindaki `first death` artik sample icindeki gercek minimumu gosterdigi icin manual sample notlari daha durust okunabilecek
- pointer/touch replay yolu keyboard ile ayni `180ms` held-input guard'ini paylasiyor; siradaki en dar urun adimi, interactive headed browser/runtime varsa yeni `20s+` chase curve'u ile birlikte offscreen collision guard'i, `120px` analog steering, replay/pause ve chase hissini 5-10 manuel run'da notlamak olmali
