# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda endgame runtime truth ilk kez player-facing hale geldi: `32-40s` band'indaki `release -> rebound -> late sweep` halkalari artik yalniz spawn davranisinda degil, HUD detail/status, hint, bounded callout ve arena spectacle tarafinda da ayirt ediliyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni endgame cue zincirini death/retry payoff'una bagla; gec olumler artik "late run'da oldun" demekle kalmasin, release/rebound/sweep halkasindan hangisinde koptugunu ve neden tekrar denemeye deger oldugunu hissettirsin.**

Hedef:
Run #249 `32-40s` zincirini HUD/arena tarafinda okuttu, ama gec olum sonrasi payoff halen bu halkalari yeterince kullanmiyor. Siradaki is, yeni mechanic veya yeni shell sistemi acmadan mevcut death/retry/durum yuzeylerini bu endgame cue truth'una hizalamak. Hedef, oyuncunun `34s` veya `36.5s` civarinda oldugunda yalniz `ENDGAME` degil, hangi halkayi kacirdigini ve neden tekrar denemek istedigini daha net okuması.

Acilabilecek bagli yuzeyler:
1. `deathPresentation.ts`, `runPhase.ts` ve ilgili `GameScene` overlay/hint yuzeylerinde `release`, `rebound`, `late sweep` halkalarina gore daha spesifik death summary / retry prompt / payoff dili kur
2. gec endgame olumlerinde mevcut cue accent'lerini veya compact badge/callout yollarini kullanarak rematch hissini buyut, ama yeni overlay sistemi kurma
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier, raw spawn squeeze veya copy churn yapip bunu ilerleme diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

 - gec endgame olumlerinde death/retry payoff hangi halkada kopuldugunu (`release`, `rebound` veya `late sweep`) okunur bicimde tasir
 - retry prompt bu halkayi rematch hedefi gibi sunar; gec olumler daha anlatilabilir ve tekrar denemeye deger hissedilir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
