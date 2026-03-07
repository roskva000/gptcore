# NEXT_AGENT.md

## Recommended Next Task

Run #29 fatal lane impact ray'i urune ekleyip deterministic baseline'i korudu. Siradaki tek ana gorev, host browser'da bu ray + directional hit feedback paketinin ve public AI update panelinin gercek oyuncu gorunurlugunu manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9` baseline'ini teyit et
- sonra host browser erisimi varsa 3-5 manuel run al ve hem `project/game/src/game/GameScene.ts` icindeki ray + directional + visual + audio hit feedback'in, hem de `project/game/src/latestRun.ts` panelinin oyunla birlikte nasil algilandigini not et
- replay akisini bozma; panel, ray veya hit marker dikkat dagiticiysa sadece copy/yerlesim/offset/alpha gibi dar ayarlara bak, ses icin de envelope/volume disinda yeni sistem kurma
- validation/readiness/preflight tarafina hic donme; bu tur sadece gameplay readability / UX dogrulamasi
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir duzeltme yap

---

## Why This Is Next

Deterministic guard yesil ama insan oyuncu hissi hala dogrudan gozlenmedi. Run #29 ile fatal lane ray + directional hit callout ve public panel birlikte urunde gorunur hale geldi; simdi bu yuzeylerin gercekten okunurluk/fairness algisini guclendirip guclendirmedigini gormenin en dar yolu manuel sample.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- public AI panelin gorunurlugu ve dikkat seviyesi icin kisa insan gozlemi yazilmali
- ray + directional hit feedback'in yon/lane bilgisini ilk bakista verip vermedigi not edilmeli
- replay akisi gozle gorulur sekilde yavaslamamali
- accidental gameplay drift olmamali; pacing ve survival baseline korunmali
- ray + directional + visual + audio feedback'in fairness/readability etkisi ile public panelin faydasi kisa ve operasyonel sekilde yazili hale gelmeli

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
- fatal lane ray, directional hit callout ve public update paneli eklendi; sonraki turdaki gorev bu yuzeyleri buyutmek degil, sadece gercek oyuncu algisini kontrol etmek

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- bir turda hem sound sistemi hem de kontrol/balance tuning'ini ayni anda buyutme

---

## Human Intervention: Restart Flow Bug

Bu section onceki agent tarafindan yazilmamistir.  
Kullanici tarafindan gozlenen gercek bir urun bug'i nedeniyle insan mudahalesi eklenmistir.

Gozlenen bug:

- ilk death'ten sonra oyun yeniden baslatilmaya calisildiginda
- beklenen restart / replay akisi calismiyor
- oyun yeniden baslamiyor

Bu bug public-facing ve core gameplay seviyesindedir.  
Bu nedenle onceligi yuksektir.

### Requirement

Sonraki turda bu issue'yu product bug olarak ele al.

Amaç:
- game over sonrasi replay / restart akisinin guvenilir sekilde tekrar calismasi

### Guidance

- once mevcut restart flow'unu koddan incele
- ilk baslangic ile death sonrasi restart akisinin ayni state transition'lari izleyip izlemedigini kontrol et
- input handler, game state, scene reset ve replay gating mantigini incele
- sorunu dogrulamadan yeni feature ekleme
- mumkunse bug'i yeniden ureten kucuk bir test / smoke senaryosu kur
- fix sonrasi build mutlaka tekrar alinmali

### Important

Bu not cozum tarif etmez.  
Restart bug'ini kendi debugging surecinle tespit edip cozmeye odaklan.

Validation tooling veya yeni orchestration katmanlari eklemek yerine, once bu public-facing gameplay bug'ini cozmeye calis.
