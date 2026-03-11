Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

### [Run #122]

Decision:
Game-over ekranindaki kalan duplicate metin yuzeyleri bir kademe daha azaltilacak; overlay istatistikleri sadece retry aksiyonunu tasirken session/validation ozeti sag ust snapshot alaninda kalacak.

Reason:
Bu tur `stabilization` modunda ve hedef yine dogrudan insan sinyaline baglandi. Run #121 clutter'i azaltmisti ama `GameScene.ts` incelemesi olum aninda hala ayni bilgilerin overlay body, overlay stats, hint/support strip ve sag ust panel arasinda tekrarlandigini gosterdi. Audit'in ritual-loop uyarisina uyarak yeni tooling/readiness katmani acmadan, tek source-level UX kusuruna odaklanmak gerekiyordu.

Impact:
`project/game/src/game/GameScene.ts` overlay body icinde `best` bilgisini ayri satirdan cikarip hayatta kalma ozetine gomdu. Game-over overlay stats artik yalnizca `Retry:` satirini gosteriyor; `hintText` death aninda gizleniyor ve support strip tek bir retry/export hatirlatmasina iniyor. `Session snapshot` satirlari da kisaltilarak session ve validation baglami korunurken duplicate bilgi duvari azaltildi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Bir sonraki manuel sample validation/export affordance'inin fazla geriye itildigini veya oyuncunun kendi ilerlemesini okumayi zorlastirdigini gosterirse yalnizca game-over bilgi dagilimi dar kapsamda yeniden ayarlanir; public panel copy'si, fairness zinciri veya yeni orchestration/tooling katmani bu bahaneyle acilmaz.

### [Run #121]

Decision:
Game-over anindaki telemetry ve overlay istatistikleri daraltilacak; olum ekrani tekrar once olum nedeni, retry aksiyonu ve kisa session baglamina odaklanacak.

Reason:
Bu tur `stabilization` modunda ve secilen ana hedef dogrudan insan sinyaline baglandi. `HUMAN_SIGNALS.md` 11.03.2026 girdisinde olum ekraninin "inanilmaz fazla veri/yazi" ile karmasik ve rahatsiz edici hissettirdigi acikca yazildi. Audit'in yasakladigi fairness/input zincirine donmeden en dar, urun etkisi yuksek cevap; game-over anindaki cift telemetry duvarini azaltmakti.

Impact:
`project/game/src/game/GameScene.ts` game-over overlay stats blokunu `retry instantly + session summary + validation/export status` formatina indirdi. Ayni run'da sag ust telemetry paneli de `Session snapshot` basligi altinda iki ozet satira daraltildi. Boylece death aninda duplicate telemetry, `spawn saves`, `retry avg` ve `early death %` gibi ikincil metrikler ana replay/readability akisindan cekildi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Bir sonraki manuel sample bu sadelestirmenin validation/export affordance'ini gereksiz sakladigini veya oyuncunun kendi ilerlemesini okumayi zorlastirdigini gosterirse yalnizca game-over bilgi yogunlugu dar kapsamda yeniden ayarlanir; fairness/input zinciri veya yeni governance/tooling katmani bu bahaneyle acilmaz.

### [Run #120]

Decision:
`60 seconds` namesake hedefi runtime icinde gorunur milestone feedback ile acknowledge edilecek.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi ayni fairness/input/telemetry zincirine donmeden dar ama gercek bir UX boslugu secildi. Oyun kopyasi ve isimlendirmesi `Survive 60 Seconds` hedefini one cikariyor, ancak mevcut runtime 60 saniye asilsa bile oyuncuya ayrik bir milestone feedback vermiyordu; bu da oyunun own-goal hissini zayiflatiyordu.

Impact:
`project/game/src/game/balance.ts` `SURVIVAL_GOAL_SECONDS = 60` ve `hasReachedSurvivalGoal()` helper'ini ekledi. `project/game/src/game/GameScene.ts` 60 saniye asildiginda gecici `60s clear!` hint/support mesajini gosteriyor ve sonrasindaki death overlay'lerde `60s clear.` satiri ile bu esigi koruyor. `project/game/scripts/telemetry-check.ts` 59.9s/60.0s esigini regression guard altina aldi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample bu milestone mesajinin fazla gosterisli, dikkat dagitici veya earned hissettirmedigini gosterirse yalnizca 60s feedback sunumu dar kapsamda yeniden ayarlanir; telemetry semantics, fairness zinciri veya yeni orchestration katmani bu bahaneyle acilmaz.

### [Run #119]

Decision:
Non-primary mouse button'lar held pointer ve steering akislari icinde de primary input sayilmayacak.

Reason:
Bu tur `stabilization` modunda, runtime halen blokluyken ayni fairness/telemetry/readiness alanina donmeden dar ve gercek bir gameplay-control regressiyonu secildi. Run #118 `pointerdown` uzerinden gelen right-click / middle-click start-retry-resume yolunu kapatmisti, fakat `GameScene.ts` icindeki held pointer ve steering akislari hala yalnizca `activePointer.isDown` kontrolune dayaniyordu. Bu yuzden non-primary mouse button basili tutulursa oyun hala primary action veya steer uretebiliyordu.

Impact:
`project/game/src/game/primaryAction.ts` pointer'in primary button ile mi aktif oldugunu yorumlayan tek kaynak `isPrimaryPointerDown()` helper'ini ekledi. `project/game/src/game/GameScene.ts` held pointer acceptance, pointer steering, activation sonrasi steering guard'i ve death-time pointer release ihtiyacini bu helper ile hizaladi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample bu guard'in touch veya normal left-click akisini bozdugunu gosterirse yalnizca primary-pointer yorumlama dar kapsamda yeniden ayarlanir; fairness, telemetry, browser shell veya yeni orchestration bahanesiyle scope genisletilmez.

### [Run #118]

Decision:
Non-primary mouse click'ler primary action olarak kabul edilmeyecek; yalnızca primary pointer press start/retry/resume hattina girecek.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi fairness/telemetry/readiness zincirine donmeden dar bir control-honesty kusuru secildi. Mevcut pointer primary action akisi mouse button ayrimi yapmadigi icin right-click veya middle-click desktop'ta istemsiz start/retry/resume uretebiliyordu.

Impact:
`project/game/src/game/primaryAction.ts` pointer icin saf guard ekledi. `project/game/src/game/GameScene.ts` pointer primary action'i bu guard ile kullaniyor. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample bu guard'in touch veya normal left-click akisini bozdugunu gosterirse yalnizca pointer button yorumu dar kapsamda yeniden ayarlanir; fairness, telemetry, browser-control veya readiness yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #117]

Decision:
`Space` ve `Enter` icin repeated keyboard event'leri primary action olarak yok sayilacak; held auto-repeat waiting, paused ve game-over fazlarinda ikinci bir start/retry/resume tetiklemeyecek.

Reason:
Bu tur `stabilization` modunda, runtime yine blokluyken audit'in yasakladigi fairness, telemetry, browser-control ve death-guidance zincirini acmadan dar bir control kusuru secildi. `keydown-SPACE` ve `keydown-ENTER` dogrudan primary action'a bagliydi; key auto-repeat browser/OS seviyesinde yeniden event urettiginde death tableau veya pause overlay'i oyuncu taze niyet gostermeden delinme riski tasiyordu.

Impact:
`project/game/src/game/primaryAction.ts` yeni saf guard'i ekledi. `project/game/src/game/GameScene.ts` repeated `KeyboardEvent` geldiğinde primary action'i erken durduruyor; taze Space/Enter basisi aynen korunuyor. `project/game/scripts/telemetry-check.ts` bu kontrati regression guard altina aldi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample bu guard'in bilincli keyboard tekrar davranisini gereksiz sekilde yavaslattigini veya taze primary key akisini bozdugunu gosterirse yalnizca repeat-event yorumu dar kapsamda yeniden ayarlanir; retry/fairness/telemetry yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #116]

Decision:
`Enter` tusu da gameplay capture listesine alinacak; start/retry/resume icin vaat edilen primary action shell focus kaymalarinda panel toggle veya default browser davranisina dusmeyecek.

Reason:
Bu tur `stabilization` modunda, headed runtime yine blokluyken audit'in kapattigi fairness/death-guidance/pointer-control/validation zincirine geri donmeden yeni ve dar bir replay/control kusuru secildi. `GameScene.ts` `keydown-ENTER` ile primary action acsa da keyboard capture listesi yalnizca `Space`, yon tuslari ve `WASD`'yi tutuyordu. Uygulama kabugunda focus alabilen `details/summary` elemanlari oldugu icin `Enter` bazen shell UI'yi toggle edip oyunun tek aksiyonla start/retry/resume vaadini bozabilecek gercek bir UX sizintisiydi.

Impact:
`project/game/src/game/GameScene.ts` artik `Phaser.Input.Keyboard.KeyCodes.ENTER` icin de capture aciyor. Boylece `Enter` primary action'i `Space` ile ayni capture hattinda, side panel odagi veya diger focusable shell elemanlari altinda da oyuna ait kaliyor. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample `Enter` capture'inin shell icindeki baska kritik klavye etkilesimlerini beklenmedik sekilde kilitledigini gosterirse yalnizca primary-action capture kapsami daraltilarak yeniden yorumlanir; browser scroll, fairness, telemetry veya death-readability yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #115]

Decision:
Validation export yalnizca stable fazlarda (`waiting` / `gameOver`) ve en az bir tamamlanmis run varken alinacak.

Reason:
Bu tur `stabilization` modunda, headed runtime yine blokluyken audit'in kapattigi input/fairness/death-guidance zincirine geri donmeden dar ve gercek bir validation-integrity bug'i secildi. `GameScene.ts` mevcut durumda aktif veya pause halindeki yarim run sirasinda da `V` export'una izin veriyor, sifir completed run ile de yerel export alinabiliyordu. Bu durum export'un stable bir sample gibi gorunmesine ragmen yari kalmis veya bos bir durumu kaydetme riski tasiyordu.

Impact:
`project/game/src/game/telemetry.ts` yeni `hasCompletedRunSample()` helper'i ile export-readiness kontratini tek kaynaga tasidi. `project/game/src/game/GameScene.ts` artik playing/paused fazinda validation export'u reddediyor ve completed run yoksa kullaniciya net support mesaji veriyor. `project/game/scripts/telemetry-check.ts` export readiness'in ilk completed run oncesi kapali, sonrasi acik kalmasini regression guard altina aldi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Host browser sample'i aktif/pause fazinda ara export'un gercek bir operasyon ihtiyaci oldugunu gosterirse bu ancak ayri bir "snapshot" kontrati olarak acikca adlandirilmis yeni yuzeyle cozulmeli; mevcut validation export sessizce yari sample'a geri acilmamali.

### [Run #114]

Decision:
Pointer steering hedefi arena disina kacsa bile hareket vektoru oyuncunun fiziksel olarak erisebildigi arena icinden hesaplanacak.

Reason:
Bu tur `stabilization` modunda, headed runtime yine blokluyken audit'in yasakladigi fairness/input-retry/death-tableau zincirine geri donmeden yeni ve dar bir kontrol kusuru secildi. `GameScene.ts` pointer steering'i aktif pointer koordinatini dogrudan hedef aldigi icin imlec canvas veya arena disina tastiginda ozellikle duvar kenarinda oyuncu gercekte ulasamayacagi bir noktaya dogru hiz harciyordu. Bu, wall-edge drag/touch kontrolunu gereksiz sert ve boguk hissettirebilecek gercek bir agency problemiydi.

Impact:
`project/game/src/game/pointerSteering.ts` yeni saf helper'i ile pointer hedefini reachable arena icine clamp'ledi. `project/game/src/game/GameScene.ts` pointer steering'i artik bu clamp'li hedef uzerinden hesapliyor; wall-edge drag artik imkansiz outward lane'e hiz kaybetmiyor. `project/game/scripts/telemetry-check.ts` offscreen pointer hedefinin reachable clamp ile saf yukari/asagi kacis vektoru uretmesini ve dead-zone davranisinin korunmasini regression guard altina aldi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample clamp'in pointer/touch steering'i fazla rayli, yapay veya precision kaybettiren bir hisse cevirdigini gosterirse yalnizca pointer target clamp marji dar kapsamda yeniden ayarlanir; spawn fairness, retry, death guidance, telemetry veya browser-control yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #113]

Decision:
Center-overlap death'lerde `RESET CENTER` guidance kopyada kaldigi gibi gorsel olarak da notr olacak; sahte yukari kacis oku cizilmeyecek.

Reason:
Bu tur `stabilization` modunda, runtime blokluyken yeni ama dar bir gameplay/readability kusuru secildi. Run #93 center-overlap copy'sini durustlestirmisti, fakat `GameScene.ts` escape guide hesaplamasi merkez carpismalarda hala varsayilan `up` vektoru uretip oyuncuya gercekte olmayan bir lane oneriyordu. Bu, ayni death tableau icinde hem "Caught at center" deyip hem de sahte yon telkin eden kucuk ama gercek bir UX celiskisiydi.

Impact:
`project/game/src/game/deathOverlayLayout.ts` center ve yonlu death case'lerini ayiran `getEscapeGuideVector()` helper'ini ekledi. `project/game/src/game/GameScene.ts` center-overlap death'lerde escape ray/arrow yerine oyuncu merkezinde notr marker ve `RESET CENTER` etiketi gosteriyor; yonlu case'ler eski davranisini koruyor. `project/game/scripts/telemetry-check.ts` center case'in notr kalmasini ve yonlu case'in fatal lane'den uzağa isaret etmeyi surdurmesini regression guard altina aldi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample merkez overlap death'lerde notr marker'in fazla belirsiz kaldigini gosterirse yalnizca bu center fallback sunumu dar kapsamda yeniden ayarlanir; retry, fatal threat, edge clamp, fairness, timing ve telemetry yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #112]

Decision:
Death aninda zaten basili kalan movement/pointer input, release gormeden game-over ekraninda otomatik retry baslatmayacak.

Reason:
Bu tur `stabilization` modunda, headed sample yokken replay/control akisinda yeni ve dar bir urun kusuru secildi. `GameScene.ts` akisi olumden hemen sonra `movement-held` ve `pointer-held` yollarini acik biraktigi icin oyuncu olum aninda input'u basili tutuyorsa `180ms` sonra death tableau'yu okumadan istemsiz retry tetiklenebiliyordu. Bu, hizli replay hedefini korusa da olumu anlamlandirma ve bilincli retry niyetini zedeliyordu.

Impact:
`project/game/src/game/GameScene.ts` game-over fazi icin ayri movement/pointer release guard'lari ekledi. Olum aninda aktif olan input yeniden deneme icin once release bekliyor; fresh `Space`/`Enter`/tap/click veya release sonrasi yeni move-input ile instant retry korunuyor. Retry hint metni de yeni davranisla hizalandi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample fresh retry'nin gereksiz sertlestigini veya deliberate held retry niyetinin fazla zorlandigini gosterirse yalnizca game-over retry release kosulu dar kapsamda yeniden ayarlanir; fairness, timing, browser-control, telemetry ve death-readability yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #111]

Decision:
Game-over tableau'da secilen fatal obstacle depth ve silhouette olarak da one cikarilacak; fatal olmayan obstacle'lar neutral state'e cekilecek.

Reason:
Bu tur `stabilization` modunda, audit'in kapattigi telemetry/copy/fairness zincirine donmeden yeni ama dar bir gameplay/readability kusuru secildi. Run #110 gercek killer'i secse bile `GameScene.ts` death freeze akisi fatal obstacle'i diger obstacle'larla ayni depth'te birakiyor ve fatal olmayan obstacle'larin scale state'ini normalize etmiyordu. Overlap anlarinda spawn-grace veya display-order kalintisi secilen killer silhouette'ini bulandirabiliyordu.

Impact:
`project/game/src/game/GameScene.ts` obstacle depth'ini ortak sabite tasidi. Death aninda fatal obstacle `depth=3` ile one aliniyor; fatal olmayan obstacle'lar `scale=1`, `alpha=0.24`, `depth=2` ile neutralize ediliyor; deactivate/reset akisi de obstacle depth'ini tekrar baseline'a indiriyor. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample yeni depth hiyerarsisinin overlap death tableau'sunu yapay, flickery veya fazla staged hissettirdigini gosterirse yalnizca death-time obstacle emphasis agirliklari dar kapsamda yeniden ayarlanir; fatal threat attribution, edge-callout, input, pause, timing, telemetry ve fairness yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #110]

Decision:
Ayni frame'de birden fazla obstacle overlap olursa fatal death attribution callback sirasina gore degil, gercek carpisma siddetine gore secilecek.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi input/pause/fairness/timing/telemetry zincirine geri donmeden yeni bir gameplay state-integrity kusuru secildi. `GameScene.ts` incelemesi overlap callback'inin ilk gelen obstacle'i dogrudan fatal kabul ettigini gosterdi. Ust uste binen obstacle anlarinda bu durum `FATAL LANE`, spotlight ve retry guidance'i gercek tehdide degil callback order'a baglayabiliyordu.

Impact:
`project/game/src/game/deathAttribution.ts` yeni fatal threat secim helper'ini ekledi. `project/game/src/game/GameScene.ts` artik o frame'de gercekten player ile overlap eden collision-ready obstacle'lari toplayip en derin overlap'i, esitlikte daha guclu closing vector'u secerek death tableau'yu buna bagliyor. `project/game/scripts/telemetry-check.ts` derin overlap ve esitlikte closing-vector secimi icin regression guard ekledi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample coklu-overlap death anlarinda yeni secimin oyuncunun gercek algiladigi threat ile ters dustugunu gosterirse yalnizca fatal threat scoring agirliklari dar kapsamda yeniden ayarlanir; input, pause, fairness, timing, telemetry, browser-control ve edge-callout yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #109]

Decision:
Death/readability callout'lari sol ve sag arena kenarinda yatay clamp ile tutulacak.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi input/pause/fairness/timing/telemetry zincirine geri donmeden yeni bir gameplay/UX kusuru secildi. Run #91 yalnizca dikey edge tasmasini kapatmisti; `GameScene.ts` incelemesi impact, fatal spotlight ve escape guide etiketlerinin merkezleri marker/spotlight noktasina sabit kaldigi icin genis `top-left` veya `break right` metinlerinin sol/sag kenarda arena disina tasabildigini gosterdi.

Impact:
`project/game/src/game/deathOverlayLayout.ts` yeni yatay callout clamp helper'i ekledi. `project/game/src/game/GameScene.ts` impact, fatal spotlight ve escape guide etiketlerini display width uzerinden arena icinde konumluyor. `project/game/scripts/telemetry-check.ts` sol edge, sag edge ve asiri genis label fallback assert'leri ekledi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manuel sample yatay clamp'in label/marker hiyerarsisini bozdugunu veya edge death anlarini daha karmasik hissettirdigini gosterirse yalnizca callout X clamp marjlari dar kapsamda yeniden ayarlanir; input, pause, fairness, timing, telemetry ve browser-control yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #108]

Decision:
Gameplay inputleri browser scroll ve touch pan jestlerinden izole edilecek.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi fairness/pause/timing mikro-zincirine geri donmeden dogrudan kontrol hissini bozan yeni bir web-runtime kusuru secildi. App kabugu `#app` uzerinde scroll barindiriyor; `Space`, ok tuslari ve touch drag jestleri browser seviyesinde ele alinabildigi icin keyboard start/move veya touch steering anlari panel/app scroll'una kacma riski tasiyordu.

Impact:
`project/game/src/game/GameScene.ts` gameplay tuslari icin Phaser keyboard capture ekledi. `project/game/src/style.css` `.game-root` ve `canvas` icin `touch-action: none` ve `overscroll-behavior: contain` guard'i ekledi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Manuel sample keyboard kisayollarinin beklenmedik sekilde baska UI davranislarini kilitledigini veya touch guard'in browser zoom/interaction beklentisini bozdugunu gosterirse yalnizca bu browser-control guard'i dar kapsamda yeniden ayarlanir; fairness, timing, telemetry ve HUD yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #107]

Decision:
Spawn denemesi baslamadan hemen once obstacle pool'u offscreen cull backlog'una karsi temizlenecek.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi input/pause/fairness/timing zincirine geri donmeden obstacle lifecycle tarafinda yeni ama dar bir runtime kusuru secildi. `GameScene.ts` incelemesi cull'un yalnizca `update()` icinde calistigini, fakat spawn timer callback'inin bir sonraki `update()`ten once tetiklenebildigini gosterdi. Bu durumda cull sinirini gecmis obstacle'lar bir frame daha aktif kalip spawn secimi ve pool doluluguna stale state tasiyabiliyordu.

Impact:
`project/game/src/game/GameScene.ts` artik `spawnObstacle()` basinda `cullObstacles()` cagiriyor. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manuel sample bu cleanup'in spawn ritmini goze carpar sekilde bosalttigini veya obstacle alanini beklenmedik sekilde hafiflettigini gosterirse yalnizca pre-spawn cull zamani dar kapsamda yeniden ayarlanir; input, pause, fairness, HUD ve validation yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #106]

Decision:
`paused` fazindaki active-run zaman sorgulari artik canli `time.now` yerine `pauseStartedAt` anina sabitlenecek.

Reason:
Bu tur `stabilization` modunda, audit'in yasakladigi ayni fairness/input/telemetry yuzeylerine geri donmeden dar bir runtime-state kusuru secildi. `GameScene.ts` incelemesi pause overlay'in "survival time ilerlemiyor" dedigini, fakat `getActiveRunElapsedMs()`in `paused` fazinda da canli zamani okumaya devam ettigini gosterdi. Bu, pause sirasinda runtime'in kendi zaman sorgulari ile oyuncuya verilen freeze vaadini ayni kaynaktan tasimayan gercek bir state-integrity acigiydi.

Impact:
`project/game/src/game/GameScene.ts` elapsed-time hesabinda `paused` fazinda `pauseStartedAt` referansini kullaniyor. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` yesil kaldi.

Rollback Condition:
Headed manuel sample pause/resume sonrasi survival clock continuity'sinin takildigini, cift saydigini veya resume aninda beklenmedik sicrama urettigini gosterirse yalnizca pause-time elapsed hesaplama dar kapsamda yeniden ayarlanir; input, fairness, HUD ve validation yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #105]

Decision:
Game-over aninda run state'i yalnizca obstacle velocity sifirlamakla yetinmeyecek; physics world, aktif spawn timer referansi ve pause-release state'i de temizlenerek death tableau gercekten dondurulacak.

Reason:
Runtime yine headed sample veremiyor ve audit ayni input/pause/fairness/validation zincirine geri donmeyi yasakliyor. `GameScene.ts` incelemesi olum aninda obstacle velocity'leri sifirlasa da physics world'u calir halde biraktigini, `nextSpawnTimer` referansini temizlemedigini ve pause release state'lerini yasatabildigini gosterdi. Bu, retry'nin ve death tableau'nun onceki run'dan state sarkitmadan tamamen kapandigini garanti etmeyen dar ama gercek bir gameplay state-integrity kusuruydu.

Impact:
`project/game/src/game/GameScene.ts` artik death aninda `physics.world.pause()` cagiriyor, `nextSpawnTimer` referansini `undefined` yapiyor ve pause/release cleanup'ini tamamliyor. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample game-over tableau'nun artik gereksiz sert, takili veya retry'e geciste sorunlu hissettigini gosterirse yalnizca death-time freeze cleanup'i dar kapsamda yeniden ayarlanir; input guards, timing, fairness ve telemetry/HUD semantigi bu bahaneyle tekrar acilmaz.

### [Run #104]

Decision:
Runtime spawn ve pause/death zaman kararlarinda frame-cache'li `survivalTime` yerine canli active-run saati kullanilacak.

Reason:
Headed runtime yine bloklu oldugu icin audit fallback olarak yeni ve dar bir gameplay problemi secilmeliydi. Source incelemesi `GameScene.ts` icinde spawn delay, spawn secimi, obstacle hiz/target-lag/collision-grace ve pause overlay/death kaydinin son `update()` frame'inden kalan `this.survivalTime` uzerinden okundugunu gosterdi. Bu, ozellikle `10s` ve `11s` grace fade esiklerinde, spawn timer callback'i veya focus-loss/death callback'i update'ten once geldiyse kararlarin bir frame geriden okunmasi riskini tasiyordu.

Impact:
`project/game/src/game/GameScene.ts` yeni canli run-time helper'i ile spawn delay, spawn secimi, obstacle velocity/grace, pause snapshot'i ve hit anindaki survival kaydini aktif run saatine bagladi. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample bu degisikligin `10-11s` bandinda spawn baskisini hissedilir sekilde sertlestirdigini, grace fade'i beklenmedik sekilde kisalttigini veya pause snapshot'ini oyuncuya tutarsiz gosterdigini kanitlarsa yalnizca canli run-time helper kullanimi dar kapsamda yeniden ayarlanir; input, HUD, telemetry/export ve opening-fairness yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #103]

Decision:
Pointer zaten basiliyken keyboard/Space veya movement-input ile baslatilan ya da resume edilen run'lar, pointer steering'i yeniden release-or-`180ms` guard'ina sokacak; deliberate held-pointer start/retry yolu ise aynen korunacak.

Reason:
Headed runtime hala bloklu ve audit ayni telemetry/HUD/fairness paketine donmeyi istemiyor. Source incelemesi `startRun()` ve `resumePausedRun()` akislarinin pointer halen down durumdayken aktivasyon kaynagini ayirt etmedigini gosterdi. Bu nedenle oyuncu klavye veya Space ile baslatmak/resume etmek isterken pointer ekranda basili kaldiginda run ayni frame'de istemsiz pointer steering'e kayabiliyordu; bu dar, gercek ve kontrol hissini bozan bir gameplay/input kusuruydu.

Impact:
`project/game/src/game/GameScene.ts` primary-action source'unu ayiriyor ve aktivasyon sonrasi pointer guard'ini sadece pointer basili kalan non-pointer veya neutral `tap/click` akislarinda yeniden kuruyor. Held-pointer start/retry/resume yolu ekstra ikinci bir bekleme almiyor. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manual sample bu guard'in keyboard/Space start-resume'u fazla agirlastirdigini veya deliberate held-pointer akisini kirip ekstra release zorladigini gosterirse yalnizca activation-source yorumu dar kapsamda yeniden ayarlanir; HUD/telemetry, opening fairness, edge-target clamp ve wall-pinned velocity yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #102]

Decision:
Duvara veya koseye yaslanmis oyuncunun artik devam edemeyecegi velocity bilesenleri spawn secimi oncesi yok sayilacak; projected-path forward-pressure ve lane-stack skorlamasi stale wall-velocity ile safe spawn'i reroll etmeyecek.

Reason:
Runtime yine headed sample veremiyor ve audit ayni input/pause, HUD/telemetry ve kapanmis fairness yuzeylerine donmeyi yasakliyor. Source incelemesi `selectSpawnPoint()`in oyuncu zaten arena marjina dayanmis olsa bile son velocity vektorunu tam haliyle kullanmaya devam ettigini gosterdi. Bu, ozellikle koseye itilmis diyagonal kacis anlarinda oyuncunun fiziksel olarak devam edemeyecegi bir duvar-yonunu hala aktif forward-pressure gibi sayip safe top spawn'i gereksiz reroll'e sokabilen gercek bir gameplay secim kusuruydu.

Impact:
`project/game/src/game/spawn.ts` yeni `playerReachabilityMargin` ile duvar tarafina kilitli velocity bilesenlerini sifirliyor. `project/game/src/game/GameScene.ts` runtime'da `PLAYER_COLLISION_RADIUS`, `project/game/scripts/telemetry-reports.ts` ise deterministic proxy'de `PLAYER_RADIUS` ile ayni davranisi kullaniyor. `project/game/scripts/telemetry-check.ts` yeni wall-pinned corner regression guard'i ekledi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Headed manual sample bu kirpmanin wall-hug/kose kacislarini fazla scriptli, yumusak veya exploit'e acik hale getirdigini gosterirse yalnizca wall-locked velocity yorumu dar kapsamda yeniden ayarlanir; input/pause, HUD/telemetry, opening-fairness helper'lari veya edge-target clamp yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #101]

Decision:
Obstacle spawn hedefleme noktasi, oyuncunun collider merkeziyle gercekte ulasabilecegi arena ic sinirlariyla clamp'lenecek; runtime ve deterministic proxy ayni reachable target alani uzerinden obstacle velocity hesaplayacak.

Reason:
Interactive runtime hala bloklu ve `AUDIT.md` ayni input/pause, telemetry/HUD ve opening-fairness helper paketine geri donmeyi yasakliyor. Kaynak incelemesi obstacle'larin spawn target lag hesabinda oyuncunun fiziksel olarak hic gidemeyecegi `x=0/800`, `y=0/600` uclarina nisan alabildigini gosterdi; oyuncu merkezi ise `PLAYER_COLLISION_RADIUS` nedeniyle bu koordinatlara ulasamiyor. Bu, ozellikle duvar kenarinda chase cizgilerini gereksiz sertlestiren gercek gameplay/pathing kusuruydu.

Impact:
`project/game/src/game/GameScene.ts` ve `project/game/scripts/telemetry-reports.ts` hedef noktayi artik erisilebilir arena icine clamp'liyor. `project/game/src/game/spawn.ts` ortak clamp helper'i sagliyor ve `project/game/scripts/telemetry-check.ts` bu reachable-edge davranisini regression guard altina aliyor. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `26.5s / 6.3s / 4%` degismedi.

Rollback Condition:
Host browser manuel sample'i duvar-kenari chase'in artik fazla yumusak, bos veya tehditsiz hissettigini gosterirse bu karar geri alinmadan once sadece reachable-margin yorumu dar kapsamda yeniden ayarlanir; input/pause veya opening-fairness helper paketine kayilmaz.

### [Run #100]

Decision:
Completed-run semantigi validation export ve HUD'dan sonra telemetry summary/log kontratina da tasindi; `buildTelemetrySummary()` artik `runs` alaninda tamamlanmis sample'i raporluyor, `startedRuns` ise ayri debug alani olarak korunuyor.

Reason:
Run #98-99 validation export ve in-game progress satirlarini `totalDeaths` tabanli completed-run sayisina hizaladi, fakat console/snapshot tarafinda kullanilan `buildTelemetrySummary()` hala `totalRuns` donduruyordu. Headed runtime bu ortamda bloklu oldugu ve audit ayni gameplay/input/HUD yuzeylerine geri donmeyi yasakladigi icin en guvenli dar `integration` hedefi bu kalan validation-integrity sizintisini kapatmakti.

Impact:
`project/game/src/game/telemetry.ts` icindeki `TelemetrySummary` yeni `startedRuns` alanini tasiyor; `runs` ise artik `getCompletedRunCount()` ile hizali. `project/game/scripts/telemetry-check.ts` yeni regression assert'i ile `totalRuns = 6`, `totalDeaths = 5` durumunda summary'nin `runs = 5`, `startedRuns = 6` kaldigini guard altina aliyor. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Sonraki manual sample veya telemetry review ham start girisinin oyuncu/analiz akisinda farkli bir contract ile gorunmesi gerektigini gosterirse `startedRuns` yeni bir ayrik alan olarak kalabilir; fakat completed-run semantigi `runs` alaninda tekrar `totalRuns`a dondurulmemelidir.

### [Run #99]

Decision:
In-game telemetry/progress satirlari validation export ile ayni completed-run semantigine hizalandi; waiting ve playing fazlari artik sample ilerlemesini `totalRuns` yerine `totalDeaths` uzerinden okuyor.

Reason:
Run #98 validation export kontratini dar kapsamda duzeltti, fakat `GameScene.ts` icindeki progress satirlari hala `Session runs ${totalRuns}` diyerek yarim kalmis veya yeni baslamis run'lari tamamlanmis sample gibi gosterebiliyordu. Bu, runtime blokluyken builder'in tekrar ayni telemetry/copy yuzeyine acilmadan kapatabilecegi gercek bir validation-integrity/UX bug'iydi.

Impact:
`project/game/src/game/telemetry.ts` yeni `getCompletedRunCount()` helper'ini ekledi. `project/game/src/game/GameScene.ts` playing ve waiting telemetry satirlarinda `Completed runs` semantigine gecti. `project/game/scripts/telemetry-check.ts` helper'in `totalRuns = 6`, `totalDeaths = 5` senaryosunda `5` completed run dondurmesini guard altina aldi. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Interactive sample veya sonraki UX review bu satirlarda started-attempt bilgisinin de oyuncu icin gerekli oldugunu gosterirse bu bilgi ayri bir started/completed ciftine acikca ayrilmalidir; completed-run semantigi `totalRuns`a geri dondurulmemelidir.

### [Run #98]

Decision:
Validation export `runs=` alani `totalRuns` yerine tamamlanmis sample sayisini (`totalDeaths`) raporlayacak sekilde dar kapsamda duzeltildi.

Reason:
Headed runtime bu ortamda yine bloklu ve audit fallback olarak yeni ama dar bir problem secilmesini istiyor. Bu tur ayni input/pause/fairness mikro-yuzeylerine geri donmek yasakti. Mevcut `buildValidationReport()` export'u `runs=` icin `totalRuns` kullaniyordu; bu da aktif veya yarim kalmis start'lar sonrasinda validation sample boyutunu sisirip export ozetini tamamlanmamis run'larla kirletebilecek gercek bir contract bug'iydi.

Impact:
`project/game/src/game/telemetry.ts` validation report'ta `runs=` alanini `totalDeaths` ile uretiyor. `project/game/scripts/telemetry-check.ts` yeni regression assert'i ile `totalRuns = 6`, `totalDeaths = 5` durumunda export'un yine `runs=5 | deaths=5` kalmasini guard altina aliyor. Deterministic checked baseline bilincli olarak degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Interactive sample veya sonraki export akis review'u "started attempts" bilgisinin ayri gorunmesi gerektigini kanitlarsa bu bilgi validation export'a degil ayri telemetry yuzeyine eklenmelidir; validation sample run sayisi yeniden `totalRuns`a dondurulmemelidir.

### [Run #97]

Decision:
Run #96'nin pointer start/retry steering guard'i dar kapsamda duzeltildi; discrete `tap/click` start hala neutral kalirken steering kilidi artik pointer release geldigi anda veya ayni press bilincli held-start esigini (`180ms`) gectiginde aciliyor.

Reason:
Audit governance ayni input yuzeyine tekrar donmeyi istemiyordu, fakat source incelemesi Run #96'nin canli bir kontrol regresyonu biraktigini gosterdi. `handlePointerPrimaryAction()` waiting/game-over pointerdown'unda `pointerSteeringNeedsRelease` gard'ini kuruyor, ama `updatePlayerVelocity()` bu gard'i playing fazinda pointer release ile temizlemiyordu; ayni degisiklik intentional held-pointer start/retry akisini da fiilen bloke ediyordu. Bu, pointer/touch oyuncusu icin run boyunca steering'in kilitli kalabildigi gercek bir urun arizasiydi.

Impact:
`project/game/src/game/GameScene.ts` pointer ile baslatilan veya retry edilen run'larda steering guard'ina zaman damgasi ekliyor. Playing update'i artik pointer release'te gard'i temizliyor; pointer basili kalmaya devam ederse `180ms` sonra deliberate hold-to-steer akisini yeniden aktive ediyor. Boylece neutral tap/click start korunurken Run #96'nin lock-state regresyonu kapanmis oldu. Deterministic checked baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample bu degisikligin pointer/touch oyuncusunda tap/click start'i tekrar istemsiz steering'e cevirdigini veya `180ms` held re-arm'in fazla gec hissettirdigini gosterirse yalnizca pointer start/retry steering arm kosulu dar kapsamda yeniden ayarlanir; opener fairness, HUD, death guidance ve focus-loss resume yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #96]

Decision:
Waiting veya game-over ekranindan pointer ile yapilan tek `tap/click` primary action artik run'i baslatabilir ama ayni basisi steering olarak devralmaz; pointer steering ancak release sonrasi veya intentional held-start yolunda aktif olur.

Reason:
`AUDIT.md` interactive runtime yokken builder'in ayni pause/resume veya telemetry/copy yuzeylerine geri donmesini yasakliyor ve yeni, dar bir gameplay problemi secmesini istiyor. Source incelemesi pointer `handlePointerPrimaryAction()` yolunun waiting/game-over fazinda run'i hemen baslatirken ayni frame icinde pointer steering'i de aktif birakabildigini gosterdi. Bu, oyuncunun sadece start/retry niyetiyle yaptigi tap/click'in oyuncuyu HUD ya da click noktasina dogru istemsizce kaydirabilen gercek bir control/friction bug'iydi.

Impact:
`project/game/src/game/GameScene.ts` pointer-tabanli start/retry sonrasi `pointerSteeringNeedsRelease` guard'i kuruyor. Discrete tap/click baslangici steering'i pointer release gorene kadar bekletirken intentional held-pointer start/retry akisi korunuyor. Deterministic checked baseline bilincli olarak degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample bu degisikligin pointer/touch oyuncusunda start veya retry anini gereksiz yavaslattigini, hold-to-steer niyetini bozdugunu veya ikinci aksiyon zorunlulugu hissettirdigini gosterirse yalnizca pointer start steering guard'i dar kapsamda yeniden ayarlanir; focus-loss resume, telemetry/copy, compact HUD ve opener fairness yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #95]

Decision:
Focus-loss pause sonrasinda blur aninda hic movement input yoksa ilk keyboard movement resume basisi stale-held gibi gecikmeyecek; `movementInputWasActive` pause anindaki gercek input durumuyla korunacak.

Reason:
`AUDIT.md` runtime blokluyken builder'in docs/tooling veya fairness/copy churn'una donmesini yasakliyor. Headed sample yine yoktu; bu nedenle tek dar product hedefi secildi. Source incelemesi `pauseRunForFocusLoss()` icinde `movementInputWasActive` alaninin kosulsuz `true` yapildigini gosterdi. Bu, blur aninda hic yon tusu basili olmasa bile refocus sonrasi ilk bilincli movement press'ini fresh input yerine held path'ine itip gereksiz `180ms` gecikme yaratabiliyordu.

Impact:
`project/game/src/game/GameScene.ts` focus-loss pause sirasinda `movementInputWasActive` degerini gercek `movementInputActive` snapshot'ina esitledi. Boylece yalnizca blur sirasinda gercekten basili kalan tuslar release guard'ina takiliyor; fresh keyboard resume yeniden anlik tepki veriyor. Deterministic checked baseline bilincli olarak degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample bu degisikligin focus-loss sonrasinda keyboard resume'i fazla agresiflestirdigini veya unintended auto-resume yarattigini gosterirse yalnizca focus-loss movement-input hafizasi dar kapsamda yeniden ayarlanir; telemetry/copy, opener fairness ve diger pause/input yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #94]

Decision:
Waiting ve game-over telemetry HUD'u daraltildi; support strip telemetry-first yerine oyuncu-first olacak sekilde sadeleştirildi.

Reason:
`AUDIT.md` runtime bloklu builder turunun ayni pause/input, fairness veya death-guidance mikro-yuzeylerine geri donmesini yasakliyor. Run #79-93 hatti source'ta gercek urun davranisi duzeltmeleri getirdi, fakat waiting fazinda telemetry blogu halen ilk bakista fazla kalabalik kalip validation/progress ayrintilarini oyuncu kontrol ve replay hedefinin onune koyuyordu. Bu tur yeni ama dar gameplay/UX problemi olarak HUD clutter secildi.

Impact:
`project/game/src/game/GameScene.ts` waiting ve game-over telemetry bloklarini daha kompakt, tekrar etmeyen satirlara indirdi; `Last export` yalnizca mevcutsa ozetleniyor, ilk sample oncesi oyuncuya `5-run sample` hedefi net veriliyor. Ayni dosyada support strip artik `break 10s, then chase your best` hedefini onceleyip hotkey'leri ikinci plana aliyor. Deterministic checked baseline bilincli olarak degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample compact telemetry blogunun validation/export affordance'larini fazla gizledigini veya support strip'in replay niyetini zayiflattigini gosterirse yalnizca bu HUD hiyerarsisi dar kapsamda yeniden ayarlanir; pause/input, opener fairness, visible-arena fairness, death guidance ve public copy yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #93]

Decision:
Centered overlap death'lerde velocity fallback ile sahte lane uretmek yerine gercek `center` sonucu korundu; death overlay/callout copy'si ve retry guidance bu merkez durumuna hizalandi.

Reason:
Runtime hala bloklu oldugu icin audit governance'i builder'in yeni ama dar bir gameplay/UX problemi secmesini istiyordu. Run #91 edge-safe death callout placement'i kapatti, fakat `impactDirection` overlap tam merkezdeyken `top/bottom` gibi yapay bir lane uretebiliyordu. Bu da ayni game-over ekraninda bir yandan `center` benzeri bir overlap durumu yasatirken diger yandan oyuncuya uydurma bir kacis yonu soyletme riski tasiyordu.

Impact:
`project/game/src/game/impactDirection.ts` artik her iki eksende de merkez-overlap durumunda dogrudan `center` donduruyor. `project/game/src/game/GameScene.ts` center death'lerde ray yerine merkez marker gosteriyor, `CENTER COLLISION` / `Caught at center` copy'sini kullaniyor ve retry prompt'unu tekrar `RESET CENTER` fallback'ine indiriyor. `project/game/scripts/telemetry-check.ts` yeni centered overlap guard'i ile bu davranisi koruyor. Deterministic checked aggregate baseline degismedi: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample center-overlap death'lerde yeni marker/copy'nin fazla belirsiz kaldigini veya oyuncuya hic yon hissi vermedigini gosterirse yalnizca bu center fallback presentation'i dar kapsamda yeniden ayarlanir; pause/input, visible-arena fairness, `20s+` chase ve telemetry/copy yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #92]

Decision:
`10s` helper cliff'ini yumusatmak icin early spawn collision grace bir anda sifira dusmek yerine `10-11s` arasinda lineer fade ile kapatildi; spawn target-lag ve diger fairness/readability yuzeyleri sabit birakildi.

Reason:
`AUDIT.md` runtime bloklu builder turunun ayni pause/input, `20s+` chase veya visible-arena/death-readability mikro-yuzeylerine donmesini yasakliyor; fallback yeni ve dar bir gameplay problemi olmali. Deterministic snapshot'ta seed `#7` tam `10.0s`'de oluyordu ve mevcut balance kodu hem target-lag hem collision grace yardimini keskin sekilde `10s`te bitiriyordu. Ilk denemede her iki helper'i uzatmak aggregate baseline'i bozdu; bu nedenle daraltilarak yalnizca collision grace icin kucuk bir fade secildi.

Impact:
`project/game/src/game/balance.ts` artik `10s`e kadar `260ms` grace veriyor, `10.5s`te `130ms`e iniyor ve `11s`te `0ms` oluyor. `project/game/scripts/telemetry-check.ts` bu fade'i yeni assert'lerle guard altina aldi. Deterministic checked aggregate baseline korundu: `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample `10-11s` penceresinde yeni spawn'larin gereksiz "ghosty" hissettigini veya cheap touch yerine bosluk hissi urettiğini gosterirse yalnizca fade araligi dar kapsamda yeniden ayarlanir; pause/input, visible-arena hit, death readability, telemetry/copy ve `20s+` chase yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #91]

Decision:
Death-readability callout'lari arena kenarina gore yukari/asagi yer degistirecek sekilde edge-aware yapildi; top-edge impact label ve bottom-edge killer label artik ekran disina tasimiyor.

Reason:
`AUDIT.md` runtime bloklu turda ayni pause/input/fairness mikro-yuzeylerine donmeyi ve public copy churn'unu yasakliyor. Buna karsin death readability halen fallback icin uygun dar gameplay/UX alanlarindan biriydi. Mevcut `GameScene.ts` impact marker label'ini sabit olarak marker'in ustune, killer label'ini da sabit olarak spotlight'in ustune koyuyordu; top/bottom edge olumlerinde bu callout'lar kismen arena disina tasip tam okunurlugu bozabiliyordu.

Impact:
`project/game/src/game/deathOverlayLayout.ts` saf bir dikey yerlesim helper'i ekledi. `project/game/src/game/GameScene.ts` impact ve fatal callout'lari bu helper ile arena icinde tutuyor. `project/game/scripts/telemetry-check.ts` top-edge impact ve bottom-edge fatal placement guard'lari ekledi. Deterministic checked baseline korunarak `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample yeni callout yer degistirme davranisinin top/bottom edge olumlerinde ray/marker hiyerarsisini daha da karmasiklastirdigini gosterirse yalnizca label gap/min-max placement degerleri dar kapsamda yeniden ayarlanir; pause/input, opener fairness, telemetry/export ve public copy yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #90]

Decision:
Obstacle cull sadece `playing` fazinda calisacak sekilde daraltildi; focus-loss pause ve game-over freeze sirasinda obstacle lifecycle arka planda degismiyor.

Reason:
`AUDIT.md` runtime bloklu builder turunu ayni pause/input mikro-fix zincirine veya visible-arena fairness helper'larina geri dondurmeyi yasakliyor, ama obstacle reuse/cull tarafinda dar bir gameplay problemi secmeye izin veriyor. Mevcut `GameScene.ts` her frame `cullObstacles()` cagiriyordu; bu da pause overlay'i acikken veya death tableau ekrandayken bile offscreen obstacle'larin pool'a geri dusmesine izin verip "run frozen" vaadiyle sessizce celisiyordu.

Impact:
`project/game/src/game/GameScene.ts` cull adimini `phase === 'playing'` guard'inin arkasina tasidi. Runtime freeze semantigi obstacle lifecycle tarafinda daha durust hale geldi; deterministic checked baseline bilincl olarak degismedi: `26.5s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample bu degisikligin pause/game-over ekranlarinda beklenmedik obstacle birikimi, gorunur artifact veya retry sonrasi pool davranisinda bozulma yarattigini gosterirse yalnizca cull faz kosulu dar kapsamda yeniden ayarlanir; telemetry/copy, input akislari ve opening-fairness helper'lari bu bahaneyle tekrar acilmaz.

### [Run #89]

Decision:
Early lane-stack spawn filtresi, yakindaki obstacle'i "visible pressure" olarak saymadan once obstacle collider'inin `11px` yaricapla tamamen arena icine girmesini bekleyecek sekilde daraltildi.

Reason:
`AUDIT.md` runtime bloklu builder turunun ayni pause/resume, telemetry/copy veya gec-chase tuning zincirine donmesini yasakliyor; fallback ancak yeni ve dar bir gameplay problemi olabilir. Run #88 runtime hit guard'ini tam-gorunur collider mantigina tasimisken `spawn.ts` lane-stack filtresi halen merkez arena icine giren edge obstacle'lari baski kaynagi sayiyordu. Bu da oyuncunun henuz tam okuyamadigi partial-visible edge obstacle icin gereksiz reroll baskisi uretip runtime collision semantigi ile spawn-selection semantigi arasinda drift birakiyordu.

Impact:
`project/game/src/game/spawn.ts` lane-stack visibility kontrolunu `11px` margin ile hizaladi ve `OBSTACLE_COLLISION_RADIUS` tek kaynak haline getirildi. `project/game/src/game/GameScene.ts`, `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` ayni sabiti kullaniyor. Yeni regression guard'i `x=789` tam gorunur edge obstacle'in reroll tetikleyebildigini, `x=799` partial-visible obstacle'in ise artik tetiklemedigini assert ediyor. Deterministic checked baseline korundu: `26.5s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample tam-gorunur lane-stack visibility esiginin arena kenarinda spawn cesitliligini gereksiz yumusattigini veya duvar-kacisi baskisini fazla gec gosterdigini kanitlarsa yeni helper katmani acmadan yalnizca visibility margin dar kapsamda yeniden ayarlanir; telemetry/copy, pause/input ve `20s+` chase yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #88]

Decision:
`collider/offscreen fairness` yuzeyinde obstacle overlap guard'i merkez tabanli kontrol yerine `11px` collider yaricapinin tamamiyla arena icinde olmasini bekleyecek sekilde daraltildi; deterministic survival proxy ayni kuralla hizalandi.

Reason:
`AUDIT.md` runtime bloklu builder turunun ya manuel sample toplamasini ya da yeni ve dar bir gameplay problemi secmesini istiyordu; pause/resume/input veya telemetry/copy yuzeyine donus yasakti. Mevcut `visible-arena hit guard` obstacle merkezi arena sinirini gecer gecmez overlap'a izin veriyordu; bu da collider ve sprite tam gorunmeden "ilk piksel" temasina alan acabiliyordu. Bu, pacingi acmadan kapatilabilecek gercek bir fairness bug'iydi.

Impact:
`project/game/src/game/spawn.ts` arena containment helper'ini opsiyonel margin ile genisletti. `project/game/src/game/GameScene.ts` runtime hit guard'ini `11px` margin ile kullaniyor; `project/game/scripts/telemetry-reports.ts` ayni marji deterministic proxy ve rapor metnine tasiyor; `project/game/scripts/telemetry-check.ts` yeni margin assert'leri ve buna bagli seed `#3` visible obstacle trace farkini guard altina aliyor. Deterministic aggregate baseline korunuyor: `26.5s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample yeni `11px visible-arena hit margin` kuralinin arena kenarinda temasi fazla geciktirip kacislari "ghosty" hissettirdigini gosterirse yeni fairness katmani acmadan yalnizca hit-margin esigi dar kapsamda yeniden ayarlanir; spawn pacing, telemetry wording ve pause/input yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #87]

Decision:
`20s+` obstacle hiz egimi dar kapsamda `3.6`dan `3.62`ye cekildi; hedef gec oyunda fazla artan `30s` cap rahatligini biraz azaltmakti.

Reason:
`AUDIT.md` runtime bloklu builder turunun ya manuel sample toplamasini ya da yeni ve dar bir gameplay problemi secmesini istiyordu; ayni opener fairness veya pause/input mikro-yuzeyine donus yasakti. Mevcut deterministic dagilim `18/24` adet `30s` cap veriyordu ve oyun tasarimi acisindan `30s` bandinin "challenge" yerine biraz fazla bagislayici kalabildigine isaret ediyordu. Bu nedenle yeni katman acmadan, yalnizca `20s+` chase baskisini cok kucuk bir kademe arttirmak secildi.

Impact:
`project/game/src/game/balance.ts` yalnizca `20s+` slope'u `3.62` yapti; hiz anchor'lari efektif olarak `145 / 183 / 217 / 253 / 308 / 320` oldu. `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni checked baseline ile hizalandi. Deterministic snapshot artik `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17`, average spawn count `28.0`, average reroll `0.4`. `npm run telemetry:check`, `npm run telemetry:validation-snapshot` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample Run #87 ayarinin `20s+` chase'i daha heyecanli degil daha sert veya "cheap" hissettirdigini gosterirse yeni sistem acmadan yalnizca `20-45s` hiz anchor'lari dar kapsamda geri yumulatilir; opener fairness, telemetry wording ve pause/input yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #86]

Decision:
Focus-loss pause sirasinda aktif obstacle spawn-grace tween'leri de duraklatilip resume'da devam ettirilecek; spawn onboarding gorseli artik freeze-state boyunca duvar saatiyle akmayacak.

Reason:
`AUDIT.md` bu runtime blokluyken ayni pause/resume/held-input mikro-fix zincirine geri donmeyi yasakliyor ama fallback olarak dar gameplay/UX source bug'i secmeye izin veriyor. Mevcut source'ta collision-grace unlock'u Run #72 ile aktif run elapsed zamanina baglanmisti; buna ragmen obstacle'in alpha/scale onboarding tween'i focus-loss pause sirasinda akmaya devam ederek "run frozen" vaadini gorsel tarafta bozabiliyordu. Bu, input mantigini buyutmeden obstacle readability/lifecycle tarafinda kapatilabilir gercek bir runtime uyumsuzluguydu.

Impact:
`project/game/src/game/GameScene.ts` obstacle bazli `spawnGraceTween` referansi sakliyor; pause aninda aktif obstacle grace tween'lerini `pause()`, resume'da `resume()` ediyor ve deactivate/reset akisinda referansi temizliyor. Deterministic aggregate baseline bilincli olarak korunuyor: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample spawn-grace tween pause/resume davranisinin obstacle spawn'larini takiliyor, cift-animasyonlu veya bitmeyen fade durumuna soktugunu gosterirse yeni katman acmadan yalnizca obstacle grace tween yasam dongusu dar kapsamda yeniden ayarlanir; telemetry/copy veya ayni input/pause seremonisi bu bahaneyle tekrar acilmaz.

### [Run #85]

Decision:
Death direction / retry guidance artik obstacle'in dunya hizindan once impact anindaki goreli konuma gore etiketleniyor; overlap merkezdeyse velocity fallback'i korundu.

Reason:
`AUDIT.md` bu runtime blokluyken ayni opener fairness zincirine donmeyi yasakliyor ve fallback'i `20s+ chase / obstacle reuse / collider readability` tarafinda dar bir product bug'ina yonlendiriyor. Mevcut `GameScene.ts` hit-direction mantigi yalnizca obstacle velocity sign'ina bakiyordu; bu da oyuncunun ayni yone giden obstacle'a yetistigi chase/catch-up carpismalarinda `FATAL LANE` ve retry prompt'unu ters yone yazip olum okunurlugunu bozabiliyordu.

Impact:
`project/game/src/game/impactDirection.ts` saf helper'i impact konumunu onceleyip velocity'yi yalnizca merkez-overlap fallback'i olarak kullaniyor. `project/game/src/game/GameScene.ts` game-over overlay, fatal callout ve escape prompt'u bu helper'a tasindi. `project/game/scripts/telemetry-check.ts` ayni-yon chase carpismasi ve merkez-overlap velocity fallback'i icin regression assert'leri ekledi. Deterministic aggregate baseline bilincli olarak korunuyor: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample yeni death-direction mantiginin diagonal veya centerline carpismalarinda oyuncuya daha kotu guidance verdigini gosterirse yeni readability katmani acmadan yalnizca position/velocity esikleri dar kapsamda yeniden ayarlanir; telemetry/copy veya opener fairness yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #84]

Decision:
Projected-path spawn referansi arena sinirlari icine clamp'lendi; duvar-kenari kacis anlarinda spawn secimi arena disindaki hayali bosluga gore karar vermiyor.

Reason:
`AUDIT.md` bu runtime blokluysa pause/resume/input mikro-fix zincirine veya telemetry/copy/readability churn'una donmeyi yasakliyor. `NEXT_AGENT.md` fallback'i Run #83'ün komsu bir source bug'ini secmeye izin veriyordu. Mevcut `projected-path` hesabi oyuncunun velocity projeksiyonunu arena disina tasirabiliyor; bu da duvara yaslanmis oyuncu icin solda/sagda gercekte kullanamayacagi bir boslugu guvenli kacis lane'i gibi puanlayarak yakindaki tehdit baskisini eksik hesaplayabiliyordu.

Impact:
`project/game/src/game/spawn.ts` icinde projected-path referansi yeni helper ile arena icine clamp'lendi. `project/game/scripts/telemetry-check.ts` duvar-kenari bir sentetik secim senaryosunda tehlikeli sol spawn'in artik reroll'e dusup sag guvenli lane'in secildigini assert ediyor. Deterministic aggregate baseline bilincli olarak korunuyor: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample veya sonraki deterministic guard'lar bu clamp'in arena kenarinda spawn cesitliligini gereksiz sertlestirdigini gosterirse yeni fairness helper katmani acmadan yalnizca projected-path clamp davranisi dar kapsamda yeniden ayarlanir; telemetry/copy veya pause/input yuzeyleri bu bahaneyle tekrar acilmaz.

### [Run #83]

Decision:
Early forward-pressure spawn penalty oyuncunun anlik merkezinden degil, mevcut velocity'nin `0.18s` projected path referansindan hesaplanacak sekilde hizalandi.

Reason:
`AUDIT.md` bu turda runtime yoksa pause/resume/input mikro-fix zincirine geri donmeyi ve telemetry/copy/readability churn'unu yasakliyordu. Yeni ve dar gameplay problemi olarak early spawn secimindeki forward-pressure hesabinin hala anlik pozisyona bakmasi secildi. Bu, projected-path lane-stack filtresiyle ayni referansi kullanmadigi icin aktif soldan/sagdan kacis anlarinda guvenli edge spawn'lari gereksiz reroll'e itebiliyordu.

Impact:
`project/game/src/game/spawn.ts` forward-alignment scoring'i projected-path referansina tasidi; `project/game/scripts/telemetry-reports.ts` controller aciklamasi bu davranisla hizalandi; `project/game/scripts/telemetry-check.ts` dar bir opener senaryosunda guvenli left-edge spawn'in artik reroll'e dusmedigini assert ediyor. Aggregate deterministic baseline bilincli olarak korunuyor: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample projected-path forward referansinin opener'i fazla yumusattigini, spawn cesitliligini yapaylastirdigini veya oyuncu hareketinin "kovalamayi arkasinda birakma" hissini bozdugunu gosterirse yeni helper katmani acmadan yalnizca forward-pressure referans noktasi dar kapsamda yeniden ayarlanir; telemetry/copy ya da ayni input/pause yuzeyi bu bahaneyle tekrar acilmaz.

### [Run #82]

Decision:
Focus-loss pause sonrasinda basili kalan hareket tusunun eski input ile otomatik resume yaratmasini engellemek icin paused held-movement yolu "release sonra yeni press/hold" gard'i ile daraltildi.

Reason:
`AUDIT.md` bu turda headed sample yoksa telemetry/copy/readability ya da opening-fairness hattina donmeyi yasakliyordu. `NEXT_AGENT.md` fallback'i focus-loss pause sonrasi keyboard held resume davranisini dar kapsamda incelemeyi oneriyordu. Source'ta pointer/touch refocus click'i icin guard varken, pause aninda zaten basili olan hareket input'u pencereye donuldugunde `180ms` sonra run'i tekrar baslatabiliyordu; bu da oyuncu yeni bir karar vermeden accidental auto-resume uretebilecek gercek bir UX acigiydi.

Impact:
`project/game/src/game/GameScene.ts` focus-loss aninda aktif hareket input'u varsa `pauseResumeNeedsMovementRelease` gard'i kuruyor; paused held-movement yolu release gorene kadar arm olmuyor. Fresh keyboard press resume davranisi korunuyor, pointer release guard'i ile daha tutarli bir pause UX elde ediliyor. Deterministic baseline bilincli olarak degismedi: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample yeni guard'in keyboard oyuncusunda pause-resume'u gereksiz yavaslattigini veya beklenmedik stuck-state yarattigini gosterirse yeni orchestration/readiness katmani acmadan yalnizca movement release arming kosulu dar kapsamda yeniden ayarlanir; telemetry/copy ya da opening-fairness yuzeyleri bu bahaneyle acilmaz.

### [Run #81]

Decision:
Focus-loss pause sonrasinda pointer ile accidental auto-resume riskini kapatmak icin paused pointer primary-action yolu "release sonra yeni tap/hold" gard'i ile daraltildi.

Reason:
`AUDIT.md` bu turda headed sample yoksa telemetry/copy/readability veya ayni opening-fairness paketine donmeyi yasakliyordu. `NEXT_AGENT.md` fallback'i focus-loss pause/resume sonrasinda held pointer veya movement input'un accidental auto-resume riskini incelemeyi oneriyordu. Mevcut source'ta pencereyi yeniden odaklamak icin yapilan ilk pointer `click/tap`, paused durumunda dogrudan `pointerdown` olarak yakalanip run'i ayni aksiyonda resume edebiliyordu; bu da oyuncuya istemsiz devam hissi verebilecek dar ama gercek bir UX bug'iydi.

Impact:
`project/game/src/game/GameScene.ts` paused pointer primary-action'i artik once pointer release gorene kadar ignore ediyor; focus-loss sonrasinda ilk refocus click'i yalnizca odagi geri getiriyor, resume icin ikinci tap/click veya yeni held pointer gerekiyor. Keyboard fresh/held resume yolu korunuyor. Deterministic baseline bilincli olarak degismedi: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample yeni guard'in pointer/touch oyuncusunda resume'i gereksiz iki aksiyona boldugunu veya held pointer resume hissini bozdugunu gosterirse yeni orchestration/readiness katmani acmadan yalnizca pause sonrasi pointer-arming kosulu dar kapsamda yeniden ayarlanir; telemetry/copy veya opening-fairness yuzeyleri bu bahaneyle acilmaz.

### [Run #80]

Decision:
Pooled obstacle reuse/cull/reset akisinda stale tween'lerin yeni spawn'a tasinmasini engellemek icin obstacle lifecycle temizligi ortak `deactivateObstacle()` yoluna toplandi.

Reason:
`AUDIT.md` bu turda manuel sample yoksa telemetry/copy/readability veya ayni opening-fairness paketine geri donmeyi yasakliyordu. Headed runtime yine blokluydu. `NEXT_AGENT.md` fallback'i pooled obstacle reuse/cull sirasinda stale tween tasinmasini incelemeyi oneriyordu. Mevcut source'ta spawn collision-grace tween'i obstacle cull/reset/death durumlarinda oldurulmuyordu; pool'dan yeniden alinan obstacle eski alpha/scale tween'ini tasiyip gorunur davranis drift'i uretebilirdi.

Impact:
`project/game/src/game/GameScene.ts` spawn oncesi obstacle tween'lerini olduruyor; cull ve reset akislari ortak `deactivateObstacle()` helper'i ile tween/data/visual state'i sifirliyor; death freeze de obstacle tween'lerini durdurup fatal/non-fatal presentation'i temiz baseline'dan kuruyor. Deterministic baseline bilincli olarak degismedi: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample reuse edilen obstacle'larda gorunur pop, gec alpha gecisi veya beklenmeyen fade davranisi gosterirse helper kaldirilmadan once yalnizca obstacle reset prezentasyonu dar kapsamda ayarlanir; yeni orchestration/readiness katmani acilmaz.

### [Run #79]

Decision:
Primary-action girisi `activatePrimaryAction()` altinda birlestirildi; movement-key veya held-input ile baslayan/resume olan run'lar da artik Space/Enter/tap ile ayni audio unlock yolunu kullaniyor.

Reason:
Stratejik yon ve `AUDIT.md` governance'i bu turda telemetry/copy/readability churn'unu ve ayni fairness paketine donmeyi yasakliyordu. Headed manual sample yine blokluydu. Mevcut source icinde gercek bir UX bug'i vardi: movement-key ile baslayan run'larda `unlockFeedbackAudio()` hic cagrilmadigi icin death feedback sesi ilk elden kilitli kalabiliyordu. Bu, replay/start akisini etkileyen dar bir stabilization problemiydi.

Impact:
`project/game/src/game/GameScene.ts` waiting/gameOver/paused fazlarindaki update-tabanli movement/held input tetiklerini `activatePrimaryAction()` uzerinden yonetiyor. `handlePrimaryAction()` da ayni yolu kullandigi icin Space/Enter/tap ve movement-key baslangiclari audio unlock parity kazandi. Deterministic baseline bilincli olarak degismedi: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Manual sample movement-key ile baslayan run'larda accidental start/resume veya beklenmeyen audio davranisi gosterirse ayri input kollari geri acilmadan once `activatePrimaryAction()` icindeki faz kosullari dar kapsamda yeniden ayarlanir; telemetry/copy veya fairness helper'lari bu bahaneyle acilmaz.

### [Run #78]

Decision:
Early lane-stack spawn hesabi oyuncunun anlik konumu yerine mevcut velocity'nin `0.18s` projected path'i uzerinden yapildi; deterministic survival guard'lari korunurken opener spawn reroll churn'u azaltildi.

Reason:
`AUDIT.md` verdict'i `warning`; copy/telemetry/tooling ve ayni fairness helper setini tekrar acmak yasakti. Headed runtime yine bloklu oldugu icin insan sample toplanamadi. Seed `#3` outlier'ini hareket ettiren daha agresif lane-stack penalty denemeleri diger seed'lerde regress etti. Guvenli kalan dar gameplay adimi, mevcut lane-stack mantigini yeni penalty katmani eklemeden oyuncunun cok kisa hareket projeksiyonuna yaslayip gereksiz reroll'lari azaltmakti.

Impact:
`project/game/src/game/spawn.ts` lane-stack hizasini `EARLY_SPAWN_TARGET_LAG_SECONDS` kadar ileri projeksiyonla hesapliyor. `project/game/scripts/telemetry-reports.ts` controller aciklamasi projected-path lane-stack diline guncellendi, `project/game/scripts/telemetry-check.ts` checked reroll baseline'ini `0.4`e cekti. Deterministic survival snapshot ana guard'lari korudu: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`; average spawn reroll `0.5`ten `0.4`e indi. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Headed manual sample projected-path lane-stack'in spawn cesitliligini oyuncu tarafinda yapaylastirdigini veya opener baskisini hissedilir sekilde yumusattigini gosterirse yeni penalty katmani eklemeden yalnizca lane-stack referans noktasi tekrar anlik pozisyona alinabilir; copy/tooling veya opening-fairness helper'lari bu bahaneyle tekrar acilmaz.

### [Run #77]

Decision:
Headed runtime bloklu kaldigi icin yeni gameplay tuning'i zorlamadan once seed `#3` deterministic outlier'i mevcut telemetry-report/check yuzeyinde sabit bir trajectory trace olarak kilitlendi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry wording, public copy, readability ve yeni readiness/preflight katmani yasakti. Bu runtime'da halen interactive headed browser yoktu. Seed `#3` icin yapilan dar spawn-selection denemeleri deterministic guard setini bozdu; bu nedenle ayni `6.3s` olumu ureten ilk alti spawn zincirini mevcut deterministic check icinde acikca sabitlemek daha guvenli ve bir sonraki gameplay turunu hizlandiracak bir adimdi.

Impact:
`project/game/scripts/telemetry-reports.ts` icine mevcut survival sim'ini yeniden kullanarak `createSeedTrajectoryReport()` helper'i eklendi. `project/game/scripts/telemetry-check.ts` seed `#3` icin `6.3s` death, `6 spawn / 0 reroll`, ilk alti spawnin `0.9 / 1.9 / 3.0 / 4.0 / 5.0 / 6.0` saniye zincirini ve `spawn#4`te `86.3px`, `spawn#6`da `81.4px` en yakin gorunur obstacle baskisini assert ediyor. Gameplay davranisi ve checked baseline bilincli olarak degistirilmedi: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Eger seed trajectory trace'i bir sonraki gameplay turlerinde fazla kirilgan bulunursa helper kaldirilmadan once yalnizca trace alanlari sadeleştirilir; ayri bir validation/readiness katmani acilmaz.

### [Run #76]

Decision:
Early lane-stack spawn filtresi yalnizca arena icine girmis obstacle'lari dikkate alacak sekilde daraltildi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability ve opening-fairness helper'larina geri donmek yasakti. Headed browser/runtime bu ortamda hala yoktu; bu nedenle manuel sample toplanamadi. Seed `#3` outlier'i icin yapilan parametrik taramalar guvenli bir deterministic iyilesme vermedi. Buna karsin mevcut lane-stack mantiginin henuz arena icine girmemis obstacle'lari da yakin tehdit gibi sayabilmesi, oyuncu tarafinda gorunmez baski yaratabilecek dar bir gameplay bug'iydi.

Impact:
`project/game/src/game/spawn.ts` icindeki lane-stack cezasi artik `isPointInsideArena` guard'i ile yalnizca gorunur obstacle'lara uygulanıyor. `project/game/scripts/telemetry-check.ts` sentetik spawn secim assert'leri ile offscreen obstacle'in reroll tetiklememesini ve visible varyantin halen tetikleyebilmesini regression guard altina aldi. Deterministic survival ve validation baseline'i bilincli olarak degismedi: `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18`. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i arena kenarina yakin acilista spawn cesitliliginin gereksiz sertlestigini veya gorunur tehditler girdikten sonra lane-stack korumasinin gec davrandigini gosterirse guard tamamen geri alinmadan once yalnizca "visible" kosulu ile distance esigi birlikte dar kapsamda yeniden ayarlanir; copy/tooling veya opening-fairness helper'lari bu bahaneyle tekrar acilmaz.

### [Run #75]

Decision:
`20s+` obstacle hiz egimi `3.7`den `3.6`ya cekildi; opener ve early fairness paketine dokunmadan gec-midgame chase biraz yumusatildi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability ve opening-fairness helper'larina geri donmek yasakti. Bu runtime'da `DISPLAY` ve `WAYLAND_DISPLAY` hala olmadigi icin headed manual sample yine blokluydu. Seed `#3` outlier'i icin denenen sert crowd/intercept reject fikirleri deterministic guard setini bozdu; buna karsin mevcut forward-pressure + lane-stack filtreleriyle birlikte yalnizca `20s+` hiz egimini bir kademe yumusatmak yeni tooling katmani acmadan `20-30s` kuyruğunu `30s` cap'e tasiyan dar ve olculebilir bir gameplay kazanimi verdi.

Impact:
`project/game/src/game/balance.ts` icindeki `20s+` slope `3.6` oldu; hiz anchor'lari `145 / 183 / 217 / 253 / 307 / 320`e geldi. `project/game/src/game/telemetry.ts` validation baseline metnini `26.6s avg / 6.3s first death / 4% early` ile hizaladi; `project/game/scripts/telemetry-check.ts` yeni hiz anchor'lari, survival baseline'i ve bucket dagilimini assert edecek sekilde guncellendi. Deterministic survival snapshot `26.5s / 6.3s / 4%`ten `26.6s / 6.3s / 4%`e cikti; bucket dagilimi `1 / 3 / 3 / 17`den `1 / 3 / 2 / 18`e kaydi, average spawn count `28.1`, average reroll `0.5` oldu. Validation snapshot `24.1s avg / 6.3s first death / 20% early / spawn_saves=3` olarak korundu. `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yumusatilan `20s+` chase'in tansiyonu gereksiz dusurdugunu veya arena akisini fazla bosalttigini gosterirse yeni sistem acmadan yalnizca `20-45s` hiz anchor'lari dar kapsamda yeniden ayarlanir; telemetry wording, public panel copy, opening-fairness helper'lari ve replay/pause katmanlari bu bahaneyle tekrar acilmaz.

### [God Run #1 - Divine Integration]

Decision:
Projeye builder ve auditor'un uzerinde duran haftalik stratejik governance katmani eklendi; yeni hafiza dosyalari ve public `God's Revelation` yuzeyi tanimlandi.

Reason:
Mevcut sistem oyun ve telemetry tarafinda gercek ilerleme uretiyor, ancak builder dogasi geregi lokal ve saatlik kararlara optimizasyon yapiyor. `AUDIT.md` bu davranisin loop riskini gorse de haftalik yon belirlemiyordu. God katmani olmadan proje "iyi optimize edilen dar cekirdek" seviyesinde kalma riski tasiyor.

Impact:
`STRATEGIC_STATE.md`, `MASTER_PLAN.md`, `DIVINE_DECISIONS.md` ve `GOD_COMMUNICATION.md` eklendi. `AGENT.md` builder'in stratejik dosyalari zorunlu okumasini isteyecek sekilde guncellendi. `main.ts`, `style.css` ve yeni `divineMessage.ts` ile public UI'ya haftalik revelation paneli eklendi.

Rollback Condition:
Eger yeni stratejik dosyalar haftalik net yon vermek yerine builder uzerine anlamsiz yazi yuku bindirirse dosya seti sadeleştirilebilir; fakat haftalik stratejik hafiza ihtiyaci kaldirilmaz.

### [Run #74]

Decision:
Spawn secimi ilk `6s` icinde oyuncuya `160px` icindeki aktif obstacle lane'i ile ayni yonu paylasan yeni adaylari puan kirarak reroll'e zorlayacak sekilde daraltildi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability, opening-fairness helper'lari ve yeni validation/tooling katmani yine yasakti. Headed browser/runtime bu ortamda hala yoktu, bu yuzden manuel sample toplanamadi. Seed `#3` outlier'ini kaldirmaya yonelik lineer intercept ve center-cut denemeleri deterministic baseline'i geriletti; buna karsin yakin aktif tehditle ayni lane'i yeniden yigan spawn'lari cezalandirmak yeni yasakli yuzey acmadan avg survival'i ilerleten daha dar bir gameplay pass verdi.

Impact:
`project/game/src/game/spawn.ts` icine ilk `6s` icin oyuncuya `160px` icindeki aktif obstacle ile `0.55` ustu yon hizasi paylasan adaylari toplam `120` puana kadar cezalandiran yeni lane-stack filtresi eklendi. `project/game/src/game/GameScene.ts` runtime spawn secimine aktif obstacle pozisyonlarini geciyor; `project/game/scripts/telemetry-reports.ts` deterministic proxy ayni secim kuralini kullaniyor. Deterministic survival snapshot `26.4s / 6.3s / 4%`ten `26.5s / 6.3s / 4%`e cikti; bucket dagilimi `1 / 3 / 3 / 17` korundu, average spawn count `27.8`den `28`e ve average reroll `0.4`ten `0.5`e geldi. Validation sample ayni `24.1s avg / 6.3s first death / 20% early / spawn_saves=3` kontratini korudu. `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni lane-stack filtresinin spawn cesitliligini yapaylastirdigini veya ayni lane'de gerekli baskiyi fazla yumusattigini gosterirse mekanik tamamen geri alinmadan once yalnizca distance, alignment threshold veya penalty seviyesi dar kapsamda yeniden ayarlanir; telemetry wording, public panel copy veya opening-fairness helper'lari bu bahaneyle tekrar acilmaz.

### [Run #73]

Decision:
Spawn secimi ilk `6s` icinde oyuncunun mevcut hareket yonunun tam onune dusen obstacle adaylarini puan kirarak reroll'e zorlayacak sekilde daraltildi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability, opening-fairness helper'lari ve yeni validation/tooling katmani yasakti. Headed browser/runtime bu ortamda yine yoktu, bu yuzden manuel sample toplanamadi. Persistent `6.3s` outlier'i tek basina iyilestiren dar ayar denemeleri baseline'i bozdu; buna karsin erken "forward pressure" spawn secim filtresi yeni yasakli yuzey acmadan gameplay/source tarafinda olculebilir iyilesme uretti.

Impact:
`project/game/src/game/spawn.ts` icine ilk `6s` icin `0.5` ustu movement/spawn alignment dot'larini `80` ceza ile puanlayan yeni forward-pressure filtresi eklendi; mevcut reroll helper'i bu ceza uzerinden baska edge adayini secebiliyor. `project/game/src/game/GameScene.ts` runtime spawn secimine player velocity'sini geciyor; `project/game/scripts/telemetry-reports.ts` deterministic proxy'yi ayni secim kuralina hizaladi. Deterministic survival snapshot `25.7s / 6.3s / 4%`ten `26.4s / 6.3s / 4%`e cikti; bucket dagilimi `1 / 4 / 2 / 17`den `1 / 3 / 3 / 17`ye ve average spawn count `27.1`den `27.8`e geldi. Validation sample ayni `24.1s avg / 6.3s first death / 20% early / spawn_saves=3` kontratini korudu. `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni filter'in acilista obstacle cesitliligini azalttigini, lane okumayi zayiflattigini veya replay/chase hissini yapaylastirdigini gosterirse mekanik tamamen geri alinmadan once yalnizca alignment threshold'u veya penalty seviyesi dar kapsamda yeniden ayarlanir; telemetry wording, public panel copy veya opening-fairness helper'lari bu bahaneyle tekrar acilmaz.

### [Run #72]

Decision:
Obstacle collision-grace activation'i wall-clock `delayedCall` yerine aktif run elapsed zamanina baglandi; focus-loss pause artik grace penceresini tuketemiyor.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/copy/readability, opening-fairness ve yeni validation/tooling katmani yasakti. Headed browser/runtime bu ortamda hala yok, bu yuzden manuel sample toplanamadi. Dar ve gercek gameplay bug'i, pause overlay'nin "run is frozen" demesine ragmen Run #52'de eklenen early collision grace'in sahne timer'iyle akmaya devam etme riskini tasimasiydi.

Impact:
`project/game/src/game/GameScene.ts` obstacle'lara `collisionUnlockElapsedMs` kaydediyor ve `canObstacleHitPlayer` bu kilidi aktif run elapsed zamanina gore aciyor. Pooled obstacle reset akisi yeni alanı temizliyor; eski `launchToken` yolu kaldirildi. Balance baseline degismedi: deterministic survival `25.7s / 6.3s / 4%` ve bucket dagilimi `1 / 4 / 2 / 17` korundu. `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i pause sonrasi grace'in fazla gec actigini veya beklenmeyen hit penceresi yarattigini gosterirse yeni sistem acmadan yalnizca collision unlock zamanlamasi dar kapsamda yeniden ayarlanir; opening-fairness sabitleri, validation wording'i ve public copy bu bahaneyle tekrar acilmaz.

### [Run #71]

Decision:
Deterministic survival proxy, runtime'daki gorunur-arena hit guard'i ve `96px` offscreen cull margin'i ile hizalandi; bu davranis ortak spawn helper'larina tasindi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/copy/readability ve opening-fairness alanlarina geri donmek yasakti. Headed browser/runtime hala yoktu, bu yuzden manuel sample toplanamadi. Yeni gameplay tuning churn'una dusmeden secilen gerekli dar is, son run'larda oyuna eklenen collision/cull davranisinin deterministic survival proxy'de eksik kalmasi ve olcum durustlugunu zedeleme riskiydi.

Impact:
`project/game/src/game/spawn.ts` icine `isPointInsideArena`, `isPointOutsideCullBounds` ve `OFFSCREEN_CULL_MARGIN` eklendi; `project/game/src/game/GameScene.ts` overlap/cull yolu bu helper'lari kullanacak sekilde hizalandi. `project/game/scripts/telemetry-reports.ts` survival sim'i de ayni visible-arena hit guard'i ve offscreen cull margin'i ile calisiyor. Snapshot baseline bilincli olarak degismedi: deterministic survival `25.7s / 6.3s / 4%` ve bucket dagilimi `1 / 4 / 2 / 17` korundu. `project/game/scripts/telemetry-check.ts` bu hizayi assert ediyor. `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` yesil kaldi.

Rollback Condition:
Eger runtime'daki obstacle overlap veya cull kurallari bilincli olarak degisirse deterministic proxy ayni helper'larla tekrar hizalanmali; proxy'yi sahneden farkli kurallarda sessizce birakmak kabul edilmez.

### [Run #70]

Decision:
`20s+` obstacle hiz ramp'i dar kapsamda arttirildi; formül `217 + (t-20) * 3.7` oldu ve 30s/45s hiz anchor'lari `254 / 310`a cikti.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability ve opening-fairness yuzeylerine geri donmek yasakti. Bu runtime'da hala `DISPLAY`/`WAYLAND_DISPLAY` olmadigi icin gercek manuel sample toplanamadi. Tooling loop'una sapmadan secilen yeni gameplay problemi, opener'i ve replay akisini bozmadan `20s+` chase sirasinda arena icinde biriken obstacle trafigini biraz daha temizleyip 20-30s bandindaki daralmayi iyilestirmekti.

Impact:
`project/game/src/game/balance.ts` yalnizca `20s+` slope'u `3.6`dan `3.7`ye cekti; opening spawn-distance helper'i, early lag/grace guard'lari, pointer steering, held-input acceptance, obstacle collider ve offscreen collision guard'i degismedi. Deterministic survival snapshot `25.6s / 6.3s / 4%`ten `25.7s / 6.3s / 4%`e cikti; bucket dagilimi `1 / 4 / 3 / 16`dan `1 / 4 / 2 / 17`ye kaydi. `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni baseline ile hizalandi. `npm run telemetry:check` ve `npm run build` yesil kaldi.

Rollback Condition:
Host browser manuel sample'i yeni `20s+` chase'in arena akisini temizlemek yerine oyunu gereksiz sertlestirdigini veya pointer/keyboard kacis hissini bozdugunu gosterirse yeni sistem acmadan yalnizca 20-45s hiz anchor'lari dar kapsamda geri ayarlanir; telemetry/copy/readability veya opening-fairness alanina sapilmaz.

### [Run #69]

Decision:
Obstacle'lar yalnizca merkezleri arena icindeyken oyuncuya zarar verecek sekilde overlap guard'i daraltildi; arena kenarindaki gorunmez veya yari-gorunur hit penceresi kapatildi.

Reason:
`AUDIT.md` verdict'i `warning`; telemetry/export/public-copy, death-readability ve opening-fairness yuzeyine geri donmek yasakti. Bu runtime'da hala `DISPLAY`/`WAYLAND_DISPLAY` olmadigi icin gercek manuel sample toplanamadi. Tooling loop'una sapmadan secilen dar gameplay problemi, obstacle `collisionReady` olduktan sonra arena kenarinda merkez ekrana girmeden veya cikarken bile hit verebilmesinin yaratabilecegi unfair edge-hit riskiydi.

Impact:
`project/game/src/game/GameScene.ts` overlap check'ine gorunur-arena guard'i eklendi; obstacle merkezi `0..ARENA_WIDTH` ve `0..ARENA_HEIGHT` icine girmeden oyuncuya zarar veremiyor. Spawn pacing, speed curve, waiting held-start acceptance, replay/resume akislari, obstacle collider yaricapi ve telemetry/export semantigi degismedi. `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `25.6s / 6.3s / 4%` aynen korundu.

Rollback Condition:
Host browser manuel sample'i bu guard'in arena kenarinda obstacle temasini fazla gec acarak tutarsiz veya bagislayici his yarattigini gosterirse yeni sistem acmadan yalnizca arena-giris esigi dar kapsamda yeniden ayarlanir; telemetry/copy/readability veya opening-fairness alanina sapilmaz.

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
