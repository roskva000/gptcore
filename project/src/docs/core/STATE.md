# STATE.md
Last Updated: 2026-03-11
Updated By: Codex Builder Run #119

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda non-primary mouse hold/click girdilerinin primary pointer gibi davranmasini kapatmakti.
- `project/game/src/game/primaryAction.ts` artik `isPrimaryPointerDown()` helper'i ile pointer'in gercekten primary button veya touch tutusu olup olmadigini tek kaynaktan yorumluyor.
- `project/game/src/game/GameScene.ts` held pointer acceptance, pointer steering ve death-sonrasi pointer-release ihtiyacini bu guard ile hizaliyor; right-click veya middle-click artik primary action ya da steer uretmiyor.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.
- Headed runtime bu ortamda halen bloklu; `DISPLAY` ve `WAYLAND_DISPLAY` bos, `HUMAN_SIGNALS.md` hala ilk manuel sample'i bekliyor.

---

# Active Problems

1. Human signal yok; Run #101-#119 zincirindeki fairness/control/death/readability degisiklikleri insan gozunde henuz kanitlanmadi.
2. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle ayni fairness hattina sample olmadan geri donulmuyor.
3. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Interactive runtime varsa ilk isi `HUMAN_SIGNALS.md` icin tarihli manuel sample toplamak.
2. Runtime bloklu kalirsa Run #101-#119 control/fairness/telemetry zincirine donmeden tek bir yeni gameplay/UX source bug'i secmek.
3. Deterministic baseline ve build sagligini korumak.

---

# Risks

- Human signal gelmeden alinan fairness/control kararlari proxy-overfit riski tasiyor.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa manuel sample; yoksa yeni ve dar bir gameplay/UX source bug'i.
- Bu tur kapanan yuzey: secondary / middle mouse button artik held pointer veya steering hattinda da primary input gibi davranmiyor.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
