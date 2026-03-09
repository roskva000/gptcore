# factory/CRON_REENABLE_PLAN.md

Bu dosya migration tamamlandiktan sonra builder / audit / god cron'larinin nasil guvenli sekilde yeniden acilacagini tanimlar.

---

# Preconditions

Cron'lar yeniden acilmadan once su kosullar saglanmis olmali:

1. runner scriptleri syntax-safe olmali
2. global lock + role lock mantigi aktif olmali
3. maintenance marker davranisi tanimli olmali
4. docs seti yeni partner/factory modeline hizalanmis olmali
5. `core/STATE.md`, `core/ROADMAP.md`, `NEXT_core/AGENT.md` compaction sonrasinda stabil olmali
6. partner pulse / deep review yolu en az dokuman seviyesinde netlesmis olmali

---

# Re-enable Order

## Step 1
Yalnizca builder cron acilir.

Goal:
- yeni lock mantigi altinda saatlik uretim hattinin stabil oldugunu gormek

Observe:
- skip davranisi dogru mu
- lock contention var mi
- anlamsiz churn var mi

## Step 2
Audit cron yeniden acilir.

Goal:
- gunluk denetim yeni factory docs ve role map ile uyumlu mu

Observe:
- audit verdictleri daha semantik mi
- docs churn'unu fark ediyor mu
- partner / strategic katmani gercekten okuyor mu

## Step 3
God cron yeniden acilir.

Goal:
- haftalik stratejik katman yeni operating system ile uyumlu mu

Observe:
- yeni haftalik direction operasyonel kalabiliyor mu
- builder uzerinde sadece yazi yuku mu uretiyor, yoksa net yon mu veriyor

---

# Partner Layer Activation

Partner layer ilk etapta kendi bagimsiz cron'una sahip olmak zorunda degildir.
Ilk aktivasyon asamalari:

1. docs + process layer aktif
2. observe mode manuel / sohbet ici calisir
3. sonra gerekirse partner pulse cron'u eklenir
4. en son deep review cadence otomatiklestirilir

---

# Rollback Rule

Eger yeniden acilis sonrasi:
- beklenmeyen lock yarisi
- anlamsiz skip firtinasi
- dirty tree / push conflict
- ritual-loop tekrar artisi
olursa cron'lar tekrar pause'a alinip role behavior yeniden duzeltilmelidir.
