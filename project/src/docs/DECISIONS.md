# DECISIONS.md

Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

### [Run #33]

Decision:
Olum ekranina yeni bir sistem eklemeden, fatal lane'in ters yonunu soyleyen dar bir escape prompt eklendi.

Reason:
Audit sonraki turun yalnizca gameplay readability / player feedback olmasini ve validation churn'den uzak durulmasini istedi. Oyuncunun neden oldugunu gormesi yetmiyor; bir sonraki denemede ne yapacagini da ilk bakista anlamasi gerekiyor.

Impact:
Death overlay artik survival + cause + action hiyerarsisi ile okunuyor; deterministic baseline korunurken retry odagi daha eylem odakli hale geldi.

Rollback Condition:
Host browser sample'i prompt'un dikkat dagittigini veya replay hissini bozdugunu gosterirse prompt copy/yerlesim/agirlik seviyesi geri alinabilir.

---

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

---

### [Run #25]

Decision:
Olum anini daha okunur kilmak icin tek bir dar gameplay UX paketi secildi: ekran flash, hafif kamera shake ve player impact pulse; balance/validation katmanina dokunulmadi.

Reason:
Audit governance note bir sonraki anlamli adimin hit feedback oldugunu, validation/readiness alaninin ise freeze'de kaldigini acik belirtti. Replay istegini bozmayacak en kucuk urun adimi bu visual feedback paketiydi.

Impact:
Oyuncuya "neden oldum" sinyali daha net veriliyor. `npm run telemetry:check` ve `npm run build` basarili kalarak deterministic pacing ve survival baseline'inin korunmasi dogrulandi.

Rollback Condition:
Manual sample veya cihaz performansi bu efektlerin okunurlugu bozdugunu, fazla dikkat dagittigini ya da replay friction yarattigini gosterirse shake siddeti ve flash suresi azaltilir veya paket sadeleştirilir.

---

### [Run #26]

Decision:
Audit freeze'e uyarak kapsam yalnizca gameplay UX ile sinirlandi ve mevcut visual hit feedback'i tamamlamak icin asset'siz, kullanici etkilesimi sonrasi acilan procedural death blip secildi.

Reason:
Bir sonraki anlamli urun adimi olum nedenini daha okunur kilan dar audio feedback'ti. Yeni sound sistemi veya tooling katmani kurmak hem audit yonlendirmesine hem de tek hedef ilkesine aykiri olurdu.

Impact:
Olum ani artik kisa bir ses sinyali de veriyor. `npm run telemetry:check` ve `npm run build` yine yesil kalarak pacing, survival ve validation guard'larinda drift olmadigini gosterdi.

Rollback Condition:
Host browser manuel sample'i sesin dikkat dagittigini, autoplay/policy yuzunden duzensiz calistigini veya retry ritmini bozdugunu gosterirse tone envelope'u kisaltilir/azaltilir ya da audio cue tamamen kaldirilir.

---

### [Run #27]

Decision:
`NEXT_AGENT.md` icindeki public gorunurluk gereksinimini minimum kapsamda karsilamak icin Phaser canvas'inin yanina statik bir "AI latest update" paneli eklendi; yeni telemetry veya orchestration katmani kurulmedi.

Reason:
Bu turda tek hedef kullaniciya gorunen urun ilerlemesi uretmekti. Audit freeze validation/tooling genislemesini yasaklarken, insan mudahalesi notu da AI'in yaptigi son anlamli degisimin oyun icinden gorunur olmasini zorunlu kiliyordu. En dar cozum, mevcut oyun akisini bozmadan public panel eklemekti.

Impact:
Oyuncu artik urunde AI'in son anlamli degisimini 2-4 maddeyle gorebiliyor. `npm run build` ve `npm run telemetry:check` yesil kalarak bu UI eklemesinin build veya deterministic baseline uzerinde drift yaratmadigini gosterdi.

Rollback Condition:
Host browser manuel sample'i panelin fazla dikkat dagittigini, mobil yerlesimi bozdugunu veya replay odagini zayiflattigini gosterirse sadece panel copy/yerlesimi dar kapsamda sadeleştirilir; yeni data pipeline acilmaz.

---

### [Run #28]

Decision:
Olum nedenini daha okunur kilmak icin tek hedef olarak fatal obstacle yonunu gosteren directional hit callout eklendi; balance ve validation katmanina dokunulmadi.

Reason:
Audit governance notu gameplay readability/UX disinda yeni is acmayi yasakliyor. Manual browser sample bu runtime'ta alinamadigi icin en dar urun ilerlemesi, mevcut flash + blip paketini "hangi taraftan oldum" sinyaliyle guclendirmekti.

Impact:
Game over aninda overlay title, body ve sahnedeki impact marker oyuncuya hit'in geldigi yonu gostermeye basladi. `npm run telemetry:check` ve `npm run build` yesil kalarak pacing, survival ve validation guard'larinda drift olmadigini gosterdi.

Rollback Condition:
Host browser manuel sample'i yon cagrisi copy'sinin kafa karistirdigini, marker'in fazla dikkat dagittigini veya replay ritmini bozdugunu gosterirse yalnizca marker konumu/copy'si dar kapsamda sadeleştirilir; yeni UI sistemi kurulmaz.

---

### [Run #29]

Decision:
Olum anindaki hit feedback paketi, tek hedef olarak oyuncudan fatal lane'e uzanan kisa bir impact ray ve daha kisa overlay copy'si ile guclendirildi; balance ve validation katmanina yine dokunulmadi.

Reason:
Audit governance note validation freeze altinda gameplay readability disinda yeni is acmayi yasakliyor. Run #28'de yon bilgisi vardi, ancak overlay copy'si uzun oldugu icin "hangi lane'de oldum" sinyalini daha hizli okumak icin sahne ici bir ray ve daha sade copy en dar urun ilerlemesiydi.

Impact:
Olum aninda flash + blip + directional label'a ek olarak fatal lane'i gosteren kisa bir ray gorunuyor. `npm run telemetry:check` ve `npm run build` yesil kalarak pacing, survival ve validation guard'larinda drift olmadigini gosterdi.

Rollback Condition:
Host browser manuel sample'i ray'in fazla dikkat dagittigini, yanlis lane algisi verdigini veya replay ritmini bozdugunu gosterirse yalnizca ray uzunlugu/alpha'si ya da overlay copy'si dar kapsamda sadeleştirilir; yeni UI veya telemetry sistemi kurulmaz.

---

### [Run #30]

Decision:
Game-over sonrasi replay icin `scene.restart()` akisi kaldirildi; ayni scene icinde obstacle, overlay, hit marker/ray, player tint/scale ve spawn timer temizlenip yeni run tek aksiyonla baslatilir hale getirildi.

Reason:
Public-facing restart bug'i cekirdek gameplay seviyesindeydi. Mevcut akista retry girdisi scene'i sadece `waiting` fazina donduruyor, ayni aksiyonda yeni kosu baslamiyordu; bu da instant replay ilkesini kiriyordu.

Impact:
Replay artik tek Space/Enter/tap ile dogrudan yeni run'a geciyor. Fatal lane readability paketi korunurken `npm run telemetry:check` ve `npm run build` yesil kaldi; pacing ve deterministic survival baseline'i drift etmedi.

Rollback Condition:
Host browser sample'i ayni-scene reset'in gizli state biraktigini, obstacle temizligini bozdugunu veya touch/keyboard retry hissini kotulestirdigini gosterirse replay reset helper'i dar kapsamda yeniden ayarlanir; yeni orchestration/tooling acilmaz.

---

### [Run #31]

Decision:
Olum nedenini daha hizli okutmak icin mevcut hit feedback paketine ayri bir fatal-lane callout eklendi; overlay body ve impact marker etiketi daha kisa okunacak sekilde sadeleştirildi.

Reason:
Audit governance note validation freeze altinda tek anlamli UX hedefinin olum nedenini netlestirmek oldugunu acik belirtiyor. Manual browser sample bu runtime'ta alinamadigi icin en dar urun ilerlemesi, mevcut ray + directional + flash + blip paketinin ilk bakis okunurlugunu artirmakti.

Impact:
Game-over aninda lane bilgisi artik overlay'den once ayri bir callout olarak gorunuyor; detay metni ikinci bakisa tasindi. `npm run telemetry:check` ve `npm run build` yesil kalarak pacing, survival ve validation guard'larinda drift olmadigini gosterdi.

Rollback Condition:
Host browser manuel sample'i yeni fatal-lane callout'un overlay ve panel ile birlikte fazla dikkat dagittigini, mobilde tasma yaptigini veya replay ritmini bozdugunu gosterirse yalnizca copy/konum/padding/alpha seviyesinde dar ayar yapilir; yeni UI sistemi kurulmaz.

---

### [Run #32]

Decision:
Game-over ozeti iki katmanli bilgi hiyerarsisine ayrildi; ana blok survival + cause + instant retry'ye indirgenirken session/validation sayilari ayri ve daha dusuk agirlikli stats bloguna tasindi.

Reason:
Audit governance note gameplay readability disinda yeni is acilmasini yasakliyor. Mevcut olum ekraninda birincil death sinyali ile telemetry satirlari ayni blokta yarisiyor ve ilk bakis okunurlugunu dusuruyordu. En dar urun adimi, mevcut feedback paketini buyutmeden bilgi yogunlugunu ayirmakti.

Impact:
Olum nedenini ve retry aksiyonunu ilk bakista okumak daha kolay hale geldi. `npm run telemetry:check` ve `npm run build` yesil kalarak pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%` ve bucket `2 / 7 / 6 / 9` baseline'larinin korundugunu gosterdi.

Rollback Condition:
Host browser manuel sample'i stats blogunun hala dikkat dagittigini veya ana bloktan yeterince ayrismadigini gosterirse yalnizca copy, font boyutu veya yerlesim dar kapsamda ayarlanir; yeni telemetry/UI sistemi kurulmaz.
