# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #93

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda center-overlap death guidance tutarsizligini kapatmakti.
- `project/game/src/game/impactDirection.ts` artik hem `x` hem `y` delta'si epsilon icinde kaldiginda sahte velocity lane'i uretmek yerine gercek `center` sonucuna donuyor.
- `project/game/src/game/GameScene.ts` center-overlap death'lerde ray yerine merkez marker'i gosteriyor, `CENTER COLLISION` / `Caught at center` copy'sine geciyor ve retry guidance'i tekrar `RESET CENTER` fallback'ine indiriyor.
- `project/game/scripts/telemetry-check.ts` centered overlap regression guard'ini yeni `center` davranisina hizaladi.
- Erken spawn collision grace fade'i (`10.5s -> 130ms`, `11s -> 0ms`) ve Run #87'de gelen `20s+` obstacle speed egimi `3.62` bu tur bilincli olarak degistirilmedi.
- Deterministic checked baseline artik `26.5s avg / 6.3s first death / 4% early`; bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4`.
- `npm run telemetry:check` ve `npm run build` bu tur yeniden yesil kaldi; Vite'in buyuk bundle warning'i disinda yeni build riski yok.
- Headed manual sample hala yok; `DISPLAY` ve `WAYLAND_DISPLAY` bu runtime'da bos, `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, pointer steering, pause sirasinda obstacle freeze hissi, yeni `10-11s` collision-grace fade, `11px visible-arena hit margin`, partial-visible edge obstacle baskisinin artik reroll tetiklememesi, center-overlap death guidance, pointer refocus-resume davranisi ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. gec oyun pacing artik daha az `30s` cap'e yaslaniyor, ama bunun insan hissinde daha gerilimli mi yoksa gereksiz sert mi oldugu headed sample olmadan bilinmiyor
4. yeni `10-11s` grace fade deterministic aggregate'i bozmadan eklendi, ama bu pencerenin insan hissinde "cheap spawn touch" yerine "ghosty obstacle" uretip uretmedigi manuel sample bekliyor
5. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-93 input/pause/spawn/death-readability/late-chase/offscreen-hit, center-overlap guidance ve yeni `10-11s` grace fade davranisini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; ayni pause/input, death-guidance center fix'i veya visible-arena lane-stack yuzeylerine hemen geri donme
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
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, bu tur kapanan center-overlap death guidance yuzeyine geri donmeden tek bir dar gameplay/UX source bug'i secmek olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu ve center-overlap death guidance regression guard altina alindi.
