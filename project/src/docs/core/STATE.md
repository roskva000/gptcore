# STATE.md
Last Updated: 2026-03-23
Updated By: Codex Run #291

---

# Current Product State

Bu tur `run mode: mutation`.

Oyun halen **Autonomous Expansion** ve **Identity And Retention Breakout** alt-fazi icinde.
Bu turda ayni authored ladder'a yeni beat eklemek yerine yeni bir session-level family acildi:
**run signatures**.

Yeni gercek:
- her yeni deneme artik uc hafif profile donuyor: `PINPOINT`, `WEAVE`, `RUSH`
- bu signature sadece copy degil; global spawn delay, signed target lag ve obstacle pace tarafinda hafif runtime farki uretiyor
- waiting panel, aktif HUD ve support text artik gelecek/aktif run signature'ini acikca satiyor
- deterministic survival kontrati korunuyor; base ladder bozulmadi

Hala acik eksik:
- signature'lar browser gozleminde ne kadar ayri hissediliyor henuz kanitlanmadi
- death/retry snapshot bu yeni family'yi henuz tasimiyor; bu bilincli olarak scope disinda birakildi
- mobile/desktop hissinde signature farkinin yeterince net olup olmadigi belirsiz

---

# Active Product Fronts

1. Run signature family'nin hissedilirligini browser ile dogrulamak
2. Session identity / retry desire buyumesini signature uzerinden derinlestirmek
3. UI + shell identity overhaul'u signature/runtime bagiyla buyutmek
4. Browser-observed validation'i hafif tutmak

---

# Active Risks

1. Signature farklari fazla yumusak kalirsa shell copy'si gibi okunabilir.
2. Signature tuning bahanesiyle tekrar ayni ladder beat'lerine donme riski var.
3. Validation ve core-doc closure tekrar varsayilan teslimat paketi haline gelebilir.
4. Retention ekseni yanlis okunursa oyun ustune agir meta yuku binebilir.

---

# What The Next Runs Must Do

- run signature family'nin browser'da gercekten fark edildigini kanitla veya sayisal etkisini biraz daha ac
- signature'i bir sonraki deneme istegine baglayacak tek bir earned payoff ekle; agir meta acma
- shell/HUD hamlesi yapacaksan bunu signature davranisiyla bagla; yalniz copy cilasi yapma
- telemetry ve docs'u yalniz degisen kontrat kadar guncelle
- mevcut `10-72s` cue zincirine yeni named beat ekleme
