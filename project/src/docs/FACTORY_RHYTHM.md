# FACTORY_RHYTHM.md

Bu dosya urunu ureten fabrikanin zaman olceklerini ve rol ritmini tanimlar.

---

# Current Rhythm

## Builder
Cadence:
Hourly

Purpose:
- urun uzerinde dar ve olculebilir ilerleme uretmek
- bug fix, gameplay tuning, mutation veya integration run'lari yapmak

## Auditor
Cadence:
Daily

Purpose:
- drift / loop / ritual-risk denetimi
- urun gercekten ilerliyor mu kontrolu
- builder davranisini duzeltici yonlendirme

## God
Cadence:
Weekly

Purpose:
- haftalik faz tanimi
- stratejik yon
- mutation izni / yasagi
- buyuk urun yayininin korunmasi

## Partner
Cadence:
Planned / staged activation

Planned Rhythm:
- light partner pulse: gunde 2-3 kez, varsayilan olarak read-only observe mode
- deep partner review: haftada 2 kez
- intervention mode: yalnizca net gerekce ve kontrollu write penceresi ile

Purpose:
- fabrikanin kendisini denetlemek
- role'lar arasi koordinasyonu guclendirmek
- process, memory ve growth disiplinini korumak
- Furkan'a fikir ve escalation sunmak

---

# Rhythm Rules

- ayni repo uzerinde ayni anda tek writer calisir
- observe mode mumkun oldugunca read-only kalir
- intervention mode maintenance mantigiyla ele alinir
- builder ritmi urun hareketi icin kalir; partner onu kopyalamaz
- audit ve god, partner tarafindan degil kendi rollerine uygun zaman olceginde dusunur

---

# Planned Future Additions

- factory-wide global lock protocol
- maintenance marker policy
- partner pulse / partner review scriptleri
- timeout / skip / defer davranis standardi
- `CONCURRENCY_POLICY.md` kurallarinin runner katmanina uygulanmasi
