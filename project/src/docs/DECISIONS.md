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
