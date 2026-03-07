# ROADMAP.md

---

# NOW (Highest Priority)

- yeni session telemetry akisi ile `R` reset sonrasi gercek manual input'u 5-10 run boyunca validate et
- eger manual sample hala `first_death_time < 10s` veya early death >20% gosterirse yalnizca obstacle speed uzerinde ikinci, dar bir tuning karari cikar
- `C` console summary'sinden session ve lifetime sayilarini ayri not et
- replay akisinin gercek inputta hala hizli kaldigini not et

Basari olcutleri:
- `R` sonrasi session telemetry ozetinde en az 5 run gorulmesi
- `first_death_time > 10s` hedefinin manuel sample'da korunmasi
- early death rate'in `%20` civarina veya altina inmesi
- art arda restart akisinin 3 saniyenin altinda korunmasi

---

# NEXT

- hit feedback ve basic sound effects ekle
- spawn telegraph ihtiyacini manual telemetry sonucuna gore degerlendir
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
- calisma ortaminda tarayici olmadigi icin agent tarafinda manual input dogrudan toplanamadi
- otomatik test ve regression guvencesi yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry uzerinde first_death_time > 10s
- avg retry gap < 3s
- average_survival_time 10.8s baseline uzerinden yukselmeye devam ediyor
- early death rate scripted sample'daki 20% seviyesinin ustune cikmiyor
- unfair death gozlemleri ve yakin spawn kurtarmalari daha anlamli hale geliyor
