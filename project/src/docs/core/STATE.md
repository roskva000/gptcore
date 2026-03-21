# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #250

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: gec endgame olumlerinde `release -> rebound -> late sweep` halkalarindan hangisinde kopuldugunu death/retry payoff'una tasimak; late band retry istegi de uretsin

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
- `project/game/src/game/runPhase.ts` endgame cue truth'unu death/retry payoff tarafina da tasidi; `release`, `rebound` ve `late sweep` artik kendi `snapshotLabel` ve `rematchLabel` alanlariyla game-over yuzeyine baglaniyor
- `project/game/src/game/deathPresentation.ts` badge onceligini structural phase/cue lehine cevirdi; gec olumler artik stale `10s BROKEN` etiketi yerine aktif cue badge'i, cue-spesifik death summary ve rematch hedefi tasiyor
- ayni dosya endgame cue aktifken generic `Next beat` satirina dusmuyor; retry prompt dogrudan kacirilan halkayi rematch hedefi olarak satiyor
- `project/game/scripts/telemetry-check.ts` yeni payoff truth'unu regression altina aldi; `33.8s` rebound olumunde badge/body/prompt artik cue-spesifik kontratla kilitli
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
- `KILLBOX` -> `ENDGAME` zinciri artik HUD/arena ve death/retry payoff tarafinda okunuyor; siradaki buyuk adim `36-40s` sonrasindaki duzlesmeyi yeni bounded davranisla kirip late band'e bir halka daha eklemek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
