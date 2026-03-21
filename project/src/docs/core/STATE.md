# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #257

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: mevcut `clear climb` final-threat zincirini arena spectacle ve live readability tarafinda daha ayirt edilir bir final olayina cevirmek

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
- `project/game/src/game/runPhase.ts` clear-climb truth'unu player-facing olarak parcaladi; ilk yarida `ASCENT STAIR LIVE`, son yarida `SUMMIT SNAP LIVE` title/HUD etiketi uretiyor ve final stretch artik tek `CLEAR CLIMB` etiketi altinda duzlesmiyor
- `project/game/src/game/GameScene.ts` goal badge, hint ve beat callout'u bu ayni threat truth'una bagladi; oyuncu `45.6-60s` band'inde kalan sureyi generic final chase yerine hangi son-stretch davranisinda oldugunu goruyor
- ayni dosya backdrop glow/aura, ust-alt band ve frame hareketini `ascent stair` ve `summit snap` icin ayri motion imzalariyla guncelledi; clear climb artik yalniz copy degil, sahnede yone ve snapback karakterine sahip
- `project/game/scripts/telemetry-check.ts` yeni `ASCENT STAIR LIVE` / `SUMMIT SNAP LIVE` truth'unu regression altina aldi
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
- `KILLBOX` -> `ENDGAME` zinciri artik `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb(ascent stair -> summit snap)` olarak runtime truth'unda tamamlandi; siradaki adim bu yeni final threat'i arena spectacle / browser-gozlenebilir okunurluk tarafinda daha da ayirt etmek
- ayni run-phase/final-stretch koridorunda copy-only cilaya geri dusme; siradaki ana hamle replay istegini buyuten yeni bir yuzey acmali
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
