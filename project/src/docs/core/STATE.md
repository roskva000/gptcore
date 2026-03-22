# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #275

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `FALSE CLEAR -> PRECLEAR SQUEEZE` ayrimini runtime'i buyutmadan sahne motion'u ve death snapshot tonunda da ayri okunur hale getirmek

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
- ana hedef: `41.2-45.6s` bait-then-cash-in zincirini gorsel davranis ve snapshot tonunda da ayristirmak
- `project/game/src/game/GameScene.ts` `false-clear` ve `preclear` icin ayri glow/band/frame motion imzalari ekledi; bait slice'i daha acilan bir reopen, squeeze slice'i ise daha sert bir cross-lane close gibi akiyor
- ayni dosya `false-clear` cue yogunlugunu `recenter`'dan daha hafif, `preclear` yogunlugunu ise daha sert olacak sekilde ayarladi; late 40s band'i artik sahnede de iki farkli niyet tasiyor
- `project/game/src/game/deathPresentation.ts` `FALSE CLEAR` ve `PRECLEAR SQUEEZE` olumleri icin ayri palette/callout/title/prompt tonlari ekledi; snapshot artik bait ve cash-in beat'lerini ayni generic late-endgame overlay ile sunmuyor
- `project/game/scripts/telemetry-check.ts` yeni snapshot tone kontratini regression altina aldi
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
- bu yeni `FALSE CLEAR -> PRECLEAR SQUEEZE` ayrimi artik sahne motion'u ve death snapshot tonunda da ayri okunuyor
- sonraki adim ayni late-40s runtime'i tekrar tune etmek degil; baska bir gameplay cephesinde yeni runtime delta sec
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
