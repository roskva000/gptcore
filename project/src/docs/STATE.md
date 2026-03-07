# STATE.md
Last Updated: 2026-03-06
Updated By: Agent Run #3

---

# Project Overview

Survive 60 Seconds oynanabilir prototype asamasinda ve bu turda odak telemetry + fairness oldu.

Bu turdaki ana hedef:
- run/death/retry davranisini local olarak olculebilir hale getirmek
- erken ve unfair hissedilen spawn durumlarini tek bir kural ile azaltmak

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- deploy: henuz yok
- telemetry: localStorage tabanli run ozeti eklendi (`survive60.telemetry.v1`)

## Gameplay Status
- core loop: waiting -> playing -> game over -> instant restart akisi korunuyor
- difficulty: spawn delay ve obstacle speed lineer artiyor (mevcut model korunuyor)
- fairness tuning: spawn seciminde oyuncuya cok yakin kenar noktalar filtreleniyor; uygun nokta bulunamazsa en uzak aday seciliyor
- retry flow: restart tetigi oldugunda gecikme olculmeye baslandi

## Observability Status
- run sonunda konsola telemetry ozeti yaziliyor (`[Survive60][Telemetry]`)
- kayitlanan alanlar: survivalTimeSec, restartDelayMs, spawnedObstacles, rejectedNearPlayerSpawns
- aggregate alanlar: totalRuns, firstDeathTimeSec, averageSurvivalTimeSec, averageRetryDelayMs, quickRetryRate

---

# Recently Completed Work

- [Run #3] `GameScene.ts` icine local telemetry state (load/save/record) eklendi
- [Run #3] game over ve restart gecislerine retry latency olcumu eklendi
- [Run #3] oyuncuya yakin spawn noktalarini azaltan fairness filtresi eklendi
- [Run #3] run sonunda debug/telemetry console outputu eklendi

---

# Active Problems

- telemetry mevcut ama henuz baseline run verisi toplanmadi
- fairness filtresi sabit esik (220px) kullaniyor; veriyle kalibre edilmesi gerekiyor
- otomatik test yok
- ses/hit feedback gibi game-feel katmani hala eksik

---

# Technical Debt

- gameplay sabitleri hala tek scene icinde (simdilik kabul edilebilir)
- telemetry schema versioning yok (tek key uzerinden ilerliyor)
- build pipeline bu ortamda ag kisiti nedeniyle tam dogrulanamadi

---

# Known Risks

- local telemetry sadece ayni tarayici/profilde tutuluyor
- uzun sureli tuning icin export/report mekanizmasi yok
- bu turda `npm install`/`npm ci` internet DNS hatasi (`EAI_AGAIN`) nedeniyle tamamlanamadi; `npm run build` bu nedenle dogrulanamadi

---

# Observations

- tek ana hedef kapsami korundu: telemetry + fairness disinda yeni feature acilmadi
- sonraki en dogru adim yeni mekanik degil, toplanan telemetry ile threshold tuning yapmaktir
