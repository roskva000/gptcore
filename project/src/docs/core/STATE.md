# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #246

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `24-32s` arasindaki normal `echo` cadence'ini `KILLBOX` icin kalici bir lane-fold ritmine cevirip fazin spatial kimligini `DRIFT` onset'ine kadar tasimak

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
- `project/game/src/game/balance.ts` killbox'in yalniz bridge + handoff pencerelerini degil, `24-32s` icindeki tum `echo` cadence'ini de lane-fold davranisina bagladi; cadence ile gelen `echo` spawn'lari artik `DRIFT` onset'ine kadar duz chase'e donmuyor
- ayni dosya yeni `KILLBOX_ECHO_CADENCE_ROTATION_DEGREES` truth'u ile handoff sonrasi `echo` tehditlerini kontrollu `6deg` scissor travel'da tutuyor; killbox artik erken pinch, `24s` lock-in ve sonrasindaki live cadence olarak tek spatial rejim gibi davraniyor
- `project/game/src/game/runPhase.ts` ve `project/game/src/game/GameScene.ts` killbox anlatimini yeni gercege hizaladi: `echo` cadence artik trap'in devam eden parcası olarak tarif ediliyor
- `project/game/scripts/telemetry-check.ts` ile `project/game/scripts/telemetry-reports.ts` bu yeni cadence fold davranisini deterministic regression ve proxy anlatimina kilitledi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `30.4s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

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
- `KILLBOX` artik `24-32s` boyunca da echo cadence ile lane-fold kimligini koruyor; siradaki buyuk adim `32s` `DRIFT` onset'ini bu trap rejiminden dogan yeni bir spatial release/handoff'a cevirmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
