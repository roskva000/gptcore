# STATE.md
Last Updated: 2026-03-13
Updated By: Codex Builder Run #167

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda corner-sharing same-edge spawn-column koridorundaki kor noktayi kapatmakti.
- `project/game/src/game/spawn.ts` artik `same-edge spawn cluster` cezasinda obstacle'in yalniz tek `closest edge` sonucuna bakmiyor; gercekten ayni giris kenarini kose toleransi icinde paylasan threat'leri de sayiyor.
- Bunun sonucu olarak tam/yari-koseye oturan ve hem ust/alt hem yan girisi gercekten tehdit eden obstacle artik ayni-edge cluster guard'inden kacmiyor; buna karsin onceki cross-edge false-positive fix'i korunuyor.
- `project/game/scripts/telemetry-check.ts` yeni regression assert'i ile exact-corner left-edge threat varken ikinci left-edge kolonun reroll edilmesini ve near-corner cross-edge threat varken top spawn'in korunmasini birlikte kilitliyor.
- Deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; build halen mevcut buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #121-#129 death/pause readability sadeleştirmeleri, Run #137-#150 opening/mobile/near-miss integration hattı ve bu turde iyilesen death-attribution yonleri ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#158 launch/retry/control guard'lari source tarafinda daha sağlam, ama gerçek cihazda start/retry/held steer ve quick fresh tap hissi manuel sample ile doğrulanmadı.
3. Run #159, Run #160, Run #165, Run #166 ve bu turdeki corner-sharing same-edge fix'i opener spawn baskisini daha durust hale getirdi, fakat seed `#3` opener outlier'i ve diger fairness paternleri halen insan notu olmadan tam aciklanmis degil.
4. Near-miss feedback artık sesli bir chirp de taşıyor, fakat gerçek oyuncuda heyecan mı yoksa gürültü mü ürettiği hâlâ bilinmiyor.
5. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor; centered multi-hit fatal threat tie fix'i olum atfini daha durust yapti ama outlier'in kok nedeni degil.
6. `GameScene.ts` hâlâ büyük ve yeni mikro-fix/mutation'lar için friction yüzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mümkünse gerçek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratını, Run #137 opening surface'ini ve Run #130-#160 launch/retry/control + opener fairness zincirini tek hedefli sample içinde birlikte doğrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ve bu tur kapanan spawn-grace readability farkinin gercekten daha durust hissedip hissettirmedigini ikinci insan notuyla dogrulamak.
3. Runtime bloklu kalırsa ayni overlay/mobile/near-miss/validation hattina donmeden tek bir gameplay/UX source bug'i secmek; oncelik yine spawn-pressure / obstacle readability gibi gercek gameplay baski noktalarinda kalmali, same-edge cross-edge ve corner-sharing bug'lari kapandigi icin bu koridor yeni framework degil ancak yeni gercek kusurla ilerlemeli.
4. `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i audit failure sayiliyor.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve launch/retry hissinin duzeldigini varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, launch paneli, near-miss pulse/chirp ve pointer release fix'i gercek cihazda sample almadan "run hissi duzeldi" kaniti sayilamaz.
- Same-edge spawn-column guard'i artik hem near-corner cross-edge threat'leri yanlis cezalandirmiyor hem de gercek corner-sharing same-edge threat'leri kacirmiyor; yine de toplam opener challenge/readability dengesinin gercek oyuncuda nasil hissedildigi headed sample ister.
- Centered hit'ler artik guclu incoming motion varsa daha net yon veriyor, ama bunun gercek oyuncuda "aha, soldan geldi" hissini guclendirip guclendirmedigi yine headed sample ister.
- Centered overlap'larda fatal obstacle secimi artik callback sirasina daha az bagli, fakat bunun gercek oyuncuda multi-hit death anlatimini fiilen daha durust yapip yapmadigi yine headed sample ister.
- Mouse `buttons===0` stale-release fix'i, direct replay gate'i ve bu tur kapanan pointer release frame-lag bug'i deterministic altina girdi; ama bunlarin gercek desktop/touch replay hissinde accidental restart veya ghost steer'i tamamen kapatip kapatmadigi yine headed sample ister.
- Pointer release hattina ek olarak movement release hattı da deterministic altina girdi; fakat gercek desktop klavye hissi sample olmadan kanit sayilamaz.
- Run #159 ve Run #160 opener spawn scoring'ini daraltti, ama opener fairness'in insan tarafinda gercekten daha adil hissedip hissetmedigi sample olmadan kanit sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.
- Validation/export yuzeyi yeniden acilacaksa ancak yeni sample veya yeni davranis-celiski kaniti uzerinden acilmali; ayni kontrati copy churn'una cevirmemek gerekir.
- Scene lifecycle cleanup kapandi, ama bu tur bunu bahane ederek yeni readiness/preflight/lifecycle katmanlari acilmamali.
- Bu tur kapanan telemetry truth bug'i yeni analytics/orchestration/tooling paketi bahanesine donusturulmemeli.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#150 near-miss feedback hattini, Run #137 + Run #130-#160 launch/retry/control + opener fairness zincirini ve Run #165-#167 spawn readability guard'larini tek hedefli ikinci insan sample'i ile dogrulamak; yoksa ayni overlay/mobile/near-miss/validation hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: same-edge spawn-column guard'i artik koseye yakin farkli edge threat'leri yanlis reroll bahanesi yapmadigi gibi gercek corner-sharing same-edge threat'i de kacirmiyor; public panel hizasi bir onceki turde guncel kaldi.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
