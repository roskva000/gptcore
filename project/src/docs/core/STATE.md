# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #133

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda kisa viewport'larda canvas'in shell/panel yuksekligi yuzunden asagi itilmesini azaltmak ve gorunur playfield'i korumakti.
- `project/game/src/main.ts` artik viewport yuksekligini, shell padding/gap'ini ve narrow layout'ta acik panel yuksekligini okuyup `--game-max-height` CSS degiskenini senkronize ediyor; resize, visual viewport degisimi ve panel toggle'lari artik oyun alanini yeniden olculuyor.
- Ayni dosya HMR temizliginde viewport/media-query ve game-surface listener'larini da kapatiyor; shell sizing logic'i sicak yenilemede sarkmiyor.
- `project/game/src/style.css` artik `game-root` genisligini hem viewport genisligi hem de `--game-max-height` uzerinden sinirliyor; `canvas` da `width: 100%`, `height: auto`, `aspect-ratio: 4 / 3` ve `max-height: var(--game-max-height)` ile kisa ekranlarda daha kontrollu sigiyor.
- Narrow viewport'ta `.app-shell` artik ustten hizalaniyor; oyun alaninin ilk gorunur ekrandan asagi itilmesi azaltiliyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel mobile/browser sample alinmadi.
- `npm run build` yesil kaldi. Bu tur gameplay mantigi degismedigi icin ek deterministic telemetry calistirilmadi; son bilinen baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#131 touch/focus-loss kontrol zinciri source tarafinda daha saglam, ama mobilde start/retry/held steer ve refocus-resume hissi yeni manuel sample ile dogrulanmadi.
3. Run #132 browser-default suppression sadece source/build seviyesinde dogrulandi; gercek cihazda long-press, secondary-click ve drag secimlerinin artik replay/steer akisini bolmedigi insan sinyali yok.
4. Run #133 viewport-fit duzeltmesi de sadece source/build seviyesinde dogrulandi; gercek cihazda kisa ekran + acik panel kombinasyonunda oyunun ilk ekranda ne kadar gorunur kaldigi henuz olculmedi.
5. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
6. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #133 viewport-fit ile birlikte Run #132 browser-default suppression ve Run #130-#131 touch start/retry/held steer/refocus-resume akisini ayni hedefli sample'da gormek.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability ve mobile-control fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari ve viewport-fit duzeltmesi gercek cihazda sample almadan "mobil deneyim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da long-press/secondary-click browser mudahalesinin kalktigini, Run #130-#131 touch akisini ve Run #125-#129 overlay sakinligini ayni hedefli sample icinde degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: short viewport shell sizing artik game canvas'i panel/shell yuksekligine gore sinirliyor; onceki browser-default suppression ile birlikte mobil shell mudahalesi biraz daha daraltildi.
- Bu tur checked kanit: `npm run build` basarili.
