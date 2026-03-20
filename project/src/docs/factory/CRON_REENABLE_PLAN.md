# CRON_REENABLE_PLAN.md

Last Updated: 2026-03-21
Status: Active under Autonomous Expansion

---

Bu dosya builder / audit / god / partner cron'larinin yeni rejimde nasil calisacagini tanimlar.
Eski observe-first yeniden acilis dili superseded kabul edilir.

## Preconditions

1. runner scriptleri syntax-safe olmali
2. global lock + role lock mantigi aktif olmali
3. maintenance marker davranisi tanimli olmali
4. aktif docs seti yeni expansion rejimiyle hizali olmali
5. cron promptlari sample-gated veya observe-first mantik tasimamali

## Current Operating Order

### Builder
- sik calisir
- varsayilan `expansion` / `mutation`
- visible delta uretmesi beklenir

### Audit
- gunluk calisir
- churn kadar transformation kalitesini de olcer

### God
- haftalik calisir
- gerekiyorsa rule rewrite yapar

### Partner
- gunluk pulse + periyodik deep review
- varsayilan mode `expansion`
- gerektiginde `intervention`

## Rollback Rule

Asagidaki durumlarda cron promptlari veya ritim yeniden daraltilir:
- lock yarisi / dirty tree / push conflict
- ust uste 3+ run gorunur urun deltasi uretemezse
- expansion feature creep'e donerse
- docs/process hacmi tekrar source etkisini bastirirsa
