# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `KILLBOX` onset'i artik ilk zorunlu `lead` cut ile arena icinde hissedilen bir spatial trap anina donustu.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Killbox trap'ini tek anlik ambush olmaktan cikar; mevcut beat'lerden biriyle ikinci bir spatial follow-through yarat.**

Hedef:
Run #243 `18s` killbox girisini ilk `lead` cut ile acikca ayirt edilir hale getirdi. Siradaki is, bu trap'in hemen sonrasinda fazin gerisinin de farkli hissettigini gostermek. Yeni hazard family veya yeni manager acmadan, mevcut `echo`, mevcut `lead` cadence'i, mevcut backdrop/spectacle veya mevcut spawn truth'lerinden biriyle killbox'in "tek spike degil, yeni arena state'i" oldugunu okut.

Acilabilecek bagli yuzeyler:
1. killbox onset sonrasi ilk mevcut beat'i spatial follow-through'a cevir; oyuncu ilk cut'tan sonra da lane'in farkli davrandigini hissetsin
2. gerekiyorsa mevcut arena spectacle / phase hint zincirini bu yeni davranisi destekleyecek kadar hizala, ama ana delta gameplay/spatial davranis olsun
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier veya raw spawn squeeze ekleyip bunu follow-through diye satma
- killbox disina ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- oyuncu `18s+` killbox penceresinde ilk lead cut'tan sonra da fazin farkli bir spatial baski rejimine girdigini hisseder
- yeni davranis mevcut phase ladder ve mevcut threat family'leriyle ayni dili konusur
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
