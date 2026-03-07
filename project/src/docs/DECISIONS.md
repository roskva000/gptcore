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
Telemetry backend'e tasinmadan once localStorage tabanli lightweight run telemetry eklendi.

Reason:
Bu asamada en kritik ihtiyac first death time ve retry davranisini hizlica olcmekti; harici servis entegrasyonu kapsam buyuturdu.

Impact:
Run bazli olcumler artik koddan dogrudan gorulebilir hale geldi; balancing kararlarinin sezgisel olma riski azaldi.

Rollback Condition:
PostHog veya benzeri kalici analytics entegre edilirse local telemetry sadece debug amacli azaltilabilir.

---

### [Run #3]

Decision:
Spawn fairness icin "oyuncuya yakin kenar spawn" filtreleme kurali eklendi.

Reason:
Ozellikle ilk saniyelerde oyuncu kenarlara yakinken spawn okumasi zorlasabiliyordu; tek kural ile unfair death olasiligini azaltmak hedeflendi.

Impact:
Spawn secimi daha adil hale geldi; reject edilen yakin spawn sayisi telemetry ile izlenebiliyor.

Rollback Condition:
Eger telemetry ile survival time duserse veya oyun fazla kolaylasirsa mesafe esigi/asama sayisi geri cekilecek.
