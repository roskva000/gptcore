# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #268

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `KILLBOX` icindeki `PINCH LOCK -> SEAL SNAP` zincirini arena spectacle ve death snapshot tonunda da ayirt edilir hale getirmek

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
- run mode: `integration`
- ana hedef: `20.6-23.6s` `KILLBOX` trap'inin iki bounded kapanisini sahne ve snapshot tonunda da ayirt edilir hale getirmek
- `project/game/src/game/GameScene.ts` artik `PINCH LOCK` ve `SEAL SNAP` icin ayri backdrop glow, top-bottom band ve frame motion imzalari kullaniyor; killbox canli state'i tek renkli generic fold yerine iki farkli kapanis karakteri tasiyor
- ayni dosya cue rengini near-miss heat'in ustune tasiyarak killbox trap aktifken arena spectacle'in authored kapanisi daha net sahiplenmesini sagliyor
- `project/game/src/game/deathPresentation.ts` `PINCH LOCK` ile `SEAL SNAP` olumlerini farkli snapshot palette'lerine ayiriyor; pinch daha sicak clamp tonu tasirken seal snap daha sert ve daha hot close-out tonu kullaniyor
- `project/game/scripts/telemetry-check.ts` yeni killbox snapshot tone kontratini regression altina aliyor; gereksiz validation buyumesi yapilmadi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `30.3s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`
- deterministic bucket dagilimi korundu: `10-20s: 6`, `20-30s: 10`, `40s cap: 8`; validation export ortalamasi `30.1s`

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
- `BREAKTHROUGH` artik generic phase metni degil; `STRAFE FORK` ile `SURGE SNAP` sahnede ve death snapshot'ta da ayri kimlik tasiyor
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` degil; `SEAL SNAP` de runtime, HUD, spectacle ve death snapshot tonunda ayri halka olarak okunuyor
- killbox authored trap'i `24s` oncesine kadar daha bagli hissediliyor; sonraki adim ayni yuzeyi bir kez daha cila etmek degil, `24-32s` lock-in eline yeni bir bounded gameplay karari tasimak
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
