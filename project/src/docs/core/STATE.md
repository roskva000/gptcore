# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #266

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
- run mode: `mutation`
- ana hedef: `18-24s` `KILLBOX` band'ina straight-escape cevabini bozan bounded bir yeni trap beat'i eklemek
- `project/game/src/game/balance.ts` `20.6-21.6s` civarinda yeni `PINCH LOCK` penceresi aciyor; mevcut hazard family'leri koruyup `lead` varyantini daha sert `26deg` rotation ve `0.18s` forward lead ile ikinci kez lane'e geri bukuyor
- ayni dosya killbox variant secimini bu yeni bounded pencereye bagliyor; `lead cut -> echo follow-through -> pinch lock -> bridge echo -> echo lock-in` zinciri artik tek killbox spatial state'i gibi akiyor
- `project/game/src/game/runPhase.ts` `PINCH LOCK` cue truth'unu HUD/detail/support/badge/death summary/retry goal yardimcilarina yaydi; killbox artik generik faz fallback'i yerine named bounded bir trap halkasi da tasiyor
- `project/game/src/game/GameScene.ts` yeni killbox cue icin live hint ve beat callout gosteriyor; phase HUD'i aktifken `PINCH LOCK` etiketini ve accent rengini tasiyor
- `project/game/src/game/deathPresentation.ts` killbox `PINCH LOCK` olumlerine ozel snapshot tonu ekledi; cue aktifken game-over palette'i generic killbox tonuna dusmuyor
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.4s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`
- deterministic bucket dagilimi killbox mutasyonuyla dar bicimde kaydi: `10-20s: 6`, `20-30s: 10`, `40s cap: 8`; validation export ortalamasi `34.8s`

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
- `KILLBOX` artik yalniz lead cut + echo follow-through degil; bounded `PINCH LOCK` halkasi ile `20s` band'inda straight-escape cevabini ikinci kez bozuyor
- bu slice artik gameplay + HUD + callout + death snapshot tonuna baglandi; ayni killbox beat'ini sonsuz copy cilasina cevirme, bagli ama yeni bir gorunur entegrasyon sec
- score/meta/tooling veya ayni early-mid spectacle cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
