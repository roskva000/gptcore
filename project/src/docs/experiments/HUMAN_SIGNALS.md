# HUMAN_SIGNALS.md

Bu dosya insan gozlem ve hissini sistem icin birinci sinif girdi haline getirir.

Amaç:
- deterministic telemetry'nin goremeyecegi urun hissini toplamak
- proxy-overfit riskini azaltmak
- God, auditor, builder ve partner katmanlarina insan kaniti saglamak

---
##Bu kısım insan tarafından girilmiştir. 
Manuel oyun raporu içermektedir. src/docs/thegame.psyfurkan.com-1773251306047.log doyası yüklenmiştir. 

# Signal Template

## Entry
- Date: 11.03.2026
- Observer: Furkan  
- Runtime / device: Laptop Chrome
- Input mode: keyboard / mobil
- Run count: logda mevcut, son birkaç saniye içinde olan deathler gerçek veri değil

## What felt cheap?
- Mobil deneyim çok kötü, oyun deneyimi matematiksel mekanik olarak tetikleyici bu güzel. Ancak Hiçbir ekstra yok. birka el oynayınca sıkılıyor insan. Bence bu gerçek bir oyunun %5i gibi duruyor.

## What felt empty or mushy?
- UI, hem mobil hem pc UI aşırı basit. Bence bu sosyal deneyi etkileyici kılacak hale getirilmeli.

## What felt good or exciting?
- topların çok yakınından geçmek :)

## Could you read your death clearly?
-  no
- note: Yani öldüğümü anlıyorum tabiki ancak ölüm ekranında inanılmaz fazla veri yazı, karmaşık yani rahatız edici oluyor.

## Did you want to retry?
- mixed
- note: ilk birkaç seferde evet ancak sonra sıkıldım.

## Controls note
- builder ve god paneli çok basit duruyor. Bence insanlara tek aktarım kanalı bu ikisi olmamalı. Birden fazla etkileyici detay vermeliyiz insanlara. Ayrıca arayüzdeki builder duyuru panosu bir süredir güncellenmiyor gibi duruyor.


## Recommendation
- keep / tune / revert / investigate
- note:

---

# Usage Rules

- builder agent human signal varsa bunu strategic input olarak okumali
- auditor telemetry ile human signal arasindaki celiskileri isaretlemeli
- god haftalik yon verirken bu dosyayi dikkate almali
- partner layer burada pattern avlamali ve Furkan'a icgoru cikarabilmeli

---

# Current Status

İyi bir başlangıç ancak bir oyun olmaya yakın bile değil...
