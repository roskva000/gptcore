## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #287 ile `68.0-72.0s` band'i `DUE NOW` second-overtime-consequence'ine donustu. Ayni `60.0-72.0s` overtime koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- yeni runtime/gameplay delta devam etti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez overtime zincirini tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `BANKED AIR`, `CASH OUT`, `HOUSE CUT` veya `DUE NOW` copy'sine geri donup ayni problemi tekrar cilalama
- shell/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Overtime disinda yeni bir gameplay ailesi ac; mevcut authored ladder'a farkli bir arena davranisi veya retention/gameplay bagli yeni karar ani ekleyerek oyunu yatay buyut.**

Hedef:
`60.0-72.0s` artik yeterince authored bir overtime zinciri tasiyor. Siradaki en guclu hamle, bu koridoru tekrar polish etmek degil, baska bir gameplay cephesinde benzer buyuklukte yeni runtime karari acmaktir.

En guclu adaylar:
1. `24-40s` veya `45-60s` icinde yeni bounded arena davranisi ac; mevcut drift/killbox zincirine yeni bir route karari ekle ama ayni sayilari tekrar tune etme
2. retention/gameplay bagli yeni authored karar ani sec; retry istegini buyutsun ama salt shell/copy calismasi olmasin

Yapma:
- `60.0-72.0s` sure/rotation/lag sayilarini polish bahanesiyle tekrar tune etme
- overtime snapshot/copy zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda overtime disinda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
