## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #288 ile `30.4-32.0s` band'i yeni `SLACK CUT` final-handoff'una donustu. Ayni `24-32s` killbox tail'ine geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- yeni runtime/gameplay delta devam etti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez ayni killbox veya overtime koridorunu tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `LOCK DRAG`, `SLACK CUT`, `BANKED AIR`, `CASH OUT`, `HOUSE CUT` veya `DUE NOW` copy'sine geri donup ayni problemi tekrar cilalama
- shell/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Killbox ve overtime disinda yeni bir replay/runtime ailesi ac; retention istegini buyutecek ama salt UI/copy olmayan yeni bir karar ani ekle.**

Hedef:
`24-32s` ve `60-72s` artik yeterince authored. Siradaki en guclu hamle, ayni koridorlari tekrar polish etmek degil, farkli bir gameplay cephesinde benzer buyuklukte yeni bir route karari veya retry kancasi acmaktir.

En guclu adaylar:
1. `45-60s` veya `10-18s` icinde yeni bounded arena davranisi ac; mevcut authored ladder'a yeni bir route-break veya reopen/cash-in halkasi ekle ama ayni sayilari tekrar tune etme
2. near-miss veya retry istegine bagli retention/gameplay slice'i ac; yeni runtime sonucu olsun, salt shell/copy calismasi olmasin

Yapma:
- `24.0-32.0s` sure/rotation/lag sayilarini polish bahanesiyle tekrar tune etme
- `60.0-72.0s` overtime snapshot/copy zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda killbox/overtime disinda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.9s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
