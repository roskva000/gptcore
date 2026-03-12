# STATE.md
Last Updated: 2026-03-13
Updated By: Codex Builder Run #148

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda, `60s clear` sonrasinda blur/pause-resume akisinin oyuncuyu tekrar pre-goal hedef metnine dusurmesini kapatmakti.
- `project/game/src/game/GameScene.ts` artik pause overlay'inden oyuna donerken support copy'yi korunan run durumuna gore kuruyor; goal clear edilmis bir run blur/refocus sonrasi tekrar `break 10s, then clear 60s` yonlendirmesine donmuyor.
- Ayni dosya playing hint icin `getCurrentPlayingHintText()` yolunu kullaniyor; `60s clear!` kutlamasi aktif pencere icinde pause edilirse resume sonrasi generik chase hint'i degil milestone baglami geri geliyor.
- Bu tur pacing, fairness, spawn, mobile shell ve overlay copy hiyerarsisi degismedi; yalnizca namesake goal baglaminin resume sonrasi durust kalmasi saglandi.
- Deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi.

---

# Active Problems

1. Run #121-#129 death/pause readability sadeleştirmeleri ile Run #137-#146 opening/mobile/mutation-integration hattinin hicbiri ikinci hedefli insan sample ile dogrulanmadi.
2. Near-miss pulse artik daha durust, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettigi halen bilinmiyor; `NEAR MISS` feedback'i earned hissettirmeli, sahte kutlama gibi degil.
3. Run #130-#144 mobil control/browser-shell zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume, stale keyboard release, non-active canvas ustunden panel scroll zinciri, aktif run sirasinda panelin geri cekilmesi, scroll-lock, viewport-anchor/panel-scroll-restore ve aktif seans sirasinda dar breakpoint'e gecis davranisi manuel sample ile dogrulanmadi.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix/mutation'lar icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#146 near-miss pulse kontratini, Run #137 opening surface'i ve Run #132-#144 mobil shell/input zincirini tek hedefli sample icinde birlikte dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- `60s clear` badge'i artik erken verilmiyor, fakat bunun insan tarafinda earned hissedip hissettirmedigi hala sample'a bagli.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, non-active canvas scroll gecisi, active-run panel gizleme davranisi, aktif-run scroll lock, viewport anchoring, panel-scroll-restore, overscroll-chain duzeltmesi, breakpoint-crossing focus-mode senkronu, launch-panel/pulse marker ve yeni near-miss pulse gercek cihazda sample almadan "mobil deneyim ve run hissi duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#146 near-miss pulse'unu Run #137 opening surface ve Run #132-#144 mobil/control koridoruyla tek hedefli sample icinde dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `60s clear` sonrasinda blur/refocus veya focus-loss pause olursa oyun resume sonrasi goal clear baglamini koruyor; oyuncu ayni run icinde tekrar pre-goal onboarding metnine dusmuyor.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
