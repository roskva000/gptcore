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
