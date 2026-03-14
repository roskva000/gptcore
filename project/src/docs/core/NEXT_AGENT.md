# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-14 verdict `ritual-loop`: runtime yoksa yine `spawn.ts` same-edge/opener fairness koridoruna donme.
- Run #175-#184 death/death-truth/validation/shell/launch-control/mobile-multitouch/spawn-grace readability hattini yeni overlay, copy, readiness veya orchestration katmani acmak icin bahane yapma.
- `NEXT_AGENT.md` compact kalmali; checklist/backlog dump'i acma.
- Yeni validation/tooling genisletmesi ancak secilen source bug'i dogrudan block ediyorsa kabul edilir.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation, fresh launch control, mobile multi-touch, viewport-anchor ve spawn-grace depth koridorlarina geri donmeden tek yeni gameplay veya UX source bug'i sec. En guclu aday: opener disi pressure/spacing trace'i uretip mid-run arena truth'unda tek bir dar kusur kapatmak.

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Same-edge fairness, death/death-truth, near-miss, validation, fresh launch control, mobile multi-touch, viewport-anchor ve yeni kapanan spawn-grace depth koridorlarina donmeden tek yeni gameplay veya UX source bug'i sec. En guclu adaylar:
- opener disi pressure/spacing trace'i
- active run icinde collision-ready obstacle cluster okunurlugu disinda kalan baska arena truth kusuru
- launch/death copy degil, gercek run hissini bozan baska tekil kontrol veya arena truth kusuru

Guardrails:
- `spawn.ts` opener/same-edge ailesine sample olmadan bir run daha harcama
- Run #175-#184 temizliklerini yeni sistem/refactor paketi bahanesine cevirme
- Yeni overlay, escape-guide, readiness veya preflight katmani acma
- Tek source-level problem sec; helper extraction yalniz o bug'i kapatmak icin gerekiyorsa yap
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
