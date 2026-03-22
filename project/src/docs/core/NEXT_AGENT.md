## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #273 ile `LATE SWEEP -> SWEEP LOCK -> AFTERSHOCK HOLD` zinciri sahne motion'u ve death snapshot tonunda da ayrildi; gec endgame chain'i artik yalniz HUD/copy degil, glow/band/frame ve overlay palette'i uzerinden de okunuyor.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- integration slice tamamlandi; siradaki run yeni runtime/gameplay delta uretmeli
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni player-facing kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni `late sweep / sweep lock / aftershock` zincirini bir run daha polish etmeye kalkma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- shell/retention tarafina dagilip gameplay delta'yi erteleme

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`40-45.6s` band'ina yeni bounded runtime karar ani ekle; `RECENTER -> PRECLEAR SQUEEZE` handoff'u generic devam hissinden cikarip oyuncuya yeni bir mekansal cevap soran slice'a cevir.**

Hedef:
`32-39s` zinciri artik runtime + spectacle + snapshot tarafinda okunur. Siradaki dogru adim ayni late chain'i tekrar cilalamak degil; `40s` sonrasi handoff'ta yeni bir gameplay sonucu acmak. Yeni beat `recenter` ile `preclear` arasinda ya da `preclear` icinde bounded olmali, mevcut `60s clear` push'una baglanmali ve yeni hazard family acmadan route kararini sertlestirmeli.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `40-45.6s` band'ina tek bir yeni bounded drift davranisi ekle; oyuncunun mevcut recenter cizgisini bir beat daha bozsun
2. `runPhase.ts` icinde yeni cue truth'unu detail/badge/death/retry zincirine bagla
3. `telemetry-check.ts` assert'lerini yalniz bu yeni runtime kontrati kadar genislet

Yapma:
- `36-39s` sweep zincirini yeniden tune etme
- shell/HUD/death snapshot polish run'ina kayma
- yeni overlay/framework/orchestration katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `40-45.6s` band'inda yeni bir bounded route karari hisseder; recenter/preclear artik generic handoff gibi okunmaz
- source deltasi net gameplay/runtime agirlikli olur; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
