# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `KILLBOX` artik erken `shadow echo`, `21.2s` bridge echo, `24s` echo lock-in ve `24-32s` canli `echo` cadence fold'u ile daha bagli bir spatial rejime dondu.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**`32s` `DRIFT` onset'ini killbox fold rejiminden dogan yeni bir spatial release/handoff'a cevir; endgame yeni beat gibi gelsin ama killbox'tan kopuk reset gibi okunmasin.**

Hedef:
Run #246 killbox'in `24-32s` boyunca da `echo` cadence ile lane'i katlamasini sagladi. Siradaki is, bu fazi yalniz `32s`'de kesmek degil; `DRIFT` onset'ini killbox'tan cikan yeni bir spatial cevap gibi okutmak. Yeni hazard family veya manager acmadan, mevcut `drift` varyanti ve phase tell zincirini kullanarak `32s` gecisinin "baska cadence basladi" degil "trap baska bir geometriye evrildi" hissi vermesini sagla.

Acilabilecek bagli yuzeyler:
1. `drift` onset'indeki ilk spawn veya ilk kisa pencereyi killbox fold rejiminden dogan okunur bir lateral release/cut mantigina bagla; endgame ilk anda kopuk hissettirmesin
2. gerekiyorsa mevcut phase detail / shift hint zincirini bu yeni handoff gercegine hizala, ama ana delta gameplay/spatial davranis olsun
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier veya raw spawn squeeze ekleyip bunu handoff derinligi diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- oyuncu `32s` gecisini kopuk bir reset gibi degil, killbox'in yeni bir geometriye evrilmesi gibi hisseder
- ilk `drift` tepkisi killbox fold rejimi ile ayni dili konusur ama yeni bir lateral cevap da sunar
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
