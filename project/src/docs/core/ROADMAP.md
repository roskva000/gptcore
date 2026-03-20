# ROADMAP.md
Last Updated: 2026-03-21
Updated By: Partner Surgical Reset

---

# NOW

Aktif faz `Autonomous Expansion`.
Bu fazin amaci oyunu human sample beklemeden 5-10 run icinde belirgin bicimde buyutmektir.

Mevcut durum:
- deterministic ve browser guard tabani yeterli
- son donem mutation / presentation birikimi var
- sistem fazla dar calistigi icin urun sivriligi henuz hedef seviyede degil

Bu roadmap artik mikro freeze listesi degil, genisleme eksenidir.

---

# NEXT

## Expansion Track A — Run Architecture
- run'lari daha belirgin fazlara, state shift'lere veya event anlarina bol
- oyuncuya "bu run bir seye donustu" hissi ver

## Expansion Track B — Arena + Threat Families
- arena davranisini sadece mevcut beat ladder'dan ibaret bir ritim olmaktan cikar
- yeni hazard family, pressure swap veya environment state mantigi ac

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
