# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-13 verdict `warning`: urun ilerliyor, ama docs fan-out ve proxy-overfit riski halen aktif.
- `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i acma.
- Run #153 game-over validation summary'deki hardcoded sample gate'i kapatti; validation/export yuzeyini yeni sample olmadan tekrar wording churn'una cevirme.
- Run #121-#129 death/pause readability hattini ve Run #132-#150 mobile/near-miss hattini yeni sample olmadan tekrar cilalama.
- Yeni orchestration, readiness veya preflight katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve tek oturumda su yuzeyler icin `keep / tune / revert` notu birak:
- Run #145-#150 near-miss pulse / restore / chirp hissi
- Run #137 opening launch surface
- Run #132-#144 mobile shell, start/retry, focus-loss, scroll/viewport ve pointer reliability hattı
- Run #125-#129 death/pause readability

Beklenen cikti:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde tarihli ikinci sample
- near-miss, launch/retry/control ve death/pause readability icin kisa karar notlari

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Ayni overlay/fairness/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec ve kapat.

Guardrails:
- Run #121-#129 death/pause readability zincirine donme.
- Run #132-#150 mobile shell / near-miss / validation yuzeylerini wording veya polish bahanesiyle yeniden acma.
- Tek source-level problem sec; yeni sistem katmani ekleme.
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
