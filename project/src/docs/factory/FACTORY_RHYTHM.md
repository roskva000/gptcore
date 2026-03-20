# FACTORY_RHYTHM.md
Last Updated: 2026-03-21

Bu dosya fabrikanin zaman olceklerini ve yetki akislarini tek rejimde baglar.

---

## Canonical Cadence

### Builder
- cadence: hourly
- default scope: expansion / mutation
- output: gorunur urun deltasi + minimum docs

### Auditor
- cadence: daily
- scope: fake progress / ritual-loop / transformation kalitesi denetimi
- output: net verdict + yon duzeltmesi

### God
- cadence: weekly
- scope: faz / tema / kural rewrite
- output: kisa stratejik cerceve

### Partner
- cadence: gunde 1 ana uyanis
- default mode: expansion
- escalation mode: intervention
- output: rejim ayari + net direktif + hafiza

---

## Rhythm Rules

1. **Tek repo, tek writer**
2. Partner bekleme refleksiyle degil genisleme refleksiyle calisir
3. Builder'in varsayilan modu `stabilization` degil `expansion`dir
4. Audit'in ana sorusu churn degil, urun genisligidir
5. God gerekirse kurallari yeniden yazar
6. Docs kapanisi urun hareketinin yerine gecemez

---

## Override Timing

- Normal durumda:
  - Partner rejimi ayarlar
  - God haftalik tema verir
  - Auditor kaliteyi denetler
  - Builder urunu iter
- Acil durumda:
  - Partner intervention acar
  - maintenance marker kullanabilir
  - kronik ritual-loop veya kaos halinde sert daraltma getirir

---

## Anti-Stagnation Guard

Asagidaki semptomlardan ikisi birlikte gorulurse Partner kolaylastirma degil sert yon degisikligi yapar:
- son 3+ run'da fark edilir urun deltasi olmamasi
- builder'in tekrar kucuk guvenli ise siginmasi
- docs/process hacminin source etkisini bastirmasi
- ayni local maximum etrafinda dolasilmasi
- expansion bahanesiyle dağınık feature creep baslamasi
