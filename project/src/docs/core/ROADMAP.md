# ROADMAP.md

---

# NOW

- Run #203 `integration`: `project/game/scripts/telemetry-reports.ts` artik Run #202 surge obstacle mutation'ini deterministic survival proxy'ye tasiyor; her dorduncu mid-run spawn ve `1.14x` hiz carpani simule ediliyor.
- `project/game/src/game/telemetry.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/latestRun.ts` live surge-aware baseline ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- deterministic proxy surge beat'i stale pre-mutation baseline yerine live runtime kontratini raporlar.
- first-death floor `10s`te kalirken average survival surge-aware proxy'de gorunur.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine surge obstacle beat'i, `10s` milestone payoff'i ve replay istegi icin keep/tune/revert notu ekle.
- Runtime yoksa yeni mutation acmadan once yalniz surge obstacle cadence'i veya speed multiplier'i icin retain/tune/revert karari verecek tek dar pass sec.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni fairness/death/pause/panel/replay-HUD veya `10s` milestone koridorlarina geri donmek
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra `10s` milestone feedback'i ve surge obstacle beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
