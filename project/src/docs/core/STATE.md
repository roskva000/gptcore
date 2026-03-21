# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #251

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `late sweep` sonrasindaki duzlesmeyi bounded bir `aftershock hold` halkasiyla kirip `37.6-40s` band'ini tekrar olayli hale getirmek

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
- `project/game/src/game/balance.ts` `late sweep` sonrasina `1.4s`lik yeni `aftershock hold` penceresi ekledi; drift varyanti bu pencere boyunca generic alternating cadence'e donmeden sweep tarafinda `30deg`lik daha sert bir clamp ve `0.04s`lik daha siki lag ile devam ediyor
- `project/game/src/game/runPhase.ts` endgame cue truth'unu `aftershock` halkasina buyuttu; phase detail, shift announcement, death summary, badge ve rematch dili artik `release -> rebound -> late sweep -> aftershock hold` zincirini ayni truth ile tasiyor
- `project/game/src/game/GameScene.ts` endgame hint/callout/spectacle yogunlugunu yeni `aftershock` cue'suna hizaladi; late-band follow-through ekranda da ayrisiyor
- `project/game/scripts/telemetry-check.ts` ile `project/game/scripts/telemetry-reports.ts` yeni aftershock davranisi, cue payoff'i, controller string'i, rotation ve lag kontratini deterministic regression altina aldi
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
- `KILLBOX` -> `ENDGAME` zinciri artik `release -> rebound -> late sweep -> aftershock hold` olarak hem runtime hem player-facing truth'ta okunuyor; siradaki buyuk adim ya bu finali `40s+` eline daha bagli bir overtime handoff'una tasimak ya da UI/identity tarafinda esit buyuklukte yeni bir cephe acmak
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
