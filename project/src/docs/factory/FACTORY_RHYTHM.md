# FACTORY_RHYTHM.md
Last Updated: 2026-03-11

Bu dosya fabrikanin zaman olceklerini ve yetki akisini tek modele baglar.

---

## Canonical Cadence

### Builder
- cadence: hourly
- scope: urun implementation
- output: kod + minimum gerekli docs

### Auditor
- cadence: daily
- scope: drift/loop/churn denetimi
- output: audit verdict + governance direction

### God
- cadence: weekly
- scope: stratejik faz/yol
- output: kisa, uygulanabilir stratejik kararlar

### Partner (Supreme)
- cadence: gunde 1 ana uyanis
- default mode: observe
- mode switch: gerekirse intervention
- output: factory mode, health, direktifler, hafiza guncellemesi

---

## Rhythm Rules

1. **Tek repo, tek writer** (mutlak)
2. Partner observe modunda yazim acmaz; intervention'da kontrollu yazar
3. Builder urun ritmidir; Partner builder'i kopyalamaz, yonlendirir
4. Auditor ve God kendi zaman olceklerinde kalir; Partner bunlari hizalar
5. Ritim bozulursa Partner override eder

---

## Override Timing

- Normal durumda:
  - Partner gunluk ana capta yon verir
  - Alt roller bir sonraki ciklusunda uygular
- Acil durumda:
  - Partner aninda intervention acabilir
  - Gerekirse maintenance penceresi tanimlar

---

## Anti-Ritual Guard

Asagidaki semptomlardan ikisi birlikte gorulurse Partner intervention tetikler:
- ayni doc paketinin tekrarli yazimi
- product delta'nin 2+ run dusmesi
- ayni mikro-problem etrafinda donen fix zinciri
- churn oraninin source etkisini bastirmasi
