# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-13 verdict `warning`: urun ilerliyor, ama docs fan-out ve proxy-overfit riski halen aktif.
- `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i acma.
- Run #158 movement release gate frame-lag bug'ini kapatti; bunu yeni input/orchestration katmani bahanesine cevirme.
- Run #157 pointer release gate frame-lag bug'ini kapatti; bunu yeni input/orchestration katmani bahanesine cevirme.
- Run #156 telemetry threshold truth bug'ini kapatti; bunu yeni analytics/tooling/orchestration katmani bahanesine cevirme.
- Run #155 game-over direct pointer replay guard'ini kapatti; bunu yeni input/orchestration katmani bahanesine cevirme.
- Run #121-#129 death/pause readability hattini ve Run #132-#150 mobile/near-miss hattini yeni sample olmadan tekrar cilalama.
- Yeni orchestration, readiness veya preflight katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve tek oturumda su yuzeyler icin `keep / tune / revert` notu birak:
- Run #145-#150 near-miss pulse / restore / chirp hissi
- Run #137 opening launch surface
- Run #130-#158 mobile shell, start/retry, focus-loss, scroll/viewport, pointer + keyboard reliability ve telemetry truth hissi
- Run #125-#129 death/pause readability

Beklenen cikti:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde tarihli ikinci sample
- near-miss, launch/retry/control ve death/pause readability icin kisa karar notlari
- ozellikle death-time held touch/click ve held movement key sonrasi replay'in ancak release + fresh press ile acilip acilmadigina dair net not
- `10.0s` gorunen ama gercekte erken olum olan bir run gorebilirsen validation/export algisinin durust kalip kalmadigina dair kisa not

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Ayni overlay/mobile/near-miss/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec ve kapat.

Guardrails:
- Run #121-#129 death/pause readability zincirine donme.
- Run #132-#150 mobile shell / near-miss / validation yuzeylerini wording veya polish bahanesiyle yeniden acma.
- Input/telemetry tarafinda yeni refactor/orchestration acma; varsa tek helper seviyesinde dar bug kapat.
- Tek source-level problem sec; yeni sistem katmani ekleme.
- Iyi aday: spawn-pressure veya obstacle visibility tarafinda dar, gercek bir source bug'i sec; pointer/movement release hattina geri donme.
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
