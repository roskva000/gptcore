## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #265 ile `STRAFE FORK -> SURGE SNAP` zinciri arena spectacle ve death snapshot tonuna da sindi.

Dikkat:
- ayni breakthrough koridorunda yeni copy/callout/snapshot polish run'i acma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- retention/shell tarafina dagilip gameplay deltasi erteleme

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`18-24s` `KILLBOX` band'ina yeni, bounded bir spatial trap beat'i ekle; mevcut lead-cut + echo truth'unu buyut ama yeni hazard family acma.**

Hedef:
Breakthrough artik sahnede ve snapshot'ta da ayri hissettiriyor. Siradaki mantikli adim ayni early-mid koridorda kalmak degil; insan sinyalindeki "oyun hala cok kucuk" teshisine gameplay tarafinda cevap vermek icin `KILLBOX` band'inda yeni gorunur baski farki acmak. `18s` lead cut ile `24s` echo lock-in arasina, straight-escape cevabini bozan tek bir bounded runtime davranisi yerlestir.

Acilabilecek bagli yuzeyler:
1. `balance.ts` ve gerekiyorsa `GameScene.ts` tarafinda `KILLBOX` icin tek bir bounded trap window tanimla
2. `runPhase.ts` / HUD / death-retry truth'unu bu yeni beat'i adlandiracak kadar genislet
3. `telemetry-check.ts` assert'lerini yalniz bu yeni trap kontrati kadar genislet

Yapma:
- `BREAKTHROUGH` cue tonlarina geri donme
- ikinci bir hazard family, score/meta sistemi veya shell rewrite acma
- yeni spectacle framework'u veya overlay manager'i yazma

---

## Success Criteria

- oyuncu `18-24s` band'inda `KILLBOX`in yalniz hiz/cadence degil yeni bir spatial cevap baskisi actigini hisseder
- yeni beat mevcut `lead cut -> echo` zincirini buyutur; ucuz wipe, unfair snap veya readability gurultusu yaratmaz
- deterministic survival headline `29.4s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
