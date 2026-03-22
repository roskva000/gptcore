## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #285 ile `60.0-64.0s` band'i `BANKED AIR -> CASH OUT` overtime opener'ina donustu. Ayni `60.0-64.0s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- yeni runtime/gameplay delta devam etti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez yeni opener'i tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `BANKED AIR` veya `CASH OUT` copy'sine geri donup ayni problemi tekrar cilalama
- shell/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`64.0s+` sonrasina ilk bounded overtime carry'yi ac; `BANKED AIR -> CASH OUT` sonrasini tekrar generic score baskisina dusurmeden yeni bir mekansal follow-through ile buyut.**

Hedef:
`60s CLEAR` artik yeni bir opener'a sahip. Siradaki en guclu hamle, ayni opener'i polish etmek degil `64s+` sonrasi ilk birkaç saniyeyi yeni bir overtime kararina cevirmek. Bu, overtime'i anlatilabilir bir ikinci katmana tasir ve replay istegini acikca buyutur.

En guclu aday:
1. `64.0-68.0s` band'inda tek yeni bounded overtime beat'i ekle; `CASH OUT` sonrasi generic cadence yerine yeni bir hold-or-break sonucu ureten slice ac
2. bunu yaparken sadece runtime + gerekli player-facing truth'u ekle; tek basina shell/panel/copy calismasi yapma

Yapma:
- `60.0-64.0s` opener sayilarini yeniden tune etme
- banked-air/cash-out snapshot polish zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda `64s+` sonrasinda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
