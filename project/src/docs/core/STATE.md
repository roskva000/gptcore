# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #243

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `KILLBOX` girisini ilk gercek lead-cut ile okunur bir spatial trap anina cevirmek

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
- `project/game/src/game/balance.ts` killbox onset icin `1.4s` zorunlu lead-cut penceresi ekledi; ilk killbox spawn'i artik cadence sansina bakmadan `lead` oluyor, hedefe `0.22s` onde bakiyor ve hareket hattini `18deg` kirarak kacis cizgisini kesiyor
- `project/game/src/game/GameScene.ts` yeni trajectory truth'unu runtime spawn akisina bagladi; killbox girisi artik yalniz hiz/cadence artisi degil arena icinde hissedilen ilk spatial trap gibi davraniyor
- `project/game/src/game/runPhase.ts` ve `GameScene.ts` killbox anlatimini bu yeni truth ile hizaladi; phase dili artik "hard lead cut opens the trap" semantigini tasiyor
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.1s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

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
- `KILLBOX` onset'i artik ilk zorunlu lead-cut ile okunur bir spatial trap anina sahip; siradaki buyuk adim bu yeni trap dilini killbox sonrasina tasiyip `echo` veya baska mevcut beat ile ikinci bir spatial follow-through acmak
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
