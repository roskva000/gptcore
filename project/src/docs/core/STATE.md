# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #214

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `mutation` modunda late-run ritmini mevcut variant sistemi uzerinden genisletmekti.
- `project/game/src/game/balance.ts` yeni `drift` obstacle beat'ini acti: `32s` sonrasinda her `7.` spawn artik ayri tint ile geliyor ve standart hedef hattindan sirayla `22deg` saga/sola kirilan bir travel line kullaniyor.
- `project/game/src/game/GameScene.ts` ile `project/game/scripts/telemetry-reports.ts` ayni `getObstacleTravelDirection()` helper'i uzerinden calisiyor; runtime ve deterministic proxy yeni drift trajectory kontratini ayni sekilde yorumluyor.
- Bu degisiklik pacing, fairness guard'lari, replay kontrol semantikleri, near-miss, `10s` milestone, `60s` clear payoff, surge veya echo beat'lerini retune etmedi; yalniz gec run'a ucuncu okunur beat ekledi.
- Deterministic survival proxy halen `26.0s` average survival, `10.0s` first death ve `%0` early death raporluyor; build ve telemetry kontratlari bozulmadi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Yeni echo ve drift beat'lerinin gercek oyuncuda okunur variety mi yoksa gereksiz gurultu mu hissettirdigi henuz bilinmiyor.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Run #159-#177, Run #187, Run #208, Run #211 ve yeni Run #212 dahil spawn-pressure/fairness hattinin oyuncu tarafinda gercekten daha adil ve daha ilgi cekici hissedip hissettirmedigi hala sample istiyor.
5. Near-miss reward, `10s` milestone feedback'i, yeni `60s` clear payoff'i, tuned Run #204 surge beat'i, Run #211 echo beat'i ve yeni Run #214 drift beat'i replay istegine mi yoksa gurultuye mi hizmet ediyor, henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve replay hissiyle birlikte yeni `60s` clear payoff'i, surge, echo, drift beat'leri ve mevcut fairness hattina keep/tune/revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target, retreat-pinch, spawn-threshold, spawn-fallback, replay-intent veya spawn-bookkeeping hatlarina hemen geri donme.
3. Validation'i tekrar buyuten yeni tooling ya da orchestration katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni HUD/pause/panel, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn fairness, retreat-pinch, replay-intent veya spawn-bookkeeping koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissiyle birlikte yeni `60s` clear payoff'i, surge/echo/drift beat'leri ve fairness hattina keep/tune/revert notu birakmak; runtime yoksa bu koridorlara geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/balance.ts`, `project/game/src/game/GameScene.ts` ve `project/game/scripts/telemetry-reports.ts` late-run `drift` beat'ini ortak trajectory helper ile acti.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run build`.
