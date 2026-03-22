# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #265

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `STRAFE FORK -> SURGE SNAP` zincirini arena spectacle ve death snapshot tonunda da ayirt edilir hale getirmek

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
- ana hedef: Run #264'te acilan `STRAFE FORK -> SURGE SNAP` zincirini arena spectacle ve death snapshot tonunda da ayirt edilir hale getirmek
- `project/game/src/game/GameScene.ts` breakthrough cue aktifken backdrop glow, top-bottom band ve frame'i cue-spesifik offset/angle/motion ile hareket ettiriyor; `STRAFE FORK` lane'i yana acan daha sicak bir kayma, `SURGE SNAP` ise geri kapanan daha sert bir snapback imzasi tasiyor
- ayni dosya death overlay acildiginda `deathPresentation` tonunu callout/badge/title/body/prompt renklerine uyguluyor; breakthrough olumleri artik generic game-over paletine donmuyor
- `project/game/src/game/deathPresentation.ts` snapshot tonunu cue-aware hale getirdi; `STRAFE FORK` ve `SURGE SNAP` olumleri ayri accent paletleri alip near-miss prompt override'i ile uyumlu kaldi
- `project/game/scripts/telemetry-check.ts` yeni snapshot accent kontratini regression altina aldi; strafe ve surge olumleri artik farkli callout/prompt/title tonlari bekliyor
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.4s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`

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
- bu slice artik gameplay + HUD + callout + spectacle + death snapshot tonuna baglandi; ayni breakthrough koridorunda yeni copy cilasi yerine yeni gorunur gameplay deltasi secilmeli
- score/meta/tooling veya ayni early-mid spectacle cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
