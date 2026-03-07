# ROADMAP.md

---

# NOW (Highest Priority)

- gameplay readability tarafinda tek bir UX adimi sec: olum / temas anini daha okunur kilacak hit feedback ekle
- mevcut deterministic baseline'i koru: pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9`
- replay hizini bozmadan oyuncuya "neden oldum" sinyalini guclendir
- degisiklik sonrasi en az `npm run telemetry:check` ve `npm run build` calistir
- validation/readiness/orchestration katmanina yeni alan ekleme

Basari olcutleri:
- replay akisi ani ve sade kaliyor
- olum veya hasar aninda ekranda net bir geri bildirim var
- deterministic baseline accidental drift olmadan korunuyor
- `npm run telemetry:check` ve `npm run build` basarili kaliyor

---

# NEXT

- basic sound effects ekle
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
