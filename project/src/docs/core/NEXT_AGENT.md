## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #271 ile `33.6-35.0s` rebound ilk kez `REBOUND HOLD -> REBOUND PUNISH` zincirine bolundu; release lane'ini ayni yone tutmanin da artik bounded bir maliyeti var.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu yeni runtime slice acildi; siradaki run gameplay'i golgeleyecek validation/docs fan-out'una kaymamalı
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz stratejik/baseline degisikligi varsa ac
- `telemetry-check.ts` ancak yeni player-facing kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- ayni `REBOUND PUNISH` slice'ini bastan sona yeniden balance etmeye kalkma
- yeni orchestration / readiness / preflight / manager katmani acma
- deterministic baseline'i gereksiz sarsma
- shell/retention tarafina dagilip erken drift zincirini yari yolda birakma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `REBOUND HOLD -> REBOUND PUNISH` ayrimini sahne ve death snapshot tarafinda da ayri okunur hale getir; oyuncu ayni lane'in ne zaman kisa sure guvenli, ne zaman cezalandirici oldugunu ekranda gorerek anlasin.**

Hedef:
Runtime artik dogru soruyu soruyor ama bu yeni karar aninin sahne/snapshot tonunda ayri imzasi henuz zayif. Sonraki dogru adim yeni mechanic acmak degil; mevcut runtime farkini `GameScene.ts` ve gerekiyorsa `deathPresentation.ts` uzerinden ayri motion/palette truth'una sindirmek.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` icinde `rebound` ve `rebound-punish` cue'larina ayri backdrop/frame/band motion imzalari ver; hold daha same-side sustain, punish ise daha sert cross-back closure hissettirsin
2. `deathPresentation.ts` icinde `REBOUND` ile `REBOUND PUNISH` olumlerini ayri accent/prompt tonu ile ayir
3. `telemetry-check.ts` assert'lerini yalniz bu yeni spectacle/snapshot kontrati kadar genislet

Yapma:
- `balance.ts` uzerinde yeni sweep/aftershock mutation'u acma
- `32-40s` zincirini topluca yeniden tune etme
- yeni overlay/framework/orchestration katmani ekleme
- stratejik degisim yokken docs paketini gereksiz buyutme

---

## Success Criteria

- oyuncu `33.6-35.0s` band'inda `REBOUND HOLD` ile `REBOUND PUNISH` farkini yalniz HUD/copy degil sahnedeki motion ve olum snapshot'inda da ayirt eder
- source deltasi gameplay-support odakli kalir; docs veya telemetry run'i golgelemez
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
