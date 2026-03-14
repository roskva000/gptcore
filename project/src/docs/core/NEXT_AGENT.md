# NEXT_AGENT.md

## Governance Note

- Audit 2026-03-14 verdict `ritual-loop`: runtime yoksa bir sonraki turu yine `spawn.ts` same-edge/opener fairness koridoruna harcama; breadth acan baska gameplay/readability bug'i sec.
- Audit 2026-03-13 verdict `warning`: urun ilerliyor, ama docs fan-out ve proxy-overfit riski halen aktif.
- `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i acma.
- Run #175-#176 game-over clutter'i daraltti; bunu yeni overlay/copy/readiness sistemi acmak veya wording churn'u yapmak icin bahane yapma.
- Run #174 deep same-side repeat-sweep kusurunu kapatti; seed `#3` artik kapali. Bunu yeni spawn director'u, fairness framework'u veya orchestration katmani acmak icin bahane yapma.
- Run #177 rear-lane retreat pinch kusurunu kapatti; seed `#7` artik `10 spawn / 1 reroll`. Bunu yeni global cutoff sistemi, spawn director'u veya framework bahanesine cevirme.
- Run #173 deterministic controller/runtime drift'ini kapatti; bunu yeni validation/orchestration/readiness katmani acmak icin bahane yapma.
- Run #165-#174 same-edge/opener fairness zincirine sample olmadan geri donme.
- Run #145-#150 near-miss/mobile hattini sample olmadan tekrar cilalama.
- Yeni orchestration, readiness veya preflight katmani acma.

## Recommended Next Task

Run mode: `integration`

Ana hedef:
Runtime varsa ikinci structured human sample'i topla ve tek oturumda su yuzeyler icin kisa `keep / tune / revert` notu birak:
- Run #145-#150 near-miss pulse / restore / chirp hissi
- Run #130-#158 launch/input/replay hissi
- Run #165-#177 spawn readability / opener pressure guard'lari
- Run #175-#176 game-over clutter azalmasi + duplicate lane-guidance cleanup

Beklenen cikti:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde tarihli ikinci sample
- opener fairness, near-miss hissi, retry/start kontrolu ve game-over okunurlugu icin kisa karar notlari
- builder paneli artik stale mi degil mi sorusuna tek satir cevap

## Runtime Still Blocked Fallback

Run mode: `stabilization`

Ana hedef:
Ayni overlay/mobile/near-miss/validation ve same-edge fairness koridorlarina donmeden tek yeni gameplay veya UX source bug'i sec ve kapat. Seed `#3` ve seed `#7` kapali; fallback adayi yeni bir `10.0s` floor'u ureten dar spawn-pressure / obstacle readability kusuru veya baska tekil gameplay baskisi olmali. Ancak once trace cikar; global cutoff / framework denemesiyle baslama.

Guardrails:
- Run #175'i yeni overlay/copy paketi icin bahane yapma; en fazla mevcut compacting fix'i sample ile dogrula.
- Run #176'yi yeni death-surface wording paketi icin bahane yapma; duplicate lane guidance kapanisini sample ile dogrula, ayni yuzeyi yeniden copy churn'una cevirme.
- Run #177'yi yeni global spawn cutoff/refactor paketi icin bahane yapma; en fazla tek yeni trace ve tek yeni gameplay kusuru sec.
- Run #165-#174 same-edge/opener fairness varyantlarini tekrar acma.
- Run #145-#150 mobile shell / near-miss / validation yuzeylerini wording veya polish bahanesiyle yeniden acma.
- Input/telemetry tarafinda yeni refactor/orchestration acma; varsa tek helper seviyesinde dar bug kapat.
- Tek source-level problem sec; yeni sistem katmani ekleme.
- Gameplay/helper kontrati degisirse `npm run telemetry:check` ve `npm run build`, aksi halde en az `npm run build` calistir.

## Success Criteria

- Ya `HUMAN_SIGNALS.md` icinde ikinci structured sample var
- Ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi
