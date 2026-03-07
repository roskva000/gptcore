# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #8

---

# Project Overview

Survive 60 Seconds artik oynanabilir prototype uzerinde local telemetry gosteren, scripted balance tuning'i gecmis ve manual validation icin session odakli telemetry araclarina ek olarak iki repo-ici browserless harness'i olan bir build'e sahip.

Bu turun amaci:
- manual validation bloklu oldugu icin browser disinda da erken-oyun riskini olcecek ikinci bir baseline eklemek
- spawn fairness mantigini scene ve script tarafinda ortak kullanmak
- sonraki agent icin obstacle-speed tuning kararlarini daha dar ve karsilastirilabilir hale getirmek

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- deploy: henuz yok
- repo durumu: calisan oyun kodu `project/game` altinda, living docs `project/src/docs` altinda

## Gameplay Status
- core loop: oynanabilir; waiting -> survival -> game over -> instant restart akisi korunuyor
- difficulty: obstacle speed ayni; spawn delay Run #5'te 900ms tabanindan 1050ms tabanina cekildi, yani ilk saniyelerde obstacle yogunlugu dusuruldu
- fairness tuning: obstacle spawn'i oyuncuya fazla yakin dogarsa en fazla 6 kez reroll ediliyor; uygun aday bulunamazsa en iyi aday kullaniliyor
- spawn secimi: scene ve script tarafinda ortak `spawn.ts` helper'i kullaniliyor; spawn reroll/fairness kurali artik tek yerde tanimli
- controls: keyboard (WASD + arrows) ve basili pointer/touch steering calisiyor
- collision/score: Phaser Arcade overlap ile olum algilaniyor, skor yasama suresi olarak saniye bazli gosteriliyor

## Telemetry / UX Status
- telemetry: oyun icinde telemetry blogu artik session ve lifetime sample'i ayri gosteriyor; run count, avg survival, `<10s` early death orani, avg retry gap, recent death times ve spawn reroll sayilari session bazinda okunabiliyor
- persistence: lifetime telemetry localStorage key `survive-60-seconds-telemetry-v1`, ayni tab icindeki session sample ise sessionStorage key `survive-60-seconds-session-telemetry-v1` altinda tutuluyor
- manual validation controls: `R` tum telemetry sample'ini sifirliyor, `C` session + lifetime summary'yi console'a basiyor
- repo-ici balance harness: `npm run telemetry:snapshot` balance curve, ilk spawn zamani, 10s/30s/60s spawn adetleri ve ilk 10 spawn zamanini browser disinda uretiyor
- repo-ici survival harness: `npm run telemetry:survival-snapshot` ayni spawn delay/speed/fairness kurallari ile 24 deterministic seed uzerinden basit bir kacis controller'i calistirip avg survival, first death ve early death oranini browser disinda veriyor
- game over screen: final sureye ek olarak session avg survival, early death, retry ve spawn summary gosteriliyor
- onboarding: kontrol metni artik oyuncuya sample reset ve telemetry summary shortcut'larini da soyliyor
- replay flow: Space, Enter veya tap ile restart; build'e gore hizli akis korunuyor
- latest scripted telemetry comparison:
  - method: headless local Chromium, ayni steering policy, runlar arasi page reload, 18s cap; cap'a ulasan run script tarafinda kapatildi
  - baseline before tuning: first death 8.7s, avg survival 10.8s, early death 60%, avg retry 1.9s, forced end 1/5
  - current after tuning: first death 11.0s, avg survival 14.3s, early death 20%, avg retry 2.0s, forced end 2/5
- latest deterministic balance snapshot:
  - first spawn: 0.9s
  - predicted spawn count: 10s icinde 10, 30s icinde 32, 60s icinde 76 obstacle
  - speed curve: 0s 150 -> 10s 190 -> 30s 270 -> 45s+ 320
  - fairness distance floor: 10s'de 140'a iniyor ve sonrasinda sabit kaliyor
- latest deterministic survival snapshot:
  - method: 24 seed, 30s cap, 180ms reaction interval, effective player speed 214, same spawn delay/speed/fairness rules
  - result: avg survival 21.5s, first death 3.4s, best 30.0s, early death 21%
  - sample signal: bazi seed'lerde 6-11s olumu var; bu nedenle mevcut balance human validation beklerken bile tamamen guvenli kabul edilmemeli

---

# Recently Completed Work

- [Run #2] `project/game` altinda minimal Vite + Phaser oyun projesi kuruldu
- [Run #2] ilk oynanabilir core gameplay loopu, zaman skoru, difficulty ramp ve replay akisi eklendi
- [Run #2] state ve roadmap dokumanlari repo gercegine gore yeniden yazildi
- [Run #3] deploy'u kiren WASD input bug'i duzeltildi; oyun artik ilk frame'de crash olmuyor
- [Run #4] local telemetry paneli, console eventleri ve localStorage persistence eklendi
- [Run #4] game over overlay'i avg survival, early death ve retry/spawn summary ile genislendi
- [Run #4] obstacle spawn'lari icin yakin dogumlari azaltan fairness reroll tuning'i eklendi
- [Run #4] `npm run build` tekrar basarili calisti
- [Run #5] tekrarlanabilir 5 run scripted telemetry sample ile baseline cikarildi
- [Run #5] yalnizca spawn delay grubu tune edildi; initial spawn delay 1050ms'e cekildi
- [Run #5] ayni telemetry sample ile tuning sonrasi first death 11.0s ve avg survival 14.3s olarak tekrar olculdu
- [Run #5] `npm run build` tekrar basarili calisti
- [Run #6] telemetry paneli session ve lifetime sample'lari ayiracak sekilde guncellendi
- [Run #6] `R` ile telemetry reset ve `C` ile session/lifetime summary console export akisi eklendi
- [Run #6] game over ve onboarding metinleri manual validation akisina gore yenilendi
- [Run #6] `npm run build` tekrar basarili calisti
- [Run #7] gameplay balance sabitleri `project/game/src/game/balance.ts` altina cikarildi
- [Run #7] `npm run telemetry:snapshot` ile browser gerektirmeyen deterministic balance snapshot harness'i eklendi
- [Run #7] snapshot ile ilk spawn zamani, speed curve ve 10s/30s/60s spawn yogunlugu kayda alindi
- [Run #7] `npm run build` ve `npm run telemetry:snapshot` basarili calisti
- [Run #8] spawn fairness secimi `project/game/src/game/spawn.ts` altinda ortak helper'a cikarildi
- [Run #8] `npm run telemetry:survival-snapshot` ile browserless deterministic survival harness'i eklendi
- [Run #8] survival snapshot ile avg survival 21.5s, first death 3.4s ve early death 21% baseline'i kayda alindi
- [Run #8] `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` basarili calisti

---

# Active Problems

- scripted sample iyilesti ama post-tune sample'da hala 7.1s'lik bir run var
- henuz gercek manual/human telemetry sample toplanmadi
- yeni survival harness ilk olumun 3.4s'e kadar dusebildigini gosteriyor; bu sinyal human sample degil ama erken-game riskinin tamamen kapanmadigini isaret ediyor
- deterministic snapshot spawn yogunlugunu gorunur kilsa da oyuncu davranisini ve unfair death hissini tek basina kanitlamiyor
- mevcut fairness tuning sadece yakin spawn filtresi; spawn telegraph, hit feedback ve daha derin zorluk ayari henuz yok
- ses, pause, menu ve polish katmanlari yok
- spawn reroll metrigi bu turdaki karsilastirmalarda 0 kaldi; bu nedenle yakin spawn filtresinin saha etkisi henuz dogrulanmadi

---

# Technical Debt

- automated test yok; browserless harness'ler regression guard olarak kullaniliyor ama assertion tabanli test degiller
- gameplay, telemetry ve UI metinleri hala `GameScene.ts` icinde toplu duruyor
- balance sabitleri ayri config dosyasina alinmadi
- production bundle buyuk; Phaser tek chunk olarak geliyor
- browser tabanli scripted steering sample hala repoda yok; bunun yerine deterministic balance + survival snapshot repoda mevcut

---

# Known Risks

- telemetry browser storage tabanli; cihazlar arasi tasinmiyor ve sifirlanabilir
- bu turda calisma ortaminda tarayici olmadigi icin manual sample toplanamadi; oyun balance'i insan inputuyla hala onay bekliyor
- scripted sample runlar arasi page reload ve 18s cap kullandigi icin replay metrigi icin muhafazakar ama yapay bir ust sinir tasiyor
- deterministic balance snapshot dogrudan survival sonucu vermiyor; yalnizca pacing/speed eğrisini sabit bir referans olarak sagliyor
- deterministic survival snapshot gercek oyuncu degil; controller heuristigi nedeniyle absolute truth sayilmamali, ama seed bazli erken-olum riskini karsilastirmak icin kullanisli
- mobil cihaz testi yapilmadi
- spawn telegraph olmadigi icin yuksek zorlukta okunabilirlik hala sinirli olabilir
- build warning'i bundle boyutunun ileride optimize edilmesi gerektigini gosteriyor

---

# Observations

- ayni telemetry senaryosunda spawn delay tuning'i first death'i 8.7s -> 11.0s, avg survival'i 10.8s -> 14.3s ve early death oranini 60% -> 20% tasidi
- retry gap 2.0s ile hedefin altinda kaldi; replay hizi bu muhafazakar reset modelinde bile kabul edilebilir
- spawn reroll sayisi 0 kaldigi icin bu turdaki problem yogunluktu, spawn fairness degil
- snapshot harness mevcut tuning'in ilk 10 saniyede 10 spawn ve 10s'te 190 speed hedefine oturdugunu kayda gecirdi
- survival harness mevcut ayarda 24 seed'in %21'inde 10s alti olum verdigi icin bir sonraki dar tuning karari icin obstacle speed egirisi en guclu aday haline geldi
- session telemetry ayrimi ve iki snapshot harness ile sonraki mantikli adim yeni feature eklemek degil, dar bir speed tuning'ini bu baseline'lara karsilastirmaktir
