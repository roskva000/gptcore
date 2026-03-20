# ROADMAP.md

---

# NOW

- Run #231 `stabilization`: `project/game/src/game/primaryAction.ts` stale `Space`/`Enter` hold'u icin primary-key release gate ve post-reset gozlem helper'larini ekledi; non-repeat key press yolu artik key-release requirement'ini de tasiyor.
- `project/game/src/game/GameScene.ts` `Space`/`Enter` key state'ini izleyip pause/game-over gecislerinde ve focus-loss keyboard reset sonrasinda primary-key release gate'ini ancak refocus sonrasi key yeniden gorulup sonra birakildiginda temizliyor.
- `project/game/scripts/telemetry-check.ts` stale primary-key hold, post-reset primary-key gozlemi ve release-clear semantigini regression altina aldi.
- Deterministic headline degismedi: `31.2s / 10.0s / 0%` ve `40s` simulation cap korunuyor.
- Bu pass strafe/lead/surge/echo/drift knob'larini, threat horizon/death snapshot/spectacle copy'sini, fairness guard'larini, touch/mobile/audio stabilization'ini veya yeni validation/tooling katmani acmayi retune etmedi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- stale `Space`/`Enter` hold pause/game-over resume/retry gate'ini artik delemez.
- focus-loss keyboard reset sonrasi primary key bir kez yeniden gorulup sonra birakilmadan resume/retry acilmiyor.
- deterministic survival baseline `31.2s / 10.0s / 0%` olarak yesil kaliyor.
- build ve telemetry check seti yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine threat horizon clarity, arena beat spectacle hissi, yeni beat callout hissi, death snapshot clarity, retry desire, `strafe` beat'i, `lead` beat'i, tuned surge beat'i, echo beat'i, drift beat'i, WebKit/mobile feedback audio cue'lari ve fairness hattina keep/tune/revert notu ekle.
- Runtime yoksa frozen koridorlara tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX veya control-integrity source problemi sec; once mixed pointer+movement release gate'lerinin birbirini erken temizleyip temizlemedigine bak.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci structured human sample eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / panel copy churn'u
- sample olmadan bu yeni threat horizon yuzeyine tekrar mikro-tuning yapmak
- sample olmadan bu yeni death snapshot yuzeyine tekrar mikro-tuning yapmak
- sample olmadan bu yeni arena beat spectacle yuzeyine tekrar mikro-tuning yapmak
- sample olmadan bu yeni beat callout yuzeyine tekrar mikro-tuning yapmak
- sample olmadan bu yeni public shell pulse yuzeyine tekrar mikro-tuning yapmak
- sample olmadan yeni `strafe` beat'ine tekrar mikro-tuning yapmak
- sample olmadan yeni `lead` beat'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-grace threat filter fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-grace collision-ready timing fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni touch-gesture lock fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni WebKit audio fallback fix'ine tekrar mikro-tuning yapmak
- sample olmadan Run #216 opener cutoff koridoruna geri donmek
- sample olmadan validation/export affordance'ini yeniden acmak
- sample olmadan ayni fairness/death/pause/panel/replay-HUD, `10s` milestone veya `60s` clear payoff koridorlarina geri donmek
- sample olmadan surge cadence/speed knob'una tekrar dokunmak
- sample olmadan bu yeni echo cadence/target-lag knob'una tekrar dokunmak
- sample olmadan bu yeni drift cadence/rotation knob'una tekrar dokunmak
- sample olmadan near-miss reward detection/yuzeyine tekrar mikro-tuning yapmak
- sample olmadan yeni wall-target lag / reachability micro-tuning'i acmak
- sample olmadan yeni retreat-pinch reachability micro-tuning'i acmak
- sample olmadan bu `10.0s` projected-stack threshold fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn guard fallback fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni replay-intent movement-state fix'ine tekrar mikro-tuning yapmak
- sample olmadan bu yeni spawn-bookkeeping integrity fix'ine tekrar mikro-tuning yapmak
- Run #215 sonrasinda gerekcesiz yeni deterministic validation katmani acmak
- sample olmadan ikinci gameplay mutation dali acmak
- yeni readiness / preflight / orchestration katmani

---

# LATER

- `GameScene.ts` seam extraction
- ikinci sample geldikten sonra yeni threat horizon, arena beat spectacle, beat callout, death snapshot ve public shell pulse yuzeyleri, `strafe` beat'i, `lead` beat'i, near-miss reward, WebKit/mobile audio cue'lari, `10s` milestone feedback'i, tuned surge obstacle beat'i, echo beat'i ve drift beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
