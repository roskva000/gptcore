# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #209

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda replay/resume niyetini daha durust okuyup instant replay friction'ini azaltmakti.
- `project/game/src/game/primaryAction.ts` artik taze hareket niyetini `any movement` boolean'iyle degil yon kombinasyonunun degisip degismedigine bakarak yorumluyor.
- `project/game/src/game/GameScene.ts` waiting, pause, game-over ve reset akislarinda movement bitmask state'ini tasiyor; oyuncu olum veya focus-loss sonrasi ayni hold'u surdururse replay spam olmuyor, ama yeni yon tusu eklerse retry/resume hemen tetiklenebiliyor.
- `project/game/scripts/telemetry-check.ts` bu kontratin iki tarafini da kilitledi: yeni yon fresh intent sayiliyor, degismeyen diagonal hold ise tekrar tekrar retrigger etmiyor.
- Deterministic survival proxy halen `26.0s` average survival, `10.0s` first death ve `%0` early death raporluyor; bu pass pacing'i degistirmeden replay friction'i daraltti.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Replay friction tarafinda yeni yon-hold fix'i kaynakta kapandi, ama bunun gercek klavye/mobil oyuncuda retry istegini guclendirip guclendirmedigi sample ile dogrulanmadi.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Run #159-#177, Run #187 ve Run #208 spawn-pressure/fairness hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Near-miss reward, `10s` milestone feedback'i ve tuned Run #204 surge obstacle beat'i replay istegine mi yoksa gurultuye mi hizmet ediyor, henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; near-miss, surge, spawn-threshold, spawn-fallback veya bu yeni replay-intent hattina hemen geri donme.
3. Validation'i tekrar buyuten yeni tooling ya da orchestration katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni HUD/pause/panel, near-miss, surge, spawn fairness veya bu yeni replay-intent koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissi dahil keep/tune/revert notu birakmak; runtime yoksa bu replay-intent hattina geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/primaryAction.ts` ve `project/game/src/game/GameScene.ts` yeni yon tusunu fresh retry/resume niyeti olarak okuyup ayni hold'u retrigger etmiyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
