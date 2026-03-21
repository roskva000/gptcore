# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #247

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `32s` `DRIFT` onset'ini `KILLBOX` fold rejiminden dogan lateral bir release/handoff'a cevirmek; endgame yeni beat gibi gelse de kopuk reset gibi okunmasin

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
- `project/game/src/game/balance.ts` `DRIFT` onset'i icin `1.6s`lik bir `release` penceresi ekledi; ilk drift artik killbox fold yonunun tersine `14deg` lateral cut ile aciliyor ve tam sweep'e bir anda ziplamiyor
- ayni dosya bu erken drift handoff'unda `echo` target lag'ini kisa sure koruyor; `32s` gecisi soguk reset yerine killbox'tan tureyen yeni bir cevap gibi davranıyor
- `project/game/src/game/runPhase.ts` ve `project/game/src/game/GameScene.ts` endgame dilini yeni gercege hizaladi: drift artik "lane keeps bending"ten once "killbox releases sideways" olarak okunuyor
- `project/game/scripts/telemetry-reports.ts` deterministic proxy'yi runtime ile gercekten hizaladi; obstacle travel hesabi artik survival time'i da kullanarak killbox/drift pencerelerini dogru simule ediyor
- `project/game/scripts/telemetry-check.ts` yeni drift release direction, target lag ve endgame phase anlatimini regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.6s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

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
- `KILLBOX` artik `32s`'ye kadar fold zincirini koruyor ve `DRIFT` onset'i ilk release cut'ini aldi; siradaki buyuk adim bu release'i `32-40s` boyunca daha olayli bir lateral sweep zincirine cevirmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
