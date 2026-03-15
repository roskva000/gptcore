# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #201

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda replay baslangicina sizan stale HUD pulse state'ini temizlemekti.
- `project/game/src/game/GameScene.ts` artik death ve yeni run reset'i sirasinda `scoreText`, `goalStatusText` ve `nearMissText` uzerindeki transient tint/scale/alpha/tween state'ini deterministik baslangic durumuna cekiyor.
- Boylece aniden biten near-miss, `10s` milestone veya `60s clear` feedback tween'leri bir sonraki denemeye gorsel iz tasimiyor; replay loop'u temiz bir HUD baseline ile aciliyor.
- Degisiklik dar kaldi: spawn, death attribution, control kurallari, validation/export, panel, pause, viewport ve telemetry davranisi degismedi.
- `project/game/src/latestRun.ts` public panel bu replay-integrity deltasi ile hizalandi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Run #199 ile eklenen `10s` milestone feedback'i ve Run #201 replay-HUD cleanup'i gercek oyuncuda replay istegini guclendiriyor mu, yoksa gorsel/ses gurultusu mu uretiyor, henuz sample ile dogrulanmadi.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth, overlay-feedback, replay-HUD cleanup ve `10s` milestone koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
3. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause, replay-HUD pulse cleanup veya yeni `10s` milestone yuzeyine tekrar donmek audit'in yasakladigi dar koridora geri sapabilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplamak; runtime yoksa audit'in yasakladigi koridorlar disinda tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` death ve reset sinirlarinda transient HUD feedback state'ini sifirliyor; replay yeni run'a stale pulse/tint tasimiyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public panel yeni replay-integrity deltasi ile hizali.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
