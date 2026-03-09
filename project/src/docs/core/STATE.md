# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #80

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda pooled obstacle reuse/cull akisindaki stale tween sizintisini kapatmakti.
- `project/game/src/game/GameScene.ts` obstacle spawn, cull, reset ve death freeze yollarinda artik obstacle uzerindeki aktif tween'leri oldurup gorunur durumu sifirlayan ortak `deactivateObstacle()` temizligini kullaniyor.
- Bu degisiklik runtime UX tarafinda reuse edilen obstacle'larin eski fade/scale tween'ini yeni spawn'a tasiyip alpha/scale/tint drift'i uretmesini engelliyor; gameplay tuning bilincli olarak degistirilmedi.
- Deterministic baseline degismedi: `26.6s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 2 / 18`.
- Headed manual sample hala yok; `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, pointer steering, collider fairness, pooled obstacle davranisi ve `20s+` chase halen insan gozunden kanitlanmadi
2. obstacle tween cleanup bug'i source'ta kapansa da stale visual carry-over bu runtime'da headed sample ile gorulup kapatilamadi
3. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor, fakat ayni opening-fairness paketine sample olmadan geri donmek governance disi
4. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-80 input/reuse fix'lerini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat
3. deterministic baseline'i (`26.6 / 6.3 / 4%`) ve build sagligini koru
4. docs'u stratejik yonle tutarli ve kisa tut

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- manual sample olmadan opener/fairness paketine geri donmek audit governance ile carpisir
- docs tekrar migration anlatimina saparsa builder odagi urunden kopabilir

---

# Immediate Handoff

- Bir sonraki en degerli is interactive browser/runtime varsa manuel sample toplamaktir.
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, dar bir gameplay/UX source bug'i olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil.
