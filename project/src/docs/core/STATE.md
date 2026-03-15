# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #205

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda kenara tasan gercek near-miss shave'lerin gorunur olduklari halde odullendirilmeyen detection boslugunu kapatmakti.
- `project/game/src/game/nearMiss.ts` artik en yakin gecisin gorunur arenada olup olmadigini state'te tasiyor; obstacle en yakin gorunur shave'i alip hemen arena disina ciksa bile near-miss feedback'i tetikleniyor.
- `project/game/src/game/GameScene.ts` near-miss runtime state'ini yeni `closestDistanceWasVisible` truth'u ile sakliyor; mevcut mutation'a yeni branch eklenmedi.
- Deterministic survival proxy halen `26.0s` average survival, `10.0s` first death ve `%0` early death raporluyor; bu pass pacing/fairness headline'ini degistirmedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Near-miss reward artik edge-exit shave'leri de yakaliyor, ancak bunun gercek oyuncuda daha guclu run identity ve replay istegi uretip uretmedigi sample ile dogrulanmadi.
6. Run #199 `10s` milestone feedback'i, Run #201 replay-HUD cleanup'i ve tuned Run #204 surge obstacle beat'i gercek oyuncuda replay istegini guclendiriyor mu, yoksa gurultu / unfair spike mi uretiyor, henuz sample ile dogrulanmadi.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa near-miss ya da surge knob'una tekrar dokunmak yerine audit'in yasaklamadigi yeni tek dar gameplay/UX source sorununu sec.
3. Validation'i tekrar buyuten yeni tooling ya da orchestration katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause, replay-HUD pulse cleanup, yeni `10s` milestone yuzeyi, near-miss reward veya surge mutation uzerine samplesiz mikro-tuning audit'in yasakladigi dar koridorlara ya da yeni bir local maximum'a sapabilir.
- Surge beat'ini proxy'ye yeni tasidiktan sonra yeniden ayni telemetry wording/export katmanina donmek de ritual-loop'u farkli yuzeyde tekrar uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip near-miss reward, tuned surge beat'i ve replay istegi icin keep/tune/revert notu birakmak; runtime yoksa near-miss ya da surge'a geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/nearMiss.ts` en yakin shave'in gorunur arenada olup olmadigini state'te tutuyor.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` ve `project/game/scripts/telemetry-check.ts` edge-exit near-miss kontratini runtime + deterministic check tarafinda kilitledi.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run telemetry:survival-snapshot`, `npm run build`.
