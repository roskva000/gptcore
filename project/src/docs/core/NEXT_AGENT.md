## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #268 ile `PINCH LOCK -> SEAL SNAP` killbox zinciri spectacle ve death snapshot tonunda da ayrildi; authored trap artik runtime/HUD/death-retry yanina sahne imzasi da kazandi.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- sonraki run yalniz ayni killbox tone/snapshot cilasi olarak kapanirsa audit bunu yeterli saymayacak
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure haline getirme; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni entegrasyon kontratini kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni killbox beat'i etrafinda ikinci bir presentation-only run yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- killbox-to-drift hattini yari yolda birakip shell/retention tarafina dagilma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`24s echo lock-in -> 32s drift release` handoff'una tek bir yeni bounded killbox beat ekle; yeni hazard family acmadan lock-in elini tekrar authored bir karar anina cevir.**

Hedef:
Killbox'in ilk authored trap'i artik `23.6s`e kadar runtime, HUD, spectacle ve snapshot tarafinda bagli okuyor. Sonraki dogru adim shell ya da ayni tone polish'i degil; `24-32s` fold rejiminin ortasina tek bir yeni gameplay karari koyup `echo lock-in` tarafinin drift'e kadar duz cadence hissine dusmesini engellemek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `24-32s` killbox fold rejimine tek bounded beat ekle; mevcut `echo`/`lead` ailesini kullan, yeni hazard family acma
2. `runPhase.ts` ve `GameScene.ts` ile bu yeni beat'i HUD/support/callout/death-retry truth'una bagla
3. `telemetry-check.ts` assert'lerini yalniz bu yeni runtime kontrati kadar genislet

Yapma:
- ayni `PINCH LOCK` / `SEAL SNAP` tonunu bir kez daha cilalama
- killbox band'ini bastan sona yeniden balance etmeye kalkma
- yeni overlay/orchestration/framework katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `24-32s` killbox lock-in band'inda yeni bir bounded karar ani hisseder
- source deltasi gameplay odakli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.3s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
