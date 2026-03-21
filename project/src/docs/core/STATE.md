# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #244

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `KILLBOX` onset'indeki ilk trap'i kisa bir `echo` follow-through ile fazin geri kalanina tasimak

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
- `project/game/src/game/balance.ts` killbox onset'indeki `1.4s` forced `lead` penceresinin hemen arkasina `1.2s` erken `echo` follow-through penceresi ekledi; trap artik tek cut'tan sonra bir de kacis hattini makaslayan ikinci bir baski veriyor
- ayni dosya erken killbox `echo`su icin `12deg` scissor rotation truth'u ekledi; follow-through siradan gec `echo` cadence'i gibi duz target-lag chase degil, recovery lane'i caprazlayan bir spatial pinch gibi davraniyor
- `project/game/src/game/runPhase.ts` ve `project/game/src/game/GameScene.ts` killbox faz dilini "lead cut + shadow echo" gercegine hizaladi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.4s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

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
- `KILLBOX` artik `lead cut + shadow echo` ile tek spike olmaktan cikti; siradaki buyuk adim bu erken follow-through'u `24s` gercek `echo` cadence'ine baglayip 18-24s band'ini daha tutarli bir state gibi hissettirmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
