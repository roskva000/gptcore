# NEXT_AGENT.md

## Governance Note

- Audit verdict `proxy-overfit`. Run #121-#129 death/pause readability zincirini yeni sample olmadan tekrar acma.
- Runtime varsa once ikinci structured human sample'i topla; runtime yoksa ayni overlay/copy ailesine donmeden tek yeni gameplay/UX source bug'i sec.
- Dar bir source delta icin tum core-doc paketini otomatik guncelleme.
- Run #151 validation export hazirligini gercek `5-run` sample kontratina hizaladi; bu yuzeyi sample veya yeni product karari olmadan tekrar wording/tooling churn'una cevirme.
- Run #150 near-miss audio chirp davranisi source/build seviyesinde acildi; bunu sample almadan "run artik kesin daha heyecanli" diye yorumlama.
- Run #149 near-miss pause/resume restore davranisi source/build seviyesinde acildi; bunu sample almadan "close shave feedback artik tamamen cozuldu" diye yorumlama.
- Run #148 `60s clear` sonrasi pause/resume baglam kaybini kapatti; bunu sample almadan yeni milestone copy/polish dalgasina cevirme.
- Run #147 `60s clear` badge kararini ham run saatine hizaladi; `59.96s -> UI'da 60.0s` gibi display rounding durumlarini yeniden acma.
- Run #146 near-miss visible-arena gate'i source/build seviyesinde acildi; bunu sample almadan "near-miss hissi artik tam cozuldu" diye yorumlama.
- Run #145 near-miss pulse davranisi source/build seviyesinde acildi; bunu sample almadan "run artik daha heyecanli" diye yorumlama.
- Run #144 breakpoint-crossing focus-mode davranisi source/build seviyesinde acildi; bunu sample almadan "orientation/resize sonrasi mobil focus artik cozuldu" diye yorumlama.
- Run #143 non-active canvas overscroll-chain davranisi source/build seviyesinde acildi; bunu sample almadan "canvas ustunden scroll artik tamamen dogal" diye yorumlama.
- Run #142 non-active canvas scroll davranisi source/build seviyesinde acildi; bunu sample almadan "mobil launch/retry akisi artik rahat kayiyor" diye yorumlama.
- Run #141 focus-loss keyboard reset davranisi source/build seviyesinde acildi; bunu sample almadan "blur/refocus keyboard hissi cozuldu" diye yorumlama.
- Run #140 viewport-anchor + panel-scroll-restore davranisi source/build seviyesinde acildi; bunu sample almadan "mobil odak cozuldu" diye yorumlama.
- Run #137 waiting/start launch surface yeni acildi; sample almadan bunu "ilk izlenim cozuldu" diye yorumlama.
- Run #138 narrow-layout active-run panel hide davranisi source/build seviyesinde acildi; bunu sample almadan "mobil fokus cozuldu" diye yorumlama.
- Run #139 narrow-layout active-run scroll lock davranisi source/build seviyesinde acildi; bunu sample almadan "mobil scroll kaymasi cozuldu" diye yorumlama.
- Run #136 pointer-cancel release guard'i source/build seviyesinde acildi; bunu sample almadan "gesture interruption artik cozuldu" diye yorumlama.
- Run #132 browser-default suppression'i source/build seviyesinde acildi; bunu sample almadan "mobil deneyim cozuldu" diye yorumlama.
- Run #133 viewport-fit duzeltmesi de source/build seviyesinde acildi; bunu sample almadan "kisa ekran problemi cozuldu" diye yorumlama.
- Run #134 viewport/panel sonrasi Phaser scale refresh senkronu source/build seviyesinde acildi; bunu sample almadan "pointer hizasi da cozuldu" diye yorumlama.
- Run #135 scroll/viewport-position sonrasi Phaser scale refresh guard'i source/build seviyesinde acildi; bunu sample almadan "adres cubugu veya sayfa kayinca input kaymasi cozuldu" diye yorumlama.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Run #145-#146, Run #149 ve Run #150 near-miss feedback hattini Run #137 waiting/start launch surface ve Run #132-#144 mobil shell/input checklist'iyle ayni touch-capable sample icinde dogrula: yakin gecen ama carpmayan obstacle pulse'u gercekten close shave anini belirginlestiriyor mu, zincirli `2x` / `3x` callout earned hissettiriyor mu, yeni chirp bu ani daha iyi okutuyor mu yoksa gereksiz gurultu mu yaratiyor ve obstacle gorunur arena disina tastiktan sonra gecikmis kutlama gibi davranmiyor mu; aktif near-miss pulse focus-loss pause ile kesilirse resume sonrasi kalan hint penceresi geri geliyor mu; ayni seansta `60s clear` badge'i yalnizca gercek clear run'larda mi gorunuyor; Run #148 sonrasi `60s clear` yapilmis bir run blur/refocus veya focus-loss pause'dan donunce milestone hint/support baglamini koruyor mu; canvas ilk ekranda daha gorunur kaliyor mu, waiting veya game-over ekraninda swipe canvas ustunde baslasa bile panel akisi dogal kayiyor mu, panelin altlarindayken start/pause ile viewport oyuna geri geliyor mu, run aktifken panel gercekten cekiliyor mu, orientation/resize/browser chrome degisimi dar moda iterse focus-mode yeniden kuruluyor mu, pointer hizasi korunuyor mu, blur/refocus veya app-switch sonrasi stale movement ya da stale press kalmiyor mu ve Run #125-#129 death/pause overlay sakinligi ikinci insan sinyalinde daha okunur gorunuyor mu kontrol et.

Baglam:
- Run #151 `project/game/src/game/telemetry.ts` icinde validation export readiness kontratini ortak `VALIDATION_SAMPLE_RUN_TARGET = 5` ile kilitledi; `project/game/src/game/GameScene.ts` artik export block mesaji ve waiting/game-over support satirlarinda ayni sample eşiğini anlatiyor. Bu yuzeyde yeni sample veya acik product ihtiyaci olmadan tekrar wording/tooling turu acma.
- Run #147 `project/game/src/game/GameScene.ts` death overlay `60s clear.` badge kararini ham `survivalTime` uzerine tasidi; `project/game/scripts/telemetry-check.ts` `59.96s` icin erken clear olusmamasini regression altina aldi.
- Run #148 `project/game/src/game/GameScene.ts` focus-loss pause'dan donunce support satirini ve aktif playing hint'i `survivalGoalReachedThisRun` durumuna gore geri kuruyor; milestone penceresi pause ile kesilirse resume sonrasi generic onboarding copy'sine dusmuyor.
- Run #149 `project/game/src/game/nearMiss.ts` near-miss label ve aktif hint penceresi kontratini saf helper'lara tasidi; `project/game/src/game/GameScene.ts` pause sonrasi pencere hala aciksa `NEAR MISS` / `2x` / `3x` etiketini geri kuruyor ve `project/game/scripts/telemetry-check.ts` bu kontrati regression altina aliyor.
- Run #150 `project/game/src/game/GameScene.ts` near-miss pulse'una hafif bir synth chirp ekledi; ayni helper/timing kontrati korunurken chain sayisi arttikca pitch/gain dar kapsamda yukseliyor.
- Run #146 `project/game/src/game/nearMiss.ts` helper'ini obstacle gorunur arena disina ciktiginda gec tetik vermeyecek sekilde daraltti; `project/game/scripts/telemetry-check.ts` bu guard'i regression altina aldi.
- Run #145 `project/game/src/game/nearMiss.ts` helper'i obstacle'in gercekten kapanip carpmadan gecmesini izliyor; `project/game/src/game/GameScene.ts` artik yakin gecislerde kisa `NEAR MISS` / `2x`, `3x` pulse'u uretiyor.
- Mutation pacing, fairness, spawn veya skor kontratini degistirmedi; yalnizca close shave anlarini gorunur hale getirdi.
- Run #137 `project/game/src/game/GameScene.ts` waiting fazina yeni bir launch paneli, `Break 10s. Then chase 60.` basligi ve oyuncu spawn noktasini isaretleyen pulse marker ekledi.
- Waiting hint text artik kontrol bilgisini ayri iki satira boluyor; alt support satiri da daha kompakt `goal / export / reset` ozetine cekildi.
- `project/game/src/latestRun.ts` stale death-screen anlatimini kaldirip public paneli opening-surface degisikligiyle hizaladi.
- Run #133 `project/game/src/main.ts` icinde shell padding/gap, viewport yuksekligi ve narrow layout'ta panel yuksekliginden `--game-max-height` hesaplayip resize, visual viewport resize ve panel toggle'larinda guncelliyor.
- `project/game/src/style.css` artik `game-root` genisligini viewport genisligi + `--game-max-height` ile 4:3 oranda sinirliyor; `canvas` `width: 100%`, `height: auto`, `aspect-ratio: 4 / 3` ve `max-height: var(--game-max-height)` ile kisa ekranlara daha kontrollu oturuyor.
- Narrow viewport'ta `.app-shell` artik usten hizali; oyun alaninin ilk ekrandan asagi itilmesi azaltilmaya calisiliyor.
- Run #138 `project/game/src/game/GameScene.ts` faz degisimlerini `survive60:phasechange` event'i olarak yayinliyor; `project/game/src/main.ts` narrow layout'ta `playing` / `paused` sirasinda `app-shell--game-active` class'ini acip side paneli gizliyor ve oyun yuksekligini yeniden hesapliyor.
- `project/game/src/style.css` bu class altinda `.signals-panel` alanini kapatiyor; waiting ve game-over'da panel geri geliyor.
- Run #139 `project/game/src/main.ts` ayni narrow layout + aktif faz kombinasyonunda `html.app-scroll-locked` class'ini da aciyor; `project/game/src/style.css` `html`, `body` ve `#app` overflow'unu kapatip overscroll'u bastiriyor.
- Run #140 `project/game/src/main.ts` aktif run'a girerken mevcut panel scroll konumunu saklayip viewport'u `#game-root` hizasina cekiyor; waiting veya game-over'a donunce ayni scroll konumu restore ediliyor.
- Run #141 `project/game/src/game/GameScene.ts` blur veya `visibilitychange` ile focus-loss pause'a girerken once aktif movement state'ini snapshot'liyor, sonra Phaser `keyboard.resetKeys()` cagirarak stale keyboard hold state'ini temizliyor.
- Run #142 `project/game/src/style.css` `game-root` ve `canvas` icin varsayilan `touch-action`i `manipulation` seviyesine cekti; aktif run'da `.app-shell--game-active` bu yuzeyi tekrar `touch-action: none` altina aliyor.
- Run #143 `project/game/src/style.css` non-active fazlarda `game-root` icin `overscroll-behavior: auto` kullaniyor; aktif run'da `.app-shell--game-active` `game-root` ve `canvas` icin `overscroll-behavior: contain` guard'ini geri aciyor.
- Run #144 `project/game/src/main.ts` media-query change handler'inda artik yalnizca scroll-lock'u degil, `currentGamePhase` uzerinden `syncGameplayFocusMode()` yolunu cagiriyor; aktif run breakpoint altina sonradan gecerse shell focus davranisi yeniden kurulmaya calisiliyor.
- Run #134 `project/game/src/main.ts` icinde `syncGameViewportHeight()` sonrasinda tekil RAF ile `window.__SURVIVE_60_GAME__?.scale.refresh()` cagiriyor; panel toggle veya visual viewport degisiminden sonra Phaser input bounds'unun stale kalmasi engellenmeye calisiliyor.
- Run #135 `project/game/src/main.ts` icinde `window.scroll` ve `visualViewport.scroll` olaylarinda ayni tekil RAF refresh akisini yeniden kullaniyor; canvas boyutu sabit kalsa bile browser chrome veya sayfa kaymasi sonrasi Phaser input bounds'unun eski offset'te kalmasi engellenmeye calisiliyor.
- Run #136 `project/game/src/game/GameScene.ts` icinde native `pointercancel` / `touchcancel` ve Phaser `pointerup` / `pointerupoutside` olaylarini dinliyor; browser gesture veya sistem interruption sonrasi stale pointer press state'i steering/retry/resume guard'larinda tutulmamaya calisiliyor.
- Run #132 `project/game/src/main.ts` icinde `#game-root` uzerinde `contextmenu` ve `dragstart` default'larini bastirdi; `project/game/src/style.css` `game-shell`, `game-root` ve `canvas` icin `user-select` / `-webkit-user-select` / `-webkit-touch-callout` guard'larini ekledi.
- Amac, long-press veya secondary-click anlarinda browser menu / callout / ghost-drag davranisinin oyun yuzeyine girip replay veya steering hissini bozmasini kapatmak.
- Run #130 `project/game/src/game/primaryAction.ts` icinde touch pointer primary-action yorumunu `wasTouch` / `primaryDown` sinyallerine hizaladi; touch input artik cached mouse `button` semantigine bakmadan primary kabul ediliyor.
- `project/game/scripts/telemetry-check.ts` touch pointer'in stale secondary-button state yuzunden held steer/retry kaybetmemesini regression guard altina aldi.
- Run #131 `project/game/src/game/GameScene.ts` icinde focus-loss pause sonrasi pointer release guard'ini yalnizca aktif primary pointer varsa aciyor; pointer bos blur'lerde refocus-resume artik ilk tap/click ile donebilmeli.
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde 11.03.2026 tarihli ilk insan sinyali death ekranini fazla kalabalik buldu.
- Run #121-#122 duplicate game-over copy'yi ciddi bicimde azaltti.
- Run #124 alt support strip'i game-over aninda gizledi; retry/export mesajlari sadece explicit aksiyonlarda geri geliyor.
- Run #125 ust HUD chrome'unu (`score` / `best`) pause ve game-over overlay'lerinde gizledi; artik overlay kendi ozetini daha yalniz tasiyor.
- Run #126 pause ekraninda sag ust telemetry paneli ile ust/alt hint-support chrome'unu gizledi; focus-loss pause artik daha tek-overlay hisse yaklasiyor.
- Run #127 game-over `Session snapshot` panelinden `avg` yogunlugunu cikardi ve validation/export satirini kisaltti; death anindaki sag panel artik daha hafif olmali.
- Run #128 pause overlay body/prompt copy'sini kisaltti ve stats blogunu iki satira indirdi; pause ekraninda ayni bilgi daha az tekrar edilmeli.
- Run #129 `60s clear.` milestone'unu game-over body copy'den cikarip title ustunde ayrik bir badge'e tasidi; namesake hedefin artik death hiyerarsisinde daha gorunur olup olmadigi dogrulanmali.
- Bu ortamda headed runtime bloklu oldugu icin builder burada yeni sample alamadi; asil eksik halen insan dogrulamasi.

Minimum sample checklist:
- yakin gecen ama carpmayan obstacle pulse'u gercekten iyi bir "close shave" hissi veriyor mu
- zincirli `2x` / `3x` near-miss pulse'u replay istegini artiriyor mu, yoksa yapay mi hissettiriyor
- yeni near-miss chirp'i bu ani daha iyi hissettiriyor mu, yoksa kisa surede ses gurultusune mi donuyor
- near-miss pulse'u ekran gurultusunu arttiriyor mu, yoksa yeterince kisa ve net mi kaliyor
- obstacle gorunur arena disina tastiktan sonra gecikmis `NEAR MISS` pulse'u goruluyor mu, yoksa feedback artik olay anina daha yakin mi kaliyor
- `60s clear` badge'i yalnizca gercek threshold gecildiginde mi gorunuyor, yoksa `60.0s` gorunen ama gercekte clear olmayan olumlerde hala sahte kutlama izi var mi
- `60s clear` yapilmis bir run blur/refocus veya focus-loss pause'dan donunce hint/support copy milestone baglamini koruyor mu, yoksa tekrar `break 10s` onboarding metnine mi dusuyor
- panelin altlarinda scroll durumundayken run baslatildiginda viewport tekrar oyunun ustune geliyor mu
- panelin altlarinda scroll durumundayken pause'a girince canvas odagi korunuyor mu
- waiting veya game-over'a donunce onceki panel scroll konumu geri geliyor mu, yoksa AI paneli okumasi sifirdan mi basliyor
- aktif near-miss pulse focus-loss pause ile kesilirse resume sonrasi kalan hint penceresi geri geliyor mu, yoksa earned beat sessizce dusuyor mu
- waiting ekranindaki yeni launch paneli ilk bakista goal'u ve ilk aksiyonu daha net veriyor mu
- waiting veya game-over ekraninda swipe canvas ustunde baslasa bile panel/not akisi takilmadan kayiyor mu
- waiting veya game-over ekraninda swipe canvas ustunde baslasa bile scroll zinciri canvas kenarinda kesilmiyor mu
- spawn noktasindaki pulse marker ilk start anini daha guvenli ve daha oyun gibi hissettiriyor mu, yoksa dekor olarak mi kaliyor
- run basladiginda veya pause'a girildiginde stacked side panel kapanip canvas'a alan geri veriyor mu
- run basladiginda veya pause'a girildiginde sayfa scroll'u kilitlenip canvas viewport icinde daha sabit kaliyor mu
- run basladiginda veya pause'a girildiginde canvas yeniden scroll yerine input'a adanmis kaliyor mu, yoksa Run #142 sonrasi gec kalan browser pan hissi var mi
- waiting veya game-over'a donunce panel geri gelip orientation bozmadan yeniden kullanilabilir kaliyor mu
- waiting veya game-over'a donunce scroll lock kalkip panel/not akisi normale donuyor mu
- kisa viewport + acik panel kombinasyonunda canvas ilk ekranda yeterince gorunur kaliyor mu
- panel toggle veya browser chrome yuksekligi degisince pointer/touch hedefi canvas uzerinde hizali kaliyor mu
- run zaten aktifken orientation/resize/browser chrome degisimi viewport'u dar moda iterse panel yeniden gizleniyor mu, scroll lock geri geliyor mu ve viewport canvas'a yeniden cekiliyor mu
- sadece sayfa scroll'u veya browser chrome yer degisimi oldugunda da pointer/touch hedefi canvas uzerinde hizali kaliyor mu
- adres cubugu / browser chrome yukseklik degistirdiginde canvas olcusu ve konumu stabil kaliyor mu
- long-press touch veya secondary-click browser context menu/callout acmadan oyunun icinde kaliyor mu
- uzun basista canvas veya yakin shell uzerinde text selection / drag ghosting goruluyor mu
- browser gesture, touch callout veya sistem interruption `pointercancel` / `touchcancel` urettiginde stale press steering, retry veya resume akisini kilitliyor mu
- touch start ilk tap ile aciliyor mu
- held touch steering run sirasinda stabil mi, yoksa kopuyor mu
- touch retry olum sonrasi hafif ve tutarli mi
- focus-loss / refocus sonrasi pointer aktif degilse touch resume ilk tap ile geliyor mu
- focus-loss pointer basiliyken olursa stale press resume'u yanlislikla tetiklemeden release bekliyor mu
- blur/refocus veya tab switch sonrasi fiziksel olarak birakilmis movement tuslari yine de oyuncuyu kaydiriyor mu
- blur/refocus sonrasi movement-temelli resume/retry akisi yeni bir ekstra release/ikinci deneme friksiyonu uretiyor mu
- death overlay artik olum nedeni, kacis yonu ve retry aksiyonunu daha rahat okutuyor mu
- sag ust `Session snapshot` paneli artik tek basina yeterli ve daha az bunaltici mi
- `60s clear` badge'i namesake hedefi daha earned ve daha gorunur hissettiriyor mu, yoksa dikkat dagitiyor mu
- `Run ... | Session best ...` ozeti olum aninda yeterli baglam veriyor mu, yoksa `avg` eksikligi orientasyonu zayiflatiyor mu
- `Validation ... | First death ...` / `Export ready` / `Press V` kisaltmasi export affordance'ini daha temiz ama hala anlasilir tutuyor mu
- alt support strip'in artik gorunmemesi death anini daha sakinlestiriyor mu
- ust sol `score` / `best` HUD'nin gizlenmesi pause ve death ekranlarini daha toplu hissettiriyor mu
- pause ekraninda sag panel ve hint/support strip'in kapali olmasi, ustune Run #128 kisaltilmis body/prompt/stats copy'si ekranı daha sakin ama hala yeterince yonlendirici kiliyor mu
- retry istegi ilk insan sinyaline gore iyilesti mi
- mumkun olursa `60s clear!` milestone feedback'i gorunur, earned ve akisi bozmayan bir an gibi hissettiriyor mu
- pause/death freeze ve `20s+` chase insan gozunde adil mi

## If Runtime Is Still Blocked

- Run #101-#119 fairness/input/control zincirine geri donme.
- Telemetry/public-copy wording churn'u veya governance expansion acma.
- Run #151 ile kapanan validation/export kontratini sample olmadan yeniden acma.
- Run #149 near-miss pause/resume restore hattini sample olmadan yeni reward/celebration/orchestration katmanlariyla buyutme.
- Run #145-#146 near-miss pulse'unu sample olmadan scoring/combo/meta katmanina buyutme.
- Run #147 survival-goal badge kararini sample olmadan yeni copy/celebration katmanlariyla buyutme; bu tur yalnizca erken-award bug'i kapandi.
- Run #148 post-clear pause/resume baglam duzeltmesini sample olmadan yeni milestone copy/celebration katmanlariyla buyutme; bu tur yalnizca resume sonrasi yanlis hedef metnine donus kapandi.
- Run #137 waiting launch surface'i sample olmadan tekrar tekrar cilalama.
- Run #138 active-run panel hide/focus mode'unu sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #139 active-run scroll lock davranisini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #140 viewport-anchor + panel-scroll-restore davranisini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #141 blur-time keyboard reset hattini sample olmadan yeni input-orchestration katmanlariyla buyutme.
- Run #142 non-active canvas scroll hattini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #143 overscroll-chain hattini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #144 breakpoint-crossing focus-mode hattini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Touch-primary, focus-loss resume ve pointer-cancel helper hattini yeni sample olmadan yeniden acma.
- Browser-default suppression hattini yeni sample olmadan gereksizce genisletme; ayni yuzeye yeni shell katmanlari ekleme.
- Viewport-fit hattini yeni sample olmadan genis responsive rework'e donusturme; ayni problemi yeni layout/orchestration katmanlariyla sarma.
- Tek bir yeni gameplay/UX source bug'i sec; tercihen mobile/input guvenilirligi veya replay hissi ailesinde olsun, ama Run #132-#144 shell/input koridorunu yeni orchestration katmanlariyla buyutmeden tek source-level problem olarak dar tutulup kapatilsin.
- Olası aday: runtime hala blokluysa mobile viewport'ta panel/canvas etkilesimini etkileyen tek bir source bug'i veya replay/input hissinde tek kalan davranis kusuru; fakat tek bir problem sec ve fairness zincirine kayma.
- Gameplay mantigi degisirse `npm run telemetry:check` ve `npm run build`; shell-only degisirse en az `npm run build` ile dogrula.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde Run #149 near-miss pause/resume restore davranisi icin keep/tune/revert karari var
- `HUMAN_SIGNALS.md` icinde Run #145-#146 near-miss pulse'u icin keep/tune/revert karari var
- `HUMAN_SIGNALS.md` icinde Run #147 `60s clear` badge'i icin keep/tune/revert notu var
- `HUMAN_SIGNALS.md` icinde Run #148 post-clear pause/resume baglami icin keep/tune/revert notu var
- `HUMAN_SIGNALS.md` icinde Run #137 opening launch surface, Run #138 active-run panel hide, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #133 viewport-fit, Run #134 scale-refresh senkronu, Run #135 scroll/viewport-position refresh guard'i, Run #136 pointer-cancel release guard'i, Run #132 browser-default suppression, Run #130-#131 touch-control/focus-loss resume ve Run #125-#129 death/pause readability odakli ikinci sample var
- `HUMAN_SIGNALS.md` icinde Run #137 opening launch surface, Run #138 active-run panel hide, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #144 breakpoint-crossing focus-mode senkronu, Run #133 viewport-fit, Run #134 scale-refresh senkronu, Run #135 scroll/viewport-position refresh guard'i, Run #136 pointer-cancel release guard'i, Run #132 browser-default suppression, Run #130-#131 touch-control/focus-loss resume ve Run #125-#129 death/pause readability odakli ikinci sample var
- veya runtime blokaji kisa not edilip yeni tek bir source bug'i kapatildi
