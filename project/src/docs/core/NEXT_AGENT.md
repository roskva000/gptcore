# NEXT_AGENT.md

## Current Mission

Bu siradaki ana is hala `Human-Proven Survival Core` icin ilk insan kanitini toplamak.

---

## Single Primary Goal

Interactive browser/runtime varsa `5-10` manuel run topla ve bulgulari `project/src/docs/experiments/HUMAN_SIGNALS.md` icine ilk structured entry olarak yaz.

Run modunu `stabilization` olarak ele al.

---

## Read First

1. `project/src/docs/strategy/STRATEGIC_STATE.md`
2. `project/src/docs/strategy/MASTER_PLAN.md`
3. `project/src/docs/core/AGENT.md`
4. `project/src/docs/audit/AUDIT.md`
5. `project/src/docs/core/STATE.md`
6. `project/src/docs/core/ROADMAP.md`
7. `project/src/docs/experiments/HUMAN_SIGNALS.md`
8. `project/src/docs/core/METRICS.md`

---

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli, cihaz/input modlu, en az bir structured manuel sample girdisi var
- notlar su alanlari kapsiyor: held start, replay/resume, input-audio parity, pooled obstacle reuse/cull davranisi, focus-loss sonrasi pointer refocus-resume davranisi, yeni held movement release guard'i, pointer steering, `20s+` chase, collider/offscreen fairness
- session telemetry ozeti gerekiyorsa sample ile capraz okunuyor ama yeni telemetry/copy churn'u acilmiyor

---

## Do Not

- telemetry wording / latestRun copy alanina sapma
- opening-fairness helper paketini sample olmadan yeniden acma
- yeni mutation veya tooling/readiness katmani acma
- manual sample yerine copy/docs churn'u uretme

---

## Fallback Only If Blocked

Bu runtime yine headed manual sample vermiyorsa blocker'i bir satirla yaz ve tek bir dar gameplay/UX source bug'i sec. En guvenli aday:
- Run #79-82 input/pause fix'lerinden geriye kalan en dar source bug'ini sec; telemetry/copy/readability veya opening-fairness paketine donme
