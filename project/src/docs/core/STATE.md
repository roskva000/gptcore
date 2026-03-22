# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #272

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `36.2-37.6s` late-sweep penceresini ikinci bir cross-lane sonuc ile buyutmek

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
- ana hedef: `36.2-37.6s` late sweep'i tek parca crossback whiplash olmaktan cikarip ikinci bir bounded closure ile yeni bir karar anina cevirmek
- `project/game/src/game/balance.ts` late-sweep zincirine yeni `0.6s` `SWEEP LOCK` slice'i ekledi; ilk `0.8s` `LATE SWEEP` halen `18deg` / `0.08s` ile capraz kirarken son `0.6s` `24deg` / `0.05s` ile ayni crossed lane'i bir beat daha sıkı tutuyor
- ayni runtime slice `32-40s` band'ini `fold-carry -> release stretch -> rebound hold -> rebound punish -> late sweep -> sweep lock -> aftershock` zincirine ceviriyor; ilk caprazdan sonra ayni lane'e erken geri sizmak artik daha net bir maliyet tasiyor
- `project/game/src/game/runPhase.ts` yeni `SWEEP LOCK` cue truth'unu detail, badge, death summary ve retry goal zincirine ekledi; `ENDGAME DRIFT` artik `late sweep`ten dogrudan `aftershock`a atlamiyor
- `project/game/src/game/GameScene.ts` endgame shift hint'ini ve cue intensity haritasini bu yeni halka ile hizaladi; `rebound-punish` intensity boslugu da kapanmis oldu
- `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni sweep-lock rotation/lag/controller kontratini deterministic regression altina aldi
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
- `KILLBOX` artik yalniz lead cut + `PINCH LOCK` + `SEAL SNAP` degil; `24-40s` zinciri `FOLD SNAP`, `fold-carry`, `REBOUND HOLD -> REBOUND PUNISH` ve simdi `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` devamiyla tek authored handoff gibi calisiyor
- sonraki adim yeni runtime acmak degil; bu yeni `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK` ayrimini sahne/snapshot tarafinda da ayri okunur hale getir
- score/meta/tooling veya shell cilasi koridoruna geri donme
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
