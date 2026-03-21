# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `clear climb` death/retry payoff'una da sindi: `45.6-60s` olumler artik `CLEAR CLIMB` badge'i, `60s CLEAR`e kalan fark ve tek satirlik rematch hedefiyle okunuyor.
Run #255 ile zincir `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` hem runtime hem death/retry truth'unda tamamladi; son stretch artik generic `OVERTIME` veya `Next beat` copy'sine duzlesmiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`clear climb` son stretch'ine daha somut arena davranisi ekle; `45.6-60s` band'i artik yalniz payoff copy'si degil, ekranda fark edilir bir final threat karakteri tasisin.**

Hedef:
Run #255 final-stretch payoff'unu death/retry tarafinda kapatti. Siradaki is ayni metni tekrar cilalamak degil; `45.6-60s` band'ine mevcut zinciri bozmadan daha ayirt edici bir spatial davranis, hazard baski imzasi veya final tell eklemek. Oyuncu bu band'i hem run icinde hem olum sonrasi anlatabilmeli.

Acilabilecek bagli yuzeyler:
1. `balance.ts` tarafinda yeni system acmadan mevcut `drift`/late-final davranisina bounded bir `clear climb` baski imzasi ekle; phase sayisini arttirma
2. `runPhase.ts` ve `GameScene.ts` tarafinda bu yeni final behavior'u mevcut HUD/callout/spectacle truth'una sindir
3. deterministic regression ekle; tooling genisletmesini ana is yapma

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bu isi sirf copy/HUD polish'ine indirgeme
- retention/shell/tooling'i ikinci tema olarak acma

---

## Success Criteria

- `45.6-60s` band'i run icinde diger endgame halkalarindan ayri, fark edilir bir final threat karakteri kazanir
- yeni final behavior mevcut `clear climb` payoff ve death/retry truth'u ile hizali kalir
- `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` zinciri bozulmaz
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
