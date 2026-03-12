# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #137

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda waiting/start ekranindaki ciplak prototype hissini azaltmakti; audit freeze'i nedeniyle death/pause readability ve fairness koridoru yeniden acilmadi.
- `project/game/src/game/GameScene.ts` waiting fazina yeni bir launch paneli, `Break 10s. Then chase 60.` basligi ve oyuncu spawn noktasini isaretleyen pulse marker ekliyor; ilk input oncesi ekran artik hedefi ve baslangic noktasini daha net veriyor.
- Waiting hint copy'si artik faz basligindan ayrildi; kontroller ayri iki satirda, alt support satiri da daha kisa bir goal/export/reset ozetine cekildi.
- `project/game/src/latestRun.ts` public `Latest AI update` panelini bu yeni opening-surface degisikligiyle hizaladi; stale death-screen anlatimi kaldirildi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#136 mobil control/browser-interruption zinciri source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture ve refocus-resume hissi yeni manuel sample ile dogrulanmadi.
3. Yeni Run #137 opening surface sadece source/build seviyesinde dogrulandi; insan gozunde ilk ekranin artik daha oyun gibi ve daha anlasilir hissettirip hissettirmedigi bilinmiyor.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #137 opening surface ile Run #132-#136 mobil shell/input zincirini ayni seansta dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i ve launch-panel/pulse marker gercek cihazda sample almadan "mobil deneyim ve ilk izlenim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #137 opening surface ile Run #132-#136 mobil shell/input koridorunu tek hedefli sample ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: ilk ekran artik daha net bir launch paneli ve spawn pulse marker ile geliyor; start aninin odagi source seviyesinde guclendirildi.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
