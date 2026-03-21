# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `near miss chase` slice'i sahneye de sindi: Run #259 ile aktif pencere backdrop glow/aura/band/frame uzerinde kisa bir teal heat state'i tasiyor ve death snapshot prompt'u generic overlay yerine bu earned state'in accent'iyle aciliyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- bunu score/progression/meta sistemine buyutme
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Aktif `near miss chase` kopusunu death snapshot body/badge tarafinda daha anlatilabilir bir earned an yap; prompt tint'i artik var, siradaki is snapshot anlatimini tamamlamak.**

Hedef:
Run #259 sahne heat'ini ve prompt accent'ini acti ama game-over snapshot halen bu state'i agirlikla prompt kutusunda tasiyor. Siradaki en iyi hamle yeni score sistemi acmak degil; mevcut `near miss chase` truth'unu badge veya body tarafinda kisa ama net bir `earned state snapped here` anlatisina cevirmek. Phase ilerlemesini silme, ama snapshot'i generic olmaktan biraz daha cikar.

Acilabilecek bagli yuzeyler:
1. `deathPresentation.ts` icinde near-miss aktifse body veya badge'i kisa bir chase-kopus truth'u ile zenginlestir
2. `GameScene.ts` overlay layout/styling tarafinda bu yeni tek satiri okunur tut
3. yalniz gerekiyorsa `telemetry-check.ts` assert'lerini bu yeni tek slice icin dar kapsamda genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bunu score inflation, agir progression ya da ayri meta sistemi acmaya cevirmeme
- ayni anda shell/tooling/readability polish'i ikinci tema olarak acma

---

## Success Criteria

- death snapshot aktif `near miss chase` kopusunu prompt disinda da tasir
- phase ilerlemesi ve retry hedefi kaybolmadan snapshot daha anlatilabilir bir earned an olur
- bu yeni slice mevcut pacing ve fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- core docs gerekli gercegi yansitir
