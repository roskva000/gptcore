# ROADMAP.md

---

# NOW (Highest Priority)

- host browser/runtime varsa yeni opening spawn-distance guard'ini 5-10 manuel run ile gozlemle
- mevcut deterministic baseline'i referans al: pacing `10 / 32 / 76`, survival `24.3s / 6.3s / 4%`, buckets `1 / 5 / 6 / 12`
- odak sadece acilis fairness hissi olsun: ilk `6s` icinde yeni obstacle lane'leri daha adil mi, yoksa opener fazla bos mu kaldi
- death-readability, support strip, pause/retry, telemetry veya tooling alanina sapma
- packaged smoke su an `Page.enable` ile fail oldugu icin bunu yalnizca blocker olarak kaydet; bu turu browser-tooling genislemesine cevirme

Basari olcutleri:
- 5-10 manuel run notu yeni opening spawn-distance guard'inin daha adil ama halen gerilimli olup olmadigini soyluyor
- deterministic baseline `24.3s / 6.3s / 4%` accidental olarak bozulmuyor
- average survival `>= 24.3s` korunuyor
- early death rate `%4` uzeri bozulmuyor
- pacing `10 / 32 / 76` accidental olarak bozulmamali
- replay/start/pause/input davranislarinda accidental drift olmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- host browser runtime acilamazsa opening fairness surface'ini dondur ve baska olculebilir gameplay problemine gec
- manuel sample yeni opening reroll guard'inin opener'i fazla bosalttigini gosterirse yalnizca bonus/cutoff'u dar kapsamda geri cek
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
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
