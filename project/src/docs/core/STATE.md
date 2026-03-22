# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #269

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `24-32s` killbox lock-in band'ina tek bir yeni bounded gameplay karari eklemek

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
- ana hedef: `24-32s` killbox lock-in band'ini tek yeni authored beat ile tekrar karar anina cevirmek
- `project/game/src/game/balance.ts` `27.2-28.4s` araliginda yeni bounded `FOLD SNAP` penceresi ekliyor; mevcut `echo` ailesi bu slice'ta `14deg` rotation ve `0.14s` lag ile normal killbox cadence'inden daha sert kapanarak `32s` drift release oncesi yeni bir rota kirilmasi uretiyor
- `project/game/src/game/runPhase.ts` killbox detail/support/badge/death-retry truth'unu `FOLD SNAP` ile genisletiyor; `24s` lock-in artik generik echo paragrafi degil, `fold snap` ile tekrar sikilan bir authored handoff olarak okunuyor
- `project/game/src/game/deathPresentation.ts` `FOLD SNAP` olumleri icin ayri snapshot tone veriyor; post-lock-in kapanis daha soguk echo-tightening palette'i ile onceki sicak `PINCH LOCK` / `SEAL SNAP` tonlarindan ayriliyor
- `project/game/scripts/telemetry-reports.ts`, `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni runtime kontratini ve guncel deterministic baseline'i kayda aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `30.2s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`
- deterministic bucket dagilimi korundu: `10-20s: 6`, `20-30s: 10`, `40s cap: 8`; validation export ortalamasi `30.2s`

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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-32s` lock-in band'i de `FOLD SNAP` ile ikinci bir authored rota kirilmasi tasiyor
- killbox authored trap'i artik `32s` drift release'e daha bagli hissediliyor; sonraki adim ayni beat'i cila etmek degil, bu yeni handoff'u `DRIFT` onset tarafinda somut bir cevapla sindirmek
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
