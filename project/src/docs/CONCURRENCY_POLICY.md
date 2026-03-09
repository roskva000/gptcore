# CONCURRENCY_POLICY.md

Bu dosya canli fabrikada ayni repo uzerinde calisan farkli rollerin nasil cakismadan calisacagini tanimlar.

---

# Problem

Bu projede birden fazla katman vardir:
- Codex builder
- Codex auditor
- Codex god
- OpenClaw partner
- gerekirse human manual intervention

Bu roller ayni repo uzerinde write isleri yapabilir.
Ayni anda birden fazla writer calisirse:
- git yarisi
- dirty tree
- push conflict
- state drift
- bozuk handoff
olabilir.

---

# Core Rule

## Tek repo, tek writer

Ayni anda ayni repo uzerinde yalnizca **tek writer** calisabilir.

Read-only gozlem / analiz akislari mumkun oldugunca write lock almadan calismalidir.

---

# Lock Model

## Role locks
- builder lock
- audit lock
- god lock
- partner lock

## Global repo lock
Ayri bir global lock da olmalidir.

Amaç:
- rol bazli ayristirma + repo bazli mutlak write serializasyonu

---

# Mode Model

## Observe mode
- read-only analiz
- log okuma
- state degerlendirme
- fikir uretimi
- gereksiz write yapmama

## Intervention mode
- docs degistirme
- runner/cron revizyonu
- yapisal migration
- gameplay veya process write islemleri

Intervention mode global write lock gerektirir.
Observe mode varsayilan moddur.

---

# Maintenance Marker

Buyuk yapisal veya process degisikliginde maintenance marker kullanilmalidir.

Marker mantigi:
- owner
- reason
- started_at
- expected_until

Builder / audit / god cronlari marker gorurse:
- skip
- wait-with-timeout
- veya defer
politikasina gore davranmalidir.

---

# Timeout Philosophy

## Builder
- kisa bekleme
- sik calistigi icin lock varsa skip edebilir

## Auditor
- daha uzun bekleyebilir
- lock varsa log dusup skip/defer edebilir

## God
- en sabirli roldur
- gerekirse maintenance penceresi bekler

## Partner
- gozlem modunda write lock istemez
- intervention modunda maintenance ciddiyetiyle davranir

---

# Priority Guidance

Normal operasyon onceligi:
1. aktif writer'in isi bitsin
2. sonra stratejik / denetim rolleri
3. sonra sik cadence rolleri devam etsin

Ancak human emergency intervention her zaman usttedir.

---

# Preferred Behavior

- partner pulse cogunlukla read-only calisir
- partner intervention daha seyrek ama daha kontrollu olur
- builder urun hareketini surdurur
- audit loop ve ritual-risk'i gorur
- god haftalik yonu belirler
- partner fabrikanin isleyisini optimize eder

---

# Future Work

Bu politika runner scriptlerine ve cron davranisina tasinmalidir.
Ilk adim belgelemek, ikinci adim uygulamaktir.
