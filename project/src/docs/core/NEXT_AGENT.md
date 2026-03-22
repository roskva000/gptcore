## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #270 ile `FOLD SNAP -> DRIFT RELEASE` handoff'u ilk kez gercekten baglandi; drift onset'inin ilk `0.8s`i artik `fold-carry` cut olarak son killbox kapanisindan miras alinan daha sert bir lateral crack tasiyor.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- sonraki run yalniz release copy/spectacle polish'i olarak kapanirsa audit bunu yeterli saymayacak
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure haline getirme; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni runtime kontratini kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni `fold-carry` handoff'u etrafinda ikinci bir presentation-only run yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- erken drift zincirini yari yolda birakip shell/retention tarafina dagilma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`33.6-35.0s` rebound tarafina tek yeni bounded runtime karar ani ekle; release'ten acilan lane'i ayni yone tutmanin da maliyeti oldugunu hissettir.**

Hedef:
Killbox authored trap'i artik `32s`de fold-carry ile drift'e baglandi. Sonraki dogru adim ayni handoff'u cila etmek degil; `33.6-35.0s` rebound penceresini release'ten kalan acik lane uzerinde yeni bir `hold-or-cross` kararina cevirip `32-35s` band'ini ikinci kez authored yapmak.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `33.6-35.0s` rebound'u ayni release side uzerinde bounded bir ikinci kapanis/hold davranisina cevir; yeni hazard family acma
2. `runPhase.ts` ve gerekirse mevcut player-facing truth'ta bunu `release'i tuttun, rebound ayni lane'i cezalandirdi` semantigine bagla
3. `telemetry-check.ts` assert'lerini yalniz bu yeni rebound runtime kontrati kadar genislet

Yapma:
- ayni `fold-carry` veya `release cut` tonunu bir kez daha cilalama
- tum `32-40s` zincirini bastan sona yeniden balance etmeye kalkma
- yeni overlay/orchestration/framework katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `32-35s` band'ini artik `fold-carry release -> rebound punish` zinciri olarak hisseder
- source deltasi gameplay odakli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
