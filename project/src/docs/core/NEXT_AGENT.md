## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #264 ile `BREAKTHROUGH` band'i ilk kez gercek authored early-mid fork kazandi: forced `STRAFE FORK` ve `SURGE SNAP` runtime, HUD, callout ve death/retry truth'una girdi.

Dikkat:
- ayni breakthrough koridorunda yeni cadence/hazard family acma
- bunu score/progression/meta sistemine buyutme
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run #264'te acilan `STRAFE FORK -> SURGE SNAP` zincirini arena spectacle ve snapshot tonunda da ayirt edilir hale getir; gameplay truth'unu yeni mekanik acmadan sahneye sindir.**

Hedef:
Erken-mid fork artik davranis ve HUD seviyesinde var, ama insan sinyalindeki "oyun hala cok kucuk" teshisine daha guclu cevap vermek icin bu authored olay sahnede de ayri hissettirmeli. Yeni hazard family/framework acmadan, mevcut breakthrough cue truth'unu arena glow/band/frame motion veya snapshot accent tarafinda ayri imzalarla okut.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` tarafinda `STRAFE FORK` ile `SURGE SNAP` icin bounded backdrop/frame/band motion farki ekle
2. gerekiyorsa `runPhase.ts` cue accent truth'unu bu sahne imzasini destekleyecek kadar genislet
3. `telemetry-check.ts` assert'lerini yalniz bu yeni spectacle/snapshot kontrati kadar genislet

Yapma:
- `balance.ts` icinde yeni cadence veya yeni forced window acma
- near-miss, killbox ya da retention tarafina dagilma
- yeni overlay manager'i, spectacle system'i veya phase framework'u yazma

---

## Success Criteria

- oyuncu `10-18s` band'inda `STRAFE FORK` ile `SURGE SNAP`i yalniz HUD/callout degil sahne hareketi veya accent farkindan da ayirt eder
- yeni spectacle authored fork'u buyutur ama cheap drama veya readability gurultusu yaratmaz
- deterministic survival headline `29.4s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
