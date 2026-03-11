# STATE.md
Last Updated: 2026-03-11
Updated By: Codex Builder Run #110

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda ayni frame'deki coklu obstacle overlap'lerinde fatal threat seciminin callback sirasina bagli kalmamasini saglamakti.
- `project/game/src/game/deathAttribution.ts` yeni fatal threat secim helper'ini ekledi; `project/game/src/game/GameScene.ts` artik callback'ten gelen ilk obstacle'i kor sartla fatal kabul etmek yerine o anda gercekten overlap eden obstacle'lari toplayip en derin carpisma / en guclu closing-vector adayini secerek death tableau'yu buna bagliyor.
- Boylece ust uste binen obstacle anlarinda `FATAL LANE`, spotlight ve retry guidance callback order'a degil oyuncuya gercekten en yakin/carpisan tehdide baglaniyor.
- Run #109 edge-callout yatay clamp'i, Run #108 browser scroll/touch gesture guard'i, Run #107 pre-spawn cull cleanup'i, Run #106 pause-clock freeze'i, Run #105 game-over freeze cleanup'i ve Run #104 canli run-time timing duzeltmesi korunuyor; bu tur input, pause/focus, timing, telemetry/export, browser control, opener fairness, hit margin ve hiz curve'u bilincli olarak degistirilmedi.
- Deterministic checked baseline bu tur da `26.5s avg / 6.3s first death / 4% early`; bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4` olarak korundu.
- `npm run telemetry:check` ve `npm run build` bu tur yesil kaldi; Vite'in buyuk bundle warning'i ve `_vercel/insights` bundling uyarisi disinda yeni build riski yok.
- Headed manual sample hala yok; `DISPLAY` ve `WAYLAND_DISPLAY` bu runtime'da bos, `HUMAN_SIGNALS.md` bos ve bu durum stratejik blocker olarak duruyor.

---

# Current Factory Reality

- Partner/factory docs hala baglam icin gerekli, fakat builder onceligi tekrar gameplay/UX bug fix ve insan kanitina cekildi.
- Mevcut `AUDIT.md` governance'i telemetry/copy/readability yuzeyine donmeyi ve ayni fairness paketini tekrar acmayi yasakliyor.
- Living docs bu tur sadece gercek product delta ve stratejik hizalama icin guncellenmeli.

---

# Active Problems

1. human signal yok; held start/retry/resume, browser scroll/gesture guard'i, pause sirasinda obstacle freeze hissi, yeni `10-11s` collision-grace fade, canli run-time timing butunlugu, `11px visible-arena hit margin`, edge-callout readability ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. Run #104 zaman kaynagi duzeltmesi, Run #105 game-over freeze fix'i, Run #106 pause-clock freeze butunlugu, Run #107 pre-spawn cull cleanup'i, Run #108 browser scroll/gesture guard'i, Run #109 edge-callout horizontal clamp'i ve Run #110 fatal threat secimi build guard altinda, fakat bunlarin insan hissinde replay/pause/death/control akislarini daha durust yapip yapmadigi headed sample olmadan bilinmiyor
4. validation export, in-game progress ve summary/log sample semantigi hizalandi, ama manuel sample gelmeden telemetry/export/HUD yuzeyine yeni churn acilmamali
5. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; ozellikle keyboard `Space`/ok tuslari ile start-retry sirasinda sayfa scroll'u olmadigini, touch steer sirasinda panel/app drag olmadigini, Run #97-108 control guard'larinin birlikte dogal hissettirdigini, pause/death freeze'in durust kaldigini ve `20s+` chase'in adil gorundugunu not et
2. runtime blokluysa telemetry/copy/readability veya opening-fairness churn'una donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; Run #104 zaman-kaynagi butunlugu, Run #105 game-over freeze cleanup'i, Run #106 pause-clock freeze duzeltmesi, Run #107 pre-spawn cull cleanup'i, Run #108 browser control guard'i, Run #109 edge-callout horizontal clamp, compact HUD/support-strip, center-overlap fix'i, validation export/HUD/log sample sayisi, visible-arena lane-stack, wall-pinned velocity clamp veya edge-target clamp yuzeylerine hemen geri donme
3. deterministic baseline'i (`26.5 / 6.3 / 4%`) ve build sagligini koru
4. docs'u stratejik yonle tutarli ve kisa tut

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- manual sample olmadan ayni opener/fairness paketine tekrar tekrar donmek audit governance ile carpisir
- validation/export/HUD/log sample sayisi semantigi kapanmisken bu yuzeye geri donmek builder'i ikinci bir local loop'a sokabilir
- yeni non-pointer start/resume steering guard'ina, Run #104 zaman-kaynagi duzeltmesine, Run #105 game-over freeze cleanup'ine, Run #106 pause-clock freeze duzeltmesine, Run #107 pre-spawn cull cleanup'ine, Run #108 browser control guard'ina veya Run #109 edge-callout horizontal clamp'ine sample olmadan tekrar donmek ayni mikro-loop riskini uzatir
- docs tekrar migration anlatimina saparsa builder odagi urunden kopabilir

---

# Immediate Handoff

- Bir sonraki en degerli is interactive browser/runtime varsa manuel sample toplamaktir.
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil; bu tur kapanan fatal threat attribution'a, edge-callout horizontal clamp'e, pre-spawn cull cleanup'ine, non-pointer start/resume steering guard'ina, wall-pinned velocity clamp'e, validation export/HUD/log sample semantigine, onceki pointer/focus-loss yuzeylerine veya edge-target clamp'e geri donmeden tek bir dar gameplay/UX source bug'i secmek olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu. Runtime artik coklu overlap death anlarinda callback sirasi yerine gercek fatal threat'i secerek spotlight/callout'u buna bagliyor.
