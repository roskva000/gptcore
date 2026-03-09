# ROADMAP.md

---

# NOW (Highest Priority)

- Run #72 focus-loss pause sirasinda obstacle collision-grace'in wall-clock ile tuketilmesini kapatti; browser smoke/readiness ve deterministic baseline yesil kaldi
- interactive headed browser/runtime varsa halen en yuksek degerli adim replay/start/pause/control paketinin 5-10 manuel run ile dogrulanmasi; ancak bu runtime'da headed sample blokluysa sonraki builder turu yeni gameplay problemi secmeli
- headed runtime yoksa bir sonraki ana gorev persistent `<10s` deterministic outlier'i azaltmak olmali; opening spawn-distance bonusu, early lag/grace sabitleri, telemetry wording'i, public copy ve collision/cull helper'lari yeniden acilmasin
- odak, opener paketini yeniden ayarlamadan erken center-lane crossfire veya trajectory baskisini dar kapsamda azaltmak olsun; hedef `first death > 6.3s` veya `<10s` seed sayisini azaltmak, bunu yaparken `avg >= 25.7s` ve `30s cap >= 17` seviyesini korumak
- once `npm run telemetry:check`, `npm run build` ve gerekirse `npm run telemetry:validation-ready -- --with-smoke` ile baseline'i kilitle; sonra yeni gameplay degisikligini dar tut
- death-readability, opening-fairness helper'lari, validation wording'i, smoke/tooling veya `latestRun.ts` alanina sapma

Basari olcutleri:
- `npm run telemetry:check` ve `npm run build` yesil kaliyor
- gerekiyorsa `npm run telemetry:validation-ready -- --with-smoke` hala `smoke-passed` donuyor
- headed runtime yoksa secilen yeni gameplay degisikligi `first death`i `6.3s` ustune tasiyor veya `<10s` outlier sayisini azaltirken `avg >= 25.7s`, `<10s <= 1` ve `30s cap >= 17` guard'larini bozmuyor
- headed runtime varsa 5-10 manuel run notu start -> play -> chase -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu isimlendiriyor

---

# NEXT

- interactive headed browser runtime yoksa smoke'u yeniden cozmeye calisma; blocker'i kisa not edip baska olculebilir gameplay problemine gec
- browser yoksa telemetry/copy alanina donmeden arena edge-pressure veya `<10s` outlier'i azaltacak yeni gameplay problemi sec; opening-fairness helper'larini tekrar acma
- browser yoksa runtime ile proxy hizasi bu tur kapandigi icin ayni validation/cull alanina ikinci bir tur harcama
- Run #72 pause-safe grace bug fix'i tamamlandigi icin ayni pause/grace implementasyonuna ikinci tur harcama; ancak headed manual sample bunu haksiz veya gec hissettirirse dar kapsamda yeniden bak
- interactive headed browser yoksa stale copy gibi kolay product bug'lari tekrar aramak yerine dogrudan yeni gameplay problem sec; ayni telemetry semantigi etrafinda ikinci bir run acma
- manuel sample replay friction gosterirse sadece input acceptance penceresi seviyesinde dar ayar yap
- manuel sample hizlanan `20s+` chase'i fazla sert veya fazla bos gosterirse yalnizca 20-45s speed anchors uzerinde dar geri ayar yap
- manuel sample obstacle collider'i fazla bagislayici gosterirse yeni sistem acmadan yalnizca collider yaricapi dar kapsamda yeniden ayarlanir
- replay bug'i cikmazsa early-death fairness yuzeyine hemen geri donme; farkli gameplay problemi sec
- validation wording'ini, public paneli veya smoke script'ini tekrar kurcalama; tooling loop'una donme

---

# LATER

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
- manual browser validation insan input ve uygun runtime gerektiriyor
- formal test suite yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry first death sinyali manual sample'da zamanla `> 10s`
- deterministic survival snapshot mevcut guard olarak `avg >= 25.7s`
- deterministic early death rate `<= 4%`
- deterministic first death `> 6.3s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 4`, `<10s <= 1`, `30s cap >= 17`
- `npm run telemetry:check` accidental drift'te fail veriyor
- deterministic survival proxy runtime ile ayni gorunur-arena hit guard'i ve `96px` offscreen cull margin'ini kullaniyor; bu hizayi bozacak ayarlar guard altinda tutulmali
- early spawn collision grace ilk `10s` boyunca `260ms`, sonrasinda `0ms` olarak guard altinda
- opening required spawn distance ilk `6s` boyunca `+160px`, sonrasinda baseline'a donuyor
- telemetry sample reset onceki validation export'u da temizliyor; yeni sample stale `Last export` ile baslamiyor
- retry telemetry fresh browser/session acilisini replay gibi saymiyor; ayni tab/session replay'i ise saymaya devam ediyor
- validation export `first death` alani sample'daki en dusuk olum suresini gosteriyor; artik kronolojik ilk iyi run kotu outlier'i maskeleyemiyor ve baseline etiketi `25.7s avg / 6.3s first death / 4% early` ile hizali kaliyor
- oyuncuya gorunen `Latest AI update` paneli de ayni `6.3s first death` semantigini tasiyor; public copy ile gercek telemetry birbirinden drift etmemeli
- browser validation readiness smoke komutu yesil kaliyor ve validation export persistence'ini reload sonrasi koruyor
- game-over ve paused fazlarinda held movement input `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- game-over ve paused fazlarinda held pointer/touch input da `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- waiting state de game-over/pause ile ayni `180ms` held-input acceptance'i kullaniyor; human sample bu yolun start friksiyonunu azaltip accidental auto-start yaratmadigini gostermeli
- pointer/touch steering `10px` dead-zone ve `120px` full-speed mesafe ile yakin hedefte analog hiz kullaniyor; human sample bunu asiri hizli veya fazla snap'li bulmadikca korunmali
- midgame speed curve `145 / 183 / 217 / 254 / 310 / 320` olarak korunuyor; human sample chase'i fazla sert veya fazla bos bulmadikca tekrar oynanmiyor
- obstacle collider `11px` olarak korunuyor; human sample kenar temasta ucuz hit'leri azaltirken oyunu fazla bagislayici bulmazsa yeni readability/fairness katmani acilmiyor
- obstacle'lar yalnizca merkezleri arena icindeyken hit verebiliyor; human sample bu guard'i kenarda gorunmez hit'leri azaltirken "late contact" hissi uretmedigi surece korumali
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
