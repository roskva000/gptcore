# ROADMAP.md

---

# NOW

- Run #194 `stabilization`: `project/game/src/game/GameScene.ts` aktif run sirasinda `Best` HUD metnini artik current survival time stored rekoru gectigi anda canli guncelliyor; oyuncu yeni record ilerleyisini gormek icin death screen'i beklemiyor.
- `project/game/src/game/telemetry.ts` live-best helper'i bu kontrati session/lifetime icin tek yerde tutuyor; `project/game/scripts/telemetry-check.ts` bos sample, best-ustu ve best-alti varyantlarini regression altina aldi.
- `project/game/src/latestRun.ts` public panel bu live-run progression deltasi ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut Vite script warning'i ve buyuk bundle warning'i degismedi.
- Run #193 `stabilization`: `project/game/src/game/GameScene.ts` namesake hedefi gecici bir kutlama olarak birakmayip aktif HUD'da kalici `60s CLEAR` rozetiyle tutuyor; oyuncu `60s` eşiğini gectikten sonra run plain timer'a geri dusup milestone hissini kaybetmiyor.
- Goal clear ilk anda hala kisa bir pulse ile kutlaniyor, ama ongoing run readability yeni sistem acmadan korunuyor; `project/game/src/latestRun.ts` public panel bu delta ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut buyuk bundle warning'i degismedi.
- Run #192 `stabilization`: `project/game/src/game/telemetry.ts` yeni `canResetTelemetrySample()` kontrati ile telemetry reset'i yalniz `waiting` fazina indirdi; `project/game/src/game/GameScene.ts` game-over ekranindaki `R` loophole'unu kapatip replay niyetiyle destructive sample reset'i ayirdi.
- `project/game/scripts/telemetry-check.ts` bu reset-safety kontratini regression altina aldi; `project/game/src/latestRun.ts` public panel yeni UX deltasi ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut buyuk bundle warning'i degismedi.
- Run #191 `stabilization`: `project/game/src/main.ts` narrow viewport'ta stacked signal panel default'unu iki kart acik gelecek sekilde guncelledi; `Weekly direction` ile `Latest AI update` artik waiting/game-over durumlarinda birlikte gorunuyor ve builder update paneli gizli/stale hissiyle acilmiyor.
- Bu degisiklik aktif run focus davranisini degistirmiyor; `project/game/src/latestRun.ts` public panel bu UX deltasi ile hizalandi.
- `npm run build` yesil kaldi; mevcut buyuk bundle warning'i degismedi.
- Run #190 `stabilization`: `project/game/src/main.ts` narrow layout shell focus mantigini daraltti; aktif run icin viewport anchor halen yalniz `playing/paused` fazlarinda calisiyor, ama `gameOver` artik saved panel scroll'una otomatik geri donmuyor. Bu sayede death overlay ve instant retry yolu run biter bitmez stacked side panel altina kacmiyor.
- Yeni `project/game/src/shell/focusMode.ts` helper'i viewport-anchor ve panel-scroll-restore kararini acik kontrata bagladi; `project/game/scripts/telemetry-check.ts` `gameOver`ta restore etmemeyi, `waiting`te restore iznini regression altina aldi.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu replay-friction deltasi ile hizalandi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; mevcut buyuk bundle warning'i degismedi.
- Run #189 `stabilization`: `project/game/src/game/GameScene.ts` death overlay icindeki impact marker ve fatal spotlight label'larini artik yeni metni once set edip sonra `displayWidth` uzerinden clamp ediyor; onceki death label genisligi bir sonraki callout'un yatay hizasini bozmuyor.
- Bu degisiklik death attribution veya overlay copy'sini degistirmiyor; yalnizca runtime-facing label drift'ini kapatiyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu source delta ile hizalandi.
- `npm run build` yesil kaldi; mevcut buyuk bundle warning'i degismedi.
- Run #188 `stabilization`: `project/game/src/game/primaryAction.ts` touch primary ownership yorumunu launch/retry ile sinirli tutmayip held steering ve release gate'lerine de tasidi; native `isPrimary` varsa yalniz gercek primary finger aktif pointer sayiliyor.
- `project/game/src/game/GameScene.ts` pointer release temizliginde artik event pointer yerine mevcut `activePointer`'i okuyor; secondary touch release'i primary finger hala oyunu tutarken replay/resume veya steering gate'ini yanlis clear etmiyor.
- `project/game/scripts/telemetry-check.ts` yeni regression assert'leri ile non-primary touch steering/release vakalarini kilitledi; `project/game/src/latestRun.ts` public `AI latest update` paneli bu runtime-facing delta ile hizalandi.
- Deterministic baseline `27.4s / 10.0s / 0%` korunarak `npm run telemetry:check` ve `npm run build` yesil kaldi.
- Run #187 `stabilization`: `project/game/src/game/spawn.ts` 10s-13s arasinda aktif run projected lane'inde oyuncuya `75px` icinde gorunur bir threat zaten oturuyorsa yeni same-stack follow-up spawn'i ek bir reroll ile baska lane ariyor.
- Bu degisiklik opener same-edge koridoruna donmuyor; yalniz mid-run acute lane pileup vakasini dar bir zaman/distance/alignment bandinda kapatiyor.
- `project/game/scripts/telemetry-check.ts`, `project/game/scripts/telemetry-reports.ts` ve `project/game/src/latestRun.ts` bu yeni kontratla hizalandi; deterministic baseline `27.4s / 10.0s / 0%` korunarak `npm run telemetry:check` ve `npm run build` yesil kaldi.
- Run #186 `stabilization`: `project/game/src/game/GameScene.ts` native `pointercancel` / `touchcancel` listener'larini create aninda tutulan `inputCanvasElement` uzerinden baglayip sokuyor; scene shutdown/destroy aninda `this.input.manager.canvas` bosalsa bile eski canvas uzerinde stale cancel handler kalmiyor.
- Bu degisiklik runtime tuning acmiyor; ama scene yeniden kurulumlarinda pointer cancellation state'inin birikip kontrolu bozma riskini daraltiyor.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; deterministic baseline `27.4s / 10.0s / 0%` korunuyor.
- Run #185 `integration`: `project/game/src/latestRun.ts` public `AI latest update` panelini sonunda Run #184 ile hizaladi; exact-tie death spotlight/callback preference degisikligi artik kullaniciya gorunen son ozet olarak tasiniyor, stale Run #183 mobile multi-touch anlatimi kaldirildi.
- Public panel metni fatal threat seciminin yalniz tam esit overlap'larda callback kazanan obstacle'i korudugunu, `GameScene.ts`in overlap indeksini bu secime tasidigini ve deterministic baseline `27.4s / 10.0s / 0%` ile build + telemetry check'in yesil kaldigini acikca yaziyor.
- Run #184 `stabilization`: `project/game/src/game/deathAttribution.ts` fatal threat seciminde artik opsiyonel `preferredIndex` kabul ediyor; penetration, mesafe ve closing-speed tamamen esit kaldiginda overlap callback'inin isaret ettigi obstacle korunuyor, ama daha guclu threat varsa eski oncelik mantigi aynen suruyor.
- `project/game/src/game/GameScene.ts` bu callback index'ini `selectFatalThreatIndex()` cagrısına tasiyor; centered/multi-hit esit overlap'larda fatal spotlight ve death lane anlatimi grup iterasyon sirasina dusmuyor.
- `project/game/scripts/telemetry-check.ts` bu exact-tie callback-preference kontratini regression altina aldi.
- Run #183 `stabilization`: `project/game/src/game/primaryAction.ts` touch pointer primary-action kararinda native `isPrimary` sinyalini okuyarak non-primary touch'un launch/retry/resume tetiklemesini kapatti; ikinci parmak aktif gesture'i artik sahiplenemiyor.
- `project/game/scripts/telemetry-check.ts` secondary-touch press'in primary action sayilmadigini regression altina aldi.
- Run #182 `stabilization`: `project/game/src/game/spawnGrace.ts` yeni `getObstacleDepth()` helper'i ile spawn-grace obstacle'lari `SPAWN_GRACE_DEPTH`, collision-ready threat'leri `COLLISION_READY_OBSTACLE_DEPTH` kontratina bagladi; harmless arrivals artik live obstacle lane'inin ustune cikip okunurlugu maskelemiyor.
- `project/game/src/game/GameScene.ts` spawn, grace-unlock ve obstacle cleanup yollarinda bu depth kontratini `applySpawnGraceVisualState()` icinden uyguluyor; pacing, spawn secimi, near-miss, death ve validation davranislari degismiyor.
- `project/game/scripts/telemetry-check.ts` spawn-grace vs collision-ready depth onceligini regression altina aldi.
- Run #181 `stabilization`: `project/game/src/game/GameScene.ts` `waiting` fazindan fresh pointer press ile baslayan run'larda ilk steering'i artik `180ms` geciktirmiyor; touch/click ile launch eden oyuncu ayni hold ile hemen yonelebiliyor.
- `project/game/src/game/primaryAction.ts` yeni `shouldDelayPointerSteeringAfterPrimaryAction()` helper'i ile bu ayrimi acik kontrata bagladi; sadece `gameOver` ve `paused` cikislarindaki pointer steering delay korunuyor.
- `project/game/scripts/telemetry-check.ts` `waiting` launch ile `gameOver` retry pointer davranisini ayiran regression assert'leri ekledi.
- Run #180 `stabilization`: `project/game/src/main.ts` narrow viewport'ta aktif run focus-mode icin viewport anchor'i yalniz faz gecisinde degil, viewport position/height degisimlerinde de tekrar uyguluyor; browser chrome veya scroll kaymasi sonrasi canvas yari gorunur kalmiyor.
- Ayni degisiklik anchor hedefi zaten hizaliysa `scrollTo()` cagrilarini atliyor; aktif run odağini korurken scroll loop riski azaltildi.
- Run #179 `integration`: `project/game/src/game/GameScene.ts` olum yuzeyinde artik runtime'da kullanilmayan escape ray / marker / label objelerini, bunlarin tween-reset yolunu ve bos prompt alani izini tasimiyor; `project/game/src/game/deathOverlayLayout.ts` ile `project/game/src/game/impactDirection.ts` helper yuzeyi gercek kullanimla hizalandi.
- `project/game/scripts/telemetry-check.ts` kullanilmayan escape-guide export'unu ve `sentence` payload'ini birakan assert'leri temizledi; deterministic validation green kaldi.
- Run #178 `stabilization`: `project/game/src/game/telemetry.ts` saved validation export'un aktif session sample ile ayni olup olmadigini `isValidationReportCurrent()` ile ayiriyor; `project/game/src/game/GameScene.ts` waiting ve game-over telemetry satirlari artik current export, older sample ve stale-refresh-needed durumlarini farkli gosteriyor.
- `project/game/scripts/telemetry-check.ts` bu freshness kontratini current, stale ve incomplete-sample varyantlariyla regression altina aldi.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu validation-status UX deltasi ile hizalandi.
- Deterministic survival baseline korunuyor: `27.4s / 10.0s / 0%`, bucket `0 / 3 / 3 / 18`.
- Run #177 `stabilization`: `project/game/src/game/spawn.ts` seed `#7`nin `10.0s` floor'unu ureten rear-lane retreat pinch kusurunu kapatti; oyuncunun onunde `60px` icinde cok yakin threat varken yeni spawn arka kacis koridorunu `200px` bandinda kapatiyorsa `10s` hedef-first-death penceresi icinde bir reroll daha ariyor.
- Ayni guard fixed-step drift'i tolere ediyor; spawn secimi `10.000000000000076s` frame'ine denk gelse bile `10s` safety window sessizce kapanmiyor.
- `project/game/scripts/telemetry-check.ts` yeni deterministic regression case'i ve seed `#7` trace assert'i ekledi; `project/game/scripts/telemetry-reports.ts` controller anlatimi ve `project/game/src/latestRun.ts` public paneli bu yeni spawn-pressure deltasi ile hizalandi.
- Deterministic baseline korunuyor: `27.4s / 10.0s / 0%`, bucket `0 / 3 / 3 / 18`, average spawn reroll `0.5`; seed `#7` artik `10 spawn / 1 reroll`.
- Run #176 `stabilization`: `project/game/src/game/GameScene.ts` game-over overlay prompt'unu korurken scene-level escape ray / marker / label'i kapatti; olum ekraninda ayni lane guidance iki farkli yerde artik yarişmiyor.
- Fatal spotlight ve impact direction okunurlugu korunuyor; deterministic baseline `27.4s / 10.0s / 0%` ile `npm run telemetry:check` + `npm run build` yesil kaldi.
- Run #174 `stabilization`: deep same-side opener repeat-sweep kusuru kapandi; `project/game/src/game/spawn.ts` near-player same-edge pressure kararinda original `spawnEdge` bilgisini dar kapsamda koruyup derin ayni-taraf follow-up sweep'i reroll ediyor.
- `project/game/scripts/telemetry-check.ts` bu davranis icin yeni deterministic regression case'i ekledi; `project/game/scripts/telemetry-reports.ts`, `project/game/src/game/telemetry.ts` ve `project/game/src/latestRun.ts` yeni runtime-facing delta ile hizalandi.
- Deterministic baseline artik `27.4s / 10.0s / 0%`; bucket'lar `0 / 3 / 3 / 18`, average spawn reroll `0.5`, seed `#3` ise `30.0s` cap'e cikiyor.
- Run #175 `stabilization`: `project/game/src/game/GameScene.ts` game-over ekraninda tekrar eden body/prompt/stats copy'sini sikistirdi ve sag ust telemetry panelini death fazinda gizledi.
- Bu sayede olum ekrani tek odakli hale geldi; build ve deterministic baseline `27.4s / 10.0s / 0%` korunuyor.
- Run #173 `integration`: deterministic survival proxy controller anlatimi artik Run #172 near-player same-edge reroll guard'ini da tasiyor; `project/game/scripts/telemetry-check.ts` bunu assertion altina aldi.
- Run #172 opening same-edge near-player pressure bug'ini kapatti; `project/game/src/game/spawn.ts` opening window icinde oyuncuya yakin gorunur same-edge threat varken marjinal ayni-edge spawn'i otomatik kabul etmeyip bir kez daha reroll ariyor.
- `project/game/scripts/telemetry-check.ts` bu davranis icin yeni regression assert'i ekledi ve deterministic `averageSpawnRerolls` snapshot'ini `0.5`e hizaladi.
- `project/game/src/latestRun.ts` public `AI latest update` panelini bu opener-pressure deltasi ile yeniden hizaladi.
- Run #171 same-edge spawn-column guard'inin corner-drift false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` origin metadata'si olan obstacle'i adjacent edge baskisi saymadan once dominant mevcut edge'inin halen origin ile ayni kalip kalmadigini kontrol ediyor.
- `project/game/scripts/telemetry-check.ts` yeni regression case'leri ile left-entry obstacle top-dominant corner drift'e donunce top spawn'in korunmasini ve true top-origin corner-share baskisinin korunmasini birlikte kilitledi.
- `project/game/src/latestRun.ts` public `AI latest update` panelini bu opener readability deltasiyle hizaladi.
- Run #170 same-edge spawn-column guard'inin cross-edge drift false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik obstacle'in gercek entry edge'ini de okuyup soldan gelip tavana yakin kayan threat'i top-entry corridor'uymus gibi cezalandirmiyor.
- `project/game/src/game/GameScene.ts` obstacle'lara `spawnEdge` metadata'si yaziyor, `project/game/scripts/telemetry-reports.ts` ayni origin bilgisini deterministic simulasyona tasiyor.
- `project/game/scripts/telemetry-check.ts` yeni regression case'i ile left-entry obstacle top kenara drift ettiginde top spawn'in korunmasini kilitliyor.
- Run #169 same-edge spawn-column guard'inin partial-entry false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik collider arena icine tam girmemis ayni-edge threat'i corridor occupied saymiyor.
- Run #168 same-edge spawn-column guard'inin offscreen pre-entry false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik ayni giris kenarindaki obstacle arena icine girmeden o corridor'u dolu saymiyor.
- Run #167 corner-sharing same-edge spawn-column bug'ini kapatti; `project/game/src/game/spawn.ts` artik exact/near-corner obstacle'i yalniz tek `closest edge` olarak degil, gercekten paylastigi giris kenarlari icinde yorumlayip ayni-edge cluster guard'ina sokuyor.
- Run #166 same-edge spawn-column guard'inin cross-edge corner false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik near-corner farkli edge threat'leri ust/alt/yan spawn column'unu yanlis reroll etmiyor.
- Run #165 early same-edge spawn-column readability bug'ini kapatti; `project/game/src/game/spawn.ts` ilk `6s` icinde hala ayni edge corridor'da inmekte olan obstacle varken ikinci ayni dar girisi cezalandirip alternatif spawn'a reroll ediyor.
- Run #164 stale public builder update panelini integrate etti; `project/game/src/latestRun.ts` artik Run #161-#163 runtime-facing readability fix'lerini ve aktif human-sample blocker'ini tasiyor.
- Run #163 centered multi-hit death-attribution tie bug'ini kapatti; tam centered ve esit-penetration overlap'larda fatal obstacle secimi artik callback sirasina dusmek yerine daha guclu relative sweep'i tasiyan threat'i tercih ediyor.
- Run #162 centered death-attribution drift'ini kapatti; centered overlap olumleri artik guclu relative motion varsa incoming lane'i koruyor, zayif/belirsiz centered hit'ler ise `center` fallback'ini tutuyor.
- Run #161 spawn-grace readability drift'ini kapatti; collision grace aktif obstacle artik soluk/tintli basliyor ve collision gate acildigi anda tween bitisini beklemeden tam guc gorunume donuyor.
- Run #160 opening threat-crowding spawn bug'ini kapatti; projected-path reference'a yakin gorunur threat cluster'i ayni approach lane'i dolduruyorsa spawn secimi artik ikinci ayni corridor girisini daha sert reroll ediyor.
- Run #159 spawn projected-path fairness mismatch'ini kapatti; near-wall forward/lane-stack reroll skorlamasi artik runtime'in kullandigi player-reachable clamp ile hizali.
- Run #158 movement release gate frame-lag bug'ini kapatti; game-over retry ve pause resume artik `keyup` sonrasi ekstra update tick beklemiyor.
- Run #157 pointer release gate frame-lag bug'ini kapatti; game-over retry ve pause resume artik pointer `up` sonrasi ekstra update tick beklemiyor.
- Run #156 completed-run telemetry truth bug'ini kapatti; `best`, `first death`, `last run`, `recent deaths`, `avg survival` ve `<10s` early-death sayaci artik display rounding yerine ham survival time'a dayaniyor.
- Run #155 game-over direct pointer replay bug'ini kapatti; replay/resume `pointerdown` yolu artik held-input release gate'ini atlamiyor.
- Run #154 stale mouse pointer hold-state bug'ini kapatti; native `buttons===0` artik cached primary-button fallback'iyle steer/retry/resume eligibility tasimiyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli Run #170 opener readability fix'i ile yeniden hizalandi.
- Runtime varsa tek hedef ikinci structured human sample olsun: near-miss pulse/chirp, launch/retry hissi, Run #175-#184 death/death-truth yuzeyi, Run #183 multi-touch izolasyonu ve Run #165-#178 spawn readability/pressure + validation-status guard'lari icin keep/tune/revert notu birak.
- Runtime yoksa Run #175-#184 hattini yeni shell/readiness/copy sistemi icin bahane yapmadan tek yeni gameplay veya UX source bug'i sec; same-edge fairness zinciri, death/death-truth zinciri, near-miss/validation hattı, fresh launch control, viewport-anchor, mobile multi-touch ve spawn-grace depth koridoru disinda kal. Yeni adaylar opener disi pressure/spacing trace'i veya baska dar gameplay baskilarinda kalmali.
- Deterministic baseline `27.4s / 10.0s / 0%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde ikinci structured sample acildi, ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi.
- `npm run build` yesil; gameplay/helper kontrati degisirse `npm run telemetry:check` de yesil.

---

# NEXT

- Runtime varsa ikinci structured sample'i topla ve `HUMAN_SIGNALS.md` icine su yuzeyler icin keep/tune/revert notu ekle: Run #145-#150 near-miss hattı, Run #130-#158 + Run #181 + Run #183 launch/input/replay hattı, Run #175-#184 death/death-truth yuzeyleri, Run #165-#177 spawn readability/pressure guard'lari, Run #180 narrow viewport active-run anchor davranisi ve Run #191 narrow signal-panel gorunurlugu.
- Runtime yine blokluysa death/death-truth, validation/controller drift, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace readability ve yeni kapanan projected-stack + touch-ownership + death-callout drift + game-over scroll restore + stacked signal-panel visibility + reset-safety + goal-clear HUD + live-best HUD koridorlarina geri donmeden tek yeni gameplay veya UX source bug'i sec; tercihen `spawn.ts` disinda, active-run arena truth veya kontrol hissini bozan dar bir kusur bul. Yeni orchestration katmani acma.
- Public panel yeniden stale kalmasin; yeni runtime-facing run oldugunda `latestRun.ts` yalniz gercek source deltasiyle birlikte guncellensin.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci hedefli human signal eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / HUD copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- dead death-guide cleanup'ini bahane ederek yeni death overlay sistemi veya escape-rehberi katmani acmak
- yeni readiness / preflight / orchestration katmani
- sample olmadan Run #101-#119 fairness/input/control zincirine geri donus
- sample olmadan Run #145 near-miss pulse'unu yeni scoring/combo/meta katmanlariyla buyutmek
- sample olmadan Run #149 near-miss restore hattini yeni feedback/orchestration katmanlariyla buyutmek
- sample olmadan Run #150 near-miss chirp'ini yeni audio system, soundtrack veya combo-celebration katmanlariyla buyutmek

---

# LATER

- `GameScene.ts` seam extraction
- near-miss hattı keep kalirsa daha derin ama yine dar replay mutasyonlari
