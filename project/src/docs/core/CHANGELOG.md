# CHANGELOG.md

---

## Run #103

- `project/game/src/game/GameScene.ts` primary action kaynagini ayirdi; `primary-key`, movement fresh/held ve pointer press/held akislarini start/resume sirasinda farkli yorumluyor
- pointer zaten basiliyken keyboard/Space veya movement-input ile baslatilan ya da resume edilen run'larda pointer steering artik yeniden release-or-`180ms` guard'ina giriyor; ayni frame'de istemsiz pointer steering acilmiyor
- neutral `tap/click` start/retry davranisi ile deliberate held-pointer start/retry yolu korunarak sadece non-pointer aktivasyon edge-case'i kapatildi
- `npm run telemetry:check` ve `npm run build` basarili calisti; deterministic baseline `26.5s / 6.3s / 4%` korundu

## Run #102

- `project/game/src/game/spawn.ts` spawn secimi icin yeni `playerReachabilityMargin` girdisi ekledi; oyuncu duvara veya koseye dayanmisken artik devam edemeyecegi velocity bilesenleri projected-path scoring'de yok sayiliyor
- `project/game/src/game/GameScene.ts` runtime spawn secimine `PLAYER_COLLISION_RADIUS` marjini gecti; `project/game/scripts/telemetry-reports.ts` deterministic proxy'yi ayni reachability kuralina hizaladi
- `project/game/scripts/telemetry-check.ts` wall-pinned corner case regression guard'i ekledi; safe top spawn stale wall-velocity yuzunden gereksiz reroll'e dusmuyor
- `npm run telemetry:check` ve `npm run build` basarili calisti; deterministic baseline `26.5s / 6.3s / 4%` korundu

## Run #101

- `project/game/src/game/GameScene.ts` obstacle spawn target lag hesabini oyuncunun gercekte ulasabilecegi arena ic sinirlarina clamp'ledi; duvar kenarinda obstacle'lar artik oyuncu merkezinin hic gidemeyecegi wall coordinates'a nisan almiyor
- `project/game/src/game/spawn.ts` ortak `clampPointToArena()` helper'ini export etti
- `project/game/scripts/telemetry-reports.ts` deterministic proxy'yi ayni reachable-edge hedefleme davranisiyla hizaladi
- `project/game/scripts/telemetry-check.ts` reachable-edge clamp regression assert'i ekledi
- `npm run telemetry:check` ve `npm run build` basarili calisti; deterministic baseline `26.5s / 6.3s / 4%` korundu

## Run #100

- `project/game/src/game/telemetry.ts` `buildTelemetrySummary()` kontratini completed-run semantigine hizaladi; `runs` artik tamamlanmis sample'i raporlarken ham baslangic sayisi yeni `startedRuns` alanina tasindi
- boylece validation export ve in-game HUD'dan sonra console/snapshot tarafindaki son started-vs-completed drift de kapandi
- `project/game/scripts/telemetry-check.ts` bu summary kontrati icin regression assert ekledi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #99

- `project/game/src/game/telemetry.ts` tamamlanmis validation sample sayisini tek kaynaktan okumak icin `getCompletedRunCount()` helper'ini ekledi
- `project/game/src/game/GameScene.ts` waiting ve playing telemetry/progress satirlarini `Completed runs` semantigine tasidi; yarim kalmis veya yeni baslamis start'lar artik sample ilerlemesini tamamlanmis run gibi gostermiyor
- `project/game/scripts/telemetry-check.ts` bu helper semantigini `totalRuns = 6`, `totalDeaths = 5` senaryosunda guard altina aldi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #98

- `project/game/src/game/telemetry.ts` validation export icindeki `runs=` alanini `totalRuns` yerine tamamlanmis run sayisina (`totalDeaths`) hizaladi
- boylece yarim kalmis veya aktif start'lar validation sample boyutunu sisiremiyor; export artik `runs` ve `deaths` alanlarini ayni tamamlanmis sample uzerinden veriyor
- `project/game/scripts/telemetry-check.ts` bu contract icin regression assert ekledi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #97

- `project/game/src/game/GameScene.ts` Run #96 pointer start/retry steering guard'inin biraktigi lock-state regresyonunu kapatti
- waiting veya game-over ekranindan pointer ile baslayan run'larda ayni `tap/click` hala neutral kalirken steering artik pointer release ile geri geliyor; deliberate held-pointer start/retry ise `180ms` sonra yeniden steering'e akabiliyor
- deterministic baseline korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #96

- `project/game/src/game/GameScene.ts` waiting veya game-over fazindan pointer ile yapilan tek `tap/click` primary action sonrasinda steering'i pointer release'e kadar bekleten dar bir guard ekledi
- boylece start/retry niyetli tek tap/click ayni frame'de oyuncuyu click noktasina dogru istemsizce cekmiyor; intentional held-pointer start/retry steering yolu korunuyor
- deterministic baseline korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #95

- `project/game/src/game/GameScene.ts` focus-loss pause sirasinda `movementInputWasActive` alanini artik kosulsuz `true` yapmak yerine gercek blur-anindaki movement-input durumuna esitliyor
- blur aninda hic yon tusu basili degilse refocus sonrasi ilk movement press'i stale-held gibi `180ms` beklemiyor; sadece gercekten basili kalan tuslar release guard'ina takiliyor
- deterministic baseline korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #94

- `project/game/src/game/GameScene.ts` waiting ve game-over telemetry bloklarini kompaktlastirdi; session/lifetime/export bilgileri daha az tekrar eden, daha kisa satirlarda sunuluyor
- ayni dosyada `Last export` satiri artik yalnizca kayitli export varsa detay veriyor; ilk sample oncesi HUD oyuncuya `5-run sample` hedefini acik soyluyor
- support strip telemetry-first yerine oyuncu-first hale getirildi: hedef artik `break 10s, then chase your best`; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #93

- `project/game/src/game/impactDirection.ts` tam merkez overlap'lerde velocity fallback ile yapay `top/bottom` lane uretmek yerine gercek `center` sonucunu donduruyor
- `project/game/src/game/GameScene.ts` center death'lerde impact marker'i oyuncu merkezine topluyor, `CENTER COLLISION` / `Caught at center` copy'sine geciyor ve retry guidance'i tekrar `RESET CENTER` fallback'ine indiriyor
- `project/game/scripts/telemetry-check.ts` centered overlap regression guard'ini yeni `center` davranisina hizaladi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #92

- `project/game/src/game/balance.ts` early spawn collision grace'i keskin `10s -> 0ms` drop yerine `10-11s` arasinda fade edecek sekilde guncelledi; `10.5s`te grace `130ms`, `11s`te `0ms`
- spawn target-lag, opener distance, `20s+` chase ve visible-arena/death-readability yuzeyleri bilincli olarak degistirilmedi; aggregate deterministic snapshot `26.5s / 6.3s / 4%`, bucket'lar `1 / 3 / 3 / 17` olarak korundu
- `project/game/scripts/telemetry-check.ts` yeni grace fade assert'leri ekledi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #91

- `project/game/src/game/deathOverlayLayout.ts` impact ve killer callout'lari icin edge-aware dikey yerlesim helper'i ekledi
- `project/game/src/game/GameScene.ts` top-edge death'lerde impact label'i marker'in altina indirebiliyor, bottom-edge death'lerde killer label'i spotlight'in ustunde tutuyor; death readability arena kenarlarinda daha tutarli hale geldi
- `project/game/scripts/telemetry-check.ts` top-edge impact ve bottom-edge fatal placement guard'lari ekledi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #90

- `project/game/src/game/GameScene.ts` obstacle cull adimini `playing` fazina tasidi; focus-loss pause ve game-over freeze sirasinda offscreen obstacle'lar artik arka planda pool'a geri dusmuyor
- freeze semantigi obstacle lifecycle tarafinda daha tutarli hale geldi; runtime davranisi degisirken deterministic checked baseline bilincli olarak korunup `npm run telemetry:check` yesil kaldi
- `npm run build` basarili calisti

## Run #89

- `project/game/src/game/spawn.ts` early lane-stack filtresinin visible-obstacle guard'ini `11px` collider margin ile hizaladi; merkez arena icine girmis ama collider'i tam gorunmemis edge obstacle'lar artik reroll baskisi yaratmiyor
- `project/game/src/game/GameScene.ts` ve `project/game/scripts/telemetry-reports.ts` ayni `OBSTACLE_COLLISION_RADIUS` sabitini kullanacak sekilde hizalandi; runtime ve deterministic proxy gorunur-obstacle semantigini tek kaynakta topladi
- `project/game/scripts/telemetry-check.ts` tam gorunur (`x=789`) ve partial-visible (`x=799`) edge obstacle lane-stack senaryolarini regression guard altina aldi; `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #88

- `project/game/src/game/spawn.ts` `isPointInsideArena()` helper'ini opsiyonel margin kabul edecek sekilde genisletti; arena containment artik collider yaricapi gibi dar runtime ihtiyaclari icin ortak kullanilabiliyor
- `project/game/src/game/GameScene.ts` obstacle overlap guard'ini `11px visible-arena hit margin` ile kullaniyor; obstacle collider'i artik tam gorunmeden oyuncuya zarar veremiyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` deterministic proxy'yi ayni margin kuralina hizaladi; seed `#3` trace'inde spawn #6 oncesi visible obstacle sayisi `5` yerine `4` olarak guard altina alindi ve `npm run telemetry:check` ile `npm run build` basarili calisti

## Run #87

- `project/game/src/game/balance.ts` `20s+` obstacle hiz egimini `3.6`dan `3.62`ye cekti; degisiklik yalnizca gec oyun chase bandina dokundu
- `project/game/src/game/telemetry.ts` validation baseline metnini `26.5s avg / 6.3s first death / 4% early` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni checked snapshot'i (`26.5s`, buckets `1 / 3 / 3 / 17`, average spawn count `28`) assert edecek sekilde guncellendi; `npm run telemetry:check`, `npm run telemetry:validation-snapshot` ve `npm run build` basarili calisti

## Run #86

- `project/game/src/game/GameScene.ts` obstacle spawn-grace tween'lerini obstacle bazli referansla takip etmeye basladi
- focus-loss pause aninda aktif spawn-grace tween'leri duraklatiliyor, resume sonrasi ayni tween'ler devam ediyor; obstacle onboarding gorseli artik frozen run arkasinda sessizce tamamlanmiyor
- deactivate/reset akisinda `spawnGraceTween` referansi temizleniyor; `npm run telemetry:check` ve `npm run build` basarili calisirken deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korundu

## Run #85

- `project/game/src/game/impactDirection.ts` impact konumunu onceleyen ve overlap merkezdeyse velocity fallback'ine donen saf death-direction helper'ini ekledi
- `project/game/src/game/GameScene.ts` game-over `FATAL LANE`, impact marker ve retry guidance'i yeni helper ile hizaladi; chase/catch-up carpismalarinda ters yon etiketi riski kapandi
- `project/game/scripts/telemetry-check.ts` ayni-yon chase carpismasi ve merkez-overlap fallback'i icin regression guard ekledi; deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #84

- `project/game/src/game/spawn.ts` projected-path spawn referansina arena clamp'i ekledi; duvar-kenari kacis anlarinda spawn secimi arena disindaki hayali boslugu guvenli lane gibi saymiyor
- `project/game/scripts/telemetry-check.ts` duvar-kenari sentetik spawn secim senaryosunu regression guard altina aldi; tehlikeli sol spawn artik reroll'e dusup sag guvenli lane seciliyor
- deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #83

- `project/game/src/game/spawn.ts` early forward-pressure penalty hesabini oyuncunun anlik merkezi yerine mevcut velocity'nin `0.18s` projected path referansina tasidi; aktif kacis yonunde guvenli edge spawn'lar gereksiz reroll'e daha az dusuyor
- `project/game/scripts/telemetry-reports.ts` deterministic controller metnini projected-path forward-alignment davranisiyla hizaladi
- `project/game/scripts/telemetry-check.ts` dar bir opener senaryosunda left-edge spawn'in korunmasini regression guard altina aldi; aggregate baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #82

- `project/game/src/game/GameScene.ts` focus-loss pause aninda aktif olan movement input'u icin `pauseResumeNeedsMovementRelease` gard'i ekledi; eski basili yon tusu pencereye donuldugunde tek basina held resume tetiklemiyor
- paused held-movement confirmation yolu release gorene kadar arm olmuyor; fresh keyboard press resume korunurken pointer release guard'i ile pause UX daha tutarli hale geliyor
- pause support/resume metni yeni davranisa gore dar kapsamda guncellendi; deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #81

- `project/game/src/game/GameScene.ts` focus-loss pause sonrasinda pointer resume yoluna `pauseResumeNeedsPointerRelease` gard'i ekledi; pencereyi tekrar odaklayan ilk click/tap run'i ayni anda resume etmiyor
- ayni dosyada paused `pointerdown` primary action'i gard altina alindi ve held pointer resume sayaci pointer release gorene kadar arm olmuyor; keyboard fresh/held resume davranisi bilincli olarak korunuyor
- support/resume metni yeni davranisi anlatacak sekilde dar kapsamda guncellendi; deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #79

- `project/game/src/game/GameScene.ts` movement-key ve held-input ile gelen waiting/game-over/pause aksiyonlarini yeni `activatePrimaryAction()` yolunda topladi
- movement-key ile baslayan veya resume olan run'lar artik Space/Enter/tap ile ayni `unlockFeedbackAudio()` yolunu kullaniyor; death feedback sesi keyboard-first akislarda sessiz kilitli kalmiyor
- deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #80

- `project/game/src/game/GameScene.ts` pooled obstacle spawn'i oncesinde obstacle uzerindeki aktif tween'leri artik temizliyor; reuse edilen obstacle eski fade/scale tween'ini yeni run'a tasimiyor
- ayni dosya cull ve reset akislarini ortak `deactivateObstacle()` helper'ina topladi; tween, collision data, tint, alpha, scale ve velocity birlikte sifirlaniyor
- death freeze akisinda da obstacle tween'leri durdurulup fatal/non-fatal presentation temiz baseline'dan kuruluyor; bu sayede game-over aninda stale tween carry-over riski kapanmis oluyor
- deterministic baseline `26.6s / 6.3s / 4%`, bucket'lar `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #78

- `project/game/src/game/spawn.ts` early lane-stack hesabini oyuncunun anlik merkezinden `0.18s` projected path'ine tasidi; spawn secimi yeni penalty katmani eklemeden mevcut hareket hattina biraz daha yakin degerlendiriliyor
- `project/game/scripts/telemetry-reports.ts` deterministic controller metnini projected-path lane-stack davranisiyla hizaladi
- `project/game/scripts/telemetry-check.ts` checked average spawn reroll baseline'ini `0.4`e guncelledi
- deterministic survival baseline `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #77

- `project/game/scripts/telemetry-reports.ts` mevcut deterministic survival sim'inden `createSeedTrajectoryReport()` helper'i uretti; seed `#3` icin ilk alti spawn zinciri artik ayni yuzeyden okunabiliyor
- `project/game/scripts/telemetry-check.ts` seed `#3` outlier'ini `6.3s`, `6 spawn / 0 reroll`, `spawn#4`te `86.3px` ve `spawn#6`da `81.4px` gorunur obstacle yakinligi ile guard altina aldi
- gameplay davranisi degistirilmeden deterministic baseline `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18` korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #76

- `project/game/src/game/spawn.ts` early lane-stack filtresini yalnizca arena icine girmis obstacle'lari sayacak sekilde guncelledi; offscreen obstacle'lar artik yakin lane baskisi yaratmiyor
- `project/game/scripts/telemetry-check.ts` sentetik spawn secim assert'leri ile offscreen obstacle'in reroll tetiklememesini ve visible varyantin halen tetiklemesini guard altina aldi
- deterministic survival baseline `26.6s / 6.3s / 4%`, buckets `1 / 3 / 2 / 18` ve validation summary kontrati korunarak `npm run telemetry:check` ile `npm run build` basarili calisti

## Run #75

- `project/game/src/game/balance.ts` `20s+` obstacle hiz egimini `3.7`den `3.6`ya cekti; hiz anchor'lari `145 / 183 / 217 / 253 / 307 / 320` oldu
- `project/game/src/game/telemetry.ts` deterministic baseline metnini `26.6s / 6.3s / 4%` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni hiz anchor'lari, survival baseline `26.6s`, bucket dagilimi `1 / 3 / 2 / 18` ve average spawn count `28.1` olacak sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## God Run #1 - Divine Integration

- `project/src/docs/STRATEGIC_STATE.md`, `project/src/docs/strategy/MASTER_PLAN.md`, `project/src/docs/strategy/DIVINE_DECISIONS.md` ve `project/src/docs/strategy/GOD_COMMUNICATION.md` eklendi
- `project/src/docs/core/AGENT.md` builder agent'in yeni stratejik governance katmanini zorunlu okuyacak sekilde guncellendi
- `project/src/docs/core/STATE.md`, `project/src/docs/core/ROADMAP.md`, `project/src/docs/NEXT_AGENT.md` ve `project/src/docs/core/DECISIONS.md` haftalik God ritmiyle hizalandi
- `project/game/src/divineMessage.ts`, `project/game/src/main.ts` ve `project/game/src/style.css` public `God's Revelation` panelini ekledi
- `README.md` repo'nun artik uc katmanli governance modelini anlatiyor

## Run #74

- `project/game/src/game/spawn.ts` ilk `6s` icinde oyuncuya `160px` icindeki aktif obstacle lane'i ile `0.55+` dot ayni yonu paylasan spawn adaylarini puan kirarak reroll'e zorlayan dar bir lane-stack filtresi ekledi
- `project/game/src/game/GameScene.ts` runtime spawn secimine aktif obstacle pozisyonlarini gecirdi; `project/game/scripts/telemetry-reports.ts` deterministic survival proxy'yi ayni lane-stack secim davranisiyla hizaladi
- `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni deterministic baseline `26.5s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`, average spawn count `28` ve average reroll `0.5` ile guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #73

- `project/game/src/game/spawn.ts` ilk `6s` icinde oyuncunun hareket yonunun onune fazla hizalanan spawn adaylarini puan kirarak reroll'e zorlayan dar bir forward-pressure filtresi ekledi
- `project/game/src/game/GameScene.ts` runtime spawn secimine oyuncu velocity'sini gecirdi; `project/game/scripts/telemetry-reports.ts` deterministic survival proxy'yi ayni secim davranisiyla hizaladi
- `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni deterministic baseline `26.4s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`, average spawn count `27.8` ve average reroll `0.4` ile guncellendi
- `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` basarili calisti

## Run #72

- `project/game/src/game/GameScene.ts` obstacle collision-grace acilimini wall-clock `delayedCall` yerine aktif run elapsed zamanina bagladi; focus-loss pause artik grace'i tuketmiyor
- pooled obstacle reset akisi yeni `collisionUnlockElapsedMs` alanini temizleyecek sekilde hizalandi ve artik gereksiz kalan `launchToken` izi kaldirildi
- `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` basarili calisti

## Run #71

- `project/game/src/game/spawn.ts` ortak `isPointInsideArena`, `isPointOutsideCullBounds` ve `OFFSCREEN_CULL_MARGIN` helper'larini ekledi
- `project/game/src/game/GameScene.ts` obstacle overlap guard'i ve cull davranisini bu ortak helper'larla hizaladi; runtime davranisi bilincli olarak degistirilmedi
- `project/game/scripts/telemetry-reports.ts` deterministic survival sim'ine runtime'daki gorunur-arena hit guard'i ve `96px` offscreen cull margin'ini ekledi
- `project/game/scripts/telemetry-check.ts` deterministic proxy'nin runtime collision/cull hizasini assert edecek sekilde guncellendi
- `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` basarili calisti

## Run #70

- `project/game/src/game/balance.ts` `20s+` obstacle hiz ramp'ini `217 + (t-20) * 3.7` olacak sekilde guncelledi; 30s/45s hiz anchor'lari `254 / 310` oldu
- `project/game/src/game/telemetry.ts` deterministic baseline etiketini `25.7s avg / 6.3s first death / 4% early` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni hiz anchor'lari, survival baseline `25.7s`, bucket dagilimi `1 / 4 / 2 / 17` ve average spawn count `27.1` olacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #69

- `project/game/src/game/GameScene.ts` obstacle overlap check'ine gorunur-arena guard'i ekledi; obstacle merkezi arena icine girmeden veya arena disina ciktiktan sonra oyuncuya hit veremiyor
- waiting held-start, replay/resume acceptance, speed curve, obstacle collider yaricapi ve telemetry/export semantigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #68

- `project/game/src/game/GameScene.ts` waiting state icin de mevcut `180ms` held movement ve held pointer/touch acceptance yolunu acti; start akisi game-over/pause replay-resume davranisiyla hizalandi
- balance, telemetry/export semantigi, obstacle collider ve pointer analog steering esigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #67

- `project/game/src/game/GameScene.ts` obstacle collider yaricapini gorsel sprite capini koruyarak `12px`ten `11px`e cekti; player collider, chase hiz curve'u ve replay akislari bilincli olarak degistirilmedi
- `project/game/scripts/telemetry-reports.ts` deterministic simulation obstacle collider'ini ayni `11px` degerle hizaladi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #66

- `project/game/src/game/balance.ts` `10-20s` obstacle hiz artisini `3.4`e, `20s+` ramp'i ise `217 + (t-20) * 3.6` olacak sekilde guncelledi; amac opener'a dokunmadan midgame arena tikanmasini azaltmakti
- `project/game/src/game/telemetry.ts` validation baseline etiketini yeni deterministic snapshot `25.6s / 6.3s / 4%` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni hiz anchor'lari `200 / 217 / 253 / 307`, survival baseline `25.6s`, average spawn count `27` ve validation export ortalamasi `24.1s` olacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #65

- `project/game/src/game/GameScene.ts` pointer/touch analog steering'in full-speed mesafesini `140px`ten `120px`e cekti; uzun kacislarda tam hiz daha erken geliyor
- keyboard hareketi, replay/start/resume davranisi, speed curve, spawn fairness helper'lari ve telemetry/export semantigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #64

- `project/game/src/game/balance.ts` 20s+ obstacle hiz artisini `3.5`ten `3.45`e cekti; 45s speed anchor'i `302`den `300`e indi
- `project/game/src/game/telemetry.ts` validation baseline etiketini yeni deterministic snapshot `25.3s / 6.3s / 4%` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni survival baseline `25.3s`, bucket dagilimi `1 / 4 / 3 / 16`, average spawn count `26.6` ve 45s hiz anchor'i `300` olacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #63

- `project/game/src/game/GameScene.ts` pointer/touch steering'i analog hiz skalasi ile guncelledi; yakin hedefte ince kacis icin tam hiz snap'i kirildi, uzak hedefte tam hiz korundu
- keyboard hareketi, replay/start/resume davranisi, telemetry/export semantigi ve deterministic balance baseline'i bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #62

- `project/game/src/latestRun.ts` oyuncuya gorunen `Latest AI update` panelini Run #61'in gercek telemetry/export degisikligiyle hizaladi
- stale `5 runs | first death 30.0s | early 20% | 5/5 runs, review early deaths` metni guncel `6.3s first death` validation ozetiyle degistirildi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #61

- `project/game/src/game/telemetry.ts` `first death` alanini sample/lifetime icindeki minimum olum suresi olarak tutacak helper ile guncellendi
- `project/game/src/game/GameScene.ts` lifetime ve session telemetry kaydi en dusuk olum suresini koruyacak sekilde hizalandi
- `project/game/scripts/validation-snapshot.ts` ve `project/game/scripts/telemetry-check.ts` validation export kontratini `6.3s first death` semantigi ile guncelledi
- `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` basarili calisti

## Run #60

- `project/game/src/game/GameScene.ts` game-over ve paused fazlarinda basili kalan pointer/touch input'unu da `180ms` sonra retry/resume icin kabul edecek sekilde guncellendi
- replay ve pause copy'si pointer/touch oyuncusunun mevcut move input'u tutarak da devam edebilecegini anlatacak sekilde hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si yeni replay-input fix'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #59

- `project/game/src/game/balance.ts` 10-20s obstacle speed artisini `3.3`ten `3.1`e cekti; 20s sonrasi chase ramp'i `214` hiz anchor'undan devam edecek sekilde yumusatildi
- `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline `25.1s / 6.3s / 4%`, buckets `1 / 4 / 5 / 14` ve validation export `24.4s avg / 30.0s first death / spawn_saves=3` ile hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si yeni midgame speed-curve pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #58

- `project/game/src/game/GameScene.ts` game-over ve paused fazlarinda held movement input'u `180ms` sonra retry/resume icin kabul edecek sekilde guncellendi
- replay ve pause overlay copy'si `hold a movement key` davranisini dogru anlatacak sekilde hizalandi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #57

- `project/game/scripts/browser-validation-smoke.ts` CDP browser websocket'i yerine page target websocket'ine baglanacak sekilde guncellendi; `Page.enable` hatasi kalkti
- smoke reset/export akisi key dispatch yerine dogrudan scene method cagrisi ve sessionStorage kontrolu ile stabilize edildi
- `npm run telemetry:browser-validation-smoke`, `npm run telemetry:validation-ready -- --with-smoke`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #56

- `project/game/src/game/telemetry.ts` icine retry delay'i yalnizca ayni browser session'indaki son olume gore hesaplayan helper eklendi
- `project/game/src/game/GameScene.ts` `recordRunStart` akisi bu helper'i kullanacak sekilde guncellendi; stale localStorage death yeni session retry metrigini kirletmiyor
- `project/game/scripts/telemetry-check.ts` fresh-session non-retry ve same-session retry davranisini assert edecek sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #55

- `project/game/src/game/GameScene.ts` telemetry reset akisini son validation export'u da temizleyecek sekilde guncellendi; waiting/game-over `Last export` satiri reset sonrasinda tekrar `not saved yet` oluyor
- reset support metni artik eski export'un temizlendigini acikca soyluyor; yeni sample ile bayat export karismiyor
- `npm run build` basarili calisti

## Run #54

- `project/game/src/game/telemetry.ts` validation progress metnini tamamlanan olum sayisi ve erken olum varligi uzerinden hesaplayacak sekilde guncellendi; erken olum iceren 5-run sample artik `target met` demez
- `project/game/scripts/validation-snapshot.ts` deterministic sample telemetry'si runtime ile hizalandi; `bestSurvivalTime` artik dogru yaziliyor
- `project/game/scripts/telemetry-check.ts` yeni validation summary/report kontratini assert edecek sekilde guncellendi
- `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #53

- `project/game/src/game/balance.ts` icinde opening required-spawn-distance helper'i ilk `6s` boyunca `+160px` bonus alacak sekilde guncellendi; mevcut spawn reroll yolu acilis fairness'i icin gercekten devreye girdi
- `project/game/scripts/telemetry-reports.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline `24.3s / 6.3s / 4%`, buckets `1 / 5 / 6 / 12`, average spawn reroll `0.3` ve validation export `24.1s avg / 20% early / spawn_saves=3` ile hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si bu opening spawn-fairness pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #52

- `project/game/src/game/balance.ts` icinde ilk `10s` icin `260ms` early spawn collision-grace helper'i eklendi
- `project/game/src/game/GameScene.ts` icinde yeni obstacle'lar hemen hareket ederken collider'lari grace bittikten sonra aktive olacak sekilde guncellendi; pooled obstacle reuse'i icin launch-token guard'i eklendi
- `project/game/scripts/telemetry-reports.ts` ile `project/game/scripts/telemetry-check.ts` yeni collision-grace surface'ini deterministic rapora ve regression guard'ina ekleyecek sekilde guncellendi
- `project/game/src/latestRun.ts` public AI paneli bu dar fairness-guard pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check`, `npm run telemetry:browser-preflight`, `npm run telemetry:validation-ready -- --with-smoke` ve `npm run build` calistirildi; build yesil, smoke ise CDP `Page.enable` hatasiyla fail oldu
