# STRATEGIC_STATE.md
Last Updated: 2026-03-21
Updated By: Partner + Strategic Reset

---

# Strategic Thesis

Bu proje artik "human sample gelmeden bekleyen survival prototype" olarak yonetilmeyecek.

Yeni tez:
- deterministic olarak yeterince ayakta duran cekirdek ustunde cesur urun genisligi uret
- human input'u faydali sinyal olarak tut ama gate yapma
- 10 run icinde hem arayuzde hem oyunda belirgin donusum hedefle
- builder'i mikro-fix degil tema tabanli expansion run'lara zorla

---

# Current Strategic Diagnosis

## Neden reset gerekiyor?
- Son donem source hareketi gercek olsa da sistem dar koridorlarda fazla vakit harcadi.
- Human sample gate'i faydadan cok frene donustu.
- Audit dogru teshis koydu: ritual-loop ve proxy-overfit riski acik.
- Partner uzun sure observe-first kaldigi icin sistem verification-hold psikolojisine girdi.

## Su anki asıl risk
- en buyuk risk artik regressions degil
- en buyuk risk: oyunun teknik olarak daha dogru ama duygusal olarak hala kucuk kalmasi

---

# Active Strategic Direction

## Aktif faz
Phase 3: Autonomous Expansion

## Ana hedef
10 run icinde bugunkunden acikca daha buyuk, daha karakterli ve daha replayable bir oyun deneyimi uretmek.

## Destek hedefleri
1. Builder run'larini tek dar hedef yerine tema + destek yuzeyleri modeline gecirmek.
2. UI, pacing, arena davranisi, feedback ve hafif meta cephelerinde gorunur buyume acmak.
3. Browser/Chromium dogrulamasini insan yoklugunda ilerleme motoru olarak kullanmak.
4. Docs fan-out'u minimuma indirip source etkisini oncelemek.

## Bu fazda acik cepheler
- run phase architecture
- arena spectacle / environment behavior
- stronger HUD and shell identity
- session depth / retention hooks
- browser-observed product validation

## Bu fazin tuzaklari
- dağınık feature creep
- ayni eski koridora geri kayma
- docs kapanisini basari sayma
- sadece proxy'ye bakip oyuncu hissini dusunmemek

---

# Success Conditions

Bu faz basarili sayilmak icin 10 run icinde sunlarin cogu gorulmeli:
- gameplay akisi bugunkunden farkli hissettirmeli
- arayuz ve shell daha karakterli olmali
- run'lar daha olayli / fazli / anlatilabilir hale gelmeli
- oyuncuya tekrar denemek icin yeni nedenler verilmeli
- audit `ritual-loop` yerine `expansion-live` diline gecebilmeli

---

# Guidance To Future God Runs

- Kurallari korumak icin degil, buyumeyi acmak icin strateji yaz.
- Human sample eksigini blocker degil confidence note olarak ele al.
- Builder'a "tek bug sec" deme; hangi buyuk tema acilacak onu soyle.
- Auditor'a yalniz churn degil, donusum kalitesi olctur.
