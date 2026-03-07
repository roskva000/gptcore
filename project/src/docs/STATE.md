# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #23

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry harness'leri ve manuel validation icin oyun ici session telemetry yuzeyi ile birlikte ilerliyor. Run #23'te tek eksenli gameplay tuning ile obstacle speed curve 10. saniyeden sonra yumusatildi; validation altyapisina yeni orchestration katmani eklenmedi.

Bu turun amaci:
- deterministic survival proxy'de `10-20s` olum yigilmalarini azaltmak
- pacing baseline'ini koruyarak tek parametreli bir tuning yapmak
- ortaya cikan tradeoff'u yazili hafizaya tasimak

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> instant restart akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 251 / 305 / 320`
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 21.6s / first death 5.0s / early death 8%`

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- Run #22 ile `npm run telemetry:survival-snapshot` artik `survivalBuckets` dagilimini da raporluyor
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 7`, `30s cap: 8`
- `npm run telemetry:check` artik pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor

---

# Completed This Run

- `project/game/src/game/balance.ts` obstacle speed curve'u 10. saniyeden sonra iki kademeli olacak sekilde tuning edildi
- deterministic survival buckets `2 / 8 / 4 / 10` -> `2 / 7 / 7 / 8` tasindi
- `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline ile hizalandi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy artik daha yonlendirici olsa da insan oyuncu hissini tek basina kanitlamaz
- `10-20s` bucket iyilesti ama deterministic avg survival `22.3s` -> `21.6s` geriledi
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
- bucket kazanci `30s cap` conversion'da bedel yaratmis olabilir; sonraki tur bu tradeoff'u netlestirmeli

---

# Observations

- tek parametreli speed tuning, pacing'i bozmadan `10-20s` bucket'ini `8`den `7`ye cekti
- ayni degisiklik `20-30s` bandini buyutup `30s cap` sayisini `10`dan `8`e indirdi
- bir sonraki gameplay tuning turu bucket kazancini korurken avg survival'i yeniden `22s+` bandina tasimaya odaklanmali
- validation altyapisini buyutmeden gameplay iteration'a donmek artik daha mantikli
