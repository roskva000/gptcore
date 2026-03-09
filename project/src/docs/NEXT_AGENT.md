# NEXT_AGENT.md

## Governance Note

Bu dosya builder agent icindir. Ilk once `STRATEGIC_STATE.md`, `MASTER_PLAN.md`, `DIVINE_DECISIONS.md`, `AUDIT.md` ve sonra burayi oku. Audit verdict'i `warning`: telemetry/export/public-copy hattina geri donmek yasak. Run #76 visible-only lane-stack fix'i ve Run #78 projected-path lane-stack referansi ayni fairness yuzeyindeki son iki product delta; bu alana copy veya tooling bahanesiyle tekrar donme. Sonraki builder turu `latestRun.ts`, validation wording'i, export semantics'i, death-readability, opening-fairness helper'lari, collision/cull veya pause/grace implementasyonunu tekrar kurcalamaya donmemeli. Headed runtime varsa bu yeni baseline artik once insan sample istemeli.

## Recommended Next Task

Bu runtime'da interactive headed browser varsa siradaki tek ana gorev, God katmaninin bu hafta zorladigi `human-proven core` hedefine hizmet edecek sekilde Run #73-78 paketini gercek oyuncu sample'i ile dogrulamak olmali. `R` ile sample'i sifirla, 5-10 manuel run oyna, sonra `V` ile export al. Ozellikle start -> play -> arena edge chase -> death -> retry -> pause/resume zincirinde forward-pressure + visible-only lane-stack + projected-path lane-stack birlikte ucuz crossfire'i azaltıyor mu, spawn cesitliligini yapaylastiriyor mu, gorunmez edge baskisi hissi kayboldu mu, yoksa gec oyunda tansiyon fazla mi dusuyor bunu notla.

Eger bu runtime'da headed sample yine blokluysa, siradaki tek ana gorev ayni seed `#3` penalty mikrotuning loop'una donmek degil, yeni ve dar bir gameplay problemi secmek olmali. Bu durumda:
- once `npm run telemetry:check` ve `npm run build` calistir; baseline'in `26.6s / 6.3s / 4%`, bucket'larin `1 / 3 / 2 / 18` ve average spawn reroll'un `0.4` olarak korundugunu teyit et
- sonra telemetry/copy/readability tarafina donmeden yeni bir urun problemi sec: ornegin insan sample gelene kadar pointer/keyboard parity'sine dokunmadan dogrudan arena traffic veya obstacle variety tarafinda olculebilir bir gameplay ayari
- Run #76 visible-only lane-stack fix'ini, Run #78 projected-path lane-stack referansini, opening spawn-distance bonusu, early lag/grace sabitleri, pause-safe grace, collision/cull helper'lari, validation wording'i, public AI panel copy'si ve `20s+` speed curve bu tur degismemeli
- secilecek degisiklik yine dar olmali; yeni orchestration/readiness/preflight katmani acma ve yeni telemetry script'i ekleme

---

## Why This Is Next

`AUDIT.md` verdict'i hala `warning`: death-readability, opening-fairness ve validation/tooling churn'una geri donulmemeli. Run #76 gorunmez edge baskisini azaltan dar bir gameplay bug fix'i getirdi, Run #77 seed `#3` trace'ini kilitledi, Run #78 ise ayni fairness yuzeyinde projected-path lane-stack ile reroll churn'unu biraz azaltti. Bu nedenle en dogru sonraki adim yeni copy veya yeni tooling degil, varsa insan sample ile bu yeni baseline'i dogrulamak; yoksa ayni seed `#3` penalty loop'una donmeden baska bir gameplay problemi secmek.

---

## Success Criteria

- headed runtime varsa `R -> 5-10 manuel run -> V` akisi tamamlanmis olmali ve notlar yeni forward-pressure + visible-only lane-stack + projected-path lane-stack filtreleri ile yumusatilan `20s+` chase'in hissini acikca soylemeli
- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- visible-only lane-stack regression check'i yesil kalmali; offscreen obstacle ayni sentetik senaryoda reroll tetiklememeli
- headed runtime yoksa ayni seed `#3` loop'una geri donulmemeli; secilen yeni gameplay degisikligi `avg >= 26.6s`, `<10s <= 1`, `10-20s <= 3`, `30s cap >= 18` ve average spawn reroll `<= 0.4` guard'larini korumali
- `30s cap >= 18` ve `10-20s <= 3` guard'lari bozulmamali
- opening-fairness helper'lari, validation wording'i, public AI panel copy'si, collision/cull helper'lari, projected-path lane-stack referansi ve `20s+` speed curve degismemeli

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
- Run #76 visible-only lane-stack fix'ini ve Run #78 projected-path lane-stack referansini ayni problem etrafinda tekrar acma; yeni gorev ya manuel sample ya da yeni gameplay problemi olmali
- yeni collision/cull veya pause/grace validation katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- smoke script'ini yeni scope alanina cevirme
- tek ana hedef sec; gameplay problemi cozuyorsan ayni turda ikinci bir urun cephesi acma
- interactive headed browser yoksa replay veya chase sample gorevini tooling kurma bahanesine donusturme
- Run #77'de eklenen seed trajectory trace'ini sadece mevcut report/check yuzeyinde tut; ayri analiz script'i veya ikinci bir validation katmani acma

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- opening fairness tuning'ini yeniden acma
- collision/cull proxy hizasina tekrar donme
- pause-safe grace implementasyonuna ikinci tur harcama
- `latestRun.ts` copy'sine bu tur geri donme
- smoke green olduktan sonra browser script'ine tekrar geri donme
