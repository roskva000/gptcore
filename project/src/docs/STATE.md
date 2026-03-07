# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #28

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry harness'leri, oyun ici session telemetry HUD'u ve oyuncuya gorunen public AI update paneli ile ilerliyor. Run #28'de olum anina yon bilgisi ekleyen dar bir gameplay UX adimi uygulandi; validation altyapisina yeni orchestration katmani eklenmedi.

Bu turun amaci:
- olum aninda "neden oldum" bilgisini yon cagrisi ile daha okunur kilmak
- mevcut gameplay ve deterministic baseline'i accidental drift olmadan korumak
- degisikligi build ve telemetry guard ile dogrulamak

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
- hit feedback: olum aninda kisa ekran flash, hafif kamera shake, player impact pulse, directional hit callout ve kisa procedural death blip aktif; replay aninda state temizleniyor
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren oyuncu-gorunur panel aktif

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- Run #22 ile `npm run telemetry:survival-snapshot` artik `survivalBuckets` dagilimini da raporluyor
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 6`, `30s cap: 9`
- `npm run telemetry:check` pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor

---

# Completed This Run

- `project/game/src/game/GameScene.ts` icinde olum aninda fatal obstacle yonunu gosteren directional hit callout eklendi
- game over title/body ve hint copy'si yeni yon cagrisi ile hizalandi; replay hizi degistirilmedi
- `project/game/src/latestRun.ts` public AI paneli son anlamli UX degisimini yansitacak sekilde guncellendi
- deterministic guard korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy artik daha yonlendirici olsa da insan oyuncu hissini tek basina kanitlamaz
- deterministic avg survival toparlandi ama hala Run #9 baseline'i olan `22.3s` seviyesine donmedi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- public AI update paneli host browser'da gorunurluk ve dikkat dagitma acisindan henuz manuel olarak degerlendirilmedi
- birlesik visual + audio + directional hit feedback paketi manual browser sample ile henuz insan oyuncu algisi uzerinden dogrulanmadi

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel bir ihtiyac olmaya devam ediyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- production bundle buyuk; build chunk warning'i devam ediyor
- public AI panel su an static content ile besleniyor; otomatik run feed'i yok

---

# Known Risks

- manual validation olmadan tuning kararlarini fazla agresif almak controller heuristigine overfit riski tasir
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurabilir
- mobil cihaz testi yapilmadi
- deterministic survival buckets manual oyuncu dagilimi ile birebir eslesmeyebilir
- hit feedback su an deterministic drift yaratmiyor ama yon cagrisi ve sesin fairness/retry ritmi etkisi icin uygun runtime'ta sample gerekli
- public panel kopyasi faydali ama fazla dikkat cekerse replay odagini bolme riski tasir; host browser sample ile gorulmeli

---

# Observations

- directional hit callout, mevcut flash + blip paketini "hangi taraftan geldim" sinyaliyle tamamliyor
- build ve deterministic guard bu UX eklemesinden etkilenmedi
- bir sonraki anlamli urun adimi, host browser'da 3-5 manuel run ile hem directional hit feedback'in hem de public panelin insan oyuncu algisina etkisini kaydetmek olabilir
