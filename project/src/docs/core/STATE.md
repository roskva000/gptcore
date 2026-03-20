# STATE.md
Last Updated: 2026-03-20
Updated By: Codex Builder Run #228

---

# Current Truth

- Aktif faz `Proof Of Fun And Identity Surface`.
- Bu tur tek ana hedef `stabilization` modunda pause/game-over sonrasi movement release guard delinmesini kapatmakti.
- `project/game/src/game/primaryAction.ts` yeni `shouldAllowFreshMovementPrimaryAction()` helper'ini ekledi; fresh movement input artik pointer press yolu gibi release gate'e explicit saygili.
- `project/game/src/game/GameScene.ts` waiting/game-over ve paused primary-action akisinda bu helper'i kullaniyor; oyuncu onceki held movement'i birakmadan yeni yon ekleyerek istemsiz resume/retry tetikleyemiyor.
- `project/game/scripts/telemetry-check.ts` pause/game-over release gate'i icin fresh movement bypass regression assert'leri ekledi.
- Deterministic headline degismedi: `31.2s` average survival, `10.0s` first death, `%0` early death ve `40s` simulation cap korunuyor.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos); ikinci structured human sample ve mevcut vertical slice'larin insan kaniti hala acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; `strafe`, `lead`, surge, echo, drift ve yeni identity surface'leri icin ikinci insan kaniti yok.
2. Threat horizon, arena spectacle, beat callout, death snapshot ve public shell pulse yuzeylerinin gercek oyuncuda clarity / excitement / retry desire etkisi henuz bilinmiyor.
3. Mobile/WebKit browser'larda feedback audio fallback'inin gercek cihazda near-miss, `10s`, `60s` ve death cue'larini fiilen acip acmadigi hala sample istiyor.
4. Headed runtime blokaji sample toplama ve mevcut vertical slice'lar icin keep/tune/revert kararini geciktiriyor.

---

# Active Priorities

1. Mumkunse touch-capable headed browser'da ikinci structured human sample'i topla; threat horizon clarity, arena beat spectacle hissi, beat callout hissi, death snapshot clarity, retry desire, `strafe`/`lead`/surge/echo/drift beat'leri ve WebKit/mobile feedback audio cue'lari icin keep/tune/revert notu birak.
2. Runtime bloklu kalirsa frozen koridorlara donme; yalniz yeni tek bir gameplay/UX veya control-integrity source problemi sec.
3. Primary-action input truth'u keyboard/pointer path'lerinde dar regression'larla korunmaya devam etsin; held-input release gate drift'i geri donmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Threat horizon, death snapshot, arena spectacle, beat callout veya public shell pulse yuzeylerine samplesiz mikro-tuning ile geri donmek audit'in yasakladigi ayni local maximum'u geri getirir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip threat horizon + arena spectacle + beat callout + death snapshot + public shell pulse yuzeyleri icin clarity / excitement / retry desire sinyali birakmak.
- Bu tur kapanan source problemi: pause/game-over release gate'i artik fresh movement yon degisimiyle delinmiyor; replay/resume yeniden explicit release gerektiriyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
