# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #270

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
- run mode: `integration`
- ana hedef: `FOLD SNAP -> 32s DRIFT RELEASE` handoff'unu ayni authored zincirin tek cevabi gibi hissettirmek
- `project/game/src/game/balance.ts` drift onset'ine kisa bir `fold-carry` slice ekliyor; `32.0-32.8s` araliginda ilk release cut artik `18deg` rotation ve `0.14s` lag ile dogrudan `FOLD SNAP` mirasi tasiyor, release'in kalan `0.8s`i ise `14deg` / `0.18s` ile bu acilisi yumuşatmadan drift'e devrediyor
- ayni dosya killbox son kapanisindan drift release'e gecisi tam reset olmaktan cikariyor; ilk endgame cevabi artik yalniz generic `killbox-release handoff` degil, fold-snap'ten kopan belirgin bir lateral crack olarak davraniyor
- `project/game/src/game/runPhase.ts` `RELEASE CUT` ve `ENDGAME DRIFT` anlatimini fold-snap'ten acilan lateral cevap gercegine hizaladi; HUD/support/death-retry truth'u artik release'i son killbox kapanisindan dogan devam olarak okuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni `fold-carry -> release stretch` kontratini kayda aldi; assertler ilk `32s` cut'inin daha sert, kalan release'in daha yumusak kalmasini ayri ayri kilitliyor
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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-32s` lock-in band'i `FOLD SNAP` ve artik bunun `32s`deki fold-carry release cevabi ile tek zincir gibi calisiyor
- sonraki adim ayni handoff'u copy/spectacle cilasina cekmek degil; erken `DRIFT` zincirinde `REBOUND` tarafina yeni bir runtime karar ani ekleyip `32-35s` band'ini ikinci kez authored yapmak
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
