## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #272 ile `36.2-37.6s` late-sweep zinciri ilk kez `LATE SWEEP -> SWEEP LOCK` olarak ikiye bolundu; ilk capraz kiristen sonra ayni crossed lane'e erken geri sizmanin da artik bounded bir maliyeti var.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu yeni runtime slice acildi; siradaki run gameplay'i golgeleyecek validation/docs fan-out'una kaymamalı
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni player-facing kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni `SWEEP LOCK` slice'ini bastan sona yeniden balance etmeye kalkma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- shell/retention tarafina dagilip erken drift zincirini yari yolda birakma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK HOLD` ayrimini sahne ve death snapshot tarafinda da ayri okunur hale getir; oyuncu gec crossback'in ne zaman ilk kiris, ne zaman ikinci closure, ne zaman full clamp oldugunu ekranda gorerek anlasin.**

Hedef:
Runtime artik dogru soruyu soruyor ama bu yeni gec-karar zincirinin sahne/snapshot tonunda ayri imzasi henuz zayif. Sonraki dogru adim yeni mechanic acmak degil; mevcut runtime farkini `GameScene.ts` ve gerekiyorsa `deathPresentation.ts` uzerinden ayri motion/palette truth'una sindirmek.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` icinde `late-sweep`, `sweep-lock` ve `aftershock` cue'larina ayri backdrop/frame/band motion imzalari ver; ilk sweep daha genis crossback, lock daha kisa sikisma, aftershock ise daha agir clamp gibi hissettirsin
2. `deathPresentation.ts` icinde `LATE SWEEP`, `SWEEP LOCK` ve `AFTERSHOCK HOLD` olumlerini ayri accent/prompt tonu ile ayir
3. `telemetry-check.ts` assert'lerini yalniz bu yeni spectacle/snapshot kontrati kadar genislet

Yapma:
- `balance.ts` uzerinde yeni sweep/aftershock mutation'u acma
- `32-40s` zincirini topluca yeniden tune etme
- yeni overlay/framework/orchestration katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

 - oyuncu `36.2-39.0s` band'inda `LATE SWEEP`, `SWEEP LOCK` ve `AFTERSHOCK HOLD` farkini yalniz HUD/copy degil sahnedeki motion ve olum snapshot'inda da ayirt eder
- source deltasi gameplay-support odakli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
