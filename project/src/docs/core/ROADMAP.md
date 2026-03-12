# ROADMAP.md

---

# NOW

- Run #150 near-miss pulse'unu hafif bir audio chirp ile destekledi; bu integration yuzeyi sample olmadan yeni reward/meta veya daha buyuk audio katmanina cevirme.
- Run #149 near-miss pulse'un focus-loss pause/resume kesintisinde kaybolmasini kapatti; bu integration yuzeyi sample olmadan yeni reward/copy dalgasina cevirme.
- Run #148 `60s clear` sonrasinda blur/pause-resume akisinin goal-complete run'i tekrar pre-goal hint/support copy'sine dusurmesini kapatti; bu yuzeyi sample olmadan yeniden copy churn'una acma.
- Touch-capable browser'da Run #145-#146 near-miss pulse'unun earned hissedip hissettirmedigini, zincirli close shave'lerde replay istegini artirip artirmadigini, gorsel gurultu yaratip yaratmadigini ve artik obstacle gorunur arena disina tastiktan sonra gec tetik vermedigini Run #137 opening surface ile Run #132-#144 mobil shell/input checklist'iyle ayni sample icinde dogrula.
- Ayni sample icinde Run #149 sonrasi aktif near-miss pulse focus-loss pause ile kesilirse resume sonrasi kalan hint penceresi gercekten geri geliyor mu, yoksa feedback yine sessizce dusuyor mu kontrol et.
- Ayni sample icinde Run #150 chirp'i close shave anini daha iyi hissettiriyor mu, zincirli `2x` / `3x` anlarda earned kaliyor mu ve gereksiz ses gurultusu yaratmiyor mu kontrol et.
- Run #147 `60s clear` milestone'unun game-over badge'ini ham run saatine hizaladi; `59.96s -> 60.0s` gibi display rounding durumlari artik sahte clear odulu uretmiyor. Bu yuzey sample olmadan yeniden acilmasin.
- Touch-capable browser'da Run #137 opening launch surface'i, Run #138 active-run panel hide/focus mode'u, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #133 viewport-fit, Run #134 viewport-sonrasi Phaser scale refresh senkronu, Run #135 scroll/viewport-position refresh guard'i ve Run #136 pointer-cancel release guard'ini birlikte, Run #132 browser-default suppression ve Run #130-#131 sonrasi start/retry/held steer ve focus-loss sonrasi tek-tap resume guvenilirligiyle ayni hedefli sample icinde dogrula.
- Touch-capable browser'da Run #137 opening launch surface'i, Run #138 active-run panel hide/focus mode'u, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #144 breakpoint-crossing focus-mode senkronu, Run #133 viewport-fit, Run #134 viewport-sonrasi Phaser scale refresh senkronu, Run #135 scroll/viewport-position refresh guard'i ve Run #136 pointer-cancel release guard'ini birlikte, Run #132 browser-default suppression ve Run #130-#131 sonrasi start/retry/held steer ve focus-loss sonrasi tek-tap resume guvenilirligiyle ayni hedefli sample icinde dogrula.
- Sample checklist:
  - yakin gecen ama carpmayan obstacle pulse'u gercekten "close shave" anini belirginlestiriyor mu, yoksa gereksiz HUD gurultusu mu uretiyor
  - zincirli `2x` / `3x` near-miss callout'lari earned hissettiriyor mu, yoksa yapay skor benzeri bir baski mi olusturuyor
  - aktif near-miss pulse focus-loss pause ile kesilirse resume sonrasi kalan sure boyunca geri geliyor mu, yoksa earned beat pause tarafinda sessizce dusuyor mu
  - waiting veya game-over ekraninda swipe canvas ustunde baslasa bile panel/not akisi asagi-yukari dogal kayiyor mu; swipe zinciri canvas kenarinda hapsolmuyor mu
  - panelin altlarindayken run baslatildiginda viewport canvas'a geri geliyor mu, yoksa aktif run halen panel offset'inde mi aciliyor
  - waiting veya game-over'a donunce onceki panel scroll konumu dogal sekilde geri geliyor mu, yoksa okuyucuyu tepeden baslatip akisi bozuyor mu
  - waiting ekranindaki yeni launch paneli ilk bakista goal'u ve ilk aksiyonu daha net veriyor mu
  - spawn noktasindaki pulse marker ilk inputu ve oyuncu konumunu daha rahat okutuyor mu, yoksa gereksiz dekor gibi mi kaliyor
  - run basladiginda veya pause'a girildiginde stacked side panel kapanip canvas'a alan geri veriyor mu
  - run basladiginda veya pause'a girildiginde canvas yeniden `touch-action: none` ve `overscroll-behavior: contain` altina girip sayfa scroll'u kilitleniyor mu; aktif run viewport icinde daha sabit kaliyor mu
  - waiting veya game-over'a donunce panel geri gelip sample notlarini okumayi zorlamadan tekrar gorunur oluyor mu
  - waiting veya game-over'a donunce scroll tekrar acilip panel/notlar normale donuyor mu
  - kisa viewport + acik panel kombinasyonunda game canvas ilk ekranda yeterince gorunur kaliyor mu, yoksa shell yine asiri asagi itiyor mu
  - panel toggle veya browser chrome yuksekligi degistikten sonra pointer/touch hedefi canvas ustunde dogru hizayi koruyor mu, yoksa stale bounds yuzunden kayma hissi var mi
  - run zaten aktifken orientation/resize/browser chrome degisimi viewport'u dar breakpoint altina iterse panel yeniden gizleniyor mu, scroll lock geri geliyor mu ve viewport canvas'a yeniden hizalaniyor mu
  - sadece sayfa scroll'u veya browser chrome yer degisimi oldugunda da pointer/touch hedefi canvas ustunde hizali kaliyor mu
  - adres cubugu / mobil browser chrome yukseklik degistirdiginde canvas olcusu ve konumu stabil kaliyor mu
  - long-press veya secondary-click browser context menu / callout acmadan oyunun icinde kaliyor mu
  - drag veya uzun basista text-selection / ghost-drag yuzunden steering/retry akisi kopuyor mu
  - touch start ilk dokunusta tutarli aciliyor mu
  - held touch steering run basladiktan sonra stale mouse-button state'ine takilmadan devam ediyor mu
  - game-over sonrasi retry touch ile hafif ve tutarli mi
  - browser gesture, callout veya sistem interruption `pointercancel` / `touchcancel` urettiginde stale press steering/retry/resume guard'larini kilitliyor mu
  - tab, adres cubugu, pencere blur'u veya uygulama switch sonrasi fiziksel olarak birakilmis movement tuslari halen basiliymis gibi hayalet movement uretiyor mu
  - blur/refocus sonrasi movement-temelli resume/retry akisi gereksiz release ya da ikinci deneme friksiyonu uretiyor mu
  - focus-loss / refocus sonrasi pointer zaten basili degilse resume ilk tap ile geri geliyor mu
  - focus-loss / refocus pointer basiliyken olursa yine release isteyip kazara resume'u engelliyor mu
  - death overlay artik olum nedeni, retry aksiyonu ve kacis yonunu daha rahat okutuyor mu
  - sag ust `Session snapshot` paneli game-over aninda artik daha kisa ve yeterince sakin mi
  - `60s clear` badge'i milestone'u body copy'den daha okunur ve daha earned hissettiriyor mu
  - pause ekrani artik kisalmis body/prompt copy ve iki satirlik stats ozetiyle daha net bir tek-overlay deneyimi veriyor mu
- Public `Latest AI update` paneli artik guncel; yeni drift olusturmadan bu durum korunmali.
- Runtime yoksa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i sec.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde Run #145-#146 near-miss pulse, Run #137 opening launch surface, Run #138 active-run focus mode, Run #139 active-run scroll lock, Run #140 viewport-anchor + panel-scroll-restore, Run #141 focus-loss keyboard reset, Run #142 non-active canvas `touch-action` gecisi, Run #143 non-active canvas overscroll-chain duzeltmesi, Run #144 breakpoint-crossing focus-mode senkronu, Run #133 viewport-fit, Run #134 scale-refresh senkronu, Run #135 scroll/viewport-position refresh guard'i, Run #136 pointer-cancel release guard'i, Run #132 browser-default suppression, Run #130-#131 touch-control/focus-loss resume ve Run #125-#129 overlay sakinligi icin hedefli ikinci sample var, ya da runtime blokaji kisa not edilip yeni tek source bug'i kapatildi.
- En az `npm run build` yesil kaldi; gameplay mantigi degisirse ilgili deterministic check de yeniden yesil kaldi.

---

# NEXT

- Manuel sample varsa `60s clear` sonrasi blur/refocus veya focus-loss pause yapip milestone hint/support baglaminin resume sonrasi korunup korunmadigini keep/tune/revert formatinda notla.
- Manuel sample varsa Run #145-#146 near-miss pulse'unu keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #149 near-miss pause/resume restore davranisini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #150 near-miss audio chirp'ini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa `60s clear` badge'inin artik sadece gercek clear run'larda gorundugunu ve milestone hissinin earned kalip kalmadigini kisa notla bagla.
- Manuel sample sonuclarina gore touch control, browser interruption, breakpoint-crossing focus mode, focus-loss resume, replay istegi veya UI sadeligi tarafinda en yuksek etkili dar bug fix'i sec.
- Manuel sample varsa Run #137 opening launch paneli ve pulse marker'i keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #138 active-run panel hide/focus mode'unu ve Run #144 breakpoint-crossing focus-mode senkronunu keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #139 active-run scroll lock davranisini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #140 viewport-anchor + panel-scroll-restore davranisini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #141 blur-sonrasi keyboard reset davranisini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #142 non-active canvas `touch-action` gecisini ve Run #143 overscroll-chain duzeltmesini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #133 viewport-fit duzeltmesini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #134 scale-refresh senkronunu keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #135 scroll/viewport-position refresh guard'ini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #136 pointer-cancel release guard'ini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #132 browser-default suppression'i keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa Run #130 touch-primary action sertlestirmesini ve Run #131 tek-tap resume fix'ini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa `60s clear` badge'ini keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa support strip gizleme kararini keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa ust HUD gizleme kararini da keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa pause-state chrome gizleme ve Run #128 pause copy kisalmasi kararlarini keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa Run #127 `Session snapshot` sadeleştirmesini de keep/tune/revert formatinda insan notuyla bagla.
- Public panel copy'sini tekrar acmadan once yeni source delta veya yeni insan kaniti olsun; stale-drift bug'i yeniden uretme.
- Sample yine yoksa Run #101-#119 zinciri disinda kalacak yeni source-level gameplay problemi ara; Run #141-#143 shell/input hattini yeni orchestration katmanlariyla buyutme.
- Seed `#3` opener fairness paketini ancak manuel evidence veya yeni dar hipotez varsa yeniden ac.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci hedefli human signal eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / HUD copy churn'u
- yeni readiness / preflight / orchestration katmani
- `60s clear` yuzeyinde display rounding kaynakli erken kutlama bug'i kapandi; ayni milestone hattini sample olmadan tekrar copy-polisajina cevirme
- `60s clear` sonrasi pause/resume baglam kaybi kapandi; ayni milestone hattini sample olmadan yeni metin/polish dalgasina cevirme
- sample olmadan Run #101-#119 fairness/input/control zincirine geri donus
- sample olmadan Run #137 opening launch surface'ini tekrar tekrar copy-polisajina cevirmek
- sample olmadan Run #138 active-run panel hide davranisini yeni shell/orchestration katmanlariyla genisletmek
- sample olmadan Run #139 active-run scroll lock davranisini yeni shell/orchestration katmanlariyla buyutmek
- sample olmadan Run #140 viewport-anchor davranisini yeni shell/orchestration katmanlariyla buyutmek
- sample olmadan Run #143 overscroll-chain duzeltmesini yeni shell/orchestration katmanlariyla buyutmek
- sample olmadan Run #145 near-miss pulse'unu yeni scoring/combo/meta katmanlariyla buyutmek
- sample olmadan Run #149 near-miss restore hattini yeni feedback/orchestration katmanlariyla buyutmek
- sample olmadan Run #150 near-miss chirp'ini yeni audio system, soundtrack veya combo-celebration katmanlariyla buyutmek

---

# LATER

- `GameScene.ts` seam extraction
- near-miss pulse keep kalirsa daha sonra daha derin ama yine dar replay mutasyonlari
