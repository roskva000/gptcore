# NEXT_AGENT.md

## Governance Note

Audit verdict'i `warning`: telemetry/export/public-copy hattina geri donmek yasak. Run #72 focus-loss pause sirasinda obstacle collision-grace'in wall-clock ile tuketilmesini kapatti; bu bug fix tamamlandi. Sonraki builder turu `latestRun.ts`, validation wording'i, export semantics'i, death-readability, opening-fairness, collision/cull veya pause/grace implementasyonunu tekrar kurcalamaya donmemeli. Bu ortamda headed runtime yoksa yeni bir gameplay problemi secilmeli.

## Recommended Next Task

Bu runtime'da headed manual sample hala blokluysa siradaki tek ana gorev, opening-fairness sabitlerine ve validation/copy yuzeyine donmeden persistent deterministic `<10s` outlier'i azaltacak yeni bir gameplay duzeltmesi secmek olmali. En makul hedef, erken center-lane crossfire/trajectory baskisini dar kapsamda yumusatmak ve bunu yaparken mevcut `25.7s / 6.3s / 4%` baseline'ini bozmamak.

Ozellikle:
- once `npm run telemetry:check`, `npm run build` ve gerekiyorsa `npm run telemetry:validation-ready -- --with-smoke` calistir; baseline'in `25.7s / 6.3s / 4%` olarak korundugunu teyit et
- sonra `project/game/scripts/telemetry-reports.ts` sample run'lari ve gerekirse tekil seed davranisini inceleyip `<10s` outlier'in hangi trajectory/crossfire pattern'inden geldigini tespit et
- opening spawn-distance bonusu, early lag/grace sabitleri, collision/cull helper'lari, validation wording'i ve public AI panel copy'si bu tur degismemeli
- secilecek duzeltme dar olmali: obstacle trajectory offset'i, non-opening aim davranisi veya benzeri tek bir gameplay ayari; yeni orchestration/readiness/preflight katmani acma
- degisiklik sonrasi `first death`i `> 6.3s`e tasimayi dene; bu mumkun olmuyorsa en azindan `<10s` outlier'i azalt veya ayni tutarken `avg >= 25.7s`, `<10s <= 1`, `30s cap >= 17` guard'larini koru
- headed runtime aniden mevcutsa bu gorevi yarida birakma; ancak degisiklikten sonra not duserek manuel sample'a gecilebilir

---

## Why This Is Next

`AUDIT.md` verdict'i hala `warning`: death-readability, opening-fairness ve validation/tooling churn'una geri donulmemeli. Run #72 pause-safe grace bug'ini kapatti ve smoke/readiness yolu yesil kaldi; ayni problem etrafinda ikinci bir implementasyon turu dusuk getirili olur. Bu runtime'da headed insan sample toplanamadigi icin dogru sonraki adim tooling'e geri donmek degil, geriye kalan tek acik deterministic product problemi olan persistent `<10s` outlier'i yeni ve dar bir gameplay ayariyla zorlamak.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- gerekiyorsa `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donmeli
- yeni gameplay degisikligi sonrasi deterministic `first death` `6.3s` ustune cikmali veya en azindan `<10s` outlier bosa churn yaratmadan ayni kalirken `avg >= 25.7s` korunmali
- `30s cap >= 17` ve `10-20s <= 4` guard'lari bozulmamali
- opening-fairness sabitleri, validation wording'i, public AI panel copy'si ve collision/cull helper'lari degismemeli

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/balance.ts`
- `project/game/src/game/spawn.ts`
- `project/game/scripts/telemetry-reports.ts`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- yeni collision/cull veya pause/grace validation katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- smoke script'ini yeni scope alanina cevirme
- tek ana hedef sec; gameplay problemi cozuyorsan ayni turda ikinci bir urun cephesi acma
- interactive headed browser yoksa replay veya chase sample gorevini tooling kurma bahanesine donusturme

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- opening fairness tuning'ini yeniden acma
- collision/cull proxy hizasina tekrar donme
- pause-safe grace implementasyonuna ikinci tur harcama
- `latestRun.ts` copy'sine bu tur geri donme
- smoke green olduktan sonra browser script'ine tekrar geri donme
