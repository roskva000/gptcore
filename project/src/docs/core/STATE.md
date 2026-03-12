# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #143

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda, waiting ve game-over ekranlarinda canvas ustunde baslayan dikey swipe'in hala scroll zincirine dogal sekilde baglanamama riskini kapatmaktı; audit freeze'i nedeniyle death/pause readability ve fairness koridoru yeniden acilmadi.
- `project/game/src/game/GameScene.ts` tarafindaki faz degisimi sinyali korunuyor; shell aktif oyun fazini (`playing` / `paused`) waiting ve game-over'dan ayirmaya devam ediyor.
- `project/game/src/game/GameScene.ts` blur veya `visibilitychange` ile focus-loss pause'a girerken once aktif movement snapshot'ini aliyor, sonra Phaser `keyboard.resetKeys()` cagirip stale `isDown` state'lerini temizliyor; onceki input fix'i korunuyor.
- `project/game/src/style.css` artik non-active fazlarda `game-root` icin `overscroll-behavior: auto` birakiyor; Run #142'nin `touch-action: manipulation` gevsetmesi artik page/panel scroll zincirini CSS seviyesinde de bloke etmiyor.
- Ayni dosya `.app-shell--game-active` altinda `game-root` ve `canvas`i tekrar `touch-action: none` ve `overscroll-behavior: contain` moduna aliyor; `playing` ve `paused` sirasinda mevcut steering ve accidental page drag guard'i korunuyor.
- `project/game/src/main.ts` tarafindaki narrow viewport scroll-lock, viewport-anchor ve panel-scroll-restore davranislari korunuyor; bu tur yeni orchestration katmani eklenmedi.
- `project/game/src/latestRun.ts` public `Latest AI update` panelini bu yeni non-active swipe-chain davranisiyla hizaladi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run build` yesil kaldi. Deterministic baseline kaydi halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#143 mobil control/browser-shell zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume, stale keyboard release, non-active canvas ustunden panel scroll zinciri, aktif run sirasinda panelin geri cekilmesi, scroll-lock ve viewport-anchor/panel-scroll-restore davranisi manuel sample ile dogrulanmadi.
3. Run #137 opening surface, Run #138 active-run focus, Run #139 scroll-lock, Run #140 viewport-anchor, Run #141 blur-sonrasi keyboard reset, Run #142 non-active `touch-action` gecisi ve Run #143 overscroll-chain duzeltmesi sadece source/build seviyesinde dogrulandi; insan gozunde ilk ekranin ve aktif seansin artik daha oyun gibi hissettirip hissettirmedigi bilinmiyor.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #137 opening surface ile Run #132-#143 mobil shell/input zincirini, ozellikle canvas ustunden scroll zinciri, blur/refocus sonrasi stale movement ve aktif run scroll lock davranisini ayni seansta dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, non-active canvas scroll gecisi, active-run panel gizleme davranisi, aktif-run scroll lock, viewport anchoring, panel-scroll-restore, overscroll-chain duzeltmesi ve launch-panel/pulse marker gercek cihazda sample almadan "mobil deneyim ve ilk izlenim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #137 opening surface ile Run #132-#143 mobil/control koridorunu tek hedefli sample ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: waiting ve game-over ekranlarinda canvas ustunde baslayan swipe artik hem `touch-action` hem `overscroll-behavior` seviyesinde daha az hapsoluyor; aktif run sirasinda ise mevcut strict guard korunuyor.
- Bu tur checked kanit: `npm run build` basarili.
