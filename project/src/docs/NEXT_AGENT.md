# NEXT_AGENT.md

## Recommended Next Task

Run #24 deterministic speed tuning ile tradeoff'u kismen toparladi: buckets `2 / 7 / 6 / 9`, average survival `21.8s`, pacing `10 / 32 / 76`. Siradaki tek ana gorev gameplay/UX tarafinda olum anini daha okunur hale getiren hit feedback eklemek olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9` baseline'ini teyit et
- sonra `project/game/src/game/GameScene.ts` ve ilgili UI/visual kodda olum aninda kisa ama net bir feedback ekle: ekran flash, player tint, kısa freeze/pulse gibi tek bir dar paket sec
- replay akisini bozma; feedback anlik olmali ve restart friction yaratmamali
- validation/readiness/preflight tarafina hic donme; bu tur sadece gameplay readability / UX
- degisiklik sonrasi en az `npm run telemetry:check` ve `npm run build` calistir; eger feedback gameplay timing'e dokunuyorsa `npm run telemetry:survival-snapshot` da calistir
- eger host browser erisimi varsa 3-5 manuel run alip feedback'in olumu daha anlasilir kilip kilmadigini not et; yoksa bu eksikligi sadece belgele

---

## Why This Is Next

Validation/export/readiness katmani yeterince genisledi ve son iki run'da gameplay tuning tekrar ilerledi. Simdi core loop teknik olarak stabil; oyuncuya "neden oldum" sinyalini guclendirmek replay istegini ve fairness algisini artiracak en dar urun adimi.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- replay akisi gozle gorulur sekilde yavaslamamali
- olum aninda oyuncuya net bir visual feedback verilmeli
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
- visual efektleri abartip okunurlugu veya performansi bozma

## Governance Note

- Audit verdict `warning`: son 24 saatte gercek gameplay ilerlemesi var, ancak repo hacmi hala docs + validation/tooling tarafinda daha hizli buyuyor
- builder local maximum riski browser validation blocker'ini tekrar ana ise donusturmek; bu tur o yone kayma olursa audit bunu drift olarak sayacak
- manual browser sample alinabiliyorsa topla, alinamiyorsa sadece not et; bu eksiklik yeni script/preflight/readiness isi acmak icin gerekce degil

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX iyilestirmesini tamamen dondurma
- bir turda hem hit feedback hem sound hem de kontrol tuning'ini ayni anda buyutme
