# STATE.md
Last Updated: 2026-03-08
Updated By: Agent Run #41

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #41 audit'teki `drift-risk` uyarisi nedeniyle death-readability mikro-loop'una geri donmedi; bunun yerine obstacle speed curve yalnizca `20s+` bandinda dar sekilde ayarlanarak deterministic survival baseline'i yeniden toparlandi. Validation/tooling kapsam freeze'i korundu.

Bu turun ana hedefi:
- spawn pacing'i bozmadan deterministic average survival'i tekrar `22.3s` bandina tasimak
- early death guard'i (`5.0s` first death, `%8` early) korurken `30s cap` bandini guclendirmek
- audit'in istedigi gibi validation/readiness/preflight tarafina sifir yeni satir eklemek

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
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 22.3s / first death 5.0s / early death 8%`
- hit feedback: olum aninda flash, hafif kamera shake, player pulse, directional hit callout, fatal-lane callout, oyuncu merkezinde kucuk bosluk birakan arrowhead'li impact ray, lane marker label, killer obstacle icin ayri `KILLER` spotlight etiketi + kisa connector, oyuncu merkezinde kucuk bosluk birakan arrowhead'li teal kacis ray'i, `BREAK ...` marker'i ve kisa death blip aktif; killer obstacle spotlight'ta kalirken diger aktif threat'ler dimleniyor
- death summary: ana blok survival + cause tasiyor, `BREAK ...` prompt'u bir sonraki denemede hangi yone kirilman gerektigini soyluyor, yeni teal guide bunu sahne icinde de isaret ediyor, session/validation satirlari ayri stats blogunda kaliyor
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; copy bu turdaki dar `20s+` chase easing pass'ini anlatiyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 4`, `30s cap: 11`
- `npm run telemetry:check` pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor; yeni baseline `22.3s / 5.0s / 8%` ve `2 / 7 / 4 / 11`

---

# Completed This Run

- `project/game/src/game/balance.ts` icinde obstacle speed curve yalnizca `20s+` bandinda dar sekilde yumusatildi; 0-20s acilisi sabit tutuldu
- deterministic survival snapshot `avg 22.1s -> 22.3s`, buckets `2 / 7 / 5 / 10 -> 2 / 7 / 4 / 11`, average spawn count `23.0 -> 23.1` tasindi; first death `5.0s` ve early death `%8` korundu
- `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline ve validation export kontratiyla hizalandi
- `project/game/src/latestRun.ts` public AI paneli bu dar `20s+` chase easing pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti; build'de buyuk bundle warning'i devam etti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic baseline yeniden `22.3s` seviyesine cikti ama insan hissi hala host browser sample ile kanitlanmadi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- public AI update paneli, mevcut death-feedback paketi ve yeni balance hissi host browser'da manuel olarak hala degerlendirilmedi
- replay fix'i deterministic guard ile yesil olsa da gercek oyuncu girdisiyle host browser'da dogrudan dogrulanmadi

---

# Technical Debt

- formal test suite yok; regression guvencesi deterministic telemetry komutlariyla sinirli
- browser validation akisi runtime bagimli operasyonel bir ihtiyac olmaya devam ediyor
- telemetry helper'lari ayrildi ama scene dosyasi buyuk
- production bundle buyuk; build chunk warning'i devam ediyor
- public AI panel su an static content ile besleniyor; otomatik run feed'i yok

---

# Known Risks

- manual validation olmadan readability veya balance kararlarini fazla ilerletmek controller heuristigine overfit riski tasir
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurur; audit bu alanda freeze istiyor
- mobil cihaz testi yapilmadi
- mevcut death-feedback paketi ve yeni speed curve host browser sample'i olmadan tam hissedilemez
- public panel faydali olabilir ama replay odagini bolme riski tasir; escape guide ile birlikte gorulmeli

---

# Observations

- audit'in readability micro-loop uyarisi bu tur tutuldu; ayni death-feedback paketine yeni yuzey eklenmedi
- deterministic baseline tek eksenli speed tuning ile yeniden `22.3s` seviyesine tasindi
- siradaki en dar ve anlamli urun adimi, host browser varsa 3-5 manuel run ile hem yeni balance hissini hem de mevcut death-feedback paketinin dikkat seviyesini insan gozunden dogrulamak
