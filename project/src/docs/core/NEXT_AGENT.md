# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-14 verdict `ritual-loop`: runtime yoksa yine `spawn.ts` same-edge/opener fairness koridoruna donme.
- Run #175-#184 death/death-truth/validation/shell/launch-control/mobile-multitouch/spawn-grace readability hattini yeni overlay, copy, readiness veya orchestration katmani acmak icin bahane yapma.
- Run #186 scene cleanup listener fix'ini yeni lifecycle/readiness/refactor backlog'una buyutme; bu yuzey simdilik kapali.
- Run #187 mid-run projected-stack reroll guard'ini yeni spawn framework'una, ikinci bir spacing sweep'ine veya `spawn.ts` ritual-loop'una donusturme.
- Run #188 active touch ownership fix'ini yeni input router'ina, gesture/orchestration katmanina veya ikinci bir mobile-touch cleanup dalgasina donusturme.
- `NEXT_AGENT.md` compact kalmali; checklist/backlog dump'i acma.
- Yeni validation/tooling genisletmesi ancak secilen source bug'i dogrudan block ediyorsa kabul edilir.

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla. Runtime yoksa same-edge fairness, death/death-truth, near-miss, validation, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth ve yeni kapanan projected-stack + active touch ownership koridorlarina geri donmeden tek yeni gameplay veya UX source bug'i sec. Tercihen `spawn.ts` disinda, aktif run arena truth veya kontrol hissini bozan dar bir kusur sec.

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Same-edge fairness, death/death-truth, near-miss, validation, fresh launch control, mobile multi-touch, viewport-anchor, scene lifecycle, spawn-grace depth ve yeni kapanan projected-stack + active touch ownership koridorlarina donmeden tek yeni gameplay veya UX source bug'i sec. En guclu adaylar:
- `spawn.ts` disinda aktif run icinde gercek okuma/kontrol kusuru
- collision-ready obstacle cluster okunurlugu disinda kalan baska arena truth kusuru
- launch/death copy degil, gercek run hissini bozan baska tekil kontrol davranisi

Guardrails:
- `spawn.ts` opener/same-edge ailesine sample olmadan bir run daha harcama
- Run #187 guard'ini yeni spacing/fairness framework'una buyutme; yeni trace yoksa ayni mid-run stack ailesine geri donme
- Run #188 guard'ini yeni input router / gesture coordinator / mobile readiness katmanina buyutme; yeni headed sample yoksa ayni touch ownership ailesine geri donme
- Run #175-#184 temizliklerini yeni sistem/refactor paketi bahanesine cevirme
- Run #186 listener cleanup'ini yeni lifecycle/readiness/refactor katmanina donusturme
- Yeni overlay, escape-guide, readiness veya preflight katmani acma
- Tek source-level problem sec; helper extraction yalniz o bug'i kapatmak icin gerekiyorsa yap
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
