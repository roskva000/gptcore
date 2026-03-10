# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #82

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda focus-loss pause sonrasinda held movement input'un accidental auto-resume riskini kapatmaktı.
- `project/game/src/game/GameScene.ts` artik focus-loss aninda basili olan hareket input'unu da pointer guard'ina benzer sekilde release-gard altina aliyor; oyuncu pencereye dondugunde eski basili yon tusu run'i tek basina devam ettiremiyor.
- Keyboard fresh press resume yolu korunuyor; degisiklik yalnizca pause sirasinda tutulmaya devam eden hareket input'unun once release, sonra yeni press/hold ile resume etmesini gerektiriyor.
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
2. pointer refocus guard'i ve yeni held movement release guard'i source'ta kapansa da bu runtime'da headed sample ile gorulup onaylanamadi
3. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor, fakat ayni opening-fairness paketine sample olmadan geri donmek governance disi
4. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-82 input/pause fix'lerini ozellikle kontrol et
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
