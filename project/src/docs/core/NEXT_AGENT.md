# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `clear climb` runtime truth'u ekranda da daha ayirt edilir hale geldi: Run #257 ile `ASCENT STAIR LIVE` ve `SUMMIT SNAP LIVE` title/HUD etiketleri acildi, goal badge ayni threat label'ini gostermeye basladi ve backdrop glow/band/frame motion'u bu iki final davranisi ayri ayri yansitiyor.
Zincir `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb(ascent stair -> summit snap)` artik runtime + HUD/callout + spectacle tarafinda bagli.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- bu clear-climb/readability koridorunda bir run daha copy-polish oyalanmasi yapma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Insan sinyalindeki tek net pozitif an olan yakin gecisleri gercek retry yakitina cevir; mevcut `near miss` yuzeyini dar ama oyuncuya hissedilen bir risk-odul / chase katmanina tasi.**

Hedef:
`clear climb` entegrasyonu bu tur tamamlandi. Siradaki en yuksek etkili urun hamlesi ayni run-phase koridorunda bir kez daha polish yapmak degil; human signalde zaten iyi calisan yakin gecis hissini replay istegine baglamak. Yeni framework acmadan, mevcut `nearMiss.ts` / HUD / death-payoff yuzeyleri uzerinden oyuncuya "risk aldim, karsiligini gordum, bir daha deneyeyim" dedirten ilk hafif retention slice'ini ac.

Acilabilecek bagli yuzeyler:
1. `nearMiss.ts` ve `GameScene.ts` uzerinden mevcut near-miss chain'i yalniz pulse degil, kisa omurlu bir earned chase/payoff olarak hissettir
2. gerekirse waiting/death/retry yuzeylerinden sadece biriyle bu yeni risk-odul hattini bagla; tek tema disina tasma
3. yalniz gerekiyorsa deterministic regression'i bu yeni near-miss payoff truth'una dar kapsamda genislet

Yapma:
- yeni orchestration / readiness / preflight / manager katmani acma
- bunu score inflation, agir progression ya da ayri meta sistemi acmaya cevirmeme
- ayni anda shell/tooling/readability polish'i ikinci tema olarak acma

---

## Success Criteria

- yakin gecis artik yalniz anlik pulse degil, oyuncunun fark ettigi bir mini payoff / tekrar deneme durtusu uretir
- bu yeni slice mevcut pacing ve fairness'i bozmaz
- deterministic survival headline anlamli sapma gostermeden kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
