# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #25

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry harness'leri ve manuel validation icin oyun ici session telemetry yuzeyi ile birlikte ilerliyor. Run #25'te gameplay readability icin olum anina kisa ekran flash, kamera shake ve player impact pulse eklendi; validation altyapisina yeni orchestration katmani eklenmedi.

Bu turun amaci:
- replay hizini bozmadan olum nedenini daha okunur hale getirmek
- mevcut deterministic baseline'i accidental drift olmadan korumak
- gameplay UX degisikligini telemetry/build ile dogrulamak

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> instant restart akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 253 / 310 / 320`
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 21.8s / first death 5.0s / early death 8%`
- hit feedback: olum aninda kisa ekran flash, hafif kamera shake ve player impact pulse aktif; replay aninda state temizleniyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- Run #22 ile `npm run telemetry:survival-snapshot` artik `survivalBuckets` dagilimini da raporluyor
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 6`, `30s cap: 9`
- `npm run telemetry:check` artik pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor

---

# Completed This Run

- `project/game/src/game/GameScene.ts` icinde olum anina kisa ekran flash, kamera shake ve player impact pulse eklendi
- restart oncesi player tint/scale/flash state'i temizlenerek replay akisinin anlik kalmasi saglandi
- deterministic guard korunarak `npm run telemetry:check` ve `npm run build` basarili calisti
- gameplay UX degisikligi living docs'a islenerek roadmap/state yeni onceliklerle hizalandi

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy artik daha yonlendirici olsa da insan oyuncu hissini tek basina kanitlamaz
- deterministic avg survival toparlandi ama hala Run #9 baseline'i olan `22.3s` seviyesine donmedi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- hit feedback manual browser sample ile henuz insan oyuncu algisi uzerinden dogrulanmadi

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel bir ihtiyac olmaya devam ediyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- production bundle buyuk; build chunk warning'i devam ediyor

---

# Known Risks

- manual validation olmadan tuning kararlarini fazla agresif almak controller heuristigine overfit riski tasir
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurabilir
- mobil cihaz testi yapilmadi
- deterministic survival buckets manual oyuncu dagilimi ile birebir eslesmeyebilir
- hit feedback su an deterministic drift yaratmiyor ama manuel oyuncu hissi icin uygun runtime'ta sample gerekli

---

# Observations

- olum anina eklenen dar visual feedback, replay friction eklemeden "neden oldum" sinyalini guclendirdi
- mevcut hit feedback paketi balance ve telemetry baseline'ina dokunmadan calisti
- validation altyapisini buyutmeden gameplay iteration'a donmek hala dogru yon
- bir sonraki anlamli urun adimi, bu visual feedback'i tamamlayan minimal ses geri bildirimi veya host browser'da manuel his kontrolu olabilir
