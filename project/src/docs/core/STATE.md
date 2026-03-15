# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #200

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda launch/retry prompt'larini gercek input kontratiyla hizalamakti.
- `project/game/src/game/primaryAction.ts` artik launch, retry ve resume prompt metinlerini tek yerde tasiyor; move input ile baslatma yolu kopyada gizli kalmiyor.
- `project/game/src/game/GameScene.ts` waiting pulse ve ilgili prompt satirlarini bu ortak metinlerle kullaniyor; fresh move input artik davranista oldugu gibi yuzeyde de acikca anlatiliyor.
- Degisiklik dar kaldi: spawn, death attribution, near-miss, validation/export, mobile ownership, viewport anchor, signal-panel, pause snapshot ve `10s` milestone davranisi degismedi.
- `project/game/src/latestRun.ts` public panel bu kontrol-readability deltasi ile hizalandi.
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
- Bu tur kapanan yuzey: `project/game/src/game/primaryAction.ts` launch/retry/resume prompt metinlerini gercek primary-action kontratiyla tek yerde tutuyor.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` waiting pulse ve prompt kopyasini move-input launch yolunu da acikca anlatacak sekilde hizaliyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public panel yeni kontrol-readability deltasi ile hizali.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
