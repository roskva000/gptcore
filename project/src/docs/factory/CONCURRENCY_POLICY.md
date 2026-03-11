# CONCURRENCY_POLICY.md
Last Updated: 2026-03-11

Canli fabrikada write cakismasini engellemek icin kanonik politika.

---

## 1) Core Rule

**Tek repo, tek writer.**
Ayni anda birden fazla write akisi calisamaz.

---

## 2) Lock Layers

- Global repo write lock (zorunlu)
- Role intent lock (builder/auditor/god/partner)
- Maintenance marker (buyuk yapisal mudahale)

Write islemine girmeden once lock alinmadan devam edilmez.

---

## 3) Mode Contract

### Observe mode
- read-only analiz
- lock alma zorunlulugu yok
- write yok

### Intervention mode
- docs/policy/code write serbest
- global lock + maintenance marker zorunlu

---

## 4) Priority / Override Order

Ayni zaman araliginda cakisma olursa sira:
1. Human emergency intervention
2. Partner intervention
3. God strategic write
4. Auditor governance write
5. Builder product write

Not: Normalde oncelik degil, **serializasyon** esastir. Bu sira yalnizca cakisma cözumu icindir.

---

## 5) Timeout Behavior

- Builder: lock varsa kisa bekle, sonra defer/skip
- Auditor: orta bekleme, sonra defer ve log
- God: daha uzun bekleme, sonra yeniden plan
- Partner: observe modda beklemez; intervention modda lock bosalmadan yazmaz

---

## 6) Stop / Escalation Conditions

Asagidaki durumlardan biri olursa write akisi durdurulur ve FACTORY_STATE'e risk yazilir:
- dirty tree catisma riski
- lock stale durumu
- art arda skip firtinasi
- push conflict

---

## 7) Principle

Hizdan once tutarlilik.
Cakisma yasayan hizli sistem yerine, seri ama stabil bir fabrika tercih edilir.
