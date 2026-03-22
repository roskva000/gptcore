## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #274 ile `41.2-45.6s` handoff'u yeni runtime/gameplay delta kazandi; `RECENTER` sonrasi artik once `FALSE CLEAR` bait'i, sonra daha sert `PRECLEAR SQUEEZE` cash-in'i geliyor. Late 40s band'i generic devam hissinden cikti ama bu yeni ayrim henuz sahne motion'u ve death snapshot tonunda ayri sahiplenilmis degil.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu tur yeni runtime/gameplay delta uretildi; siradaki run ayni runtime'i tekrar tune etmek yerine yeni ayrimi oyuncunun gozunde daha kolay ayirt edilir hale getirebilir
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni player-facing kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- `FALSE CLEAR` veya `PRECLEAR SQUEEZE` runtime degerlerini bir run daha mikro-tune etmeye kalkma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- shell/retention tarafina dagilip gameplay delta'yi erteleme

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `FALSE CLEAR -> PRECLEAR SQUEEZE` ayrimini sahne motion'u ve death snapshot tonunda da ayri okunur hale getir; oyuncu late 40s bait/cash-in farkini yalniz HUD metninden degil gorsel davranistan da algilasin.**

Hedef:
Bu tur runtime farki acildi. Siradaki dogru adim ayni sayisal pencereyi tekrar mutation'a zorlamak degil; `FALSE CLEAR` ile `PRECLEAR SQUEEZE` farkini `GameScene.ts` backdrop motion'u ve `deathPresentation.ts` overlay tonunda da ayristirip gec finale gorunur bir bait-then-cash-in kimligi vermek.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` icinde `false-clear` ile `preclear` icin ayri glow/band/frame motion imzalari ekle; bait slice'i daha hafif bir reopen, squeeze slice'i ise daha sert bir cross-lane close hissettirsin
2. `deathPresentation.ts` icinde `FALSE CLEAR` ve `PRECLEAR SQUEEZE` olumlerini ayri snapshot palette/callout tonuna bagla
3. `telemetry-check.ts` assert'lerini yalniz bu yeni spectacle/snapshot kontrati kadar genislet

Yapma:
- `balance.ts` icinde yeni runtime slice acma
- `36-45.6s` sayilarini tekrar tune etme
- yeni overlay/framework/orchestration katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `41-45.6s` band'inda `FALSE CLEAR` ile `PRECLEAR SQUEEZE` farkini yalniz text degil sahne motion'u ve death snapshot tonundan da ayirt eder
- source deltasi net gameplay/runtime agirlikli olur; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
