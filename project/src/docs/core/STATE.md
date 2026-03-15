# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #212

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda retreat-pinch spawn guard'inin duvara dogru ulasilamaz input'u gercek kacis yonu gibi yorumlamasini kapatmakti.
- `project/game/src/game/spawn.ts` retreat-pinch guard'i artik `getReachableVelocity()` uzerinden duvar-baskisini reachability-aware yorumluyor; oyuncu sag duvara yaslanip disari bastiginda legal rear-lane spawn'lar sahte "forward pressure" diye reroll yemiyor.
- `project/game/scripts/telemetry-check.ts` yeni sag-duvar regression case'i ile bu drift'i kilitliyor; mevcut seed `#7` retreat-pinch floor kontrati da korunuyor.
- Deterministic survival proxy halen `26.0s` average survival, `10.0s` first death ve `%0` early death raporluyor; dagilim `0 / 3 / 11 / 10` olarak degismedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Yeni echo beat'inin gercek oyuncuda okunur bir trailing threat mi yoksa gereksiz gurultu mu hissettirdigi henuz bilinmiyor.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Run #159-#177, Run #187, Run #208, Run #211 ve yeni Run #212 dahil spawn-pressure/fairness hattinin oyuncu tarafinda gercekten daha adil ve daha ilgi cekici hissedip hissettirmedigi hala sample istiyor.
5. Near-miss reward, `10s` milestone feedback'i, tuned Run #204 surge obstacle beat'i ve bu yeni echo beat'i replay istegine mi yoksa gurultuye mi hizmet ediyor, henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve replay hissiyle birlikte yeni echo beat'i icin keep/tune/revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; near-miss, surge, echo, wall-target, retreat-pinch, spawn-threshold, spawn-fallback, replay-intent veya spawn-bookkeeping hatlarina hemen geri donme.
3. Validation'i tekrar buyuten yeni tooling ya da orchestration katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni HUD/pause/panel, near-miss, surge, echo, duvar-baski spawn fairness, retreat-pinch, replay-intent veya spawn-bookkeeping koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissiyle birlikte tuned surge, echo beat'i ve duvar-baski spawn fairness hattina keep/tune/revert notu birakmak; runtime yoksa bu koridorlara geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/spawn.ts` retreat-pinch guard'ini reachability-aware hale getirdi ve `project/game/scripts/telemetry-check.ts` sag-duvar false-positive regression'i ekledi.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run telemetry:survival-snapshot`, `npm run build`.
