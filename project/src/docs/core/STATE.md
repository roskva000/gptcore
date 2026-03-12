# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #130

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda touch/pointer primary-action yorumunu mobilde daha guvenilir hale getirmekti.
- `project/game/src/game/primaryAction.ts` artik Phaser `wasTouch` pointer'larini dogrudan primary kabul ediyor; touch start/retry/held steer akisi cached mouse `button` durumuna bagli degil.
- Ayni helper `isPrimaryPointerDown()` icinde touch held-state'ini `primaryDown` uzerinden okuyor; boylece touch pointer aktifken stale secondary-button semantigi steering veya retry yolunu kesmiyor.
- `project/game/scripts/telemetry-check.ts` touch pointer icin yeni regression guard'lari ekledi; touch primary-action kabulunun mouse-button fallback'lerinden bagimsiz kaldigi deterministic olarak kilitlendi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden Run #130 icin yeni manuel mobile/browser sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Touch-primary action kontrati source tarafinda sertlesti, ama mobilde start/retry/held steer hissi yeni manuel sample ile dogrulanmadi.
3. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
4. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da touch start/retry/held steer akisini sample'lamak; `wasTouch` / `primaryDown` hizasinin kontrol hissini bozup bozmadigini netlestirmek.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability ve mobile-control fix'lerini dogru varsaymak da local maksimum riski tasir.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da start/retry/held steer akisini ve ayni seansta death/pause overlay sakinligini hedefli sample ile degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: touch pointer primary-action semantigi `wasTouch` / `primaryDown` ile mobil-akis odakli olarak sertlestirildi.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
