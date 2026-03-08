# DECISIONS.md

Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

### [Run #48]

Decision:
Aktif run sirasinda browser focus'u kaybolursa oyun otomatik olarak `paused` fazina gececek; obstacle physics, spawn timer ve survival saati birlikte donacak, donus ise explicit resume aksiyonu gerektirecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine ve validation/readiness katmanina yeni alan acmak yasak. Web oyunda blur/hidden durumlari gercek bir fairness ve UX riski: oyuncu sekme/pencere focus'unu kaybettiginde gizli zamanda olum olabilir ya da serbest survival saniyesi yazilabilir. `PROJECT.md` ile `GAME_DESIGN.md` adil olum, kontrol hissi ve hizli replay ister. En dar urun ilerlemesi, yeni sistem acmadan aktif run'i focus-loss aninda guvenli sekilde dondurmekti.

Impact:
Aktif run artik focus kaybinda cheap death veya kirli telemetry uretmiyor. Resume aksiyonu explicit oldugu icin oyun geri donuste held input ile kendi kendine akmiyor. Deterministic pacing/survival baseline `22.3s / 5.0s / 8%` degismedi.

Rollback Condition:
Host browser manuel sample'i explicit resume'in fazla surtunme yarattigini, prompt'un belirsiz kaldigini veya touch/keyboard davranisinin zayif oldugunu gosterirse yalnizca pause copy'si, primary-action handling'i ya da focus guard seviyesi dar kapsamda ayarlanir; death-readability veya tooling alanina kayilmaz.

### [Run #47]

Decision:
Movement key'ler waiting fazinda oldugu gibi game-over fazinda da yalnizca fresh press ile yeni run baslatacak; held movement input replay'i otomatik tetiklemeyecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine veya validation/readiness katmanina yeni bir katman eklemek yasak. Run #46 non-playing fazlardaki fiziksel input bleed'ini kapatti ama keyboard oyuncusu icin start ve retry kontrol dili hala tutarsizdi: waiting herhangi bir movement key ile baslayabilirken game-over sadece Space/Enter/tap ile replay oluyordu. `PROJECT.md` ve `GAME_DESIGN.md` hizli replay ve kontrol hissini onceliyor. En dar urun ilerlemesi, readability veya tooling alanina girmeden keyboard replay friction'ini azaltmakti.

Impact:
Keyboard oyuncusu artik Space/Enter/tap'e ek olarak fresh movement-key press ile de replay baslatabiliyor. Edge-trigger guard'i olum aninda basili kalan yon tusunun istemsiz anlik restart uretmesini engelliyor. Deterministic pacing/survival baseline `22.3s / 5.0s / 8%` degismedi.

Rollback Condition:
Host browser manuel sample'i movement-key replay'in accidental restart, kontrol karmasasi veya istenmeyen friction urettigini gosterirse yalnizca non-playing input gating ya da retry trigger seviyesi dar kapsamda geri cekilir; death-readability veya tooling alanina kayilmaz.

### [Run #46]

Decision:
Oyuncu hareket hizlari yalnizca `playing` fazinda guncellenecek; waiting ve game-over fazlarinda movement input fiziksel hareket uretmeyecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine veya validation/readiness katmanina yeni katman eklemek yasak. Buna karsin mevcut `GameScene.ts` akisi her frame `updatePlayerVelocity()` cagirarak game-over sonrasinda ve pre-run bekleme halinde input kaynakli avatar kaymasina izin veriyordu. Bu, `PROJECT.md` ve `GAME_DESIGN.md` icindeki instant replay, ilk bakis netligi ve adil death feedback hedefleriyle celisiyordu. En dar urun ilerlemesi, yeni UI yuzeyi acmadan inactive-phase input bleed'i kapatmakti.

Impact:
Death overlay, fatal lane cues ve retry oncesi sahne artik fiziksel olarak sabit kaliyor. Start ve retry aksiyonlari aynen korunuyor; deterministic pacing/survival baseline `22.3s / 5.0s / 8%` degismedi.

Rollback Condition:
Host browser manuel sample'i start veya retry aninda beklenen keyboard/touch responsiveness'in kayboldugunu gosterirse yalnizca faz guard'i ya da primary-action/input handling seviyesinde dar ayar yapilir; yeni HUD/tooling/readability katmani acilmaz.

### [Run #45]

Decision:
Sag ust telemetry HUD'i aktif oynanista compact, waiting ve game-over fazlarinda ise detayli kalacak sekilde faza bagli hiyerarsiye alindi.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine veya validation/readiness katmanina yeni yuzey eklemek yasak. `PROJECT.md` ile `GAME_DESIGN.md` ise cluttered screen anti-pattern'inden kacinmayi ve oyuncunun ilk bakista oyuna odaklanmasini istiyor. Mevcut telemetry blogu tum fazlarda ayni genislikte kalarak live gameplay sirasinda canvas'la rekabet ediyordu; en dar urun ilerlemesi, tooling'i buyutmeden ayni bilgiyi faza gore farkli yogunlukta gostermekti.

Impact:
Aktif oynanista telemetry blogu artik sadece session run/avg, first death, early death ve validation ozeti gosteriyor. Waiting ve game-over fazlari validation/export detaylarini ve recent deaths satirlarini koruyor. Deterministic baseline `22.3s / 5.0s / 8%` ve replay akisi aynen korundu.

Rollback Condition:
Host browser manuel sample'i compact live telemetry'nin validation affordance'larini fazla sakladigini, hala dikkat dagittigini veya game-over/waiting detaylarinin yetersiz kaldigini gosterirse yalnizca satir secimi, alpha veya font-size seviyesinde dar ayar yapilir.

### [Run #44]

Decision:
Public AI update paneli narrow viewport'ta varsayilan olarak collapse olacak sekilde yeniden hiyerarsilestirildi.

Reason:
`AUDIT.md` verdict'i `drift-risk`; manual sample olmadan death-readability veya waiting/support-strip copy mikro-loop'una geri donmek yasak. `PROJECT.md` ve `GAME_DESIGN.md` ise mobil browser hedefiyle cluttered screen anti-pattern'inden kacilmasini istiyor. Mevcut public panel dar ekranlarda oyun canvas'i ile ayni anda tam yukseklikte kalip gameplay'i ikinci plana itiyordu; en dar urun ilerlemesi, paneli kaldirmadan summary-first bir responsive hiyerarsi vermekti.

Impact:
Desktop'ta public panel varsayilan olarak acik kalirken dar viewport'larda `details/summary` uzerinden collapse basliyor; oyuncu once canvas'i goruyor, AI update yine tek tikla acilabiliyor. Deterministic baseline `22.3s / 5.0s / 8%` ve replay akisi aynen korundu.

Rollback Condition:
Host browser manuel sample'i summary'nin fazla kolay gozden kactigini, panelin acma-kapama akisinin rahatsiz edici oldugunu veya dar viewport'ta beklenen clutter azalmasini saglamadigini gosterirse yalnizca summary wording, padding veya open-default breakpoint seviyesinde dar ayar yapilir.

### [Run #43]

Decision:
Bekleme/start/retry instructional copy'si oyuncu onboarding'i ile telemetry/dev hotkey'lerini ayiracak sekilde sadeleştirildi.

Reason:
`AUDIT.md` verdict'i `drift-risk`; ayni death-readability paketine kanit olmadan geri donmek ve validation/tooling katmanini buyutmek yasak. `PROJECT.md` ile `GAME_DESIGN.md` ise ilk 5 saniyede oyunun anlasilmasini ve cluttered screen'den kacinmayi istiyor. Mevcut waiting hint oyuncu kontrolleriyle telemetry hotkey'lerini ayni blokta topluyordu; en dar urun ilerlemesi, instructional hiyerarsiyi temizleyip replay/balance davranisini degistirmeden onboarding'i daha okunur hale getirmekti.

Impact:
Oyuncu artik waiting state'te hedef + kontrol + start aksiyonunu tek blokta goruyor. Telemetry hotkey'leri altta ayri support strip'ine tasindi. In-run hint daha kisa hedef odakli, game-over hint'i ise instant retry aksiyonunu one cikariyor. Deterministic baseline `22.3s / 5.0s / 8%` ve pacing `10 / 32 / 76` aynen korundu.

Rollback Condition:
Host browser manuel sample'i alt support strip'in ekrani kalabaliklastirdigini, waiting hint'in hala gec anlasildigini veya game-over hint'inin replay kararini yavaslattigini gosterirse yalnizca copy/placement/font-size/alpha seviyesinde dar bir sadeleştirme yapilir.

### [Run #42]

Decision:
Yeni balance veya death-readability tuning'i yerine oyuncunun personal best'i HUD ve game-over ozetinde gorunur hale getirildi.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine kanit olmadan geri donmek ve manual sample yokken yeni balance mikro-tuning turleri acmak yanlis local maximum riski tasiyor. Host browser sample bu runtime'ta hala yokken en dar urun ilerlemesi, instant replay'i daha hedefli hale getirecek kalici bir skor hedefi gostermekti.

Impact:
Lifetime ve session telemetry artik `bestSurvivalTime` tutuyor. Sol ust HUD `Best ... | Session ...` satiriyla her an hedef skoru gosteriyor; game-over body ve stats blogu yeni record veya mevcut hedef bilgisini yazarak retry kararini skor-hedef odakli tutuyor. Deterministic baseline `22.3s / 5.0s / 8%` ve mevcut pacing aynen korundu.

Rollback Condition:
Host browser manuel sample'i personal-best satirinin HUD'i kalabaliklastirdigini, game-over odagini bozdugunu veya replay istegine katkisi olmadigini gosterirse yalnizca copy/placement/weight seviyesinde dar bir sadeleştirme yapilir.

### [Run #41]

Decision:
Death-readability paketine geri donmeden yalnizca `20s+` obstacle speed ramp'i yumusatildi.

Reason:
`AUDIT.md` verdict'i `drift-risk` ve governance note'u ayni readability yuzeyine kanit olmadan yeni tur harcamayi yasakliyor. Host browser sample bu runtime'ta hala yokken en dar olculebilir urun ilerlemesi, spawn pacing'i ve 0-20s hissini sabit tutup deterministic survival baseline'ini tekrar `22.3s` seviyesine tasimakti.

Impact:
Speed curve `145 / 183 / 252 / 306 / 320` yerine `145 / 183 / 251 / 304 / 320` snapshot'ina geldi. Deterministic survival `22.1s -> 22.3s`, bucket dagilimi `2 / 7 / 5 / 10 -> 2 / 7 / 4 / 11`, average spawn count `23.0 -> 23.1` oldu; first death `5.0s` ve early death `%8` korundu.

Rollback Condition:
Host browser manuel sample'i 20s+ bandinin fazla yumusadigini, challenge'i geciktirdigini veya replay temposunu zayiflattigini gosterirse yalnizca `20s+` speed slope'u dar kapsamda yeniden sertlestirilir.

### [Run #40]

Decision:
Death-readability paketine yeni yuzey eklemek yerine obstacle speed curve tek eksende tuning edildi.

Reason:
`AUDIT.md` verdict'i `drift-risk` ve governance notu ayni death-feedback yuzeyine kanit olmadan yeni bir run harcamamayi istiyor. En dar ve olculebilir urun ilerlemesi, spawn pacing'i bozmadan deterministic survival baseline'ini toparlamakti.

Impact:
Speed curve `145 / 183 / 253 / 310 / 320` yerine `145 / 183 / 252 / 306 / 320` snapshot'ina geldi. Deterministic survival `21.8s -> 22.1s`, bucket dagilimi `2 / 7 / 6 / 9 -> 2 / 7 / 5 / 10`, average spawn count `22.5 -> 23.0` oldu; first death `5.0s` ve early death `%8` korundu.

Rollback Condition:
Host browser manuel sample'i 20s+ oyunun fazla yumusadigini, midgame'de agency'yi bozdugunu veya deterministic gain'in insan hissine yansimadigini gosterirse yalnizca speed curve sayilari dar kapsamda yeniden ayarlanir.

### [Run #39]

Decision:
Olum anindaki kirmizi impact ray ve teal kacis ray'inin baslangici oyuncu merkezinden biraz disari alindi.

Reason:
Audit gameplay readability disinda yeni alan acmayi yasakliyor ve bu runtime'ta manuel browser sample hala yok. Mevcut death feedback paketi icindeki en dar urun kazanci, iki yon sinyalinin oyuncu merkezinde ust uste binmesini azaltip fatal lane ile kacis yonunu daha hizli ayristirmakti.

Impact:
Oyuncu olum aninda gelen tehlike ve onerilen kacis yonunu ayni anda gorurken merkezde daha temiz bir boslukla iki ray'i daha kolay okuyabilir. `npm run telemetry:check` ve `npm run build` yesil kalarak deterministic baseline ve replay hizinin korunmasini dogruladi.

Rollback Condition:
Host browser manuel sample'i bu merkez-bosluginin ray'leri fazla kopuk gosterdigini veya oyuncu referansini zayiflattigini gosterirse yalnizca start offset/alpha/line-length seviyesinde dar ayar yapilir.

### [Run #38]

Decision:
Olum anindaki kirmizi impact ray ve teal kacis ray'i kucuk arrowhead uclariyla bitirildi.

Reason:
Audit sonraki builder turlerini gameplay readability ile sinirli tutuyor ve host browser manuel sample bu runtime'ta hala alinmiyor. Mevcut death feedback paketinde en dar urun kazanci, gelen tehlike ile onerilen kacis yonunu metin okumadan daha hizli ayristirmakti.

Impact:
Oyuncu artik hem fatal lane'i hem de `BREAK ...` yonunu sahne icinde daha net gorebiliyor. `npm run telemetry:check` ve `npm run build` yesil kalarak deterministic baseline ve replay hizinin korunmasini dogruladi.

Rollback Condition:
Host browser manuel sample'i yeni arrowhead'lerin dikkat dagittigini veya mevcut ray/marker hiyerarsisini bozdugunu gosterirse yalnizca alpha/scale/offset seviyesinde dar ayar yapilir.

### [Run #37]

Decision:
Olum anindaki `KILLER` etiketi fatal obstacle'a kisa bir connector ile baglandi.

Reason:
Audit sonraki builder turlerini gameplay readability ile sinirli tutuyor. Etiket clamp veya sahne yogunlugu yuzunden obstacle'dan kopuk algilanabilir; en dar urun kazanci, exact collider ile etiketi gorusel olarak baglamakti.

Impact:
Oyuncu `KILLER` label'inin hangi obstacle'a ait oldugunu daha hizli okuyabiliyor. `npm run telemetry:check` ve `npm run build` yesil kalarak deterministic baseline ve replay hizinin korunmasini dogruladi.

Rollback Condition:
Host browser manuel sample'i connector'un fazla gorsel gurultu yarattigini veya spotlight'tan daha baskin hale geldigini gosterirse yalnizca alpha/length/line-width seviyesinde dar ayar yapilir.

### [Run #36]

Decision:
Olum aninda fatal obstacle'a sahne ici bir `KILLER` spotlight halkasi ve etiketi eklendi.

Reason:
Audit sonraki builder turlerini gameplay readability ile sinirli tutuyor. Threat dimming ve lane callout varken bile exact collider bilgisini overlay disinda da ilk bakista gostermek en dar urun kazanciydi.

Impact:
Oyuncu artik hem lane seviyesinde nereden oldugunu hem de hangi obstacle'in carptigini sahne ustunde gorebiliyor. `npm run telemetry:check` ve `npm run build` yesil kalarak deterministic baseline ve replay hizinin korunmasini dogruladi.

Rollback Condition:
Host browser manuel sample'i yeni killer tag'in fazla baskin oldugunu veya ekran kalabaligi yarattigini gosterirse sadece alpha/label/offset/scale seviyesinde dar ayar yapilir.

### [Run #35]

Decision:
Olum aninda killer obstacle spotlight'ta tutuldu, diger aktif threat'ler dimlendi ve pooled obstacle'lar her spawn'da gorsel olarak sifirlandi.

Reason:
Audit gameplay readability disinda yeni alan acmayi yasakliyor. Mevcut death feedback paketi icinde en dar urun kazanci, hangi obstacle'in oldurdugunu daha hizli ayristirmak ve onceki run highlight'larinin yeni spawn'lara sizmasini engellemekti.

Impact:
Death screen'deki cause feedback daha temiz okunan bir spotlight hiyerarsisine kavustu. `npm run telemetry:check` ve `npm run build` yesil kalarak deterministic baseline ve replay akisinin korunmasini dogruladi.

Rollback Condition:
Host browser manuel sample'i threat dimming'in fazla agresif oldugunu veya killer spotlight'inin yeterince ayristirmadigini gosterirse sadece alpha/tint seviyesinde dar ayar yapilir.

### [Run #34]

Decision:
`BREAK ...` kacis yonu prompt'u sadece overlay metni olarak birakilmadi; ayni yone bakan sahne ici teal bir ray + marker ile desteklendi.

Reason:
Audit bu turu gameplay readability ile sinirli tutmayi ve yeni tooling katmani acmamayi zorluyor. Oyuncunun bir sonraki hareketi ilk bakista anlamasi icin metni uzatmadan uzamsal bir ipucu vermek en dar urun ilerlemesiydi.

Impact:
Olum feedback'i artik "nereden oldum" ve "nereye kirilayim" sinyalini ayri renklerle ayni anda veriyor. `npm run telemetry:check` ve `npm run build` yesil kalarak deterministic baseline'in korunmasini dogruladi.

Rollback Condition:
Host browser manuel sample'i teal guide'in dikkat dagittigini, panel veya replay hissiyle catisitigini gosterirse sadece alpha/offset/line-length/label agirligi dar kapsamda geri cekilir.

---

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
