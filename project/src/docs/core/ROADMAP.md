# ROADMAP.md

---

# NOW

- `Human-Proven Survival Core` icin ilk manuel sample'i topla.
- Sample checklist:
  - held `Space` / `Enter` auto-repeat artik death/pause overlay'ini delmiyor mu
  - `Enter` start/retry/resume shell focus kaymasinda da durust mu
  - pointer/touch steer arena disina kaysa bile wall-edge kacis ekseni durust mu
  - death sonrasi held movement/pointer input kendi kendine retry uretmiyor mu
  - right-click veya middle-click artik istemsiz start/retry/resume uretmiyor mu
  - pause/death freeze ve `20s+` chase insan gozunde adil mi
- Runtime yoksa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i sec.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde tarihli ilk sample var, ya da runtime blokaji kisa not edilip yeni tek source bug'i kapatildi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi.

---

# NEXT

- Manuel sample sonuclarina gore fairness, replay veya readability tarafinda en yuksek etkili dar bug fix'i sec.
- Sample yine yoksa Run #101-#118 zinciri disinda kalacak yeni source-level gameplay problemi ara.
- Seed `#3` opener fairness paketini ancak manuel evidence veya yeni dar hipotez varsa yeniden ac.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- human signal eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / HUD copy churn'u
- yeni readiness / preflight / orchestration katmani
- sample olmadan Run #101-#118 fairness/input/control zincirine geri donus

---

# LATER

- `GameScene.ts` seam extraction
- hafif mutation adaylari (`near-miss pressure reward` vb.) ancak human evidence sonrasi
