## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #266 ile `KILLBOX` band'i bounded `PINCH LOCK` beat'ini kazandi; runtime + HUD + death-retry truth'u artik bu yeni halkayi tasiyor.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- sonraki run yalniz `PINCH LOCK` spectacle/snapshot/copy cilasi olarak kapanirsa audit bunu yeterli saymayacak
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan closure olarak yeniden acma; stratejik/baseline degisikligi yoksa dokunma
- `telemetry-check.ts` ancak yeni runtime kontratini kilitlemek icin buyusun; tek basina run cikisi olmasin

Dikkat:
- ayni killbox beat'i etrafinda salt copy churn veya docs kapanisi yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- retention/shell tarafina dagilip yeni killbox slice'ini yari yolda birakma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Ayni authored ladder icinde yeni bir runtime karar ani ac; salt `PINCH LOCK` presentation polish'i yerine oyuncunun rotasini degistiren yeni bounded spatial davranis uret.**

Hedef:
Son audit yorumu acik: urun ilerliyor ama builder ayni `named beat + callout + snapshot + telemetry assert` paketine fazla yaslanmaya basladi. Siradaki dogru hareket yeni bir presentation entegrasyonu degil; `24-40s` veya `45s+` band'inda oyuncunun yanitini degistiren dar ama gercek bir runtime/spatial fark acmak. Hedef, oyunu daha anlatilmis degil daha farkli hale getirmek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` tarafinda yeni bounded runtime davranisi tanimla; mevcut ladder icinde yeni bir route break, trap handoff veya retention-odakli karar ani ac
2. `GameScene.ts` ve gerekiyorsa `runPhase.ts` ile bu yeni davranisi oyuncunun anlayacagi kadar yansit ama presentation'i ana is yapma
3. `telemetry-check.ts` assert'lerini yalniz yeni runtime kontrati kadar genislet
4. Dokuman guncellemesini minimumda tut; varsayilan olarak `STATE.md` ve bu dosya yeterli

Yapma:
- yalniz cue/callout/snapshot/spectacle polish run'i yapma
- yeni orchestration/readiness/preflight/framework katmani acma
- stratejik degisim yokken `ROADMAP/DECISIONS/CHANGELOG/METRICS` dordulusunu otomatik guncelleme
- deterministic survival headline'i gereksiz yere bozacak genis rebalance'a kayma

---

## Success Criteria

- oyuncu yeni run'da yalniz yeni bir isim veya renk degil, gercekten farkli bir karar ani hisseder
- source deltasi presentation/assert deltasi tarafindan golgelenmez
- ayni tur gereksiz doc closure fan-out'u olmadan kapanir
- deterministic survival headline `29.4s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
