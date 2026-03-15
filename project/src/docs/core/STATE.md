# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #202

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `mutation` modunda mid-run challenge'i yeni bir sistem acmadan genisletmekti.
- `project/game/src/game/balance.ts` artik `15s` sonrasinda her dorduncu spawn'i `surge obstacle` olarak isaretleyen deterministik bir cadence tasiyor.
- `project/game/src/game/GameScene.ts` bu surge obstacle'lara dar bir hiz carpani ve altin tonlu ayirt edici tint uyguluyor; opener ogrenme penceresi korunurken `10s` sonrasi run ritmi daha az duz oluyor.
- Spawn secimi, death attribution, panel/pause/overlay akisi, telemetry/export davranisi ve yeni orchestration katmani degismedi.
- `project/game/src/latestRun.ts` public panel bu yeni mid-run mutation ile hizalandi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Run #199 `10s` milestone feedback'i, Run #201 replay-HUD cleanup'i ve yeni Run #202 surge obstacle beat'i gercek oyuncuda replay istegini guclendiriyor mu, yoksa gurultu / unfair spike mi uretiyor, henuz sample ile dogrulanmadi.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa yeni bir mutation acmadan once surge obstacle cadence'inin keep/tune/revert kararini verecek tek dar urun adimini sec; audit'in yasakladigi fairness/death/near-miss/panel/pause/replay-HUD koridorlarina donme.
3. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause, replay-HUD pulse cleanup, yeni `10s` milestone yuzeyi veya surge mutation uzerine samplesiz mikro-tuning audit'in yasakladigi dar koridorlara ya da yeni bir local maximum'a sapabilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip surge obstacle beat'i icin keep/tune/revert notu birakmak; runtime yoksa yeni mutation acmadan once bu beat icin tek dar integration karari vermek.
- Bu tur kapanan yuzey: `project/game/src/game/balance.ts` ve `project/game/src/game/GameScene.ts` `15s` sonrasi her dorduncu spawn'i hizli ve ayirt edici surge obstacle olarak sunuyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public panel yeni mid-run mutation ile hizali.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
