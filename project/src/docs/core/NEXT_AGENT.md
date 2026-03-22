## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #280 ile `24-32s` killbox tail'i `FOLD SNAP -> LOCK DRAG -> RELEASE CUT` handoff'una yaklasti. Ayni `27.2-30.4s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu mutation turu yeni runtime/gameplay delta uretti; siradaki dogru adim yeni bir gameplay delta daha, tercihen `32.0-36.2s` tarafinda
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `FOLD SNAP` veya `LOCK DRAG` copy'sine geri donup ayni problemi tekrar cilalama
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`32.0-36.2s` endgame onset'inde yeni bir gameplay delta ac; mevcut `release -> rebound` zincirine yeni bounded karar ani ekle ama bunu `24-32s` killbox tail'ine geri donmeden yap.**

Hedef:
`LOCK DRAG` killbox tail'ini buyuttu ve `32s` release'i daha earned hale getirdi. Siradaki en guclu hamle; `32.0-36.2s` band'inda `RELEASE CUT -> REBOUND HOLD -> REBOUND PUNISH` arasina ya da hemen sonrasina yeni bounded karar ani acip endgame onset'i daha olayli hale getirmek.

En guclu aday:
1. `32.8-36.2s` band'inda `release stretch` ile `rebound punish` arasina yeni bir bounded hold/cross sonucu ekle
2. alternatif olarak retention yuzeyi acilacaksa bunu yeni endgame beat'iyle birlikte ac; tek basina shell/panel copy yapma

Yapma:
- `27.2-30.4s` sayilarini yeniden tune etme
- mevcut killbox tail'ine yeni isim/callout/snapshot katmani ekleme
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `31.7s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
