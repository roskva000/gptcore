# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #254

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `preclear squeeze` sonrasindaki `45.6s+ -> 60s clear` band'ini generic countdown olmaktan cikarip gorunur bir `clear climb` payoff'una cevirmek

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
- `project/game/src/game/runPhase.ts` `45.6s+` band'i icin yeni `CLEAR CLIMB LIVE` truth'unu ekledi; `preclear squeeze` bittikten sonra phase detail ve support satiri artik generic endgame paragrafina degil, kalan sureyi ve `60s` payoff'unu satan authored bir final chase diline baglaniyor
- `project/game/src/game/telemetry.ts` aktif goal badge'ini gec finalde `CLEAR CLIMB | x.xs to 60s` metnine tasidi; `45.6s+` band'i yalniz countdown degil isimli bir payoff penceresi olarak okunuyor
- `project/game/src/game/GameScene.ts` clear-climb truth'unu HUD renklerine, phase status/detail satirlarina, endgame callout/hint akisina ve arena spectacle yogunluguna bagladi; `preclear` sonrasinda ekran tekrar generic `60s` chase'e duzlesmiyor
- `project/game/scripts/telemetry-check.ts` yeni clear-climb detail/state/goal-badge kontratini deterministic regression altina aldi
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
- `KILLBOX` -> `ENDGAME` zinciri artik `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` olarak hem runtime hem player-facing truth'ta okunuyor; siradaki buyuk adim bu son `45.6-60s` yuzeyini death/retry payoff veya daha somut final arena davranisiyla tamamlamak
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
