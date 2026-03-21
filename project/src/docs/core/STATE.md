# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #248

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `32-40s` band'inda `DRIFT` zincirini ilk killbox-release cut'inin devam eden rebound + late sweep handoff'u gibi okutmak; endgame bir spawn sonra generik alternating beat'e dusmesin

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
- `project/game/src/game/balance.ts` killbox'tan sonra iki bounded drift penceresi ekledi: `33.6-35.0s` civarinda ayni yone devam eden `rebound`, `36.2-37.6s` civarinda karsiya kirilan `late sweep`; endgame artik tek release cut'ten hemen sonra generic cadence'e dusmuyor
- ayni dosya bu zincir icin yeni `28deg` rebound ve `18deg` late sweep travel truth'lari ile kademeli target lag kullaniyor; `32-40s` band'i release -> rebound -> sweep akisi olarak davranıyor
- `project/game/src/game/runPhase.ts` ve `project/game/src/game/GameScene.ts` endgame dilini yeni gercege hizaladi: drift artik "release, rebounds once, then whips into a wider late sweep" olarak okunuyor
- `project/game/scripts/telemetry-reports.ts` deterministic controller anlatimini yeni rebound/sweep pencereleriyle hizaladi
- `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni drift windows, travel vectors, lag baselines ve validation metnini regression altina aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.7s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`

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
- `KILLBOX` artik `32s` sonrasina release -> rebound -> sweep zinciri aciyor; siradaki buyuk adim bunun player-facing okunurlugunu ve retry dürtüsünü UI/shell tarafinda da buyutmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
