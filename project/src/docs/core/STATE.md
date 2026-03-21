# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #253

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `mutation`
- ana hedef: `recenter` sonrasini bounded bir `preclear squeeze` ile `45s+` eline baglayip endgame'in `41s+` sonrasi generic drift bosluguna dusmesini engellemek

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
- `project/game/src/game/balance.ts` `recenter` sonrasina `4.4s`lik bounded `preclear squeeze` penceresi ekledi; drift varyanti `41.2-45.6s` band'inda generic alternating cadence'e donmeden yeniden acilan lane'e `12deg` fold-back ve `0.10s` lag ile geri basinç kuruyor
- `project/game/src/game/runPhase.ts` endgame cue truth'unu `preclear` halkasiyla buyuttu; phase detail, shift announcement, death summary, badge ve rematch dili artik `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze` zincirini ayni truth ile tasiyor
- `project/game/src/game/GameScene.ts` endgame hint/intensity anlatimini yeni `preclear squeeze` halkasina hizaladi; `41s+` band'i ekranda generic drift bekleyisi yerine yeni bir bounded gec final olarak okunuyor
- `project/game/scripts/telemetry-check.ts` ile `project/game/scripts/telemetry-reports.ts` yeni `preclear` cue/payoff'i, forced drift penceresi, travel rotation, target lag ve controller string kontratini deterministic regression altina aldi
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
- `KILLBOX` -> `ENDGAME` zinciri artik `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze` olarak hem runtime hem player-facing truth'ta okunuyor; siradaki buyuk adim bu yeni `41.2-45.6s` basinçtan `60s clear` payoff'una daha karakterli bir climb kurmak ya da UI/identity tarafinda esit buyuklukte yeni bir cephe acmak
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
