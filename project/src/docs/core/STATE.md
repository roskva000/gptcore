# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #216

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda opener fairness guard'larinin `6.0s` fixed-step cutoff sacaginda bir frame erken dusmesini kapatmakti.
- `project/game/src/game/spawn.ts` artik opening forward-pressure, lane-stack, threat-crowding, same-edge pressure ve ilgili mid-run ust cutoff kararlarini raw cutoff karsilastirmalari yerine ortak epsilon-aware zaman penceresiyle yorumluyor.
- `project/game/scripts/telemetry-check.ts` yeni regression'larla iki gercek fringe case'i kilitledi: blocked wall-lane pressure ve near-player same-edge pressure senaryolari `6.000000000000076s` frame'inde de reroll korumasini kaybetmiyor.
- Deterministic headline degismedi: `29.6s` average survival, `10.0s` first death, `%0` early death ve `40s` simulation cap korunuyor.
- `project/game/src/latestRun.ts` public ozet bu opener fairness stabilization run'i ile hizalandi.
- Bu pass hicbir mutation cadence'ini, payoff beat'ini, replay flow'unu, near-miss'i veya HUD/panel yuzeyini retune etmedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Yeni echo ve drift beat'lerinin gercek oyuncuda okunur variety mi yoksa gereksiz gurultu mu hissettirdigi henuz bilinmiyor.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Spawn-pressure/fairness hattinin gercek oyuncuda daha adil ve daha okunur hissedip hissettirmedigi hala sample istiyor; Run #216 opener cutoff fix'i deterministic olarak kapandi ama insan kaniti hala yok.
5. Near-miss reward, `10s` milestone feedback'i, `60s` clear payoff'i, tuned surge beat'i, echo beat'i ve drift beat'i replay istegine mi yoksa gurultuye mi hizmet ediyor, henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve replay hissiyle birlikte `60s` clear payoff'i, surge, echo, drift beat'leri ve mevcut fairness hattina keep/tune/revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; opener cutoff, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target, retreat-pinch, spawn-threshold, spawn-fallback, replay-intent veya spawn-bookkeeping hatlarina hemen geri donme.
3. Run #215 validation/export truth koridoruna ve Run #216 opener cutoff koridoruna secilen yeni source problemi dogrudan bloklamadigi surece geri donme.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni opener cutoff, HUD/pause/panel, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn fairness, retreat-pinch, replay-intent, spawn-bookkeeping veya validation/export koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissiyle birlikte `60s` clear payoff'i, surge/echo/drift beat'leri ve fairness hattina keep/tune/revert notu birakmak; runtime yoksa opener cutoff'a geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/spawn.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/latestRun.ts` opener fairness cutoff davranisini `6.0s` fixed-step sacaginda deterministic olarak hizaladi.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
