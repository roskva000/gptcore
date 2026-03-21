# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda yakin gecisler ilk kez replay kancasina baglandi: Run #258 ile `near miss` pulse'u `CHASE LIVE` countdown'una dondu, support satiri aktif risk penceresini anlatmaya basladi ve olum aninda aktif chase varsa death snapshot prompt'u bunu dogrudan rematch hedefi olarak satiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- bunu score/progression/meta sistemine buyutme
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `near miss chase` slice'ini sahnede ve game-over snapshot'ta biraz daha sahiplen; oyuncu bu pencereyi yalniz yazida degil, kisa ama net bir earned state olarak hissetsin.**

Hedef:
Run #258 near-miss'i kisa bir retry kancasina cevirdi ama slice halen agirlikla text/HUD tarafinda yasiyor. Siradaki en iyi hamle yeni score sistemi acmak degil; mevcut `near miss chase` truth'unu ya sahnede kisa bir arena/screen-state imzasi ile ya da game-over snapshot'ta daha sahiplenilen bir earned an ile biraz daha oyunsal hale getirmek. Tek tema disina tasma.

Acilabilecek bagli yuzeyler:
1. `GameScene.ts` uzerinden aktif chase penceresine hafif ama net bir spectacle/HUD accent ekle; countdown'un yaninda sahnede de "earned heat" hissi olsun
2. veya death snapshot body/stats tarafinda bu chase'in koptugunu daha anlatilabilir kil; mevcut prompt override'i tek basina kalmasin
3. yalniz gerekiyorsa `telemetry-check.ts` assert'lerini bu yeni tek slice icin dar kapsamda genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bunu score inflation, agir progression ya da ayri meta sistemi acmaya cevirmeme
- ayni anda shell/tooling/readability polish'i ikinci tema olarak acma

---

## Success Criteria

- oyuncu aktif `near miss chase` penceresini yalniz text degil, oyunsal olarak da ayirt eder
- death snapshot bu pencereyi daha temiz bir replay kancasina cevirir
- bu yeni slice mevcut pacing ve fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- core docs gerekli gercegi yansitir
