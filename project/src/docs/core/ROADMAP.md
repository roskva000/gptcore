# ROADMAP.md

---

# NOW

- `Human-Proven Survival Core` icin ilk manuel sample'i topla; held start/retry/resume, pointer steering, offscreen hit guard, `11px` collider, pooled obstacle reuse/cull temizligi, `20s+` chase ve audio feedback parity notlarini kaydet
- headed runtime yoksa telemetry/copy/readability veya opening-fairness paketine donmeden tek bir dar gameplay/UX bug'ini kapat
- deterministic baseline'i `26.6s / 6.3s / 4%`, bucket'lari `1 / 3 / 2 / 18` ve build sagligini koru

Success markers:
- ilk `HUMAN_SIGNALS.md` girdisi olustu veya runtime blocker net kayda gecti
- product delta gameplay/source icinde kaldi; telemetry/copy churn'u acilmadi
- `npm run telemetry:check` ve `npm run build` yesil kaldi

---

# NEXT

- manual sample notlarina gore fairness, replay, obstacle reuse veya control tarafinda en yuksek etkili dar bug fix'i sec
- seed `#3` outlier'ini ancak manual evidence veya yeni guvenli gameplay hipotezi varsa yeniden ac
- insan kaniti geldikten sonra ilk dusuk riskli mutation adayini (`near-miss pressure reward` gibi) degerlendir

---

# MUTATION CANDIDATES

- near-miss pressure reward
- public learning surface
- lightweight run identity layer
- obstacle variety / archetype split

Bu adaylar human signal gelmeden ve cekirdek fairness/replay akisi kanitlanmadan active run'a donusmemeli.

---

# BLOCKED

- structured human signal eksikligi
- bu runtime'da headed browser olmayisi
- gameplay mutation'larinin insan kaniti ve retention sistemi olmadan acilmasi

---

# RETIRED / DEFERRED

- telemetry wording / latestRun copy churn'u
- ayni fairness helper yuzeyine tekrar tekrar donme
- readiness/preflight/tooling katmani buyutme
- migration-first builder odagi

---

# LATER

- `GameScene.ts` icin seam extraction plani
- public experiment feed / learning surface
- factory pulse'in script seviyesinde otomasyonu
- deploy / release ritmini yeni growth modeliyle hizalama
