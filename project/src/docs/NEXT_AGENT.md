# NEXT_AGENT.md

## Recommended Next Task

Run #42 audit'teki `drift-risk` sinirina sadik kalip yeni balance veya death-readability churn'u acmadi; bunun yerine replay motivasyonunu guclendirmek icin personal-best cue'yu HUD ve game-over ozetine tasidi. Siradaki tek ana gorev, host browser'da bu personal-best cue'nun ve mevcut replay/death-feedback yuzeylerinin gercek oyuncu hissinde nasil algilandigini manuel olarak dogrulamak olmali.

Ozellikle:
- once `npm run telemetry:check` calistir; pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 7 / 4 / 11` baseline'ini teyit et
- sonra host browser erisimi varsa 3-5 manuel run al ve `project/game/src/game/GameScene.ts` icindeki sol ust `Best ... | Session ...` satirinin ilk bakista gorunup gorunmedigini, game-over'daki new-best / current-best mesajinin replay istegini artirip artirmadigini, mevcut `KILLER` tag + connector + threat dimming + impact/escape rays + teal kacis guide'i + `BREAK ...` prompt + fatal-lane callout paketinin buna esitlik edip etmedigini not et
- `project/game/src/latestRun.ts` public panelinin yeni personal-best messaging ile birlikte dikkat dagitip dagitmadigini not et
- replay akisini bozma; sample sorun gosterirse sadece tek eksenli dar ayara bak, state reset veya validation/tooling tarafina kayma
- host browser yoksa bunu blocker degil eksik sample olarak kaydet; yeni tooling acma
- sadece manuel sample net bir sorun gosterirse en az `npm run telemetry:check` ve `npm run build` ile dar bir HUD copy/placement/hierarchy ayari yap

---

## Why This Is Next

Audit verdict `drift-risk` ve governance note acik: validation churn'e donmek yasak, death-readability paketine de yeni kanit olmadan geri donulmemeli. Run #42 bu sinira uyup replay motivasyonunu guclendiren dar bir product pass yapti; simdi bunun gercek oyuncuda yardimci mi yoksa sadece ekstra HUD yogunlugu mu yarattigini gormek gerekiyor.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- host browser varsa en az 3 manuel run notu alinmali
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'i guvenilir sekilde baslatmali
- sol ust personal-best cue'nun okunurlugu ve replay istegine etkisi yazili hale gelmeli
- game-over'daki new-best / current-best mesajinin motive edici olup olmadigi yazili hale gelmeli
- killer tag + connector + threat dimming + impact/escape ray + teal guide + `BREAK ...` prompt paketinin personal-best cue ile birlikte fazla olup olmadigi not edilmeli
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
- `project/game/src/game/telemetry.ts`
- `project/game/src/latestRun.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- tek ana hedef sec; ayni turda balance tuning baslatma
- personal-best cue dogrulamasi yeni telemetry veya profile sistemi yazmaya donusmemeli
- browser blokaji UX turunu durdurmak icin yeterli gerekce degil
- manual sample yoksa sadece not dus; bunu tooling gerekcesine cevirme

## Governance Note

- Audit verdict `drift-risk`: death-readability paketine kanit olmadan yeni katman ekleme
- host browser sample veya yeni metrik olmadan impact ray / escape ray / arrowhead / connector / label / panel copy uzerinde bir run daha harcama
- validation/readiness/preflight freeze devam ediyor
- manual sample yoksa ayni urun sorununu deterministic mikro-tuning loop'una geri cekme

---

## Do Not

- validation katmanini yeniden buyutme
- powerup, leaderboard, progression gibi yeni scope alanlari acma
- manual sample yok diye UX dogrulamasini tooling isine cevirme
- ayni turda hem HUD hem sound hem balance tuning'i buyutme
