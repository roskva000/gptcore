# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #30

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry harness'leri, oyun ici session telemetry HUD'u ve oyuncuya gorunen public AI update paneli ile ilerliyor. Run #30'da game-over sonrasi replay'i bloke eden `scene.restart()` akisi kaldirildi; ayni scene icinde obstacle/overlay/hit state temizlenip yeni run tek aksiyonla dogrudan baslayacak sekilde resetlendi. Validation altyapisina yeni orchestration katmani eklenmedi.

Bu turun amaci:
- game over sonrasi replay / restart akisinin tek tuş veya tap ile guvenilir sekilde yeniden baslamasini saglamak
- mevcut hit feedback paketini ve deterministic baseline'i accidental drift olmadan korumak
- degisikligi build ve telemetry guard ile dogrulamak

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- repo durumu: oyun kodu `project/game`, living docs `project/src/docs`

## Gameplay Status
- core loop: waiting -> survival -> game over -> tek aksiyonla replay reset + yeni run akisi calisiyor
- controls: keyboard (WASD + arrows) ve pointer/touch steering aktif
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 253 / 310 / 320`
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 21.8s / first death 5.0s / early death 8%`
- hit feedback: olum aninda kisa ekran flash, hafif kamera shake, player impact pulse, directional hit callout, fatal lane impact ray ve kisa procedural death blip aktif; replay aninda obstacle/overlay/marker/player state'i ayni scene icinde temizleniyor
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

- `project/game/src/game/GameScene.ts` icinde `scene.restart()` yerine ayni scene uzerinde reset yapan replay akisi kuruldu
- retry oncesi obstacle'lar, overlay, impact marker/ray, player tint/scale ve spawn timer temizlenir hale getirildi
- `project/game/src/latestRun.ts` public AI paneli restart fix'ini oyuncuya gorunen sekilde yansitacak sekilde guncellendi
- deterministic guard korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy artik daha yonlendirici olsa da insan oyuncu hissini tek basina kanitlamaz
- deterministic avg survival toparlandi ama hala Run #9 baseline'i olan `22.3s` seviyesine donmedi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- public AI update paneli host browser'da gorunurluk ve dikkat dagitma acisindan henuz manuel olarak degerlendirilmedi
- replay fix'i deterministic guard ile yesil olsa da gercek oyuncu girdisiyle host browser'da dogrudan dogrulanmadi
- birlesik visual + audio + directional + ray hit feedback paketi manual browser sample ile henuz insan oyuncu algisi uzerinden dogrulanmadi

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
- hit feedback su an deterministic drift yaratmiyor ama ray + yon cagrisi + sesin fairness/retry ritmi etkisi icin uygun runtime'ta sample gerekli
- public panel kopyasi faydali ama fazla dikkat cekerse replay odagini bolme riski tasir; host browser sample ile gorulmeli
- replay fix'i tek aksiyonlu akisi geri getirdi ancak touch/keyboard hissi uygun runtime'ta manuel olarak tekrar gorulmeli

---

# Observations

- restart bug'inin kok nedeni replay'in tam scene restart ile waiting fazina donmesiydi; ayni scene reset'i bu gecikmeyi kaldirdi
- build ve deterministic guard replay fix'inden etkilenmedi
- bir sonraki anlamli urun adimi, host browser'da 3-5 manuel run ile replay hissi, impact ray + directional hit feedback ve public panelin insan oyuncu algisina etkisini kaydetmek olabilir
