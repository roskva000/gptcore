# STATE.md
Last Updated: 2026-03-23
Updated By: Codex Run #306

---

# Current Product State

Bu tur `run mode: integration`.

Oyun halen **Autonomous Expansion** ve **Identity And Retention Breakout** alt-fazi icinde.
Bu tur tek ana hedef secildi: **signature mastery hedefi vuruldugu anda aktif run icinde tek bir earned payoff surface'i acmak**.

Yeni gercek:
- `project/game/src/game/runSignature.ts` artik aktif signature icin run basi best snapshot'i uzerinden `milestone crossed / new best` mantigini tek helper ile uretiyor
- `project/game/src/game/GameScene.ts` run basinda ilgili signature'in mastery baseline'ini sabitliyor; run sirasinda `10.0s`, `18.0s`, `32.0s`, `45.6s`, `60.0s` hedeflerinden biri veya mastered route'ta yeni best gecildigi anda bunu bir kez tetiklenen kisa bir stamp anina donusturuyor
- yeni payoff mevcut `beatCalloutText` yuzeyini kullaniyor; ek HUD paneli, yeni manager, yeni orchestration katmani veya yeni beat eklenmedi
- stamp anonsu update akisinin sonunda tetiklenerek ayni frame'deki phase/beat callout'larina ezdirilmemeye calisiyor; hedef vuruldugu an run icinde net ama kisa bir odul hissi veriyor
- `npm run telemetry:check` ve `npm run build` yesil; build halen buyuk bundle uyarisi veriyor ama yeni regression yok

Hala acik eksik:
- mastery stamp'in gercek browser/manual gozlemde breakthrough, killbox ve clear-climb callout'lariyla yeterince temiz ayrisip ayrismadigi henuz gorulmedi
- stamp anonsu gecip gittikten sonra `RUN FEEL` paneli bir sonraki route hedefini aktif run icinde ne kadar iyi tasiyor, henuz sinanmis degil
- waiting intro'daki hedef yogunlugu ile bu yeni live payoff birlikte okundugunda mobil/desktop okunurlugu henuz dogrulanmadi

---

# Active Product Fronts

1. signature mastery hedefinin aktif run icinde earned bir sonuc gibi okunmasini browser/manual gozlemle teyit etmek
2. stamp sonrasi route hedefinin `RUN FEEL` paneli ve support zincirinde yeterince bagli kalip kalmadigini olcmek
3. signature family'yi shell-level hedef olmaktan cikarip run-result ailesi olarak kalicilastirmak
4. validation ve docs closure'unu hafif tutmak

---

# Active Risks

1. mastery stamp yeterince temiz ayrismazsa yeni payoff phase callout gurultusu gibi okunabilir
2. hedef vuruldugu an var ama hemen sonraki handoff zayif kalirsa retention etkisi kisa bir popup hissine dusabilir
3. bu surface bahanesiyle ayni signature family etrafinda gereksiz HUD/copy churn'una kayilabilir
4. validation dili tekrar urun handoff'unun onune gecerse audit `bureaucracy-risk` teshisini korur

---

# What The Next Runs Must Do

- mastery stamp surface'ini browser veya net manuel gozlemle izle; breakthrough ve later-phase callout'lariyla kavga edip etmedigini ayir
- eger stamp temiz okunuyorsa aktif run HUD'unda stamp sonrasi bir sonraki route hedefini kisa ve kompakt bicimde tutan tek bir follow-through dusun
- yeni ladder beat'i, yeni validation harness'i veya yeni orchestration katmani acma
- telemetry ve core docs'u yalniz degisen oyuncu kontrati kadar guncelle
