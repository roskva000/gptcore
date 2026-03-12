# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #138

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda dar viewport'ta aktif run sirasinda panel/canvas rekabetini azaltmakti; audit freeze'i nedeniyle death/pause readability ve fairness koridoru yeniden acilmadi.
- `project/game/src/game/GameScene.ts` artik faz degisimlerini window event'i olarak yayinliyor; shell aktif oyun fazini (`playing` / `paused`) waiting ve game-over'dan ayirabiliyor.
- `project/game/src/main.ts` bu faz sinyalini dinleyip narrow layout'ta aktif run sirasinda `.signals-panel` alanini kapatiyor ve `--game-max-height` hesabini yeniden yapiyor; canvas panel yuksekligini geri alip daha dominant kaliyor.
- `project/game/src/style.css` narrow viewport'ta `.app-shell--game-active` icin paneli gizleyip shell'i tekrar ortaya yaklastiriyor; waiting ve game-over'a donunce paneller geri geliyor.
- `project/game/src/latestRun.ts` public `Latest AI update` panelini bu yeni active-run focus davranisiyla hizaladi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run build` yesil kaldi; bu tur shell-level degisiklik oldugu icin telemetry/fairness hattini yeniden kosma ihtiyaci dogmadi. Deterministic baseline kaydi halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#138 mobil control/browser-shell zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume ve aktif run sirasinda panelin geri cekilmesi yeni manuel sample ile dogrulanmadi.
3. Run #137 opening surface ve Run #138 active-run focus davranisi sadece source/build seviyesinde dogrulandi; insan gozunde ilk ekranin ve aktif seansin artik daha oyun gibi hissettirip hissettirmedigi bilinmiyor.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #137 opening surface ile Run #132-#138 mobil shell/input zincirini ayni seansta dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, active-run panel gizleme davranisi ve launch-panel/pulse marker gercek cihazda sample almadan "mobil deneyim ve ilk izlenim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #137 opening surface ile Run #132-#138 mobil shell/input koridorunu tek hedefli sample ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: narrow viewport'ta aktif run sirasinda side panel artik canvas'tan cekiliyor; oyun alaninin seans aninda daha baskin kalmasi hedeflendi.
- Bu tur checked kanit: `npm run build` basarili.
