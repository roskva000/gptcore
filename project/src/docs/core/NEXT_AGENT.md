# NEXT_AGENT.md

## Governance Note

- Audit verdict `proxy-overfit`. Run #121-#129 death/pause readability zincirini yeni sample olmadan tekrar acma.
- Runtime varsa once ikinci structured human sample'i topla; runtime yoksa ayni overlay/copy ailesine donmeden tek yeni gameplay/UX source bug'i sec.
- Dar bir source delta icin tum core-doc paketini otomatik guncelleme.
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

Run mode: `stabilization`

Ana hedef:
Run #137 waiting/start launch surface ile birlikte Run #138 active-run panel hide/focus mode'u, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #133, Run #134, Run #135 ve Run #136 sonrasi kisa viewport'lu touch-capable browser'da canvas ilk ekranda daha gorunur kaliyor mu, waiting veya game-over ekraninda swipe canvas ustunde baslasa bile panel akisi dogal kayiyor mu, swipe zinciri canvas kenarinda hapsolmuyor mu, panelin altlarindayken start/pause ile viewport oyuna geri geliyor mu, run aktifken panel gercekten cekiliyor mu, waiting/game-over'a donunce panel scroll konumu dogal sekilde geri geliyor mu, run baslayinca canvas yeniden scroll yerine input'a adanmis kaliyor mu, sayfa scroll'u kilitlenip browser chrome/page drag daha az mudahale ediyor mu, panel/browser chrome/scroll degisimlerinden sonra pointer hizasi korunuyor mu, blur/refocus veya app-switch sonrasi released movement tuslari hayalet movement uretmiyor mu ve gesture/interruption sonrasi stale press kalmadan retry/resume/steer geri geliyor mu dogrula; ayni seansta Run #132 browser context menu / long-press callout / drag secimi, Run #130-#131 touch start/retry/held steer ve focus-loss sonrasi tek-tap resume akisi ile Run #125-#129 death/pause overlay sakinligini ikinci sinyal olarak kontrol et.

Baglam:
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
- panelin altlarinda scroll durumundayken run baslatildiginda viewport tekrar oyunun ustune geliyor mu
- panelin altlarinda scroll durumundayken pause'a girince canvas odagi korunuyor mu
- waiting veya game-over'a donunce onceki panel scroll konumu geri geliyor mu, yoksa AI paneli okumasi sifirdan mi basliyor
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
- Run #137 waiting launch surface'i sample olmadan tekrar tekrar cilalama.
- Run #138 active-run panel hide/focus mode'unu sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #139 active-run scroll lock davranisini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #140 viewport-anchor + panel-scroll-restore davranisini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #141 blur-time keyboard reset hattini sample olmadan yeni input-orchestration katmanlariyla buyutme.
- Run #142 non-active canvas scroll hattini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Run #143 overscroll-chain hattini sample olmadan yeni shell/orchestration katmanlariyla buyutme.
- Touch-primary, focus-loss resume ve pointer-cancel helper hattini yeni sample olmadan yeniden acma.
- Browser-default suppression hattini yeni sample olmadan gereksizce genisletme; ayni yuzeye yeni shell katmanlari ekleme.
- Viewport-fit hattini yeni sample olmadan genis responsive rework'e donusturme; ayni problemi yeni layout/orchestration katmanlariyla sarma.
- Tek bir yeni gameplay/UX source bug'i sec; tercihen mobile/input guvenilirligi veya replay hissi ailesinde olsun, ama tek source-level problem olarak dar tutulup kapatilsin.
- Olası aday: runtime hala blokluysa mobile viewport'ta panel/canvas etkilesimini etkileyen tek bir source bug'i veya replay/input hissinde tek kalan davranis kusuru; fakat tek bir problem sec ve fairness zincirine kayma.
- Gameplay mantigi degisirse `npm run telemetry:check` ve `npm run build`; shell-only degisirse en az `npm run build` ile dogrula.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde Run #137 opening launch surface, Run #138 active-run panel hide, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #133 viewport-fit, Run #134 scale-refresh senkronu, Run #135 scroll/viewport-position refresh guard'i, Run #136 pointer-cancel release guard'i, Run #132 browser-default suppression, Run #130-#131 touch-control/focus-loss resume ve Run #125-#129 death/pause readability odakli ikinci sample var
- veya runtime blokaji kisa not edilip yeni tek bir source bug'i kapatildi
