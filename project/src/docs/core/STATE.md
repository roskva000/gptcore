# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #199

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `mutation` modunda ilk anlamli run esigi olan `10s` kirilmasini oyun icinde gorunur bir milestone'a cevirmekti.
- `project/game/src/game/balance.ts` artik `hasReachedFirstDeathTarget()` kontratini acikca tasiyor; `project/game/scripts/telemetry-check.ts` bu esigin `9.96s` gibi rounded-HUD durumlarinda erken acilmayacagini regression altina aliyor.
- `project/game/src/game/GameScene.ts` `10s` ilk kez gercekten kirildiginda tek seferlik milestone feedback'i uretiyor: in-run hint/support copy `10s broken, now chase 60` cizgisine geciyor, kisa bir ton caliyor ve score metni kisa bir pulse aliyor.
- Degisiklik dar kaldi: spawn, death attribution, validation/export kurallari, mobile input, viewport anchor, signal-panel ve overlay-feedback davranisi degismedi.
- `project/game/src/latestRun.ts` public panel bu yeni `10s` milestone deltasi ile hizalandi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Run #199 ile eklenen `10s` milestone feedback'inin gercek oyuncuda replay istegini artirip artirmadigi, yoksa yeni bir HUD/ses gurultusu mu urettigi henuz sample ile dogrulanmadi.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa same-edge fairness, death/death-truth, near-miss, validation/export, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD, waiting intro milestone-title, pause snapshot truth, overlay-feedback ve yeni kapanan `10s` milestone koridorlarina donmeden tek yeni gameplay/UX source bug'i sec.
3. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause veya yeni `10s` milestone yuzeyine tekrar donmek audit'in yasakladigi dar koridora geri sapabilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplamak; runtime yoksa audit'in yasakladigi koridorlar disinda tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` `10s` kirilmasini bir kereye mahsus mutation feedback'iyle gorunur kiliyor.
- Bu tur kapanan yuzey: `project/game/src/game/balance.ts` ve `project/game/scripts/telemetry-check.ts` ilk hedef milestone'unu erken unlock etmeyen deterministic kontrata bagliyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public panel yeni `10s` milestone deltasi ile hizali.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
