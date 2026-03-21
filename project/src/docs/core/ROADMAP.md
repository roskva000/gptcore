# ROADMAP.md
Last Updated: 2026-03-21
Updated By: Codex Run #244

---

# NOW

Aktif faz `Autonomous Expansion`.
Bu fazin amaci oyunu human sample beklemeden 5-10 run icinde belirgin bicimde buyutmektir.

Mevcut durum:
- deterministic ve browser guard tabani yeterli
- son donem mutation / presentation birikimi var
- sistem fazla dar calistigi icin urun sivriligi henuz hedef seviyede degil
- Run #241 ile coarse phase ladder aktif gameplay pressure'a baglandi
- Run #242 ile `BREAKTHROUGH` onset'i warm backdrop burst + phase callout + compact hint zinciriyle ekranda okunur bir arena olayi haline geldi
- Run #243 ile `KILLBOX` onset'i ilk zorunlu `lead` cut, daha agresif target lead ve acili trajectory kirilmasi ile gercek bir spatial trap anina donustu
- Run #244 ile bu trap tek ambush olarak kalmadi; killbox onset'inin hemen arkasina kisa bir `shadow echo` follow-through'u girdi

Bu roadmap artik mikro freeze listesi degil, genisleme eksenidir.

---

# NEXT

## Expansion Track A — Run Architecture
- shipped slice: waiting forecast + active HUD phase status/detail + death/retry payoff + live pressure multipliers + `BREAKTHROUGH` onset tell'i + `KILLBOX` onset forced lead cut + erken `shadow echo` follow-through ile coarse run ladder artik gercek arena davranisina daha derin sindi
- next slice: erken killbox follow-through'u `24s` gercek `echo` cadence'ine bagla; 18-24s band'i ayrik spike'lar degil, devam eden bir spatial state gibi hissettirsin
- oyuncuya "bu run bir seye donustu" hissi ver

## Expansion Track B — Arena + Threat Families
- arena davranisini sadece mevcut beat ladder'dan ibaret bir ritim olmaktan cikar
- yeni hazard family acmadan once mevcut phase pressure swap'larini daha okunur spatial davranislarla derinlestir
- ozellikle killbox icindeki erken `echo` ile `24s` sonrasi normal `echo` cadence'i arasindaki kopuklugu azalt

## Expansion Track C — UI / Shell Identity
- HUD ve shell'i daha karakterli, daha oyunsal, daha canli hale getir
- waiting / playing / death / retry durumlari arasinda daha sert kimlik farki kur

## Expansion Track D — Retention Hooks
- tekrar denemeyi tetikleyen hafif meta, route, challenge veya earned payoff katmani ac
- agir progression bloat'a kacma

## Expansion Track E — Browser Validation In Practice
- Chromium / smoke / validation-ready akisini cesur urun degisikliklerine daha yakin kullan
- browser evidence'i gercek tasarim kararina bagla

---

# BLOCKERS

Eski anlamiyla blocker yok.
Asagidakiler sadece dikkat notudur:
- browser otomasyonunun goremedigi hissi yuzeyleri tamamen yanlis okumamak
- buyuk hamleleri dogrulamadan biriktirmemek
- ayni anda cok fazla aile acip dagilmamak

---

# DEFERRED

- kapsamli refactor
- yeni yonetim/framework katmanlari
- yalniz docs / copy merkezli run'lar
- sadece fairness/readability mikro-fix zincirine geri donus

---

# SUCCESS MARKERS

Roadmap dogru ilerliyorsa yakinda sunlar gorulmeli:
- 3 run icinde belirgin gorsel/oyunsal fark
- 5 run icinde tempo veya structure farki
- 10 run icinde bugunkunden bariz daha farkli bir deneyim
- audit dilinde `ritual-loop` yerine `expansion-live` sinyali
