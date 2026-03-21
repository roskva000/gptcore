# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `near miss chase` slice'i death snapshot body/badge tarafina da sindi: Run #260 ile aktif pencere artik yalniz sahne heat'i ve prompt tint'i degil, `CHASE SNAP` badge'i ve earned body satiri da tasiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- bunu score/progression/meta sistemine buyutme
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Aktif `near miss chase` kopusunu impact marker / fatal spotlight tarafinda daha mekansal bir `earned lane snapped here` anina cevir; snapshot body/badge artik var, siradaki is bu kopusu hit anina da sindirmek.**

Hedef:
Run #260 snapshot body/badge boslugunu kapatti ama hit anlatisi halen agirlikla generic impact direction + fatal spotlight semantiginde. Siradaki en iyi hamle yeni score sistemi acmak degil; mevcut `near miss chase` truth'unu impact marker, fatal spotlight veya overlay title tarafinda kisa ama net bir mekansal kopus olarak okutmak. Phase ilerlemesini silme; yeni overlay framework'u acma; yalniz mevcut hit/snapshot yuzeylerini ayni truth etrafinda bagla.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` icinde near-miss aktifken impact marker / fatal spotlight accent veya label'ini bu snapped lane truth'una bagla
2. `deathPresentation.ts` icinde yalniz gerekiyorsa title veya callout'un tek kelimelik yan truth'unu bu slice'a hizala
3. `telemetry-check.ts` assert'lerini yalniz bu yeni hit/snapshot slice'i kadar genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bunu score inflation, agir progression ya da ayri meta sistemi acmaya cevirmeme
- ayni anda shell/tooling/readability polish'i ikinci tema olarak acma

---

## Success Criteria

- aktif `near miss chase` kopusu hit aninda da generic impact olayi olmaktan cikar
- phase ilerlemesi ve retry hedefi kaybolmadan impact/snapshot zinciri daha anlatilabilir bir earned an olur
- bu yeni slice mevcut pacing ve fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- core docs gerekli gercegi yansitir
