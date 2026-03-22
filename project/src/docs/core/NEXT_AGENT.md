## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #266 ile `KILLBOX` band'i bounded `PINCH LOCK` beat'ini kazandi; runtime + HUD + death-retry truth'u artik bu yeni halkayi tasiyor.

Dikkat:
- ayni killbox beat'i etrafinda salt copy churn veya docs kapanisi yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- retention/shell tarafina dagilip yeni killbox slice'ini yari yolda birakma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `PINCH LOCK` beat'ini arena spectacle ve death snapshot tonuna da sindir; `lead cut -> pinch lock -> bridge echo` zinciri ekranda ve olum aninda daha tek bir authored killbox trap'i gibi okunsun.**

Hedef:
Yeni gameplay beat acildi ama killbox zinciri henuz breakthrough kadar sahne/overlay imzasina sahip degil. Siradaki dar ve mantikli adim, yeni mechanic acmadan `PINCH LOCK` halkasini arena motion ve snapshot accent tarafinda ayirt edilir kilmak; killbox `20-24s` band'i text-first degil, tek bir bagli authored trap gibi hissedilmeli.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` tarafinda killbox cue aktifken backdrop glow/band/frame motion'unu `PINCH LOCK` ve gerekiyorsa `bridge echo` tarafinda ayirt et
2. `deathPresentation.ts` veya ilgili overlay truth'unda `PINCH LOCK` snapshot tonunu killbox zincirine daha belirgin bagla; generic killbox paletine dusme
3. `telemetry-check.ts` assert'lerini yalniz yeni spectacle/snapshot kontrati kadar genislet

Yapma:
- yeni killbox mechanic'i, ikinci bir hazard family, score/meta sistemi veya shell rewrite acma
- yeni spectacle framework'u veya overlay manager'i yazma
- deterministic survival headline'i bozacak killbox rebalance'a kayma

---

## Success Criteria

- oyuncu `20-24s` band'inda `PINCH LOCK`i yalniz HUD metninden degil arena motion'u ve death snapshot tonundan da ayirt eder
- killbox zinciri `lead cut -> pinch lock -> bridge echo` olarak daha bagli ve anlatilabilir hissedilir; ucuz drama veya readability gurultusu yaratmaz
- deterministic survival headline `29.4s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
