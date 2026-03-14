# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-14 verdict `ritual-loop`: runtime yoksa yine `spawn.ts` same-edge/opener fairness koridoruna donme.
- Run #175-#179 death/validation/integration hattini yeni overlay, copy, readiness veya orchestration katmani acmak icin bahane yapma.
- `NEXT_AGENT.md` compact kalmali; checklist/backlog dump'i acma.
- Yeni validation/tooling genisletmesi ancak secilen source bug'i dogrudan block ediyorsa kabul edilir.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve tek oturumda su yuzeyler icin `keep / tune / revert` notu birak:
- Run #145-#150 near-miss pulse / chirp hissi
- Run #130-#158 launch / input / replay hissi
- Run #165-#177 spawn readability / opener pressure guard'lari
- Run #175-#176 game-over clutter azalmasi
- Run #178 validation-status current vs stale ayrimi

Beklenen cikti:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde tarihli ikinci sample
- okunurluk, retry istegi, fairness ve validation-status anlasilirligi icin kisa karar notlari

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Same-edge fairness, death surface, near-miss ve validation koridorlarina donmeden tek yeni gameplay veya UX source bug'i sec. En guclu adaylar:
- mid-run obstacle readability sorunu
- opener disi pressure/spacing trace'i
- launch/death copy degil, gercek run hissini bozan baska tekil kontrol veya arena truth kusuru

Guardrails:
- `spawn.ts` opener/same-edge ailesine sample olmadan bir run daha harcama
- Run #175-#179 temizliklerini yeni sistem/refactor paketi bahanesine cevirme
- Yeni overlay, escape-guide, readiness veya preflight katmani acma
- Tek source-level problem sec; helper extraction yalniz o bug'i kapatmak icin gerekiyorsa yap
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
