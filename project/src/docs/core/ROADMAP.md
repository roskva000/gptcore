# ROADMAP.md

---

# NOW

- Run #224 `mutation`: `project/game/src/game/runHorizon.ts` yeni tek truth olarak run ladder'ini tanimladi: `10s gate`, `12s strafe`, `15s surge`, `18s lead`, `24s echo`, `32s drift`, `60s clear`.
- `project/game/src/game/GameScene.ts` waiting ekranina `THREAT HORIZON` bloku ekledi; oyuncu artik mevcut best'e gore acilmis beat'leri ve siradaki uc beat'i start window icinde goruyor.
- `project/game/src/game/deathPresentation.ts` death snapshot prompt'una `Next beat` satirini ekledi; olum sonrasi yuzey artik lane hint'iyle birlikte siradaki unlock ritmini de gosteriyor.
- `project/game/scripts/telemetry-check.ts` horizon helper'ini ve yeni death prompt copy'sini regression altina aldi; `project/game/src/latestRun.ts` public panel de bu run ile hizalandi.
- Deterministic headline degismedi: `31.2s / 10.0s / 0%` ve `40s` simulation cap korunuyor.
- Bu pass strafe/lead/surge/echo/drift knob'larini, fairness guard'larini, touch/mobile/audio stabilization'i veya yeni validation/tooling katmani acmayi retune etmedi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- waiting ve game-over yuzeyleri artik run'i duz bir survival timer yerine acilan bir threat ladder olarak gosteriyor.
- horizon truth tek helper'da tutuluyor; waiting copy, death prompt ve regression ayni ladder'i paylasiyor.
- deterministic survival baseline `31.2s / 10.0s / 0%` olarak yesil kaliyor.
- build ve telemetry check seti yesil kaliyor.

---

# NEXT

- Runtime varsa ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine threat horizon clarity, death snapshot clarity, retry desire, `strafe` beat'i, `lead` beat'i, tuned surge beat'i, echo beat'i, drift beat'i, WebKit/mobile feedback audio cue'lari ve fairness hattina keep/tune/revert notu ekle.
- Runtime yoksa bu yeni threat horizon ve death snapshot slice'lari da dahil frozen koridorlara tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX source problemi sec.
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
- ikinci sample geldikten sonra yeni threat horizon ve death snapshot yuzeyleri, `strafe` beat'i, `lead` beat'i, near-miss reward, WebKit/mobile audio cue'lari, `10s` milestone feedback'i, tuned surge obstacle beat'i, echo beat'i ve drift beat'inin retained/tuned/reverted durumunu degerlendirmek
- ikinci human sample geldikten sonra near-miss ve replay identity yuzeylerini yeniden degerlendirmek
