# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #24

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry harness'leri ve manuel validation icin oyun ici session telemetry yuzeyi ile birlikte ilerliyor. Run #24'te tek eksenli gameplay tuning ile obstacle speed curve'un `20s+` rampasi toparlandi; validation altyapisina yeni orchestration katmani eklenmedi.

Bu turun amaci:
- `10-20s` bucket kazancini korurken deterministic average survival'i toparlamak
- pacing baseline'ini koruyarak tek parametreli bir tuning yapmak
- ortaya cikan yeni baseline'i telemetry ve living docs ile hizalamak

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

- `project/game/src/game/balance.ts` obstacle speed curve'u `10-20s` yumusak, `20s+` ise toparlanmis bir rampaya cekilecek sekilde tuning edildi
- deterministic survival buckets `2 / 7 / 7 / 8` -> `2 / 7 / 6 / 9` tasindi
- deterministic average survival `21.6s` -> `21.8s`, average spawn count `22.3` -> `22.5` tasindi
- `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline ile hizalandi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy artik daha yonlendirici olsa da insan oyuncu hissini tek basina kanitlamaz
- deterministic avg survival toparlandi ama hala Run #9 baseline'i olan `22.3s` seviyesine donmedi
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
- speed curve hala yalnizca deterministic controller ile optimize ediliyor; insan oyuncu hissi icin manuel sample gerekli

---

# Observations

- yalnizca `20s+` speed rampasini toparlamak, `10-20s` guard'ini bozmadan `30s cap` conversion'i `8`den `9`a cikardi
- mevcut curve, Run #23 tradeoff'unu kismen geri aldi ama hala eski `10` cap seviyesinin altinda
- validation altyapisini buyutmeden gameplay iteration'a donmek hala dogru yon
- bir sonraki anlamli urun adimi, oyuncu olumunu daha okunur ve tatmin edici hale getiren hit feedback/polish turu olabilir
