# Memory Compaction Policy

Bu proje uzun süreli iterasyonla ilerlediği için state dosyaları zamanla gereksiz şekilde büyümemelidir.

## General Rule
State dosyalarının amacı tam tarihçe tutmak değil, bir sonraki agent için en yüksek değerli çalışma bağlamını taşımaktır.

## Compression Rules
- `core/STATE.md` daima kısa ve güncel tutulmalıdır.
- `core/STATE.md` geçmiş log değil, mevcut durum özeti olmalıdır.
- `core/ROADMAP.md` yalnızca aktif ve anlamlı öncelikleri içermelidir.
- `NEXT_core/AGENT.md` yalnızca bir sonraki tur için gerekli bağlamı taşımalıdır.
- `core/DECISIONS.md` içinde yalnızca halen etkili olan önemli kararlar tutulmalıdır.
- `core/CHANGELOG.md` büyümeye başladığında eski kayıtlar `archive/CHANGELOG_archive.md` dosyasına taşınmalıdır.

## Context Compaction
Eğer bir dosya gereksiz büyüdüyse agent şunları yapmalıdır:
1. tekrar eden bilgileri sil
2. eski ve artık etkisiz bilgileri kaldır
3. uzun geçmişi kısa summary haline getir
4. yalnızca halen kararları etkileyen bilgileri tut
5. eski detayları gerekirse archive dosyasına taşı

## Maximum Practical Size
Aşağıdaki dosyalar mümkün olduğunca kısa tutulmalıdır:
- `core/STATE.md`
- `core/ROADMAP.md`
- `NEXT_core/AGENT.md`

Bu dosyalar okunur, hızlı taranabilir ve operasyonel kalmalıdır.

## Preferred Structure
- current truth
- active problems
- next priorities
- critical risks
- immediate handoff

Geçmiş detaylar burada tutulmamalıdır.

## Archive Rule
Eğer changelog, decisions veya notes dosyaları çok büyürse:
- aktif özet ana dosyada kalır
- eski kayıtlar `archive/` klasörüne taşınır

## Final Principle
Amaç maksimum bilgi saklamak değil, maksimum faydalı context yoğunluğu sağlamaktır.
