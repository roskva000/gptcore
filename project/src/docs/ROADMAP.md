# ROADMAP.md

---

# NOW (Highest Priority)

- host browser/runtime varsa yeni opening spawn-distance guard'ini ve pointer/touch steering hissini 5-10 manuel run ile gozlemle
- mevcut deterministic baseline'i referans al: pacing `10 / 32 / 76`, survival `24.3s / 6.3s / 4%`, buckets `1 / 5 / 6 / 12`
- validation summary artik erken olum oldugunda `review early deaths` diyecegi icin manuel sample notlarini bu risk uzerine odakla
- odak sadece acilis fairness ve kontrol hissi olsun: ilk `6s` icinde yeni obstacle lane'leri daha adil mi, yoksa opener fazla bos mu kaldi; hold click/touch steering gergin ama kontrollu mu
- death-readability, support strip, pause/retry, telemetry veya tooling alanina sapma
- packaged smoke su an `Page.enable` ile fail oldugu icin bunu yalnizca blocker olarak kaydet; bu turu browser-tooling genislemesine cevirme

Basari olcutleri:
- 5-10 manuel run notu yeni opening spawn-distance guard'inin daha adil ama halen gerilimli olup olmadigini soyluyor
- ayni sample notlari pointer/touch steering'in promised `hold to steer` kontratini koruyup korumadigini soyluyor
- manuel sample notlari varsa validation summary'nin neden `review early deaths` dedigine oyuncu hissi tarafindan aciklama getiriyor
- deterministic baseline `24.3s / 6.3s / 4%` accidental olarak bozulmuyor
- average survival `>= 24.3s` korunuyor
- early death rate `%4` uzeri bozulmuyor
- pacing `10 / 32 / 76` accidental olarak bozulmamali
- replay/start/pause/input davranislarinda accidental drift olmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- host browser runtime acilamazsa opening fairness surface'ini dondur ve baska olculebilir gameplay problemine gec
- host browser runtime acilamazsa pointer/touch steering davranisini kod ve mevcut runtime kontrati uzerinden incele; somut bug yoksa bu alani da dondur
- manuel sample yeni opening reroll guard'inin opener'i fazla bosalttigini gosterirse yalnizca bonus/cutoff'u dar kapsamda geri cek
- manuel sample yoksa validation wording'ini tekrar kurcalama; ayni problemi tooling loop'una cekme
- replay reset hissi klavye veya touch'ta takiliyorsa sadece input/copy/offset seviyesinde dar ayar yap

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
- packaged smoke komutu Chromium/CDP tarafinda `Page.enable` hatasiyla fail oluyor
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
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
