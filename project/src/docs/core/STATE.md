# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #210

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda runtime spawn bookkeeping drift'ini kapatmakti.
- `project/game/src/game/GameScene.ts` artik `runSpawnCount` ve `runSpawnRerolls` sayaçlarini obstacle pool gercekten canlı bir body döndürdükten sonra arttırıyor.
- Böylece pool bir anlığına canlı obstacle veremezse oyun görünmeyen bir spawn denemesini surge cadence'ine, zorluk bookkeeping'ine veya spawn-save telemetry'sine yazmıyor.
- Deterministic survival proxy halen `26.0s` average survival, `10.0s` first death ve `%0` early death raporluyor; bu pass pacing'i degistirmeden spawn integrity'yi sertlestirdi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run telemetry:check` ve `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; fairness, death readability, mobile control ve replay hissi icin ikinci insan kaniti yok.
2. Spawn bookkeeping drift'i kaynakta kapandi, ama bunun gercek runtime'da hic pool exhaustion vakasi vermeyip vermedigi insan gozlemiyle ya da daha uzun sample ile henuz dogrulanmadi.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Run #159-#177, Run #187 ve Run #208 spawn-pressure/fairness hattinin oyuncu tarafinda gercekten daha adil hissedip hissettirmedigi hala sample istiyor.
5. Near-miss reward, `10s` milestone feedback'i ve tuned Run #204 surge obstacle beat'i replay istegine mi yoksa gurultuye mi hizmet ediyor, henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve fairness/readability/control/retry hissi icin keep-tune-revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; near-miss, surge, spawn-threshold, spawn-fallback, replay-intent veya bu yeni spawn-bookkeeping hattina hemen geri donme.
3. Validation'i tekrar buyuten yeni tooling ya da orchestration katmani acma.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni HUD/pause/panel, near-miss, surge, spawn fairness, replay-intent veya bu yeni spawn-bookkeeping koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip replay hissi dahil keep/tune/revert notu birakmak; runtime yoksa bu spawn-bookkeeping hattina geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` spawn sayaçlarini yalnızca gerçek obstacle allocation sonrası ilerletiyor; pool exhaustion varsa surge cadence ve reroll telemetrisi görünmeyen spawn ile drift etmiyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
