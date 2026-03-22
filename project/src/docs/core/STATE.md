# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #273

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK HOLD` ayrimini sahne motion'u ve death snapshot tonunda da ayri okunur hale getirmek

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
- ana hedef: `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK HOLD` ayrimini sahne motion'u ve death snapshot tonunda da ayri okunur hale getirmek
- `project/game/src/game/GameScene.ts` endgame cue'lari icin yeni backdrop motion truth'u ekledi; `late sweep` artik daha genis sola acilan crossback, `sweep lock` daha sert ikinci clamp, `aftershock` ise karsi yone agir bir follow-through olarak glow/band/frame hareketinde ayrisiyor
- ayni sahne entegrasyonu runtime'i degistirmeden `36-39s` band'inin motion imzasini ayirdi; mevcut late-band chain copy disinda da okunur hale geldi
- `project/game/src/game/deathPresentation.ts` `late-sweep`, `sweep-lock` ve `aftershock` olumleri icin ayri snapshot palette'leri ekledi; retry block, callout ve title artik bu uc halkayi ayni late-game death overlay'inde farkli tonlarla tasiyor
- `project/game/scripts/telemetry-check.ts` bu yeni snapshot kontratini regression altina aldi; `late sweep`, `sweep lock` ve `aftershock` icin ayri overlay tone assert'leri eklendi
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
- sonraki adim ayni late-sweep zincirini bir kez daha cilalamak degil; yeni bir runtime/gameplay delta sec
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
