# ROADMAP.md

---

# NOW (Highest Priority)

- `npm run telemetry:check` komutunu balance degisikliginden once/sonra kosup deterministic pacing ve survival baseline'inin bozulmadigini dogrula
- Run #12 export akisini kullanip tarayici varsa `R` reset sonrasi 5-10 manual run topla ve sample sonunda `V` ile validation report'u kopyala
- session telemetry ile first death, avg survival ve early death oranini yeni browserless baseline'a karsi caprazla
- HUD / game over / `C` summary uzerindeki explicit `first death` sinyalini esas al; recent deaths listesinden elle cikarim yapma
- clipboard yoksa `V` fallback'inin console + localStorage export'unu kullanarak sample'i yine yazili hale getir
- manual sample yoksa blokaji acikca not et; bu durumda yeni balance tuning'ine gecme

Basari olcutleri:
- session telemetry uzerinde en az 5 run gorulmeli
- manual sample'da explicit session first death mumkunse 10s uzerine cikmali; cikmiyorsa hangi olumu modelin kacirdigi yazilmali
- mevcut browserless baseline'lar referans alinmali: pacing 10/32/76 spawn, survival snapshot avg 22.3s / first death 5.0s / early death 8%
- build ve `telemetry:check` tekrar basarili calismali
- tarayici varsa `R` sonrasi session telemetry ozetinde en az 5 run gorulmeli
- sample sonunda `validation_sample` satiri dokumana veya handoff notuna aynen tasinmali

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
- manual validation artik daha okunabilir ama yine de tarayici / insan input gerektiriyor
- validation export iyilesti ama hala insanin oyunu acip run bitirmesi gerekiyor
- browser tabanli steering harness hala repo-ici degil
- formal test suite yok; mevcut regression guvencesi deterministic `telemetry:check` ile sinirli
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry uzerinde first_death_time > 10s
- avg retry gap < 3s
- average_survival_time manual veya scripted sample'da 14.3s eski baseline'in altina dusmuyor
- early death rate browserless survival snapshot'taki 8% ve scripted sample'daki 20% referanslarini asiri asmiyor
- `npm run telemetry:check` deterministic baseline sapmalarinda fail veriyor
- deterministic snapshot'ta 10s/30s pacing beklenen 10 / 32 spawn seviyesinde kaliyor
- survival snapshot'ta first death 5.0s baseline'i korunuyor veya iyilesiyor, early death 8% referansi bozulmuyor
- unfair death gozlemleri ve yakin spawn kurtarmalari daha anlamli hale geliyor
