# STATE.md
Last Updated: 2026-03-14
Updated By: Codex Builder Run #182

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda spawn-grace obstacle'larin canli threat lane'ini ustten maskelemesini kapatmaktı.
- `project/game/src/game/spawnGrace.ts` artik grace-state obstacle derinligini `SPAWN_GRACE_DEPTH`, collision-ready obstacle derinligini `COLLISION_READY_OBSTACLE_DEPTH` olarak acik kontrata bagliyor.
- `project/game/src/game/GameScene.ts` spawn, grace-unlock ve cleanup akışlarında bu kontrati `applySpawnGraceVisualState()` icinden uyguluyor; collision grace aktif obstacle'lar artik collision-ready threat'lerin altinda ciziliyor.
- Bu degisiklik pacing, spawn secimi, death surface, near-miss, validation ve launch-control semantiklerini degistirmedi; yalnizca mid-run readability tarafinda harmless-arrival overlay riskini daraltti.
- Deterministic survival baseline korunuyor: `27.4s avg / 10.0s first death / 0% early`, bucket'lar `0 / 3 / 3 / 18`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde de ikinci manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; build halen mevcut buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #175-#176 death surface sadeleşti, ama bunun gercek oyuncuda "artik daha okunur" hissi verip vermedigi ikinci sample olmadan kanitlanmis degil.
2. Run #130-#158 ve Run #181 launch/retry/control guard'lari source tarafinda daha saglam, ama gercek cihazda fresh touch launch steer'i, start/retry/held steer ve quick fresh tap hissi manuel sample ile dogrulanmadi.
3. Run #159-#177 opener spawn baskisini daha durust hale getirdi; buna ragmen fairness zinciri hala ikinci insan sample ile dogrulanmis degil.
4. Near-miss feedback artik sesli chirp de tasiyor, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettiği hala bilinmiyor.
5. Validation export status drift'i kapandi, fakat bu yuzeyin gercek oyuncuda anlasilir ve yararli hissedip hissettirmedigi sample ile gorulmedi.
6. Dar viewport focus-mode zinciri kaynakta daha saglam, fakat browser chrome / orientation degisimi altinda canvas'in gercek cihazda artik odağı koruyup korumadigi headed sample olmadan kanitlanmis degil.
7. Spawn-grace obstacle'lar artik altta ciziliyor, ama bunun gercek oyuncuda mid-run lane okunurlugunu fiilen iyilestirip iyilestirmedigi ikinci sample olmadan kanitlanmis degil.
8. `GameScene.ts` hala buyuk; sonraki bug fix'lerde dar helper extraction firsati devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratini, Run #130-#158 + Run #181 launch/retry hissini, Run #165-#177 opener fairness zincirini, Run #175-#178 death/validation yuzeylerini, Run #180 narrow-viewport active-run anchor davranisini ve bu tur kapanan spawn-grace depth okunurlugunu tek sample icinde birlikte dogrulamak.
2. Runtime bloklu kalırsa death/near-miss/validation, viewport-shell, fresh launch control ve yeni kapanan spawn-grace depth koridorlarina tekrar donmeden tek bir gameplay/UX source bug'i secmek; oncelik opener disi pressure/spacing trace'i veya baska gercek run hissi baskilarinda kalmali.
3. `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i audit failure sayiliyor.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve launch/retry hissinin duzeldigini varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, launch paneli, near-miss pulse/chirp, pointer release fix'i, Run #175-#176 death-surface sadeleştirmeleri ve Run #178 validation-export durum satirlari gercek cihazda sample almadan "run hissi duzeldi" kaniti sayilamaz.
- Bu tur kapanan spawn-grace depth ayrimi lane okunurlugunu iyilestirmeyi hedefliyor, ama ikinci sample olmadan "mid-run artik daha net" kaniti sayilamaz.
- Same-edge opener guard'i artik origin-aware deep same-side follow-up sweep'leri de dar kapsamda zorluyor; yine de bunun gercek oyuncuda challenge'i bosaltmadan ucuz repeat hissini azaltip azaltmadigi headed sample ister.
- Centered hit'ler artik guclu incoming motion varsa daha net yon veriyor, ama bunun gercek oyuncuda "aha, soldan geldi" hissini guclendirip guclendirmedigi yine headed sample ister.
- Centered overlap'larda fatal obstacle secimi artik callback sirasina daha az bagli, fakat bunun gercek oyuncuda multi-hit death anlatimini fiilen daha durust yapip yapmadigi yine headed sample ister.
- Mouse `buttons===0` stale-release fix'i, direct replay gate'i ve bu tur kapanan pointer release frame-lag bug'i deterministic altina girdi; ama bunlarin gercek desktop/touch replay hissinde accidental restart veya ghost steer'i tamamen kapatip kapatmadigi yine headed sample ister.
- Pointer release hattina ek olarak movement release hattı da deterministic altina girdi; fakat gercek desktop klavye hissi sample olmadan kanit sayilamaz.
- Run #159 ve Run #160 opener spawn scoring'ini daraltti, ama opener fairness'in insan tarafinda gercekten daha adil hissedip hissetmedigi sample olmadan kanit sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir; Run #175'i de bahane ederek yeni overlay/copy paketi acmak ayni riski tekrar uretir.
- Validation/export yuzeyi yeniden acilacaksa ancak yeni sample veya yeni davranis-celiski kaniti uzerinden acilmali; ayni kontrati copy churn'una cevirmemek gerekir.
- Scene lifecycle cleanup kapandi, ama bu tur bunu bahane ederek yeni readiness/preflight/lifecycle katmanlari acilmamali.
- Bu tur kapanan viewport-anchor drift'i yeni shell/readiness/orchestration katmani bahanesine donusturulmemeli.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#150 near-miss feedback hattini, Run #130-#158 + Run #181 launch/retry/control hissini, Run #165-#177 spawn readability/pressure guard'larini, Run #175-#178 death/validation yuzeylerini, Run #180 narrow-viewport active-run anchor davranisini ve Run #182 spawn-grace depth ayrimini tek hedefli ikinci insan sample'i ile dogrulamak; yoksa yeni dar gameplay/UX bug'ini secmek.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` ve `project/game/src/game/spawnGrace.ts` collision grace aktif obstacle'lari live threat'lerin altinda ciziyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
