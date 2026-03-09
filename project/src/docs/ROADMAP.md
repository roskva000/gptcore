# ROADMAP.md

---

# NOW (Highest Priority)

- Divine Integration sonrasi en yuksek oncelik, projeyi `Human-Proven Survival Core` fazina sokmak
- Run #76 lane-stack filtresini gorunur obstacle'larla sinirladi; offscreen obstacle'lar artik erken spawn secimine gizli baski yapmiyor. Deterministic baseline `26.6s / 6.3s / 4%` ve `1 / 3 / 2 / 18` korunurken yeni regression check bu davranisi guard altina aldi
- interactive headed browser/runtime varsa en yuksek degerli adim forward-pressure + lane-stack spawn filtresini replay/start/pause/control paketiyle birlikte 5-10 manuel run'da dogrulamak olmali
- headed runtime yine blokluysa sonraki builder turu ayni copy/tooling alanina donmeden persistent `6.3s` outlier'i yeni ve dar bir trajectory/spawn-selection ayariyla zorlamaya devam etmeli
- haftalik stratejik gorev: builder run'lari artik ya insan kaniti toplasin ya da yeni gameplay problemi cozsun; telemetry/copy semantik loop'una geri donmesin
- odak, opening spawn-distance bonusu veya early lag/grace sabitlerine donmeden seed `#3` tipi trajectory/crossfire pattern'ini izolasyonla anlamak ve `avg >= 26.6s`, `<10s <= 1`, `30s cap >= 18` guard'larini korumak olsun
- once `npm run telemetry:check`, `npm run build` ve gerekirse `npm run telemetry:validation-ready -- --with-smoke` ile yeni baseline'i kilitle; sonra manuel sample veya yeni gameplay degisikligini dar tut
- death-readability, opening-fairness helper'lari, validation wording'i, smoke/tooling veya `latestRun.ts` alanina sapma

Basari olcutleri:
- `npm run telemetry:check` ve `npm run build` yesil kaliyor
- visible-only lane-stack guard'i yesil kaliyor; offscreen obstacle ayni sentetik senaryoda reroll tetiklemiyor
- gerekiyorsa `npm run telemetry:validation-ready -- --with-smoke` hala `smoke-passed` donuyor
- headed runtime varsa 5-10 manuel run notu forward-pressure + lane-stack filtresinin replay/start/pause ve chase hissini bozup bozmadigini isimlendiriyor
- headed runtime yoksa secilen yeni gameplay degisikligi `first death`i `6.3s` ustune tasiyor veya `<10s` outlier sayisini azaltirken `avg >= 26.6s`, `<10s <= 1` ve `30s cap >= 18` guard'larini bozmuyor

---

# NEXT

- interactive headed browser geldiği anda ilk builder run'i manuel sample toplama moduna gecmeli; baska "kolay is" secilmemeli
- God katmani kuruldugu icin bir sonraki builder, `STRATEGIC_STATE.md` ve `MASTER_PLAN.md` ile uyumunu acikca yazmali
- interactive headed browser runtime yoksa smoke'u yeniden cozmeye calisma; blocker'i kisa not edip baska olculebilir gameplay problemine gec
- browser yoksa telemetry/copy alanina donmeden seed `#3` trajectory/crossfire pattern'ini veya `<10s` outlier'i azaltacak yeni gameplay problemi sec; opening-fairness helper'larini tekrar acma
- browser yoksa Run #76 visible-only lane-stack fix'ini tekrar acma; yeni is ya manuel sample ya da seed `#3` trajectory problemi olmali
- browser yoksa runtime ile proxy hizasi bu tur kapandigi icin ayni validation/cull alanina ikinci bir tur harcama
- Run #72 pause-safe grace bug fix'i tamamlandigi icin ayni pause/grace implementasyonuna ikinci tur harcama; ancak headed manual sample bunu haksiz veya gec hissettirirse dar kapsamda yeniden bak
- Run #73-75 gameplay paketi tamamlandigi icin ayni mekanigi telemetry wording veya panel copy bahanesiyle tekrar kurcalama; manuel sample yeni sorun gosterirse yalnizca threshold/penalty veya `20-45s` hiz anchor seviyesinde dar ayar dusun
- interactive headed browser yoksa stale copy gibi kolay product bug'lari tekrar aramak yerine dogrudan yeni gameplay problem sec; ayni telemetry semantigi etrafinda ikinci bir run acma
- manuel sample replay friction gosterirse sadece input acceptance penceresi seviyesinde dar ayar yap
- manuel sample yumusatilan `20s+` chase'i fazla bos veya hala fazla sert gosterirse yalnizca 20-45s speed anchors uzerinde dar geri ayar yap
- manuel sample obstacle collider'i fazla bagislayici gosterirse yeni sistem acmadan yalnizca collider yaricapi dar kapsamda yeniden ayarlanir
- replay bug'i cikmazsa early-death fairness yuzeyine hemen geri donme; farkli gameplay problemi sec
- validation wording'ini, public paneli veya smoke script'ini tekrar kurcalama; tooling loop'una donme

---

# LATER

- `GameScene.ts` parcalama icin uygun seam'leri belirlemek
- obstacle cesitleri
- local best score history veya lightweight run history
- lightweight pause/state management
- deploy pipeline

---

# NICE TO HAVE

- visual polish
- background effects
- near-miss veya combo gibi replay motivasyonu artiran skor katmanlari

---

# BLOCKERS

- gercek oyuncu verisi yok
- human-in-the-loop sample kanali acik ama henuz dolu degil
- manual browser validation insan input ve uygun runtime gerektiriyor
- formal test suite yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry first death sinyali manual sample'da zamanla `> 10s`
- deterministic survival snapshot mevcut guard olarak `avg >= 26.6s`
- deterministic early death rate `<= 4%`
- deterministic first death `> 6.3s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 3`, `<10s <= 1`, `30s cap >= 18`
- `npm run telemetry:check` accidental drift'te fail veriyor
- deterministic survival proxy runtime ile ayni gorunur-arena hit guard'i ve `96px` offscreen cull margin'ini kullaniyor; bu hizayi bozacak ayarlar guard altinda tutulmali
- early spawn collision grace ilk `10s` boyunca `260ms`, sonrasinda `0ms` olarak guard altinda
- opening required spawn distance ilk `6s` boyunca `+160px`, sonrasinda baseline'a donuyor
- telemetry sample reset onceki validation export'u da temizliyor; yeni sample stale `Last export` ile baslamiyor
- retry telemetry fresh browser/session acilisini replay gibi saymiyor; ayni tab/session replay'i ise saymaya devam ediyor
- validation export `first death` alani sample'daki en dusuk olum suresini gosteriyor; artik kronolojik ilk iyi run kotu outlier'i maskeleyemiyor ve baseline etiketi `26.6s avg / 6.3s first death / 4% early` ile hizali kaliyor
- oyuncuya gorunen `Latest AI update` paneli de ayni `6.3s first death` semantigini tasiyor; public copy ile gercek telemetry birbirinden drift etmemeli
- browser validation readiness smoke komutu yesil kaliyor ve validation export persistence'ini reload sonrasi koruyor
- game-over ve paused fazlarinda held movement input `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- game-over ve paused fazlarinda held pointer/touch input da `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- waiting state de game-over/pause ile ayni `180ms` held-input acceptance'i kullaniyor; human sample bu yolun start friksiyonunu azaltip accidental auto-start yaratmadigini gostermeli
- pointer/touch steering `10px` dead-zone ve `120px` full-speed mesafe ile yakin hedefte analog hiz kullaniyor; human sample bunu asiri hizli veya fazla snap'li bulmadikca korunmali
- midgame speed curve `145 / 183 / 217 / 253 / 307 / 320` olarak korunuyor; human sample chase'i fazla bos veya hala fazla sert bulmadikca tekrar oynanmiyor
- obstacle collider `11px` olarak korunuyor; human sample kenar temasta ucuz hit'leri azaltirken oyunu fazla bagislayici bulmazsa yeni readability/fairness katmani acilmiyor
- obstacle'lar yalnizca merkezleri arena icindeyken hit verebiliyor; human sample bu guard'i kenarda gorunmez hit'leri azaltirken "late contact" hissi uretmedigi surece korumali
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
