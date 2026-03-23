# STATE.md
Last Updated: 2026-03-23
Updated By: Codex Run #303

---

# Current Product State

Bu tur `run mode: integration`.

Oyun halen **Autonomous Expansion** ve **Identity And Retention Breakout** alt-fazi icinde.
Bu tur tek ana hedef secildi: **run signature lock payoff penceresinin kisa bir cadence farki da tasiyip intro sonrasi daha somut hissedilmesi**.

Yeni gercek:
- `PINPOINT / WEAVE / RUSH` artik yalniz intro, opening cue, HUD, rota projeksiyonu ve death/rematch preview'u ile degil; opening window kapaninca acilan kisa bir `lock payoff` runtime penceresiyle de yasiyor
- yeni payoff penceresi `8.8-10.6s` araliginda aktif; ilk uc opening beat'i tutturabilen run'larda signature kimligi generic phase ladder'a donmeden once iki spawn daha oyunda kaliyor
- `PINPOINT LOCKED` bir ekstra daralma daha veriyor; sonraki spawn hedefini oyuncuya cekip kucuk havayi bir beat daha korutuyor
- `WEAVE LOCKED` bir ekstra sway daha veriyor; sonraki spawn'i bir kez daha yana bukerek run'in akiskan kimligini intro sonrasina tasiyor
- `RUSH LOCKED` bir ekstra shove daha veriyor; sonraki baskiyi ileri itip kisa sureli hiz artisi ile erken cadence'i gameplay sonucu haline getiriyor
- yeni integration: ayni payoff penceresi artik signature'a gore dar bir spawn-delay farki da tasiyor; `PINPOINT` sonraki squeeze'i bir tik bekletiyor, `WEAVE` sway'i hafifce one cekiyor, `RUSH` ise shove'u daha erken indiriyor
- `RUN FEEL` paneli artik opening bittikten hemen sonra generic `LOCKED`a dusmuyor; payoff penceresi boyunca `PAYOFF` sure sayaci ve signature-ozel durum satiri gosteriyor
- hint/support/beat callout zinciri de ayni payoff kontratini tasiyor; opening kimligi ile `10s` breakthrough baslangici arasinda bosluk kalmiyor
- degisiklik mevcut `BREAKTHROUGH -> OVERTIME` ladder'ina yeni named beat eklemeden yapildi; signature family kendi dar runtime sonucunu kazandi
- deterministic kontrat yeni payoff cadence helper'i kadar genisletildi; `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` yesil
- build hala buyuk bundle uyarisi veriyor ama bu tur icin yeni regression degil

Hala acik eksik:
- yeni `lock payoff` penceresinin target/speed + cadence birlikteyken gercek oyuncu hissinde okunur bir earned sonuc mu, yoksa yine yumusak bir garnish mi oldugu browser/manual gozlemle kanitlanmadi
- `8.8-10.6s` payoff penceresi ile ilk `10-18s` breakthrough cue'lari arasindaki gecis desktop/mobil tarafta fazla yogun okunabilir
- signature family hala session-level retry desire'i gercekten artiriyor mu, yoksa yalniz ilk 10 saniyeyi daha karakterli mi yapiyor, net degil

---

# Active Product Fronts

1. Yeni `lock payoff` penceresinin browser veya net manuel gozlemde target/speed + cadence birlikteyken gercekten hissedildigini kanitlamak
2. Intro -> opening cue -> rota projeksiyonu -> `RUN FEEL` paneli -> `lock payoff` -> breakthrough gecisinin nerede guclu, nerede gurultulu oldugunu ayirmak
3. Signature family'yi retry desire tarafinda yalniz tek bir sonraki hamleyle buyutmek; ayni ladder'a yeni halka eklememek
4. Validation ve core-doc closure'u hafif tutmak

---

# Active Risks

1. `lock payoff` hala fazla yumusak kalirsa yeni slice target/speed/cadence beraber gelmesine ragmen gercek gameplay sonucu yerine sadece extra hint/copy gibi okunabilir.
2. Payoff penceresi fazla yogun okunursa `10s` breakthrough onset'i ile cakisip erken run clarity'sini bozabilir.
3. Signature tuning bahanesiyle tekrar ayni ladder beat'lerine donme riski var.
4. Validation ve core-doc closure tekrar varsayilan teslimat paketi haline gelebilir.

---

# What The Next Runs Must Do

- arka arkaya birkac run'da intro, opening cue, rota projeksiyonu, `RUN FEEL` paneli ve yeni `8.8-10.6s lock payoff` penceresini gozlemle; ozellikle cadence farki hissediliyor mu bak
- `PINPOINT / WEAVE / RUSH` payoff'larindan hangisinin gercekten hissedildigini, hangisinin fazla yumusak veya gurultulu kaldigini net not et
- fark hala yumusaksa yeni beat acmadan yalniz tek bir signature payoff surface'ini derinlestir; ornegin hedef siddeti, sure veya HUD yogunlugu
- telemetry ve docs'u yalniz degisen kontrat kadar guncelle
- mevcut `10-72s` cue zincirine yeni named beat ekleme
