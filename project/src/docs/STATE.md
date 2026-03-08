# STATE.md
Last Updated: 2026-03-08
Updated By: Agent Run #53

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #53 audit'teki `drift-risk` uyarisini izleyip death-readability mikro-loop'una ve validation freeze'ine donmeden tek bir gameplay fairness hedefi secti: acilisin ilk saniyelerinde mevcut ama fiilen kullanilmayan spawn-fairness helper'ini gercekten devreye sokmak.

Bu turun ana hedefi:
- ilk `6s` icinde yeni spawn seciminin oyuncuya cok yakin lane'leri daha agresif reroll etmesini saglamak
- pacing `10 / 32 / 76`, speed curve, replay akisi ve mevcut death-feedback paketini bozmadan erken unfair outlier'lari azaltmak
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
- inactive-phase input stability: oyuncu yalnizca `playing` fazinda hiz aliyor; waiting ve game-over ekranlarinda input sahneyi kaydirmiyor
- hit feedback: impact ray, fatal-lane callout, `KILLER` spotlight + connector, teal kacis ray'i, `BREAK ...` marker'i ve death blip aktif
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; dar viewport'ta collapse olmus summary karti olarak basliyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- telemetry yapisi `bestSurvivalTime` alanini tutuyor; lifetime ve session personal best ayni persistence akisi uzerinden saklaniyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness komutlari hazir durum donuyor; packaged smoke komutu halen CDP `Page.enable` hatasiyla fail ediyor
- current survival bucket baseline: `<10s: 1`, `10-20s: 5`, `20-30s: 6`, `30s cap: 12`
- validation export baseline: deterministic 5-seed sample artik `24.2s first death / 20% early / 24.1s avg / spawn_saves=3` kontratini uretiyor
- `npm run telemetry:check` pacing, required spawn distance, survival, validation export ve bucket dagilimini assert ediyor; baseline `24.3s / 6.3s / 4%` ve `1 / 5 / 6 / 12`

---

# Completed This Run

- `project/game/src/game/balance.ts` icinde opening required-spawn-distance helper'i ilk `6s` boyunca `+160px` bonus alacak sekilde guncellendi
- `project/game/scripts/telemetry-reports.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline `24.3s / 6.3s / 4%`, buckets `1 / 5 / 6 / 12`, average spawn reroll `0.3` ve validation export `24.1s avg / 20% early / spawn_saves=3` ile hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si bu opening spawn-fairness pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` calistirildi; hepsi yesil

---

# Active Problems

- gercek manual browser sample hala yok
- packaged smoke komutu su an CDP `Page.enable` hatasiyla fail oluyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic baseline halen bir `<10s` outlier run uretiyor; first death snapshot'i `6.3s` seviyesinde ve urun hedefi `> 10s`in altinda
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

- audit'in readability micro-loop uyarisi bu tur de tutuldu; ayni death-feedback paketine yeni yuzey eklenmedi
- opening spawn-distance surface'i deterministic baseline'i ileri tasidi: `24.3s / 6.3s / 4%` ve `1 / 5 / 6 / 12`
- browser preflight blocker'i halen ayri; smoke komutu `Page.enable` hatasiyla fail etmeye devam ediyor ama bu tur kapsam disi tutuldu
- siradaki en dar ve anlamli urun adimi, host browser varsa opening spawn-distance hissini 5-10 manuel run ile dogrulamak; yoksa bu fairness surface'ini dondurup baska gameplay problemine gecmek olmali
