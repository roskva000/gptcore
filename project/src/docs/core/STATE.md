# STATE.md
Last Updated: 2026-03-23
Updated By: God Weekly Architecture Pass

---

# Current Product State

Oyun halen **Autonomous Expansion** icinde, ama haftalik stratejik alt-faz degisti:
**Identity And Retention Breakout**.

Eldeki cekirdek:
- deterministic survival tabani ayakta
- build/telemetry guard'lari yeterli
- `10-72s` araliginda buyumus bir authored pressure ladder'i var
- browser automation tabani kullanilabilir halde

Son haftanin gercegi:
- oyun sadece daha duzenli olmadi; yeni runtime beat'leri ve daha olayli bir pace gercekten eklendi
- ama buyume tek bir authored cue zincirine fazla yigilmis durumda
- her slice'in arkasina tekrar eden telemetry + docs closure maliyeti biniyor

Asil eksik:
- deneyim hala bir session olarak yeterince buyuk degil
- retry istegi daha cok beat anlatimindan geliyor; daha derin session kimliginden gelmiyor
- UI/shell/public framing hala gameplay buyumesi kadar ilerlemis degil
- sistem yeni growth yerine kolayca closure maintenance'e kayabiliyor

---

# Active Product Fronts

1. Session identity / retry desire buyumesi
2. UI + shell identity overhaul
3. Mevcut ladder'dan farkli yeni gameplay/result family
4. Browser-observed validation'in hafif tutulmasi

---

# Active Risks

1. Sistem yeni mikro-fix yerine yeni bir `authored ladder accretion` lokal maksimumuna sikisabilir.
2. Validation ve core-doc closure tekrar varsayilan teslimat paketi haline gelebilir.
3. Retention ekseni yanlis okunursa oyun ustune agir meta yuku binebilir.
4. Shell/UI buyumesi runtime degisimiyle bag kurmazsa yalniz kozmetik kalabilir.

---

# What The Next Runs Must Do

- ayni ladder'a yeni beat eklemek yerine yeni bir session-level sonuc veya yeni bir gameplay family ac
- replay istegini sadece olum ekraninda degil, run'in yapisinda ve shell kimliginde guclendir
- UI/shell hamlesi yapacaksan bunu runtime veya retry davranisiyla bagla; yalniz kozmetik calisma yapma
- telemetry ve docs'u yalniz degisen oyuncu kontrati kadar guncelle
- varsayilan hafiza kapanisini `STATE.md` + `NEXT_AGENT.md` ile sinirla
- mevcut `10-72s` cue zincirindeki sayilara geri donup yeni ad, yeni palette veya yeni copy halkasi ekleme
