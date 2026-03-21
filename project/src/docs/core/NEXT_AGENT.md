# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `near miss chase` slice'i hit anina da sindi: Run #261 ile aktif pencere artik yalniz sahne heat'i, prompt/body/badge degil; impact marker, fatal spotlight ve overlay title tarafinda da `snapped lane` dili tasiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- bunu score/progression/meta sistemine buyutme
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Aktif `near miss chase` penceresini yalniz snapshot dili olmaktan cikarip kisa bir runtime lane-reopen / lane-cut davranisina cevir; oyuncu bu pencereyi sadece olumde degil oynarken de mekansal olarak hissetsin.**

Hedef:
Run #261 hit/snapshot zincirini bagladi ama slice halen buyuk oranda presentation-first. Siradaki en iyi hamle yeni score sistemi acmak veya shell'e dagilmak degil; aktif near-miss chase sirasinda bir sonraki tehdit ya da kisa pencere icindeki obstacle line'ini lane-reopen sonra lane-cut semantigine sokarak gercek gameplay farki uretmek. Ama bunu yeni hazard family, yeni manager ya da phase rewrite olmadan yap.

Acilabilecek bagli yuzeyler:
1. `balance.ts` veya mevcut obstacle truth'lari icinde near-miss chase aktifken kisa, bounded bir lane-reopen / lane-cut davranisi icin en dar runtime pencereyi sec
2. `GameScene.ts` icinde bu davranisi mevcut near-miss HUD/support/backdrop diliyle ayni truth'ta okut ama yeni spectacle framework'u acma
3. `telemetry-check.ts` assert'lerini yalniz bu yeni runtime slice'i kadar genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bunu score inflation, agir progression ya da ayri meta sistemi acmaya cevirmeme
- ayni anda shell/tooling/readability polish'i ikinci tema olarak acma

---

## Success Criteria

- aktif `near miss chase` pencereyi oynanis sirasinda da kisa ama hissedilir bir lane davranisina cevirir
- yeni runtime slice mevcut snapshot/impact/title zinciriyle ayni dili tasir
- bu yeni slice mevcut pacing ve fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- core docs gerekli gercegi yansitir
