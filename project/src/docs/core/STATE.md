# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #267

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `KILLBOX` icinde `bridge echo` sonrasi toparlanma hattini tekrar kapatan yeni bir bounded runtime beat acmak

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
- ana hedef: `21.2-24s` `KILLBOX` kozusunda bridge echo sonrasi oyuncuya verilen kisa toparlanma adimini tekrar bozan yeni bir route-break acmak
- `project/game/src/game/balance.ts` `22.4-23.6s` araliginda yeni bounded `SEAL SNAP` penceresi ekliyor; mevcut `echo` family'sini koruyup hareketi `18deg` snapback rotation ve `0.10s` hedef lag ile sertlestiriyor
- ayni dosya killbox spatial zincirini `lead cut -> shadow echo -> pinch lock -> bridge echo -> seal snap -> echo lock-in` hattina buyutuyor; yeni manager veya hazard family acilmadi
- `project/game/src/game/runPhase.ts` `SEAL SNAP` cue truth'unu HUD/detail/support/badge/death summary/retry goal katmanina tasiyor; killbox artik tek pinch halkasiyla yetinmeyen iki asamali kapanis semantigi tasiyor
- `project/game/src/game/GameScene.ts` killbox shift hint'ini yeni zincire hizaliyor; live callout ve HUD cue bu ikinci kapanisi ayri beat olarak okutuyor
- `project/game/src/game/deathPresentation.ts` `SEAL SNAP` olumlerine ozel snapshot tonu ekliyor; late killbox kapanisi generic palette'e dusmuyor
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `30.3s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`
- deterministic bucket dagilimi korunuyor: `10-20s: 6`, `20-30s: 10`, `40s cap: 8`; validation export ortalamasi `30.1s`

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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` degil; `bridge echo` sonrasi `SEAL SNAP` ile `24s` oncesi toparlanma hattini tekrar kapatiyor
- bu slice artik runtime + HUD + death-retry truth'una baglandi; sonraki adim ayni beat etrafinda docs veya copy yiginmak degil, okunurlugu yuksek ama dar bir entegrasyon secmek
- score/meta/tooling veya ayni early-mid spectacle cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
