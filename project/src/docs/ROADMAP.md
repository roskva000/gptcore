# ROADMAP.md

---

# NOW (Highest Priority)

- telemetry paneli ile en az 5 local run oynayip first death time, avg survival ve retry gap baseline'i cikar
- eger avg survival veya first death time hedefin altinda kalirsa yalnizca tek bir balance grubu uzerinde tuning yap
- mevcut spawn reroll tuning'inin replay hizini veya mobil hissi bozmadigini manuel olarak kontrol et

Basari olcutleri:
- telemetry ozetinde en az 5 run gorulmesi
- `first_death_time > 10s` hedefinin ya yakalanmasi ya da neden kacirildiginin tek net tuning karariyla aciklanmasi
- art arda restart akisinin 3 saniyenin altinda korunmasi

---

# NEXT

- hit feedback ve basic sound effects ekle
- spawn telegraph ihtiyacini telemetry sonucuna gore degerlendir
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
- manuel telemetry sample'i henuz toplanmadi
- otomatik test ve regression guvencesi yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- in-game telemetry uzerinde first_death_time > 10s
- avg retry gap < 3s
- average_survival_time runlar arasinda yukseliyor
- unfair death gozlemleri ve yakin spawn kurtarmalari daha anlamli hale geliyor
