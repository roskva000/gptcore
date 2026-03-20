# CONCURRENCY_POLICY.md
Last Updated: 2026-03-21

Canli fabrikada write cakismasini engellemek icin kanonik politika.

---

## 1) Core Rule

**Tek repo, tek writer.**
Ayni anda birden fazla write akisi calisamaz.

---

## 2) Lock Layers

- Global repo write lock (zorunlu)
- Role intent lock (builder / auditor / god / partner)
- Maintenance marker (buyuk yapisal mudahale)

Write islemine girmeden once lock alinmadan devam edilmez.

---

## 3) Mode Contract

### Expansion mode
- read-first analiz
- write serbest ama lock zorunlu
- amac product/gov growth

### Intervention mode
- docs/policy/code write serbest
- global lock + gerekirse maintenance marker zorunlu
- yapisal reset / risk kontrolu icin

---

## 4) Priority / Override Order

Ayni zaman araliginda cakisma olursa sira:
1. Human emergency intervention
2. Partner intervention
3. God strategic write
4. Auditor governance write
5. Builder product write

Not: Normalde oncelik degil, **serializasyon** esastir.

---

## 5) Timeout Behavior

- Builder: lock varsa kisa bekle, sonra defer/skip
- Auditor: orta bekleme, sonra defer ve log
- God: daha uzun bekleme, sonra yeniden plan
- Partner: expansion modda lock yoksa yazmaz; intervention modda da dirty tree birakmaz

---

## 6) Stop / Escalation Conditions

Asagidaki durumlardan biri olursa write akisi durdurulur ve FACTORY_STATE'e risk yazilir:
- dirty tree catisma riski
- stale lock
- art arda skip firtinasi
- push conflict

---

## 7) Principle

Hizdan once tutarlilik.
Ama tutarlilik bahanesiyle buyume dondurulmaz.
