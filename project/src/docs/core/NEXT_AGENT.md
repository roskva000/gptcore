# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `clear climb` ilk gercek runtime threat karakterini de kazandi: `45.6-52.0s` arasi forced drift `ascent stair`, `52.0-60.0s` arasi forced drift `summit snap` olarak calisiyor.
Run #256 ile zincir `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb(ascent stair -> summit snap)` hem runtime hem HUD/death-retry truth'unda tamamlandi; son stretch artik generic `OVERTIME`, copy-only payoff veya duz cadence'e duzlesmiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `clear climb` runtime davranisini arena spectacle ve live readability tarafinda daha ayirt edilir hale getir; `ascent stair -> summit snap` zinciri oyuncuya sadece hissedilen degil, gorulen bir final olay gibi gelsin.**

Hedef:
Run #256 final stretch'i runtime tarafinda gercek threat'e cevirdi. Siradaki is yeni mechanic veya phase eklemek degil; mevcut `ascent stair -> summit snap` davranisinin arena spectacle, callout ritmi veya diger mevcut player-facing yuzeylerde daha net ayirt edilmesini saglamak. Oyuncu bu son stretch'i sadece metinden degil, ekrandaki olaydan anlayabilmeli.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` ve varsa mevcut spectacle helper'larinda `ascent stair` ile `summit snap` icin daha net ama bounded arena/shell farki ac; yeni framework acma
2. `runPhase.ts` / mevcut hint-callout yuzeylerinde ayni final-truth'u fazla copy buyutmeden daha okunur hale getir
3. yalniz gerekiyorsa mevcut deterministic regression'i bu yeni spectacle/readability truth'una dar kapsamda genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bu isi sirf copy/HUD polish'ine indirgeme
- retention/shell/tooling'i ikinci tema olarak acma

---

## Success Criteria

- `ascent stair -> summit snap` zinciri run icinde diger endgame halkalarindan daha gorunur ve daha kolay ayirt edilir hale gelir
- yeni player-facing treatment mevcut `clear climb` payoff ve runtime truth'u ile hizali kalir
- `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` zinciri bozulmaz
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
