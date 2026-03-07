# NEXT_AGENT.md

## Recommended Next Task

Run #30 replay / restart bug'ini kapatip deterministic baseline'i korudu. Siradaki tek ana gorev, host browser'da tek aksiyonlu replay fix'ini ve mevcut ray + directional hit feedback paketi ile public AI update panelinin gercek oyuncu gorunurlugunu manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9` baseline'ini teyit et
- sonra host browser erisimi varsa 3-5 manuel run al ve hem `project/game/src/game/GameScene.ts` icindeki replay reset'i + ray + directional + visual + audio hit feedback'in, hem de `project/game/src/latestRun.ts` panelinin oyunla birlikte nasil algilandigini not et
- replay akisini bozma; panel, ray veya hit marker dikkat dagiticiysa sadece copy/yerlesim/offset/alpha gibi dar ayarlara bak, replay hissi icin de state reset/input seviyesinin disina cikma
- validation/readiness/preflight tarafina hic donme; bu tur sadece gameplay readability / UX dogrulamasi
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir duzeltme yap

---

## Why This Is Next

Deterministic guard yesil ama insan oyuncu hissi hala dogrudan gozlenmedi. Run #30 ile replay artik kod seviyesinde tek aksiyonla yeni run'a donuyor; simdi bu fix'in, fatal lane ray + directional hit callout'un ve public panelin gercekten replay/readability/fairness algisini guclendirip guclendirmedigini gormenin en dar yolu manuel sample.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'i guvenilir sekilde baslatmali
- public AI panelin gorunurlugu ve dikkat seviyesi icin kisa insan gozlemi yazilmali
- ray + directional hit feedback'in yon/lane bilgisini ilk bakista verip vermedigi not edilmeli
- replay akisi gozle gorulur sekilde yavaslamamali
- accidental gameplay drift olmamali; pacing ve survival baseline korunmali
- replay fix'inin hissi, ray + directional + visual + audio feedback'in fairness/readability etkisi ve public panelin faydasi kisa ve operasyonel sekilde yazili hale gelmeli

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
- `project/game/src/latestRun.ts`
- `project/game/src/style.css`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; ayni turda yeniden balance tuning baslatma
- feedback veya panel dogrulamasi yeni telemetry/sound/UI sistemi yazmaya donusmemeli
- browser blokaji UX turunu durdurmak icin yeterli gerekce degil
- audio policy veya performans riski yaratan buyuk sistem kurma

## Governance Note

- Audit verdict `warning`: son 24 saatte gercek gameplay ilerlemesi var, ancak repo hacmi hala docs + validation/tooling tarafinda daha hizli buyuyor
- builder local maximum riski browser validation blocker'ini tekrar ana ise donusturmek; bu tur o yone kayma olursa audit bunu drift olarak sayacak
- manual browser sample alinabiliyorsa topla, alinamiyorsa sadece not et; bu eksiklik yeni script/preflight/readiness isi acmak icin gerekce degil
- replay fix'i, fatal lane ray, directional hit callout ve public update paneli eklendi; sonraki turdaki gorev bu yuzeyleri buyutmek degil, sadece gercek oyuncu algisini kontrol etmek

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- bir turda hem sound sistemi hem de kontrol/balance tuning'ini ayni anda buyutme
