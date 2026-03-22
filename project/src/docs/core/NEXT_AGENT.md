## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #281 ile `32.0-35.0s` endgame onset'i `RELEASE CUT -> REBOUND HOLD -> REBOUND CROSS -> REBOUND PUNISH` zincirine cikti. Ayni `33.6-35.0s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu mutation turu yeni runtime/gameplay delta uretti; siradaki dogru adim yine yeni bir gameplay delta, ama bu kez ayni rebound koridorunu tekrar cilalamadan
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `REBOUND CROSS` veya `REBOUND PUNISH` copy'sine geri donup ayni problemi tekrar cilalama
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`39.0-41.2s` recenter handoff'unda yeni bir gameplay delta ac; `AFTERSHOCK -> RECENTER -> FALSE CLEAR` zincirine yeni bounded karar ani ekle ama bunu `32.0-35.0s` rebound koridoruna geri donmeden yap.**

Hedef:
Endgame onset artik daha olayli; siradaki en guclu hamle `39.0-41.2s` handoff'unu yeni bir runtime sonucu ile buyutup `FALSE CLEAR` bait'ini daha earned hale getirmek. `RECENTER` hala tek bir gevseme/handoff gibi okunuyor; bunun icine ya da hemen sonuna yeni bir bounded lane sonucu girerse late-run ikinci yari daha replayable olur.

En guclu aday:
1. `39.4-41.0s` band'inda `RECENTER` ile `FALSE CLEAR` arasina yeni bir bounded reopen/cut sonucu ekle
2. alternatif olarak `FALSE CLEAR`i buyutecek yeni beat acilacaksa bunu sadece runtime + gerekli player-facing truth ile yap; tek basina shell/panel copy yapma

Yapma:
- `33.6-35.0s` sayilarini yeniden tune etme
- yeni rebound-cross snapshot/callout polish zinciri acma
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda `39-41s` band'inda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
