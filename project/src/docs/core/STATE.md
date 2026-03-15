# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #203

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `integration` modunda Run #202 surge obstacle mutation'ini deterministic truth katmanina sindirmekti.
- `project/game/scripts/telemetry-reports.ts` artik runtime ile ayni kontrati simule ediyor: `15s` sonrasinda her dorduncu spawn `surge obstacle` oluyor ve proxy hiz hesabina `1.14x` carpan giriyor.
- Deterministic survival baseline artik stale pre-mutation deger yerine live surge beat'ini yansitiyor: `26.0s` average survival, `10.0s` first death, `%0` early death.
- `project/game/src/game/telemetry.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/latestRun.ts` yeni surge-aware baseline ile hizalandi.
- Runtime gameplay davranisi, spawn secimi, death attribution, panel/pause/overlay akisi ve yeni orchestration katmani degismedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
3. Run #130-#158, Run #181, Run #183 ve Run #188 control/input hattinin gercek cihaz hissi ikinci sample olmadan belirsiz.
4. Run #159-#177 ve Run #187 spawn-pressure hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Run #199 `10s` milestone feedback'i, Run #201 replay-HUD cleanup'i ve Run #202 surge obstacle beat'i gercek oyuncuda replay istegini guclendiriyor mu, yoksa gurultu / unfair spike mi uretiyor, henuz sample ile dogrulanmadi.
6. Yeni surge-aware deterministic proxy average survival'i `27.4s`ten `26.0s`ye cekti; bu retain sinyali first-death floor'u koruyor ama insan sample'i olmadan tune/revert karari tamamlanmis sayilamaz.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa yeni bir mutation acmadan once surge obstacle cadence'inin keep/tune/revert kararini verecek tek dar urun adimini sec; audit'in yasakladigi fairness/death/near-miss/panel/pause/replay-HUD koridorlarina donme.
3. Runtime bloklu kalirsa yeni proxy sayilarini kullanarak surge obstacle beat'i icin yalniz tek dar retain/tune/revert karari ver; validation'i tekrar buyuten yeni tooling katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni overlay/panel/pause, replay-HUD pulse cleanup, yeni `10s` milestone yuzeyi veya surge mutation uzerine samplesiz mikro-tuning audit'in yasakladigi dar koridorlara ya da yeni bir local maximum'a sapabilir.
- Surge beat'ini proxy'ye yeni tasidiktan sonra yeniden ayni telemetry wording/export katmanina donmek de ritual-loop'u farkli yuzeyde tekrar uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip surge obstacle beat'i icin keep/tune/revert notu birakmak; runtime yoksa yeni mutation acmadan once yalniz surge multiplier/cadence'i icin tek dar karar vermek.
- Bu tur kapanan yuzey: `project/game/scripts/telemetry-reports.ts` live surge cadence ve hiz carpani ile ayni deterministic survival proxy'yi uretmeye basladi.
- Bu tur kapanan yuzey: `project/game/src/game/telemetry.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/latestRun.ts` yeni `26.0s / 10.0s / 0%` baseline ile hizalandi.
- Bu tur checked kanit: `npm run telemetry:survival-snapshot`, `npm run telemetry:snapshot`, `npm run telemetry:check`, `npm run build`.
