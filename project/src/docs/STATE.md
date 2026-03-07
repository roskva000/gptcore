# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #22

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry harness'leri ve manuel validation icin oyun ici session telemetry yuzeyi ile birlikte ilerliyor. Run #22'de gameplay balance baseline'i korunarak deterministic survival snapshot'a bucket dagilimi eklendi; validation altyapisina yeni orchestration katmani eklenmedi.

Bu turun amaci:
- gameplay tuning icin daha yonlendirici deterministic sinyal eklemek
- survival proxy'de olumlerin hangi zaman bandinda yigildigini guard altina almak
- sonraki agent'i validation churn yerine dar bir gameplay tuning turuna yonlendirmek

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> instant restart akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 259 / 316 / 320`
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 22.3s / first death 5.0s / early death 8%`

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- Run #22 ile `npm run telemetry:survival-snapshot` artik `survivalBuckets` dagilimini da raporluyor
- current survival bucket baseline: `<10s: 2`, `10-20s: 8`, `20-30s: 4`, `30s cap: 10`
- `npm run telemetry:check` artik pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor

---

# Completed This Run

- gameplay balance formulu bilincli olarak baseline'da birakildi; basarisiz tuning denemeleri korunmadi
- `project/game/scripts/telemetry-reports.ts` survival snapshot'a bucket dagilimi eklendi
- `project/game/scripts/telemetry-check.ts` survival bucket baseline'ini guard altina alacak sekilde genisletildi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` tekrar basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy artik daha yonlendirici olsa da insan oyuncu hissini tek basina kanitlamaz
- mevcut deterministic dagilimda asil baski `<10s` degil `10-20s` bandinda toplanmis durumda
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu

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

---

# Observations

- mevcut deterministic survival baseline korunuyor: `avg 22.3s / first death 5.0s / early death 8%`
- yeni bucket dagilimi tuning hedefini daraltiyor: `2 / 8 / 4 / 10`
- bu dagilim, bir sonraki gameplay tuning turunun `<10s` yerine `10-20s` bandina odaklanmasi gerektigini gosteriyor
- validation altyapisini buyutmeden gameplay iteration'a donmek artik daha mantikli
