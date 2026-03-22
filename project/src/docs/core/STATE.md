# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #279

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `GATE CUT -> KILLBOX` onset zincirini yeni runtime slice acmadan tek authored handoff gibi okutmak

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
- ana hedef: `18.0-20.6s` killbox onset'teki adsiz player-facing boslugu kapatip `GATE CUT -> LEAD CUT -> ECHO FOLLOW -> PINCH LOCK` zincirini tek akis gibi okutmak
- `project/game/src/game/runPhase.ts` killbox cue truth'unu `LEAD CUT` ve `ECHO FOLLOW` halkalariyla genisletti; `18.0-20.6s` artik generic `KILLBOX` paragrafina dusmuyor, detail/support/badge/death summary/retry hedefi erken handoff'u da isimlendiriyor
- ayni dosya `PINCH LOCK` ve `KILLBOX LIVE` copy'sini yeni zincire hizaladi; `GATE CUT` ile killbox onset artik ayri fazlar gibi degil ayni authored trap'in ardil halkalari gibi okunuyor
- `project/game/src/game/GameScene.ts` ilk-death hedef hint'ini, killbox phase-shift hint'ini, cue intensity'sini ve backdrop motion'unu yeni early-killbox halkalarina hizaladi; onset artik `PINCH LOCK` beklenmeden sahnede okunuyor
- `project/game/src/game/deathPresentation.ts` `LEAD CUT` ve `ECHO FOLLOW` olumleri icin ayri snapshot tonlari ekledi; early killbox kopusleri generic killbox veya daha gec `PINCH LOCK` tonuna dusmuyor
- `project/game/scripts/telemetry-check.ts` yeni killbox-onset cue, detail, badge, death/retry ve snapshot tone kontratlarini regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `30.8s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 28.9s | early 0% | 5/5 runs, target met`
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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-40s` zinciri `FOLD SNAP`, `fold-carry`, `REBOUND HOLD -> REBOUND PUNISH` ve simdi `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` devamiyla tek authored handoff gibi calisiyor
- bu yeni `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` ayrimi artik sahne ve death snapshot tarafinda da ayri okunuyor
- `40-45.6s` band'i artik `RECENTER -> FALSE CLEAR -> PRECLEAR SQUEEZE` olarak uc farkli gec cevap tasiyor; oyuncuya kisa bir fake reopen sonra ikinci bir kapanis soruluyor
- `45.6-60s` clear climb artik `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` olarak uc halkali bir final stretch; bu entegrasyon kapanmis durumda, ayni koridorda tekrar sayisal polish'e donme
- sonraki dogru adim yeni bir runtime/gameplay delta; tercihen ayni cevrede copy/snapshot polish degil, baska bir bounded karar ani
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
