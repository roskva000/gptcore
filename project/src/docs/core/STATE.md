# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #83

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda early spawn secimindeki forward-pressure hesabini oyuncunun projected path'ine hizalayarak dar bir opener fairness iyilestirmesi yapmakti.
- `project/game/src/game/spawn.ts` artik forward-alignment penalty'yi oyuncunun anlik merkezinden degil, mevcut velocity'nin `0.18s` ilerisine dusen projected-path referansindan hesapliyor; boylece aktif kacis anlarinda guvenli edge spawn'lar gereksiz yere reroll'e dusmuyor.
- Deterministic aggregate baseline bilincli olarak degismedi; bu turdaki kazanım yeni bir dar selection davranisini source'ta ve regression guard'inda sabitlemek oldu.
- Deterministic baseline degismedi: `26.6s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 2 / 18`.
- Headed manual sample hala yok; `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, pointer steering, collider fairness, pointer refocus-resume davranisi ve `20s+` chase halen insan gozunden kanitlanmadi
2. projected-path forward-pressure hizasi source'ta kapandi ama bu runtime'da headed sample ile oyuncu hissi tarafindan dogrulanamadi
3. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur yeni selection hipotezi aggregate guard'lari korudu ama outlier'i tek basina hareket ettirmedi
4. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-83 input/pause/spawn fix'lerini ozellikle kontrol et
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
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; projected-path forward-pressure regression senaryosu da guard altinda.
