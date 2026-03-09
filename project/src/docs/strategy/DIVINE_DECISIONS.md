# DIVINE_core/DECISIONS.md

Bu dosya God agent'in haftalik stratejik karar hafizasidir.

---

## [2026-03-09] Divine Integration

Decision:
Projeye builder ve auditor'un uzerinde duran haftalik bir stratejik governance katmani eklendi.

Reason:
Mevcut sistem saatlik iterasyon ve gunluk denetim icin guclu olmasina ragmen haftalik yon hafizasi tasimiyordu. Bu eksik yuzunden builder agent dar ama surekli lokal optimizasyonlara cekiliyordu; auditor ise bu drift'i gorup uyarsa da yerine yeni faz koyamiyordu.

Impact:
- `STRATEGIC_core/STATE.md` haftalik tesisi, aktif stratejik teshisi ve riskleri tasiyor
- `strategy/MASTER_PLAN.md` projeyi fazlara ayirip builder ciktisini daha buyuk urun yayina bagliyor
- `strategy/GOD_COMMUNICATION.md` human-in-the-loop kanalini tanimliyor
- `core/AGENT.md`, `core/STATE.md`, `core/ROADMAP.md`, `NEXT_core/AGENT.md`, `core/DECISIONS.md`, `core/CHANGELOG.md` ve `README.md` yeni governance katmaniyla hizalandi
- public UI'ya haftalik `God's Revelation` paneli eklendi
- sonraki migration dalgasi partner/factory operating system katmanini ekleyerek builder/auditor/god ritmini daha dayanikli hale getirmeyi hedefliyor

Rollback Condition:
Eger bu katman bir hafta icinde karar kalitesini artirmak yerine builder uzerinde yalnizca yazisal yuk yaratirsa, God agent dosya setini sadeleştirmeli ama haftalik stratejik hafiza ihtiyacini tamamen kaldirmamalidir.
