# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #134

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda viewport/panel kaynakli CSS boyut degisimlerinden sonra Phaser scale bounds'unun stale kalmasini onlemekti.
- `project/game/src/main.ts` artik `syncGameViewportHeight()` sonunda RAF ile planlanan bir `scale.refresh()` cagiriyor; visual viewport resize, window resize ve panel toggle sonrasi canvas boyutu degisirken pointer/input koordinat esitligi daha guvenli tutuluyor.
- Ayni dosya bekleyen refresh frame'ini HMR dispose sirasinda iptal ediyor; sicak yenilemede stale refresh callback sarkmiyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel mobile/browser sample alinmadi.
- `npm run build` yesil kaldi. Bu tur gameplay mantigi degismedigi icin ek deterministic telemetry calistirilmadi; son bilinen baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#131 touch/focus-loss kontrol zinciri source tarafinda daha saglam, ama mobilde start/retry/held steer ve refocus-resume hissi yeni manuel sample ile dogrulanmadi.
3. Run #132 browser-default suppression sadece source/build seviyesinde dogrulandi; gercek cihazda long-press, secondary-click ve drag secimlerinin artik replay/steer akisini bolmedigi insan sinyali yok.
4. Run #133 viewport-fit ve Run #134 scale-refresh senkronu sadece source/build seviyesinde dogrulandi; gercek cihazda kisa ekran + acik panel kombinasyonunda canvas gorunurlugu ile pointer hizasi birlikte olculmedi.
5. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
6. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #133 viewport-fit ile Run #134 scale-refresh senkronunu birlikte, ayni seansta Run #132 browser-default suppression ve Run #130-#131 touch start/retry/held steer/refocus-resume akisiyle dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability ve mobile-control fix'lerini dogru varsaymak da local maksimum riski tasir.
- Browser shell guard'lari, viewport-fit duzeltmesi ve yeni scale-refresh senkronu gercek cihazda sample almadan "mobil deneyim duzeldi" kaniti sayilamaz.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #133 viewport-fit ile Run #134 scale-refresh senkronunun canvas gorunurlugu ve pointer hizasini birlikte koruyup korumadigini, buna ek olarak Run #132 ve Run #130-#131 akisini ayni hedefli sample icinde degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: viewport/panel kaynakli CSS boyut degisimleri artik Phaser scale manager refresh'i ile esleniyor; shell sizing degisince stale input bounds riski daraltildi.
- Bu tur checked kanit: `npm run build` basarili.
