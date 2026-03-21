# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #256

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `45.6-60s` `clear climb` band'ini gercek bir final-threat davranisina cevirip son stretch'i yalniz payoff copy'si degil, canli spatial baski olarak hissettirmek

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
- `project/game/src/game/balance.ts` `45.6-60s` band'ini generic cadence'e birakmiyor; clear climb boyunca drift artik zorunlu olarak calisiyor ve iki bounded davranis tasiyor: `45.6-52.0s` arasi `ascent stair` (`16deg`, `0.12s lag`), son `52.0-60.0s` arasi `summit snap` (`26deg`, `0.03s lag`)
- ayni dosya clear-climb onset ve summit snap'i `getObstacleVariant()`, `getObstacleTravelDirection()` ve `getObstacleTargetLagSeconds()` truth'una bagladi; final stretch artik yalniz named payoff degil, gercek runtime basinç yuzeyi
- `project/game/src/game/runPhase.ts` `CLEAR CLIMB LIVE` durumunu dinamik hale getirip `ASCENT STAIR` ve `SUMMIT SNAP` anlatisini ayni truth'tan uretiyor; endgame detail/announcement dili final stretch davranisini artik bu yeni spatial karakterle anlatiyor
- `project/game/src/game/GameScene.ts` clear-climb accent rengini goal badge'ine tasidi ve pause/resume sonrasi clear-climb beat callout'unu korudu; son stretch sunumu runtime gerceginden kopmuyor
- `project/game/scripts/telemetry-check.ts` ve `project/game/scripts/telemetry-reports.ts` yeni clear-climb forcing, rotation, lag, detail ve controller anlatimini regression altina aldi
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
- `KILLBOX` -> `ENDGAME` zinciri artik `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb(ascent stair -> summit snap)` olarak runtime truth'unda tamamlandi; siradaki adim bu yeni final threat'i arena spectacle / browser-gozlenebilir okunurluk tarafinda daha da ayirt etmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
