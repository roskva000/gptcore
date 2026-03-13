# METRICS.md

---

# Key Metrics

## Gameplay

pointer_replay_release_integrity:
current: Run #155 `project/game/src/game/primaryAction.ts` direct pointer primary-action press'ini fresh-release gate'ine bagliyor; `project/game/src/game/GameScene.ts` game-over/pause `pointerdown` yolu artik held replay/resume guard'ini atlamiyor
baseline: onceki source `gameOverRetryNeedsPointerRelease` ve `pauseResumeNeedsPointerRelease` guard'larini held-input yolunda uyguluyor, ama direct `pointerdown` aktivasyonu bu release beklentisini atlayabiliyordu; death-time held touch/click kazara ani restart'a sizabilirdi
target: sonraki headed sample'da death veya focus-loss sonrasi replay/resume ancak gercek release + fresh press ile acilsin; accidental restart kalmasin ve mesru yeni tap/click gecersiz yere bloke edilmesin
validation: `npm run telemetry:check`, `npm run build`

mouse_primary_release_integrity:
current: Run #154 `project/game/src/game/primaryAction.ts` non-touch pointer icin native `event.buttons===0` gordugunde input'u dogrudan release sayiyor; stale cached `button===0` artik active primary hold olarak yorumlanmiyor
baseline: onceki helper `isDown===true` ve `buttons===0` kombinasyonunda tekrar `shouldHandlePrimaryActionPointer()` fallback'ine donup cached left-button durumunu primary-down sayabiliyordu; bu da mouse release sonrasi ghost steer veya stale retry/resume eligibility riski tasiyordu
target: sonraki headed desktop sample'da mouse release sonrasi pointer steering hemen dusmeli, stale hold retry/resume zinciri kalmamali ve gercek basili primary input gecersiz yere yok sayilmamali
validation: `npm run telemetry:check`, `npm run build`

validation_summary_contract_integrity:
current: Run #153 `project/game/src/game/GameScene.ts` game-over validation summary satirini ortak `hasCompletedRunSample()` helper'ina bagliyor; death-screen telemetry snapshot'i artik export readiness ile ayni sample gate kontratini kullaniyor
baseline: onceki source ayni validation ailesinde hardcoded `this.sessionTelemetry.totalDeaths < 5` esigine bakiyordu; export lock ve diger telemetry copy'si ortak helper'a bagli oldugu icin gelecekte contract drift riski tasiyordu
target: validation sample esigi tek kaynaktan okunmaya devam etsin; game-over, waiting ve export affordance satirlari farkli threshold davranisi uretmesin
validation: `npm run telemetry:check`, `npm run build`

scene_input_listener_cleanup_integrity:
current: Run #152 `project/game/src/game/GameScene.ts` shutdown/destroy sirasinda `pointerdown`, `keydown-SPACE`, `keydown-ENTER`, `keydown-R`, `keydown-C` ve `keydown-V` listener'larini temizliyor; gameplay keyboard capture listesi de ortak sabitten eklenip cleanup'te geri sokuluyor
baseline: onceki source create tarafinda bu listener'lari kaydediyor ama cleanup yolunda yalnizca `pointerup`, `pointerupoutside` ve blur/visibility DOM listener'larini sokuyordu; scene yeniden kurulumlarinda primary action ve telemetry hotkey'leri birikip cift tetik riski tasiyordu
target: HMR veya scene rebuild sonrasi start/retry/resume ile telemetry aksiyonlari tek tetik mantigini korusun; lifecycle cleanup yeni orchestration katmanina donusmesin
validation: `npm run build`

near_miss_audio_feedback:
current: Run #150 `project/game/src/game/GameScene.ts` her `NEAR MISS` pulse'unda kisa bir synth chirp caliyor; zincirli `2x` / `3x` close shave anlarinda pitch ve gain hafifce yukseliyor, audio unlock yoksa oyun sessizce mevcut gorsel feedback ile devam ediyor
baseline: Run #145-#149 near-miss mutation'i gorsel pulse, chain etiketi ve pause/resume restore kontratini acmisti, fakat close shave anlari hala tamamen HUD okunurluguna bagliydi; oyuncu obstacle lane'lerini takip ederken bu beat kolayca gozden kacabilirdi
target: sonraki manuel sample'da chirp close shave anini daha heyecanli ve daha oyun gibi hissettirsin; zincirli near-miss'lerde earned kalsin, yorucu veya ucuz ses gurultusune donmesin
validation: `npm run build`

near_miss_pause_resume_integrity:
current: Run #149 `project/game/src/game/GameScene.ts` focus-loss pause'dan donerken aktif near-miss hint penceresini `project/game/src/game/nearMiss.ts` helper'lariyla yeniden yorumluyor; pencere hala aciksa `NEAR MISS` veya zincirli `2x` / `3x` etiketi geri geliyor, pencere kapanmissa stale pulse dirilmiyor
baseline: Run #145-#146 near-miss pulse'u tetik ve gorunur-arena kontratini acmisti, fakat focus-loss pause aktif pulse'u kosulsuz gizleyip resume'da geri kurmuyordu; paused time sayilmadigi halde earned close-shave feedback sessizce kaybolabiliyordu
target: sonraki manuel sample'da aktif near-miss pulse focus-loss pause ile kesilirse resume sonrasi kalan sure boyunca gorunur kalsin; fazla kalici, gurultulu veya dikkat dagitici bir geri donus yaratmasin
validation: `npm run telemetry:check`, `npm run build`

survival_goal_resume_context_integrity:
current: Run #148 `project/game/src/game/GameScene.ts` icinde focus-loss pause/resume sonrasi playing hint ve support copy'yi `survivalGoalReachedThisRun` durumuna gore geri kuruyor; `60s clear` edilmis bir run ayni seansta tekrar `break 10s, then clear 60s` yonlendirmesine dusmuyor
baseline: onceki source blur/refocus pause'undan sonra support satirini kosulsuz baz hedef metnine donduruyor, aktif milestone hint penceresi icindeyse bile resume sonrasi generic chase hint'ini geri getiriyordu; namesake goal baglami ayni run icinde kaybolabiliyordu
target: sonraki manuel sample'da `60s clear` sonrasi pause/refocus goal-complete baglamini korusun; milestone earned hissettirsin ama gereksiz uzun veya gurultulu kalmasin
validation: `npm run telemetry:check`, `npm run build`

survival_goal_badge_integrity:
current: Run #147 game-over `60s clear.` badge kararini `project/game/src/game/GameScene.ts` icinde ham `survivalTime` uzerine tasidi; `59.96s` gibi run'lar UI'da `60.0s` gorunse bile milestone rozetini acmiyor
baseline: onceki source death overlay'de `roundedSurvivalTime` kullandigi icin display rounding tek basina namesake hedef gecilmis gibi davranabiliyordu; oyun ici clear kutlamasi ham saate bagli olsa da game-over rozet mantigi ondan daha gevsekti
target: sonraki manuel sample'da `60s clear` yalnizca gercek threshold gecislerinde gorunsun ve oyuncuda earned milestone hissi yaratsin; erken/sahte kutlama gorulmesin
validation: `npm run telemetry:check`, `npm run build`

near_miss_pressure_feedback:
current: Run #145-#146 yakin gecen ama carpmayan obstacle'lari `project/game/src/game/nearMiss.ts` helper'i ile izliyor; gercek closing approach sonrasi gelen close shave anlari sahnede kisa `NEAR MISS` / `2x NEAR MISS` pulse'u olarak gorunur oluyor, trigger artik obstacle gorunur arena disina tastiktan sonra gec acilmiyor ve Run #149 aktif pulse'u focus-loss pause sonrasi da pencere hala aciksa geri kuruyor
baseline: onceki build'de run'in en heyecanli anlarindan biri olan close shave tamamen sessiz geciyordu; insan sinyalindeki en pozitif his oyun icinde ayrik bir feedback tasimiyordu
target: sonraki manuel sample'da bu pulse'lar earned, heyecanli ve replay istegini artiran mikro-oduller gibi hissettirsin; gurultu, sahte kutlama veya ekran disi gecikmis kutlama hissi uretmesin
validation: `npm run telemetry:check`, `npm run build`

narrow_viewport_phase_sync_integrity:
current: Run #144 narrow viewport media-query degistiginde mevcut oyun fazini `syncGameplayFocusMode()` uzerinden yeniden uygular; aktif seans breakpoint altina sonradan gecse bile panel gizleme, scroll lock, saved panel scroll ve viewport anchor ayni focus-mode yoluna geri baglanir
baseline: Run #138-#140 active-run focus, scroll lock ve viewport anchor davranislarini acmisti, fakat breakpoint listener yalnizca panel visibility ve scroll lock'u parcali sekilde guncelliyordu; run zaten aktifken pencere daralirsa shell'in tam focus-mode kontrati sessizce eksik kalabilirdi
target: sonraki manuel sample'da orientation/resize/browser chrome degisimi run sirasinda viewport'u dar moda iterse panel otomatik geri cekilsin, sayfa scroll'u yeniden kilitlensin ve viewport canvas'a geri hizalansin; waiting/game-over'a donunce panel scroll'u yine dogal sekilde restore edilsin
validation: `npm run build`

non_active_canvas_scroll_chain:
current: Run #143 non-active fazlarda `game-root` icin `overscroll-behavior: auto` kullaniyor; Run #142'nin `touch-action: manipulation` gecisi artik canvas ustunde baslayan dikey swipe'in page/panel scroll'una zincirlenmesini CSS seviyesinde de aciyor
baseline: Run #142 `touch-action`i gevsetmisti, fakat `game-root` hala `overscroll-behavior: contain` tasidigi icin waiting veya game-over ekraninda swipe canvas ustunde baslarsa scroll zinciri yine de yapiskan kalabilirdi
target: sonraki manuel sample'da waiting/game-over ekraninda canvas ustunde baslayan swipe panel ve sayfa akisina dogal sekilde devam etsin; aktif run'a girince bu serbestlik kaybolup kontrol yuzeyi yeniden sabitlensin
validation: `npm run build`

non_active_canvas_scroll_accessibility:
current: Run #142 `game-root` ve `canvas` icin varsayilan `touch-action`i `manipulation` seviyesine cekiyor; Run #143 ile birlikte waiting ve game-over fazlarinda swipe canvas ustunde baslasa bile panel/readout scroll'u daha dogal akabilmeli, aktif run'da ise `.app-shell--game-active` bunlari tekrar strict moda aliyor
baseline: Run #139 aktif run sirasinda sayfa scroll'unu kilitledi, fakat shell hala non-active fazlarda da canvas'i `touch-action: none` ve `overscroll-behavior: contain` altinda tutuyordu; bu da touch browser'da panel okumaya calisan drag'in canvas ustunde baslamasi halinde launch veya game-over sonrasi akis hissini gereksiz sekilde yapiskanlastirabiliyordu
target: sonraki manuel sample'da waiting/game-over ekraninda canvas ustunden baslayan swipe panel akisini dogal sekilde kaydirsin; run baslayinca veya pause'a girince ayni yuzey tekrar scroll yerine oyuna hizmet etsin
validation: `npm run build`

focus_loss_keyboard_state_reset_integrity:
current: Run #141 focus-loss pause'a girerken aktif movement snapshot'ini aldiktan sonra Phaser `keyboard.resetKeys()` cagiriyor; blur sirasinda pencere disinda birakilan movement tuslari stale `isDown` olarak tasinmiyor
baseline: Run #131 pointer tarafinda extra tap friksiyonunu daraltmisti, fakat keyboard state Phaser seviyesinde resetlenmedigi icin blur veya tab/window degisimi sonrasi fiziksel olarak birakilmis movement tuslari resume'a hayalet hareket veya takili held-input state'i tasiyabilirdi
target: sonraki manuel sample'da blur/refocus veya app switch sonrasi released movement tuslari kendiliginden hareket baslatmasin; movement-temelli resume/retry akisi yeni bir release tuzagi uretmesin
validation: `npm run telemetry:check`, `npm run build`

active_run_viewport_anchor_recovery:
current: Run #140 narrow viewport'ta `playing` veya `paused` fazina girince mevcut sayfa scroll konumunu sakliyor, viewport'u `#game-root` hizasina geri cekiyor ve waiting/game-over'a donunce onceki panel scroll konumunu geri yukluyor
baseline: Run #139 scroll'u kilitliyordu, fakat kullanici panelin altlarindayken run baslatirsa aktif seans mevcut scroll offset'inde acilabiliyor ve canvas kilitlenmis halde yari gorunur kalabiliyordu
target: sonraki manuel sample'da aktif run her seferinde oyun alani odaginda baslasin; run bitince panel ve AI update akisi dogal scroll konumuna donsun
validation: `npm run build`

active_run_scroll_lock_stability:
current: Run #139 narrow viewport'ta `playing` veya `paused` fazina girince `html.app-scroll-locked` class'i aciyor; `body` ve `#app` overflow'u kapanip overscroll bastiriliyor, aktif run sirasinda sayfa scroll'u daha zor hale geliyor
baseline: Run #138 aktif run sirasinda side paneli gizleyip canvas'a alan geri veriyordu, fakat `body/#app` hala scrollable kaldigi icin kazara page drag veya browser chrome hareketi kisa ekranda canvas odağini bozabilirdi
target: sonraki manuel sample'da aktif run sirasinda canvas viewport icinde daha sabit kalsin, accidental page movement azalsin, Run #140 ile birlikte aktif seans dogru scroll offset'te baslasin ve Run #142 sonrasi non-active scroll serbestligi aktif run guard'ini zayiflatmasin
validation: `npm run build`

narrow_viewport_active_run_focus:
current: Run #138 narrow viewport'ta `playing` veya `paused` fazina girince side paneli gizliyor, `--game-max-height` hesabini yeniden yapiyor ve aktif canvas'a panelin kapladigi alanı geri veriyor
baseline: Run #133 canvas'i kisa ekrana sigdiriyordu, fakat stacked signal panel aktif seans sirasinda da ayni viewport'u paylasmaya devam ettigi icin oyun alani ve dikkat odagi dar kalabiliyordu
target: sonraki manuel sample'da run aktifken canvas daha baskin hissedilsin, touch start/replay odaği iyilessin ve waiting/game-over'a donunce panel geri gelerek orientation kaybi yaratmasin
validation: `npm run build`

waiting_launch_surface_identity:
current: Run #137 waiting/start ekranina ayrik launch paneli, `Break 10s. Then chase 60.` basligi ve spawn noktasini isaretleyen pulse marker ekledi
baseline: onceki waiting state goal, controls ve start eylemini tek bir duz hint blogu olarak veriyordu; insan sinyali bu yuzeyi "asiri basit" ve "gercek bir oyunun %5'i gibi" hissettiren bir giris olarak isaretledi
target: sonraki manuel sample'da ilk ekran hedefi ve ilk aksiyonu daha hizli anlatsin; oyuncu ilk inputu daha guvenli versin ve opening hissi daha oyun gibi gelsin
validation: `npm run telemetry:check`, `npm run build`

pointer_cancel_release_integrity:
current: Run #136 native `pointercancel` / `touchcancel` sonrasi GameScene pointer hold/release state'ini temizliyor ve primary pointer helper'lari canceled pointer'i release gibi yorumluyor
baseline: onceki source hattinda cancel edilmis touch/pointer icin ayrik guard yoktu; mobile browser gesture veya sistem interruption sonrasi Phaser pointer stale `isDown` tasirsa steering veya retry/resume gate'i gereksiz kilitlenebilirdi
target: sonraki manuel sample'da browser gesture, touch callout veya sistem interruption sonrasi stale press steering/retry/resume akisini kilitlemesin; keep/tune/revert karari insan notuyla verilsin
validation: `npm run telemetry:check`, `npm run build`

viewport_position_bounds_sync:
current: Run #135 `window.scroll` ve `visualViewport.scroll` olaylarinda da mevcut RAF tabanli Phaser `scale.refresh()` akisina giriyor; canvas boyutu degismese bile sayfa offset'i veya mobile browser chrome konumu degistiginde input/scale bounds daha hizli tazeleniyor
baseline: Run #134 resize, panel toggle ve visual viewport resize sonrasi stale bounds riskini daraltmisti, fakat canvas'in sayfadaki konumu sadece scroll veya viewport-origin kaymasiyla degistiginde Phaser bounds eski offset'te kalabilirdi
target: sonraki manuel sample'da sayfa scroll'u, browser chrome kaymasi veya viewport-origin degisimi sonrasi pointer/touch hedefi canvas ustunde hizali kalsin; keep/tune/revert karari insan notuyla verilsin
validation: `npm run build`

viewport_scale_bounds_sync:
current: Run #134 `syncGameViewportHeight()` sonrasinda RAF ile Phaser `scale.refresh()` cagiriyor; panel toggle, window resize ve visual viewport resize sonrasi CSS canvas boyutu ile input/scale bounds daha yakin senkronize kaliyor
baseline: Run #133 `--game-max-height` ve `canvas` boyutunu CSS tarafinda guncelliyordu, fakat panel toggle gibi Phaser'in kendi resize akisina girmeyen anlarda stale bounds pointer/touch hedefinde sessiz kayma riski tasiyordu
target: sonraki manuel sample'da panel ac/kapa veya browser chrome yuksekligi degisikliginden sonra pointer/touch hedefi canvas uzerinde hizali kalsin; Run #135 ile birlikte sadece offset kaymalarinda da ayni koruma gozlemlensin
validation: `npm run build`

mobile_viewport_playfield_fit:
current: Run #133 shell viewport yuksekligi, padding/gap ve narrow layout'ta acik panel yuksekliginden `--game-max-height` hesapliyor; `game-root` genisligi ve `canvas` yuksekligi bu sinira gore 4:3 oraninda kontrol ediliyor
baseline: onceki shell yalnizca viewport genisligine gore olculuyordu; kisa mobil ekranlarda acik panel yuksekligi canvas'i ilk ekrandan asagi itip gorunur playfield'i daraltabiliyordu
target: sonraki manuel sample'da kisa viewport + acik panel kombinasyonunda canvas ilk ekranda daha gorunur kalsin, browser chrome yukseklik degisimlerinde asiri ziplama yapmasin ve Run #134 ile pointer hizasi korunmus olsun
validation: `npm run build`

game_surface_browser_default_interference:
current: Run #132 `#game-root` uzerinde `contextmenu` ve `dragstart` default'larini bastiriyor; `game-shell`, `game-root` ve `canvas` ayrica `user-select` / `-webkit-user-select` / `-webkit-touch-callout` guard'lari tasiyor
baseline: onceki shell oyunun uzerinde browser context menu, ghost drag veya touch callout/text selection davranislarini acik birakiyordu; bu da mobil ve pointer replay/steering akisini browser UI tarafindan kesilebilir bir hale getiriyordu
target: sonraki manuel sample'da long-press ve secondary-click browser UI acmadan oyunda kalsin; replay ve pointer steering browser shell tarafindan bolunmesin
validation: `npm run build`

focus_loss_pointer_resume_reliability:
current: Run #131 focus-loss pause sirasinda pointer release guard'ini yalnizca aktif primary touch/click varsa aciyor; pointer aktif degilken refocus sonrasi ilk tap/click ekstra ikinci deneme gerektirmeden resume'a ulasabiliyor
baseline: onceki kontrat blur ile pause'a her girdiginde `pauseResumeNeedsPointerRelease = true` kuruyordu; pointer bos olsa bile ilk tap guard'a takilip ancak release sonrasi ikinci tap/click ile resume mumkun oluyordu
target: sonraki manuel mobile/touch sample'da refocus sonrasi touch/click resume tek tap ile geri gelsin; pointer gercekten basili tutulurken ise stale press kazara resume tetiklemesin

touch_primary_action_reliability:
current: Run #130 touch pointer primary-action yorumunu Phaser `wasTouch` / `primaryDown` sinyallerine hizaladi; held touch input artik stale mouse `button` durumuna bakmadan primary steer/retry olarak okunuyor
baseline: onceki helper touch pointer'lari dogrudan touch-state ile degil, son event'teki mouse-button fallback'leri ile yorumluyordu; bu da mobil/hybrid cihazlarda primary touch akisini gereksiz kirilgan bir semantik uzerine yasliyordu
target: sonraki manuel mobile/touch sample'da touch start, held steer ve retry akisi tutarli hissetsin; keep/tune/revert karari insan notuyla verilsin

survival_goal_game_over_hierarchy:
current: Run #129 `60s clear.` milestone'unu death overlay body copy'sinden cikarip title ustunde ayrik bir badge olarak gostermeye basladi; badge aktif oldugunda overlay title/body/prompt/stats bloklari da hafif asagi kayiyor
baseline: Run #120 namesake goal icin in-run ve post-death feedback eklemisti, ancak game-over aninda `60s clear.` body copy'nin ilk satiri olarak survival/best ve cause metinleriyle ayni hizada akiyor, bu da milestone'u kolayca arka plana itiyordu
target: sonraki manuel sample'da `60s clear` aninin olum sonrasi daha earned, daha gorunur ve death reason hiyerarsisini bozmayan bir kutlama gibi hissedip hissetmedigi netlestirilsin; keep/tune/revert karari insan notuyla verilsin

paused_overlay_copy_density:
current: Run #128 focus-loss pause overlay body copy'sini iki kisa satira indirdi, prompt'u `Refocus, then ... to resume.` formatina cekti ve stats blogunu `Session best/avg` ile `Validation/First death` olmak uzere iki satira dusurdu
baseline: Run #126 pause state'te sag panel ve hint/support chrome'unu gizlemisti, ancak overlay'in kendi body/prompt/stats metni hala ayni pause-safe, resume ve telemetry baglamini gereksiz uzunlukla tekrar ediyordu
target: sonraki manuel sample'da pause ekrani daha hizli okunur, daha az burokratik ve resume aksiyonunu daha net tasiyan tek ekran gibi hissedilsin; orientasyon kaybi olursa keep/tune/revert karari insan notuyla verilsin

game_over_snapshot_density:
current: Run #127 death sonrasi sag ust `Session snapshot` panelini iki kisa bilgi satirina indirdi; `avg` artik game-over panelinde degil ve validation/export affordance'i sample durumuna gore `First death`, `Export ready` veya `Press V` seviyesinde kaliyor
baseline: Run #125-#126 sonrasi death ekraninda ust HUD, support strip ve pause chrome azaltilmisti, ancak game-over paneli hala `Run + Best + Avg` ve `First death + validation + export` yogunluguyla insan sinyalindeki "fazla veri/yazi" sorununu tam kapatmiyordu
target: sonraki manuel sample'da death anindaki sag panel overlay ile rekabet etmeyen, daha kisa ve yeterince yonlendirici bir ozet gibi hissetsin; export affordance'i kaybolmamis ama daha az istilaci olsun

paused_overlay_focus:
current: Run #128 pause state'te hem overlay disindaki `Local telemetry`, `hint`, ve alt support strip chrome'unu gizliyor hem de overlay body/prompt/stats metnini daha kisa tutuyor; focus-loss pause artik daha dar bir tek-overlay ozetle okunuyor
baseline: Run #125 sonrasi pause ekraninda ust HUD gizlenmisti, ancak sag panel, ust hint ve alt support strip hala overlay ile ayni resume/focus-loss/telemetry bilgisini tekrar edip ikinci ve ucuncu odak noktalarini acik birakiyordu
target: sonraki manuel sample'da pause state daha sakin, daha az burokratik ve resume niyetini daha dogrudan anlatan tek ekran gibi hissedilsin; gerekli orientation kaybi olursa keep/tune/revert karari insan notuyla verilsin

non_playing_hud_chrome_focus:
current: Run #125 `score` ve `best` HUD satirlarini `paused` ve `gameOver` fazlarinda gizliyor; ust sol runtime chrome artik overlay ozetiyle ayni anda rekabet etmiyor
baseline: Run #124 support strip game-over aninda gizlenmisti, fakat ustteki skor ve best HUD'si hala gorunur kalip death/pause overlay'lerinin kendi ozetleriyle duplicate zaman/best baglami yaratiyordu
target: sonraki manuel sample'da pause ve death ekranlari daha tek parca, daha sakin ve "iki UI ust uste binmis" hissinden daha uzak algilansin

game_over_support_strip_focus:
current: Run #124 game-over aninda alt support strip'i varsayilan olarak gizliyor; strip sadece start/pause/resume ve explicit telemetry/export aksiyonlarinda geri geliyor
baseline: Run #122 support strip metnini tek export/retry hatirlatmasina daraltmisti, ancak strip hala death overlay ile ayni anda gorunerek ikinci bir dikkat noktasi yaratabiliyordu
target: sonraki manuel sample'da death ani daha sakin okunur hissetmeli; retry/export affordance'i ise kaybolmus degil, sadece daha az istilaci algilanmali

public_ai_panel_accuracy:
current: Run #143 public `Latest AI update` panelini non-active canvas swipe-chain davranisi ve guncel deterministic baseline (`26.5s avg / 6.3s first death / 4% early`) ile tekrar hizaladi
baseline: onceki panel stale kalmis, eski input/shell fix'ini ve drift eden `25.1s` average survival metnini tasiyordu; ilk insan sinyali de panelin bir suredir guncellenmiyormus gibi gorundugunu not etti
target: public panel yalnizca gercek source delta veya yeni insan kaniti geldikce guncellensin; gameplay hafizasi ile player-facing anlatim tekrar drift etmesin

death_screen_clarity:
current: Run #127 ile birlikte game-over ekrani duplicate `score` / `best` HUD'si olmadan aciliyor ve sag ust `Session snapshot` paneli de daha kisa bir ozet tasiyor; Run #122-#126 sadeleştirmeleri ustune ekran tek overlay hiyerarsisine biraz daha yaklasti
baseline: 11.03.2026 tarihli insan sinyali death ekranini "inanilmaz fazla veri/yazi" nedeniyle karmasik ve rahatsiz edici olarak raporladi
target: sonraki manuel sample'da death ekraninin daha sakin, daha rahat okunur ve retry istegini daha az bozan bir his vermesi; ozellikle sag ust snapshot kisalmasinin gercekten clutter'i azaltip azaltmadigi netlestirilsin

average_survival_time:
current: 26.5s in deterministic survival snapshot
baseline: 26.5s
target: hold `>= 26.5s` while checking manually that the slightly firmer `20s+` chase plus the forward-pressure and lane-stack spawn filters still feel fair and readable

survival_goal_feedback:
current: Run #120 promoted the namesake `60s` threshold into runtime feedback, and Run #129 now also preserves that milestone on death as a dedicated overlay badge instead of burying it in the body copy
baseline: before Run #120 the game title and onboarding framed `Survive 60 Seconds` as a meaningful goal, but clearing `60s` produced no dedicated in-run acknowledgement and only the raw survival timer changed
target: confirm manually that the `60s clear!` moment feels visible and earned without breaking flow, overstating success, or reading as noisy UI during a long survival streak

first_death_time:
current: 6.3s in deterministic survival snapshot
baseline: 6.3s
target: increase over time; manual sample target remains `> 10s`

early_death_rate_under_10s:
current: 4% in deterministic survival snapshot
baseline: 4%
target: stay at or below 4%

survival_bucket_distribution:
current: `<10s: 1`, `10-20s: 3`, `20-30s: 3`, `30s cap: 17`
baseline: `1 / 3 / 3 / 17` across 24 deterministic seeds
target: keep `10-20s <= 3`, `<10s <= 1`, and avoid drifting below `30s cap = 17` unless headed sample justifies a harder chase

predicted_spawn_count:
current: 10 by 10s, 32 by 30s, 76 by 60s
baseline: 10 / 32 / 76
target: keep explicit and stable unless pacing tuning is intentional

obstacle_speed_curve:
current: 145 at 0s, 183 at 10s, 217 at 20s, 253 at 30s, 308 at 45s, 320 at 60s
baseline: Run #87 nudged only the `20s+` speed slope from `3.6` to `3.62` after the prior softened chase had drifted to `18/24` deterministic `30s` caps; opener pacing, spawn-distance helpers, lag/grace guards, collider, and input/pause surfaces were intentionally left untouched
target: preserve the early-death guard and validate manually that the slightly firmer `20s+` chase restores tension without feeling sharp or cheap

pre_spawn_cull_integrity:
current: Run #107 now reclaims offscreen-cull obstacle entries at the start of each spawn attempt, so timer callbacks that land before the next `update()` do not carry one-frame stale obstacle pool occupancy into spawn selection
baseline: before Run #107 obstacle culling only happened during `update()`, which left a narrow runtime window where already-outside-cull-bounds obstacles could remain active until the next frame and silently occupy pool slots during a spawn callback
target: confirm manually that long survival stretches keep a steady spawn rhythm without dead air, skipped pressure beats, or stale obstacle clutter at the arena edge

browser_control_integrity:
current: Run #108 now captures `Space`, arrow keys, and `WASD` at the Phaser keyboard layer, while `.game-root` and `canvas` opt out of browser pan/overscroll gestures via `touch-action: none` and `overscroll-behavior: contain`
baseline: before Run #108 the app shell could still scroll inside `#app`, so keyboard start/move inputs and touch steering were vulnerable to browser-level scroll/pan interference outside the game loop itself
target: confirm manually that keyboard-first start/retry and touch steering never drag the page/panel or feel like the browser is stealing control

enter_primary_action_capture:
current: Run #116 now captures `Enter` alongside the existing gameplay keys, so start/retry/resume remains on the game's primary-action path even when shell focus drifts onto the side-panel `details/summary` UI or another focusable wrapper element
baseline: before Run #116 `keydown-ENTER` triggered the scene action, but `Enter` was not in the keyboard capture list; focused shell UI could still consume it and turn a retry/start intent into panel toggling or another default interaction
target: confirm manually that `Enter` feels as reliable as `Space` for start/retry/resume across desktop focus changes without breaking any intentionally focusable non-game shell control

primary_key_repeat_integrity:
current: Run #117 now ignores repeated `Space` / `Enter` keyboard events on the primary-action path, so holding a key through waiting, pause, or game-over overlays no longer retriggers start/retry/resume without a fresh press
baseline: before Run #117 `keydown-SPACE` and `keydown-ENTER` flowed straight into primary action handling; OS/browser auto-repeat could therefore generate extra primary-action events while a key stayed held
target: confirm manually that held Space/Enter no longer skip the pause or death read, while a fresh desktop key press still feels instant and unchanged

primary_pointer_button_integrity:
current: Run #119 now treats only primary-button holds as pointer input across primary-action, held-pointer, steering, and death-release flows, so right-click and middle-click no longer trigger desktop start/retry/resume or active steering by accident
baseline: before Run #118 any pointerdown reached the same primary-action path, and before Run #119 the later held-pointer/steering paths still trusted raw `isDown`, which let non-primary mouse buttons behave like replay/start or steer intents when held
target: confirm manually that left-click and touch still feel instant while non-primary mouse buttons are ignored across both primary action and live steering

pointer_edge_control_integrity:
current: Run #114 now clamps pointer/touch steering targets to the player-reachable arena (`16px` inner margin), so dragging beyond the canvas or arena edge no longer spends movement velocity into an impossible outward lane while the player is already pinned to the wall
baseline: before Run #114 pointer steering aimed directly at the raw pointer world coordinate, so offscreen or outside-arena drag targets could keep wall-edge movement biased into the boundary instead of the nearest reachable escape axis
target: confirm manually that wall-edge pointer/touch control feels more honest and mobile without becoming rail-like, over-corrected, or less precise in close dodges

pause_clock_freeze_integrity:
current: Run #106 now freezes paused elapsed-time queries at `pauseStartedAt`, so any pause-state survival clock read stays pinned to the actual freeze moment instead of drifting with wall-clock time
baseline: before Run #106 `getActiveRunElapsedMs()` always subtracted from live `time.now`, which meant pause state bookkeeping could still observe a growing survival clock even while the overlay promised that time was frozen
target: confirm manually that pause overlay timing feels fully honest during a held pause and resumes without a visible jump, stall, or double-count

runtime_timing_integrity:
current: Run #104 now derives spawn delay, spawn selection time, obstacle speed/target-lag/collision-grace, pause snapshot time, and death-time rounding from the live active-run clock instead of the last cached `survivalTime` frame
baseline: before Run #104 these runtime-only decisions reused `this.survivalTime`, so a spawn timer or focus-loss/death callback landing before the next `update()` could read a one-frame stale time around thresholds like the `10-11s` grace fade
target: confirm manually that `10s` and `11s` edge cases now feel temporally honest without making grace expiry, spawn pressure, or pause snapshot timing feel harsher than intended

game_over_freeze_integrity:
current: Run #105 now pauses the physics world, clears the active spawn-timer reference, and resets pause-release state as soon as a death is recorded, so the death tableau and immediate retry no longer depend on leftover live-run physics/scheduler state
baseline: before Run #105 the fatal obstacle field had its velocity zeroed, but the physics world itself stayed live and `nextSpawnTimer` kept its last object reference even after removal, leaving game-over as a softer state cleanup than the on-screen "run ended" promise
target: confirm manually that death tableau now feels fully frozen and that immediate retry starts cleanly without feeling sticky, delayed, or over-frozen

game_over_retry_release_integrity:
current: Run #112 now snapshots whether movement or pointer input was already held at the moment of death and blocks held retry until that input is released; stale held input no longer auto-restarts the run `180ms` into game-over
baseline: before Run #112 the same held-input confirmation path used for intentional replay also stayed armed after death, so a player dying while still holding move/pointer input could skip most of the death tableau without a fresh retry decision
target: confirm manually that death feedback remains readable until a deliberate retry, while fresh `Space`/`Enter`/tap/click and release-then-hold replay still feel instant and friction-light

non_pointer_start_resume_guard:
current: Run #103 now rearms pointer steering release/held-delay protection whenever a run starts or resumes from keyboard/Space/movement input while the pointer is already down; keyboard-first starts/resumes should no longer drift into immediate pointer steering from a stale held click/touch
baseline: before Run #103 the start/resume path did not distinguish activation source, so a held pointer could still hijack a keyboard- or Space-led start/resume on the very next playing frame even though neutral pointer start/retry guarding already existed
target: confirm manually that keyboard/Space start-resume now stay neutral while deliberate held-pointer start/retry/resume still hands off smoothly without an extra unintended release cycle

edge_target_reachability:
current: Run #101 now clamps obstacle spawn target lag to the player-reachable arena (`16px` inner margin), so wall-edge chase lines aim at coordinates the player center can actually occupy instead of impossible `0/800/600` extremes
baseline: before Run #101 runtime and deterministic proxy both aimed obstacle trajectories at full arena edges even though the player center is bounded by its collider radius, which could over-tighten edge chase lines without changing pacing metrics
target: confirm manually that wall-edge pressure now feels more readable without becoming soft, scripted, or easier to exploit by wall-hugging

obstacle_collision_radius:
current: obstacle sprite still reads as a `12px` disc, but the active obstacle collider is now `11px`
baseline: Run #67 narrowed only the obstacle hitbox to reduce cheap edge grazes without changing player speed, spawn pacing, steering, replay flow, or the opening-fairness helpers
target: confirm manually that this trims unfair edge hits without making obstacle contact feel vague or too forgiving

death_callout_edge_safety:
current: Run #91 makes impact and killer callout labels flip above/below their anchor on top/bottom edges, and Run #109 now also clamps impact, fatal spotlight, and escape-guide label centers horizontally so left/right edge deaths do not push wide labels outside the arena
baseline: before Run #91 `impactMarkerLabel` and `fatalSpotlightLabel` were vertically biased toward "always above", and before Run #109 all three centered callouts still trusted the marker X position even when wide edge labels like `TOP-LEFT` or `BREAK RIGHT` could clip past the left/right border
target: confirm manually that edge deaths keep every direction label readable on all four arena borders without making the death tableau feel jumpy or visually noisy

fatal_threat_attribution_integrity:
current: Run #110 now resolves fatal death attribution across all currently overlapping, collision-ready, visible obstacles instead of trusting the first overlap callback; the death tableau picks the deepest overlap first and breaks ties with the stronger obstacle-to-player closing vector
baseline: before Run #110 the first overlap callback obstacle became the fatal spotlight/callout source even if another obstacle in the same frame had already penetrated deeper into the player or represented the more direct closing threat
target: confirm manually that stacked or near-simultaneous collisions blame the obstacle the player actually perceives as the killer, without making spotlight selection feel unstable or noisy

death_tableau_visual_priority:
current: Run #111 now lifts the selected fatal obstacle to `depth=3` during game-over freeze, while non-fatal obstacles are reset to `scale=1`, `alpha=0.24`, `depth=2`; overlap stacks should no longer let spawn-grace silhouette drift or display order muddy the highlighted killer
baseline: before Run #111 fatal threat attribution could already pick the right obstacle, but death freeze still left every obstacle on the same depth and non-fatal overlap sprites could keep non-neutral scale state, making the killer spotlight visually less decisive in dense collisions
target: confirm manually that overlap deaths now keep the chosen killer visually dominant without making the tableau feel artificial or hiding too much surrounding pressure context

center_overlap_death_guidance:
current: Run #93 now keeps fully centered overlaps as `center`, and Run #113 completed that honesty pass by removing the fake upward escape ray from `RESET CENTER`; centered deaths now keep both copy and guide visuals neutral on the player center
baseline: before Run #93 centered overlaps could still borrow obstacle velocity and surface a fake lane label, and before Run #113 the escape-guide visuals still defaulted to an upward lane even after the copy had switched to `CENTER COLLISION` / `Caught at center`
target: confirm manually that center-overlap deaths now read as honest overlap moments rather than fabricated lane mistakes, while still leaving enough information to make the retry feel actionable

offscreen_collision_guard:
current: obstacle overlap now requires the obstacle center to clear an `11px` visible-arena margin, so the collider must be fully inside the playfield before `collisionReady` obstacles can damage the player
baseline: Run #69 added the initial narrow guard to remove invisible or last-pixel edge hits without changing pacing, speed anchors, replay/start flow, obstacle radius, or telemetry/export semantics; Run #71 aligned the deterministic survival proxy with the same visible-arena hit rule and `96px` offscreen cull margin used by runtime; Run #88 tightened the hit rule from center-only visibility to a full `11px` collider margin while preserving the checked aggregate snapshot
target: confirm manually that wall-hugging players no longer take unfair offscreen hits and that the full-collider visibility rule does not make edge contact feel ghostly or delayed

early_spawn_collision_grace:
current: first `10s` spawns move immediately but cannot deal damage for `260ms`; Run #92 now fades that protection through `10-11s` instead of dropping it to `0ms` in one frame, and Run #72 had already made the unlock depend on active run elapsed time so focus-loss pause no longer burns the remaining grace window
baseline: added in Run #52 as a narrow fairness guard without changing spawn pacing or obstacle speed anchors; Run #72 aligned runtime activation with the pause-frozen survival clock instead of wall-clock scene time; Run #92 preserved the checked aggregate snapshot while guarding `10.5s -> 130ms` and `11s -> 0ms` as the new transition
target: confirm manually that this removes cheap spawn-touch moments around the `10s` boundary without making new obstacles feel ghostly or too forgiving, and that pause/resume does not silently consume the remaining grace window

opening_required_spawn_distance:
current: first `6s` add `+160px` to the required spawn distance, then return to the prior baseline
baseline: added in Run #53 to make the existing spawn-reroll fairness helper actually activate during the opener
target: confirm manually that this removes crowded opening lanes without making the first seconds feel empty

validation_export_contract:
current: `V` export now produces `5 runs | first death 6.3s | early 20% | 5/5 runs, review early deaths`, counts `runs=` from completed sample deaths instead of raw start count, the waiting/playing HUD progress satirlari ayni completed-run semantigini kullaniyor, and Run #100 summary/log helpers now also keep `runs` on completed sample while exposing raw start volume separately as `startedRuns`; `R` reset still clears the saved export so HUD summary returns to `not saved yet`
baseline: Run #54 aligned the export with actual early-death risk; Run #55 aligned sample reset with that export by clearing stale saved summaries instead of carrying them into a fresh session; Run #61 aligned `first death` with the minimum death in the sample instead of the first chronological run; Run #87 moved the checked deterministic baseline text to `26.5s avg / 6.3s first death / 4% early` while the 5-seed validation sample average stayed `24.1s`; Run #98 moved export `runs=` to completed deaths and Run #99 aligned the in-game progress text with the same contract
target: keep `V` export, parser, in-game progress, and summary/log helpers aligned, count validation sample size from completed runs only, preserve any raw start-count debugging in a clearly separate field, never mark a 5-run sample as healthy while it still contains `<10s` deaths, never let a fresh reset show a stale export as if it belongs to the new sample, and keep the embedded deterministic baseline text synchronized with the latest checked gameplay snapshot

forward_pressure_spawn_filter:
current: first `6s` spawn selection now scores forward-alignment from the player's projected `0.18s` path instead of the exact current center, and Run #102 now drops any velocity component that is already blocked by the player's reachable arena margin before scoring, so the existing reroll helper can still deflect cheap oncoming crossfire without needlessly rejecting safe edge/corner spawns while the player is already pinned against that wall
baseline: Run #73 added this narrow gameplay filter after outlier-specific lag/trajectory experiments either failed or regressed the deterministic guard set; Run #83 aligned the forward-pressure reference with the same projected-path logic already used by the lane-stack filter while holding the checked aggregate snapshot at `26.6s` average / `1 / 3 / 2 / 18` buckets / `0.4` average rerolls and adding a targeted opener regression assert for the preserved left-edge spawn case
target: confirm manually that this reduces cheap oncoming opener pressure without making spawn variety feel scripted or hollow, and that projected-path scoring preserves readable escape lanes better than exact-center scoring even when the player is wall-pinned or corner-pinned

projected_path_wall_edge_clamp:
current: Run #84 now clamps the projected-path spawn reference to the visible arena before forward-pressure or lane-stack scoring, so wall-edge escape lines are judged against reachable space instead of imaginary offscreen lanes
baseline: before Run #84 the projected reference could slip outside the arena when the player was already pressed into a wall, undercounting nearby same-side pressure in those edge cases; the new regression guard rerolls a dangerous left-edge spawn into a safe right-edge lane for a player at `{18,300}` moving left
target: confirm manually that wall-hugging escapes no longer get opener spawns scored against unreachable offscreen space, without making edge spawns feel overly scripted

lane_stack_spawn_filter:
current: first `6s` spawn selection still penalizes candidates that arrive from the same lane as an active obstacle already within `160px`, and Run #89 now requires that nearby obstacle's full `11px` collider to be visible inside the arena before it counts as lane pressure; projected-path scoring and deterministic average spawn reroll stay at `0.4`
baseline: Run #74 added this narrow gameplay filter after more aggressive center-cut and intercept ideas regressed the deterministic guard set; Run #76 constrained the filter to visible threats only and added a deterministic regression check for offscreen-vs-visible behavior while holding the checked snapshot at `26.6s` average / `1 / 3 / 2 / 18` buckets / `0.5` average rerolls; Run #78 kept the same checked survival guards while trimming average rerolls from `0.5` to `0.4`; Run #89 aligned "visible threat" with the same full-collider `11px` margin already used by runtime hit logic while preserving the checked aggregate snapshot
target: confirm manually that this trims repeated same-lane opener pressure without letting partial-visible edge obstacles script rerolls too early, and that the projected-path reference still feels natural rather than softer or less readable

seed3_outlier_trace:
current: existing deterministic telemetry now also captures the seed `#3` opener trace that still dies at `6.3s`: `6 spawn / 0 reroll`, with spawn times `0.9 / 1.9 / 3.0 / 4.0 / 5.0 / 6.0`, `spawn#4` from `{636,-56}` under `86.3px` nearest visible pressure and `spawn#6` from `{-56,242}` under `81.4px` nearest visible pressure
baseline: Run #77 added this trace to the existing `telemetry-reports.ts` and `telemetry-check.ts` surface after several narrow spawn-selection experiments improved seed `#3` only by breaking the checked guard set elsewhere
target: future spawn-selection tuning should move at least one of these pinch moments while preserving `avg >= 26.5s`, `<10s <= 1`, `10-20s <= 3`, and `30s cap >= 17`

retry_delay_integrity:
current: retry delay is now counted only when the same browser session has a recorded `lastDeathAt`; a fresh tab/session start no longer inherits lifetime `lastDeathAt` as a fake replay
baseline: Run #56 fixed `recordRunStart` so stale localStorage deaths cannot inflate replay-speed telemetry after a new session opens
target: keep retry telemetry honest across reload/new-session boundaries while preserving same-session instant replay measurement

held_movement_retry_resume:
current: game-over and paused states now accept a continuously held movement key after `180ms`, so keyboard players can retry/resume without an extra release-press cycle; Space/Enter/tap and fresh movement press still work
baseline: added in Run #58 as a narrow replay-friction fix without touching pacing, fairness, validation contracts, or touch pointer steering
target: confirm in manual browser sample that this reduces keyboard replay friction without causing accidental auto-restart or auto-resume

held_pointer_retry_resume:
current: game-over still accepts a continuously held pointer/touch after `180ms`, but Run #81 now makes focus-loss pause consume the refocus click/tap first; paused pointer resume arms only after a release, then accepts a fresh tap/click or a newly held pointer
baseline: Run #60 added held pointer retry/resume to close the replay-friction gap with keyboard; Run #81 narrowed only the focus-loss pause branch after source review showed the refocus click itself could resume the run accidentally
target: confirm in manual browser sample that game-over pointer retry still feels friction-light while focus-loss pause no longer creates accidental auto-resume and still resumes cleanly after a fresh tap/hold

pointer_tap_start_neutrality:
current: Run #97 keeps waiting/game-over `tap/click` primary actions neutral, but now also clears the steering lock on pointer release and rearms deliberate held-pointer start/retry steering after the same `180ms` confirmation window; pointer control should no longer stay blocked for the whole run after a pointer-led start
baseline: Run #96 removed same-press accidental steering on pointer start/retry, but source review showed that the new guard could also trap pointer steering behind a release-only lock and break intentional held-pointer start/retry flow in live play
target: confirm manually that tap/click start and retry now feel neutral and controlled, and that deliberate hold-to-steer players regain movement either by release-then-steer or by simply holding through the `180ms` start confirmation on desktop and touch devices

held_start_acceptance:
current: waiting state now also accepts a continuously held movement key or held pointer/touch after `180ms`, so initial start uses the same one-action input acceptance model as replay/resume
baseline: Run #68 extended the existing held-input acceptance window to the waiting screen without changing balance, telemetry/export wording, or the opening-fairness helpers
target: confirm in manual browser sample that this removes extra release-repress friction on start without causing accidental auto-start on desktop or mobile

input_audio_unlock_parity:
current: Run #79 routes movement-key fresh press and held-input start/resume through the same `activatePrimaryAction()` path as Space/Enter/tap, so keyboard-first runs now also call `unlockFeedbackAudio()` before gameplay begins or resumes
baseline: before Run #79 only explicit primary-action events unlocked the audio context; movement-key-led starts could leave death feedback silent for the whole run
target: verify in manual browser sample that keyboard-first starts/resumes consistently play the death feedback tone without causing accidental starts or audio pops

focus_loss_pointer_resume_guard:
current: Run #81 makes the first pointer click/tap after a focus-loss pause restore focus only; paused pointer resume is ignored until the pointer is released once, then a fresh tap/click or newly held pointer can resume the run
baseline: before Run #81 paused `pointerdown` could fire on the same gesture used to refocus the window, creating a source-level accidental auto-resume risk without changing deterministic telemetry
target: confirm manually that refocus no longer resumes by surprise and that the extra release requirement does not make pointer/touch resume feel clumsy

focus_loss_movement_resume_guard:
current: Run #82 requires any movement key that was already held when focus loss paused the run to be released before paused held-movement resume can arm again, and Run #95 keeps blur-sonrasi fresh movement resume immediate by remembering whether movement was actually active at blur time instead of forcing stale-held state for everyone
baseline: before Run #82 the pause flow guarded pointer refocus clicks, but a movement key kept held across blur/refocus could still resume the run after the normal `180ms` held-action window without a new player decision; before Run #95 even players who were not holding movement at blur could lose their first fresh refocus press to the held-input delay because `movementInputWasActive` was forced `true`
target: confirm manually that keyboard players no longer get surprise auto-resume after alt-tab/refocus and that intentional fresh press/hold resume still feels immediate enough

focus_loss_spawn_grace_visual_freeze:
current: Run #86 now pauses active obstacle spawn-grace alpha/scale tweens during focus-loss pause and resumes them only when gameplay resumes, so the visual onboarding stays aligned with the pause-safe collision-grace window instead of silently finishing behind the pause overlay
baseline: before Run #86 collision readiness already froze on active run elapsed time, but the obstacle's spawn-grace tween could keep animating during focus loss and make a still-graced obstacle look fully settled when the run resumed
target: confirm manually that pausing during an early spawn keeps both the grace logic and the obstacle's visual read in sync, without leaving reused obstacles stuck half-faded or replaying the tween twice after resume

freeze_state_obstacle_cull:
current: Run #90 now runs obstacle cull only while `playing`, so focus-loss pause and game-over freeze no longer let offscreen obstacles silently drop back into the pool behind the overlay/tableau
baseline: before Run #90 `update()` called `cullObstacles()` before the phase guard, which meant a supposedly frozen run could still mutate obstacle lifecycle state while paused or after death
target: confirm manually that pause/game-over still look stable and honest without creating visible pool artifacts or retry-state carry-over

pooled_obstacle_tween_integrity:
current: Run #80 kills obstacle-local tweens before reuse, cull, reset, and death freeze, so the early collision-grace fade/scale animation should no longer leak into later pooled obstacle presentations
baseline: before Run #80 pooled obstacles could keep an old tween alive after `disableBody(true, true)`, allowing reused obstacles to inherit stale alpha/scale motion across spawn or game-over transitions
target: confirm in manual browser sample that reused obstacles never pop in half-faded, over-scaled, or oddly re-animating after cull/restart/game-over

pointer_steering_precision:
current: pointer/touch steering now uses analog speed scaling with a `10px` dead-zone and reaches full `260` speed by `120px`, so short drags still allow finer dodge adjustments while longer escapes hit full speed sooner
baseline: Run #63 changed pointer steering to analog control; Run #65 tightened only the full-speed distance from `140px` to `120px` without changing keyboard movement, replay acceptance, pacing, or deterministic telemetry contracts
target: confirm in manual browser sample that close-range pointer/touch corrections still feel controllable while long escapes no longer feel sluggish on desktop or mobile

waiting_gameover_hud_clarity:
current: Run #94 compacts waiting and game-over telemetry into shorter summary blocks, hides verbose export detail unless a saved export exists, and shifts the support strip to a player-first `break 10s, then chase your best` goal line
baseline: before Run #94 waiting/game-over HUD repeated session, lifetime, recent-death, export, and telemetry-hotkey detail across too many lines, which risked crowding first-look clarity and retry focus even though the underlying telemetry contract was correct
target: confirm manually that the HUD now feels less bureaucratic without hiding validation/export affordances or making progress harder to read after a death

early_spawn_target_lag:
current: first `10s` spawn aim uses `0.18s` of player-velocity lag, then returns to exact-position targeting
baseline: added in Run #51 to soften unfair early intercept lines without changing spawn pacing or obstacle speed anchors
target: confirm manually that this improves fairness without making the opening chase feel soft

manual_validation_sample:
current: ilk insan sinyali alinmis durumda, fakat bu runtime'da headed sample hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` yok). Run #121 ve #122 sonrasi en kritik manuel dogrulama death screen clarity / retry istegi / game-over bilgi dagilimi uzerinde.
target: sonraki hedefli sample'da death ekraninin artik daha rahat okunup okunmadigi, retry istegini iyilestirip iyilestirmedigi, sag ust snapshot + alt support kombinasyonunun yeterince sakin olup olmadigi, `60s clear!` mesajinin earned kalip kalmadigi ve onceki control/fairness fix'lerinin insan gozunde ucuz hissettirmeden calisip calismadigi not edilmeli

telemetry_sample_integrity:
current: `R` reset is blocked while a run is active (`playing` or `paused`), so first-death, retry-delay, and validation sample counters cannot be zeroed mid-run
baseline: fixed in Run #50 after active-play reset could silently corrupt the current sample
target: keep reset available between runs without allowing active-run telemetry corruption

telemetry_regression_check:
current: `npm run telemetry:check` passes on the Run #114 codebase and still asserts fresh-session retry remains `null`, same-session retry delay is still tracked, the deterministic survival proxy still models runtime `11px visible-arena hit margin` plus `96px` offscreen cull margin, offscreen obstacle'larin lane-stack reroll tetiklememesi guard altinda, partial-visible edge obstacle'larin da lane-stack reroll tetiklememesi guard altinda, projected-path forward-pressure preserved left-edge opener senaryosu sabit, wall-edge projected-path reference arena icine clamp'leniyor, wall-pinned corner velocity safe top spawn'i gereksiz reroll'e itmemesiyle guard altinda, offscreen pointer target'inin wall-edge steering'i imkansiz outward lane'e harcamamasi guard altinda, center escape guide helper'i centered overlap'te notr kaliyor, death-direction helper ayni-yon chase carpismasinda gercek threat lane'i koruyor, centered overlap durumda sahte velocity lane'i yerine `center` korunuyor, top-edge impact ve bottom-edge fatal callout placement'lari arena icinde kalacak sekilde guard altinda, `10.5s -> 130ms` ve `11s -> 0ms` collision-grace fade'i guard altinda, and seed `#3`un ilk alti spawn trace'i yeni visible-count farki ile sabit kaliyor
baseline: as of Run #95 asserts pacing, required spawn distance, projected-path forward-pressure and lane-stack spawn reroll behavior through the checked snapshot, the wall-edge projected-path clamp, visible-only ve full-collider-visible lane-stack guard'larini, slightly firmer `20s+` speed anchors, survival, survival buckets, honest validation summary/report wording, early spawn collision grace plus its `10-11s` fade, the narrower obstacle collider, full visible-arena hit margin, retry-delay session integrity, runtime-aligned collision/cull proxy behavior, death-direction chase/collision readability guards, centered overlap fallback honesty, edge-safe death callout placement, and the seed `#3` outlier trace
target: run before and after any future balance or telemetry change; runtime-only UX fixes can stay on build verification when deterministic contracts are unchanged

browser_validation_smoke:
current: `npm run telemetry:browser-validation-smoke` and `npm run telemetry:validation-ready -- --with-smoke` pass; smoke injects 5 sample runs, exports validation summary, confirms `Last export` survives reload, and now shows the minimum injected death (`9.8s`) as `first death`
baseline: Run #57 fixed the smoke script to connect to a page CDP target instead of the browser websocket and to verify reset/export through scene methods plus storage state; Run #61 aligned smoke-visible `first death` with the same minimum-death semantics used by deterministic validation
target: keep smoke green as a lightweight browser harness, but treat it as prerequisite evidence only; replay/start/pause friction still requires human sample

validation_export_readiness:
current: Run #151 validation export hazirligini ortak `5-run` sample kontratina hizaladi; `V` export run aktifken hala bloklu ve artik session telemetry'de yalnizca `5` tamamlanmis run oldugunda aciliyor
baseline: Run #115 `V` export'u aktif run ve sifir-completion session durumunda bloke etmisti, fakat readiness kontrati hala "en az bir bitmis run" seviyesindeydi; bu da oyuncuya soylenen `fresh 5-run sample` copy'siyle davranis arasinda drift birakiyordu
target: keep validation export tied to stable `5`-run completed samples only; if mid-run snapshots or earlier checkpoints are ever needed, they must use an explicitly separate contract instead of weakening validation semantics

build_health:
current: `npm run build` passes; Vite still reports a large chunk warning for the main bundle
baseline: build stayed green in Run #35
target: keep build green; do not chase bundle optimization ahead of gameplay UX unless it blocks shipping

---

# Notes

- source: `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, in-game telemetry HUD
- strategic layer note: bu metrikler artik tek basina yon belirleyici degil; God katmani bunlari haftalik faz hedefleriyle birlikte yorumlar
- partner layer note: factory-level kararlar verilirken bu metrikler human signals, experiments ve retention notlari ile birlikte okunmalidir
- player-facing AI panel copy still reflects the same validation semantics, but its static narrative now lags the latest 20s+ chase tuning because audit governance froze copy churn this turn
- player-facing AI panel copy still reflects the same validation semantics, but its static narrative now also lags the new `26.5s` deterministic baseline because audit governance still freezes copy churn on that surface
- deterministic survival method: 24 seed, 30s cap, center-seeking avoidance controller, 180ms reaction interval, effective player speed 214
- current tuning signal: deterministic snapshot artik `26.5s / 6.3s / 4%`; Run #78 projected-path lane-stack referansi average spawn reroll'u `0.4`e indirdi, Run #83 ayni projected-path mantigini forward-pressure scoring'e de tasidi, Run #84 bu projected-path referansini duvar-kenarinda arena icine clamp'ledi, Run #87 ise `20s+` chase'i kucuk bir kademe tekrar sikilastirdi, Run #88 tam gorunmeden gelen edge hit'leri kapatan `11px visible-arena hit margin` ekledi ve Run #93 center-overlap death guidance'i sahte lane uydurmadan daha durust hale getirdi; ama opener'da bir `<10s` outlier hala var
- deterministic survival proxy artik runtime ile ayni `11px visible-arena hit margin` ve `96px` offscreen cull margin'ini modelledigi icin collision/cull tarafinda sessiz drift riski azaldi
- seed `#3` outlier'i artik tek satir `6.3s` metric olarak degil, hangi spawn zinciriyle geldigini gosteren sabit bir deterministic trace olarak da tutuluyor
- Run #72 collision grace unlock'unu aktif run elapsed zamanina tasidigi icin focus-loss pause sirasinda "run is frozen" vaadi gameplay tarafinda daha tutarli
- compact waiting/game-over telemetry, collapsed run panel, support-strip copy hiyerarsisi, inactive-phase input freeze ve focus-loss pause'un birlikte nasil algilandigi icin manuel sample hala gerekli
- browser scroll/touch gesture guard'i runtime-only bir kontrol iyilestirmesi; deterministic check yesil kalsa da klavye/touch hissi icin insan sample hala gerekli
- Run #105 game-over freeze cleanup'i runtime-only bir iyilestirme; deterministic guard yesil olsa da death tableau/retry hissi icin insan sample hala gerekli
