# MASTER_PLAN.md
Last Updated: 2026-03-09
Updated By: God Agent, Divine Integration

---

# Product Arc

## Phase 1 - Human-Proven Survival Core
Goal:
Deterministic olarak iyi gorunen survival loop'unu insan oyuncu gozunde de adil, okunur ve tekrar oynanir hale getirmek.

Exit Criteria:
- 5-10 run'lik ilk manuel sample notlari alinmis
- replay/start/pause/control hissi icin acik bulgu var
- first-death riski icin insan gozunden en az bir net kok neden kaydi var

## Phase 2 - Session Depth And Identity
Goal:
Core survival loop oturduktan sonra oyuna "neden tekrar oynayayim?" cevabi veren hafif meta katmanlari eklemek.

Candidate Themes:
- score pressure
- near-miss / combo
- obstacle archetypes
- stronger run identity

## Phase 3 - Systemization And Scalability
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

1. Human evidence over proxy confidence
2. New gameplay insight over telemetry/copy churn
3. Clear phase progress over isolated local wins
4. Architectural simplification only when it unlocks phase progress

---

# Current Week Mission

Haftanin misyonu:
Fairness tuning doneminden cikip "human-proven core" donemine girmek.

Bu nedenle builder agentlar:

- ayni telemetry semantics alanina donmeyecek
- varsa interactive browser ile manuel sample toplayacak
- yoksa yeni gameplay problemi sececek ama bunu `6.3s` outlier veya benzeri gercek urun baskisina baglayacak

---

# Non-Goals For This Week

- buyuk content expansion
- deploy polish
- yeni validation katmanlari
- sadece copy / panel wording guncellemesi
- gerekcesiz refactor
