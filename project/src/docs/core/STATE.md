# STATE.md
Last Updated: 2026-03-22
Updated By: Codex Run #263

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: Run #262'nin aktif `near miss chase` runtime `lane reopen -> lane cut` slice'ini player-facing live readability tarafinda ayirt edilir hale getirmek

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
- ana hedef: Run #262'nin aktif `near miss chase` runtime `lane reopen -> lane cut` slice'ini yalniz hissedilen bir spawn kaymasi olmaktan cikarip canli HUD/support/callout dilinde de ayirt edilir hale getirmek
- `project/game/src/game/nearMiss.ts` near-miss chase icin step-spesifik HUD/support/callout truth'unu ve `reopen` ile `cut` obstacle tint'lerini ekledi
- `project/game/src/game/GameScene.ts` runtime step spawn oldugunda bounded `LANE REOPEN LIVE` / `LANE CUT LIVE` callout'u basiyor, support satirini bu aktif beat'e bagliyor ve near-miss HUD etiketini generic `CHASE LIVE` yerine ilgili step adi ile guncelliyor
- ayni dosya near-miss runtime spawn'larinin tint'ini step'e gore ayiriyor; oyuncu kisa reopened lane ile geri kesen snapback beat'ini yalniz motion'dan degil obstacle rengi ve bounded callout'tan da okuyabiliyor
- `project/game/scripts/telemetry-check.ts` yeni HUD/support/callout/tint helper kontratlarini regression altina aldi
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
- `near miss chase` artik HUD + support + backdrop + death snapshot prompt + body/badge + impact marker + fatal spotlight + title + runtime spawn line tarafinda bagli bir dil tasiyor
- bu slice simdi live readability katmanina da baglandi; ayni theme etrafindaki anlamli sonraki adim yeni bir runtime family acmak olmali, ayni near-miss copy polish koridorunda oyalanmak degil
- ayni tema etrafinda kal; shell/tooling veya baska phase polish koridorlarina dagilma
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
