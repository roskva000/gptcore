## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #284 ile `45.6-60.0s` clear-climb finali `ASCENT STAIR -> LEDGE FEINT -> RIDGE CUT -> CREST VEER -> SUMMIT SNAP` zincirine cikti. Ayni `45.6-60.0s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu mutation turu yeni runtime/gameplay delta uretti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez clear-climb koridorunu tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `LEDGE FEINT`, `RIDGE CUT`, `CREST VEER` veya `SUMMIT SNAP` copy'sine geri donup ayni problemi tekrar cilalama
- shell/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`60.0s+` sonrasina earned bir overtime opener ac; `60s CLEAR` sonrasini generic hot overtime yerine clear payoff'unu hemen yeni bir mekansal karar anina ceviren bounded runtime slice ile baslat.**

Hedef:
Clear-climb finali artik daha olayli; siradaki en guclu hamle `60s` clear'i sadece skor eşiği olmaktan cikarip hemen sonrasinda yeni bir route karariyla odullendirmek. Bu, hem replay istegini hem de run'in anlatilabilirligini buyuturken ayni clear-climb koridoruna polish icin geri donmeyi engeller.

En guclu aday:
1. `60.0-64.0s` band'inda ilk authored overtime beat'ini ekle; clear sonrasi ilk birkac saniyeyi tek parca generic baski yerine bounded bir reopen-then-cash-in veya benzeri iki niyetli slice'a cevir
2. bunu yaparken sadece runtime + gerekli player-facing truth'u ekle; tek basina shell/panel/copy calismasi yapma

Yapma:
- `45.6-60.0s` clear-climb sayilarini yeniden tune etme
- crest/summit snapshot polish zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda `60s CLEAR` sonrasinda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
