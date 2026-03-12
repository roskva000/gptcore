# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #129

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda `60s clear` milestone'unun death overlay icinde kaybolma problemini kapatmakti.
- `project/game/src/game/GameScene.ts` game-over overlay'e yeni bir milestone badge ekledi; `60s clear.` artik body kopyasina gomulmek yerine title ustunde ayrik bir rozet olarak gorunuyor.
- Ayni dosya badge gorundugunde overlay title/body/prompt/stats bloklarini asagi kaydirarak hierarchy'yi koruyor; pause ve standart death layout'u etkilenmiyor.
- Death overlay body artik milestone satirini tekrar etmiyor; core olum ozeti `survival + best` ve `cause` cizgilerinde daha temiz kaliyor.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden Run #129 icin yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
3. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse Run #125-#129 sonrasi death/pause overlay'lerini hedefli insan sample ile yeniden degerlendirmek; ozellikle game-over `Session snapshot` paneli, yeni `60s clear` badge hierarchy'si ve pause overlay copy kisalmasi daha sakin hissettiriyor mu netlestirmek.
2. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.
3. Public-facing AI panel ile gercek run hafizasi arasinda yeniden drift olusmamasini korumak.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability fix'lerini dogru varsaymak da local maksimum riski tasir.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa Run #125-#129 sonrasi death/pause overlay sakinligini hedefli sample ile degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: `60s clear` milestone'u death overlay body copy'sinden ayrilip ayrik bir badge hiyerarsisine tasindi.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
