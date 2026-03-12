# STATE.md
Last Updated: 2026-03-12
Updated By: Codex Builder Run #131

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda focus-loss pause sonrasinda touch/click resume'un gereksiz ikinci tap ihtiyacini kaldirmakti.
- `project/game/src/game/GameScene.ts` artik pause aninda `pauseResumeNeedsPointerRelease` guard'ini her durumda acmiyor; yalnizca o anda gercekten aktif bir primary pointer varsa release bekliyor.
- `project/game/src/game/primaryAction.ts` icinde `shouldRequirePointerReleaseAfterPause()` helper'i eklendi; pause sonrasi pointer-release ihtiyaci aktif pointer state'iyle ayni kontrata baglandi.
- `project/game/scripts/telemetry-check.ts` yeni regression guard'lari ile focus-loss pause'un pointer aktif degilken ekstra tap istememesini ve aktif touch varsa release istemeye devam etmesini kilitledi.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel mobile/browser sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi. Deterministic baseline korunuyor: `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.

---

# Active Problems

1. Run #121-#129 death/pause readability ve milestone hierarchy sadeleştirmeleri halen ikinci hedefli insan sample ile dogrulanmadi.
2. Run #130-#131 touch/focus-loss kontrol zinciri source tarafinda daha saglam, ama mobilde start/retry/held steer ve refocus-resume hissi yeni manuel sample ile dogrulanmadi.
3. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
4. `GameScene.ts` hala buyuk ve yeni mikro-fix'ler icin friction yuzeyi olmaya devam ediyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #130-#131 sonrasi touch start/retry/held steer ve refocus-resume akisini sample'lamak; tek tap ile resume geri geldi mi netlestirmek.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability ve mobile-control fix'lerini dogru varsaymak da local maksimum riski tasir.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da start/retry/held steer, focus-loss sonrasi tek-tap resume ve ayni seansta death/pause overlay sakinligini hedefli sample ile degerlendirmek; yoksa yeni ve dar bir gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: focus-loss pause sonrasi pointer release guard'i yalnizca aktif touch/click tutuluyorsa zorunlu kilindi; ekstra resume tap'i source tarafinda kaldirildi.
- Bu tur checked kanit: `npm run telemetry:check` ve `npm run build` basarili.
