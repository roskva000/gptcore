# ROADMAP.md

---

# NOW (Highest Priority)

- host browser runtime acilabilirse yeni early spawn-target lag tuning'ini 5-10 manuel run ile gozlemle
- mevcut deterministic baseline'i referans al: pacing `10 / 32 / 76`, survival `23.4s / 6.3s / 8%`, buckets `2 / 5 / 6 / 11`
- odak sadece yeni early chase hissi olsun: ilk 10 saniyede spawn'lar daha adil geliyor mu, yoksa challenge fazla yumusuyor mu
- death-readability, support strip, pause/retry, telemetry veya tooling alanina sapma
- host browser hala yoksa bunu sadece blocker olarak kaydet; ayni fairness ayarini yeni mikro-tuning loop'una cekme

Basari olcutleri:
- 5-10 manuel run notu erken spawn chase'inin daha adil ama halen gerilimli olup olmadigini soyluyor
- deterministic baseline `23.4s / 6.3s / 8%` accidental olarak bozulmuyor
- average survival `>= 23.4s` korunuyor
- early death rate `%8` uzeri bozulmuyor
- pacing `10 / 32 / 76` accidental olarak bozulmuyor
- replay/start/pause/input davranislarinda accidental drift olmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- host browser runtime acilamazsa early spawn-target lag tuning'ini dondur ve baska olculebilir gameplay problemine gec
- manuel sample yeni lag'in fazla yumusak oldugunu gosterirse yalnizca lag suresi/cutoff'u dar kapsamda geri cek
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
- bu sandbox `127.0.0.1` loopback socket bind denemesini `EPERM` ile reddediyor
- manual browser validation insan input ve uygun runtime gerektiriyor
- formal test suite yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry first death sinyali manual sample'da zamanla `> 10s`
- deterministic survival snapshot mevcut guard olarak `avg >= 23.4s`
- deterministic early death rate `<= 8%`
- deterministic first death `> 6.3s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 5`, `<10s <= 2`, `30s cap >= 11`
- `npm run telemetry:check` accidental drift'te fail veriyor
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
