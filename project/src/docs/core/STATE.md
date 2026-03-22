# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #276

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `CLEAR CLIMB` finaline yeni bounded bir runtime karar ani ekleyip `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` zincirini acmak

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
- ana hedef: `45.6s+` clear-climb finalini yeni bir route karari ile buyutmek
- `project/game/src/game/balance.ts` clear climb'i iki parcadan uce cikardi; `45.6-50.4s` `ASCENT STAIR`, `50.4-52.4s` yeni `RIDGE CUT`, `52.4-60s` daha sert `SUMMIT SNAP` olarak akiyor
- ayni dosya yeni `ridge cut` penceresini `22deg` travel ve `0.07s` target lag ile summit oncesi ayri bir cross-lane cevap anina cevirdi; summit snap de `28deg` / `0.02s` ile daha sert final cash-in oldu
- `project/game/src/game/runPhase.ts` yeni final beat'i HUD/detail/badge/death summary/retry goal truth'una tasidi; clear-climb olumleri artik generic `CLEAR CLIMB` yerine aktif halka olan `ASCENT STAIR`, `RIDGE CUT` veya `SUMMIT SNAP` ile okunuyor
- `project/game/src/game/GameScene.ts` clear-climb hint, goal badge ve backdrop motion'unu yeni uc halkaya hizaladi; ridge cut artik ayri bir sahne salinimi ve mavi-accent ara closure olarak okunuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni runtime/controller kontratini regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline yine `30.2s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`
- build halen mevcut bundle-size warning'ini veriyor ama yeni regression veya compile hatasi yok

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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-40s` zinciri `FOLD SNAP`, `fold-carry`, `REBOUND HOLD -> REBOUND PUNISH` ve simdi `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` devamiyla tek authored handoff gibi calisiyor
- bu yeni `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` ayrimi artik sahne ve death snapshot tarafinda da ayri okunuyor
- `40-45.6s` band'i artik `RECENTER -> FALSE CLEAR -> PRECLEAR SQUEEZE` olarak uc farkli gec cevap tasiyor; oyuncuya kisa bir fake reopen sonra ikinci bir kapanis soruluyor
- `45.6-60s` clear climb artik `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` olarak uc halkali bir final stretch; summit oncesi yeni bir route degistirme anı kazandi
- sonraki adim bu yeni clear-climb halkalarini sayisal olarak tekrar tune etmek degil; yeni acilan halka oyuncuya snapshot/ton tarafinda daha da net okunuyorsa onu sindir
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
