# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #215

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `integration` modunda yeni `drift` mutation'i icin deterministic validation koridorundaki gercek bir truth gap'ini kapatmakti.
- `project/game/scripts/telemetry-reports.ts` survival proxy cap'ini `40s`'ye cikardi; deterministic sample artik `32s` drift unlock'unu gercekten goruyor ve `reachedSimulationCap` bucket'i ile eski `30s` hard-cap anlatimini tasimiyor.
- `project/game/scripts/telemetry-check.ts` artik survival snapshot'in `40s` cap'te kaldigini, en az bir sample run'in `32s` ustune ciktigini ve seed `#3` trajectory'nin `40.0s / 45 spawn` kontratini korudugunu regression altina aliyor.
- `project/game/src/game/telemetry.ts` validation baseline metnini yeni deterministic headline ile hizaladi; current baseline artik `29.6s` average survival, `10.0s` first death ve `%0` early death.
- `project/game/src/latestRun.ts` public ozet bu validation-truth fix'i ile hizalandi.
- Bu pass hicbir gameplay tuning'i, fairness helper'i, replay flow'u, near-miss, `10s` milestone, `60s` clear payoff'i, surge, echo veya drift parametresini degistirmedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Yeni echo ve drift beat'lerinin gercek oyuncuda okunur variety mi yoksa gereksiz gurultu mu hissettirdigi henuz bilinmiyor.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Run #159-#177, Run #187, Run #208, Run #211 ve yeni Run #212 dahil spawn-pressure/fairness hattinin oyuncu tarafinda gercekten daha adil ve daha ilgi cekici hissedip hissettirmedigi hala sample istiyor.
5. Near-miss reward, `10s` milestone feedback'i, yeni `60s` clear payoff'i, tuned Run #204 surge beat'i, Run #211 echo beat'i ve Run #214 drift beat'i replay istegine mi yoksa gurultuye mi hizmet ediyor, henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve replay hissiyle birlikte yeni `60s` clear payoff'i, surge, echo, drift beat'leri ve mevcut fairness hattina keep/tune/revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target, retreat-pinch, spawn-threshold, spawn-fallback, replay-intent veya spawn-bookkeeping hatlarina hemen geri donme.
3. Run #215 ile kapanan validation/export truth koridoruna secilen yeni source problemi dogrudan bloklamadigi surece geri donme.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni HUD/pause/panel, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn fairness, retreat-pinch, replay-intent, spawn-bookkeeping veya validation/export koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissiyle birlikte yeni `60s` clear payoff'i, surge/echo/drift beat'leri ve fairness hattina keep/tune/revert notu birakmak; runtime yoksa validation/export'a geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/scripts/telemetry-reports.ts`, `project/game/scripts/telemetry-check.ts`, `project/game/src/game/telemetry.ts` ve `project/game/src/latestRun.ts` drift mutation'i gercekten kapsayan deterministic validation truth'una hizalandi.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run build`.
