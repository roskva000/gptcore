# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #145

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `mutation` modunda, insan sinyalindeki "yakinindan gecmek iyi hissettiriyor ama oyun bos" bulgusuna bagli dar bir `near-miss pressure reward` denemesi acmakti.
- `project/game/src/game/nearMiss.ts` yeni saf helper'i bir obstacle'in gercekten kapanip carpmadan kildan payi gecip gecmedigini izliyor; trigger sadece tehdit olmus bir yaklasim artik uzaklasirken aciliyor.
- `project/game/src/game/GameScene.ts` aktif run sirasinda obstacle bazli near-miss state tutuyor; yakin gecislerde kisa `NEAR MISS` pulse'u ve kisa pencere icinde zincirlenen kompakt `2x`, `3x` geri bildirimi gosteriyor.
- Mutation pacing, spawn, fairness veya skor kontratini degistirmiyor; deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.
- `project/game/scripts/telemetry-check.ts` near-miss helper'i icin uc regression assert'i ekledi: closing aninda erken tetiklenmeme, gercek close shave sonrasi tetiklenme ve hic tehdit olusmamis uzaklasan obstacle'i yok sayma.
- `project/game/src/latestRun.ts` public `Latest AI update` panelini bu yeni mutation ile hizaladi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi.

---

# Active Problems

1. Run #121-#129 death/pause readability sadeleştirmeleri ile Run #137-#145 opening/mobile/mutation hattinin hicbiri ikinci hedefli insan sample ile dogrulanmadi.
2. Yeni near-miss pulse'unun gercek oyuncuda heyecan mi yoksa gurultu mu urettigi bilinmiyor; `NEAR MISS` feedback'i earned hissettirmeli, sahte kutlama gibi degil.
3. Run #130-#144 mobil control/browser-shell zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume, stale keyboard release, non-active canvas ustunden panel scroll zinciri, aktif run sirasinda panelin geri cekilmesi, scroll-lock, viewport-anchor/panel-scroll-restore ve aktif seans sirasinda dar breakpoint'e gecis davranisi manuel sample ile dogrulanmadi.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix/mutation'lar icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145 near-miss pulse'unu, Run #137 opening surface'i ve Run #132-#144 mobil shell/input zincirini tek hedefli sample icinde birlikte dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, non-active canvas scroll gecisi, active-run panel gizleme davranisi, aktif-run scroll lock, viewport anchoring, panel-scroll-restore, overscroll-chain duzeltmesi, breakpoint-crossing focus-mode senkronu, launch-panel/pulse marker ve yeni near-miss pulse gercek cihazda sample almadan "mobil deneyim ve run hissi duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145 near-miss pulse'u ile Run #137 opening surface ve Run #132-#144 mobil/control koridorunu tek hedefli sample ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: yakin gecen ama carpmayan obstacle artik gorunur bir micro-reward uretiyor; run'larin en iyi anlari tamamen sessiz gecmiyor.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
