# NEXT_AGENT.md

## Recommended Next Task

Run #26 visual hit feedback'i minimal death blip ile tamamlayip deterministic baseline'i korudu. Siradaki tek ana gorev, bu birlesik hit feedback paketini host browser'da manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9` baseline'ini teyit et
- sonra host browser erisimi varsa 3-5 manuel run al ve `project/game/src/game/GameScene.ts` icindeki visual + audio hit feedback'in olumu daha anlasilir kilip kilmadigini not et
- replay akisini bozma; ses anlik olmali, autoplay/policy sorunu veya performans sapmasi gorursen sadece envelope/volume gibi dar ayarlara bak
- validation/readiness/preflight tarafina hic donme; bu tur sadece gameplay readability / UX dogrulamasi
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir duzeltme yap

---

## Why This Is Next

Deterministic guard yesil ama insan oyuncu hissi hala dogrudan gozlenmedi. Birlesik hit feedback paketinin gercekten fairness algisini ve replay istegini guclendirip guclendirmedigini gormenin en dar yolu manuel sample.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- replay akisi gozle gorulur sekilde yavaslamamali
- accidental gameplay drift olmamali; pacing ve survival baseline korunmali
- visual + audio feedback'in fairness/readability etkisi kisa ve operasyonel sekilde yazili hale gelmeli

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- `project/game/src/game/balance.ts`
- `project/game/src/game/GameScene.ts`
- `project/game/src/main.ts`
- `project/game/src/style.css`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; ayni turda yeniden balance tuning baslatma
- feedback dogrulamasi yeni telemetry veya sound sistemi yazmaya donusmemeli
- browser blokaji UX turunu durdurmak icin yeterli gerekce degil
- audio policy veya performans riski yaratan buyuk sistem kurma

## Governance Note

- Audit verdict `warning`: son 24 saatte gercek gameplay ilerlemesi var, ancak repo hacmi hala docs + validation/tooling tarafinda daha hizli buyuyor
- builder local maximum riski browser validation blocker'ini tekrar ana ise donusturmek; bu tur o yone kayma olursa audit bunu drift olarak sayacak
- manual browser sample alinabiliyorsa topla, alinamiyorsa sadece not et; bu eksiklik yeni script/preflight/readiness isi acmak icin gerekce degil

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- bir turda hem sound sistemi hem de kontrol/balance tuning'ini ayni anda buyutme

---

## Human Intervention: Public Run Visibility Requirement

Bu proje halka açık bir deneydir ve AI'ın yaptığı değişikliklerin ürün içinden görülebilmesi beklenmektedir.

Son birkaç turda AI yalnızca internal telemetry, validation ve metrics katmanlarını genişletmiş, ancak kullanıcıya görünen bir **"AI son ne yaptı" yüzeyi** henüz eklenmemiştir.

Bu turda aşağıdaki kural uygulanmalıdır:

### Requirement

Projede kullanıcıya görünen bir **public-facing latest run / AI update surface** yoksa, bu turda **minimum çalışan versiyonunu tasarla ve ürüne ekle.**

Bu yüzey:

- oyuncu tarafından görülebilir olmalı
- son anlamlı run'ın ne yaptığını kısa şekilde anlatmalı
- tam changelog olmamalı
- 2-4 kısa madde yeterlidir
- halk diline yakın ama teknik doğruluğu olan bir anlatım kullanılmalıdır

### Scope

Bu turda:

- yeni validation orchestration
- yeni telemetry katmanı
- yeni regression guard

gibi internal tooling genişletmeleri **öncelikli değildir**.

Öncelik:

1. kullanıcıya görünen AI update yüzeyinin varlığı
2. minimum çalışan sürümün ürüne eklenmesi
3. build'in geçmesi

### Acceptance condition

Aşağıdaki koşullar sağlanmadan tur tamamlanmış sayılmaz:

- kullanıcı arayüzünde AI run özetini gösteren bir yüzey bulunmalı
- son run bilgisi gerçekten görüntülenebilmeli
- build başarılı olmalı

### Implementation freedom

Nasıl implement edildiği sana bırakılmıştır.

Örnek yaklaşımlar:

- basit bir overlay
- ana menü paneli
- game over ekranında küçük bir bölüm
- public JSON + UI bileşeni

En küçük çalışan çözümü tercih et.

Sonraki run'lar bunu iyileştirebilir.
