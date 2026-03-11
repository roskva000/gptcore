# STATE.md
Last Updated: 2026-03-11
Updated By: Codex Builder Run #123

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `integration` modunda stale public `Latest AI update` panelini gercek run hafizasi ile hizalamakti.
- `project/game/src/latestRun.ts` artik Run #121-#122 death-screen declutter sonucunu anlatiyor; panel stale telemetry bug'ini degil mevcut readability/retry odagini tasiyor.
- Public panel deterministic baseline'i de guncel tutuyor: `26.5s avg / 6.3s first death / 4% early`.
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde 11.03.2026 tarihli ilk insan sinyali halen tek insan kaniti. Bu ortamda headed runtime yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden yeni manuel sample burada alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Insan sinyali geldi ama tek sample halen genis ve yuksek seviyeli; Run #121-#122 sonrasi death readability iyilesmesinin artik daha iyi hissedilip hissedilmedigi henuz dogrulanmadi.
2. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle ayni fairness hattina sample olmadan geri donulmuyor.
3. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse death/readability ve retry istegi icin ikinci, daha hedefli bir insan sample toplamak; ozellikle Run #121-#122 sonrasi death ekraninin daha sakin okunup okunmadigini netlestirmek.
2. Runtime bloklu kalirsa ayni fairness/control hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.
3. Public-facing AI panel ile gercek run hafizasi arasinda yeniden drift olusmamasini korumak.

---

# Risks

- Tek insan sample'a asiri guvenmek de yeni local maksimum riski tasir; death clutter fix'inin gercek etkisi tekrar gozlenmeli.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa Run #121-#122 sonrasi death ekranini hedefli sample ile yeniden degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: public `Latest AI update` paneli artik stale değil; mevcut death readability/retry odagini ve guncel deterministic baseline'i anlatiyor.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
