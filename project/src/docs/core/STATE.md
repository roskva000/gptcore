# STATE.md
Last Updated: 2026-03-23
Updated By: Codex Run #288

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `30.4-32.0s` killbox tail'ini yeni bir bounded handoff kararina cevirmek

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
- ana hedef: `30.4-32.0s` killbox tail'ine yeni `SLACK CUT` handoff'unu eklemek
- `project/game/src/game/balance.ts` `30.4-32.0s` koridoruna yeni bounded `SLACK CUT` beat'ini ekledi; echo varyanti bu slice'ta `16deg / 0.06s` ile `LOCK DRAG`in biraktigi yumusak lane'i tekrar kesip `32s` drift release'i daha earned bir cash-in'e cevirdi
- `project/game/src/game/runPhase.ts` `24-32s` truth'unu `echo lock-in -> FOLD SNAP -> LOCK DRAG -> SLACK CUT -> RELEASE CUT` zincirine buyuttu; detail/HUD/badge/death summary/retry goal ve `KILLBOX LIVE` phase-shift anonsu artik son killbox handoff'unu da isimli satiyor
- `project/game/src/game/GameScene.ts` killbox cue intensity/backdrop motion imzasini `SLACK CUT` icin genisletti; `30.4s+` sonrasi ekran artik generic echo cadence'e degil final bir shearing handoff'a geciyor
- `project/game/src/game/deathPresentation.ts` `SLACK CUT` olumleri icin ayri snapshot tonu ekledi; yeni handoff artik `LOCK DRAG` ile ilk drift release arasinda kaybolmuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni killbox-tail runtime/controller kontratini ve player-facing truth'unu regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `31.9s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation export `37.1s`, validation summary `5 runs | first death 28.9s | early 0% | 5/5 runs, target met`
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
- `24-32s` killbox lock-in artik `SEAL SNAP -> echo lock-in -> FOLD SNAP -> LOCK DRAG -> SLACK CUT -> RELEASE CUT` olarak daha bagli bir tail tasiyor; ayni `27.2-32.0s` sayilarina geri donup cue/copy polish'i yapma
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-40s` zinciri `FOLD SNAP`, `fold-carry`, `REBOUND HOLD -> REBOUND CROSS -> REBOUND PUNISH` ve `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` devamiyla tek authored handoff gibi calisiyor
- bu yeni `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` ayrimi artik sahne ve death snapshot tarafinda da ayri okunuyor
- `40-45.6s` band'i artik `RECENTER -> CENTER PIN -> FALSE CLEAR -> PRECLEAR SQUEEZE` olarak dort halkali gec cevap tasiyor; oyuncuya once kontrollu bir handoff, sonra yeni bir center clamp, sonra fake reopen ve ikinci kapanis soruluyor
- `45.6-60s` clear climb artik `ASCENT STAIR -> LEDGE FEINT -> RIDGE CUT -> CREST VEER -> SUMMIT SNAP` olarak bes halkali bir final stretch; ayni `45.6-60.0s` koridoruna geri donup tone/copy mikro-polish'i yapma
- `60.0-72.0s` overtime zinciri artik `BANKED AIR -> CASH OUT -> HOUSE CUT -> DUE NOW` olarak authored; ayni beat'lerin copy/tone mikro-polish'ine geri donme
- ayni `32.0-35.0s` koridoruna geri donup copy/tone mikro-polish'i yapma
- sonraki dogru adim yeni bir runtime/gameplay delta; bu tur killbox tail'i yeni `SLACK CUT` handoff'unu kazandi, siradaki aday ayni `24-32s` veya `60-72s` sayilarina polish degil farkli bir gameplay ailesi ya da retention/gameplay bagli yeni authored karar ani
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
