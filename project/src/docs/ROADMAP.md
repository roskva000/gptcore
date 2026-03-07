# ROADMAP.md

---

# NOW (Highest Priority)

- once host shell'de `socketProbeCommand` ile ayni loopback bind probe'unu calistir; bu probe agent runtime disinda basari vermezse browser smoke veya manual sample'a gecme
- once `npm run telemetry:browser-preflight` calistir; Run #20 sonrasi sonuc `status: ok` olmadan browser smoke veya manual sample'a gecme ve `socketProbeCommand` alanini host shell kontrolu icin not et
- once `npm run telemetry:validation-ready` calistir; bu komut deterministic guard, validation snapshot ve browser preflight sonucunu birlikte vermeli, `nextAction` artik host shell probe adimini da acikca soyluyor
- `telemetry:validation-ready` ancak `status: ready` veya socket izinli ortamda `--with-smoke` ile `smoke-passed` verirse browser validation akisina gec
- Run #17'de eklenen `npm run telemetry:browser-validation-smoke` komutunu loopback socket ve Chromium erisimi olan bir ortamda calistir; browser smoke gecmeden manual sample'a gecme
- `npm run telemetry:check` sonucunu baseline olarak koru; intentional tuning disinda bu guard'i guncelleme
- browser smoke gectikten sonra interaktif browser erisimi olan bir ortamda `R` reset sonrasi 5-10 manual run topla ve sample sonunda `V` ile validation report'u kopyala
- Run #14 gorunurluk ekini kullanarak HUD veya game over overlay'de `Last export` satirinin doldugunu teyit et; clipboard yoksa fallback'in kaydi gorunur olmali
- manual sample oncesi `npm run telemetry:validation-snapshot` ile export kontratinin ve parse edilen `Last export` ozetinin baseline `5 runs | first death 30.0s | early 20% | 5/5 runs, target met` olarak kaldigini dogrula
- session telemetry ile first death, avg survival ve early death oranini yeni browserless baseline'a karsi caprazla
- HUD / game over / `C` summary uzerindeki explicit `first death` sinyalini esas al; recent deaths listesinden elle cikarim yapma
- clipboard yoksa `V` fallback'inin console + localStorage export'unu kullanarak sample'i yine yazili hale getir
- manual sample yoksa blokaji acikca not et; bu durumda yeni balance tuning'ine gecme

Basari olcutleri:
- session telemetry uzerinde en az 5 run gorulmeli
- manual sample'da explicit session first death mumkunse 10s uzerine cikmali; cikmiyorsa hangi olumu modelin kacirdigi yazilmali
- mevcut browserless baseline'lar referans alinmali: pacing 10/32/76 spawn, survival snapshot avg 22.3s / first death 5.0s / early death 8%
- build, `telemetry:check` ve `telemetry:validation-snapshot` tekrar basarili calismali
- `telemetry:browser-validation-smoke` socket izinli ortamda gecmeli; sandboxli ortamda ise hizli ve acik blokaj vermeli
- `telemetry:browser-preflight` chromium + dist + loopback durumunu tek JSON cikti ile net gostermeli
- `telemetry:validation-ready` guard + validation snapshot + preflight'i tek JSON cikti ile net gostermeli
- `telemetry:validation-snapshot` deterministic export satirini ve parse edilen ozeti temiz uretmeli
- `telemetry:browser-preflight` ve `telemetry:validation-ready` blocker'lari host geneli gibi degil mevcut runtime bazli raporlamali
- tarayici varsa `R` sonrasi session telemetry ozetinde en az 5 run gorulmeli
- sample sonunda `validation_sample` satiri dokumana veya handoff notuna aynen tasinmali
- `Last export` ozeti HUD veya game over overlay'de `not saved yet` yerine dolu bir sample gostermeli

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
- bu sandbox `127.0.0.1` loopback socket bind denemesini `EPERM` ile reddediyor; browser smoke ve CDP tabanli browser otomasyonu burada bloklu
- manual validation artik daha okunabilir ama yine de tarayici / insan input gerektiriyor
- validation export iyilesti ama hala insanin oyunu acip run bitirmesi gerekiyor
- manual validation export kontrati artik guard altinda, fakat insan sample'in kendisi hala yok
- formal test suite yok; mevcut regression guvencesi deterministic `telemetry:check` ile sinirli
- browser smoke harness yeni eklendi ama sadece socket izinli ortamlarda calisabilir
- yeni preflight komutu blokaji hizli tespit ediyor ama blokaji kendi basina kaldirmiyor
- yeni readiness komutu blokaji ve guard durumunu tek yerde gosteriyor ama blokaji kendi basina kaldirmiyor; Run #20 sonrasi once host shell probe'u ile blocker scope'u dogrulanmali
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry uzerinde first_death_time > 10s
- avg retry gap < 3s
- average_survival_time manual veya scripted sample'da 14.3s eski baseline'in altina dusmuyor
- early death rate browserless survival snapshot'taki 8% ve scripted sample'daki 20% referanslarini asiri asmiyor
- `npm run telemetry:check` deterministic baseline sapmalarinda fail veriyor
- `npm run telemetry:browser-preflight` socket izinli ortamda `status: ok`, bu sandbox'ta ise `status: blocked` vermeli
- `npm run telemetry:validation-ready` guard temizken socket izinli ortamda `status: ready`, bu sandbox'ta ise `status: blocked` vermeli
- `telemetry:browser-preflight` ve `telemetry:validation-ready` `socketProbeHost`/`socketProbeCommand` vererek blocker'i runtime-scoped aciklamali
- deterministic snapshot'ta 10s/30s pacing beklenen 10 / 32 spawn seviyesinde kaliyor
- survival snapshot'ta first death 5.0s baseline'i korunuyor veya iyilesiyor, early death 8% referansi bozulmuyor
- unfair death gozlemleri ve yakin spawn kurtarmalari daha anlamli hale geliyor
