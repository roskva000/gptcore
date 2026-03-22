## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #283 ile `45.6-52.4s` clear-climb stretch'i `ASCENT STAIR -> LEDGE FEINT -> RIDGE CUT -> SUMMIT SNAP` zincirine cikti. Ayni `45.6-49.6s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu mutation turu yeni runtime/gameplay delta uretti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez ayni late-handoff koridorunu tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `LEDGE FEINT` veya `RIDGE CUT` copy'sine geri donup ayni problemi tekrar cilalama
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`52.4-60.0s` summit stretch'inde yeni bir gameplay delta ac; `RIDGE CUT -> SUMMIT SNAP` sonrasina veya icine yeni bounded final-route karari ekle ama bunu `45.6-49.6s` ledge-feint koridoruna geri donmeden yap.**

Hedef:
Clear-climb ilk yarisi artik daha olayli; siradaki en guclu hamle `52.4-60.0s` summit stretch'ini yeni bir runtime sonucu ile buyutup `60s` oncesi ek bir earned final-route degisimi yaratmak. `SUMMIT SNAP` hala uzun tek parca bir kapanis gibi okunuyor; icine yeni bir bounded split girerse `60s` kovalamacasi daha replayable olur.

En guclu aday:
1. `52.4-56.8s` band'inda `SUMMIT SNAP` icine yeni bounded split ekle; son stretch'i tek parca snapback yerine iki kararli bir finale cevir
2. alternatif olarak yeni beat `RIDGE CUT` cikisini `60s`e baglayacaksa bunu sadece runtime + gerekli player-facing truth ile yap; tek basina shell/panel copy yapma

Yapma:
- `45.6-49.6s` sayilarini yeniden tune etme
- yeni ledge-feint/ridge-cut snapshot polish zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda `52.4-60.0s` band'inda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
