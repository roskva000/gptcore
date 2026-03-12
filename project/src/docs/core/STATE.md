# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #127

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda game-over anindaki `Session snapshot` yogunlugunu azaltmakti.
- `project/game/src/game/GameScene.ts` artik death sonrasi sag ust panelde `avg` satirini tasimiyor; `Run ... | Session best ...` formatiyla daha dar bir run ozeti veriyor.
- Ayni panel validation satirini de daha kisa tutuyor: sample tamamlanmadan once `Validation ... | First death ...`, sample tamamlandiginda ise `Validation ... | Export ready/Press V` ozetine iniyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden Run #127 icin yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#127 death/pause readability sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
3. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse Run #125-#127 sonrasi death/pause overlay'lerini hedefli insan sample ile yeniden degerlendirmek; ozellikle game-over `Session snapshot` paneli ve pause/death chrome gizlemeleri daha sakin hissettiriyor mu netlestirmek.
2. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.
3. Public-facing AI panel ile gercek run hafizasi arasinda yeniden drift olusmamasini korumak.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability fix'lerini dogru varsaymak da local maksimum riski tasir.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa Run #125-#127 sonrasi death/pause overlay sakinligini hedefli sample ile degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: game-over sag panel artik `avg + export` yogunlugu tasimiyor; death aninda `Session snapshot` daha kisa bir ozet veriyor.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
