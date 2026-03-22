## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #277 ile `CLEAR CLIMB`in yeni uc halkali finali player-facing entegrasyonunu aldi. `ASCENT STAIR -> RIDGE CUT -> SUMMIT SNAP` artik hem canli cue gecisinde hem death snapshot tonunda ayri okunuyor. Ayni `45.6-60s` sayilarini tekrar tune etme.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu integration turu runtime degistirmeden mevcut clear-climb deltasini sindirdi; siradaki dogru adim yeni runtime/gameplay delta
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni player-facing veya runtime kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- `FALSE CLEAR`, `PRECLEAR SQUEEZE` veya `CLEAR CLIMB` sayilarina geri donup mikro-polish yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`BREAKTHROUGH` sonunu killbox girisine daha keskin baglayan yeni bounded runtime karar ani ac; `10-18s` band'i killbox oncesi bir authored handoff daha kazansin.**

Hedef:
`CLEAR CLIMB` integration kapandi. Siradaki dogru hamle yeni bir gameplay/runtime delta ve bunu farkli bir phase cephesinde acmak. En uygun aday `BREAKTHROUGH`un sonu: `STRAFE FORK -> SURGE SNAP` sonrasinda `18s KILLBOX`e gecmeden hemen once yeni bir bounded cevap anı ekleyip erken-mid run'i daha olayli hale getirmek.

Acilabilecek bagli yuzeyler:
1. `balance.ts` icinde `16.6-18.0s` civarinda yeni tek bir bounded breakthrough-to-killbox handoff slice'i tanimla; yeni hazard family acma
2. `runPhase.ts` uzerinden bu yeni beat'e detail/badge/death summary/retry goal truth'u ver
3. gerekiyorsa `GameScene.ts` ile ayni beat'i hint/callout/spectacle tarafinda sindir
4. `telemetry-check.ts` yalniz yeni runtime ve player-facing kontrat kadar buyusun

Yapma:
- `41-60s` koridoruna geri donme
- yeni overlay/framework/manager katmani acma
- shell veya retention cilasini ana is haline getirme

---

## Success Criteria

- `10-18s` koridoru yeni bir bounded karar ani kazanir ve killbox girisi daha authored hissedilir
- source deltasi gameplay/runtime agirlikli kalir; telemetry yardimci rolde kalir
- deterministic survival headline `30.2s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
