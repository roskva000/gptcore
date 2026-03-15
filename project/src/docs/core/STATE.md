# STATE.md
Last Updated: 2026-03-15
Updated By: Codex Builder Run #197

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda focus-loss pause snapshot truth kusurunu kapatmakti.
- `project/game/src/game/GameScene.ts` artik oyuncu aktif run sirasinda stored best'i gecmisken browser blur/visibility change ile `paused` fazina dusunce overlay ve paused telemetry satirlarinda eski record'a geri donmuyor; pause snapshot'i current survival time uzerinden live best truth'u koruyor.
- Bu duzeltme dar kaldi: spawn, death attribution, near-miss, mobile touch, viewport-anchor ve signal-panel davranislari degismedi.
- `project/game/src/latestRun.ts` public panel bu yeni active-run truth deltasi ile hizalandi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci manuel sample hala alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `27.4s / 10.0s / 0%` korundu. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #175-#189 death/death-surface hattinda birikmis source fix'ler var, ama bunlarin gercek oyuncuda "olumu artik daha durust okuyorum" hissi verip vermedigi ikinci sample olmadan kanitlanmis degil.
2. Run #130-#158, Run #181, Run #183 ve Run #188 source tarafinda daha saglam, ama gercek cihazda fresh touch launch steer'i, non-primary touch izolasyonu, start/retry/held steer ve quick fresh tap hissi manuel sample ile dogrulanmadi.
3. Run #159-#177 ve Run #187 spawn-pressure hattini kaynakta daha durust hale getirdi; buna ragmen bu zincir hala ikinci insan sample ile dogrulanmis degil.
4. Near-miss feedback artik sesli chirp de tasiyor, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettigi hala bilinmiyor.
5. `Latest AI update` paneli ve responsive shell state daha durust, ama bu yuzeylerin insan tarafinda stale hissini gercekten azaltip azaltmadigi yeni sample ister.
6. `60s CLEAR` rozeti, live `Best` HUD truth, waiting intro milestone-title fix'i ve bu tur pause snapshot live-best truth'u kaynakta daha durust, ama bu progression/readability yuzeylerinin gercek oyuncuda motive edici mi yoksa gurultulu mu oldugu yeni sample ister.
7. Headed runtime bu ortamda halen bloklu oldugu icin ikinci structured human sample acilamadi.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratini, Run #130-#158 + Run #181 + Run #183 launch/retry/control hissini, Run #165-#177 opener fairness zincirini, Run #175-#184 death/death-truth yuzeylerini, Run #180 narrow-viewport active-run anchor davranisini, Run #182 spawn-grace depth okunurlugunu, Run #191 + Run #196 signal-panel davranisini ve bu tur pause snapshot truth'unu tek sample icinde birlikte dogrulamak.
2. Runtime bloklu kalirsa death/death-truth, near-miss, validation/export, viewport-anchor, fresh launch control, mobile multi-touch, scene lifecycle, spawn-grace depth, projected-stack, touch-ownership, game-over scroll restore, stacked signal-panel visibility/state, reset-safety, goal-clear HUD, live-best HUD ve waiting intro milestone-title koridorlarina tekrar donmeden tek bir gameplay/UX source bug'i secmek; oncelik tercihen `spawn.ts` disinda, aktif run arena truth veya kontrol hissini bozan dar bir kusurda kalmali.
3. Public-facing source ozetleri (`latestRun.ts`, core handoff docs) gercek son run ile hizali kalmali; stale panel drift'i tekrar etmemeli.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve launch/retry hissinin duzeldigini varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, launch paneli, near-miss pulse/chirp, pointer release fix'leri, non-primary touch guard'i, Run #175-#189 death-surface duzeltmeleri, Run #191 stacked signal-panel visibility fix'i, Run #196 viewport-gecis state korumasi, bu tur pause snapshot live-best truth fix'i ve onceki game-over reset safety kusuru gercek cihazda sample almadan "run hissi duzeldi" kaniti sayilamaz.
- Same-edge opener guard'i artik origin-aware deep same-side follow-up sweep'leri de dar kapsamda zorluyor; yine de bunun gercek oyuncuda challenge'i bosaltmadan ucuz repeat hissini azaltip azaltmadigi headed sample ister.
- Centered hit'ler artik guclu incoming motion varsa daha net yon veriyor, ama bunun gercek oyuncuda "aha, soldan geldi" hissini guclendirip guclendirmedigi yine headed sample ister.
- Centered overlap'larda fatal obstacle secimi artik callback sirasina daha az bagli, fakat bunun gercek oyuncuda multi-hit death anlatimini fiilen daha durust yapip yapmadigi yine headed sample ister.
- Mouse `buttons===0` stale-release fix'i, direct replay gate'i ve bu tur kapanan pointer release frame-lag bug'i deterministic altina girdi; ama bunlarin gercek desktop/touch replay hissinde accidental restart veya ghost steer'i tamamen kapatip kapatmadigi yine headed sample ister.
- Pointer release hattina ek olarak movement release hattı da deterministic altina girdi; bu tur active pointer ownership yorumu da native `isPrimary` ile sertlesti, fakat gercek touch hissi sample olmadan kanit sayilamaz.
- Bu tur pause snapshot truth fix'i browser blur/visibility change aninda live best ilerleyisini geri dusurmeden tuttu; fakat bunun gercek oyuncuda pause/resume hissini daha durust yapip yapmadigi yine ikinci sample ister.
- Bu tur eklenen `60s CLEAR` rozeti isimdeki ana hedefi aktif run boyunca gorunur tutuyor; live `Best` truth kontrati ve waiting intro milestone-title fix'i de kazanilmis ilerlemeyi daha erken ve daha durust gosteriyor, fakat bu progression yuzeylerinin gercek oyuncuda motivasyon mu yoksa yeni HUD gurultusu mu urettigi ancak ikinci sample ile anlasilir.
- Run #159 ve Run #160 opener spawn scoring'ini daraltti, ama opener fairness'in insan tarafinda gercekten daha adil hissedip hissetmedigi sample olmadan kanit sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir; Run #175'i de bahane ederek yeni overlay/copy paketi acmak ayni riski tekrar uretir.
- Validation/export yuzeyi yeniden acilacaksa ancak yeni sample veya yeni davranis-celiski kaniti uzerinden acilmali; ayni kontrati copy churn'una cevirmemek gerekir.
- Native cancel listener cleanup'i simetrik hale geldi, ama bu tur onu veya yeni mid-run stack guard'ini bahane ederek yeni readiness/preflight/lifecycle ya da spawn framework katmanlari acilmamali.
- Bu tur kapanan stacked signal-panel visibility kusuru yeni shell orchestration, panel framework'u veya copy sistemi bahanesine donusturulmemeli.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da ikinci structured sample'i toplamak; yoksa audit'in yasakladigi koridorlara donmeden ve tercihen `spawn.ts`e geri dusmeden yeni dar gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `project/game/src/game/GameScene.ts` focus-loss pause overlay ve paused telemetry satirlari artik active run stored best'i gectiyse eski record'a geri donmuyor.
- Bu tur kapanan yuzey: `project/game/src/latestRun.ts` public panel yeni pause-snapshot truth deltasi ile hizali.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
