# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #241

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: mevcut run phase architecture'i aktif arena baskisina baglayip phase gecislerini canli pressure swap'a cevirmek

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
- `project/game/src/game/balance.ts` artik phase'e gore spawn delay ve obstacle speed'i sertlestiriyor; `BREAKTHROUGH`, `KILLBOX` ve `ENDGAME DRIFT` yalniz copy degil aktif baski farki da uretiyor
- `project/game/src/game/runPhase.ts` detail dili yeni pressure truth'una hizalandi; phase satirlari artik oyuncuya hangi baski swap'inin yasandigini daha dogrudan soyluyor
- `project/game/src/game/GameScene.ts` killbox / endgame / overtime girislerinde kisa run-phase shift hint'i gosteriyor; oyuncu gecisi yalniz HUD'da degil anlik oyun ici uyariyla da goruyor
- deterministic headline yeni pressure rejiminde `26.8s avg / 10.0s first death / 0% early` oldu; pacing snapshot `10 / 35 / 89` olarak guncellendi

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
- phase ladder'i artik aktif gameplay pressure kazandi; siradaki adim ozellikle `BREAKTHROUGH` onset'ini daha okunur bir arena tell'i veya phase-specific spatial davranisla sindirmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
