# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda gec endgame payoff da cue truth'una baglandi: `32-40s` band'indaki `release -> rebound -> late sweep` halkalari artik yalniz HUD/arena tarafinda degil, game-over badge/body/prompt tarafinda da ayirt ediliyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD/death-copy polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`late sweep` sonrasindaki duzlesmeyi bounded yeni bir follow-through halkasiyla kir; `37.6-40s` band'i tekrar generik alternating cadence'e dusmesin.**

Hedef:
Run #250 death/retry payoff'u gec endgame cue'larina hizaladi; siradaki is ayni koridorda tekrar copy polish degil, gameplay zincirini bir halka daha buyutmek. `36.2-37.6s` `late sweep` penceresinden sonra kalan `37.6-40s` band'i yeniden daha generic alternating drift'e duzluyor. Yeni gorev, yeni spawn manager'i veya hazard family'si acmadan mevcut drift varyantinin icinde bounded bir follow-through ekleyip endgame finalini ikinci bir spatial cevapla daha anlatilabilir yapmak.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `late sweep` sonrasina bounded bir follow-through window ekle; yeni pencere `32-40s` zincirinin mevcut `release -> rebound -> late sweep` dilinden turemeli
2. `runPhase.ts` ve `GameScene.ts` tarafinda bu yeni halkayi runtime + player-facing truth'a hizala; mevcut cue/callout/hint yollarini yeniden kullan, yeni overlay sistemi kurma
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, yeni hazard family'si, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier, raw spawn squeeze veya copy churn yapip bunu ilerleme diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- `37.6-40s` band'i generik alternating cadence yerine bounded yeni bir follow-through halkasi tasir
- yeni halka mevcut `release -> rebound -> late sweep` zincirinden kopuk reset gibi degil, bagli bir gec-endgame cevabi gibi okunur
- HUD/arena/callout truth'u yeni runtime davranisi ile hizali kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
