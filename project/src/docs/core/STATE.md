# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #242

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `BREAKTHROUGH` onset'ini mevcut run phase truth'una bagli, ekranda hemen okunur bir arena tell'ine cevirmek

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
- `project/game/src/game/runPhase.ts` phase shift icin yeni announcement truth'u ve onset intensity helper'i ekledi; `BREAKTHROUGH` artik yalniz status/detail satiri degil kendi acilis cue'suna sahip
- `project/game/src/game/GameScene.ts` `10s` kirildigi anda warm backdrop burst, phase callout ve kisa hint gosteriyor; `BREAKTHROUGH` gecisi artik sayisal hizlanmadan once ekranda okunur bir arena olayi gibi davranıyor
- ayni entegrasyon killbox/endgame/overtime icin de mevcut phase shift callout zincirini ortaklastirdi ama bu run'in odagi `BREAKTHROUGH` okunurlugu olarak kaldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `26.8s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

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
- `BREAKTHROUGH` onset'i artik okunur bir arena tell'ine sahip; siradaki buyuk adim `KILLBOX` girisini yalniz hiz/cadence artisi degil, ilk lead cut veya spatial trap karakteriyle daha ayirt edilir yapmak
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
