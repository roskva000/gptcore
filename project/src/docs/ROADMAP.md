# ROADMAP.md

---

# NOW (Highest Priority)

- first playable prototype uzerinde difficulty fairness'i test et ve ayarla
- first death time, average survival time ve retry davranisi icin en azindan local gameplay telemetry ekle
- unfair hissettiren spawn durumlarini azaltmak icin spawn telegraph veya grace tuning uygula

Basari olcutleri:
- ilk olum ortalamasi 10 saniyenin altinda kalmiyorsa
- art arda restart akisi 3 saniyenin altinda korunuyorsa
- en az bir balancing karari gozlem veya telemetry ile destekleniyorsa

---

# NEXT

- hit feedback ve basic sound effects ekle
- basit ama rahatsiz etmeyen tutorial/hint akisini iyilestir
- mobil kontrol hissini test edip gerekiyorsa pointer steering ayari yap

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
- combo / near-miss gibi tekrar oynama motivasyonu artiran skor katmanlari

---

# BLOCKERS

- gercek oyuncu verisi yok
- otomatik test ve regression guvencesi yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- first_death_time > 10s
- retry_rate high
- average_survival_time runlar arasinda yukseliyor
- unfair death gozlemleri azaliyor
