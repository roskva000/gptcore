# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #284

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `52.4-60.0s` summit stretch'inde `RIDGE CUT` sonrasina yeni bounded final-route karari acmak

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
- ana hedef: `52.4-60.0s` summit stretch'inde `RIDGE CUT` sonrasina yeni bounded final-route karari acmak
- `project/game/src/game/balance.ts` clear-climb sonunu bes halkaya cikardi: `ASCENT STAIR -> LEDGE FEINT -> RIDGE CUT -> CREST VEER -> SUMMIT SNAP`; yeni `52.4-54.8s` `CREST VEER` penceresi `18deg / 0.04s` ile ridge kesisini kisa bir reopen'a cevirip summit snap oncesi son bir hold-or-leave karari soruyor
- `project/game/src/game/runPhase.ts` yeni `CREST VEER LIVE` cue'sunu detail/HUD/badge/death summary/retry truth'una ekledi; `ENDGAME DRIFT` makro anlatimi artik final stretch'i `ascent -> ledge feint -> ridge cut -> crest veer -> summit snap` olarak okuyor
- `project/game/src/game/GameScene.ts` `CREST VEER` icin ayri goal-chip tonu, cue intensity ve backdrop motion imzasi ekledi; summit finali tek parca snapback yerine kisa bir reopen sonra son bir cash-in gibi okunuyor
- `project/game/src/game/deathPresentation.ts` `CREST VEER` olumleri icin ayri morumsu snapshot tonu ekledi; ridge cut'in soguk capraz dili ile summit snap'in sicak final tonu arasinda yeni bir ara niyet gorunuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni crest-veer runtime/controller kontratini ve clear-climb zincirini regression altina aldi
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
- ayni `32.0-35.0s` koridoruna geri donup copy/tone mikro-polish'i yapma
- sonraki dogru adim yeni bir runtime/gameplay delta; bu tur summit stretch'i buyudu, siradaki aday ayni clear-climb koridorunda tekrar polish degil `60s+` sonrasina earned bir overtime opener veya clear payout'u dogrudan oyunsallastiran yeni bir runtime sonucu
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
