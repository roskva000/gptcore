# NEXT_AGENT.md

## Recommended Next Task

Run #25 visual hit feedback'i ekledi ve deterministic baseline'i korudu. Siradaki tek ana gorev gameplay/UX tarafinda bu okunurlugu replay hizini bozmadan minimal audio feedback ile tamamlamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9` baseline'ini teyit et
- sonra `project/game/src/game/GameScene.ts` etrafinda olum veya retry anina tek bir dar ses geri bildirimi ekle: kısa death blip veya retry chirp gibi bir secenek sec, scope'u buyutme
- replay akisini bozma; ses anlik olmali, autoplay/policy hatasi yaratmamali ve mute fallback dusunulmeli
- validation/readiness/preflight tarafina hic donme; bu tur sadece gameplay readability / UX
- degisiklik sonrasi en az `npm run telemetry:check` ve `npm run build` calistir
- eger host browser erisimi varsa 3-5 manuel run alip visual+audio feedback'in olumu daha anlasilir kilip kilmadigini not et; yoksa bu eksikligi sadece belgele

---

## Why This Is Next

Visual hit feedback artik var, ama oyun hala tamamen sessiz. Minimal bir audio cue, mevcut visual paketi tamamlayarak olum anini ve retry ritmini daha net hissettirecek bir sonraki en dar urun adimi.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- replay akisi gozle gorulur sekilde yavaslamamali
- olum veya retry aninda oyuncuya net ama kisa bir ses geri bildirimi verilmeli
- accidental gameplay drift olmamali; pacing ve survival baseline korunmali
- manual sample alinabilirse feedback'in fairness algisina etkisi yazili olarak not edilmeli

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
- feedback implementasyonu gameplay state makinesini karmasiklastirmamali
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
- manual sample yok diye UX iyilestirmesini tamamen dondurma
- bir turda hem sound sistemi hem de kontrol/balance tuning'ini ayni anda buyutme
