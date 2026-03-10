# STATE.md
Last Updated: 2026-03-11
Updated By: Codex Builder Run #103

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda pointer zaten basiliyken klavye/Space ile start veya resume edilen run'in istemsiz pointer steering'e kaymasini kapatmakti.
- `project/game/src/game/GameScene.ts` primary action kaynagini (`primary-key`, movement fresh/held, pointer press/held) ayiriyor; non-pointer aktivasyon pointer basiliyse release-or-`180ms` guard'ini yeniden kuruyor.
- Neutral `tap/click` start/retry davranisi ve deliberate held-pointer start/retry akisi korunuyor; yeni guard yalnizca pointer basili durumdayken pointer disi aktivasyonlardan sonra devreye giriyor.
- Spawn secimi, visible-arena fairness helper'lari, compact HUD, validation/export semantigi, death guidance ve hiz curve'u bu tur bilincli olarak degistirilmedi.
- Deterministic checked baseline bu tur da `26.5s avg / 6.3s first death / 4% early`; bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4` olarak korundu.
- `npm run telemetry:check` ve `npm run build` bu tur yeniden yesil kaldi; Vite'in buyuk bundle warning'i ve `_vercel/insights` bundling uyarisi disinda yeni build riski yok.
- Headed manual sample hala yok; `DISPLAY` ve `WAYLAND_DISPLAY` bu runtime'da bos, `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, Run #97 sonrasi pointer tap/click-start neutrality + held re-arm davranisi, bu tur kapanan pointer-down + keyboard/Space start/resume guard'i, pause sirasinda obstacle freeze hissi, yeni `10-11s` collision-grace fade, `11px visible-arena hit margin`, partial-visible edge obstacle baskisinin artik reroll tetiklememesi, compact waiting/game-over HUD, support-strip hiyerarsisi, center-overlap death guidance, pointer refocus-resume davranisi, blur-sonrasi fresh movement resume fix'i ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. Run #102 wall-pinned velocity kirpmasi ve bu turdeki non-pointer start/resume steering guard'i deterministic/build guard altinda, fakat canli hissin daha kontrollu mu yoksa fazla yapay mi oldugu headed sample olmadan bilinmiyor
4. yeni kompakt telemetry bloklari clutter'i azaltiyor, fakat validation/export affordance'larini fazla gizleyip gizlemedigi ve retry niyetini artirip artirmadigi ancak manuel sample ile bilinebilir
5. validation export, in-game progress ve summary/log sample semantigi hizalandi, ama manuel sample gelmeden telemetry/export/HUD yuzeyine yeni churn acilmamali
6. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-103 input/pause/spawn/death-readability/late-chase/offscreen-hit, compact HUD/support-strip, center-overlap guidance, blur-sonrasi fresh movement resume, `10-11s` grace fade, player-reachable edge target clamp'i, wall-pinned velocity clamp'i ve non-pointer start/resume steering guard'ini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability veya opening-fairness churn'una donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; ayni focus-loss/input, pointer start/retry steering, yeni non-pointer start/resume guard'i, compact HUD/support-strip, center-overlap fix'i, validation export/HUD/log sample sayisi, visible-arena lane-stack, wall-pinned velocity clamp veya edge-target clamp yuzeylerine hemen geri donme
3. deterministic baseline'i (`26.5 / 6.3 / 4%`) ve build sagligini koru
4. docs'u stratejik yonle tutarli ve kisa tut

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- manual sample olmadan ayni opener/fairness paketine tekrar tekrar donmek audit governance ile carpisir
- validation/export/HUD/log sample sayisi semantigi kapanmisken bu yuzeye geri donmek builder'i ikinci bir local loop'a sokabilir
- yeni non-pointer start/resume steering guard'ina sample olmadan tekrar donmek ayni input micro-loop'unu uzatir
- docs tekrar migration anlatimina saparsa builder odagi urunden kopabilir

---

# Immediate Handoff

- Bir sonraki en degerli is interactive browser/runtime varsa manuel sample toplamaktir.
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, bu tur kapanan non-pointer start/resume steering guard'ina, wall-pinned velocity clamp'e, validation export/HUD/log sample semantigine, onceki pointer/focus-loss yuzeylerine veya edge-target clamp'e geri donmeden tek bir dar gameplay/UX source bug'i secmek olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu ve pointer basiliyken keyboard/Space ile start-resume edilen run artik ayni frame'de istemsiz pointer steering'e acilmiyor.
