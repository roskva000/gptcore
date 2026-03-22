# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #274

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `41.2-45.6s` handoff'una yeni bounded route karari eklemek; `RECENTER` sonrasi fake reopen ile late cash-in arasini ayristirmak

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
- ana hedef: `40-45.6s` band'inda yeni bounded route karari acmak; `RECENTER -> PRECLEAR SQUEEZE` handoff'unu generic devam hissinden cikarmak
- `project/game/src/game/balance.ts` `41.2-42.8s` icin yeni `FALSE CLEAR` bait slice'i ekledi; drift kisa bir guvenli gibi gorunen lane verip oyuncuyu tutunmaya cekiyor
- ayni dosya mevcut `PRECLEAR SQUEEZE` penceresini `42.8-45.6s`e daraltip daha sert bir kapanis haline getirdi; late 40s artik tek parca fold-back degil, bait-then-cash-in zinciri
- `project/game/src/game/runPhase.ts` yeni `FALSE CLEAR` cue truth'unu detail/badge/death/retry zincirine bagladi; `PRECLEAR SQUEEZE` metni de bait'in kapandigi ikinci halka olarak ayrildi
- `project/game/src/game/GameScene.ts` endgame phase hint'ini yeni `false-clear -> preclear` zincirine hizaladi
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni runtime pencere, rotation, lag ve player-facing cue kontratini regression altina aldi
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
- sonraki adim ayni late-40s runtime'i tekrar tune etmek degil; bu yeni bait/cash-in zincirini gorebilir urun yuzeylerine sindir ya da baska bir gameplay cephesinde yeni runtime delta sec
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
