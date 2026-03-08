# ROADMAP.md

---

# NOW (Highest Priority)

- host browser'da 3-5 manuel run alip replay fix'inin tek aksiyonla guvenilir calistigini ve yeni `KILLER` spotlight etiketi + connector + threat dimming + merkez-bosluklu arrowhead'li impact ray + merkez-bosluklu arrowhead'li teal kacis guide'i + `BREAK ...` prompt + fatal-lane callout + directional hit feedback + public AI update paneli paketinin ilk bakista okunurlugunu dogrula
- mevcut deterministic baseline'i koru: pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9`
- replay hizini bozmadan olum nedeninin, killer tag connector'unun, threat dimming'in, yeni merkez-bosluginin ve arrowhead uclarinin, teal kacis guide'inin, kacis yonu prompt'unun ve panelin insanlar icin ne kadar faydali oldugunu not et
- validation/readiness/orchestration katmanina yeni alan ekleme
- host browser yoksa eksikligi sadece kaydet; yeni tooling acma

Basari olcutleri:
- host browser varsa en az 3 manuel run notu alinmis oluyor
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'a donuyor
- teal guide + `BREAK ...` prompt'u hangi yone kirilman gerektigini ilk bakista anlatiyorsa bu not ediliyor
- killer obstacle spotlight'i, yeni `KILLER` tag + connector'u, diger threat dimming'i, fatal-lane callout ve ray hangi threat'e carpildigini netlestiriyorsa bu not ediliyor
- impact ve escape ray arrowhead'leri ile oyuncu merkezindeki yeni bosluk, gelen tehlike ile onerilen kacis yonunu bir bakista ayiriyorsa bu not ediliyor
- public AI panel oyunla birlikte net sekilde gorunuyor ve dikkat dagitici bulunmuyorsa bu not ediliyor
- replay akisi ani ve sade kaliyor
- deterministic baseline accidental drift olmadan korunuyor

---

# NEXT

- killer tag connector'u, threat dimming, merkez-bosluklu arrowhead'li rays, teal guide veya escape prompt fazla baskin ya da yetersiz bulunursa sadece copy/offset/alpha/font-size/line-length/scale seviyesinde dar ayar yap
- public AI panelin konumunu/copysini sadece manuel sample sorun gosterirse dar sekilde ayarla
- replay reset hissi klavye veya touch'ta takiliyorsa sadece input/copy/offset seviyesinde dar ayar yap
- mobil kontrol hissini test edip gerekiyorsa pointer steering ayari yap
- manual browser sample alinabiliyorsa deterministic bucket dagilimi ile caprazla

---

# LATER

- obstacle cesitleri
- local best score
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
- deterministic survival snapshot mevcut guard olarak `avg >= 21.8s`; ideal olarak yeniden `>= 22.3s`
- deterministic early death rate `<= 8%`
- deterministic survival buckets icinde `10-20s` bucket `<= 7` kalirken `30s cap` yeniden buyuyor
- `npm run telemetry:check` accidental drift'te fail veriyor
- public AI update panel oyuncu tarafinda gorulebilir durumda ve build'de kalici
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
