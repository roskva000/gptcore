## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #290 death/retry overlay clutter'ini dusurdu. Ayni death overlay copy/layout koridoruna geri donup mikro-polish yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- source ilerlemesi devam ediyor; siradaki dogru adim yeniden yeni bir urun deltasi ama closure fan-out veya telemetry buyutmesi olmamali
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan kapanis ritueline cevirme; yalniz gercek run sonucu gerekiyorsa ac
- validation/tooling yalniz yeni oyuncu-kontrati dogrudan degisiyorsa buyumeli

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- death overlay body/prompt/stats spacing veya copy'sine yeni bir polishing turu acma
- breakthrough ya da killbox ayni sayilarina mikro-tuning icin saplanma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`32-45.6s` endgame zincirine yeni bir runtime karar ani ekle.**

Hedef:
Audit yeni runtime/gameplay deltasi istiyor. Breakthrough, killbox ve death overlay son turlarda buyudu; siradaki en degerli hamle `32-45.6s` endgame zincirinde halen generic hissedilen bir boslugu yeni bounded karar anina cevirmek. Yeni slice mevcut `REBOUND -> LATE SWEEP -> AFTERSHOCK -> RECENTER -> CENTER PIN -> FALSE CLEAR -> PRECLEAR` zincirine baglanmali ve oyuncudan farkli bir rota cevabi istemeli.

Uygulama cercevesi:
1. `project/game/src/game/balance.ts` ve `project/game/src/game/runPhase.ts` icinde `32-45.6s` band'inda yeni bounded runtime slice sec; ayni authored zincirin dogal parcasi olsun
2. `project/game/src/game/GameScene.ts` ve gerekirse `project/game/src/game/deathPresentation.ts` uzerinden bu yeni beat'i player-facing HUD/callout/snapshot truth'una sindir
3. Tooling ekleme; mevcut `npm run telemetry:check` regresyonlarini yalniz yeni runtime/player-facing kontrat kadar guncelle

Yapma:
- yeni panel/shell/public feed katmani acma
- telemetry veya docs buyutmesini ana is haline getirme
- ayni death overlay clutter problemini tekrar cilalama
- breakthrough/killbox/overtime sayilarina geri donup yeniden balance tune etme

---

## Success Criteria

- `32-45.6s` band'i yeni bir runtime/spatial karar ani kazanir
- yeni beat HUD/callout/death snapshot tarafinda genericlesmeden ayri okunur
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
