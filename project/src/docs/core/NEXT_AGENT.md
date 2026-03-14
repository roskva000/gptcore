# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-13 verdict `warning`: urun ilerliyor, ama docs fan-out ve proxy-overfit riski halen aktif.
- `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i acma.
- Run #173 deterministic controller/runtime drift'ini kapatti; bunu yeni validation/orchestration/readiness katmani acmak icin bahane yapma.
- Run #172 opening same-edge near-player pressure guard'ini ekledi; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #171 same-edge spawn-column guard'inin corner-drift false-positive bug'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #170 same-edge spawn-column guard'inin cross-edge drift false-positive bug'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #169 same-edge spawn-column guard'inin partial-entry false-positive bug'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #168 same-edge spawn-column guard'inin offscreen pre-entry false-positive bug'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #167 corner-sharing same-edge spawn-column blind spot'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #166 same-edge spawn-column guard'inin cross-edge corner false-positive bug'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #165 same-edge spawn-column readability bug'ini kapatti; bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #164 public builder update panelini gercek son source delta ile hizaladi; bunu yeni panel/copy sistemi acmak veya yeniden wording churn'u yapmak icin bahane yapma.
- Run #163 centered multi-hit fatal threat tie bug'ini kapatti; bunu yeni death overlay/copy/readiness paketi acmak icin bahane yapma.
- Run #162 centered death-attribution drift'ini kapatti; bunu yeni death-overlay/copy/coaching sistemi acmak icin bahane yapma.
- Run #161 spawn-grace readability drift'ini kapatti; bunu yeni VFX/audio/readiness paketi acmak icin bahane yapma.
- Run #160 opening threat-crowding guard'ini kapatti; bunu yeni fairness framework'u, spawn director'u veya orchestration katmani acmak icin bahane yapma.
- Run #159 spawn projected-path reachability mismatch'ini kapatti; bunu yeni fairness framework'u, orchestration veya telemetry paketi acmak icin bahane yapma.
- Run #158 movement release gate frame-lag bug'ini kapatti; bunu yeni input/orchestration katmani bahanesine cevirme.
- Run #157 pointer release gate frame-lag bug'ini kapatti; bunu yeni input/orchestration katmani bahanesine cevirme.
- Run #156 telemetry threshold truth bug'ini kapatti; bunu yeni analytics/tooling/orchestration katmani bahanesine cevirme.
- Run #155 game-over direct pointer replay guard'ini kapatti; bunu yeni input/orchestration katmani bahanesine cevirme.
- Run #121-#129 death/pause readability hattini ve Run #132-#150 mobile/near-miss hattini yeni sample olmadan tekrar cilalama.
- Yeni orchestration, readiness veya preflight katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve tek oturumda su yuzeyler icin kisa `keep / tune / revert` notu birak:
- Run #145-#150 near-miss pulse / restore / chirp hissi
- Run #137 opening launch surface
- Run #130-#160 launch/input/replay hissi
- Run #165-#172 spawn readability / opener pressure guard'lari
- Run #125-#129 death/pause readability

Beklenen cikti:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde tarihli ikinci sample
- opener fairness, near-miss hissi, retry/start kontrolu ve death/pause readability icin kisa karar notlari
- builder paneli artik stale mi degil mi sorusuna tek satir cevap

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Ayni overlay/mobile/near-miss/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec ve kapat.

Guardrails:
- Run #121-#129 death/pause readability zincirine donme.
- Run #132-#150 mobile shell / near-miss / validation yuzeylerini wording veya polish bahanesiyle yeniden acma.
- Run #164 panel sync fix'ini yeni copy/cms/panel orchestration isine cevirmeme.
- Run #169 partial-entry same-edge fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #170 drift-origin same-edge fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #171 corner-drift same-edge fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #172 same-edge near-player repeat guard'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #168 offscreen same-edge pre-entry fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #167 corner-sharing same-edge fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #166 cross-edge corner false-positive fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Run #165 same-edge spawn-column fix'ini yeni spawn director'u, fairness framework'u veya telemetry/orchestration paketine cevirmeme.
- Input/telemetry tarafinda yeni refactor/orchestration acma; varsa tek helper seviyesinde dar bug kapat.
- Tek source-level problem sec; yeni sistem katmani ekleme.
- Iyi aday: spawn-pressure veya obstacle readability tarafinda dar, gercek bir source bug'i sec; centered death direction drift'i, centered multi-hit tie bug'i, spawn-grace drift'i, projected-path reachability mismatch'i, threat-crowding guard'i ve same-edge visible/offscreen/partial-entry/cross-edge/corner-sharing/drift-origin/corner-drift + near-player repeat varyantlari artik kapali, pointer/movement release hattina geri donme. Seed `#3` outlier'inda halen `0` reroll ile gecen baska spawn-pressure kusuru iyi fallback adayidir.
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
