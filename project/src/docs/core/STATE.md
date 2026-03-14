# STATE.md
Last Updated: 2026-03-14
Updated By: Codex Builder Run #178

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda kaydedilmis validation export'un yeni run'lardan sonra halen guncelmis gibi gorunmesine yol acan UX drift'ini kapatmaktı.
- `project/game/src/game/telemetry.ts` artik saved validation report'un aktif session sample ile birebir ayni olup olmadigini `isValidationReportCurrent()` helper'iyle ayiriyor.
- `project/game/src/game/GameScene.ts` waiting ve game-over telemetry satirlarinda artik `export ready`, `older sample` ve `stale -> Press V to refresh` durumlarini ayri gosteriyor; eski export yeni sample uzerine sessizce "hazir" gibi binmiyor.
- `project/game/scripts/telemetry-check.ts` bu freshness kontratini current, stale ve incomplete-sample varyantlariyla deterministic olarak kilitliyor.
- Deterministic survival baseline korunuyor: `27.4s avg / 10.0s first death / 0% early`, bucket'lar `0 / 3 / 3 / 18`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde de ikinci manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; build halen mevcut buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #175-#176 death surface sadeleşti, ama bunun gercek oyuncuda "artik daha okunur" hissi verip vermedigi ikinci sample olmadan kanitlanmis degil.
2. Run #130-#158 launch/retry/control guard'lari source tarafinda daha saglam, ama gercek cihazda start/retry/held steer ve quick fresh tap hissi manuel sample ile dogrulanmadi.
3. Run #159-#177 opener spawn baskisini daha durust hale getirdi; buna ragmen fairness zinciri hala ikinci insan sample ile dogrulanmis degil.
4. Near-miss feedback artik sesli chirp de tasiyor, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettiği hala bilinmiyor.
5. Validation export status drift'i kapandi, fakat bu yuzeyin gercek oyuncuda anlasilir ve yararli hissedip hissettirmedigi sample ile gorulmedi.
6. `GameScene.ts` hala buyuk ve yeni mikro-fix/mutation'lar icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratini, Run #130-#158 launch/retry hissini, Run #165-#177 opener fairness zincirini, Run #175-#176 death-surface sadeleştirmesini ve Run #178 validation-export durum satirlarini tek sample icinde birlikte dogrulamak.
2. Runtime bloklu kalırsa death/mobile/near-miss wording koridoruna tekrar donmeden tek bir gameplay/UX source bug'i secmek; oncelik hala spawn-pressure / obstacle readability veya benzeri gercek run hissi baskilarinda kalmali.
3. `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i audit failure sayiliyor.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve launch/retry hissinin duzeldigini varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, launch paneli, near-miss pulse/chirp, pointer release fix'i, Run #175-#176 death-surface sadeleştirmeleri ve Run #178 validation-export durum satirlari gercek cihazda sample almadan "run hissi duzeldi" kaniti sayilamaz.
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

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#150 near-miss feedback hattini, Run #130-#158 launch/retry/control hissini, Run #165-#177 spawn readability/pressure guard'larini, Run #175-#176 death-surface sadeleştirmelerini ve Run #178 validation-export durum satirlarini tek hedefli ikinci insan sample'i ile dogrulamak; yoksa yeni dar gameplay/UX bug'ini secmek.
- Bu tur kapanan yuzey: `project/game/src/game/telemetry.ts` ile `project/game/src/game/GameScene.ts` validation export durumunun stale/current ayrimini acikca yapıyor; eski saved export yeni sample uzerine "ready" gibi binmiyor.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
