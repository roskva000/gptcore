# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `aftershock hold` finali `40s+` eline de baglandi: `39.0-41.2s` band'indaki yeni `recenter` halkasi artik yalniz HUD/arena tarafinda degil, game-over badge/body/prompt tarafinda da ayirt ediliyor.
Run #252 ile zincir `release -> rebound -> late sweep -> aftershock hold -> recenter` oldu; endgame finali generic alternating drift'e hemen donmuyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD/death-copy polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`41s+` sonrasini `60s clear` oncesi yeni bir pre-clear basincla bagla; `recenter` biter bitmez run generic drift/overtime bekleyisine dusmesin.**

Hedef:
Run #252 `recenter` ile `39.0-41.2s` handoff'unu acti ama bu pencerenin arkasinda kalan `41s+` davranis halen hizla generic drift/overtime bekleyisine donebilir. Siradaki is ayni koridorda copy polish yapmak degil; mevcut endgame zincirini `45-60s` tarafina bir onceki halkalardan tureyen bounded basincla baglayip yeni finalin havada kalmasini engellemek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `recenter` sonrasindan `45-60s` eline gecisi daha bagli hale getirecek bounded bir basinç penceresi kur; yeni pencere mevcut drift dilinden turemeli, yeni hazard family olmasin
2. `runPhase.ts` ve `GameScene.ts` tarafinda bu basinçi runtime + player-facing truth'a hizala; mevcut cue/callout/hint yollarini yeniden kullan, yeni overlay sistemi kurma
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, yeni hazard family'si, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier, raw spawn squeeze veya copy churn yapip bunu ilerleme diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- `41s+` davranis `recenter` sonrasinda generic reset gibi degil, mevcut endgame finalinin bagli devami gibi okunur
- yeni basinç `release -> rebound -> late sweep -> aftershock hold -> recenter` zincirini bozmaz; finali daha tutarli kilar
- HUD/arena/callout truth'u yeni runtime davranisi ile hizali kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
