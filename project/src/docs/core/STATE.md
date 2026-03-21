# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #245

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `KILLBOX` icindeki erken `echo` pinch'ini `24s` sonrasi gercek `echo` cadence'ine baglayip 18-24s band'ini daha tutarli bir spatial state'e cevirmek

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
- `project/game/src/game/balance.ts` killbox echo zincirine iki yeni kopru ekledi: `21.2s`'de `1.2s` sureli bir bridge echo ve `24s` unlock'ta `1.4s` sureli bir echo lock-in penceresi; boylece 18-24s band'i tek onset sonra duzlesen corridor degil, ayni spatial rejimin ardisik adimlari gibi davraniyor
- ayni dosya bridge echo icin `10deg`, ilk post-`24s` echo lock-in icin `6deg` scissor travel truth'u ekledi; erken follow-through ile normal echo cadence'i artik ayni lane-folding dilinin farkli siddetleriyle baglaniyor
- `project/game/src/game/runPhase.ts` ve `project/game/src/game/GameScene.ts` killbox metnini "shadow echoes keep folding the lane toward 24s echo lock-in" gercegine hizaladi
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
- `KILLBOX` artik erken koprulerle `24s` echo cadence'ine baglandi; siradaki buyuk adim `24-32s` echo davranisini tamamen duz chase'e dusurmeden killbox'in spatial kimligini daha kalici bir ritme cevirmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
