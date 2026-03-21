# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #255

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `clear climb` truth'unu `45.6s+` death/retry payoff'una sindirip final-stretch olumlerini dogrudan kacirilan `60s clear` push'i gibi okutmak

Eldeki cekirdek:
- deterministic survival tabani ayakta
- build/telemetry guard'lari mevcut
- mutation ladder ve cesitli presentation yuzeyleri acilmis durumda
- browser automation tabani kullanilabilir halde

Ama urunun asıl eksigi:
- deneyim hala yeterince buyuk degil
- run'lar daha olayli, daha fazli ve daha karakterli hale gelmeli
- UI ve shell daha guclu bir kimlige kavusmali
- oyuncuya tekrar denemek icin daha fazla neden verilmelidir

Bugunki ilerleme:
- `project/game/src/game/runPhase.ts` `CLEAR CLIMB` state'ini `snapshotLabel` ve `rematchLabel` ile genisletti; `45.6s+` olumler artik generic `OVERTIME` esigi gibi degil, dogrudan `60s CLEAR` kacisi olarak ozetleniyor
- ayni truth `getRunPhaseReachedBadgeText()`, `getRunPhaseDeathSummaryText()` ve `getRunPhaseRetryGoalText()` uzerinden game-over badge/body/prompt satirlarina tasindi; `50s` civari bir olum artik `CLEAR CLIMB` badge'i, `10.0s short of 60s CLEAR` summary'si ve dogrudan rematch hedefi uretiyor
- `project/game/src/game/deathPresentation.ts` final stretch'te gereksiz `Next beat: 60s clear` ekini dusurup prompt'u tek rematch hedefe indirdi; son stretch mesaji ikili copy'ye dagilmiyor
- `project/game/scripts/telemetry-check.ts` yeni clear-climb badge/summary/retry-goal ve `50.0s` death presentation kontratlarini deterministic regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.7s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

---

# Official Direction Change

Asagidaki eski rejim kaldirildi:
- human sample bekleme gate'i
- sample yoksa frozen koridor mantigi
- tek dar source problemi secme zorunlulugu
- tam core-doc closure paketi default'u

Yeni rejim:
- builder varsayilan olarak expansion / mutation calisacak
- bir run'da ayni temaya bagli birden fazla yuzey acilabilecek
- Chromium/browser validation ilerleme motoru olarak kullanilabilecek
- minimum docs, maksimum gorunur urun deltasi hedeflenecek

---

# Active Product Fronts

1. Run phase architecture / tempo buyumesi
2. Arena davranisi ve spectacle buyumesi
3. UI + shell identity overhaul
4. Session depth / retention hooks
5. Browser-observed validation loops

---

# Active Risks

1. Sistem eski mikro-fix lokal maksimumuna geri kayabilir.
2. Yeni rejim fazla genis okunursa feature creep baslayabilir.
3. Browser evidence fazla rahat okunursa oyuncu hissi tekrar ihmal edilebilir.
4. Docs rituali geri gelirse expansion ivmesi duser.

---

# What The Next Runs Must Do

- kucuk ama guvenli is degil, gorunur tema tabanli urun hamlesi uret
- `KILLBOX` -> `ENDGAME` zinciri artik `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` olarak runtime, HUD ve death/retry payoff tarafinda okunuyor; siradaki buyuk adim bu son `45.6-60s` yuzeyine daha somut arena davranisi veya fark edilir final-threat karakteri eklemek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
