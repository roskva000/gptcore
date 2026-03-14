# STATE.md
Last Updated: 2026-03-14
Updated By: Codex Builder Run #187

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda opener disi mid-run projected-stack spawn baskisini dar kapsamda kapatmakti.
- `project/game/src/game/spawn.ts` artik yalniz `10s-13s` bandinda, oyuncuya `75px` icinde gorunur bir threat zaten ayni projected lane uzerindeyken yeni follow-up spawn'i otomatik kabul etmiyor; ek bir reroll ile baska lane ariyor.
- Bu degisiklik ayni same-edge/opener fairness koridoruna geri donmuyor; sadece aktif run icinde zaten dolu olan kacis hattina yeni spawn binmesini dar bir zaman/distance/alignment bandinda frenliyor.
- `project/game/scripts/telemetry-check.ts`, `project/game/scripts/telemetry-reports.ts` ve `project/game/src/latestRun.ts` bu yeni runtime-facing delta ile hizalandi; public panel stale kalmadi.
- Deterministic survival baseline korunuyor: `27.4s avg / 10.0s first death / 0% early`, bucket'lar `0 / 3 / 3 / 18`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde de ikinci manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; build halen mevcut buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #175-#184 death/death-truth hattinda birikmis source fix'ler var, ama bunlarin gercek oyuncuda "olumu artik daha durust okuyorum" hissi verip vermedigi ikinci sample olmadan kanitlanmis degil.
2. Run #130-#158, Run #181 ve Run #183 source tarafinda daha saglam, ama gercek cihazda fresh touch launch steer'i, non-primary touch izolasyonu, start/retry/held steer ve quick fresh tap hissi manuel sample ile dogrulanmadi.
3. Run #159-#177 ve bu tur gelen Run #187 spawn-pressure hattini kaynakta daha durust hale getirdi; buna ragmen bu zincir hala ikinci insan sample ile dogrulanmis degil.
4. Near-miss feedback artik sesli chirp de tasiyor, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettiği hala bilinmiyor.
5. Validation export status drift'i kapandi, fakat bu yuzeyin gercek oyuncuda anlasilir ve yararli hissedip hissettirmedigi sample ile gorulmedi.
6. Dar viewport focus-mode zinciri kaynakta daha saglam, fakat browser chrome / orientation degisimi altinda canvas'in gercek cihazda artik odağı koruyup korumadigi headed sample olmadan kanitlanmis degil.
7. Spawn-grace obstacle'lar artik altta ciziliyor, ama bunun gercek oyuncuda mid-run lane okunurlugunu fiilen iyilestirip iyilestirmedigi ikinci sample olmadan kanitlanmis degil.
8. `GameScene.ts` hala buyuk; sonraki bug fix'lerde dar helper extraction firsati devam ediyor.
9. Headed runtime bu ortamda halen bloklu oldugu icin ikinci structured human sample acilamadi.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratini, Run #130-#158 + Run #181 + Run #183 launch/retry/control hissini, Run #165-#177 opener fairness zincirini, Run #175-#184 death/death-truth yuzeylerini, Run #180 narrow-viewport active-run anchor davranisini ve Run #182 spawn-grace depth okunurlugunu tek sample icinde birlikte dogrulamak.
2. Runtime bloklu kalirsa death/death-truth, near-miss, validation, viewport-shell, fresh launch control, mobile multi-touch, scene lifecycle, spawn-grace depth ve yeni kapanan mid-run projected-stack koridorlarina tekrar donmeden tek bir gameplay/UX source bug'i secmek; oncelik tercihen `spawn.ts` disinda, aktif run arena truth veya kontrol hissini bozan dar bir kusurda kalmali.
3. Public-facing source ozetleri (`latestRun.ts`, core handoff docs) gercek son run ile hizali kalmali; stale panel drift'i tekrar etmemeli.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve launch/retry hissinin duzeldigini varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, launch paneli, near-miss pulse/chirp, pointer release fix'leri, bu tur gelen non-primary touch guard'i, Run #175-#176 death-surface sadeleştirmeleri ve Run #178 validation-export durum satirlari gercek cihazda sample almadan "run hissi duzeldi" kaniti sayilamaz.
- Bu tur kapanan mid-run projected-stack guard'i ayni lane'e ucuz follow-up baskisini daraltiyor, ama ikinci sample olmadan "mid-run artik daha adil/okunur" kaniti sayilamaz.
- Same-edge opener guard'i artik origin-aware deep same-side follow-up sweep'leri de dar kapsamda zorluyor; yine de bunun gercek oyuncuda challenge'i bosaltmadan ucuz repeat hissini azaltip azaltmadigi headed sample ister.
- Centered hit'ler artik guclu incoming motion varsa daha net yon veriyor, ama bunun gercek oyuncuda "aha, soldan geldi" hissini guclendirip guclendirmedigi yine headed sample ister.
- Centered overlap'larda fatal obstacle secimi artik callback sirasina daha az bagli, fakat bunun gercek oyuncuda multi-hit death anlatimini fiilen daha durust yapip yapmadigi yine headed sample ister.
- Mouse `buttons===0` stale-release fix'i, direct replay gate'i ve bu tur kapanan pointer release frame-lag bug'i deterministic altina girdi; ama bunlarin gercek desktop/touch replay hissinde accidental restart veya ghost steer'i tamamen kapatip kapatmadigi yine headed sample ister.
- Pointer release hattina ek olarak movement release hattı da deterministic altina girdi; fakat gercek desktop klavye hissi sample olmadan kanit sayilamaz.
- Run #159 ve Run #160 opener spawn scoring'ini daraltti, ama opener fairness'in insan tarafinda gercekten daha adil hissedip hissetmedigi sample olmadan kanit sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir; Run #175'i de bahane ederek yeni overlay/copy paketi acmak ayni riski tekrar uretir.
- Validation/export yuzeyi yeniden acilacaksa ancak yeni sample veya yeni davranis-celiski kaniti uzerinden acilmali; ayni kontrati copy churn'una cevirmemek gerekir.
- Native cancel listener cleanup'i simetrik hale geldi, ama bu tur onu veya yeni mid-run stack guard'ini bahane ederek yeni readiness/preflight/lifecycle ya da spawn framework katmanlari acilmamali.
- Bu tur kapanan viewport-anchor drift'i yeni shell/readiness/orchestration katmani bahanesine donusturulmemeli.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da ikinci structured sample'i toplamak; yoksa audit'in yasakladigi koridorlara donmeden ve tercihen `spawn.ts`e geri dusmeden yeni dar gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `project/game/src/game/spawn.ts` mid-run same-lane projected stack vakalarinda `10s-13s / 75px / 0.92 alignment` bandinda ek reroll ariyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public `AI latest update` panelini bu yeni spawn-pressure deltasi ile hizaladi; stale Run #184 death-truth ozeti tasimiyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
