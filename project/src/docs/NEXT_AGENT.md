# NEXT_AGENT.md

## Recommended Next Task

Run #33 olum ekranina `BREAK ...` escape prompt'u ekledi ve killer obstacle'i kisa sureligine vurgulayarak olum anini daha aksiyon odakli hale getirdi; deterministic baseline korundu. Siradaki tek ana gorev, host browser'da bu yeni prompt'un gercekten yardimci mi yoksa fazla mi oldugunu replay hizini bozmadan manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `21.8s / 5.0s / 8%`, buckets `2 / 7 / 6 / 9` baseline'ini teyit et
- sonra host browser erisimi varsa 3-5 manuel run al ve hem `project/game/src/game/GameScene.ts` icindeki replay reset'i + `BREAK ...` prompt + fatal-lane callout + ray + directional hit feedback + killer obstacle vurgusunun, hem de `project/game/src/latestRun.ts` panelinin oyunla birlikte nasil algilandigini not et
- replay akisini bozma; prompt, panel veya callout dikkat dagiticiysa sadece copy/yerlesim/offset/alpha/font-size gibi dar ayarlara bak, state reset veya validation/tooling tarafina kayma
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir UX duzeltmesi yap

---

## Why This Is Next

Audit verdict `warning` ve governance note acik: validation churn'e donmek yasak, sonraki anlamli adim sadece gameplay readability / player feedback alaninda kalmali. Run #33 neden oldugunu gosterme isini bir adim daha ileri tasiyip sonraki hamleyi de soyluyor; simdi bunun insan oyuncuda gercekten fayda uretip uretmedigini gormek gerekiyor.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'i guvenilir sekilde baslatmali
- `BREAK ...` prompt'unun yardimci mi fazla mi oldugu yazili hale gelmeli
- killer obstacle vurgusu + fatal-lane callout + ray'in hangi threat'ten olundugunu ilk bakista anlatip anlatmadigi not edilmeli
- public AI panelin gorunurlugu ve dikkat seviyesi icin kisa insan gozlemi yazilmali
- accidental gameplay drift olmamali; pacing ve survival baseline korunmali

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/GameScene.ts`
- `project/game/src/latestRun.ts`
- `project/game/src/style.css`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; ayni turda balance tuning baslatma
- feedback dogrulamasi yeni telemetry/sound/UI sistemi yazmaya donusmemeli
- browser blokaji UX turunu durdurmak icin yeterli gerekce degil
- manual sample yoksa sadece not dus; bunu tooling gerekcesine cevirme

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem sound hem control hem balance tuning'i buyutme
