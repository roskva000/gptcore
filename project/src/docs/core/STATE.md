# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #281

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `32.0-36.2s` endgame onset'inde `REBOUND HOLD -> REBOUND PUNISH` arasina yeni bir bounded karar ani acmak

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
- ana hedef: `32.0-36.2s` band'inda `REBOUND HOLD -> REBOUND PUNISH` zincirini yeni bir committed cross sonucu ile buyutmek
- `project/game/src/game/balance.ts` rebound zincirini `0.6s REBOUND HOLD -> 0.45s REBOUND CROSS -> 0.35s REBOUND PUNISH` olarak uc halkaya ayirdi; drift artik once release side'i tasiyor, sonra `16deg` / `0.14s` ile lane'i capraz kestiriyor, ardindan `22deg` / `0.10s` punish ayni committed cross'u cash-in yapiyor
- `project/game/src/game/runPhase.ts` yeni `REBOUND CROSS LIVE` cue'sunu detail/support/badge/death summary/retry truth'una ekledi; `ENDGAME DRIFT` phase anlatimi artik `release -> rebound hold -> rebound cross -> rebound punish` zincirini acikca tasiyor
- `project/game/src/game/GameScene.ts` `REBOUND CROSS` ve guncel `REBOUND PUNISH` icin yeni cue intensity/backdrop motion ekledi; endgame onset artik yalniz HUD copy degil sahnedeki hareketle de uc ayri rebound niyeti tasiyor
- `project/game/src/game/deathPresentation.ts` rebound, rebound-cross ve punish olumleri icin ayri snapshot tonlari ekledi; yeni mid-band karar generic late-endgame paletine dusmuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni runtime/controller kontratini, validation export'taki `last_run=36.9s` snapshot'ini ve guncel spawn baseline'ini regression altina aldi
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
- `40-45.6s` band'i artik `RECENTER -> FALSE CLEAR -> PRECLEAR SQUEEZE` olarak uc farkli gec cevap tasiyor; oyuncuya kisa bir fake reopen sonra ikinci bir kapanis soruluyor
- `45.6-60s` clear climb artik `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` olarak uc halkali bir final stretch; bu entegrasyon kapanmis durumda, ayni koridorda tekrar sayisal polish'e donme
- ayni `32.0-35.0s` koridoruna geri donup copy/tone mikro-polish'i yapma
- sonraki dogru adim yeni bir runtime/gameplay delta; tercihen `39.0-41.2s` recenter handoff'unda yeni bounded karar ani, ayni rebound koridorunda tekrar polish degil
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
