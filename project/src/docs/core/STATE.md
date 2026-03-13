# STATE.md
Last Updated: 2026-03-13
Updated By: Codex Builder Run #151

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda validation/export affordance'indaki davranis-copy tutarsizligini kapatmaktı.
- `project/game/src/game/telemetry.ts` artik validation export hazirligini ortak `5-run` sample kontratina bagliyor; `V` export ilk olumden sonra degil, ancak `5` tamamlanmis run sonrasi aciliyor.
- `project/game/src/game/GameScene.ts` block mesajini ve waiting/game-over support satirlarini ayni `5-run` kontratiyla hizaladi; oyuncuya verilen yonlendirme ile gercek davranis artik ayni.
- Bu tur pacing, fairness, spawn, near-miss, mobile shell ve overlay readability kontratlari degismedi; yalnizca validation surface durustlastirildi.
- Deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi.

---

# Active Problems

1. Run #121-#129 death/pause readability sadeleştirmeleri ile Run #137-#146 opening/mobile/mutation-integration hattinin hicbiri ikinci hedefli insan sample ile dogrulanmadi.
2. Near-miss feedback artik sesli bir chirp da tasiyor, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettigi halen bilinmiyor; `NEAR MISS` feedback'i earned hissettirmeli, sahte kutlama gibi degil.
3. Run #130-#144 mobil control/browser-shell zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume, stale keyboard release, non-active canvas ustunden panel scroll zinciri, aktif run sirasinda panelin geri cekilmesi, scroll-lock, viewport-anchor/panel-scroll-restore ve aktif seans sirasinda dar breakpoint'e gecis davranisi manuel sample ile dogrulanmadi.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix/mutation'lar icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#146, Run #149 ve Run #150 near-miss feedback kontratini, Run #137 opening surface'i ve Run #132-#144 mobil shell/input zincirini tek hedefli sample icinde birlikte dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- `60s clear` badge'i artik erken verilmiyor, fakat bunun insan tarafinda earned hissedip hissettirmedigi hala sample'a bagli.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, non-active canvas scroll gecisi, active-run panel gizleme davranisi, aktif-run scroll lock, viewport anchoring, panel-scroll-restore, overscroll-chain duzeltmesi, breakpoint-crossing focus-mode senkronu, launch-panel/pulse marker ve yeni near-miss pulse gercek cihazda sample almadan "mobil deneyim ve run hissi duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.
- Validation/export yuzeyi yeniden acilacaksa ancak yeni sample veya yeni davranis-celiski kaniti uzerinden acilmali; ayni kontrati copy churn'una cevirmemek gerekir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#146, Run #149 ve Run #150 near-miss feedback kontratini Run #137 opening surface ve Run #132-#144 mobil/control koridoruyla tek hedefli sample icinde dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: validation/export affordance'i artik oyuncuya soylenen `5-run` sample kontratini gercekten uyguluyor; erken `V` export hazirlik yanilgisi kapandi.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
