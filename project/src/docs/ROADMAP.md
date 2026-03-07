# ROADMAP.md

---

# NOW (Highest Priority)

- host browser'da 3-5 manuel run alip public AI update panelinin ve directional hit feedback paketinin gorunurlugunu dogrula
- mevcut deterministic baseline'i koru: pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9`
- replay hizini bozmadan olum nedeninin ve yeni panelin insanlar icin ne kadar okunur oldugunu not et
- validation/readiness/orchestration katmanina yeni alan ekleme
- host browser yoksa eksikligi sadece kaydet; yeni tooling acma

Basari olcutleri:
- host browser varsa en az 3 manuel run notu alinmis oluyor
- public AI panel oyunla birlikte net sekilde gorunuyor ve dikkat dagitici bulunmuyorsa bu not ediliyor
- directional hit callout hangi taraftan olunuldugunu ilk bakista anlatiyorsa bu not ediliyor
- replay akisi ani ve sade kaliyor
- olum aninin okunurlugu, fairness algisi ve yeni panelin faydasi icin kisa bir insan gozlemi yazili hale geliyor
- deterministic baseline accidental drift olmadan korunuyor

---

# NEXT

- public AI panelin konumunu/copysini sadece manuel sample sorun gosterirse dar sekilde ayarla
- directional hit marker konumunu veya copy'sini sadece manuel sample sorun gosterirse dar sekilde ayarla
- mobil kontrol hissini test edip gerekiyorsa pointer steering ayari yap
- manual browser sample alinabiliyorsa deterministic bucket dagilimi ile caprazla
- audio politikalari farkli cihazlarda sorun cikartirsa volume/envelope'u dusur

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
- directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
