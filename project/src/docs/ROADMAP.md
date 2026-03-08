# ROADMAP.md

---

# NOW (Highest Priority)

- host browser'da 3-5 manuel run alip replay fix'inin tek aksiyonla guvenilir calistigini, yeniden toparlanan balance curve'un 20s+ hissini iyilestirip iyilestirmedigini ve mevcut death-feedback paketinin dikkat seviyesini dogrula
- mevcut deterministic baseline'i koru: pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 7 / 4 / 11`
- replay hizini bozmadan ilk 30 saniyedeki fairness hissini, death callout paketinin yardimci mi fazla mi oldugunu ve public panelin dikkat seviyesini not et
- manuel sample veya yeni metrik gelmeden ayni death-readability paketine yeni gorsel/copy katmani ekleme
- validation/readiness/orchestration katmanina yeni alan ekleme
- host browser yoksa eksikligi sadece kaydet; yeni tooling acma

Basari olcutleri:
- host browser varsa en az 3 manuel run notu alinmis oluyor
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'a donuyor
- ilk 20-30 saniye arasi yeni build'in daha adil ve okunur hissedip hissettirmedigi not ediliyor
- teal guide + `BREAK ...` prompt'u hangi yone kirilman gerektigini ilk bakista anlatiyorsa bu not ediliyor
- killer obstacle spotlight'i, `KILLER` tag + connector'u, diger threat dimming'i, fatal-lane callout ve ray hangi threat'e carpildigini netlestiriyorsa bu not ediliyor
- public AI panel oyunla birlikte net sekilde gorunuyor ve dikkat dagitici bulunmuyorsa bu not ediliyor
- replay akisi ani ve sade kaliyor
- deterministic baseline accidental drift olmadan korunuyor

---

# NEXT

- host browser sample balance hissinde sorun gosterirse yalnizca obstacle speed curve veya pointer steering seviyesinde tek eksenli dar ayar yap
- death-feedback paketi fazla baskin bulunursa sadece copy/offset/alpha/font-size/line-length/scale seviyesinde dar ayar yap
- public AI panelin konumunu/copysini sadece manuel sample sorun gosterirse dar sekilde ayarla
- replay reset hissi klavye veya touch'ta takiliyorsa sadece input/copy/offset seviyesinde dar ayar yap
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
- deterministic survival snapshot mevcut guard olarak `avg >= 22.3s`
- deterministic early death rate `<= 8%`
- deterministic survival buckets icinde `10-20s` bucket `<= 7` kalirken `30s cap >= 11`
- `npm run telemetry:check` accidental drift'te fail veriyor
- public AI update panel oyuncu tarafinda gorulebilir durumda ve build'de kalici
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
