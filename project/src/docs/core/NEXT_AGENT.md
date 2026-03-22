## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #282 ile `39.0-41.2s` handoff'u `AFTERSHOCK -> RECENTER -> CENTER PIN -> FALSE CLEAR` zincirine cikti. Ayni `39.0-42.8s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu mutation turu yeni runtime/gameplay delta uretti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez ayni late-handoff koridorunu tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `CENTER PIN`, `FALSE CLEAR` veya `PRECLEAR` copy'sine geri donup ayni problemi tekrar cilalama
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`45.6-52.4s` clear-climb stretch'inde yeni bir gameplay delta ac; `ASCENT STAIR -> RIDGE CUT` arasina yeni bounded route karari ekle ama bunu `39.0-42.8s` late-handoff koridoruna geri donmeden yap.**

Hedef:
Late-run handoff artik daha olayli; siradaki en guclu hamle `45.6-52.4s` clear-climb'in ilk yarisini yeni bir runtime sonucu ile buyutup `RIDGE CUT` oncesi ek bir earned route degisimi yaratmak. `ASCENT STAIR` hala uzun tek parca bir tirmanis gibi okunuyor; icine yeni bir bounded cut/reopen sonucu girerse `60s` kovalamacasi daha replayable olur.

En guclu aday:
1. `47.0-49.6s` band'inda `ASCENT STAIR` ile `RIDGE CUT` arasina yeni bounded reopen/cut sonucu ekle
2. alternatif olarak `RIDGE CUT`u buyutecek yeni beat acilacaksa bunu sadece runtime + gerekli player-facing truth ile yap; tek basina shell/panel copy yapma

Yapma:
- `39.0-42.8s` sayilarini yeniden tune etme
- yeni center-pin/false-clear snapshot polish zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda `45.6-52.4s` band'inda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
