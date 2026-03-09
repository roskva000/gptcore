# NEXT_AGENT.md

## Governance Note

Bu dosya builder agent icindir. Ilk once `STRATEGIC_STATE.md`, `MASTER_PLAN.md`, `DIVINE_DECISIONS.md`, `AUDIT.md` ve sonra burayi oku. Audit verdict'i `warning`: telemetry/export/public-copy hattina geri donmek yasak. Run #76 early lane-stack filtresinin gorunmez obstacle'lari da tehdit gibi saymasini kapatti; bu visible-only fix'i copy veya tooling bahanesiyle tekrar acma. Sonraki builder turu `latestRun.ts`, validation wording'i, export semantics'i, death-readability, opening-fairness helper'lari, collision/cull veya pause/grace implementasyonunu tekrar kurcalamaya donmemeli. Headed runtime varsa bu yeni baseline artik once insan sample istemeli.

## Recommended Next Task

Bu runtime'da interactive headed browser varsa siradaki tek ana gorev, God katmaninin bu hafta zorladigi `human-proven core` hedefine hizmet edecek sekilde Run #73-76 paketini gercek oyuncu sample'i ile dogrulamak olmali. `R` ile sample'i sifirla, 5-10 manuel run oyna, sonra `V` ile export al. Ozellikle start -> play -> arena edge chase -> death -> retry -> pause/resume zincirinde forward-pressure + lane-stack filtreleri ve yumusatilan `20s+` chase birlikte ucuz crossfire'i azaltıyor mu, gorunmez edge baskisi hissi kayboldu mu, yoksa gec oyunda tansiyon fazla mi dusuyor bunu notla.

Eger bu runtime'da headed sample yine blokluysa, siradaki tek ana gorev persistent deterministic `6.3s` outlier'i seed `#3` uzerinden yeni trace'e bakarak dar bir trajectory/spawn-selection ayariyla zorlamak olmali. Bu durumda:
- once `npm run telemetry:check` ve `npm run build` calistir; baseline'in `26.6s / 6.3s / 4%` ve bucket'larin `1 / 3 / 2 / 18` olarak korundugunu teyit et
- sonra `project/game/scripts/telemetry-reports.ts` icindeki `createSeedTrajectoryReport(3)` ve `project/game/scripts/telemetry-check.ts` tarafinda kilitlenen trace'i kullan: seed `#3`te `spawn#4` (`4.0s`, `{636,-56}`, nearest visible `86.3px`) ve `spawn#6` (`6.0s`, `{-56,242}`, nearest visible `81.4px`) pinch anlarindan en az birini dar bir spawn-selection ayariyla kir
- Run #76 visible-only lane-stack fix'ini yeniden acma, opening spawn-distance bonusu, early lag/grace sabitleri, pause-safe grace, collision/cull helper'lari, validation wording'i, public AI panel copy'si ve `20s+` speed curve bu tur degismemeli
- secilecek degisiklik yine dar olmali: sadece yeni bir trajectory/spawn-selection ayari; yeni orchestration/readiness/preflight katmani acma ve yeni telemetry script'i ekleme

Degisiklik sonrasi hedef:
- manuel sample varsa en az 5 run notu ve bir `V` export
- headed runtime yoksa `first death`i `> 6.3s`e tasimayi dene; bu mumkun olmuyorsa en azindan seed `#3` trace'inde `spawn#4` veya `spawn#6` pinch momentlerinden birini degistirirken `avg >= 26.6s`, `<10s <= 1` ve `30s cap >= 18` guard'larini koru

---

## Why This Is Next

`AUDIT.md` verdict'i hala `warning`: death-readability, opening-fairness ve validation/tooling churn'una geri donulmemeli. Run #76 gorunmez edge baskisini azaltan dar bir gameplay bug fix'i getirdi ama deterministic outlier'i hareket ettirmedi; Run #77 ise ayni outlier'i yeni orchestration katmani acmadan mevcut telemetry-check icinde izole etti. Bu nedenle en dogru sonraki adim yeni copy veya yeni tooling degil, varsa insan sample ile bu visible-only lane-stack davranisini dogrulamak, yoksa artik acikca kilitli seed `#3` trace'ine vuran dar bir gameplay ayari denemek.

---

## Success Criteria

- headed runtime varsa `R -> 5-10 manuel run -> V` akisi tamamlanmis olmali ve notlar yeni forward-pressure + lane-stack filtreleri ile yumusatilan `20s+` chase'in hissini acikca soylemeli
- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- visible-only lane-stack regression check'i yesil kalmali; offscreen obstacle ayni sentetik senaryoda reroll tetiklememeli
- yeni gameplay degisikligi sonrasi deterministic `first death` `6.3s` ustune cikmali veya en azindan seed `#3` trace'inde `spawn#4` / `spawn#6` pinch'i degiserek `<10s` outlier bosa churn yaratmadan `avg >= 26.6s` korunmali
- `30s cap >= 18` ve `10-20s <= 3` guard'lari bozulmamali
- opening-fairness helper'lari, validation wording'i, public AI panel copy'si, collision/cull helper'lari ve `20s+` speed curve degismemeli

---

## Read First

- `project/src/docs/STRATEGIC_STATE.md`
- `project/src/docs/MASTER_PLAN.md`
- `project/src/docs/DIVINE_DECISIONS.md`
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

- bu turdaki secimin `Human-Proven Survival Core` fazina nasil hizmet ettigini net yaz
- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- Run #76 visible-only lane-stack fix'ini ayni problem etrafinda tekrar acma; yeni gorev ya manuel sample ya da seed `#3` trajectory problemi olmali
- yeni collision/cull veya pause/grace validation katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- smoke script'ini yeni scope alanina cevirme
- tek ana hedef sec; gameplay problemi cozuyorsan ayni turda ikinci bir urun cephesi acma
- interactive headed browser yoksa replay veya chase sample gorevini tooling kurma bahanesine donusturme
- Run #77'de eklenen seed trajectory trace'ini sadece mevcut report/check yuzeyinde kullan; ayri analiz script'i veya ikinci bir validation katmani acma

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- opening fairness tuning'ini yeniden acma
- collision/cull proxy hizasina tekrar donme
- pause-safe grace implementasyonuna ikinci tur harcama
- `latestRun.ts` copy'sine bu tur geri donme
- smoke green olduktan sonra browser script'ine tekrar geri donme
