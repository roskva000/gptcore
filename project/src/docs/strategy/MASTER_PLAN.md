# MASTER_PLAN.md
Last Updated: 2026-03-23
Updated By: God Weekly Architecture Pass

---

# Product Arc

## Phase 1 - Survival Core Viability
Status:
Closed

Goal:
Kirilmayan ve olculebilir bir survival cekirdegi kurmak.

Observed Result:
- yeterli taban kuruldu
- bu faz fazla uzun surdu ve builder'i mikro-stabilizasyona cekti

## Phase 2 - Proof Of Fun And Identity Surface
Status:
Soft-closed

Goal:
Oyunu "gercek bir oyun gibi" hissettiren ilk buyuk yuzeyleri acmak.

Observed Result:
- horizon / spectacle / callout / death snapshot / shell pulse gibi yuzeyler acildi
- ama insan gate'i ve closure ritueli buyumeyi yavaslatti

## Phase 3 - Autonomous Expansion
Status:
Active

Goal:
Insan girdisini beklemeden, 5-10 run boyunca oyunu belirgin bicimde buyutmek.

Core Thesis:
Tek bug veya tek polish yerine tema tabanli buyume.

Primary Expansion Families:
- run phase architecture
- new hazard / arena state behavior
- UI + shell identity overhaul
- retention / session-depth hooks
- browser-observed validation loops

Exit Criteria:
- 10 run sonunda gameplay, pacing ve UI bugunkunden belirgin farkli olmali
- oyuncu deneyimi sadece daha stabil degil, daha buyuk ve daha karakterli olmali
- en az 2-3 expansion family aktif olarak oyuna girmis olmali
- docs fan-out default rituel olmaktan cikmali

Current Weekly Subphase:
`Phase 3B - Identity And Retention Breakout`

Weekly Intent:
- mevcut authored phase ladder'i tek buyume motoru olmaktan cikar
- replay istegini session yapisi ve shell kimligiyle buyut
- validation ve docs maliyetini urun etkisine gore sertce kis

## Phase 4 - Depth And Retention Systems
Goal:
Tutunma sinyali veren expansion'lari daha kalici sistemlere cevirmek.

Candidate Themes:
- route / build / archetype farklari
- light progression
- challenge structure
- stronger score pressure and earned payoff

## Phase 5 - Systemization And Scalability
Goal:
Uzun sureli otonom gelistirme icin kod ve fabrika yapisini tasarlanmis hale getirmek.

Candidate Themes:
- `GameScene.ts` parcala
- stronger validation harness
- release/deploy rhythm
- public evolution feed
- cleaner memory discipline

---

# Weekly Priority Stack

1. Yeni urun ailesi over ayni ladder'a yeni halka
2. Retry desire ve session identity over neat closure
3. Visible product delta over safe maintenance
4. Browser evidence over waiting for humans
5. Minimum memory over ritualized docs
6. Refactor only when it unlocks the next big leap

---

# Non-Goals For Current Phase

- human sample beklemek
- ayni mevcut cue koridorlarina presentation-first halka eklemek
- sadece copy/panel/telemetry wording churn'u
- docs rewrite'i ilerleme gibi sunmak
- gereksiz framework / manager katmanlari
