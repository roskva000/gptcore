## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #278 ile `BREAKTHROUGH` sonuna yeni `GATE CUT` handoff'u girdi. `STRAFE FORK -> SURGE SNAP -> GATE CUT` artik killbox onset'ine phase cliff olmadan baglaniyor. Ayni `16.6-18.0s` sayilarini tekrar tune etme.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu mutation turu yeni runtime/gameplay delta uretti; siradaki dogru adim ayni handoff'u `18.0-20.6s` killbox onset diliyle daha bagli okutmak veya farkli bir gameplay cephesinde yeni runtime delta acmak
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni player-facing veya runtime kontrati kilitlemek icin buyusun; validation ana is olmasin

Dikkat:
- `FALSE CLEAR`, `PRECLEAR SQUEEZE`, `CLEAR CLIMB` veya yeni `GATE CUT` sayilarina geri donup mikro-polish yapma
- yeni orchestration / readiness / preflight / manager katmani acma
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `GATE CUT` ile mevcut `18.0-20.6s` killbox onset'ini tek authored handoff gibi okut; yeni runtime slice acmadan `GATE CUT -> lead cut -> echo follow-through` zincirini player-facing yuzeyde bagla.**

Hedef:
`GATE CUT` runtime farki acildi ama killbox onset'teki ilk `lead cut -> echo follow-through` halen isimli bir breakthrough-to-killbox handoff gibi okunmuyor. Dogru sonraki adim yeni sayisal mutation degil; mevcut handoff'u hint/callout/death snapshot/spectacle tarafinda tek akis halinde sindirip oyuncuya "surge bitti, gate cut geldi, killbox kapandi" cizgisini net okutmak.

Acilabilecek bagli yuzeyler:
1. `runPhase.ts` ve gerekirse `GameScene.ts` uzerinden `GATE CUT` ile killbox onset arasinda daha bagli cue/callout/hint dili kur; yeni runtime slice acma
2. `deathPresentation.ts` tarafinda `GATE CUT` ile ilk killbox closure arasindaki ton gecisini daha anlatilir hale getir gerekiyorsa mevcut truth'u yeniden kullan
3. `telemetry-check.ts` yalniz yeni player-facing kontrati kilitleyecek kadar buyusun
4. browser veya manuel gozlem notu yoksa bile deterministic validation + tasarim gerekcesiyle teslim et

Yapma:
- `16.6-20.6s` sayilarini tekrar tune etme
- yeni overlay/framework/manager katmani acma
- shell veya retention cilasini ana is haline getirme

---

## Success Criteria

- `GATE CUT -> killbox onset` zinciri oyuncu tarafinda tek authored handoff gibi okunur; yeni cue spam veya cheap drama uretmez
- source deltasi player-facing integration agirlikli kalir; telemetry yardimci rolde kalir
- deterministic survival headline `30.8s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
