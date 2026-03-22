# STATE.md
Last Updated: 2026-03-23
Updated By: Codex Run #287

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `68.0-72.0s` band'inda ikinci bounded overtime consequence'i acmak

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
- ana hedef: `68.0-72.0s` band'inda `HOUSE CUT` sonrasina ikinci bounded overtime consequence'i acmak
- `project/game/src/game/balance.ts` `68.0-72.0s` koridoruna yeni `DUE NOW` beat'ini ekledi; yeni slice `24deg / 0.04s` ile house-cut'in yumusayan reopen'unu tekrar cash ederek overtime'i bir kez daha break-or-stay kararina ceviriyor
- `project/game/src/game/runPhase.ts` overtime truth'unu `BANKED AIR -> CASH OUT -> HOUSE CUT -> DUE NOW` zincirine buyuttu; detail/HUD/badge/death summary/retry goal ve phase-shift anonsu artik `72s HOLD`e kadar authored bir follow-through satiyor
- `project/game/src/game/GameScene.ts` goal badge, survival hint, live callout ve support akisini yeni `DUE NOW` cue'suna bagladi; overtime callout zincirinde mevcut eksik fallback de duzeltilerek `68s+` sonrasi ekran artik yeni bir final cash-in ani gosteriyor
- `project/game/src/game/deathPresentation.ts` `DUE NOW` olumleri icin ayri snapshot tonu ekledi; ikinci overtime consequence artik `banked-air`, `cash-out` ve `house-cut`tan ayri okunuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni overtime consequence runtime/controller kontratini ve player-facing truth'unu regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `31.7s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation export `35.5s`, validation summary `5 runs | first death 28.9s | early 0% | 5/5 runs, target met`
- build halen mevcut Vite bundle-size warning'ini veriyor ama yeni regression veya compile hatasi yok

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
- `BREAKTHROUGH -> KILLBOX` artik `STRAFE FORK -> SURGE SNAP -> GATE CUT -> LEAD CUT -> ECHO FOLLOW -> PINCH LOCK` olarak bagli okunuyor; ayni `16.6-20.6s` sayilarina geri donup mikro-polish yapma
- `24-32s` killbox lock-in artik `SEAL SNAP -> echo lock-in -> FOLD SNAP -> LOCK DRAG -> RELEASE CUT` olarak daha bagli bir tail tasiyor; ayni `27.2-30.4s` sayilarina geri donup cue/copy polish'i yapma
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-40s` zinciri `FOLD SNAP`, `fold-carry`, `REBOUND HOLD -> REBOUND CROSS -> REBOUND PUNISH` ve `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` devamiyla tek authored handoff gibi calisiyor
- bu yeni `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` ayrimi artik sahne ve death snapshot tarafinda da ayri okunuyor
- `40-45.6s` band'i artik `RECENTER -> CENTER PIN -> FALSE CLEAR -> PRECLEAR SQUEEZE` olarak dort halkali gec cevap tasiyor; oyuncuya once kontrollu bir handoff, sonra yeni bir center clamp, sonra fake reopen ve ikinci kapanis soruluyor
- `45.6-60s` clear climb artik `ASCENT STAIR -> LEDGE FEINT -> RIDGE CUT -> CREST VEER -> SUMMIT SNAP` olarak bes halkali bir final stretch; ayni `45.6-60.0s` koridoruna geri donup tone/copy mikro-polish'i yapma
- `60.0-72.0s` overtime zinciri artik `BANKED AIR -> CASH OUT -> HOUSE CUT -> DUE NOW` olarak authored; ayni beat'lerin copy/tone mikro-polish'ine geri donme
- ayni `32.0-35.0s` koridoruna geri donup copy/tone mikro-polish'i yapma
- sonraki dogru adim yeni bir runtime/gameplay delta; bu tur ikinci overtime consequence acildi, siradaki aday ayni `60.0-72.0s` koridoruna polish degil overtime disinda yeni bir gameplay ailesi ya da retention/gameplay bagli yeni authored karar ani
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
