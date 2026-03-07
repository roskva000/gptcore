# ROADMAP.md

---

# NOW (Highest Priority)

- `npm run telemetry:check` ile yeni baseline'i teyit et: pacing `10 / 32 / 76`, survival `21.6s / 5.0s / 8%`, buckets `2 / 7 / 7 / 8`
- bucket kazancini korurken deterministic avg survival'i toparlayacak tek bir gameplay tuning'i sec
- tek eksene dokun: obstacle speed curve; fairness veya validation scope'u buyutme
- tuning sonrasi `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` calistir
- validation/readiness/orchestration katmanina yeni alan ekleme

Basari olcutleri:
- pacing baseline bozulmuyor
- `<10s` bucket `2` ustune cikmiyor
- `10-20s` bucket `7` ustune cikmiyor
- deterministic avg survival `21.6s` ustune cikiyor; ideal hedef yeniden `22.3s+`

---

# NEXT

- hit feedback ve basic sound effects ekle
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
- deterministic survival snapshot ilk hedef olarak `avg > 21.6s`, ideal olarak yeniden `>= 22.3s`
- deterministic early death rate `<= 8%`
- deterministic survival buckets icinde `10-20s` bucket `<= 7` kalirken `30s cap` yeniden buyuyor
- `npm run telemetry:check` accidental drift'te fail veriyor
