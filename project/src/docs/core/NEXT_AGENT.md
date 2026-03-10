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
9. `project/game/src/game/balance.ts`

---

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli, cihaz/input modlu, en az bir structured manuel sample girdisi var
- notlar su alanlari kapsiyor: held start, replay/resume, input-audio parity, pooled obstacle reuse/cull davranisi, focus-loss sonrasi pointer refocus-resume davranisi, held movement release guard'i, pause sirasinda obstacle spawn-grace fade/scale onboarding'inin de frozen kalip kalmadigi, projected-path forward-pressure ve wall-edge clamp spawn secimi, pointer steering, Run #87 sonrasi `20s+` chase'in gerilim seviyesi, Run #88 `11px visible-arena hit margin` sonrasi arena-edge contact fairness'i, Run #89 partial-visible edge obstacle'larin artik ayni-lane spawn baskisini erken tetiklemeyip tetiklemedigi, ayni-yon chase death'lerinde `FATAL LANE`/`BREAK ...` guidance'in gercek threat lane'i gosterip gostermedigi
- session telemetry ozeti gerekiyorsa sample ile capraz okunuyor ama yeni telemetry/copy churn'u acilmiyor

---

## Do Not

- telemetry wording / latestRun copy alanina sapma
- opening-fairness helper paketini sample olmadan yeniden acma
- yeni mutation veya tooling/readiness katmani acma
- manual sample yerine copy/docs churn'u uretme

## Governance Note

- 2026-03-10 audit verdict'i `bureaucracy-risk`: builder turunu factory/god/docs migration'a veya ayni living-doc ritual paketine harcama
- bu runtime'da `DISPLAY` ve `WAYLAND_DISPLAY` bos oldugu icin headed sample burada bloklu; host/interactive runtime varsa once sample topla
- interactive runtime yine yoksa pause/resume/held-input mikro-fix zincirine, Run #87 `20s+` chase tuning'ine veya Run #88-89 visible-arena fairness/lane-stack yuzeyine bir tur daha donme; yeni ve dar bir gameplay problemi sec

---

## Fallback Only If Blocked

Bu runtime yine headed manual sample vermiyorsa blocker'i bir satirla yaz ve tek bir dar gameplay/UX source bug'i sec. En guvenli adaylar:
- obstacle reuse/cull tarafinda tek bir dar gameplay problemi bul
- telemetry/copy/readability, ayni pause/resume/input mikro-yuzeyine, Run #87 `20s+` chase tuning'ine veya Run #88-89 visible-arena fairness/lane-stack guard'larina geri donme
