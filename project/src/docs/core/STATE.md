# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #144

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda, aktif run basladiktan sonra browser dar viewport breakpoint'ine gectiginde shell focus-mode zincirinin sessizce eksik kalma riskini kapatmakti; audit freeze'i nedeniyle death/pause readability ve fairness koridoru yeniden acilmadi.
- `project/game/src/game/GameScene.ts` tarafindaki faz degisimi sinyali korunuyor; shell aktif oyun fazini (`playing` / `paused`) waiting ve game-over'dan ayirmaya devam ediyor.
- `project/game/src/game/GameScene.ts` blur veya `visibilitychange` ile focus-loss pause'a girerken once aktif movement snapshot'ini aliyor, sonra Phaser `keyboard.resetKeys()` cagirip stale `isDown` state'lerini temizliyor; onceki input fix'i korunuyor.
- `project/game/src/style.css` artik non-active fazlarda `game-root` icin `overscroll-behavior: auto` birakiyor; Run #142'nin `touch-action: manipulation` gevsetmesi artik page/panel scroll zincirini CSS seviyesinde de bloke etmiyor.
- Ayni dosya `.app-shell--game-active` altinda `game-root` ve `canvas`i tekrar `touch-action: none` ve `overscroll-behavior: contain` moduna aliyor; `playing` ve `paused` sirasinda mevcut steering ve accidental page drag guard'i korunuyor.
- `project/game/src/main.ts` artik media-query degisiminde yalnizca scroll lock'u degil, mevcut fazi `syncGameplayFocusMode()` uzerinden tekrar uyguluyor; boylece run zaten aktifken pencere daralirsa `app-shell--game-active`, panel gizleme, scroll lock ve viewport-anchor ayni kod yolundan yeniden kuruluyor.
- Bu tur yeni orchestration katmani eklenmedi; mevcut focus-mode akisi breakpoint listener'a yeniden kullanildi.
- `project/game/src/latestRun.ts` public `Latest AI update` panelini bu yeni breakpoint-crossing focus-mode davranisiyla hizaladi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run build` yesil kaldi. Deterministic baseline kaydi halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#144 mobil control/browser-shell zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume, stale keyboard release, non-active canvas ustunden panel scroll zinciri, aktif run sirasinda panelin geri cekilmesi, scroll-lock, viewport-anchor/panel-scroll-restore ve aktif seans sirasinda dar breakpoint'e gecis davranisi manuel sample ile dogrulanmadi.
3. Run #137 opening surface, Run #138 active-run focus, Run #139 scroll-lock, Run #140 viewport-anchor, Run #141 blur-sonrasi keyboard reset, Run #142 non-active `touch-action` gecisi, Run #143 overscroll-chain duzeltmesi ve Run #144 breakpoint-crossing focus-mode senkronu sadece source/build seviyesinde dogrulandi; insan gozunde ilk ekranin ve aktif seansin artik daha oyun gibi hissettirip hissettirmedigi bilinmiyor.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #137 opening surface ile Run #132-#144 mobil shell/input zincirini, ozellikle canvas ustunden scroll zinciri, blur/refocus sonrasi stale movement, aktif run scroll lock davranisi ve run aktifken viewport'un dar breakpoint'e gecisinde focus mode'un korunup korunmadigini ayni seansta dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, non-active canvas scroll gecisi, active-run panel gizleme davranisi, aktif-run scroll lock, viewport anchoring, panel-scroll-restore, overscroll-chain duzeltmesi, breakpoint-crossing focus-mode senkronu ve launch-panel/pulse marker gercek cihazda sample almadan "mobil deneyim ve ilk izlenim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #137 opening surface ile Run #132-#144 mobil/control koridorunu tek hedefli sample ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: aktif seans basladiktan sonra viewport daralirsa shell artik yalnizca scroll-lock'u degil, panel gizleme ve viewport anchor dahil tum focus-mode kontratini yeniden uyguluyor.
- Bu tur checked kanit: `npm run build` basarili.
