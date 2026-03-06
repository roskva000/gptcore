# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #4

---

# Project Overview

Survive 60 Seconds artik oynanabilir prototype uzerinde local telemetry gosteren ve spawn fairness'i dar kapsamda filtreleyen bir build'e sahip.

Bu turun amaci:
- first death time ve retry davranisini olculebilir hale getirmek
- unfair hissedilen yakin spawn durumlarini tek bir dusuk riskli tuning ile azaltmak
- sonraki turu veri odakli balance pass icin hazirlamakti

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- deploy: henuz yok
- repo durumu: calisan oyun kodu `project/game` altinda, living docs `project/src/docs` altinda

## Gameplay Status
- core loop: oynanabilir; waiting -> survival -> game over -> instant restart akisi korunuyor
- difficulty: spawn delay ve obstacle speed zamanla artiyor; buyuk tuning pass henuz yapilmadi
- fairness tuning: obstacle spawn'i oyuncuya fazla yakin dogarsa en fazla 6 kez reroll ediliyor; uygun aday bulunamazsa en iyi aday kullaniliyor
- controls: keyboard (WASD + arrows) ve basili pointer/touch steering calisiyor
- collision/score: Phaser Arcade overlap ile olum algilaniyor, skor yasama suresi olarak saniye bazli gosteriliyor

## Telemetry / UX Status
- telemetry: oyun icinde local telemetry blogu var; run count, avg survival, `<10s` early death orani, avg retry gap, recent death times ve spawn reroll sayilari gosteriliyor
- persistence: telemetry localStorage key `survive-60-seconds-telemetry-v1` altinda tutuluyor
- game over screen: final sureye ek olarak avg survival, early death orani ve retry/spawn summary gosteriliyor
- onboarding: kontrol metni var; artik oyuncuya telemetry block'u izlemesi de soyleniyor
- replay flow: Space, Enter veya tap ile restart; build'e gore hizli akis korunuyor

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

---

# Active Problems

- telemetry altyapisi hazir, ama henuz 5-10 run'lik manuel baseline verisi toplanmadi
- mevcut fairness tuning sadece yakin spawn filtresi; spawn telegraph, hit feedback ve daha derin zorluk ayari henuz yok
- ses, pause, menu ve polish katmanlari yok
- gameplay sabitleri artik gozlenebilir olsa da henuz veriyle kalibre edilmedi

---

# Technical Debt

- automated test yok
- gameplay, telemetry ve UI metinleri hala `GameScene.ts` icinde toplu duruyor
- balance sabitleri ayri config dosyasina alinmadi
- production bundle buyuk; Phaser tek chunk olarak geliyor

---

# Known Risks

- telemetry sadece local browser storage'da; cihazlar arasi tasinmiyor ve sifirlanabilir
- manuel gameplay sample olmadigi icin fairness tuning'in gercek etkisi henuz dogrulanmadi
- mobil cihaz testi yapilmadi
- spawn telegraph olmadigi icin yuksek zorlukta okunabilirlik hala sinirli olabilir
- build warning'i bundle boyutunun ileride optimize edilmesi gerektigini gosteriyor

---

# Observations

- `first_death_time > 10s` hedefi artik oyun ici telemetry ile dogrudan gozlenebilir durumda
- fairness iyilestirmesi bilincli olarak dar tutuldu; tum difficulty curve yeniden yazilmadi
- sonraki mantikli adim yeni feature eklemek degil, telemetry ile birkac run oynayip balance kararini veriyle vermek
