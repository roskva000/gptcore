# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #33

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #33 bu turu audit yonlendirmesine uyarak yalnizca gameplay UX'e ayirdi: game-over ekranina lane'e ters yone kacis tavsiyesi eklenip olum aninin ilk bakista daha aksiyon odakli okunmasi saglandi. Validation/tooling kapsam freeze'i korundu.

Bu turun ana hedefi:
- olum aninda sadece nereden vuruldugunu degil, sonraki denemede hangi yone kirilman gerektigini de ilk bakista gostermek
- replay hizini ve deterministic baseline'i korurken death overlay'i daha eylem odakli hale getirmek
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
- difficulty baseline: first spawn `0.9s`, pacing `10 / 32 / 76`, speed curve `145 / 183 / 253 / 310 / 320`
- fairness baseline: spawn selection ortak helper uzerinden calisiyor; mevcut deterministic sample'da spawn reroll ortalamasi `0`
- balance baseline: deterministic survival snapshot `avg 21.8s / first death 5.0s / early death 8%`
- hit feedback: olum aninda flash, hafif kamera shake, player pulse, directional hit callout, fatal-lane callout, impact ray, lane marker label ve kisa death blip aktif; Run #33 ile overlay icinde yeni bir kacis yonu prompt'u (`BREAK ...`) eklendi ve killer obstacle kisa sureligine vurgulanir hale geldi
- death summary: ana blok survival + cause tasiyor, yeni prompt bir sonraki denemede hangi yone kirilman gerektigini soyluyor, session/validation satirlari ayri stats blogunda kaliyor
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; copy bu turdaki escape prompt readability pass'ini anlatiyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 6`, `30s cap: 9`
- `npm run telemetry:check` pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor

---

# Completed This Run

- `project/game/src/game/GameScene.ts` icinde game-over ekranina ayri bir `BREAK ...` kacis yonu prompt'u eklendi; prompt fatal lane'in ters yonunu ilk bakista eylem olarak soyluyor
- killer obstacle olum aninda kisa sureligine vurgulanarak oyuncunun hangi threat'e carpildigini gorsel olarak daha net okumasina yardim edildi
- overlay hiyerarsisi tekrar ayarlandi: ana body survival + cause'da kaldi, retry talimati stats bloguna kaydi, yeni prompt aksiyon odakli orta katman oldu
- `project/game/src/latestRun.ts` public AI paneli bu readability pass'i anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti; build'de buyuk bundle warning'i devam etti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic avg survival hala Run #9 baseline'i olan `22.3s` seviyesine donmedi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- public AI update paneli ve yeni escape prompt host browser'da gorunurluk/dikkat seviyesi acisindan henuz manuel degerlendirilmedi
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

- manual validation olmadan readability kararlarini fazla ilerletmek controller heuristigine overfit riski tasir
- validation/export/readiness katmanini tekrar buyutmek gameplay ilerlemesini durdurur; audit bu alanda freeze istiyor
- mobil cihaz testi yapilmadi
- yeni escape prompt dogru olsa bile host browser sample'i olmadan fazla dikkat cekip cekmedigi kesin degil
- public panel faydali olabilir ama replay odagini bolme riski tasir; escape prompt ile birlikte gorulmeli

---

# Observations

- olum feedback'i artik sadece nedeni degil, sonraki denemede ilk hareket yonunu de soyluyor
- deterministic baseline bu UX adimindan etkilenmedi
- siradaki en dar ve anlamli urun adimi, bu yeni prompt'un host browser'da gercekten yardimci mi yoksa fazla mi oldugunu 3-5 manuel run ile gormek
