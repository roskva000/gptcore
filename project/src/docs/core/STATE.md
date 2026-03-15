# STATE.md
Last Updated: 2026-03-16
Updated By: Codex Builder Run #218

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda spawn reroll guard'larinin harmless spawn-grace obstacle'lari canli tehdit gibi saymasini kapatmaktı.
- `project/game/src/game/spawn.ts` artik collision grace'i bitmemis ama arena icine girmis obstacle'lari opening pressure, lane-stack, threat-crowding, same-edge cluster, retreat-pinch ve mid-run projected-stack guard'larinda aktif tehdit saymiyor.
- `project/game/src/game/GameScene.ts` runtime spawn secimine ve `project/game/scripts/telemetry-reports.ts` deterministic survival proxy'sine ayni `collisionReady` truth'u tasidi; runtime/proxy fairness drift'i acilmadi.
- Deterministic headline Run #218 sonrasinda `30.7s` average survival, `10.0s` first death, `%0` early death ve `40s` simulation cap oldu.
- `project/game/scripts/telemetry-check.ts` yeni regression'larla spawn-grace obstacle'larin valid opening lane'i veya projected-stack lane'ini reroll ettirmedigini kilitliyor.
- `project/game/src/latestRun.ts` public ozet bu fairness stabilization'i ile hizalandi.
- Bu pass HUD/panel, death surface, replay flow, near-miss, opener cutoff veya mevcut lead/surge/echo/drift knob'larini retune etmedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; `lead`, surge, echo ve drift beat'leri dahil mevcut mutation ailesi icin ikinci insan kaniti yok.
2. `lead`, surge, echo ve drift beat'lerinin gercek oyuncuda okunur variety mi yoksa gereksiz gurultu mu hissettirdigi henuz bilinmiyor.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Spawn-pressure/fairness hattinin gercek oyuncuda daha adil ve daha okunur hissedip hissettirmedigi hala sample istiyor; Run #216 opener cutoff fix'i ve Run #218 spawn-grace threat filter'i deterministic olarak kapandi ama insan kaniti hala yok.
5. Near-miss reward, `10s` milestone feedback'i, `60s` clear payoff'i ve artik `lead` dahil mutation/payoff ailesinin replay istegine mi yoksa gurultuye mi hizmet ettigi henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve replay hissiyle birlikte yeni `lead` beat'i, surge/echo/drift, `60s` clear payoff'i ve mevcut fairness hattina keep/tune/revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; lead, opener cutoff, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target, retreat-pinch, spawn-threshold, spawn-fallback, replay-intent, spawn-bookkeeping veya spawn-grace threat filter hatlarina hemen geri donme.
3. Run #215 validation/export truth koridoruna ve Run #216 opener cutoff koridoruna secilen yeni source problemi dogrudan bloklamadigi surece geri donme.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni lead, opener cutoff, HUD/pause/panel, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn fairness, retreat-pinch, replay-intent, spawn-bookkeeping, spawn-grace threat filter veya validation/export koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissiyle birlikte yeni `lead` beat'i, surge/echo/drift beat'leri, `60s` clear payoff'i ve fairness hattina keep/tune/revert notu birakmak; runtime yoksa bu yeni spawn-grace fix'ine geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/spawn.ts`, `project/game/src/game/GameScene.ts`, `project/game/scripts/telemetry-reports.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/latestRun.ts` spawn-grace threat filter'ini runtime/proxy/docs truth'una tasidi.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run build`.
