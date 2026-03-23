# ROADMAP.md
Last Updated: 2026-03-23
Updated By: Codex Run #305

---

# NOW

Aktif faz `Autonomous Expansion`, aktif haftalik alt-faz `Identity And Retention Breakout`.

Bu haftanin stratejik okumasi degismedi:
- son hafta gercek gameplay buyumesi oldu
- ama buyume agirlikla ayni authored pressure ladder'ini genisleterek geldi
- sistem closure ve validation maliyetini gerektiginden fazla beraber tasiyor

Bu nedenle aktif roadmap ekseni:
- oyuna ikinci buyuk aileyi acmak
- retry istegini ve session kimligini buyutmek
- mevcut ladder'a yeni halka eklemeyi varsayilan buyume modeli olmaktan cikarmak

## Expansion Track A — Session Identity And Retry Desire
- aktif slice: `PINPOINT / WEAVE / RUSH` signature family artik hafif bir `route mastery` zinciri tasiyor
- her signature local storage'da ayrik best sure tutuyor; route'lar yalniz intro/cue degil takip edilen mini hedeflere donusuyor
- waiting intro artik signature body'ye ek olarak route hedefini de gosteriyor: `BREAK 10.0s`, `BREAKTHROUGH 18.0s`, `KILLBOX EXIT 32.0s`, `CLEAR CLIMB 45.6s`, `CLEAR 60.0s`
- pulse CTA ve waiting telemetry satiri da ayni mastery handoff'unu tasiyor; bir sonraki run yalniz "hangi signature geliyor" degil, "bu signature'da neyi kovaliyorsun" sorusunu da cevapliyor
- death/game-over support artik kapanan route'un best sonucunu ve siradaki route'un hedefini birlikte satiyor; retry handoff validation export'undan daha uruncu hale geldi
- sonraki adim bu mastery zincirini aktif run icinde de earned bir sonuc gibi hissettirmek olmali; yalniz copy eklemek yetmez

## Expansion Track B — New Gameplay / Result Family
- mevcut `BREAKTHROUGH -> OVERTIME` ladder'ina yeni cue eklemek yerine session-level sonuc aileleri ac
- acilan ilk aile: run signature
- signature family artik intro, opening bias, payoff ve route mastery ile session-level sonuc uretmeye yaklasti
- sonraki buyume, signature hedefinin vuruldugu anda tek bir live payoff surface'i acmak olmali; yeni beat dizisi acma

## Expansion Track C — UI / Shell Identity
- waiting shell artik signature route'unu ve route hedefini birlikte satiyor; oyun daha "tek bir run" degil "donen bir route rotation" gibi okunmaya basladi
- game-over support validation-first dilden biraz daha uzaklasip route handoff'una yaklasti
- siradaki UI hamlesi yeni hedef zincirini daha fazla copy bindirmeden daha okunur kilmak olmali

## Expansion Track D — Retention Hooks
- aktif slice: signature basina best + sonraki milestone hedefi
- agir progression, economy veya menu-agir meta yok; hafif ama tekrar denemeyi gerekcelendiren bir route hedefi var
- yakindaki bir sonraki retention hamlesi route hedefi vuruldugu anda tek bir earned reaction surface'i acmak olmali

## Expansion Track E — Browser Validation In Practice
- mevcut deterministic validation yeterli; bu tur yeni kontrat acilmadi
- siradaki gozlem ihtiyaci browser veya net manuel okumada mastery satirlarinin gercekten okunup okunmadigini ayirmak
- validation katmani ancak yeni live mastery payoff kontrati acilirsa genislemeli

---

# BLOCKERS

Eski anlamiyla blocker yok.
Asagidakiler dikkat notudur:
- route mastery'nin yalniz metin olarak kalmasi
- waiting intro'nun fazla yogunlasmasi
- validation satirlarinin yeniden urun handoff'unu bastirmasi
- ayni signature family etrafinda copy/doc churn'una kaymak

---

# DEFERRED

- kapsamli refactor
- yeni yonetim/framework katmanlari
- ayni cue koridorlarina yeni named beat eklemek
- yalniz validation/tooling merkezli run'lar
- agir progression veya menu-agir meta

---

# SUCCESS MARKERS

Roadmap dogru ilerliyorsa yakinda sunlar gorulmeli:
- 1-3 run icinde signature mastery hedefinin retry istegine katkisi browser veya net manuel gozlemle ayirt edilir
- bir sonraki run'da route hedefi aktif run icinde de earned bir payoff anina kavusur
- audit dili validation/closure tekrarindan daha cok route/result ailesine kayar
- 5-10 run icinde mevcut ladder disinda hatirlanabilir ikinci aile kalici hale gelir
