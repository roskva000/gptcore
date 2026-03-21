# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #260

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: aktif `near miss chase` kopusunu death snapshot body/badge tarafinda daha anlatilabilir bir earned an haline getirmek

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
- `project/game/src/game/nearMiss.ts` death snapshot icin `CHASE SNAP` badge ve earned body-summary helper'larini ekledi; chase zinciri artik prompt disinda da kendi diliyle tasinabiliyor
- `project/game/src/game/deathPresentation.ts` aktif near-miss chase varsa badge'i phase truth'u ile birlestiriyor ve body ikinci satirini generic phase copy yerine `near-miss chase snapped before the lane cooled` anlatimi etrafinda kuruyor
- `project/game/src/game/GameScene.ts` death snapshot'a prompt metninin yaninda near-miss chain count truth'unu da geciyor; earned state tek helper ile body/badge/prompt tarafina yayiliyor
- `project/game/scripts/telemetry-check.ts` yeni near-miss snapshot badge/body kontratini regression altina aldi
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
- `near miss chase` artik HUD + support + backdrop + death snapshot prompt + body/badge yuzeylerinde yasiyor; siradaki adim bunu yeni sistem acmadan impact/fatal spotlight tarafinda daha mekansal bir snapped lane anina sindirmek
- ayni tema etrafinda kal; shell/tooling veya baska phase polish koridorlarina dagilma
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
