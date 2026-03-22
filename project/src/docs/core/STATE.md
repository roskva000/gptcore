# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #271

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `33.6-35.0s` rebound penceresini `hold-or-cross` kararina cevirmek

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
- ana hedef: `33.6-35.0s` rebound penceresini tek parca same-lane sustain olmaktan cikarip `hold-or-cross` kararina cevirmek
- `project/game/src/game/balance.ts` rebound'u iki bounded dilime boldu: ilk `0.7s` `REBOUND HOLD` hala release side'i uzerinde `28deg` / `0.16s` ile tasiyor, kalan `0.7s` ise `REBOUND PUNISH` olarak `22deg` / `0.10s` ile ayni lane'i tekrar kapatip capraz cikisi zorluyor
- ayni runtime slice `32-35s` band'ini `fold-carry -> release stretch -> rebound hold -> rebound punish` zincirine ceviriyor; release'ten acilan yone sonsuza kadar tutunmak artik bedelsiz degil
- `project/game/src/game/runPhase.ts` endgame detail, cue, badge, death summary ve retry goal truth'unu yeni `REBOUND HOLD` / `REBOUND PUNISH` ayrimina hizaladi; oyuncu bu pencerede neyi tutup ne zaman caprazlamasi gerektigini daha net okuyor
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni rebound split kontratini regression altina aldi; rotation, lag, player-facing cue ve deterministic proxy anlatimi bu yeni karar anini kilitliyor
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline yine `30.2s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`
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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-32s` lock-in band'i `FOLD SNAP`, `32s`deki fold-carry release cevabi ve simdi bunun `REBOUND HOLD -> REBOUND PUNISH` devami ile tek zincir gibi calisiyor
- sonraki adim ayni rebound'u sadece copy/spectacle cilasina cekmek degil; ya bu yeni punish'i sahne/snapshot tarafinda ayri okunur hale getir ya da `36.2s+` tarafina benzer dar bir runtime sonuc daha ac
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
