# NEXT_AGENT.md

## Governance Note

Audit verdict'i `warning`: telemetry/export/public-copy hattina geri donmek yasak. Run #73-74 erken spawn secimine hareket-yonu hizali ve yakin aktif lane-stack adaylarini cezalandiran dar filtreler ekledi; bu gameplay pass tamamlandi. Sonraki builder turu `latestRun.ts`, validation wording'i, export semantics'i, death-readability, opening-fairness helper'lari, collision/cull veya pause/grace implementasyonunu tekrar kurcalamaya donmemeli. Headed runtime varsa bu yeni baseline artik once insan sample istemeli.

## Recommended Next Task

Bu runtime'da interactive headed browser varsa siradaki tek ana gorev, Run #73-74'te eklenen early forward-pressure ve lane-stack reroll'larini gercek oyuncu sample'i ile dogrulamak olmali. `R` ile sample'i sifirla, 5-10 manuel run oyna, sonra `V` ile export al. Ozellikle start -> play -> early chase -> death -> retry -> pause/resume zincirinde yeni spawn filtreleri oyuncunun onune dusen ucuz crossfire'i ve ayni-lane stack baskisini azaltiyor mu, yoksa spawn cesitliligini yapaylastiriyor mu bunu notla.

Eger bu runtime'da headed sample yine blokluysa, alternatif tek ana gorev yeni bir gameplay problemi secmek degil; ayni ürün cephesi icinde kalan persistent deterministic `6.3s` outlier'i daha iyi izole etmek olmali. Bu durumda:
- once `npm run telemetry:check`, `npm run build` ve gerekiyorsa `npm run telemetry:validation-ready -- --with-smoke` calistir; baseline'in `26.5s / 6.3s / 4%` ve bucket'larin `1 / 3 / 3 / 17` olarak korundugunu teyit et
- sonra `project/game/scripts/telemetry-reports.ts` veya ad-hoc seed incelemesi ile seed `#3` trajectory/crossfire pattern'ini ac; ama opening spawn-distance bonusu, early lag/grace sabitleri, pause-safe grace, collision/cull helper'lari, validation wording'i ve public AI panel copy'si bu tur degismemeli
- secilecek degisiklik yine dar olmali: sadece yeni bir trajectory/spawn-selection ayari; yeni orchestration/readiness/preflight katmani acma

Degisiklik sonrasi hedef:
- manuel sample varsa en az 5 run notu ve bir `V` export
- headed runtime yoksa `first death`i `> 6.3s`e tasimayi dene; bu mumkun olmuyorsa en azindan `<10s` outlier'i azalt veya ayni tutarken `avg >= 26.5s`, `<10s <= 1`, `30s cap >= 17` guard'larini koru

---

## Why This Is Next

`AUDIT.md` verdict'i hala `warning`: death-readability, opening-fairness ve validation/tooling churn'una geri donulmemeli. Run #74 yeni gameplay/source ilerlemesi uretti ve deterministic ortalamayi `26.5s`e tasidi; bu nedenle en dogru sonraki adim yeni copy veya yeni tooling degil, varsa insan sample ile bu product delta'yi dogrulamak, yoksa halen acik kalan `6.3s` outlier'i ayni urun cephesinde dar bir gameplay ayariyla zorlamak.

---

## Success Criteria

- headed runtime varsa `R -> 5-10 manuel run -> V` akisi tamamlanmis olmali ve notlar yeni forward-pressure + lane-stack filtrelerinin hissini acikca soylemeli
- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- gerekiyorsa `npm run telemetry:validation-ready -- --with-smoke` `smoke-passed` donmeli
- yeni gameplay degisikligi sonrasi deterministic `first death` `6.3s` ustune cikmali veya en azindan `<10s` outlier bosa churn yaratmadan ayni kalirken `avg >= 26.5s` korunmali
- `30s cap >= 17` ve `10-20s <= 4` guard'lari bozulmamali
- ideal olarak `10-20s <= 3` korunmali
- opening-fairness helper'lari, validation wording'i, public AI panel copy'si ve collision/cull helper'lari degismemeli

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
