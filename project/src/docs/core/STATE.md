# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #136

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda mobile browser gesture/interruption sonrasi stale pointer press state'inin steering/retry/resume akisina sizmasini onlemekti.
- `project/game/src/game/GameScene.ts` artik Phaser `pointerup` / `pointerupoutside` ile native `pointercancel` / `touchcancel` olaylarini birlikte dinliyor; cancel gorulurse pointer-held zamanlayicisi ve pointer release guard'lari temizleniyor, yeni pointer press gelene kadar stale touch state primary input sayilmiyor.
- `project/game/src/game/primaryAction.ts` pointer helper'lari cancel flag'i aliyor; browser gesture veya sistem kesintisi sonrasi Phaser pointer objesi stale `isDown` tasisa bile replay/resume/steering yolu bunu aktif input gibi yorumlamiyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel mobile/browser sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#131 touch/focus-loss kontrol zinciri ile yeni Run #136 pointer-cancel release guard'i source tarafinda daha saglam, ama mobilde start/retry/held steer, gesture interruption ve refocus-resume hissi yeni manuel sample ile dogrulanmadi.
3. Run #132 browser-default suppression sadece source/build seviyesinde dogrulandi; gercek cihazda long-press, secondary-click, drag secimi veya touch cancel akisinin artik replay/steer akisini bolmedigi insan sinyali yok.
4. Run #133 viewport-fit, Run #134 scale-refresh senkronu, Run #135 scroll/viewport-position refresh guard'i ve Run #136 pointer-cancel release guard'i sadece source/build seviyesinde dogrulandi; gercek cihazda kisa ekran + acik panel kombinasyonunda canvas gorunurlugu, pointer hizasi ve interruption davranisi birlikte olculmedi.
5. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
6. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #133 viewport-fit, Run #134 scale-refresh senkronu, Run #135 scroll/viewport-position refresh guard'i ve Run #136 pointer-cancel release guard'ini birlikte, ayni seansta Run #132 browser-default suppression ve Run #130-#131 touch start/retry/held steer/refocus-resume akisiyle dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability ve mobile-control fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i ve pointer-cancel release guard'i gercek cihazda sample almadan "mobil deneyim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #133-#136 mobil shell/input koridorunu tek hedefli sample ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: mobile browser gesture veya sistem kesintisi `pointercancel` / `touchcancel` uretirse stale pointer press state'i steering, retry ve resume guard'larinda tasinmiyor.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
