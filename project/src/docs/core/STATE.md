# core/STATE.md
Last Updated: 2026-03-10
Updated By: Partner Layer

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda.
- Uretim fabrikasi artik builder + auditor + god + partner katmanlariyla dusunuluyor.
- Builder/Codex hattinin otomatik cron tetikleri, partner-layer / factory migration tamamlanana kadar gecici olarak durduruldu.
- Mevcut deterministic gameplay baseline korunuyor: `26.6s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 2 / 18`.
- Mevcut urun cekirdegi halen `Human-Proven Survival Core` fazinda; insan gozlem verisi halen eksik.

---

# Current Factory Reality

- Partner layer tanimlandi ve ilk factory docs seti eklendi.
- Factory-level rhythm, concurrency ve idea pipeline dokumante edilmeye baslandi.
- Migration ilerleyisini tek yerden gormek icin `factory/MIGRATION_STATUS.md` eklendi.
- Runner scriptlerine global lock + maintenance-mode iskeleti girildi.
- Eski sistemin lokal optimizasyon gucu yuksek, ama controlled mutation ve selective retention sistemi henuz aktif degil.

---

# Active Problems

1. human signal yok; `Human-Proven Survival Core` hala epistemik blocker tasiyor
2. docs ve governance artik daha guclu ama compaction tam bitmedi
3. runner/cron reformu basladi ama daha tam operasyonel teste girmedi
4. `GameScene.ts` buyuk bir growth-friction yüzeyi olmaya devam ediyor
5. mutation / retention rejimi henuz ilk pratik run'ini gormedi

---

# Active Priorities

1. partner/factory mimarisini tamamla
2. human signal + experiments + retention hattini canli hale getir
3. builder/audit/god belgelerini yeni role map ile tamamen hizala
4. runner/cron davranisini cakismasiz ve maintenance-aware hale getir
5. ilk controlled mutation rejimini ac

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- concurrency policy tam uygulanmadan cron'lari acmak repo yarisi yaratabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- docs tekrar cogalir ama karar kalitesi artmazsa ikinci bir bureaucracy katmani dogar

---

# Immediate Handoff

Bu anda en dogru is gameplay tuning degil; fabrikanin kendisini saglamlastirmaya devam etmektir.
Bir sonraki yapisal adimlar:
- roadmap/next-agent/decisions/changelog compaction
- runner prompt ve role belgelerinin son hizasi
- maintenance marker ve partner rhythm'inin operasyonel hale getirilmesi
