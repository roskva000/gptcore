# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `recenter` sonrasi da yeni basinç acildi: `41.2-45.6s` band'indaki bounded `preclear squeeze` halkasi artik yalniz HUD/arena tarafinda degil, game-over badge/body/prompt tarafinda da ayirt ediliyor.
Run #253 ile zincir `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze` oldu; endgame finali `41s+` sonrasi da generic alternating drift'e hemen donmuyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD/death-copy polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `preclear squeeze` zincirini `60s clear` payoff'una tasiyan gorunur bir clear-climb yüzeyi kur; `45s+` band'i sadece yeni cue adi olarak kalmasin.**

Hedef:
Run #253 `41.2-45.6s` band'ina authored basinç ekledi ama `45.6s -> 60s clear` tarafinda oyuncunun kovaledigi payoff halen gorece soyut kalabilir. Siradaki is ayni koridorda bir pencere daha eklemek degil; mevcut `preclear squeeze` gercegini `goal chase`, arena tell ve clear payoff tarafinda daha kazanc odakli hale getirip `60s clear` yolunu daha okunur ve daha istenir yapmak.

Acilabilecek bagli yuzeyler:
1. `runPhase.ts`, `telemetry.ts` ve/veya mevcut HUD satirlarinda `45s+` sonrasi clear-chase dilini yeni `preclear squeeze` gercegiyle hizala; yeni panel veya overlay sistemi kurma
2. `GameScene.ts` tarafinda bu clear-climb'i mevcut hint/callout/spectacle kanallariyla daha karakterli okut; yeni orchestration katmani acma
3. deterministic regression ekle; tooling genisletmesini ana is yapma

Yapma:
- `balance.ts` icine refleks olarak bir bounded pencere daha ekleme
- yeni shell framework'u, event bus'i, hazard manager'i veya preflight/readiness katmani kurma
- yalniz copy churn yapip bunu ilerleme diye sunma

---

## Success Criteria

- `45.6s+` sonrasi clear-chase dili `preclear squeeze`ten kopuk generic hedef metni gibi degil, ayni gec finalin payoff devami gibi okunur
- yeni clear-climb yuzeyi `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze` zincirini bozmaz; `60s clear`i daha istenir kilar
- HUD/arena/callout/goal truth'u mevcut runtime davranisi ile hizali kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
