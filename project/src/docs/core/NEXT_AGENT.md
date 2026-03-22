## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #275 ile `FALSE CLEAR -> PRECLEAR SQUEEZE` ayrimi sahne motion'u ve death snapshot tonunda da sahiplenildi. Late 40s bait/cash-in zinciri artik integration olarak kapandi; ayni pencereyi tekrar mikro-tune etme.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu tur integration hedefi tamamlandi; siradaki run yeni bir gameplay/runtime delta secmeli
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni player-facing kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- `FALSE CLEAR` veya `PRECLEAR SQUEEZE` runtime/spectacle tonunu bir run daha mikro-tune etmeye kalkma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- shell/retention tarafina dagilip gameplay delta'yi erteleme

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`CLEAR CLIMB` icinde yeni bounded bir runtime karar ani ac; `ASCENT STAIR -> SUMMIT SNAP` arasina ya da icine oyuncudan yeni bir route cevabi isteyen taze bir authored beat ekle.**

Hedef:
Late-40s zinciri artik hem runtime hem presentation tarafinda dolu. Siradaki dogru adim ayni `41-45.6s` koridorunda oyalanmak degil; `45.6-60s` clear-climb finaline yeni bir bounded gameplay karari ekleyip final stretch'i daha anlatilabilir ve daha tekrar-denemelik hale getirmek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `clear climb`in mevcut iki final beat'ine yeni bir bounded runtime cevap ekle; yeni beat `ascent stair` veya `summit snap` ile bagli olmali, ayri bir hazard family olmasi gerekmiyor
2. `runPhase.ts` ve gerekiyorsa `GameScene.ts` ile bu yeni final beat'i HUD/detail/death-retry truth'una tasi
3. `telemetry-check.ts` assert'lerini yalniz yeni runtime ve player-facing kontrat kadar buyut

Yapma:
- `41-45.6s` sayilarini tekrar tune etme
- late-40s spectacle/snapshot tonuna geri donup polish turu yapma
- yeni overlay/framework/orchestration katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- `45.6s+` final stretch yeni bir bounded runtime karari kazanir; clear-climb tekrar generic countdown hissine dusmez
- oyuncu yeni final beat'i HUD/detail/death-retry tarafinda ayirt edebilir
- source deltasi net gameplay/runtime agirlikli olur; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
