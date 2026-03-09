# NEXT_core/AGENT.md

## Current Mission

Bu siradaki ana is gameplay tuning degil.
Partner-layer / factory migration'i tamamlamaya devam et.

---

## Single Primary Goal

Factory operating system donusumunu bir adim daha ileri gotur:
- docs compaction'u tamamla
- role belgelerini yeni yapıyla tamamen hizala
- runner/cron tarafinda maintenance-aware concurrency politikasini netlestir

Run modunu `integration` olarak ele al.

---

## Read First

1. `factory/MIGRATION_STATUS.md`
2. `factory/PARTNER.md`
3. `FACTORY_core/STATE.md`
4. `factory/FACTORY_RHYTHM.md`
5. `factory/CONCURRENCY_POLICY.md`
6. `factory/CRON_REENABLE_PLAN.md`
7. `STRATEGIC_core/STATE.md`
8. `strategy/MASTER_PLAN.md`
9. `core/AGENT.md`
10. `audit/AUDITOR.md`
11. `core/STATE.md`
12. `core/ROADMAP.md`
13. `factory/PARTNER_LOG.md`
14. `experiments/HUMAN_SIGNALS.md`
15. `experiments/EXPERIMENTS.md`

---

## Success Criteria

- docs seti yeni partner/factory modelini tutarli sekilde tasiyor olmali
- state/roadmap/next_agent daha yogun ve operasyonel hale gelmeli
- runner scriptleri global lock / maintenance mantigi ile syntax-safe ve tutarli kalmali
- cron'lar yeniden acilmadan once acik bir re-enable plani ve role behavior notlari olusmali

---

## Do Not

- gameplay tuning'e geri donme
- telemetry wording / latestRun copy alanina sapma
- yeni mutation'i bu tur acma
- cron'lari erken yeniden acma
- copy-churn veya yeni burokrasi katmani uretme
