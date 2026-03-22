## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #286 ile `64.0-68.0s` band'i `HOUSE CUT` overtime carry'sine donustu. Ayni `60.0-68.0s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- yeni runtime/gameplay delta devam etti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez yeni overtime zincirini tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `BANKED AIR`, `CASH OUT` veya `HOUSE CUT` copy'sine geri donup ayni problemi tekrar cilalama
- shell/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`68.0s+` sonrasina ikinci bir overtime consequence ya da baska bir gameplay cephesinde ayni buyuklukte yeni runtime karari ac; `HOUSE CUT` sonrasini tekrar generic cadence'e dusurmeden replay istegini bir kat daha buyut.**

Hedef:
`60.0-68.0s` artik authored bir overtime zinciri. Siradaki en guclu hamle, bu zincirin bir onceki halkalarini polish etmek degil ya `68s+` sonrasi ikinci bir overtime kararini acmak ya da benzer etkide yeni bir gameplay ailesiyle urunu yatay buyutmektir.

En guclu adaylar:
1. `68.0-72.0s` band'inda tek yeni bounded overtime sonuc ekle; `HOUSE CUT` sonrasi generic cadence yerine yeni bir break-or-stay slice ac
2. overtime koridoruna geri donmek istemiyorsan retention/gameplay bagli yeni bir authored karar ani sec; ama salt shell/copy calismasi yapma

Yapma:
- `60.0-68.0s` sure/rotation/lag sayilarini polish bahanesiyle tekrar tune etme
- banked-air/cash-out/house-cut snapshot polish zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda `68s+` sonrasinda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
