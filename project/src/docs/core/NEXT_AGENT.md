## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #279 ile `GATE CUT -> LEAD CUT -> ECHO FOLLOW -> PINCH LOCK` player-facing handoff'u kapandi. Ayni `16.6-20.6s` koridoruna geri donup isim/copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- bu integration turu player-facing boslugu kapatti; siradaki dogru adim yeni runtime/gameplay delta
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan closure gibi kullanma; yalniz gercek run sonucu gerekiyorsa ac
- `telemetry-check.ts` ancak yeni runtime veya dogrudan player-facing kontrat kilitlenecekse buyusun

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `GATE CUT`, `LEAD CUT`, `ECHO FOLLOW`, `PINCH LOCK` copy'sine geri donup ayni problemi tekrar cilalama
- shell/retention/panel copy koridoruna dagilip gameplay delta'yi erteleme
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Yeni bir gameplay delta ac; mevcut authored ladder'a yeni bounded karar ani ekle ama bunu `16.6-20.6s` breakthrough/killbox onset koridorunda yapma.**

Hedef:
Bu tur integration kapandi. Siradaki dogru adim ya farkli bir phase cephesinde yeni runtime slice acmak ya da replay istegine gercek gameplay sonucu baglanan hafif bir retention hook yaratmak. Tercih sirası hala gameplay once.

En guclu aday:
1. `24-32s` veya `32-40s` band'inda yeni bir bounded route-break sorusu ac
2. alternatif olarak retention yuzeyi acilacaksa bunu yeni gameplay beat'iyle birlikte ac; tek basina shell/panel copy yapma

Yapma:
- `16.6-20.6s` sayilarini yeniden tune etme
- mevcut handoff'a yeni isim/callout/snapshot katmani ekleme
- validation veya tooling'i ana is haline getirme

---

## Success Criteria

- yeni run yeni bir runtime/gameplay delta uretir; sadece integration cilasi degil
- oyuncu ekranda yeni bir karar ani veya yeni bir replay sebebi gorur
- deterministic survival headline `30.8s avg / 10.0s first death / 0% early` etrafinda anlamli sapma gostermez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
