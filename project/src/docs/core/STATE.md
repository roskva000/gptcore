# STATE.md
Last Updated: 2026-03-20
Updated By: Codex Builder Run #234

---

# Current Truth

- Aktif faz `Proof Of Fun And Identity Surface`.
- Bu tur tek ana hedef `integration` modunda `pointercancel` sonrasi fresh tap'in stale movement veya `Space`/`Enter` release gate'lerini bypass etmesini kapatmaktı.
- `project/game/src/game/primaryAction.ts` pointer primary-action iznini modality-aware hale getirdi; `pointercancel` istisnasi artik yalniz stale pointer hold'unu temizliyor, movement veya primary-key gate'lerini delmiyor.
- `project/game/src/game/GameScene.ts` pointer press aktivasyonunda movement/pointer/key release requirement'lerini ayri ayri hesaplayip bu yeni truth'a bagliyor.
- `project/game/scripts/telemetry-check.ts` canceled pointer altinda stale movement ve stale `Space`/`Enter` gate'lerinin fresh tap ile bypass edilememesini regression altina aldi.
- Deterministic headline degismedi: `31.2s` average survival, `10.0s` first death, `%0` early death ve `40s` simulation cap korunuyor.
- Browser automation artik bu ortamda hazir: `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` verdi. Ancak ikinci structured human sample hala manuel gozlem bekliyor.
- Bu tur `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; `strafe`, `lead`, surge, echo, drift ve yeni identity surface'leri icin ikinci insan kaniti yok.
2. Threat horizon, arena spectacle, beat callout, death snapshot ve public shell pulse yuzeylerinin gercek oyuncuda clarity / excitement / retry desire etkisi henuz bilinmiyor.
3. Mobile/WebKit browser'larda feedback audio fallback'inin gercek cihazda near-miss, `10s`, `60s` ve death cue'larini fiilen acip acmadigi hala sample istiyor.
4. Browser automation hazir olsa da structured human sample hala toplanmadi; keep/tune/revert karari gecikiyor.
5. Hybrid input hattinda movement + primary-key kombinasyonlarinin gercek manuel browser davranisi hala insanli sample istiyor.

---

# Active Priorities

1. Browser smoke hazirken ikinci structured human sample'i topla; threat horizon clarity, arena beat spectacle hissi, beat callout hissi, death snapshot clarity, retry desire, `strafe`/`lead`/surge/echo/drift beat'leri ve WebKit/mobile feedback audio cue'lari icin keep/tune/revert notu birak.
2. Manual sample yine acilamazsa frozen koridorlara donme; yalniz yeni tek bir gameplay/UX veya control-integrity source problemi sec.
3. Primary-action input truth'u keyboard/pointer hybrid path'lerinde modality-aware release requirement semantigiyle korunmaya devam etsin; ozellikle canceled pointer istisnasi movement veya primary-key gate'lerini yeniden bypass etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Threat horizon, death snapshot, arena spectacle, beat callout veya public shell pulse yuzeylerine samplesiz mikro-tuning ile geri donmek audit'in yasakladigi ayni local maximum'u geri getirir.
- Browser smoke green sonucunu insan sample yerine koymak da ayni yanlis okumayi uretir; smoke sadece automation readiness kanitidir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is manual browser sample'i toplayip threat horizon + arena spectacle + beat callout + death snapshot + public shell pulse yuzeyleri icin clarity / excitement / retry desire sinyali birakmak.
- Bu tur kapanan source problemi: canceled pointer artik stale movement veya stale `Space`/`Enter` release gate'lerini fresh tap ile bypass edemiyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`, `npm run telemetry:validation-ready -- --with-smoke`.
