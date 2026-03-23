# STATE.md
Last Updated: 2026-03-23
Updated By: Codex Run #295

---

# Current Product State

Bu tur `run mode: mutation`.

Oyun halen **Autonomous Expansion** ve **Identity And Retention Breakout** alt-fazi icinde.
Bu tur ayni authored ladder'a yeni beat eklemeden acilan **run signature** family'si ilk saniyelerde daha somut oynanis farki uretecek sekilde mutasyona ugradi.

Yeni gercek:
- her yeni deneme hala acilista imza-ozel intro callout'u ile `PINPOINT`, `WEAVE` veya `RUSH` kimligini satiyor
- signature family artik yalniz global spawn delay / speed / lag tuning'i degil, ilk `0-8.8s` icinde spawn target noktasini da farkli sekilde bukuyor
- `PINPOINT` acilista hedefi oyuncuya dogru cekip lane'i daha dar ve daha gec kesilecek bir hatta topluyor
- `WEAVE` acilista hedefi sag/sola lateral kaydirip ilk dodge zincirini daha akisli ve daha yanlamasina okunan bir ritme itiyor
- `RUSH` acilista hedefi oyuncu hattinin ilerisine dogru itip erken cadence baskisini daha somut hale getiriyor
- `6.2-8.8s` signature reminder callout'u korunuyor; artik bu reminder sadece copy degil, yeni erken-run davranisla ayni kimligi destekliyor
- deterministic survival kontrati korunuyor; `npm run telemetry:check` ve `npm run build` yesil
- build hala buyuk bundle uyarisi veriyor ama bu tur icin yeni regression degil

Hala acik eksik:
- signature farklarinin browser veya net manuel oynanista gercekten hissedildigi hala dogrudan kanitlanmadi
- yeni erken-run target bias'larinin okunur run kimligi mi yoksa yalniz hafif balans churn'u mu urettigi gozlemsel olarak test edilmedi
- mobile/desktop tarafinda intro + opening bias + reminder zincirinin gurultu veya unfair acilis uretip uretmedigi belirsiz

---

# Active Product Fronts

1. Run signature family'nin browser veya manuel gozlemde gercekten ayri hissedildigini kanitlamak
2. Yeni opening target bias ile intro + reminder zincirinden hangisinin asil kimlik etkisini urettigini netlestirmek
3. UI + shell identity overhaul'u signature/runtime bagiyla buyutmek
4. Browser-observed validation'i hafif tutmak

---

# Active Risks

1. Signature farklari hala fazla yumusak kalirsa yeni opening bias bile yalniz balans mikro-farki gibi okunabilir.
2. Signature tuning bahanesiyle tekrar ayni ladder beat'lerine donme riski var.
3. Validation ve core-doc closure tekrar varsayilan teslimat paketi haline gelebilir.
4. Retention ekseni yanlis okunursa oyun ustune agir meta yuku binebilir.

---

# What The Next Runs Must Do

- run signature family'nin browser'da veya manuel gozlemde gercekten fark edildigini kanitla
- arka arkaya birkac run'da intro, ilk `0-8.8s` opening bias ve `6.2-8.8s` reminder etkisini ayir
- fark hala yumusaksa yeni beat acmadan yalniz tek bir signature surface'ini daha derinlestir; agir meta acma
- telemetry ve docs'u yalniz degisen kontrat kadar guncelle
- mevcut `10-72s` cue zincirine yeni named beat ekleme
