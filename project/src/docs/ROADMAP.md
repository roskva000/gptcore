# ROADMAP.md

---

# NOW (Highest Priority)

- host browser/runtime varsa yeni durust `first death` telemetrysi ile keyboard + pointer replay/start/pause akisinin 5-10 manuel run notunu topla
- once `npm run telemetry:validation-ready -- --with-smoke` ile yolu yesil tut; export artik sample icindeki en dusuk olum suresini gosterdigi icin 20s+ chase tansiyonu ve replay friksiyonu notlari daha dogru okunacak
- odak insan hissi olsun: 20s+ chase hala gergin mi, replay tek aksiyonla net mi, held movement ve held pointer retry/resume accidental auto-restart uretiyor mu, focus-loss resume adil mi
- death-readability, opening-fairness, support strip, validation wording veya tooling alanina sapma

Basari olcutleri:
- `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donuyor
- 5-10 manuel run notu start -> play -> 20s+ chase -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu isimlendiriyor
- `V` export ve HUD `first death` alanlari sample icindeki en dusuk olum suresini gosteriyor; manuel notlar bu sinyali dogru yorumluyor
- manual notlar yeni midgame hiz yumusamasinin chase'i fazla bagislayici yapip yapmadigini acikca soyluyor
- held movement key ve held pointer/touch ile retry/resume davranisinin en az bir keyboard ve bir pointer senaryosunda sorunsuz, accidental auto-restart'siz calistigi not ediliyor
- session retry telemetry'si sadece ayni browser session replay'lerini sayiyor; refresh/yeni session false-positive yok
- replay/start/pause/input davranislarinda accidental drift olmuyor
- deterministic baseline `25.1s / 6.3s / 4%` accidental olarak bozulmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- host browser runtime acilamazsa smoke'u yeniden cozmeye calisma; blocker'i kisa not edip baska olculebilir gameplay problemine gec
- manuel sample replay friction gosterirse sadece input acceptance penceresi veya copy seviyesinde dar ayar yap
- manuel sample midgame chase'i fazla kolay gosterirse yalnizca 10-45s speed anchors uzerinde dar geri ayar yap
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
- deterministic survival snapshot mevcut guard olarak `avg >= 25.1s`
- deterministic early death rate `<= 4%`
- deterministic first death `> 6.3s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 4`, `<10s <= 1`, `30s cap >= 14`
- `npm run telemetry:check` accidental drift'te fail veriyor
- early spawn collision grace ilk `10s` boyunca `260ms`, sonrasinda `0ms` olarak guard altinda
- opening required spawn distance ilk `6s` boyunca `+160px`, sonrasinda baseline'a donuyor
- telemetry sample reset onceki validation export'u da temizliyor; yeni sample stale `Last export` ile baslamiyor
- retry telemetry fresh browser/session acilisini replay gibi saymiyor; ayni tab/session replay'i ise saymaya devam ediyor
- validation export `first death` alani sample'daki en dusuk olum suresini gosteriyor; artik kronolojik ilk iyi run kotu outlier'i maskeleyemiyor
- browser validation readiness smoke komutu yesil kaliyor ve validation export persistence'ini reload sonrasi koruyor
- game-over ve paused fazlarinda held movement input `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- game-over ve paused fazlarinda held pointer/touch input da `180ms` sonra retry/resume olarak kabul ediliyor; bu davranis human sample'da accidental auto-restart yaratmamali
- midgame speed curve `145 / 183 / 249 / 302 / 320` olarak korunuyor; human sample chase tansiyonunu fazla dusuk bulmadikca tekrar buyutulmuyor
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
