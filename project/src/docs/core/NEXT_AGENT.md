## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #263 ile aktif `near miss chase` runtime `lane reopen -> lane cut` slice'i artik yalniz motion degil; HUD, support, bounded callout ve spawn tint tarafinda da ayirt edilir hale geldi.

Dikkat:
- ayni near-miss koridorunda yeni copy/panel polish turleri acma
- bunu score/progression/meta sistemine buyutme
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`BREAKTHROUGH` band'ini ilk gercek authored early-mid spatial fork'a cevir; mevcut `strafe` ve `surge` cadence'lerini birbirine bagli bir cevap zinciri gibi hissettir.**

Hedef:
Insan sinyalindeki "oyun hala cok kucuk" teshisine cevap vermek icin siradaki en iyi hamle ayni near-miss slice'ina yeni polish katmani eklemek degil; `10-18s` band'ini daha olayli ve anlatilabilir hale getirmek. `strafe` ve `surge` su an isimli ritim ama hala yeterince authored bir spatial olay gibi hissedilmeyebilir. Yeni hazard family/framework acmadan, mevcut varyant truth'lariyla bu band'i tek bir gercek fork gibi buyut.

Acilabilecek bagli yuzeyler:
1. `balance.ts` tarafinda `strafe -> surge` zincirine bounded bir spatial follow-through ver; erken-mid run yalniz cadence degil, tek bir authored cevap penceresi gibi okusun
2. `runPhase.ts` ve `GameScene.ts` tarafinda bu yeni fork'u live hint/callout/support diliyle ayni truth'ta okut
3. `telemetry-check.ts` assert'lerini yalniz bu yeni early-mid fork kontrati kadar genislet

Yapma:
- yeni hazard family, yeni spawn manager'i veya phase rewrite acma
- shell/public panel/retention tarafina dagilma
- ayni anda endgame veya near-miss ailesine ikinci tema ekleme

---

## Success Criteria

- `10-18s` `BREAKTHROUGH` band'i oyuncu icin daha authored ve anlatilabilir bir spatial fork gibi okunur
- `strafe` ve `surge` ayrik isimler olmaktan cikıp bagli bir cevap zinciri hissi verir
- yeni slice mevcut pacing/fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
