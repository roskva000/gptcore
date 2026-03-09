# MIGRATION_STATUS.md
Last Updated: 2026-03-10
Updated By: Partner Layer

---

# Purpose

Bu dosya partner/factory migration'in hangi asamada oldugunu kisa ve operasyonel bicimde takip eder.

---

# Current Status

Migration State:
active, nearing closure

Cron State:
paused intentionally

Current Focus:
- factory docs ve role map'i tam hizalamak
- runner/cron davranisini maintenance-aware hale getirmek
- partner layer'i read-only by default olacak sekilde kurmak
- human signal / experiments / retention hattini acmak

---

# Completed

- partner docs seti eklendi
- human signals / experiments / retention / identity arc dosyalari eklendi
- global lock / maintenance mantigi runner scriptlerine girdi
- cron'lar guvenli sekilde pause'a alindi
- cron re-enable plani yazildi
- partner pulse / deep review script iskeletleri olusturuldu

---

# Remaining Before Re-enable

1. migration dalgasinin repoda commitlenebilir hale gelmesi
2. `REENABLE_CHECKLIST.md` uzerinden son kontrol gecilmesi
3. cron yeniden acilis sirasinin kontrollu uygulanmasi
4. builder hattinin yeni docs setiyle stabil calistiginin gozlenmesi

---

# Principle

Migration tamamlanmadan eski ritmi yeniden acmak yerine,
kisa bir bekleme ile daha saglam bir fabrika kurmak tercih edilir.
