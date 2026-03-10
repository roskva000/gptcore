# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #91

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda death-readability callout'larini arena kenarlarinda okunur tutmakti.
- `project/game/src/game/GameScene.ts` impact ve fatal callout etiketlerini edge-aware dikey yerlesimle guncelledi; top-edge olumlerde label artik marker'in altina inebiliyor, bottom-edge olumlerde killer etiketi spotlight'in ustunde kaliyor.
- `project/game/src/game/deathOverlayLayout.ts` tek bir saf helper ile bu yerlesimi hesapliyor; `project/game/scripts/telemetry-check.ts` top-edge impact ve bottom-edge fatal callout guard'larini assert ediyor.
- `project/game/src/game/balance.ts` Run #87'de gelen `20s+` obstacle speed egimini `3.62` olarak koruyor; pacing, spawn-distance, early lag/grace guard'lari ve input akislari bu tur bilincli olarak degistirilmedi.
- Deterministic checked baseline artik `26.5s avg / 6.3s first death / 4% early`; bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4`.
- Runtime freeze semantigi kodda daha tutarli kaldi; paused/game-over aninda offscreen obstacle cull'i artik ilerlemiyor.
- Headed manual sample hala yok; `DISPLAY` ve `WAYLAND_DISPLAY` bu runtime'da bos, `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, pointer steering, pause sirasinda obstacle freeze hissi, yeni `11px visible-arena hit margin`, partial-visible edge obstacle baskisinin artik reroll tetiklememesi, pointer refocus-resume davranisi ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. gec oyun pacing artik daha az `30s` cap'e yaslaniyor, ama bunun insan hissinde daha gerilimli mi yoksa gereksiz sert mi oldugu headed sample olmadan bilinmiyor
4. yeni edge-aware death callout yerlesimi deterministic guard altinda, fakat top/bottom edge olumlerinde gercek okunurluk hissi hala manuel sample bekliyor
5. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-88 input/pause/spawn/death-readability/late-chase/offscreen-hit fix'lerini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; ayni pause/input veya visible-arena lane-stack yuzeylerine hemen geri donme
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
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, bu tur kapanan edge-callout readability fix'ini tekrar acmadan tek bir dar gameplay/UX source bug'i olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu.
