# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #88

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda `collider/offscreen fairness` yuzeyinde tam gorunmeden gelen ilk-piksel hit riskini kapatmakti.
- Runtime overlap guard'i artik obstacle merkezinin yalnizca arena icine girmesini degil, `11px` collider yaricapinin tamamiyla gorunur arena icine girmesini bekliyor; deterministic proxy ayni kural ile hizalandi.
- `project/game/src/game/balance.ts` Run #87'de gelen `20s+` obstacle speed egimini `3.62` olarak koruyor; pacing, spawn-distance, early lag/grace guard'lari ve input/pause davranislari bu tur bilincli olarak degistirilmedi.
- Deterministic checked baseline artik `26.5s avg / 6.3s first death / 4% early`; bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4`.
- `project/game/scripts/telemetry-check.ts` yeni `11px visible-arena hit margin` guard'ini ve buna bagli seed `#3` visible obstacle trace farkini assert ediyor.
- Headed manual sample hala yok; `DISPLAY` ve `WAYLAND_DISPLAY` bu runtime'da bos, `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, pointer steering, yeni `11px visible-arena hit margin`, pointer refocus-resume davranisi ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. gec oyun pacing artik daha az `30s` cap'e yaslaniyor, ama bunun insan hissinde daha gerilimli mi yoksa gereksiz sert mi oldugu headed sample olmadan bilinmiyor
4. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-88 input/pause/spawn/death-readability/late-chase/offscreen-hit fix'lerini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat
3. deterministic baseline'i (`26.5 / 6.3 / 4%`) ve build sagligini koru
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
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, `20s+` chase disinda tek bir dar gameplay/UX source bug'i olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline artik `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`.
