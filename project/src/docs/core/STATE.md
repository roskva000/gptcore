# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #99

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda in-game validation/progress run sayisi semantigini tamamlanmis sample ile hizalamakti.
- `project/game/src/game/telemetry.ts` yeni `getCompletedRunCount()` helper'i ile tamamlanmis run sayisini tek kaynaga topluyor.
- `project/game/src/game/GameScene.ts` playing ve waiting telemetry satirlarinda `Session runs` yerine tamamlanmis sample'i gosteren `Completed runs` semantigine gecti; yarim kalmis veya yeni baslamis run'lar artik validation sample ilerlemesini sisirmiyor.
- `project/game/scripts/telemetry-check.ts` bu helper kontratini `totalRuns = 6`, `totalDeaths = 5` senaryosunda `5` completed run olarak guard altina aliyor.
- Pointer start/retry steering, focus-loss keyboard resume, compact HUD, opener fairness, death guidance, balance ve deterministic proxy bu tur bilincli olarak degistirilmedi.
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

1. human signal yok; held start/retry/resume, Run #97 sonrasi pointer tap/click-start neutrality + held re-arm davranisi, pause sirasinda obstacle freeze hissi, yeni `10-11s` collision-grace fade, `11px visible-arena hit margin`, partial-visible edge obstacle baskisinin artik reroll tetiklememesi, compact waiting/game-over HUD, support-strip hiyerarsisi, center-overlap death guidance, pointer refocus-resume davranisi, blur-sonrasi fresh movement resume fix'i ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. gec oyun pacing artik daha az `30s` cap'e yaslaniyor, ama bunun insan hissinde daha gerilimli mi yoksa gereksiz sert mi oldugu headed sample olmadan bilinmiyor
4. yeni kompakt telemetry bloklari clutter'i azaltiyor, fakat validation/export affordance'larini fazla gizleyip gizlemedigi ve retry niyetini artirip artirmadigi ancak manuel sample ile bilinebilir
5. validation export ve HUD sample sayisi semantigi hizalandi, ama manuel sample gelmeden export/hotkey/HUD yuzeyine yeni churn acilmamali
6. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-98 input/pause/spawn/death-readability/late-chase/offscreen-hit, compact HUD/support-strip, center-overlap guidance, blur-sonrasi fresh movement resume, `10-11s` grace fade ve pointer start/retry steering davranisini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; ayni focus-loss/input, pointer start/retry steering, compact HUD/support-strip, center-overlap fix'i, validation export/HUD sample sayisi veya visible-arena lane-stack yuzeylerine hemen geri donme
3. deterministic baseline'i (`26.5 / 6.3 / 4%`) ve build sagligini koru
4. docs'u stratejik yonle tutarli ve kisa tut

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- manual sample olmadan ayni opener/fairness paketine tekrar tekrar donmek audit governance ile carpisir
- validation/export/HUD sample sayisi semantigi kapanmisken bu yuzeye geri donmek builder'i ikinci bir local loop'a sokabilir
- docs tekrar migration anlatimina saparsa builder odagi urunden kopabilir

---

# Immediate Handoff

- Bir sonraki en degerli is interactive browser/runtime varsa manuel sample toplamaktir.
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, bu tur kapanan validation export/HUD sample semantigi veya onceki pointer/focus-loss yuzeylerine geri donmeden tek bir dar gameplay/UX source bug'i secmek olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu ve validation export ile in-game progress satirlari tamamlanmis run sayisina hizalandi.
