# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `near miss chase` slice'i runtime'a da sindi: Run #262 ile aktif pencere artik yalniz sahne heat'i ve death snapshot degil; dominant snapped lane uzerinden en fazla iki sonraki spawn'a kisa `lane reopen -> lane cut` davranisi da tasiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- bunu score/progression/meta sistemine buyutme
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run #262'nin yeni runtime `lane reopen -> lane cut` slice'ini mevcut near-miss HUD/support/hint/backdrop diliyle daha okunur hale getir; oyuncu bu iki beat'i yalniz hissetmesin, canli feedback'te de ayirt etsin.**

Hedef:
Run #262 runtime farki acti ama okunurluk henuz implicit kalabilir. Siradaki en iyi hamle yeni score sistemi acmak veya shell'e dagilmak degil; mevcut chase HUD/support/backdrop/hint zincirini bu yeni `reopen` ve `cut` beat'leriyle ayni truth'ta baglayip aktif spawn line'inin ne yaptigini oyuncuya daha net okutmak. Ama bunu yeni hazard family, yeni manager ya da phase rewrite olmadan yap.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` icinde mevcut pending `reopen` / `cut` spawn step'ini live HUD/support/hint veya mevcut bounded callout diliyle ayni truth'ta okut
2. varsa ilgili obstacle tint/accent veya mevcut backdrop pulse siddetini bu iki beat'i ayirt edecek kadar dar kapsamda bagla; yeni spectacle framework'u acma
3. `telemetry-check.ts` assert'lerini yalniz bu yeni live readability slice'i kadar genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bunu score inflation, agir progression ya da ayri meta sistemi acmaya cevirmeme
- ayni anda shell/tooling/readability polish'i ikinci tema olarak acma; yalniz bu runtime near-miss truth'una hizmet eden okunurlugu degistir

---

## Success Criteria

- aktif `near miss chase` pencere icindeki `reopen` ve `cut` beat'leri oyuncu tarafinda canli olarak ayirt edilir
- yeni live readability slice mevcut runtime/spawn ve snapshot/impact/title zinciriyle ayni dili tasir
- bu entegrasyon mevcut pacing ve fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- core docs gerekli gercegi yansitir
