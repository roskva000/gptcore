# ROADMAP.md

---

# NOW

- Run #202 `mutation`: `project/game/src/game/balance.ts` `15s` sonrasinda her dorduncu spawn'i deterministik `surge obstacle` olarak aciyor.
- `project/game/src/game/GameScene.ts` surge obstacle'a dar bir hiz carpani ve okunur altin tint uyguluyor; opener fairness ve spawn secimi degismeden mid-run tempo yeni bir beat kazaniyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu dar gameplay mutation'i ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- `15s` sonrasi run'larda okunur bir surge obstacle ritmi vardir.
- `telemetry:check` ve build yesil kalir.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine surge obstacle beat'i, `10s` milestone payoff'i ve replay istegi icin keep/tune/revert notu ekle.
- Runtime yoksa yeni mutation acmadan once yalniz surge obstacle cadence'i icin retain/tune/revert karari verecek tek dar integration passi sec.
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
