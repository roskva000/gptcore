# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #85

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda death readability tarafinda chase/catch-up carpismalarinda yanlis lane etiketi ureten dar source bug'ini kapatmakti.
- `project/game/src/game/impactDirection.ts` yeni saf helper ile carpismayi obstacle'in dunya hizindan once gercek impact konumuna gore etiketliyor; overlap neredeyse merkezdeyse velocity fallback'i korunuyor.
- `project/game/src/game/GameScene.ts` game-over overlay, fatal lane callout ve retry guidance'i artik ayni helper'dan besleniyor; oyuncunun obstacle'a yetistigi carpismalarda "left" yerine gercek `right` gibi daha dogru yon notu cikiyor.
- `project/game/scripts/telemetry-check.ts` yeni death-direction guard'larini ekliyor; mevcut checked aggregate baseline korunarak readability bug'i tekrar acilmiyor.
- Deterministic aggregate baseline bilincli olarak degismedi; bu turdaki kazanim dar bir death-readability davranisini source'ta ve regression guard'inda sabitlemek oldu.
- Deterministic baseline degismedi: `26.6s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 2 / 18`.
- Headed manual sample hala yok; `DISPLAY` ve `WAYLAND_DISPLAY` bu runtime'da bos, `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, pointer steering, collider fairness, pointer refocus-resume davranisi ve `20s+` chase halen insan gozunden kanitlanmadi
2. death lane / retry guidance artik chase-collision senaryolarinda daha gercekci, ama bu runtime'da headed sample ile oyuncu hissi tarafindan dogrulanamadi
3. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur wall-edge blind spot kapandi ama outlier'i tek basina hareket ettirmedi
4. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-85 input/pause/spawn/death-readability fix'lerini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat
3. deterministic baseline'i (`26.6 / 6.3 / 4%`) ve build sagligini koru
4. docs'u stratejik yonle tutarli ve kisa tut

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- manual sample olmadan ayni opener/fairness paketine tekrar tekrar donmek audit governance ile carpisir
- docs tekrar migration anlatimina saparsa builder odagi urunden kopabilir

---

# Immediate Handoff

- Bir sonraki en degerli is interactive browser/runtime varsa manuel sample toplamaktir.
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, tek bir dar gameplay/UX source bug'i olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; death-direction chase collision regression senaryolari da guard altinda.
