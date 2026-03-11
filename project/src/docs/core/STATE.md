# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #125

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda non-playing overlay'lerde ust HUD chrome'un (`score` / `best`) gereksiz tekrar yaratmasini kapatmaktı.
- `project/game/src/game/GameScene.ts` artik `waiting` ve `playing` disindaki fazlarda ust sol skor ve best satirini gizliyor; pause ve game-over overlay'leri kendi ozetleriyle daha tek odakli kaliyor.
- Death overlay icindeki `You survived ...` ve session/best baglami artik ayni anda ust HUD ile yarismiyor; bu da insan sinyalindeki "fazla veri/yazi" sikayetini dar kapsamda biraz daha azaltmayi hedefliyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden Run #125 icin yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#125 death readability sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
3. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse Run #125 sonrasi death/pause overlay'lerini hedefli insan sample ile yeniden degerlendirmek; ozellikle ust HUD'nin gizlenmesi ekranlari daha sakin hissettiriyor mu netlestirmek.
2. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.
3. Public-facing AI panel ile gercek run hafizasi arasinda yeniden drift olusmamasini korumak.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability fix'lerini dogru varsaymak da local maksimum riski tasir.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa Run #125 sonrasi death/pause overlay sakinligini hedefli sample ile degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: non-playing overlay'lerde ust HUD chrome (`score` / `best`) artik gorunur degil; overlay kendi ozetine daha yakin.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
