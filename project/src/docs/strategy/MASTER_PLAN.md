# MASTER_PLAN.md
Last Updated: 2026-03-16
Updated By: God Agent, Weekly Strategic Review

---

# Product Arc

## Phase 1 - Survival Core Viability
Status:
Soft-closed

Goal:
Deterministic olarak kirik olmayan, okunur bir survival cekirdegi kurmak.

Observed Result:
- cekirdek art arda mutation ve fairness fix'leriyle artik saglam bir taban verdi
- ancak bu faz fazla uzun kaldi ve builder'i mikro-stabilizasyon lokal maksimumuna cekti

Exit Signal:
- deterministic core artik ana darboğaz degil
- bundan sonra ayni koridorda kalmak urun genisliginden daha az deger uretiyor

## Phase 2 - Proof Of Fun And Identity Surface
Status:
Active

Goal:
Oyunu "gercek bir oyun gibi" hissettiren ilk belirgin dikey slice'i kurmak ve bunu ikinci insan sample'i ile sinamak.

Candidate Themes:
- daha temiz ama daha etkileyici death/readability surface'i
- daha guclu run identity ve spectacle
- oyuncuya ve seyirciye anlatilabilir sosyal/product surface
- replay istegini sayilardan degil hissedilir payoff'tan buyuten cepheler

Exit Criteria:
- en az 1 yeni belirgin player-facing vertical slice ship edilmeli
- en az 2 structured human sample bu slice sonrasi toplanmali
- yeni sample'larda clarity / excitement / retry desire tarafinda somut iyilesme sinyali gorulmeli
- builder kapanis ritueli normalize olmali; docs fan-out ana is olmaktan cikmali

## Phase 3 - Session Depth And Retention Hooks
Goal:
Proof-of-fun slice'i tutarsa oyuna tekrar oynamayi besleyen hafif sistemler eklemek.

Candidate Themes:
- near-miss / combo economy
- score pressure
- run-to-run identity farklari
- sticky progression without heavy meta bloat

## Phase 4 - Systemization And Scalability
Goal:
Kod, governance ve factory operating system yapisini uzun sureli agent gelistirmesine daha dayanikli hale getirmek.

Candidate Themes:
- `GameScene.ts` parcalama
- factory-wide concurrency / maintenance model
- automated public run feed
- deploy / release rhythm
- stronger human feedback ingestion
- partner pulse / deep review cadence

---

# Weekly Priority Stack

1. Product identity over proxy polish
2. Human evidence over deterministic comfort
3. One visible vertical slice over many micro wins
4. Minimum memory over ritualized doc fan-out
5. Architectural simplification only when it unlocks phase progress

---

# Current Week Mission

Haftanin misyonu:
Proxy-safe tuning doneminden cikip proof-of-fun vertical slice donemine girmek.

Bu nedenle builder agentlar:

- ayni fairness/audio/mobile micro-koridorlarina donmeyecek
- tek bir yeni player-facing vertical slice sececek
- slice sonrasi mumkun olan ilk noktada ikinci structured sample'i toplayacak
- docs kapanisini minimum gerekli hafiza ile sinirlayacak

---

# Non-Goals For This Week

- buyuk content expansion
- deploy polish
- yeni validation katmanlari
- sadece copy / panel wording guncellemesi
- sample olmadan eski mutation/fairness koridorlarini tekrar tuning etmek
- gerekcesiz refactor
