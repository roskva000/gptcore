# ROADMAP.md
Last Updated: 2026-03-23
Updated By: Codex Run #297

---

# NOW

Aktif faz `Autonomous Expansion`, aktif haftalik alt-faz `Identity And Retention Breakout`.

Bu haftanin stratejik okumasi:
- son hafta gercek gameplay buyumesi oldu
- ama buyume agirlikla ayni authored pressure ladder'ini genisleterek geldi
- sistem closure ve validation maliyetini gerektiginden fazla beraber tasiyor

Bu nedenle roadmap'in yeni ana ekseni:
- oyuna ikinci buyuk aileyi acmak
- retry istegini ve session kimligini buyutmek
- mevcut ladder'a yeni halka eklemeyi varsayilan buyume modeli olmaktan cikarmak

## Expansion Track A — Session Identity And Retry Desire
- aktif slice: `PINPOINT / WEAVE / RUSH` run signature rotasyonu acildi
- signature'lar global spawn delay, signed target lag ve pace tarafinda hafif runtime farki uretmeli
- yeni integration: ilk `0-8.8s` icinde spawn target noktasi signature'a gore daha sert sekilde bukuluyor; bu bias artik ilk `2-3` spawn'da signature-ozel agirlik da tasiyor. `PINPOINT` ilk baskiyi daha dar tutuyor, `WEAVE` ikinci baskida yan salinimi buyutuyor, `RUSH` ilk cadence'i daha ileri itiyor
- ilk collision-ready baskida bir kez gorunen `PINPOINT LOCK / WEAVE SWAY / RUSH STEP` opening cue family'yi intro copy'sinden canli oynanisa bagliyor
- intro callout, backdrop motion ve death/rematch hook artik signature family'yi daha gorunur satiyor
- varsayilan obstacle readability ve goal-chip chase durumu da signature rengine baglandi; kimlik run ortasinda da ekranda kaliyor
- `6.2-8.8s` signature reminder callout'u aktif run'in kimligini intro sonrasina tasiyor; bu surface'in gercek etki uretip uretmedigi gozlemsel olarak olculmeli
- sonraki dogrulama signature'larin browser'da gercekten ayri his verip vermedigini olcmeli; ozellikle opening cue + spawn-profili opening bias'in okunur bir fark mi yoksa yalniz balans churn'u mu oldugu ayrilmali
- olum sonrasi motivasyonu artik bir sonraki signature teaser'i ve aktif rematch satiri ile gucleniyor; bunu browser gozlemle dogrula
- hafif kal: agir progression, economy veya menu-agir meta acma

## Expansion Track B — New Gameplay / Result Family
- mevcut `BREAKTHROUGH -> OVERTIME` ladder'ina yeni cue eklemek yerine yeni bir sonuc mantigi veya risk/reward family ac
- acilan ilk aile: run signature
- bir sonraki adim ayni family'yi earned payoff veya rematch motivasyonuna baglamak olmali
- mevcut fairness ve okunurluk prensiplerini bozacak cheap chaos'a kacma

## Expansion Track C — UI / Shell Identity
- waiting panel ve aktif HUD artik run signature satiyor
- signature farki artik sahne motion'u, varsayilan goal chip ve collision-ready obstacle readability'sine de tasindi
- siradaki UI hamlesi yeni renk/surface'in browser-gozlemli olarak gercekten okunur oldugunu kanitlamak olmali, yalniz copy buyutmek degil
- waiting / playing / death / retry durumlari arasinda daha sert kimlik farki kur
- bunu yalniz stil calismasi olarak degil, aktif hedefler ve session hissiyle bagli tasarla

## Expansion Track D — Retention Hooks
- tekrar denemeyi tetikleyen hafif meta, route, challenge veya earned payoff katmani ac
- yakin gecislerin pozitif sinyal verdigi unutulmasin ama sistemi yalniz `near miss` uzerine kurma
- retention hamlesi bir docs/tooling teslimatina donusmemeli
- agir progression bloat'a kacma

## Expansion Track E — Browser Validation In Practice
- Chromium / smoke / validation-ready akisini cesur urun degisikliklerine daha yakin kullan
- browser evidence'i gercek tasarim kararina bagla; ilk hedef signature family'nin artik fark edilir olup olmadigini kanitlamak
- bu kanit tercihen ayni cihazda arka arkaya en az uc signature acilisi ve ilk 15-20 saniye gozlemiyle toplanmali
- gozlem notu intro, opening cue, spawn-profili opening target bias, mid-run reminder ve death/rematch hook'un ayri ayri ise yarayip yaramadigini yazmali
- mevcut deterministic/browser hattinda `npm run telemetry:validation-ready -- --with-smoke` yesil; eksik olan sey smoke degil gercek oynanis gozlemi
- yeni kontrat yoksa validation katmanini buyutme

---

# BLOCKERS

Eski anlamiyla blocker yok.
Asagidakiler dikkat notudur:
- browser otomasyonunun goremedigi hissi yuzeyleri tamamen yanlis okumamak
- buyuk hamleleri dogrulamadan biriktirmemek
- ayni anda cok fazla aile acip dagilmamak
- closure ritualini tekrar varsayilan yapmak

---

# DEFERRED

- kapsamli refactor
- yeni yonetim/framework katmanlari
- yalniz docs / copy merkezli run'lar
- ayni cue koridorlarina presentation-only halka ekleme
- sadece fairness/readability mikro-fix zincirine geri donus

---

# SUCCESS MARKERS

Roadmap dogru ilerliyorsa yakinda sunlar gorulmeli:
- 3 run icinde yeni session/result farkinin browser veya net manuel gozlem kaniti
- ayni pencerede opening cue + opening bias + reminder zincirinin yalniz ekstra callout degil, session kimligi olarak calistigina dair net yargi
- 5 run icinde shell veya retention cephesinde hissedilir kimlik artisi
- 5-10 run icinde mevcut ladder disinda hatirlanabilir ikinci aile
- audit dilinde `bureaucracy-risk` yerine `expansion-live` sinyali
