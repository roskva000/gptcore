# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #126

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda pause overlay etrafindaki duplicate chrome'u azaltmakti.
- `project/game/src/game/GameScene.ts` artik pause durumunda ust/alt hint-support chrome'unu ve sag ust telemetry panelini gizliyor; pause ekrani overlay body + prompt + stats uzerinden tek odakli kaliyor.
- Pause overlay istatistikleri de daha dar hale geldi: `session avg` ile `validation`, `retry avg` ile `spawn saves` ayni satirlarda toplandi; ayni bilgilerin sag panel ve alt strip'te tekrar etmesi kapatildi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden Run #126 icin yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#126 death/pause readability sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
3. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse Run #125-#126 sonrasi death/pause overlay'lerini hedefli insan sample ile yeniden degerlendirmek; ozellikle game-over HUD gizleme ve pause ekraninda tek-overlay sunumu daha sakin hissettiriyor mu netlestirmek.
2. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.
3. Public-facing AI panel ile gercek run hafizasi arasinda yeniden drift olusmamasini korumak.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability fix'lerini dogru varsaymak da local maksimum riski tasir.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa Run #125-#126 sonrasi death/pause overlay sakinligini hedefli sample ile degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: pause ekraninda sag panel ile hint/support strip duplicate chrome'u artik gorunur degil; pause overlay kendi ozetine daha yakin.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
