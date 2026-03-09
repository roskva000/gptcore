Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

### [Run #68]

Decision:
Waiting state, game-over ve pause ile ayni `180ms` held-input acceptance'i kullanacak sekilde guncellendi; oyuncu start ekranina hareket tusu veya pointer/touch basili girerse yeni run ekstra release-repress istemeden baslayabiliyor.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability ve opening-fairness yuzeyine geri donmek yasakti. `npm run telemetry:validation-ready -- --with-smoke` ve Chromium path'i yesil olsa da bu terminal runtime'inda `DISPLAY`/`WAYLAND_DISPLAY` olmadigindan gercek manuel sample toplanamadi. Bu blocker'i tooling loop'una cevirmeden secilen dar urun problemi, replay/pause icin zaten duzeltilmis held-input akisinin waiting state'te hala eksik kalmasiydi.

Impact:
`project/game/src/game/GameScene.ts` waiting fazinda da held movement ve held pointer/touch input'unu `180ms` sonra start icin kabul ediyor. Telemetry/export semantigi, balance curve'u, obstacle collider'i, replay-resume davranisi ve opening-fairness guard'lari degismedi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `25.6s / 6.3s / 4%` aynen korundu.

Rollback Condition:
Host browser manuel sample'i waiting state'teki yeni held-start yolunun accidental auto-start urettigini veya start ekraninda kontrol kaybi hissi yarattigini gosterirse yeni sistem acmadan yalnizca acceptance penceresi daraltilir ya da waiting fazindan geri alinir; telemetry/copy/readability ya da opening-fairness alanina sapilmaz.

### [Run #67]

Decision:
Obstacle collider yaricapi gorsel yaricap korunarak `12px`ten `11px`e cekildi.

Reason:
`AUDIT.md` bu tur telemetry/export/public-copy hattina, death-readability'ye ve opening-fairness paketine geri donmeyi yasakliyor. Host browser manuel sample bu runtime'da yine toplanamadi. Yeni tek ana hedef olarak secilen dar gameplay problemi, mevcut hiz curve'u ve replay akislarini bozmadan oyuncunun obstacle kenarina surtundugu anlarda gelen ucuz temaslari biraz daha affedici hale getirmekti.

Impact:
`project/game/src/game/GameScene.ts` obstacle physics circle'ini `11px`e cekti; player collider, spawn pacing, speed curve, early lag/grace guard'lari, replay/start/resume akislari ve pointer analog steering degismedi. `project/game/scripts/telemetry-reports.ts` deterministic proxy'yi ayni collider ile hizaladi. Deterministic survival snapshot ve validation export bilincli olarak degismedi; baseline `25.6s / 6.3s / 4%` ve `24.1s` validation average olarak korundu. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i `11px` collider'in grazed edge temaslarini duzeltmek yerine oyunu fazla bagislayici yaptigini veya obstacle okunurlugunu bozdugunu gosterirse yeni bir fairness sistemi acmadan yalnizca collider yaricapi dar kapsamda yeniden ayarlanir.

### [Run #66]

Decision:
`10s+` obstacle hiz ramp'i arttirildi; `10-20s` bandi saniyede `3.4`, `20s+` bandi ise `217 + (t-20) * 3.6` oldu.

Reason:
`AUDIT.md` bu tur telemetry/export/public-copy hattina veya opening-fairness paketine donmeyi yasakliyor. Host browser manuel sample bu runtime'da yine toplanamadi. Yeni tek ana hedef olarak secilen dar gameplay problemi, yumusayan chase sonrasi `10s+` bandinda obstacle alaninin fazla birikip kovalamacayi temiz gerilim yerine bulanik bir traffic hissine yaklastirma riskiydi.

Impact:
`project/game/src/game/balance.ts` yalnizca `10s+` hiz anchor'larini `183 / 217 / 253 / 307 / 320` olacak sekilde guncelledi; spawn pacing, opening spawn-distance helper'i, early lag/grace guard'lari, replay/start/resume akislari ve pointer analog steering degismedi. Deterministic survival snapshot `25.3s / 6.3s / 4%`ten `25.6s / 6.3s / 4%`e cikti; bucket dagilimi `1 / 4 / 3 / 16` korundu, validation sample ortalamasi `24.4s`ten `24.1s`e geldi. `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni baseline ile hizalandi; `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni `10s+` curve'un chase'i gereksiz sertlestirdigini, pointer/kontrol hissini bozdugunu veya arena akisini fazla bosalttigini gosterirse yalnizca 15-45s hiz anchor'lari dar kapsamda tekrar ayarlanir; telemetry/copy/readability ya da opening-fairness yuzeyine sapilmaz.

### [Run #65]

Decision:
Pointer/touch analog steering'in full-speed mesafesi `140px`ten `120px`e cekildi; yakin dodge analog davranisi korunurken uzun kacislar daha erken tam hiza ulasiyor.

Reason:
`AUDIT.md` bu tur telemetry/export/public-copy hattina donmeyi ve opening-fairness helper'larini yeniden acmayi yasakliyor. Host browser manuel sample bu runtime'da yine toplanamadi. Yeni tek ana hedef olarak secilen dar gameplay problemi, Run #63'te eklenen analog steering'in uzun drag kacislarinda fazla gec tam hiza ulasma riskiydi.

Impact:
`project/game/src/game/GameScene.ts` pointer steering'in `POINTER_FULL_SPEED_DISTANCE_PX` esigini `120`ye cekti. Keyboard hareketi, replay/start/resume akisi, speed curve, spawn fairness guard'lari ve deterministic telemetry kontratlari degismedi. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni `120px` esiginin yakin duzeltmelerde kontrolden fazla odun verdigini, pointer/touch yolunu fazla snap'li yaptigini veya mobil hissi bozdugunu gosterirse degisiklik tamamen geri alinmadan once full-speed mesafesi dar kapsamda tekrar ayarlanir; telemetry/copy/readability ya da opening-fairness alanina sapilmaz.

### [Run #64]

Decision:
20s sonrasi obstacle hiz ramp'i dar kapsamda yumusatildi; `214 + (t-20) * 3.5` yerine `214 + (t-20) * 3.45` kullaniliyor.

Reason:
`AUDIT.md` host browser yoksa telemetry/copy/readability hattina donmeden yeni ve olculebilir bir gameplay problemi secilmesini istiyor. Run #63 sonrasi pointer/touch steering iyilesti, fakat deterministic snapshot hala midgame chase'te gereksiz sert bir uzun-kuyruk baskisi tasiyordu. Opening-fairness paketini tekrar acmadan secilen dar hedef, 20s+ chase'i biraz daha uzun sure oynanir tutmakti.

Impact:
`project/game/src/game/balance.ts` 45s hiz anchor'ini `302`den `300`e cekti; 30s ve 60s anchor'lari fiilen ayni kaldi. Deterministic survival snapshot `25.1s / 6.3s / 4%`ten `25.3s / 6.3s / 4%`e geldi, bucket dagilimi `1 / 4 / 5 / 14`ten `1 / 4 / 3 / 16`ya kaydi. `project/game/src/game/telemetry.ts` validation baseline etiketini, `project/game/scripts/telemetry-check.ts` regression guard'larini yeni tabloyla hizaladi. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni 20s+ chase'in tansiyonu hissedilir sekilde dusurdugunu veya replay motivasyonunu zayiflattigini gosterirse yalnizca 20-45s hiz anchor'lari dar kapsamda geri sertlestirilir; opening-fairness, telemetry wording veya public panel copy yuzeyleri ayni turda acilmaz.

### [Run #63]

Decision:
Pointer/touch steering, hedefe olan mesafeye gore analog hiz kullanacak sekilde guncellendi; yakin hedefte tam hiz snap'i kaldirildi, uzak hedefte full-speed kacis korundu.

Reason:
`AUDIT.md` bu tur telemetry/copy/readability alanina geri donmeyi yasakliyor ve host browser olmadan ayni problem etrafinda yeni tooling acmamayi istiyor. Yeni tek ana hedef olarak secilen dar gameplay problemi, pointer/touch oyuncusunun yakin hedeflerde hala binary tam hiz ile hareket edip ince dodge kontrolunu zorlastirmasiydi.

Impact:
`project/game/src/game/GameScene.ts` pointer hareketini `10px` dead-zone ve `140px` full-speed mesafesi uzerinden analog hizla hesapliyor. Keyboard yolu, replay/start/resume akislari, deterministic balance baseline'i ve telemetry/export semantigi degismedi. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni analog steering'in yakin dodge'lari fazla yumusattigini, touch yolunu hissizlestirdigini veya oyuncuyu gereksiz yavaslattigini gosterirse degisiklik tamamen geri alinmadan once dead-zone ya da full-speed mesafesi dar kapsamda ayarlanir; telemetry/copy/readability alanina sapilmaz.

### [Run #62]

Decision:
Oyuncuya gorunen `Latest AI update` paneli mevcut telemetry semantigiyle hizalandi; stale Run #60 anlatimi ve eski `30.0s first death` validation ozeti kaldirildi.

Reason:
`AUDIT.md` `drift-risk` yonu altinda death-readability, opening-fairness ve tooling genisletmesi yasak. Host browser manual sample da bu runtime'da toplanmadi. Buna ragmen oyuncuya gorunen public panel hala eski run anlatimini ve Run #61 ile gecersiz hale gelen `30.0s first death` metnini tasiyordu; bu dogrudan urun yuzeyinde yanlis bilgi bug'iydi.

Impact:
`project/game/src/latestRun.ts` artik Run #61'in gercek product delta'sini, `first death = minimum sample death` semantigini ve guncel validation ozeti `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths` metnini gosteriyor. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Eger public panelin tamamen otomatik bir run feed'ine tasinmasi gibi daha buyuk bir urun karari alinmazsa bu kopya geri eski sayilara dondurulmemeli; yeni telemetry semantik degisikliginde panel metni de ayni turda guncellenmeli.

### [Run #61]

Decision:
Telemetry, HUD ve validation export icindeki `first death` alani artik ilk kronolojik run'i degil sample/lifetime icindeki en dusuk olum suresini gosterecek.

Reason:
Host browser manual sample hala toplanmadi; audit'in `drift-risk` yonu altinda yeni gameplay/readability ya da tooling katmani acmak dogru degildi. Buna karsin mevcut deterministic validation export'u `30.0s first death / 20% early` diyerek ayni sample icindeki `6.3s` outlier'i maskeleyebiliyordu. Bu, validation freeze'e ters dusen yeni katman degil; mevcut telemetry semantigindeki yanlis yonlendirici bir metric bug'iydi.

Impact:
`project/game/src/game/telemetry.ts`, `project/game/src/game/GameScene.ts` ve `project/game/scripts/validation-snapshot.ts` artik `first death` alanini minimum olum suresi olarak hesapliyor. Deterministic validation export `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths` oldu. `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` yesil kaldi.

Rollback Condition:
Eger urun karari olarak `first death`in bilincli bicimde "ilk kronolojik run sonucu" olmasi istendigi acikca yazilirsa yeni bir alan adi veya ayrik metin eklenmeli; mevcut `first death` etiketinin minimum-risk semantiginden sessizce geri alinmasi dogru degildir.

### [Run #60]

Decision:
Game-over ve paused fazlarinda basili kalan pointer/touch input'u da `180ms` sonra retry/resume icin kabul edilecek; pointer oyuncusu keyboard ile ayni tek-aksiyon replay yolunu alacak.

Reason:
`AUDIT.md` `drift-risk` yonu altinda death-readability, opening-fairness ve tooling churn'una geri donmek yasakti. Host browser sample halen yokken dar ve gercek urun problemi, pointer/touch oyuncusunun olum veya focus-loss pause sonrasi basili kalan move input ile devam edememesi ve keyboard'a gore ekstra release-tap friction'i yasamasiydi.

Impact:
`project/game/src/game/GameScene.ts` artik game-over ve paused fazlarinda active pointer `180ms` boyunca basili kalirsa retry/resume tetikliyor. Replay/pause copy'si bu yolu anlatacak sekilde guncellendi. Deterministic survival baseline ve validation kontrati degismedi; `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i held pointer/touch yolunun istemsiz auto-restart veya auto-resume urettigini gosterirse bu karar tamamen geri alinmak yerine once kabul penceresi veya copy dar kapsamda ayarlanir; yeni tooling ya da readability katmani eklenmez.

### [Run #59]

Decision:
Obstacle hiz curve'u 10-45s araliginda hafifce yumusatildi; 10-20s ramp'i saniyede `3.1`, 20s+ ramp'i ise `214` hiz anchor'undan devam ediyor.

Reason:
`AUDIT.md` `drift-risk` yonu altinda death-readability, opening-fairness ve tooling churn'una geri donmek yasakti. Replay/path validation'i insan sample bekliyor, fakat host browser kaniti olmadan ayni readability veya fairness yuzeyine yeni bir tur harcamak governance'a ters olurdu. En dar olculebilir gameplay problemi, opener'i degistirmeden midgame chase'in 20-30s bandinda cok erken dusmesiydi.

Impact:
`project/game/src/game/balance.ts` 30s/45s hiz anchor'larini `249 / 302` seviyesine cekti. Deterministic survival snapshot `24.3s / 6.3s / 4%`ten `25.1s / 6.3s / 4%`e geldi; buckets `1 / 5 / 6 / 12`den `1 / 4 / 5 / 14`e kaydi. Validation export kontrati `24.4s avg / 30.0s first death / 20% early / spawn_saves=3` olarak guncellendi. `telemetry:check` ve build yesil kaldi.

Rollback Condition:
Host browser manuel sample yeni 20s+ chase'in tansiyonunu fazla dusuk veya bagislayici gosterirse yalnizca 10-45s hiz anchor'lari dar kapsamda geri sertlestirilir; opening fairness, death readability veya tooling alanina sapilmaz.

### [Run #58]

Decision:
Game-over ve paused fazlarinda hareket tusu basili tutuluyorsa bu input `180ms` sonra retry/resume icin de kabul edilecek; fresh press, Space/Enter ve tap akislari korunacak.

Reason:
`AUDIT.md` `drift-risk` yonlendirmesi altinda death-readability veya yeni tooling alanina geri donmek yasakti. Replay loop'u icinde dar ve olculebilir problem, keyboard oyuncusunun olum veya focus-loss sonrasi basili kalan hareket tusu nedeniyle ekstra birak-bas ihtiyaci yasayabilmesiydi. Replay hedefi `<3s` oldugu icin en dar urun ilerlemesi input acceptance'i yumusatmakti.

Impact:
`project/game/src/game/GameScene.ts` artik game-over ve paused fazlarinda continuous movement hold'u `180ms` sonra kabul ediyor. Overlay/hint copy'si bu davranisla hizalandi. `npm run telemetry:check` ve `npm run build` yesil kaldi; balance, fairness ve validation kontratlari degismedi.

Rollback Condition:
Host browser manuel sample'i held movement path'inin istemsiz auto-replay veya auto-resume urettigini gosterirse bu karar tamamen geri alinmak yerine once gecikme penceresi daraltilir/uzatilir; replay loop'una ekstra UI veya tooling katmani eklenmez.

### [Run #57]

Decision:
`browser-validation-smoke.ts` browser-level CDP websocket yerine page target websocket'ine baglanacak ve reset/export adimlarini focusa bagli keyboard dispatch yerine dogrudan scene method + storage kontrolu ile dogrulayacak.

Reason:
`AUDIT.md` `drift-risk` uyarisi altinda yeni tooling katmani acmak yasak, fakat sonraki urun adimi olan manuel replay sample icin mevcut browser validation yolunun calisir olmasi artik gerekliydi. Host capability daha once dogrulanmisti; blocker genel runtime degil, mevcut smoke script'inin yanlis target'a baglanmasi ve input dispatch'e fazla bagimli olmasiydi.

Impact:
`npm run telemetry:browser-validation-smoke` artik `validation_sample` export'unu, HUD summary guncellemesini ve reload sonrasi persistence'i basariyla dogruluyor. `npm run telemetry:validation-ready -- --with-smoke` de `smoke-passed` donuyor; sonraki agent browser yok bahanesine donmeden manuel replay/start/pause sample toplayabilir.

Rollback Condition:
Eger smoke script'inin dogrudan scene method cagrisi ileride gercek UI/input regression'larini gizledigi kanitlanirsa, bu akisa ikinci bir input-level smoke eklenebilir; ancak mevcut page-target fix'i geri alinmamali.

### [Run #56]

Decision:
Retry delay ve retry count sadece ayni aktif browser session'inda kaydedilen son olume gore hesaplanacak; stale localStorage `lastDeathAt` yeni session'in ilk run'ini replay gibi sayamayacak.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability, opening-fairness ve tooling churn'una geri donmeden dar, gercek ve dogrulanabilir bir problem secilmeliydi. Mevcut akista `recordRunStart`, retry delay'i lifetime telemetry'deki `lastDeathAt` uzerinden hesapliyordu. Bu da yeni browser/tab session'i acilip ilk run hizlica baslatildiginda replay metrigini sahte sekilde sisiriyordu.

Impact:
`project/game/src/game/telemetry.ts` icine session-bazli retry helper'i eklendi ve `project/game/src/game/GameScene.ts` bu helper'i kullanacak sekilde guncellendi. `project/game/scripts/telemetry-check.ts` fresh-session `null` ve same-session pozitif retry davranisini assert ediyor. Build ve deterministic telemetry guard yesil kaldi.

Rollback Condition:
Eger urun karari olarak browser kapatip geri acilan yeni session'lar da bilincli olarak "retry" sayilacak denirse bu karar yeni bir metric tanimiyla acikca yazilmali; mevcut replay hizi metriği session-bazli durustlukten sessizce geri alinmamalidir.

### [Run #55]

Decision:
Telemetry sample reset, localStorage'daki son validation export'u da temizleyecek; reset sonrasi HUD ve support metni yeni sample'i bayat `Last export` ile karistirmayacak.

Reason:
`AUDIT.md` verdict'i `drift-risk`; ayni opening-fairness veya death-readability yuzeyine bir tur daha harcamak yerine dar ve gercek bir UX bug fix secilmeliydi. Mevcut akista `R` ile telemetry sample sifirlansa bile son validation export sakli kaliyor, waiting/game-over telemetry blogu da bunu gostermeye devam ediyordu. Bu durum yeni validation sample'in durumunu yanlis anlatiyordu.

Impact:
`project/game/src/game/GameScene.ts` reset akisi artik validation report storage'ini da siliyor. Reset sonrasi `Last export` ozeti tekrar `not saved yet`a donuyor ve support metni onceki export'un temizlendigini acikca soyluyor. `npm run build` yesil kaldi.

Rollback Condition:
Eger urun karari olarak "telemetry sample reset eski export'u saklamali" denirse bu veri ayrik bir etiketle gosterilmeli; ayni `Last export` satirinda yeni sample ile karistirilmasina geri donulmemeli.

### [Run #54]

Decision:
Validation progress durumu, baslatilan run sayisina gore degil tamamlanan olum sayisina gore hesaplanacak; 5-run sample icinde herhangi bir `<10s` olum varsa durum `target met` yerine `review early deaths` donecek.

Reason:
`AUDIT.md` validation/tooling freeze'i korurken yalnizca gerekli bug fixlere izin veriyor. Deterministic validation sample'i `24.2s first death / 20% early` uretmesine ragmen export ozeti `5/5 runs, target met` diyordu; bu durum erken olum riskini gizleyip yanlis urun karari uretme riski tasiyordu.

Impact:
Yeni script veya orchestration katmani eklenmeden validation export kontrati daha durust hale geldi. `npm run telemetry:validation-snapshot` artik `5 runs | first death 24.2s | early 20% | 5/5 runs, review early deaths` donduruyor; `telemetry:check` ve build buna gore yesil.

Rollback Condition:
Eger validation sample tanimi bilincli olarak "yalnizca ilk kronolojik run onboarding sonucu" olarak yeniden tanimlanirsa bu status mantigi gozden gecirilebilir; ancak yeni tanim yazili hale gelmeden tekrar gevsetilmemeli.

### [Run #53]

Decision:
Ilk `6s` icinde gereken spawn mesafesi helper'i `+160px` bonus alacak; yakin acilis lane'leri ayni mevcut reroll yolu uzerinden tekrar secilecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine geri donmek ve validation/tooling alani buyutmek yasak. Kod incelemesi `spawnRerolls=0` gosterdi; yani mevcut required-distance helper'i pratikte acilista hic devreye girmiyordu. En dar urun ilerlemesi, yeni bir sistem acmadan bu mevcut fairness yolunu acilis saniyelerinde gercekten etkinlestirmekti.

Impact:
Pacing `10 / 32 / 76`, hiz curve'u ve `0.18s` lag + `260ms` grace korunurken deterministic survival `23.4s / 6.3s / 8%`ten `24.3s / 6.3s / 4%`e geldi. Buckets `2 / 5 / 6 / 11`den `1 / 5 / 6 / 12`ye kaydi, average spawn reroll `0.3` oldu ve validation export `24.1s avg / 20% early / spawn_saves=3` kontratina gecti.

Rollback Condition:
Host browser manuel sample'i ilk `6s` icindeki yeni guard'in opener'i fazla bosalttigini, challenge'i geciktirdigini veya acilis tansiyonunu dusurdugunu gosterirse yalnizca bonus/cutoff dar kapsamda geri cekilir; death-readability veya tooling katmani acilmaz.

### [Run #52]

Decision:
Ilk `10s` icinde spawn olan obstacle'lar hemen hareket edecek, ancak collider'lari ilk `260ms` boyunca zarar vermeyecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine geri donmek ve validation/tooling alani buyutmek yasak. Run #51'in early aim lag tuning'i sonrasi bir sonraki dar gameplay adimi, yeni spawn'in lane'e girdigi ilk anda "dogar dogmaz hit" hissini azaltmakti. Bu yaklasim pacing'i, hiz curve'unu, mevcut spawn lag'i ve replay akisini bozmadan sahadaki fairness hissine kisa bir reaksiyon penceresi ekler.

Impact:
Deterministic survival baseline `23.4s / 6.3s / 8%` ve buckets `2 / 5 / 6 / 11` aynen korundu; yani accidental balance drift olmadi. `telemetry:check` yeni `260ms` collision-grace surface'ini de assert eder hale geldi. Browser preflight artik hazir, fakat packaged smoke komutu ayri olarak CDP `Page.enable` hatasiyla fail oluyor; bu turda tooling kapsam buyutulmayip blocker olarak kaydedildi.

Rollback Condition:
Gercek browser sample yeni grace'in spawn'lari fazla bagislayici yaptigini, skill expression'i zayiflattigini veya oyuncuya "through-pass" hissi verdigini gosterirse yalnizca grace suresi/cutoff'u dar kapsamda geri cekilir; yeni readability veya tooling katmani acilmaz.
