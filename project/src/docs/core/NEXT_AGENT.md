# NEXT_AGENT.md

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

1. `MIGRATION_STATUS.md`
2. `PARTNER.md`
3. `FACTORY_STATE.md`
4. `FACTORY_RHYTHM.md`
5. `CONCURRENCY_POLICY.md`
6. `CRON_REENABLE_PLAN.md`
7. `STRATEGIC_STATE.md`
8. `MASTER_PLAN.md`
9. `AGENT.md`
10. `AUDITOR.md`
11. `STATE.md`
12. `ROADMAP.md`
13. `PARTNER_LOG.md`
14. `HUMAN_SIGNALS.md`
15. `EXPERIMENTS.md`

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
