# ROADMAP.md

---

# NOW (Highest Priority)

- host browser/runtime varsa replay/start/pause akisinin friksiyonunu 5-10 manuel run ile gozlemle
- browser smoke artik calistigi icin once `npm run telemetry:validation-ready -- --with-smoke` ile yolu yesil tut, sonra replay hizi notlarini mevcut telemetry ile eslestir
- odak sadece replay akisi olsun: yeniden baslama tek aksiyonla hizli mi, hold click/touch steering start veya retry aninda istemsiz hareket yaratiyor mu, focus-loss resume adil mi
- death-readability, opening-fairness, support strip, validation wording veya tooling alanina sapma

Basari olcutleri:
- `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donuyor
- 5-10 manuel run notu start -> play -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu isimlendiriyor
- session retry telemetry'si sadece ayni browser session replay'lerini sayiyor; refresh/yeni session false-positive yok
- replay/start/pause/input davranislarinda accidental drift olmuyor
- deterministic baseline `24.3s / 6.3s / 4%` accidental olarak bozulmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- host browser runtime acilamazsa smoke'u yeniden cozmeye calisma; blocker'i kisa not edip baska olculebilir gameplay problemine gec
- manuel sample replay friction gosterirse sadece input acceptance veya copy seviyesinde dar ayar yap
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
- deterministic survival snapshot mevcut guard olarak `avg >= 24.3s`
- deterministic early death rate `<= 4%`
- deterministic first death `> 6.3s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 5`, `<10s <= 1`, `30s cap >= 12`
- `npm run telemetry:check` accidental drift'te fail veriyor
- early spawn collision grace ilk `10s` boyunca `260ms`, sonrasinda `0ms` olarak guard altinda
- opening required spawn distance ilk `6s` boyunca `+160px`, sonrasinda baseline'a donuyor
- telemetry sample reset onceki validation export'u da temizliyor; yeni sample stale `Last export` ile baslamiyor
- retry telemetry fresh browser/session acilisini replay gibi saymiyor; ayni tab/session replay'i ise saymaya devam ediyor
- browser validation readiness smoke komutu yesil kaliyor ve validation export persistence'ini reload sonrasi koruyor
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
