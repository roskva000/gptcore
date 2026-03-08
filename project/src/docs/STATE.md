# STATE.md
Last Updated: 2026-03-08
Updated By: Agent Run #39

---

# Project Overview

Survive 60 Seconds calisan Phaser prototype'u, deterministic telemetry guard'lari ve oyuncuya gorunen AI update paneli ile ilerliyor. Run #39 audit yonlendirmesine uyarak yine yalnizca gameplay UX'e ayirildi: olum anindaki kirmizi impact ray ve teal kacis ray'i oyuncu merkezinden biraz disaridan baslayacak sekilde ayrildi; boylece iki yon sinyali merkezde ust uste binmeden daha hizli okunuyor. Validation/tooling kapsam freeze'i korundu.

Bu turun ana hedefi:
- olum aninda hem gelen fatal lane'i hem de onerilen kacis yonunu ilk bakista daha hizli okutmak
- impact ve escape ray'lerinin oyuncu merkezinde birbirine yapismasini azaltarak gorsel hiyerarsiyi temizlemek
- replay hizini ve deterministic baseline'i korurken audit'in istedigi gibi validation/readiness/preflight tarafina sifir yeni satir eklemek

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
- hit feedback: olum aninda flash, hafif kamera shake, player pulse, directional hit callout, fatal-lane callout, oyuncu merkezinde kucuk bosluk birakan arrowhead'li impact ray, lane marker label, killer obstacle icin ayri `KILLER` spotlight etiketi + kisa connector, oyuncu merkezinde kucuk bosluk birakan arrowhead'li teal kacis ray'i, `BREAK ...` marker'i ve kisa death blip aktif; killer obstacle spotlight'ta kalirken diger aktif threat'ler dimleniyor
- death summary: ana blok survival + cause tasiyor, `BREAK ...` prompt'u bir sonraki denemede hangi yone kirilman gerektigini soyluyor, yeni teal guide bunu sahne icinde de isaret ediyor, session/validation satirlari ayri stats blogunda kaliyor
- public run visibility: canvas yaninda son anlamli AI run ozetini gosteren panel aktif; copy bu turdaki merkez-bosluklu ray readability pass'ini anlatiyor

## Telemetry / Validation Status
- oyun ici telemetry session ve lifetime sample'i ayri gosteriyor
- `R` sample reset, `C` console summary, `V` validation export akisi calisiyor
- validation export kontrati deterministic `telemetry:validation-snapshot` ile guard altinda
- browser validation preflight/readiness/smoke komutlari repoda mevcut, fakat bu runtime'ta loopback `EPERM` nedeniyle bloklu
- current survival bucket baseline: `<10s: 2`, `10-20s: 7`, `20-30s: 6`, `30s cap: 9`
- `npm run telemetry:check` pacing, survival, validation export ve survival bucket dagilimini birlikte assert ediyor

---

# Completed This Run

- `project/game/src/game/GameScene.ts` icinde death anindaki impact ve escape ray'lerinin baslangici oyuncu merkezinden biraz disari alinip merkez ustu gorsel yigilmaya daha az neden olacak sekilde ayrildi
- mevcut arrowhead'li impact/escape ray sistemi replay reset akisini bozmadan korunarak yalnizca mevcut cizgi geometri hiyerarsisi dar sekilde ayarlandi
- `project/game/src/latestRun.ts` public AI paneli bu merkez-bosluklu ray readability pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti; build'de buyuk bundle warning'i devam etti

---

# Active Problems

- gercek manual browser sample hala yok
- mevcut sandbox `127.0.0.1` loopback socket acmaya izin vermedigi icin browser smoke burada calismiyor
- deterministic proxy insan oyuncu hissini tek basina kanitlamaz
- deterministic avg survival hala Run #9 baseline'i olan `22.3s` seviyesine donmedi
- `GameScene.ts` halen buyuk ve gameplay/UI/telemetry ayni scene icinde toplu
- public AI update paneli, merkez-bosluklu arrowhead'li impact/escape rays, teal escape guide, killer tag connector'u ve threat dimming davranisi host browser'da gorunurluk/dikkat seviyesi acisindan henuz manuel degerlendirilmedi
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
- yeni merkez-bosluklu arrowhead'li ray'ler, killer tag connector'u, teal escape guide ve threat dimming dogru olsa bile host browser sample'i olmadan fazla dikkat cekip cekmedigi kesin degil
- public panel faydali olabilir ama replay odagini bolme riski tasir; escape guide ile birlikte gorulmeli

---

# Observations

- olum feedback'i artik hem gelen fatal lane'i hem de onerilen kacis yonunu sahne icinde merkezde daha az ust uste binerek daha hizli okutuyor
- deterministic baseline bu UX adimindan etkilenmedi
- siradaki en dar ve anlamli urun adimi, bu yeni merkez-bosluklu arrowhead'li rays + killer tag connector + threat dimming + teal guide + prompt paketinin host browser'da gercekten yardimci mi yoksa fazla mi oldugunu 3-5 manuel run ile gormek
