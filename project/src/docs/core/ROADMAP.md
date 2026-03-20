# ROADMAP.md

---

# NOW

- Run #235 `stabilization`: `project/game/src/game/GameScene.ts` held-movement helper'inda `shouldClearMovementReleaseRequirement()` truth'unu kullanmaya basladi; focus-loss pause sonrasi keyboard reset ile gelen idle frame'ler stale movement release gate'ini observation olmadan dusurmuyor.
- Sonuc olarak paused durumda stale movement release requirement'i refocus sonrasi movement yeniden gozlenip sonra birakilmadan resume'u acmiyor; post-reset release semantics runtime truth ile hizalandi.
- Deterministic headline degismedi: `31.2s / 10.0s / 0%` ve `40s` simulation cap korunuyor.
- Browser validation readiness bu ortamda onceki turdaki `smoke-passed` durumunu koruyor; automation hazir ama ikinci structured human sample hala manuel olarak toplanmadi.
- Bu pass strafe/lead/surge/echo/drift knob'larini, threat horizon/death snapshot/spectacle copy'sini, fairness guard'larini, touch/mobile/audio stabilization'ini veya yeni validation/tooling katmani acmayi retune etmedi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Mevcut Vite script uyarisi ve buyuk bundle warning'i degismedi.

Success markers:
- focus-loss pause sonrasi idle frame'ler stale movement release gate'ini observation olmadan temizlemez.
- stale movement release gate'i ancak movement yeniden gozlenip sonra birakildiginda temizlenir.
- deterministic survival baseline `31.2s / 10.0s / 0%` olarak yesil kaliyor.
- build, telemetry check ve browser smoke seti yesil kaliyor.

---

# NEXT

- Browser smoke hazirken ikinci structured human sample'i topla ve `HUMAN_SIGNALS.md` icine threat horizon clarity, arena beat spectacle hissi, yeni beat callout hissi, death snapshot clarity, retry desire, `strafe` beat'i, `lead` beat'i, tuned surge beat'i, echo beat'i, drift beat'i, WebKit/mobile feedback audio cue'lari ve fairness hattina keep/tune/revert notu ekle.
- Manual sample yine acilamazsa frozen koridorlara tekrar dokunmadan audit'in yasaklamadigi yeni tek dar gameplay/UX veya control-integrity source problemi sec; ancak Run #235 sonrasi ayni focus-loss movement gate hattina yeniden mikro-churn yapma.
- Yeni orchestration/readiness/preflight katmani acma.

---

# BLOCKED

- ikinci structured human sample eksikligi
- manuel gozlem/oyuncu notu olmadan smoke sonucunu urun kaniti yerine koyamama

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
