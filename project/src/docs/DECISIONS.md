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
Ilk prototype tek scene icinde ve dar scope ile kuruldu.

Reason:
Calisan bir oyun loopu olmadan balancing veya UX karari vermek anlamsizdi.

Impact:
Projede artik build alinabiliyor ve gameplay gercek kod uzerinden iterate edilebiliyor.

Rollback Condition:
Scene okunamaz hale gelirse modul ayrisma yapilir.

---

### [Run #4]

Decision:
Early gameplay telemetry oyun ici panel ve local storage ile tutulacak.

Reason:
Harici analytics eklemeden first death, retry ve survival sinyallerini hemen olcmek gerekiyordu.

Impact:
Balancing kararlarinin sezgi yerine lokal metriklere dayanmasi saglandi.

Rollback Condition:
Harici analytics gelirse bu panel hafifletilebilir.

---

### [Run #5]

Decision:
Erken zorluk icin spawn delay tune edildi; ayni sample metodolojisi ile once/sonra karsilastirma yapildi.

Reason:
En net erken olum sinyali spawn yogunlugundaydi.

Impact:
Scripted sample first death `8.7s -> 11.0s`, avg survival `10.8s -> 14.3s`, early death `60% -> 20%` tasindi.

Rollback Condition:
Manual sample bu kazanci dogrulamazsa spawn delay tekrar ayarlanir.

---

### [Run #9]

Decision:
Yalnizca obstacle speed egirisi hafifletildi; pacing korunarak survival proxy iyilestirildi.

Reason:
Bir turda birden fazla balance eksenine dokunmak sinyali bulandirirdi.

Impact:
Deterministic survival snapshot `avg 22.3s / first death 5.0s / early death 8%` baseline'ina ulasti.

Rollback Condition:
Manual sample veya daha guclu telemetry bu curve'un yanlis oldugunu gosterirse yeniden ayarlanir.

---

### [Run #15]

Decision:
Validation export kontrati ortak helper ve deterministic snapshot ile guard altina alindi.

Reason:
Manual sample sonucu console inspection'a bagli kalmamaliydi.

Impact:
`V` export akisi ve parser kontrati artik regression guard altinda.

Rollback Condition:
Daha iyi raporlama yolu gelirse export formatina yeniden bakilabilir.

---

### [Run #21]

Decision:
Browser validation preflight/readiness ciktilari runtime-scoped blocker dili ve `nextSteps` ile zenginlestirildi.

Reason:
Mevcut runtime blokajini host geneli gibi gostermek operasyonel churn yaratiyordu.

Impact:
Loopback `EPERM` daha net raporlanir hale geldi.

Rollback Condition:
Browser validation operasyonu baska bir mekanizmaya tasinirse bu helper'lar sadeleştirilebilir.

---

### [Run #22]

Decision:
Bu turda gameplay balance baseline'i korunup deterministic survival snapshot'a bucket dagilimi eklendi; validation altyapisina yeni katman eklenmedi.

Reason:
Validation katmani yeterince genislemis durumda. Mevcut survival proxy sadece avg/first-death sinyali veriyor ve asil baski bandini gizliyordu.

Impact:
`npm run telemetry:survival-snapshot` artik olumleri `<10s`, `10-20s`, `20-30s` ve `30s cap` olarak ayiriyor. `npm run telemetry:check` bu dagilimi assert ediyor. Sonraki tuning turu artik `10-20s` bandina odaklanabilir.

Rollback Condition:
Manual browser sample deterministic bucket dagilimi ile korele olmazsa bu sinyal yardimci metrik olarak tutulur ve baska gameplay telemetry'leri eklenir.

---

### [Run #23]

Decision:
`10-20s` olum baskisini azaltmak icin yalnizca obstacle speed curve tuning'i yapildi; spawn pacing ve fairness formulu degistirilmedi.

Reason:
Deterministic bucket dagilimi baskinin orta bantta toplandigini gosteriyordu. Tek eksenli tuning, bucket hareketini okunur tutarken validation churn'u engelledi.

Impact:
Pacing `10 / 32 / 76` ve `<10s` guard `2` korunurken bucket dagilimi `2 / 8 / 4 / 10` -> `2 / 7 / 7 / 8` tasindi. Bunun karsiliginda deterministic average survival `22.3s`den `21.6s`ye geriledi; sonraki tuning turunun tradeoff'u toparlamasi gerekiyor.

Rollback Condition:
Sonraki tuning bucket kazancini koruyup average survival'i toparlayamazsa veya manual sample bu curve'u desteklemezse speed curve yeniden ele alinir.

---

### [Run #24]

Decision:
`10-20s` bandindaki yumusak speed curve korunurken `20s+` obstacle hiz rampasi lineer baseline'a yakinlastirildi; spawn pacing, fairness ve validation katmani degistirilmedi.

Reason:
Run #23 bucket kazanimi sagladi ama `30s cap` conversion'i ve deterministic average survival geriledi. En dar ve okunur duzeltme, yalnizca orta/ileri oyun hizini toparlamakti.

Impact:
Deterministic survival snapshot `avg 21.6s -> 21.8s`, bucket dagilimi `2 / 7 / 7 / 8` -> `2 / 7 / 6 / 9` oldu. Pacing `10 / 32 / 76`, first death `5.0s` ve early death `8%` korundu.

Rollback Condition:
Sonraki manual sample veya gameplay hissi bu rampanin oyunu fazla sertlestirdigini gosterirse `20s+` breakpoint'leri yeniden ayarlanir; ancak yeni tuning yine tek eksenli kalmalidir.
