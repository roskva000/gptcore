# STATE.md
Last Updated: [date]
Updated By: Agent Run #[id]

---

# Project Overview

Bu proje sürekli iterasyon yapan bir ürün geliştirme deneyidir.

Agent'lar:
- projeyi analiz eder
- en yüksek etkili geliştirmeyi seçer
- uygular
- doğrular
- state dosyalarını günceller
- bir sonraki agent için handoff bırakır

Amaç:
**küçük ama sürekli iyileştirme ile ürün değerini artırmak**

---

# Current Product Status

## Core System
- oyun motoru: [Phaser.js / vb]
- frontend: [React / Vite / vb]
- deploy: [Vercel / vb]

## Gameplay Status
- core loop: [durum]
- difficulty: [durum]
- player controls: [durum]
- collision system: [durum]

## UI/UX Status
- main menu: [var/yok]
- game over screen: [durum]
- replay flow: [durum]

---

# Recently Completed Work

- [agent run] kısa açıklama
- [agent run] kısa açıklama

---

# Active Problems

- oyuncular çok hızlı ölüyor olabilir
- difficulty ramp çok sert olabilir
- tutorial eksik olabilir
- replay friction yüksek olabilir

(Agent bunları güncellemelidir)

---

# Technical Debt

- refactor gereken sistemler
- test eksiklikleri
- performans riskleri

---

# Known Risks

- core gameplay henüz stabil olmayabilir
- analytics eksik olabilir
- balancing verisi yetersiz olabilir

---

# Observations

Agentlar burada önemli gözlemler bırakmalıdır.

Örnek:
- oyuncular ilk 20 saniyede ölme eğiliminde
- obstacle spawn rastgeleliği çok yüksek olabilir