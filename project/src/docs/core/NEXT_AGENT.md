## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda Run #289 ile `10-18s` breakthrough band'i yeni `HINGE FEINT` ara halkasini kazandi. Ayni `12.0-18.0s` sayilarina geri donup copy/tone mikro-polish'i yapma.

Audit notu:
- mevcut net verdict `bureaucracy-risk`
- source ilerlemesi devam ediyor; siradaki dogru adim yeni bir urun deltasi ama closure fan-out veya telemetry buyutmesi olmamali
- `DECISIONS + CHANGELOG + METRICS + ROADMAP` paketini yine varsayilan kapanis ritueline cevirme; yalniz gercek run sonucu gerekiyorsa ac
- validation/tooling yalniz yeni oyuncu-kontrati dogrudan degisiyorsa buyumeli

Dikkat:
- yeni orchestration / readiness / preflight / manager katmani acma
- `HINGE FEINT`, `SURGE SNAP`, `GATE CUT`, `SLACK CUT`, `HOUSE CUT` veya `DUE NOW` copy'sine geri donup ayni problemi tekrar cilalama
- breakthrough ya da killbox ayni sayilarina mikro-tuning icin saplanma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Death/retry yuzeyini sadeleştir ve yeni authored beat'leri daha okunur hale getir.**

Hedef:
`HUMAN_SIGNALS.md` olum ekraninda fazla veri ve karmaşa oldugunu soyluyor. Son run'larda runtime beat sayisi buyudu; artik dogru adim ayni koridorlara yeni isim eklemek degil, death overlay'i aktif cue + tek net retry hedefi + kompakt session stats duzenine indirip oyuncunun neden oldugunu ve neden tekrar deneyecegini daha hizli okutmak.

Uygulama cercevesi:
1. `project/game/src/game/deathPresentation.ts` ve gerekirse `project/game/src/game/GameScene.ts` icinde death overlay hiyerarsisini sadeleştir; aktif cue ve retry hedefi kalsin, ikincil metin/sayi yogunlugu azalsin
2. Yeni layout ayni zamanda `BREAKTHROUGH`, `KILLBOX`, `ENDGAME`, `OVERTIME` cue truth'unu kaybetmesin; genericlestirme yapma
3. Tooling ekleme; mevcut `npm run telemetry:check` regresyonlari gerekiyorsa yalniz layout/copy kontrati kadar guncelle

Yapma:
- yeni runtime slice acma
- yeni panel/shell/public feed katmani acma
- telemetry veya docs buyutmesini ana is haline getirme
- breakthrough/killbox/overtime sayilarina geri donup yeniden balance tune etme

---

## Success Criteria

- olum ekrani daha hizli okunur; aktif cue, neden oldugu ve bir sonraki retry hedefi tek bakista ayrisir
- yeni layout beat zenginligini silmez; `HINGE FEINT`, `SLACK CUT`, `CLEAR CLIMB`, `OVERTIME` gibi authored truth'lar genericlesmez
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
