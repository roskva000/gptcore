## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #269 ile killbox `24-32s` lock-in band'i yeni runtime beat'ini kazandi; `FOLD SNAP` artik `27.2-28.4s` araliginda echo rejimini tekrar kapanan bir karar anina ceviriyor.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- sonraki run yalniz `FOLD SNAP` copy/tone polish'i olarak kapanirsa audit bunu yeterli saymayacak
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure haline getirme; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni runtime/drift entegrasyon kontratini kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni killbox beat'i etrafinda ikinci bir presentation-only run yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- killbox-to-drift hattini yari yolda birakip shell/retention tarafina dagilma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**`FOLD SNAP -> 32s DRIFT RELEASE` handoff'unu dogrudan bagla; yeni hazard family acmadan release cut'i killbox'in son kapanisindan dogan daha net bir lateral cevap haline getir.**

Hedef:
Killbox authored trap'i artik `27.2-28.4s` `FOLD SNAP` ile `32s`e kadar ikinci bir route break tasiyor. Sonraki dogru adim yeni shell/presentation cilasi degil; ilk `DRIFT` release penceresini bu son killbox kapanisina daha net cevap verecek sekilde sindirip handoff'u oyuncunun hissedebilecegi tek zincire cevirmek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `32.0-33.6s` release cut'i `FOLD SNAP` tarafindan miras aldigi yone daha net bagla; yeni hazard family acma
2. `runPhase.ts` ve gerekirse `GameScene.ts` ile bu handoff'u HUD/support/callout/death-retry truth'unda `killbox opened sideways after fold snap` gibi daha bagli okut
3. `telemetry-check.ts` assert'lerini yalniz yeni drift-release runtime kontrati kadar genislet

Yapma:
- ayni `FOLD SNAP` tonunu bir kez daha cilalama
- killbox veya drift band'ini bastan sona yeniden balance etmeye kalkma
- yeni overlay/orchestration/framework katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `27-33s` band'ini artik `fold snap -> release cut` zinciri olarak hisseder
- source deltasi gameplay odakli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
