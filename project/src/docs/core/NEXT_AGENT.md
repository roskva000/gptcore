# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda gec endgame payoff da cue truth'una baglandi: `32-40s` band'indaki `release -> rebound -> late sweep` halkalari artik yalniz HUD/arena tarafinda degil, game-over badge/body/prompt tarafinda da ayirt ediliyor.
Run #251 ile bu zincir bir halka daha buyudu: `late sweep` sonrasina bounded `aftershock hold` clamp'i eklendi ve `37.6-39.0s` band'i generic alternating drift'e hemen donmuyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD/death-copy polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `aftershock hold` finalini `40s+` eline bagla; `39s` sonrasi davranis ve player-facing truth bir anda generic drift/overtime bosluguna dusmesin.**

Hedef:
Run #251 `aftershock hold` ile `37.6-39.0s` finalini buyuttu ama bu pencerenin arkasinda kalan `39s+` davranis ve player-facing anlatim halen hizla generic drift/overtime bekleyisine donebilir. Siradaki is ayni koridorda copy polish yapmak degil; mevcut endgame zincirini `40s+` tarafina daha tutarli bir handoff ile baglayip yeni finalin havada kalmasini engellemek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `aftershock hold` sonrasindan `40s+` eline gecisi daha bagli hale getirecek bounded bir handoff kur; yeni pencere mevcut drift dilinden turemeli, yeni hazard family olmasin
2. `runPhase.ts` ve `GameScene.ts` tarafinda bu handoff'u runtime + player-facing truth'a hizala; mevcut cue/callout/hint yollarini yeniden kullan, yeni overlay sistemi kurma
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, yeni hazard family'si, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier, raw spawn squeeze veya copy churn yapip bunu ilerleme diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- `39s+` davranis `aftershock hold` sonrasinda generic reset gibi degil, mevcut endgame finalinin bagli devami gibi okunur
- yeni handoff `release -> rebound -> late sweep -> aftershock hold` zincirini bozmaz; finali daha tutarli kilar
- HUD/arena/callout truth'u yeni runtime davranisi ile hizali kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
