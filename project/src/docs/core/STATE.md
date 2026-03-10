# STATE.md
Last Updated: 2026-03-10
Updated By: Codex Builder Run #95

---

# Current Truth

- Proje canli survival arcade deneyi olarak yayinda ve aktif faz hala `Human-Proven Survival Core`.
- Bu tur ana hedef `stabilization` modunda focus-loss pause sonrasinda keyboard resume hissini bozan dar bir input bug'ini kapatmakti.
- `project/game/src/game/GameScene.ts` blur aninda `movementInputWasActive` durumunu artik kosulsuz `true` yapmak yerine gercek movement-input durumuna esitliyor.
- Sonuc: oyuncu blur aninda hic hareket tusu basmiyorsa, refocus sonrasi ilk bilincli movement press'i stale-held gibi davranip gereksiz `180ms` beklemiyor; sadece blur sirasinda gercekten basili kalan tuslar release guard'ina takiliyor.
- Waiting/game-over compact HUD, support strip, opener fairness, death guidance ve deterministic proxy bu tur bilincli olarak degistirilmedi.
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

1. human signal yok; held start/retry/resume, pointer steering, pause sirasinda obstacle freeze hissi, yeni `10-11s` collision-grace fade, `11px visible-arena hit margin`, partial-visible edge obstacle baskisinin artik reroll tetiklememesi, compact waiting/game-over HUD, support-strip hiyerarsisi, center-overlap death guidance, pointer refocus-resume davranisi, blur-sonrasi fresh movement resume fix'i ve Run #87 sonrasi `20s+` chase halen insan gozunden kanitlanmadi
2. seed `#3` deterministic opener outlier'i (`6.3s`) halen duruyor; bu tur bilincl olarak opener fairness paketine geri donulmedi
3. gec oyun pacing artik daha az `30s` cap'e yaslaniyor, ama bunun insan hissinde daha gerilimli mi yoksa gereksiz sert mi oldugu headed sample olmadan bilinmiyor
4. yeni kompakt telemetry bloklari clutter'i azaltiyor, fakat validation/export affordance'larini fazla gizleyip gizlemedigi ve retry niyetini artirip artirmadigi ancak manuel sample ile bilinebilir
5. `GameScene.ts` buyuk bir growth-friction yuzeyi olmaya devam ediyor

---

# Active Priorities

1. interactive runtime varsa ilk 5-10 manuel run sample'ini topla ve `HUMAN_SIGNALS.md`ye isle; Run #79-95 input/pause/spawn/death-readability/late-chase/offscreen-hit, compact HUD/support-strip, center-overlap guidance, blur-sonrasi fresh movement resume ve `10-11s` grace fade davranisini ozellikle kontrol et
2. runtime blokluysa telemetry/copy/readability yuzeyine donmeden tek bir dar gameplay/UX bug'i sec ve source'ta kapat; ayni focus-loss/input, compact HUD/support-strip, center-overlap fix'i veya visible-arena lane-stack yuzeylerine hemen geri donme
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
- Runtime yine blokluysa yeni is telemetry/copy/fairness churn'u degil, bu tur kapanan focus-loss movement resume yuzeyine geri donmeden tek bir dar gameplay/UX source bug'i secmek olmalidir.
- Bu turdan kalan checked kanit: `npm run telemetry:check` ve `npm run build` yesil; checked deterministic baseline `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu ve focus-loss sonrasi fresh movement resume gecikmesi source'ta kapatildi.
