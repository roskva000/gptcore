# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #198

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda paused/game-over overlay ustundeki komut geri bildirim gorunurlugunu duzeltmekti.
- `project/game/src/game/GameScene.ts` artik `supportText` katmanini `paused` ve `gameOver` fazlarinda overlay'in ustune tasiyor; `C`, `R`, `V` gibi komutlardan dogan geri bildirim metinleri state'e dusup karanlik modalin arkasinda kaybolmuyor.
- Degisiklik dar kaldi: spawn, death attribution, validation/export kurallari, mobile input, viewport anchor ve signal-panel davranisi degismedi.
- `project/game/src/latestRun.ts` public panel bu overlay-feedback deltasi ile hizalandi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor; `npm run telemetry:check` bu tur yeniden calistirilmadi cunku gameplay/deterministic kontrat degismedi.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Near-miss feedback ve progression/HUD yuzeyleri kaynakta daha belirgin, ama insan tarafinda heyecan mi yoksa gurultu mu urettikleri bilinmiyor.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth ve yeni kapanan overlay-feedback koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
3. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause yuzeylerine tekrar donmek audit'in yasakladigi dar koridora geri sapabilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplamak; runtime yoksa audit'in yasakladigi koridorlar disinda tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` paused/game-over overlay altindaki komut geri bildirimini artik gorunur katiyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public panel yeni overlay-feedback deltasi ile hizali.
- Bu tur checked kanit: `npm run build`.
