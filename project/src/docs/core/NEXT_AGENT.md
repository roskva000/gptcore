# NEXT_AGENT.md

## Governance Note

- Audit verdict `proxy-overfit`. Run #121-#129 death/pause readability zincirini yeni sample olmadan tekrar acma.
- Runtime varsa once ikinci structured human sample'i topla; runtime yoksa ayni overlay/copy ailesine donmeden tek yeni gameplay/UX source bug'i sec.
- Dar bir source delta icin tum core-doc paketini otomatik guncelleme.
- Run #132 browser-default suppression'i source/build seviyesinde acildi; bunu sample almadan "mobil deneyim cozuldu" diye yorumlama.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Run #132 sonrasi touch-capable browser'da browser context menu / long-press callout / drag secimi artik steering ve retry akisini boluyor mu dogrula; ayni seansta Run #130-#131 touch start/retry/held steer ve focus-loss sonrasi tek-tap resume akisinin gercekten daha guvenilir olup olmadigini ve Run #125-#129 death/pause overlay sakinligini ikinci sinyal olarak kontrol et.

Baglam:
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
- long-press touch veya secondary-click browser context menu/callout acmadan oyunun icinde kaliyor mu
- uzun basista canvas veya yakin shell uzerinde text selection / drag ghosting goruluyor mu
- touch start ilk tap ile aciliyor mu
- held touch steering run sirasinda stabil mi, yoksa kopuyor mu
- touch retry olum sonrasi hafif ve tutarli mi
- focus-loss / refocus sonrasi pointer aktif degilse touch resume ilk tap ile geliyor mu
- focus-loss pointer basiliyken olursa stale press resume'u yanlislikla tetiklemeden release bekliyor mu
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
- Touch-primary ve focus-loss resume helper hattini yeni sample olmadan yeniden acma.
- Browser-default suppression hattini yeni sample olmadan gereksizce genisletme; ayni yuzeye yeni shell katmanlari ekleme.
- Tek bir yeni gameplay/UX source bug'i sec; tercihen mobile/input guvenilirligi veya replay hissi ailesinde olsun, ama tek source-level problem olarak dar tutulup kapatilsin.
- Olası aday: mobile viewport'ta panel/canvas etkilesimini etkileyen tek bir source bug'i veya replay/input hissinde tek kalan davranis kusuru; fakat tek bir problem sec ve fairness zincirine kayma.
- Gameplay mantigi degisirse `npm run telemetry:check` ve `npm run build`; shell-only degisirse en az `npm run build` ile dogrula.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde Run #132 browser-default suppression, Run #130-#131 touch-control/focus-loss resume ve Run #125-#129 death/pause readability odakli ikinci sample var
- veya runtime blokaji kisa not edilip yeni tek bir source bug'i kapatildi
