# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `32s` `DRIFT` onset'i artik killbox'tan kopuk reset gibi degil; ilk drift `1.6s`lik lateral release cut'i ve kisa miras `echo` lag'i ile trap'ten dogan yeni cevap gibi giriyor.
Run #248 bunu derinlestirdi: `32-40s` band'inda artik bounded `rebound` ve `late sweep` halkalari var; runtime truth zinciri release -> rebound -> sweep olarak akiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Run #248'in release -> rebound -> sweep zincirini oyuncu tarafinda daha okunur ve daha heyecanli hale getir; endgame runtime'ta buyudu, simdi arena/HUD feedback de ayni hikayeyi anlatmali.**

Hedef:
Run #248 endgame davranisini buyuttu ama bu buyume su an agirlikla gameplay truth ve phase copy tarafinda. Siradaki is, yeni hazard family veya orchestration katmani acmadan mevcut `release`, `rebound` ve `late sweep` windows'unu arena spectacle / HUD / shift hint zincirinde daha ayirt edilebilir kilmak. Hedef, oyuncunun `32-40s` band'ini sadece hissetmesi degil, ekranda da "killbox acildi, rebound geldi, sweep karsiya kirildi" diye okuyabilmesi.

Acilabilecek bagli yuzeyler:
1. `GameScene` veya mevcut spectacle helper'larinda `release`, `rebound` ve `late sweep` windows'una bagli kisa ama ayirt edilebilir arena/HUD feedback kur; ana delta oyuncunun bu zinciri okuyabilmesi olsun
2. gerekiyorsa mevcut phase detail / shift hint / onset pulse zincirini bu yeni late-band hikayesine hizala, ama yalniz copy polish'i yapma
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier, raw spawn squeeze veya copy churn yapip bunu ilerleme diye satma
- ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

 - oyuncu `32-40s` band'inda release, rebound ve late sweep halkalarini ekranda ayirt edebilir
 - yeni feedback zinciri gameplay truth'u destekler; drift band'i daha olayli gorunur ama cheap spectacle spam'e donmez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
