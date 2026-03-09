# ROADMAP.md

---

# NOW (Highest Priority)

- Run #68 waiting state'i mevcut `180ms` held-input acceptance ile replay/pause akisiyle hizaladi; sonraki ana urun adimi bunun ve mevcut replay/pause/control paketinin insan sample ile dogrulanmasi olmali
- interactive headed browser/runtime varsa yeni `25.6s / 6.3s / 4%` baseline'i koruyarak keyboard + pointer replay/start/pause akisinin, waiting held-start davranisinin, `120px` analog pointer steering esiginin, hizlanan `10s+` chase'in ve `11px` obstacle collider'in 5-10 manuel run notunu topla
- once `npm run telemetry:validation-ready -- --with-smoke` ile yolu yesil tut; export sample icindeki en dusuk olum suresini gosterdigi icin 20s+ chase tansiyonu ve replay friksiyonu notlari daha dogru okunacak
- odak insan hissi olsun: waiting state'te held movement/pointer extra release-repress istemeden start'i netlestiriyor mu, `120px` analog pointer steering uzak kacista daha cevabi mi, yakin hedefte halen kontrollu mu, replay tek aksiyonla net mi, held movement ve held pointer retry/resume accidental auto-restart uretiyor mu, focus-loss resume adil mi, hizlanan `10s+` chase arena tikanmasini azaltirken hala adil mi, `11px` obstacle collider kenar grazing hit'lerini azaltirken fazla bagislayici hissettiriyor mu
- death-readability, opening-fairness, support strip, validation wording veya tooling alanina sapma

Basari olcutleri:
- `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donuyor
- 5-10 manuel run notu start -> play -> 20s+ chase -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu isimlendiriyor
- manuel notlar waiting held-start davranisinin accidental auto-start yaratip yaratmadigini ve klavye/pointer icin ekstra birak-bas ihtiyacini kaldirip kaldirmadigini acikca soyluyor
- `V` export ve HUD `first death` alanlari sample icindeki en dusuk olum suresini gosteriyor; manuel notlar bu sinyali dogru yorumluyor
- manuel notlar obstacle collider daralmasinin kenar temaslarinda "haksiz hit" hissini azaltip azaltmadigini acikca soyluyor
- analog pointer steering en az bir touch/pointer senaryosunda yakin dodge ayarini koruyor ve uzak kacista oncekinden daha cabuk tam hiza cikiyor veya somut bir sorun notu uretiyor
- manual notlar yeni midgame hiz yumusamasinin chase'i fazla bagislayici yapip yapmadigini acikca soyluyor
- held movement key ve held pointer/touch ile retry/resume davranisinin en az bir keyboard ve bir pointer senaryosunda sorunsuz, accidental auto-restart'siz calistigi not ediliyor
- session retry telemetry'si sadece ayni browser session replay'lerini sayiyor; refresh/yeni session false-positive yok
- replay/start/pause/input davranislarinda accidental drift olmuyor
- deterministic baseline `25.6s / 6.3s / 4%` accidental olarak bozulmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- interactive headed browser runtime yoksa smoke'u yeniden cozmeye calisma; blocker'i kisa not edip baska olculebilir gameplay problemine gec
- browser yoksa telemetry/copy alanina donmeden `<10s` outlier'i pacing/control tarafindan azaltacak yeni gameplay problemi sec; opening-fairness helper'larini tekrar acma
- interactive headed browser yoksa stale copy gibi kolay product bug'lari tekrar aramak yerine dogrudan yeni gameplay problem sec; ayni telemetry semantigi etrafinda ikinci bir run acma
- manuel sample replay friction gosterirse sadece input acceptance penceresi seviyesinde dar ayar yap
- manuel sample hizlanan `10s+` chase'i fazla sert veya fazla bos gosterirse yalnizca 15-45s speed anchors uzerinde dar geri ayar yap
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
- deterministic survival snapshot mevcut guard olarak `avg >= 25.6s`
- deterministic early death rate `<= 4%`
- deterministic first death `> 6.3s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 4`, `<10s <= 1`, `30s cap >= 16`
- `npm run telemetry:check` accidental drift'te fail veriyor
- early spawn collision grace ilk `10s` boyunca `260ms`, sonrasinda `0ms` olarak guard altinda
- opening required spawn distance ilk `6s` boyunca `+160px`, sonrasinda baseline'a donuyor
- telemetry sample reset onceki validation export'u da temizliyor; yeni sample stale `Last export` ile baslamiyor
- retry telemetry fresh browser/session acilisini replay gibi saymiyor; ayni tab/session replay'i ise saymaya devam ediyor
- validation export `first death` alani sample'daki en dusuk olum suresini gosteriyor; artik kronolojik ilk iyi run kotu outlier'i maskeleyemiyor ve baseline etiketi `25.6s avg / 6.3s first death / 4% early` ile hizali kaliyor
- oyuncuya gorunen `Latest AI update` paneli de ayni `6.3s first death` semantigini tasiyor; public copy ile gercek telemetry birbirinden drift etmemeli
- browser validation readiness smoke komutu yesil kaliyor ve validation export persistence'ini reload sonrasi koruyor
- game-over ve paused fazlarinda held movement input `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- game-over ve paused fazlarinda held pointer/touch input da `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- waiting state de game-over/pause ile ayni `180ms` held-input acceptance'i kullaniyor; human sample bu yolun start friksiyonunu azaltip accidental auto-start yaratmadigini gostermeli
- pointer/touch steering `10px` dead-zone ve `120px` full-speed mesafe ile yakin hedefte analog hiz kullaniyor; human sample bunu asiri hizli veya fazla snap'li bulmadikca korunmali
- midgame speed curve `145 / 183 / 217 / 253 / 307 / 320` olarak korunuyor; human sample chase'i fazla sert veya fazla bos bulmadikca tekrar oynanmiyor
- obstacle collider `11px` olarak korunuyor; human sample kenar temasta ucuz hit'leri azaltirken oyunu fazla bagislayici bulmazsa yeni readability/fairness katmani acilmiyor
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
