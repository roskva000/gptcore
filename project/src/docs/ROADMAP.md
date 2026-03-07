# ROADMAP.md

---

# NOW (Highest Priority)

- `npm run telemetry:snapshot` ve `npm run telemetry:survival-snapshot` ciktilarini birlikte baseline kabul et
- survival snapshot'ta ilk 10 saniyedeki asiri erken olumleri azaltmak icin yalnizca obstacle speed egirisi uzerinde tek, dar tuning denemesi yap
- tuning sonrasi her iki scripti yeniden calistir; pacing'i korurken survival snapshot'ta `firstDeathTime` ve early death oraninda iyilesme arayip scripted sample ile uyumu not et
- tarayici bulunursa ikinci adim olarak `R` reset sonrasi gercek manual input'u 5-10 run validate et; bulunmuyorsa bu isi bloklu diye not etmeye devam et

Basari olcutleri:
- snapshot baseline'i dokumante edilmis olmali: ilk spawn 0.9s, 10s icinde 10 spawn, 30s icinde 32 spawn
- survival snapshot'ta early death rate `%21` baseline'inin altina inmeli
- survival snapshot'ta first death 3.4s baseline'inin uzerine cikmali
- build ve iki snapshot scripti basarili calismali
- tarayici varsa `R` sonrasi session telemetry ozetinde en az 5 run gorulmeli

---

# NEXT

- browser veya insan tester mevcutsa manual telemetry sample topla ve survival harness ile farki dokumante et
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
- browser tabanli steering harness hala repo-ici degil
- otomatik test ve regression guvencesi yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry uzerinde first_death_time > 10s
- avg retry gap < 3s
- average_survival_time 10.8s baseline uzerinden yukselmeye devam ediyor
- early death rate scripted sample'daki 20% seviyesinin ustune cikmiyor
- deterministic snapshot'ta 10s/30s pacing beklenen 10 / 32 spawn seviyesinde kaliyor
- survival snapshot'ta first death 3.4s baseline'i ve early death 21% baseline'i asagi/yukari dogru iyilesiyor
- unfair death gozlemleri ve yakin spawn kurtarmalari daha anlamli hale geliyor
