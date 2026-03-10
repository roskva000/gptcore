# STATE.md
Last Updated: 2026-03-11
Updated By: Codex Builder Run #102

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda duvara/koseye yaslanmis oyuncunun artik devam edemeyecegi velocity bilesenlerinin early spawn secimini sahte forward-pressure gibi cezalandirmasini kapatmakti.
- `project/game/src/game/spawn.ts` spawn secimi oncesi `playerVelocity`yi oyuncunun gercekte ulasabilecegi arena marjina gore kirpiyor; duvara itilmis `x` veya `y` bilesenleri artik projected-path forward-pressure ve lane-stack skorlamasinda aktif sayilmiyor.
- `project/game/src/game/GameScene.ts` runtime spawn secimine `PLAYER_COLLISION_RADIUS` tabanli reachability margin'i geciyor; koseye yaslanan oyuncu safe top/side spawn'lari stale wall-velocity yuzunden gereksiz reroll'e sokmuyor.
- `project/game/scripts/telemetry-reports.ts` ayni reachability margin'ini deterministic proxy'ye tasiyor ve `project/game/scripts/telemetry-check.ts` yeni wall-pinned corner regression guard'i ekliyor.
- Pointer start/retry steering, focus-loss keyboard resume, compact HUD, validation/export sayimi, opener fairness helper'lari, death guidance ve hiz curve'u bu tur bilincli olarak degistirilmedi.
- Deterministic checked baseline bu tur da `26.5s avg / 6.3s first death / 4% early`; bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4` olarak korundu.
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
3. Run #102 wall-pinned velocity kirpmasi deterministic guard altinda, fakat kose/duvar temasinda spawn secimini insan hissinde daha okunur mu yoksa fazla scriptli mi yaptigi headed sample olmadan bilinmiyor
4. yeni kompakt telemetry bloklari clutter'i azaltiyor, fakat validation/export affordance'larini fazla gizleyip gizlemedigi ve retry niyetini artirip artirmadigi ancak manuel sample ile bilinebilir
5. validation export, in-game progress ve summary/log sample semantigi hizalandi, ama manuel sample gelmeden telemetry/export/HUD yuzeyine yeni churn acilmamali
6. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-98 input/pause/spawn/death-readability/late-chase/offscreen-hit, compact HUD/support-strip, center-overlap guidance, blur-sonrasi fresh movement resume, `10-11s` grace fade, yeni player-reachable edge target clamp'i ve pointer start/retry steering davranisini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability veya opening-fairness churn'una donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; ayni focus-loss/input, pointer start/retry steering, compact HUD/support-strip, center-overlap fix'i, validation export/HUD/log sample sayisi, visible-arena lane-stack, wall-pinned velocity clamp veya yeni edge-target clamp yuzeylerine hemen geri donme
3. deterministic baseline'i (`26.5 / 6.3 / 4%`) ve build sagligini koru
4. docs'u stratejik yonle tutarli ve kisa tut

---

# Critical Risks

- sistem tekrar telemetry/copy/local-maximum loop'una kayabilir
- human signal olmadan growth kararlari proxy-overfit riski tasir
- manual sample olmadan ayni opener/fairness paketine tekrar tekrar donmek audit governance ile carpisir
- validation/export/HUD/log sample sayisi semantigi kapanmisken bu yuzeye geri donmek builder'i ikinci bir local loop'a sokabilir
- docs tekrar migration anlatimina saparsa builder odagi urunden kopabilir

---

# Immediate Handoff

- Bir sonraki en degerli is interactive browser/runtime varsa manuel sample toplamaktir.
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, bu tur kapanan wall-pinned velocity clamp'i, validation export/HUD/log sample semantigi, onceki pointer/focus-loss yuzeyleri veya edge-target clamp'e geri donmeden tek bir dar gameplay/UX source bug'i secmek olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu ve wall-pinned corner velocity artik safe top spawn'i sahte reroll'e itmiyor.
