# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `KILLBOX` onset'i artik tek spike degil; ilk zorunlu `lead` cut'in arkasina kisa bir `shadow echo` follow-through'u eklendi.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Erken killbox follow-through'unu `24s` sonrasi gercek `echo` cadence'ine bagla; 18-24s band'ini tek seferlik onset degil, devam eden bir spatial state gibi okut.**

Hedef:
Run #244 killbox onset'ine kisa bir `shadow echo` follow-through'u ekledi. Siradaki is, bu erken pinch ile `24s` sonrasi normal `echo` cadence'i arasindaki kopuklugu azaltmak. Yeni hazard family veya yeni manager acmadan, mevcut `echo` cadence'i, mevcut `lead` cadence'i ve mevcut phase/spectacle truth'lerinden yararlanarak 18-24s band'ini ayni spatial rejimin farkli adimlari gibi hissettir.

Acilabilecek bagli yuzeyler:
1. `24s` unlock anindaki ilk normal `echo`yu erken killbox follow-through ile ayni dili konusacak sekilde hizala; oyuncu yeni state'in devam ettigini hissetsin
2. gerekiyorsa mevcut arena spectacle / phase detail zincirini bu handoff'u destekleyecek kadar hizala, ama ana delta gameplay/spatial davranis olsun
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier veya raw spawn squeeze ekleyip bunu state handoff'u diye satma
- killbox disina ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- oyuncu `18-24s` killbox band'inin tek onset degil, devam eden bir spatial baski rejimi oldugunu hisseder
- erken `shadow echo` ile `24s` sonrasi normal `echo` cadence'i kopuk degil, ayni state'in devami gibi okunur
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
