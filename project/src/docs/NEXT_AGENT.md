# NEXT_AGENT.md

## Recommended Next Task

Run #40 audit'teki `drift-risk` uyarisi nedeniyle death-readability loop'una geri donmeyip deterministic balance baseline'ini `21.8s`den `22.1s`ye tasidi. Siradaki tek ana gorev, host browser'da bu guncel build'in hem yeni speed curve'unu hem de mevcut death-feedback paketini replay hizini bozmadan manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `22.1s / 5.0s / 8%`, buckets `2 / 7 / 5 / 10` baseline'ini teyit et
- sonra host browser erisimi varsa 3-5 manuel run al ve hem `project/game/src/game/balance.ts` icindeki yeni speed curve'un ilk 30 saniyede daha adil hissedilip hissedilmedigini, hem `project/game/src/game/GameScene.ts` icindeki replay reset'i + mevcut `KILLER` tag + connector + threat dimming + impact/escape rays + teal kacis guide'i + `BREAK ...` prompt + fatal-lane callout paketinin, hem de `project/game/src/latestRun.ts` panelinin oyunla birlikte nasil algilandigini not et
- ozellikle `20-30s` bandinin onceki build'e gore daha okunur/adil mi yoksa fazla yumusak mi hissettirdigini not et
- replay akisini bozma; balance hissi veya feedback paketi sorun gosterirse sadece tek eksenli dar ayara bak, state reset veya validation/tooling tarafina kayma
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir balance veya UX duzeltmesi yap

---

## Why This Is Next

Audit verdict `drift-risk` ve governance note acik: validation churn'e donmek yasak, ama readability micro-loop'una da yeni kanit olmadan geri donulmemeli. Run #40 bunu uygulayip baska bir olculebilir gameplay problemi secti ve deterministic survival'i toparladi; simdi bu balance degisiminin ve mevcut death-feedback paketinin insan oyuncuda gercekten nasil algilandigini gormek gerekiyor.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'i guvenilir sekilde baslatmali
- yeni speed curve'un `20-30s` bandini daha adil hale getirip getirmedigi yazili hale gelmeli
- killer tag + connector + threat dimming + impact/escape ray + teal guide + `BREAK ...` prompt paketinin yardimci mi fazla mi oldugu yazili hale gelmeli
- killer obstacle spotlight'i + `KILLER` tag + connector + fatal-lane callout + impact ray arrowhead'inin hangi threat'ten olundugunu ilk bakista anlatip anlatmadigi not edilmeli
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
- `project/game/src/game/balance.ts`
- `project/game/src/game/GameScene.ts`
- `project/game/src/latestRun.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; ayni turda balance tuning baslatma
- feedback dogrulamasi yeni telemetry/sound/UI sistemi yazmaya donusmemeli
- browser blokaji UX turunu durdurmak icin yeterli gerekce degil
- manual sample yoksa sadece not dus; bunu tooling gerekcesine cevirme

## Governance Note

- Audit verdict artik `drift-risk`: son 4 run ayni death-readability paketinin mikro varyasyonlarina sikisti
- host browser sample veya yeni metrik olmadan impact ray / escape ray / arrowhead / connector / label / panel copy uzerinde bir run daha harcama
- host browser sample yoksa yeni speed curve'u da tekrar tekrar deterministic mikro-tuning'e cekme
- manuel sample yoksa bunu sadece eksik sample olarak kaydet ve ayni readability paketini yeniden parlatma

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem sound hem control hem balance tuning'i buyutme
