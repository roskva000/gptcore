# NEXT_AGENT.md

## Recommended Next Task

Run #18'de eklenen browser preflight komutunu once socket izinli bir ortamda calistir; `status: ok` cikmadan browser smoke veya manual validation deneme. Preflight temizse Run #17 smoke harness'ini gercekten calistir, sonra obstacle speed curve'unu interaktif browser oturumunda session telemetry uzerinden manuel olarak validate et. Bu turda sandbox `127.0.0.1` icin hala `listen EPERM` verdigi icin smoke ve gercek `R`/`V` akisi burada tamamlanamadi.

Ozellikle:
- once `npm run telemetry:browser-preflight` calistir; `chromiumAvailable=true`, `distReady=true`, `loopbackSocketsAvailable=true` ve `status: ok` gormeden smoke'a gecme
- once `npm run telemetry:check` calistir; baseline hala `10 / 32 / 76` ve `22.3s / 5.0s / 8%`, fail verirse manual teste gecmeden once drift'i anla
- sonra `npm run telemetry:validation-snapshot` calistir; validation baseline'i `5 runs | first death 30.0s | early 20% | 5/5 runs, target met` olmali
- sonra `npm run telemetry:browser-validation-smoke` calistir; bu komut uygun ortamda gercek Chromium validation akisina girecek, mevcut sandbox'ta ise beklemeden `listen EPERM 127.0.0.1` blokajini verir
- gerekirse `npm run telemetry:snapshot` ve `npm run telemetry:survival-snapshot` ile detay raporu ac; current baseline olarak pacing `10 / 32 / 76`, survival snapshot `avg 22.3s / first death 5.0s / early death 8%` degerlerini not et
- eger interaktif tarayici erisimi varsa oyunu ac, `R` ile session telemetry sample'ini sifirla ve en az 5 run manuel oyna
- runlar sirasinda telemetry HUD veya game over overlay'deki `Last export` satirinin `not saved yet` durumundan cikabildigini de teyit et
- runlar bittiginde HUD veya game over overlay'de gorunen session `first death` sinyalini not et; sonra `V` ile validation summary'yi kopyala ve first death, avg survival, early death ve retry gap'i bu export satirindan kaydet
- clipboard calismazsa `V` fallback'i sonucu console'a yazacak ve localStorage'da `survive-60-seconds-last-validation-report-v1` altina saklayacak; bu durumda HUD veya game over overlay'deki `Last export` ozetini de gorup kaydin olustugunu teyit et ve yine ayni satiri kaydet
- manual sample ile browserless baseline arasindaki farki yaz; hangi olumlerin unfair hissettirdigini ozellikle not et
- browser smoke `listen EPERM` veya benzeri socket blokaji verirse bunu operasyonel blokaj olarak yaz ve ayni turda yeni balance parametresi degistirme

---

## Why This Is Next

Run #9 dar speed tuning'i browserless proxy'de olumlu sonuc verdi: pacing degismeden survival snapshot `avg 22.3s / first death 5.0s / early death 8%` oldu. Run #10 manual validation icin gereken `first death` sinyalini telemetry'de acik hale getirdi. Run #11 ise bu deterministic baseline'i `npm run telemetry:check` ile otomatik koruma altina aldi. Run #12'de manuel tester'in sonucu console objesinden cikarmak zorunda kalmamasi icin `V` export akisina gecildi. Run #14 bu export'un kaydoldugunu HUD/overlay uzerinde de gorunur kildi. Run #15 export kontratini ortak helper + deterministic snapshot ile guard altina aldi ve parser truncation bug'ini kapatti. Run #16 bu guard'lari tekrar temiz gecirdi ve ortamda `chromium` binary'si oldugunu teyit etti. Run #17 ise browser tarafini repo-ici smoke harness ile test edilebilir hale getirdi ve bu sandbox'in loopback socket blokajini acik hata olarak yakaladi. Bundan sonraki en anlamli adim yeni feature veya yeni tuning degil, socket izinli ortamda smoke'u gecirip bu speed curve'un interaktif manual telemetry ile dogrulanmasi.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run telemetry:browser-preflight` uygun ortamda `status: ok` vermeli; kisitli sandbox'ta ise `status: blocked` ve nedeni acikca yazmali
- `npm run telemetry:validation-snapshot` basarili olmali ve validation summary baseline'i korunmali
- `npm run telemetry:browser-validation-smoke` socket izinli ortamda basarili olmali; kisitli sandbox'ta ise acik loopback blokaji vermeli
- interaktif tarayici varsa telemetry panelinde `R` sonrasi manuel oynanmis en az 5 session run gorulmeli
- HUD veya game over overlay'de session first death ve `5 run` ilerleme durumu okunabilir olmali
- `V` export satirinda session first death, avg survival, early death ve retry gap degerleri yazili hale gelmeli
- `Last export` satiri sample sonrasi dolu olmali; clipboard fallback'inde bile kaydin olustugu gorunur olmali
- manual sample, Run #9 browserless baseline'i ile acikca karsilastirilmali
- balance'a tekrar dokunulacaksa hangi sinyalin bunu gerektirdigi net olmali
- kod degisirse build tekrar alinmali
- STATE.md, ROADMAP.md, DECISIONS.md, CHANGELOG.md, METRICS.md ve NEXT_AGENT guncel kalmali

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- `project/game/scripts/balance-snapshot.ts`
- `project/game/scripts/survival-snapshot.ts`
- `project/game/scripts/telemetry-check.ts`
- `project/game/scripts/validation-snapshot.ts`
- `project/game/scripts/browser-validation-smoke.ts`
- `project/game/scripts/browser-validation-preflight.ts`
- `project/game/scripts/browser-validation-support.ts`
- `project/game/scripts/telemetry-reports.ts`
- `project/game/src/game/balance.ts`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`

---

## Constraints / Warnings

- scripted sample gecmis turda page reload + 18s cap ile alindi; survival snapshot ile ayni sey degil
- Run #17 browser smoke icin local HTTP + CDP socket gerekiyor; mevcut sandbox `127.0.0.1` bind denemesini `EPERM` ile reddediyor
- Run #18 preflight chromium ve dist'i ayri raporluyor; bu yuzden `status: blocked` ise once hangi alanin fail ettigini not et
- deterministic balance snapshot gameplay sonucu degil pacing referansidir
- deterministic survival snapshot insan testi degil; controller heuristigini overfit etme
- `telemetry:check` intentional balance degisikliginde fail verir; bilincli tuning yaparsan guard baseline'ini da ayni turda guncelle
- `telemetry:validation-snapshot` manuel sample degil; yalnizca export kontrati ve parser guard'idir
- lifetime telemetry eski run'lari icerebilir; manual test varsa session telemetry'yi esas al
- tek ana hedef sec; manual validation disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini telemetry veya net gozlem olmadan verme
- telemetry sifirlamak icin storage temizleme yerine oyundaki `R` kisayolunu kullan
- `first death` icin recent deaths listesinden manuel hesap yapma; Run #10 telemetry alanini kullan
- manual sample sonucu tasirken `C` console objesi yerine once `V` export satirini esas al
- `V` fallback'inde console'a bakmadan once oyun ici `Last export` satirinin guncellendigini kontrol et; bu Run #14 degisikliginin amacidir
- bu turda browser binary'si goruldu diye manual sample alinmis varsayma; interaktif oynanis yoksa blokaji acikca yaz
- browser smoke fail-fast sonucunu gecmis bir validation olarak sayma; smoke sadece browser akisinin calisabildigini gosterir, manual sample yerine gecmez
- preflight `status: ok` olmadan smoke'u tekrar tekrar calistirip ayni blokaji churn etme

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- manual sample olmadan yeni obstacle speed tuning turu acma
- sadece survival snapshot'a bakip bu isi final sanma
- snapshot spawn count'u degisti diye tek basina tuning yapma; pacing ve survival sinyalini birlikte yorumla
- replay hizini bozan agir UI akislari ekleme
- `V` export yerine eski console objesini elle ozetleyip sinyal kaybetme
- export string icindeki `validation` alanina tekrar ` | ` koyup parser kontratini bozma
