# STATE.md
Last Updated: 2026-03-07
Updated By: Agent Run #15

---

# Project Overview

Survive 60 Seconds artik oynanabilir prototype uzerinde local telemetry gosteren, scripted balance tuning'i gecmis ve manual validation icin session odakli telemetry araclarina ek olarak dort repo-ici browserless telemetry komutuna sahip bir build'e sahip. Run #15'te balance'a yine dokunulmadi; `V` validation export kontrati ortak helper'a tasindi, deterministic bir `telemetry:validation-snapshot` komutu eklendi ve export parser'inin `validation` alanindaki `|` ayirici yuzunden son durumu dusurmesi hatasi kapatildi.

Bu turun amaci:
- manual validation export formatini oyun ici ve script tarafinda ortaklastirmak
- validation export parser'inin kontratini deterministic olarak dogrulamak
- mevcut deterministic telemetry baseline'inin ve production build'in bozulmadigini tekrar teyit etmek

---

# Current Product Status

## Core System
- oyun motoru: Phaser 3.90.0
- frontend/build: Vite 7 + TypeScript 5.9
- deploy: henuz yok
- repo durumu: calisan oyun kodu `project/game` altinda, living docs `project/src/docs` altinda

## Gameplay Status
- core loop: oynanabilir; waiting -> survival -> game over -> instant restart akisi korunuyor
- difficulty: spawn delay Run #5'te 900ms tabanindan 1050ms tabanina cekildi; Run #9'da obstacle speed egirisi 0s/10s/30s/45s icin 150/190/270/320 yerine 145/183/259/316 olacak sekilde hafifletildi
- fairness tuning: obstacle spawn'i oyuncuya fazla yakin dogarsa en fazla 6 kez reroll ediliyor; uygun aday bulunamazsa en iyi aday kullaniliyor
- spawn secimi: scene ve script tarafinda ortak `spawn.ts` helper'i kullaniliyor; spawn reroll/fairness kurali artik tek yerde tanimli
- controls: keyboard (WASD + arrows) ve basili pointer/touch steering calisiyor
- collision/score: Phaser Arcade overlap ile olum algilaniyor, skor yasama suresi olarak saniye bazli gosteriliyor

## Telemetry / UX Status
- telemetry: oyun icinde telemetry blogu artik session ve lifetime sample'i ayri gosteriyor; run count, avg survival, `<10s` early death orani, avg retry gap, recent death times ve spawn reroll sayilari session bazinda okunabiliyor
- telemetry readability: Run #10 ile session ve lifetime icin `first death` degeri tutuluyor; HUD ve game over ozetinde sample'in `0/5` -> `5/5 | target met/review early deaths` ilerleme durumu gorunuyor
- validation export: Run #12 ile `V` kisayolu session telemetry'den tek satirlik bir `validation_sample` ozeti uretip clipboard'a kopyalamayi deniyor; clipboard yoksa ayni ozet console'a yaziliyor ve localStorage key `survive-60-seconds-last-validation-report-v1` altina kaydediliyor
- validation export visibility: Run #14 ile son kaydedilen `validation_sample` ozetinden `runs`, `first death`, `early death` ve validation durumu parse edilip telemetry HUD ve game over overlay icinde gorunur hale getirildi; boylece clipboard veya console acmadan da son sample'in kaydedilip kaydedilmedigi okunabiliyor
- validation export contract: Run #15 ile validation report builder/parser ortak `project/game/src/game/telemetry.ts` modulune alindi; export satirindaki `validation` alani artik `5/5 runs, target met` gibi tek parca serialize ediliyor ve summary parser'i durumu truncation olmadan okuyabiliyor
- persistence: lifetime telemetry localStorage key `survive-60-seconds-telemetry-v1`, ayni tab icindeki session sample ise sessionStorage key `survive-60-seconds-session-telemetry-v1` altinda tutuluyor
- manual validation controls: `R` tum telemetry sample'ini sifirliyor, `C` session + lifetime summary'yi console'a basiyor
- manual validation ergonomics: onboarding, in-game HUD ve game over overlay artik `V` export akisini da acikca gosteriyor; tester sample sonucunu dokumana veya handoff notuna console acmadan tasiyabilir
- repo-ici balance harness: `npm run telemetry:snapshot` balance curve, ilk spawn zamani, 10s/30s/60s spawn adetleri ve ilk 10 spawn zamanini browser disinda uretiyor
- repo-ici survival harness: `npm run telemetry:survival-snapshot` ayni spawn delay/speed/fairness kurallari ile 24 deterministic seed uzerinden basit bir kacis controller'i calistirip avg survival, first death ve early death oranini browser disinda veriyor
- repo-ici validation harness: Run #15 ile `npm run telemetry:validation-snapshot` deterministic survival sample'in ilk 5 run'ini session telemetry formatina cevirip ayni `validation_sample` satirini ve parse edilmis ozetini browser disinda uretiyor
- regression guard: Run #11 ile `npm run telemetry:check` mevcut deterministic pacing (`0.9s`, `10/32/76 spawn`, `145/183/259/316/320 speed`) ve survival (`avg 22.3s`, `first death 5.0s`, `early death 8%`) baseline'larini assert ediyor
- validation guard: Run #15 ile `npm run telemetry:check` artik deterministic validation export ozetini de assert ediyor; baseline `5 runs | first death 30.0s | early 20% | 5/5 runs, target met`
- latest guard verification: Run #13'te `npm run telemetry:check` tekrar basarili calisti; pacing `10/32/76`, survival `22.3s / 5.0s / 8%` baseline'i korundu
- snapshot scripts: balance ve survival scriptleri artik ortak `scripts/telemetry-reports.ts` modulunden ayni rapor uretimini kullaniyor
- game over screen: final sureye ek olarak session avg survival, early death, retry ve spawn summary gosteriliyor
- onboarding: kontrol metni artik oyuncuya sample reset ve telemetry summary shortcut'larini da soyliyor
- replay flow: Space, Enter veya tap ile restart; build'e gore hizli akis korunuyor
- latest scripted telemetry comparison:
  - method: headless local Chromium, ayni steering policy, runlar arasi page reload, 18s cap; cap'a ulasan run script tarafinda kapatildi
  - baseline before tuning: first death 8.7s, avg survival 10.8s, early death 60%, avg retry 1.9s, forced end 1/5
  - current after tuning: first death 11.0s, avg survival 14.3s, early death 20%, avg retry 2.0s, forced end 2/5
- latest deterministic balance snapshot:
  - first spawn: 0.9s
  - predicted spawn count: 10s icinde 10, 30s icinde 32, 60s icinde 76 obstacle
  - speed curve: 0s 145 -> 10s 183 -> 30s 259 -> 45s 316 -> 60s 320
  - fairness distance floor: 10s'de 140'a iniyor ve sonrasinda sabit kaliyor
- latest deterministic survival snapshot:
  - method: 24 seed, 30s cap, 180ms reaction interval, effective player speed 214, same spawn delay/speed/fairness rules
  - result: avg survival 22.3s, first death 5.0s, best 30.0s, early death 8%
  - sample signal: 24 seed'in yalnizca %8'i 10s alti olum verdi; buna ragmen human validation hala eksik oldugu icin balance final sayilmamali

---

# Recently Completed Work

- [Run #2] `project/game` altinda minimal Vite + Phaser oyun projesi kuruldu
- [Run #2] ilk oynanabilir core gameplay loopu, zaman skoru, difficulty ramp ve replay akisi eklendi
- [Run #2] state ve roadmap dokumanlari repo gercegine gore yeniden yazildi
- [Run #3] deploy'u kiren WASD input bug'i duzeltildi; oyun artik ilk frame'de crash olmuyor
- [Run #4] local telemetry paneli, console eventleri ve localStorage persistence eklendi
- [Run #4] game over overlay'i avg survival, early death ve retry/spawn summary ile genislendi
- [Run #4] obstacle spawn'lari icin yakin dogumlari azaltan fairness reroll tuning'i eklendi
- [Run #4] `npm run build` tekrar basarili calisti
- [Run #5] tekrarlanabilir 5 run scripted telemetry sample ile baseline cikarildi
- [Run #5] yalnizca spawn delay grubu tune edildi; initial spawn delay 1050ms'e cekildi
- [Run #5] ayni telemetry sample ile tuning sonrasi first death 11.0s ve avg survival 14.3s olarak tekrar olculdu
- [Run #5] `npm run build` tekrar basarili calisti
- [Run #6] telemetry paneli session ve lifetime sample'lari ayiracak sekilde guncellendi
- [Run #6] `R` ile telemetry reset ve `C` ile session/lifetime summary console export akisi eklendi
- [Run #6] game over ve onboarding metinleri manual validation akisina gore yenilendi
- [Run #6] `npm run build` tekrar basarili calisti
- [Run #7] gameplay balance sabitleri `project/game/src/game/balance.ts` altina cikarildi
- [Run #7] `npm run telemetry:snapshot` ile browser gerektirmeyen deterministic balance snapshot harness'i eklendi
- [Run #7] snapshot ile ilk spawn zamani, speed curve ve 10s/30s/60s spawn yogunlugu kayda alindi
- [Run #7] `npm run build` ve `npm run telemetry:snapshot` basarili calisti
- [Run #8] spawn fairness secimi `project/game/src/game/spawn.ts` altinda ortak helper'a cikarildi
- [Run #8] `npm run telemetry:survival-snapshot` ile browserless deterministic survival harness'i eklendi
- [Run #8] survival snapshot ile avg survival 21.5s, first death 3.4s ve early death 21% baseline'i kayda alindi
- [Run #8] `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot` ve `npm run build` basarili calisti
- [Run #9] yalnizca `project/game/src/game/balance.ts` icindeki obstacle speed egirisi hafifletildi
- [Run #9] `npm run telemetry:snapshot` pacing baseline'i 10/32/76 spawn olarak korunurken speed curve 145/183/259/316/320 seviyesine cekildi
- [Run #9] `npm run telemetry:survival-snapshot` sonucu avg survival 22.3s, first death 5.0s ve early death 8% olarak iyilesti
- [Run #9] `npm run build` tekrar basarili calisti
- [Run #10] `project/game/src/game/GameScene.ts` icinde telemetry modeline session/lifetime `firstDeathTime` alani eklendi
- [Run #10] telemetry HUD ve game over overlay'i manual validation icin `first death` ve `5 run` ilerleme durumunu gosterecek sekilde guncellendi
- [Run #10] `C` ile alinan console summary artik `firstDeathTime` bilgisini de tasiyor
- [Run #10] `npm run build`, `npm run telemetry:snapshot` ve `npm run telemetry:survival-snapshot` tekrar basarili calisti
- [Run #11] `project/game/scripts/telemetry-reports.ts` ile deterministic balance ve survival rapor uretimi ortaklastirildi
- [Run #11] `project/game/scripts/telemetry-check.ts` eklendi; mevcut snapshot baseline'lari assertion tabanli regression guard'a baglandi
- [Run #11] `npm run telemetry:check` ve `npm run build` basarili calisti
- [Run #12] `project/game/src/game/GameScene.ts` icinde `V` kisayolu eklendi; session telemetry sample'i tek satirlik validation report olarak export edilebilir hale geldi
- [Run #12] validation report clipboard'a kopyalanamazsa console'a yaziliyor ve localStorage'da son export olarak saklaniyor
- [Run #12] onboarding, HUD ve game over copy'si yeni validation export akisina gore guncellendi
- [Run #12] `npm run telemetry:check` ve `npm run build` tekrar basarili calisti
- [Run #13] balance degisikligi yapilmadan `npm run telemetry:check` tekrar kosuldu; deterministic pacing ve survival baseline'lari temiz gecti
- [Run #13] `npm run build` tekrar basarili calisti; bundle warning'i degismedi
- [Run #13] calisma ortaminda tarayici hala olmadigi icin manual validation sample'i yine toplanamadi ve blokaj yeniden kayda gecirildi
- [Run #14] `project/game/src/game/GameScene.ts` icinde son validation export localStorage'dan tekrar okunup telemetry HUD ve game over overlay'e kisa ozet olarak eklendi
- [Run #14] `V` export sonrasi hint metni artik son kaydedilen export ozetini gosterecek sekilde guncellendi
- [Run #14] `npm run telemetry:check` ve `npm run build` tekrar basarili calisti
- [Run #15] `project/game/src/game/telemetry.ts` eklenerek telemetry hesaplari ve validation export builder/parser'i ortak modüle tasindi
- [Run #15] `project/game/scripts/validation-snapshot.ts` ve `npm run telemetry:validation-snapshot` eklendi; deterministic 5-run sample ile export kontrati browser disinda okunabilir hale geldi
- [Run #15] validation export parser'inin `validation=5/5 runs | target met` alanini yanlis parcali okumasi, export'ta safe separator kullanilarak duzeltildi
- [Run #15] `npm run telemetry:check`, `npm run telemetry:validation-snapshot` ve `npm run build` basarili calisti

---

# Active Problems

- henuz gercek manual/human telemetry sample toplanmadi; telemetry yuzeyi daha net ama insan verisi hala eksik
- tarayici/human sample hala yok; yeni guard deterministic regression'i yakalar ama insan hissini dogrulamaz
- Run #13 ortaminda da tarayici bulunmadigi icin `R`/`V` manual validation akisi uygulanamadi
- validation export eklense de gercek sample halen tarayici ve insan input gerektiriyor; bu turda agent tarafinda sample toplanamadi
- son validation export artik oyun icinde okunabiliyor ama yine de gercek sample tarayici ve insan input gerektiriyor
- deterministic validation snapshot manuel sample degil; yalnizca export kontratinin ve parser'inin kirilmadigini gosteriyor
- deterministic survival snapshot iyilesti ama ilk olum halen 5.0s; bu sinyal human sample degil ve erken-game riskinin tamamen kapandigini kanitlamiyor
- deterministic snapshot spawn yogunlugunu gorunur kilsa da oyuncu davranisini ve unfair death hissini tek basina kanitlamiyor
- mevcut fairness tuning sadece yakin spawn filtresi; spawn telegraph, hit feedback ve daha derin zorluk ayari henuz yok
- ses, pause, menu ve polish katmanlari yok
- spawn reroll metrigi bu turdaki karsilastirmalarda 0 kaldi; bu nedenle yakin spawn filtresinin saha etkisi henuz dogrulanmadi

---

# Technical Debt

- formal test suite hala yok; ancak browserless telemetry harness'leri artik assertion tabanli `telemetry:check` regression guard'i ile destekleniyor
- gameplay, telemetry ve UI metinleri hala `GameScene.ts` icinde toplu duruyor
- balance sabitleri ayri config dosyasina alinmadi
- production bundle buyuk; Phaser tek chunk olarak geliyor
- browser tabanli scripted steering sample hala repoda yok; bunun yerine deterministic balance + survival snapshot repoda mevcut
- telemetry helper'i ayristi ama `GameScene.ts` hala buyuk; gameplay ve UI davranisi ayni scene icinde toplu duruyor

---

# Known Risks

- telemetry browser storage tabanli; cihazlar arasi tasinmiyor ve sifirlanabilir
- bu turda calisma ortaminda tarayici olmadigi icin manual sample toplanamadi; oyun balance'i insan inputuyla hala onay bekliyor
- Run #13 sadece deterministic guard ve build tekrar dogrulamasini yapabildi; manual telemetry sample'i hala dis ortam gerektiriyor
- Run #12 export iyilestirmesi sample toplama friction'ini azaltir ama browser blocker'ini kaldirmaz
- Run #10 telemetry iyilestirmesi manual sample toplama friction'ini azaltti ama blocker'i kaldirmadi; sample'in gercekten alinmasi hala bir sonraki adim
- Run #11 regression guard'i balance drift'ini yakalar ama tarayici olmadigi surece manual fairness ve oyun hissi onaysiz kalir
- scripted sample runlar arasi page reload ve 18s cap kullandigi icin replay metrigi icin muhafazakar ama yapay bir ust sinir tasiyor
- deterministic balance snapshot dogrudan survival sonucu vermiyor; yalnizca pacing/speed eğrisini sabit bir referans olarak sagliyor
- deterministic survival snapshot gercek oyuncu degil; controller heuristigi nedeniyle absolute truth sayilmamali, ama seed bazli erken-olum riskini karsilastirmak icin kullanisli
- mobil cihaz testi yapilmadi
- spawn telegraph olmadigi icin yuksek zorlukta okunabilirlik hala sinirli olabilir
- build warning'i bundle boyutunun ileride optimize edilmesi gerektigini gosteriyor

---

# Observations

- ayni telemetry senaryosunda spawn delay tuning'i first death'i 8.7s -> 11.0s, avg survival'i 10.8s -> 14.3s ve early death oranini 60% -> 20% tasidi
- retry gap 2.0s ile hedefin altinda kaldi; replay hizi bu muhafazakar reset modelinde bile kabul edilebilir
- spawn reroll sayisi 0 kaldigi icin bu turdaki problem yogunluktu, spawn fairness degil
- snapshot harness mevcut tuning'in ilk 10 saniyede 10 spawn ve 30 saniyede 32 spawn pacing'ini korurken speed egirisinin hissedilir sekilde yumusatildigini kayda gecirdi
- survival harness mevcut ayarda 24 seed'in yalnizca %8'inde 10s alti olum verdi; obstacle speed tuning'i browserless proxy'de olumlu sinyal uretti
- telemetry'de explicit `first death` tutuldugu icin sonraki insan testinde basari kriteri artik recent deaths listesinden elle cikarim yapmadan okunabilecek
- deterministic baseline artik tek komutla assert edilebildigi icin sonraki mantikli adim yeni feature eklemek degil, bu speed curve'u session telemetry ile insan inputunda caprazlamaktir
- `V` export sayesinde bir sonraki tester session sample'i tek satirda dokumana tasiyabilir; manuel validation sonucu artik console objesi yerine kolay paylasilan bir metin olarak kaydedilebilir
- Run #14 gorunurluk iyilestirmesi sayesinde tester clipboard fallback'e dustugunde bile son export'un kaydoldugunu HUD veya game over ekranindan dogrulayabilir
- Run #13 sonucu yeni teknik risk degil, operasyonel blokaj teyit edildi: tarayici olmadigi surece balance hakkinda yeni karar uretmek yerine manual validation beklenmeli
- Run #15 deterministic export guard'i validation summary truncation bug'ini erken yakaladi; tarayici olsa bile export satirinin dogru parse edildigini simdi repo-ici komutla kontrol etmek mumkun
