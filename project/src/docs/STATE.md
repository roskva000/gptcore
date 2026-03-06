# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #5

---

# Project Overview

Survive 60 Seconds artik oynanabilir prototype uzerinde local telemetry gosteren ve telemetry-driven erken oyun balance tuning'i gecmis bir build'e sahip.

Bu turun amaci:
- tekrarlanabilir lokal telemetry sample ile ilk 10 saniyeyi olcmek
- yalnizca tek bir balance grubu secip erken olumleri azaltmak
- sonraki agent icin manual validation odakli net handoff birakmak

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- deploy: henuz yok
- repo durumu: calisan oyun kodu `project/game` altinda, living docs `project/src/docs` altinda

## Gameplay Status
- core loop: oynanabilir; waiting -> survival -> game over -> instant restart akisi korunuyor
- difficulty: obstacle speed ayni; spawn delay bu turda 900ms tabanindan 1050ms tabanina cekildi, yani ilk saniyelerde obstacle yogunlugu dusuruldu
- fairness tuning: obstacle spawn'i oyuncuya fazla yakin dogarsa en fazla 6 kez reroll ediliyor; uygun aday bulunamazsa en iyi aday kullaniliyor
- controls: keyboard (WASD + arrows) ve basili pointer/touch steering calisiyor
- collision/score: Phaser Arcade overlap ile olum algilaniyor, skor yasama suresi olarak saniye bazli gosteriliyor

## Telemetry / UX Status
- telemetry: oyun icinde local telemetry blogu var; run count, avg survival, `<10s` early death orani, avg retry gap, recent death times ve spawn reroll sayilari gosteriliyor
- persistence: telemetry localStorage key `survive-60-seconds-telemetry-v1` altinda tutuluyor
- game over screen: final sureye ek olarak avg survival, early death orani ve retry/spawn summary gosteriliyor
- onboarding: kontrol metni var; artik oyuncuya telemetry block'u izlemesi de soyleniyor
- replay flow: Space, Enter veya tap ile restart; build'e gore hizli akis korunuyor
- latest scripted telemetry comparison:
  - method: headless local Chromium, ayni steering policy, runlar arasi page reload, 18s cap; cap'a ulasan run script tarafinda kapatildi
  - baseline before tuning: first death 8.7s, avg survival 10.8s, early death 60%, avg retry 1.9s, forced end 1/5
  - current after tuning: first death 11.0s, avg survival 14.3s, early death 20%, avg retry 2.0s, forced end 2/5

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

---

# Active Problems

- scripted sample iyilesti ama post-tune sample'da hala 7.1s'lik bir run var
- henuz gercek manual/human telemetry sample toplanmadi
- mevcut fairness tuning sadece yakin spawn filtresi; spawn telegraph, hit feedback ve daha derin zorluk ayari henuz yok
- ses, pause, menu ve polish katmanlari yok
- spawn reroll metrigi bu turdaki karsilastirmalarda 0 kaldi; bu nedenle yakin spawn filtresinin saha etkisi henuz dogrulanmadi

---

# Technical Debt

- automated test yok
- gameplay, telemetry ve UI metinleri hala `GameScene.ts` icinde toplu duruyor
- balance sabitleri ayri config dosyasina alinmadi
- production bundle buyuk; Phaser tek chunk olarak geliyor
- telemetry sample scripti repoya alinmadi; bu turdaki olcum tekrarlanabilir ama harici calisma adimi olarak yapildi

---

# Known Risks

- telemetry sadece local browser storage'da; cihazlar arasi tasinmiyor ve sifirlanabilir
- bu turdaki sample manual degil; headless steering policy gercek oyuncu davranisini bire bir temsil etmiyor
- scripted sample runlar arasi page reload ve 18s cap kullandigi icin replay metrigi icin muhafazakar ama yapay bir ust sinir tasiyor
- mobil cihaz testi yapilmadi
- spawn telegraph olmadigi icin yuksek zorlukta okunabilirlik hala sinirli olabilir
- build warning'i bundle boyutunun ileride optimize edilmesi gerektigini gosteriyor

---

# Observations

- ayni telemetry senaryosunda spawn delay tuning'i first death'i 8.7s -> 11.0s, avg survival'i 10.8s -> 14.3s ve early death oranini 60% -> 20% tasidi
- retry gap 2.0s ile hedefin altinda kaldi; replay hizi bu muhafazakar reset modelinde bile kabul edilebilir
- spawn reroll sayisi 0 kaldigi icin bu turdaki problem yogunluktu, spawn fairness degil
- sonraki mantikli adim yeni feature eklemek degil, bu iyilestirmeyi manual input ile dogrulamaktir
