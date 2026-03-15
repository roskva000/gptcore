# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #204

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda Run #202 surge obstacle beat'i icin tek dar tuning karari vermekti.
- `project/game/src/game/balance.ts` artik `15s` sonrasinda surge obstacle'i her dorduncu degil her besinci spawn'da aciyor; `1.14x` hiz carpani ve gorunur tint korunuyor.
- Deterministic survival proxy tuned cadence altinda `26.0s` average survival, `10.0s` first death ve `%0` early death raporluyor.
- `project/game/scripts/telemetry-check.ts`, validation snapshot beklentileri ve `project/game/src/latestRun.ts` yeni cadence truth'u ile hizalandi.
- Runtime gameplay davranisinda yeni branch, yeni mutation dali, yeni validation/tooling katmani veya yeni orchestration katmani acilmadi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run telemetry:survival-snapshot`, `npm run telemetry:snapshot`, `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Run #199 `10s` milestone feedback'i, Run #201 replay-HUD cleanup'i ve tuned Run #204 surge obstacle beat'i gercek oyuncuda replay istegini guclendiriyor mu, yoksa gurultu / unfair spike mi uretiyor, henuz sample ile dogrulanmadi.
6. Cadence tuning'i deterministic dagilimi yumusatti ama insan sample'i olmadan final retain karari tamamlanmis sayilamaz.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa ayni surge knob'una bir kez daha dokunmak yerine audit'in yasaklamadigi yeni tek dar gameplay/UX source sorununu sec.
3. Validation'i tekrar buyuten yeni tooling ya da orchestration katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause, replay-HUD pulse cleanup, yeni `10s` milestone yuzeyi veya surge mutation uzerine samplesiz mikro-tuning audit'in yasakladigi dar koridorlara ya da yeni bir local maximum'a sapabilir.
- Surge beat'ini proxy'ye yeni tasidiktan sonra yeniden ayni telemetry wording/export katmanina donmek de ritual-loop'u farkli yuzeyde tekrar uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip tuned surge beat'i icin keep/tune/revert notu birakmak; runtime yoksa surge'a geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/balance.ts` surge obstacle cadence'ini `4`ten `5`e cekti.
- Bu tur kapanan yuzey: `project/game/scripts/telemetry-check.ts`, validation snapshot beklentileri ve `project/game/src/latestRun.ts` yeni `26.0s / 10.0s / 0%` tuned cadence truth'u ile hizalandi.
- Bu tur checked kanit: `npm run telemetry:survival-snapshot`, `npm run telemetry:snapshot`, `npm run telemetry:check`, `npm run build`.
