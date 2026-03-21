# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #264

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `BREAKTHROUGH` band'ini ilk gercek authored early-mid spatial fork'a cevirmek; `strafe -> surge` artik bounded bir cevap zinciri gibi okunuyor

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
- ana hedef: `BREAKTHROUGH` band'ini ilk gercek authored early-mid spatial fork'a cevirmek; `strafe` ve `surge` yalniz isimli cadence olmaktan cikip tek bir bounded cevap zincirine baglandi
- `project/game/src/game/balance.ts` `12.0-13.4s` icin forced `STRAFE FORK`, `15.0-16.6s` icin forced `SURGE SNAP` window'larini ekledi; strafe daha sert cross-lane cut aliyor, surge ise kisa forward lead ile yeniden kapanan cevap cizgisine donuyor
- ayni dosya bu breakthrough pencereleri bittiginde normal cadence'e geri donuyor; yeni hazard family, spawn manager'i veya phase rewrite acilmadi
- `project/game/src/game/runPhase.ts` breakthrough cue truth'unu ekledi; HUD/detail/support, death summary, badge ve retry-goal artik `STRAFE FORK` ile `SURGE SNAP` isimlerini tek kaynaktan okuyor
- `project/game/src/game/GameScene.ts` breakthrough cue canliya girdiginde bounded hint + beat callout basiyor, phase HUD'ina aktif cue etiketini ekliyor ve ilk `10s` sonrasi breakthrough hint'ini yeni authored zincire hizaliyor
- `project/game/src/game/telemetry.ts`, `project/game/scripts/telemetry-reports.ts` ve `project/game/scripts/telemetry-check.ts` yeni breakthrough fork kontratini ve guncel deterministic baseline'i kayda aldi
- deterministic validation yesil kaldi: `npm run telemetry:check` ve `npm run build` basarili; headline `29.4s avg / 10.0s first death / 0% early`, pacing `10 / 35 / 89`, validation summary `5 runs | first death 19.6s | early 0% | 5/5 runs, target met`

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
- `BREAKTHROUGH` artik generic phase metni degil; `STRAFE FORK` ile `SURGE SNAP` olarak adlandirilmis erken-mid spatial cevap zinciri tasiyor
- bu slice gameplay + HUD + callout + death/retry truth'una baglandi; siradaki mantikli adim ayni truth'u arena spectacle ve snapshot tonunda da ayirt edilir kilmak, yeni cadence ailesi acmak degil
- ayni tema etrafinda kal; score/meta/tooling veya baska phase polish koridorlarina dagilma
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
