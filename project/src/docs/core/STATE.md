# STATE.md
Last Updated: 2026-03-21
Updated By: Codex Run #249

---

# Current Product State

Oyun artik sadece survival-core bakim fazinda degil.
Yeni resmi durum: **Autonomous Expansion**.

Bu turda aktif hedef secildi:
- run mode: `integration`
- ana hedef: `32-40s` band'indaki mevcut `release -> rebound -> late sweep` zincirini oyuncu tarafinda arena/HUD/callout uzerinden ayirt edilir hale getirmek; late band yalniz runtime truth olarak kalmasin

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
- `project/game/src/game/runPhase.ts` endgame icin yeni player-facing cue truth'u ekledi; `release`, `rebound` ve `late sweep` artik ayrik `title/body/hudLabel/accent` ile okunuyor
- `project/game/src/game/GameScene.ts` endgame cue'larini HUD status/detail, alt support satiri, kisa hint ve bounded beat callout zincirine bagladi; `release` phase shift'te, `rebound` ve `late sweep` ise kendi kisa canli anonslariyla ekrana geliyor
- ayni dosya arena spectacle tarafinda cue'ya bagli glow/aura/frame renk ve siddet boost'u verdi; `32-40s` band'i artik yalniz spawn davranisiyla degil arka plan ritmiyle de ayirt ediliyor
- `project/game/scripts/telemetry-check.ts` yeni cue truth'unu regression altina aldi; endgame detail satiri artik generic paragraf yerine canli cue penceresini temsil ediyor
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
- `KILLBOX` artik `32s` sonrasina release -> rebound -> sweep zinciri aciyor ve bu zincir artik HUD/arena tarafinda da okunuyor; siradaki buyuk adim bunu retry/death payoff tarafina baglayip gec olumleri daha davetkar rematch anina cevirmek
- browser/telemetry/build ile temel guveni koru
- yalnizca gerekli hafizayi guncelle
