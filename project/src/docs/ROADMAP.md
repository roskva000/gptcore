# ROADMAP.md

---

# NOW (Highest Priority)

- telemetry acikken en az 10-20 manuel run topla ve first_death_time / average_survival_time baseline cikar
- `MIN_SPAWN_DISTANCE_FROM_PLAYER` ve `SPAWN_POINT_ATTEMPTS` degerlerini bu baseline'a gore tek turda yeniden tune et
- replay akisinin <3s kaldigini telemetry retry verisiyle kontrol et

Basari olcutleri:
- first_death_time median >= 10s
- average_retry_delay_ms <= 3000
- unfair death gozlemleri azalirken average_survival_time gerilemiyor

---

# NEXT

- hit feedback ve basic sound effects ekle
- basit tutorial copy'sini telemetry bulgularina gore netlestir
- mobil kontrol hissini gercek cihazda test et

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
- combo / near-miss bonus gibi tekrar oynama motivasyonu artiran skor katmanlari

---

# BLOCKERS

- bu ortamda internet erisimi olmadigi icin bagimlilik kurulumu ve build dogrulamasi kisitli
- otomatik test ve regression guvencesi yok
- gercek oyuncu verisi yok

---

# SUCCESS METRICS

- first_death_time > 10s
- retry_rate high
- average_survival_time runlar arasinda yukseliyor
- unfair death gozlemleri azaliyor
