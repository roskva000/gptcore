# DECISIONS.md

Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

### [Run #1]

Decision:
Core gameplay once stabil hale getirilecek.

Reason:
Gameplay stabil olmadan feature eklemek dogru degildir.

Impact:
Kisa vadede feature gelisimi yavaslayabilir ama uzun vadede oyun kalitesi artar.

Rollback Condition:
Core gameplay yeterince stabil hale gelirse roadmap genisletilebilir.

---

### [Run #2]

Decision:
Ilk uygulama turunda feature genisletmek yerine oynanabilir minimum vertical slice kuruldu.

Reason:
Repo gercekte sadece dokumanlardan olusuyordu. Difficulty, replay friction veya fairness hakkinda anlamli karar verebilmek icin once referans alinacak calisan bir oyun loopu gerekiyordu.

Impact:
Artik proje uzerinde build alinabiliyor ve core gameplay tartismasi varsayim yerine gercek implementasyon uzerinden yapilabiliyor.

Rollback Condition:
Eger bu prototype mimariyi zorlarsa veya Phaser secimi terk edilirse bootstrap katmani yeniden kurulabilir.

---

### [Run #2]

Decision:
Ilk prototype tek scene icinde tutuldu; ayrik sistemlere simdilik bolunmedi.

Reason:
Kapsam dar tutulmak istendi. Erken asamada Player, Spawner, UI ve ScoreSystem icin ayri soyutlamalar kurmak overengineering olurdu.

Impact:
Hizli iterasyon kolaylasti, fakat sistemler buyurse ayrisma ihtiyaci dogacak.

Rollback Condition:
Scene icerisindeki logic yeni obstacle tipleri, telemetry veya UI state'i ile okunamaz hale gelirse modul ayrisma yapilacak.

---

### [Run #3]

Decision:
Keyboard input mapping'i string listesi yerine isimlendirilmis key map ile kuruldu.

Reason:
`addKeys('W,A,S,D')` donusunde `W/A/S/D` alanlari geliyor; kod ise `up/down/left/right` bekliyordu. Bu uyumsuzluk production'da ilk update frame'inde runtime crash uretti.

Impact:
Vercel deploy'unda gorulen bos ekran sorunu kapandi ve keyboard kontrolleri beklenen isimlerle guvenli hale geldi.

Rollback Condition:
Input sistemi daha soyut bir kontrol katmanina tasinirse bu map scene icinden alinabilir.

---

### [Run #4]

Decision:
Early gameplay telemetry oyun ici debug paneli ve localStorage uzerinden tutuldu.

Reason:
External analytics entegrasyonuna girmeden first death time, retry davranisi ve tekrar edilen run'lari hemen olcmek gerekiyordu.

Impact:
Balancing kararlari artik sadece sezgiye degil, oyun icinde gorulen lokal metriklere dayanabilir.

Rollback Condition:
Ileride harici analytics eklenirse bu telemetry dev-mode'a alinabilir veya daha hafif bir panele indirgenebilir.

---

### [Run #4]

Decision:
Spawn fairness icin oyuncuya fazla yakin obstacle dogumlari sinirli reroll ile filtrelendi.

Reason:
En dusuk riskli fairness iyilestirmesi, erken oyunda bedava olum hissi yaratan yakin edge spawn'lari azaltmaktir.

Impact:
Tum difficulty curve degismeden ilk saniyelerdeki unavoidable death riski dusuruldu ve kac spawn'in kurtarildigi telemetry'ye eklendi.

Rollback Condition:
Telemetry veya manuel oyun testi oyunu gereksiz kolaylastirdigini gosterirse gerekli minimum mesafe veya reroll sayisi azaltilabilir.

---

### [Run #5]

Decision:
Bu turda balance karsilastirmasi ayni steering policy ile alinan 5-run scripted local telemetry sample uzerinden yapildi.

Reason:
Calisma ortami manuel oyun testini guvenilir sekilde desteklemiyordu. Yine de tek parametre degisikliginin etkisini ayni kosullarda karsilastirmak gerekiyordu.

Impact:
Baseline ve post-tune sample ayni metodoloji ile alinabildi; karar sezgi yerine sayisal fark uzerinden verildi.

Rollback Condition:
Manual/human sample scripted sonuclardan anlamli sekilde saparsa bu metod yalnizca yardimci sinyal olarak tutulmali.

---

### [Run #5]

Decision:
Erken zorluk icin yalnizca spawn delay grubu tune edildi; initial spawn delay 900ms yerine 1050ms yapildi.

Reason:
5-run baseline sample first death'i 8.7s, avg survival'i 10.8s ve early death oranini 60% gosterdi. Ayni sample'da spawn reroll sayisi 0 oldugu icin asil problem yakin spawn degil, erken obstacle yogunluguydu.

Impact:
Ayni telemetry sample sonrasi first death 11.0s, avg survival 14.3s ve early death 20% oldu. Retry gap 2.0s ile hedefin altinda kaldi.

Rollback Condition:
Manual sample oyunun fazla bosladigini, tempo kaybettigini veya scripted sample kazancinin gercek oyunda tekrarlanmadigini gosterirse spawn delay tabani tekrar asagi cekilebilir.

---

### [Run #6]

Decision:
Bu turda balance'a tekrar dokunmak yerine telemetry yuzeyi session ve lifetime sample'i ayiracak sekilde guclendirildi.

Reason:
Calisma ortaminda tarayici bulunmadigi icin gercek manual input sample'i bu agent tarafinda dogrulanamadi. Buna ragmen bir sonraki insan/agent testinin tarihi localStorage verisinden etkilenmeden olculebilmesi gerekiyordu.

Impact:
Manual validation artik `R` ile sifirdan baslatilabiliyor, panelde session metrikleri lifetime veriden ayri okunuyor ve `C` ile console'a acik bir ozet cikarilabiliyor.

Rollback Condition:
Ileride harici analytics veya repo-ici telemetry harness bu akisi gereksiz kilarsa session/lifetime cift gosterim sadelestirilebilir.

---

### [Run #7]

Decision:
Balance formulleri Phaser scene icinden ayrilarak paylasilan saf helper modulu ve repo-ici deterministic snapshot scripti olarak disari alindi.

Reason:
Bu ortamda tarayici olmadigi icin manual validation veya headless browser sample'i agent tarafinda koşturulamiyor. Buna ragmen balance tuning'in pacing ve speed egirisini her tur ayni sekilde okuyabilmek gerekiyordu.

Impact:
`npm run telemetry:snapshot` ile ilk spawn zamani, spawn yogunlugu ve speed/fairness curve browser disinda alinabiliyor. Gelecek tuning kararlarinda ayni formuller scene ve script tarafinda ortak kullaniliyor.

Rollback Condition:
Repo icine gercek browser steering harness veya daha zengin test altyapisi gelirse bu snapshot scripti yalnizca hizli smoke-check olarak tutulabilir ya da kaldirilabilir.

---

### [Run #8]

Decision:
Manual validation bloklu kaldigi icin ikinci karar sinyali olarak repo-ici deterministic survival snapshot harness'i eklendi; spawn fairness secimi de scene ve script tarafinda ortak helper'da birlestirildi.

Reason:
Yalnizca pacing snapshot'i spawn yogunlugunu gosteriyordu ama erken olum riski hakkinda sinyal vermiyordu. Tarayici olmadigi icin human sample toplanamazken obstacle-speed tuning'i tamamen sezgiyle devam ettirmek riskliydi.

Impact:
`npm run telemetry:survival-snapshot` artik 24 deterministic seed uzerinde avg survival, first death ve early death oranini uretiyor. Bu, scripted telemetry ile manual sample arasindaki boslukta dar bir regression guard olarak kullanilabilir.

Rollback Condition:
Eger browser tabanli steering harness veya genis manual sample survival snapshot ile anlamli korelasyon gostermezse bu script yalnizca destekleyici sinyal olarak tutulmali; balance kararlarini tek basina yonetmemeli.

---

### [Run #9]

Decision:
Bu turda yalnizca obstacle speed egirisi hafifletildi; spawn delay ve spawn fairness aynen korundu.

Reason:
Run #8 sonunda pacing baseline'i kabul edilebilir durumdaydi ve survival snapshot erken olum riskinin hala speed tarafinda dar tuning gerektirdigini gosteriyordu. Ayni turda birden fazla parametreyi degistirmek sinyali bulandirirdi.

Impact:
`npm run telemetry:snapshot` pacing'i 10s/30s/60s icin 10/32/76 spawn olarak korurken `npm run telemetry:survival-snapshot` sonucu avg survival'i 21.5s -> 22.3s, first death'i 3.4s -> 5.0s ve early death oranini 21% -> 8% tasidi.

Rollback Condition:
Manual validation bu yeni speed curve'un oyunu gereksiz kolaylastirdigini veya human sample'da farkli bir erken-olum deseni oldugunu gosterirse obstacle speed egirisi yeniden ayarlanmalidir; ancak spawn delay ve fairness ile ayni anda degistirilmemelidir.

---

### [Run #10]

Decision:
Bu turda balance tuning acilmadi; bunun yerine manual validation icin telemetry'de explicit `first death` ve sample ilerleme durumu gorunur hale getirildi.

Reason:
Roadmap ve NEXT_AGENT balance degisikligi degil manual validation istiyordu. Ancak mevcut telemetry `first death` sinyalini basari kriteri olarak acik tasimiyordu; tester bunu recent deaths listesinden cikarimla okumak zorunda kalirdi.

Impact:
Session sample artik HUD, game over overlay ve `C` console summary uzerinden dogrudan `first death` ve `5 run` ilerlemesini gosteriyor. Bu, bir sonraki insan testini daha hizli ve daha az hataya acik hale getiriyor.

Rollback Condition:
Eger telemetry paneli fazla kalabaliklasir veya harici analytics/manual harness bunu gereksiz kilarsa validation progress satiri sadeleştirilebilir; fakat `first death` sinyali baska bir yuzeyde korunmalidir.

---

### [Run #11]

Decision:
Bu turda manual validation bloklu kalirken balance'a tekrar dokunmak yerine deterministic telemetry snapshot'lari assertion tabanli regression guard'a baglandi.

Reason:
Run #9 ve Run #10 ile olusan pacing/survival baseline'lari artik kritik referans haline geldi. Ancak bunlar sadece JSON rapor olarak uretiliyordu; istemsiz bir balance drift'i otomatik yakalanmiyordu.

Impact:
`npm run telemetry:check` tek komutta balance pacing ve survival baseline'larini assert ediyor. Snapshot scriptleri de ortak `telemetry-reports.ts` uzerinden ayni hesaplari kullandigi icin scriptler arasi drift riski azaldi.

Rollback Condition:
Intentional bir balance degisikligi yapilirsa bu guard'in beklenen degerleri bilincli sekilde guncellenmeli; eger daha zengin test altyapisi gelirse bu script smoke/regression check rolune indirgenebilir.

---

### [Run #12]

Decision:
Bu turda da balance tuning acilmadi; bunun yerine session telemetry sample'ini tek satirlik bir validation report olarak export eden `V` kisayolu eklendi.

Reason:
Tarayici bu ortamda hala yok, dolayisiyla agent manuel sample toplayamadi. Fakat onceki telemetry akisi console objesine dayaniyordu ve insan tester'in sonucu dokumana tasimasi gereksiz friction yaratiyordu.

Impact:
Manual validator artik `R` ile sample'i sifirlayip runlari oynadiktan sonra `V` ile avg survival, first death, early death, retry ve deterministic baseline referansini tek satirda kopyalayabiliyor. Clipboard yoksa ayni rapor console'a yaziliyor ve localStorage'a kaydediliyor.

Rollback Condition:
Eger validation export metni telemetry yuzeyini gereksiz kalabaliklastirir veya daha iyi bir browser tabanli raporlama araci gelirse `V` akisi sadeleştirilebilir; ancak session sample'i console inspection olmadan tasima ihtiyaci korunmalidir.

---

### [Run #13]

Decision:
Bu turda da gameplay balance'a veya telemetry yuzeyine dokunulmayip yalnizca deterministic regression guard ve production build tekrar dogrulandi; tarayici eksigi resmi blokaj olarak korundu.

Reason:
NEXT_AGENT'in ana hedefi manual validation'di, ancak mevcut ortamda tarayici yok. Bu kosulda yeni tuning yapmak veya telemetry akisina tekrar dokunmak sinyali bulandirirdi. En yuksek etkili dar adim, baseline'in drift etmedigini teyit edip insan testi ihtiyacini netlestirmekti.

Impact:
`npm run telemetry:check` tekrar pacing `10/32/76` ve survival `22.3s / 5.0s / 8%` baseline'ini korudugunu gosterdi. `npm run build` basarili kaldi. Sonraki agent icin tek mantikli ana hedef tarayicili ortamda manual sample toplamak olarak netlesmis oldu.

Rollback Condition:
Interaktif browser erisimi ve insan input'u saglandiginda bu blokaj kaydi daraltilip manual validation sonucuna geri donulmelidir.
Tarayicili ortam acilir ve manuel sample toplanirsa bu karar yerini insan verisine dayali bir sonraki dar iterasyona birakabilir.

---

### [Run #14]

Decision:
Bu turda da balance'a dokunulmayip son `V` validation export'unun oyun ici telemetry yuzeylerinde gorunurlugu artirildi.

Reason:
Tarayici blokaji devam ederken yeni tuning yapmak sinyali bulandirirdi. Buna karsin mevcut `V` export yalnizca clipboard, console veya localStorage uzerinden okunabiliyordu; bu da sonraki manuel validator icin fallback durumunda ek friction yaratiyordu.

Impact:
Son kaydedilen validation export artik oyun acildiginda localStorage'dan okunuyor ve telemetry HUD ile game over overlay'de `Last export` ozeti olarak gorunuyor. Boylece clipboard olmasa bile sample'in kaydedildigi oyun icinde dogrulanabiliyor.

Rollback Condition:
Eger bu ek satirlar telemetry yuzeyini fazla kalabaliklastirir veya daha iyi bir browser tabanli validation akisi gelirse `Last export` ozeti sadeleştirilebilir; ancak kaydin oyun icinde gorulebilir olmasi korunmalidir.
Tarayici erisimi saglandiginda bu blokaj kalkar; o noktada ayni guard korunarak manual validation sample'i toplanmali ve sadece bu veriye dayanarak yeni balance karari degerlendirilmelidir.

---

### [Run #15]

Decision:
Bu turda balance'a veya yeni bir gameplay feature'ina dokunmak yerine validation export builder/parser'i ortak helper'a tasindi ve deterministic export kontrati regression guard'a baglandi.

Reason:
Tarayici blokaji devam ederken en degerli dar ilerleme, bir sonraki insan testinin kullanacagi `V` export satirinin kirilmadigini repo icinde dogrulamakti. Yeni `telemetry:validation-snapshot` komutu bu kontrati browser olmadan test ederken parser'in `validation` alanindaki `|` ayirici yuzunden son durumu truncation ile kaybettigini ortaya cikardi.

Impact:
`validation_sample` satiri artik oyun ici ve script tarafinda ayni helper ile uretiliyor; `Last export` ozeti `5/5 runs, target met` gibi tam validation durumunu dogru okuyabiliyor. `npm run telemetry:check` bu kontrati da assert ettigi icin future telemetry/export degisiklikleri sessizce bozulamayacak.

Rollback Condition:
Ileride export formati bilincli olarak degisecekse ortak helper ve deterministic validation baseline'i ayni turda birlikte guncellenmeli; UI tarafinda farkli string birlestirme ile lokal patch yapilmamalidir.

---

### [Run #16]

Decision:
Bu turda da balance veya telemetry yuzeyine dokunulmayip yalnizca deterministic telemetry guard'lari ile production build tekrar dogrulandi; manual validation blokaji "browser yok" yerine "interaktif sample alinmadi" seklinde kayda gecirildi.

Reason:
Run #15 sonrasi en yuksek etkili dar adim, validation export kontratinin ve baseline'in drift etmedigini teyit etmekti. Ortamda `chromium` binary'si bulunsa da bu CLI turunda insan input'u veya oyun ici interaktif sample yoktu; bu kosulda yeni tuning sinyali uretmek hatali olurdu.

Impact:
`npm run telemetry:check`, `npm run telemetry:validation-snapshot` ve `npm run build` tekrar temiz gecti. Sonraki agent icin hedef, artik tarayici binary'si aramak degil, gercekten interaktif bir oturumda `R`/`V` manual sample toplamak olarak daha net tanimlandi.

Rollback Condition:
Eger sonraki turda interaktif manual sample alinabilirse bu operasyonel blokaj kaydi kaldirilip balance kararlarina insan telemetry'si uzerinden devam edilmelidir.
