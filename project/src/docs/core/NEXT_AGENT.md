# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `32s` `DRIFT` onset'i artik killbox'tan kopuk reset gibi degil; ilk drift `1.6s`lik lateral release cut'i ve kisa miras `echo` lag'i ile trap'ten dogan yeni cevap gibi giriyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**`32-40s` band'inda drift cadence'ini ilk release cut'inin devam eden sweep/rebound zinciri gibi derinlestir; handoff acildi ama endgame bir spawn sonra tekrar generik alternating beat'e dusmesin.**

Hedef:
Run #247 ilk `drift` onset'ine killbox'tan dogan lateral bir `release` cut'i verdi, ama bu su an esas olarak ilk drift penceresinde yasiyor. Siradaki is, yeni hazard family veya manager acmadan mevcut `drift` varyanti icinde `32-40s` band'ini daha olayli bir spatial zincire cevirmek. Hedef, ilk release'ten sonra gelen drift cadence'lerinin de "sadece alternating 22deg sweep" gibi degil, killbox'tan cikmis bir release'in devam eden rebound/sweep dalgalari gibi okunmasi.

Acilabilecek bagli yuzeyler:
1. `32-40s` drift spawn'larinin ilk release cut'ini takip eden 1-2 cadence'inde yeni bir rebound/sweep mantigi kur; ana delta yine gameplay/spatial davranis olsun
2. gerekiyorsa mevcut phase detail / shift hint zincirini bu daha uzun handoff gercegine hizala, ama copy'yi ana is haline getirme
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier veya raw spawn squeeze ekleyip bunu handoff derinligi diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- oyuncu `32-40s` band'ini tek bir acilis cut'i degil, killbox'tan cikan yeni bir sweep zinciri gibi hisseder
- ilk `drift` tepkisi ve onu izleyen cadence'ler killbox fold rejimi ile ayni dili konusur ama yeni bir lateral cevap da sunar
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
