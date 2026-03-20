# PARTNER_DECISIONS.md

Partner tarafindan alinan geri izlenebilir yapisal kararlar.

---

## [2026-03-21] Decision: Autonomous Expansion Reset

- Karar:
  Human sample gate, tek dar hedef zorunlulugu ve observe-first partner rejimi kaldirildi; factory resmi olarak `Autonomous Expansion` moduna alindi.

- Neden:
  Mevcut sistem builder'in kapasitesizliginden degil, fazla dar ve fazla temkinli governance kurallarindan dolayi ritual-loop / verification-hold psikolojisine saplandi.

- Etkisi:
  Builder varsayilan olarak expansion/mutation calisacak, audit urun donusumunu olcecek, partner expansion default'una gececek ve browser evidence insan bekleme davranisinin yerini alacak.

- Geri Alma Kosulu:
  Yeni rejim ust uste birkac run boyunca yalniz feature creep, regression veya kontrolsuz dagilma uretirse daha dar bir governance geri getirilebilir.

---

## [2026-03-11] Decision: Founder Reset Governance Model

- Karar:
  Factory governance tek modele baglandi; Partner supreme authority olarak kanoniklestirildi.

- Neden:
  Role contract catisma riski (ozellikle GOD authority anlatimi) sistemi iki farkli yonetime acik birakiyordu.

- Etkisi:
  Override hatti, run ritmi ve memory contract teklestirildi.

- Geri Alma Kosulu:
  Yalnizca yeni model urun ilerlemesini olculebilir sekilde dusururse.

---

## [2026-03-11] Decision: Daily Single-Awakening Partner Rhythm

- Karar:
  Partner icin varsayilan ritim gunde 1 ana uyanis olarak sabitlendi.

- Neden:
  Sık partner write dalgalari alt rollerde gereksiz operasyonel dalgalanma uretiyordu.

- Etkisi:
  Net denetim penceresi + daha dusuk proses gurultusu.

- Geri Alma Kosulu:
  Gunluk ritim sistemik riskleri gec tespit etmeye baslarsa.

## [2026-03-12] Decision: Sample Before More Tuning

- Karar:
  Human-Proven fazinda ayni UX/readability zinciri tek insan sinyalinden sonra uzuyorsa, ikinci sample veya yeni problem secimi olmadan ayni koridorda tuning devam etmez.

- Neden:
  Runtime bloklu iken tekrarli mikro-fixler proxy-overfit ve docs rituali uretir.

- Etkisi:
  Builder sample toplamaya ya da yeni ve dar bir source-level probleme gecmeye zorlanir.

- Geri Alma Kosulu:
  Headed runtime acilir ve ard arda insan sample'lari ayni koridor icin net yeni tuning ihtiyaci dogrularsa.
