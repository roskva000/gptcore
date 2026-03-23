# ROADMAP.md
Last Updated: 2026-03-23
Updated By: Codex Run #307

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
- aktif slice: signature basina route mastery hedefi ve best hafizasi artik stamp sonrasi ayni active-run HUD yuzeyinde de takip ediliyor
- `PINPOINT / WEAVE / RUSH` rotasyonu hedef vuruldugunda veya mastered route'ta yeni best gecildiginde kisa bir live payoff veriyor; `RUN FEEL` detail satiri da hemen ardindan `NEXT ROUTE / CEILING LIVE` follow-through'una geciyor
- sonraki adim bu stamp + follow-through zincirinin gercek gozlemde temiz okunup okunmadigini teyit etmek olmali; yeni HUD yuzeyi acmak degil

## Expansion Track B — New Gameplay / Result Family
- mevcut `BREAKTHROUGH -> OVERTIME` ladder'ina yeni beat eklenmedi
- acilan sonuc ailesi: signature route mastery
- signature family artik intro, opening bias, payoff, retry handoff, live stamp ve stamp-sonrasi hedef takibi ile session-level sonuc veriyor
- sonraki buyume yeni beat degil, bu sonuc ailesinin active play icinde ne kadar temiz okundugunu gozetmek olmali

## Expansion Track C — UI / Shell Identity
- waiting shell ve death handoff route hedefini zaten tasiyor; aktif run HUD artik stamp sonrasi hedefi de tutuyor
- siradaki UI hamlesi daha fazla copy eklemek degil, mevcut hedef yogunlugunun browser/manual gozlemde okunurlugunu test etmek

## Expansion Track D — Retention Hooks
- aktif retention slice: signature route hedefi vuruldugunda earned stamp ve hemen sonraki next-route follow-through
- agir progression, economy veya menu-agir meta yok; tekrar denemeyi gerekcelendiren hafif route hedefi artik live run icinde de odul goruyor
- siradaki retention hamlesi ancak gozlem stamp'in yetmedigini gosterirse dusunulmeli

## Expansion Track E — Browser Validation In Practice
- deterministic validation halen yeterli: `npm run telemetry:check` ve `npm run build` yesil
- yakin gozlem ihtiyaci yeni stamp surface'inin mevcut phase callout'lariyla kavga edip etmedigini ayirmak
- validation katmani ancak yeni live kontrat deterministic regression gerektirirse genislemeli

---

# BLOCKERS

Eski anlamiyla blocker yok.
Asagidakiler dikkat notudur:
- mastery stamp + follow-through zincirinin cheap popup ya da callout gurultusu gibi okunmasi
- stamp sonrasi route hedefinin `RUN FEEL` detail satirinda fazla uzun kalmasi
- waiting intro yogunlugu ile live payoff'un birlikte sikismasi
- validation satirlarinin yeniden urun handoff'unu bastirmasi

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
- 1-2 run icinde mastery stamp + follow-through zincirinin browser/manual gozlemde net ve earned okundugu gorulur
- stamp sonrasi route hedefi aktif run HUD'unda da gerektigi kadar bagli kalir, ama ikinci bir gurultulu overlay'e donusmez
- audit dili validation/closure tekrarindan daha cok route/result ailesine kaymaya devam eder
- 5-10 run icinde mevcut ladder disinda hatirlanabilir ikinci aile kalici hale gelir
