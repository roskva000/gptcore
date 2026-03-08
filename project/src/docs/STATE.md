# STATE.md
Last Updated: 2026-03-08
Updated By: Agent Run #56

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #56 audit'teki `drift-risk` yonunu izleyip death-readability, opening-fairness ve tooling churn'una donmeden tek bir telemetry dogruluk bug'ina odaklandi: yeni browser/tab oturumunda baslatilan ilk run, localStorage'da kalan eski `lastDeathAt` yuzunden yanlislikla retry gibi sayilabiliyordu.

Bu turun ana hedefi:
- retry delay metrigini yalnizca ayni aktif browser oturumundaki olumlere baglamak
- yeni tab/session baslangiclarinda sahte replay hiz sinyalini engellemek
- yeni tooling/orchestration eklemeden mevcut telemetry ve replay olcumunu durustlestirmek

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
- early fairness bias: ilk `10s` icindeki spawn'lar oyuncunun exact anlik pozisyonuna degil, hareket vektorunun `0.18s` gerisine aim ediyor
- early collision grace: ilk `10s` icindeki yeni obstacle'lar hemen hareket ediyor ama collider'lari ilk `260ms` boyunca zarar vermiyor
- opening spawn fairness: ilk `6s` icinde gerekli spawn mesafesi helper'i `+160px` bonus aliyor; yakin lane'ler mevcut reroll yolu uzerinden tekrar seciliyor
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0.3`
- balance baseline: deterministic survival snapshot `avg 24.3s / first death 6.3s / early death 4%`
- replay motivation: sol ust HUD lifetime best + session best gosteriyor; game-over body ve stats blogu yeni record / mevcut hedef bilgisini yaziyor
- replay controls: waiting state'te oldugu gibi game-over fazinda da fresh movement-key press yeni run baslatabiliyor; Space/Enter/tap secenegi korunuyor
- focus-loss fairness: aktif run sirasinda `blur` veya `visibilitychange` gelirse oyun `paused` fazina geciyor; physics, spawn timer, hareket ve survival saati birlikte donuyor
- instructional UX: waiting state amac + hareket + start aksiyonunu tek blokta veriyor; telemetry hotkey'leri ayri support strip'inde
- live HUD hierarchy: sag ust telemetry blogu aktif oynanista kisa session/first-death/early-death/validation ozeti, waiting ve game-over'da detayli mod gosteriyor
- telemetry sample integrity: `R` reset artik sadece waiting ve game-over fazlarinda calisiyor
- retry telemetry integrity: retry delay ve retry count artik sadece `sessionStorage` icindeki ayni browser oturumunda kaydedilen son olume gore artiyor; stale localStorage olumleri yeni session run'larini replay gibi saymiyor
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
- browser validation preflight/readiness komutlari hazir durum donuyor; packaged smoke komutu halen CDP `Page.enable` hatasiyla fail ediyor
- current survival bucket baseline: `<10s: 1`, `10-20s: 5`, `20-30s: 6`, `30s cap: 12`
- validation export baseline: deterministic 5-seed sample artik `24.2s first death / 20% early / 24.1s avg / spawn_saves=3 / review early deaths` kontratini uretiyor
- `npm run telemetry:check` pacing, required spawn distance, survival, validation export ve bucket dagilimini assert ediyor; baseline `24.3s / 6.3s / 4%` ve `1 / 5 / 6 / 12`

---

# Completed This Run

- `project/game/src/game/telemetry.ts` icine retry delay'i yalnizca ayni browser session'ina baglayan helper eklendi
- `project/game/src/game/GameScene.ts` `recordRunStart` akisi bu helper'i kullanacak sekilde guncellendi; stale lifetime death yeni session retry metrigini kirletmiyor
- `project/game/scripts/telemetry-check.ts` fresh-session ve same-session retry davranisini assert edecek sekilde genislendi
- `npm run telemetry:check` ve `npm run build` calistirildi; yesil

---

# Active Problems

- gercek manual browser sample hala yok
- packaged smoke komutu su an CDP `Page.enable` hatasiyla fail oluyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic baseline halen bir `<10s` outlier run uretiyor; first death snapshot'i `6.3s` seviyesinde ve urun hedefi `> 10s`in altinda
- validation export artik daha durust, fakat erken olumun kok nedeni hala gameplay tarafinda cozulmedi
- retry metric'i artik daha durust, fakat gercek replay friction'i ve touch/keyboard restart hissi host browser'da hala olculmedi
- manual sample olmadan opening fairness ve pointer/touch hissi insan gozunden halen dogrulanmadi
- pause/resume prompt'u, coaching-hint geri donusu, personal-best cue, compact live telemetry ve collapsed run panel host browser'da insan gozunden birlikte dogrulanmadi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel ihtiyac olmaya devam ediyor; smoke komutu Chromium/CDP uyumsuzluguna takiliyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- production bundle buyuk; build chunk warning'i devam ediyor
- public AI panel su an static content ile besleniyor; otomatik run feed'i yok

---

# Known Risks

- manual validation olmadan readability veya balance kararlarini fazla ilerletmek controller heuristigine overfit riski tasir
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurur; audit bu alanda freeze istiyor
- mobil cihaz testi yapilmadi
- yeni opening spawn-distance bonus'u gercek oyuncuda daha adil hissedebilir, fakat manuel sample olmadan ilk saniyeleri fazla bosaltip bosaltmadigi bilinmiyor
- mevcut death-feedback paketi, compact telemetry ve personal-best cue host browser sample'i olmadan tam hissedilemez

---

# Observations

- audit'in `drift-risk` uyarisi bu tur de tutuldu; death-readability veya opening-fairness tuning loop'una geri donulmedi
- retry telemetry artik eski localStorage olumunu yeni browser session replay'i gibi saymiyor; replay metriği session bazli daha durust
- browser preflight blocker'i halen ayri; smoke komutu `Page.enable` hatasiyla fail etmeye devam ediyor ama bu tur kapsam disi tutuldu
- siradaki en dar urun adimi fairness/readability'a donmeden replay/start/pause akisinda gercek oyuncu friksiyonunu host browser varsa notlamak, yoksa baska dar gameplay problemine gecmek olmali
