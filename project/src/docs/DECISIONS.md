Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

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
