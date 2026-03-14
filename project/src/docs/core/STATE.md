# STATE.md
Last Updated: 2026-03-14
Updated By: Codex Builder Run #177

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda seed `#7`nin `10.0s` floor'unu ureten dar retreat-pinch spawn kusurunu kapatmakti.
- `project/game/src/game/spawn.ts` artik oyuncunun onunde `60px` icinde cok yakin threat varken yeni spawn ayni anda arka kacis koridorunu `200px` bandinda kapatiyorsa, `10s` hedef-first-death penceresi icinde bir reroll daha ariyor.
- Bu guard fixed-step drift'i de tolere ediyor; spawn secimi `10.000000000000076s` frame'ine denk gelse bile `10s` safety window sessizce kapanmiyor.
- Deterministic baseline korunuyor: `27.4s avg / 10.0s first death / 0% early`, bucket'lar `0 / 3 / 3 / 18`; seed `#3` kapali, seed `#7` halen taban seed ama artik `10 spawn / 1 reroll` ile eski rear-lane seal'i bedelsiz kabul etmiyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; build halen mevcut buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #175 ve Run #176 ile death surface daha kompakt ve tek-odakli, ama bunun gercek oyuncuda "artik daha okunur" hissi verip vermedigi ikinci sample olmadan kanitlanmis degil.
2. Run #130-#158 launch/retry/control guard'lari source tarafinda daha sağlam, ama gerçek cihazda start/retry/held steer ve quick fresh tap hissi manuel sample ile doğrulanmadı.
3. Run #159, Run #160, Run #165-#174 opener spawn baskisini daha durust hale getirdi; buna ragmen bu fairness zinciri hala ikinci insan sample ile dogrulanmis degil.
4. Near-miss feedback artık sesli bir chirp de taşıyor, fakat gerçek oyuncuda heyecan mı yoksa gürültü mü ürettiği hâlâ bilinmiyor.
5. Deterministic erken-olum tabani artik `10.0s`; seed `#7`deki rear-lane seal kusuru kapandi ama tabanin gercek oyuncuda adil mi yoksa hala keskin mi hissettirdigi bilinmiyor.
6. `GameScene.ts` hâlâ büyük ve yeni mikro-fix/mutation'lar için friction yüzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mümkünse gerçek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratını, Run #130-#158 launch/retry hissini, Run #165-#174 opener fairness zincirini ve Run #175 game-over sadeleştirmesini tek sample içinde birlikte doğrulamak.
2. Runtime bloklu kalırsa death/mobile/near-miss wording koridoruna tekrar donmeden tek bir gameplay/UX source bug'i secmek; oncelik spawn-pressure / obstacle readability gibi gercek gameplay baski noktalarinda kalmali. Seed `#7` kapandi; yeni fallback adayi baska `10.0s` taban trace'i veya benzeri dar gameplay kusuru olmali.
3. `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i audit failure sayiliyor.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve launch/retry hissinin duzeldigini varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, launch paneli, near-miss pulse/chirp, pointer release fix'i ve Run #175-#176 death-surface sadeleştirmeleri gercek cihazda sample almadan "run hissi duzeldi" kaniti sayilamaz.
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
- Bu tur kapanan telemetry truth bug'i yeni analytics/orchestration/tooling paketi bahanesine donusturulmemeli.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#150 near-miss feedback hattini, Run #130-#158 launch/retry/control hissini, Run #165-#177 spawn readability/pressure guard'larini ve Run #175-#176 death-surface sadeleştirmelerini tek hedefli ikinci insan sample'i ile dogrulamak; yoksa seed `#7` sonrasinda kalan yeni dar gameplay/UX bug'ini secmek.
- Bu tur kapanan yuzey: `project/game/src/game/spawn.ts` rear-lane retreat pinch kusurunu `10s` penceresinde bir ek reroll ile daraltti; seed `#7` artik son spawn'da eski sol-kacis seal'ini ucretsiz kabul etmiyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
