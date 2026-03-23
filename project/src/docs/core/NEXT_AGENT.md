## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `mutation` modunda run signature rotasyonu artik hafif bir `route mastery` zinciri tasiyor; her signature kendi best suresini sakliyor ve waiting / game-over handoff'u bir sonraki hedefi acikca satiyor.

Haftalik karar:
- bu tur yeni ladder beat'i eklenmedi; signature family session-level hedefe yaklastirildi
- bir sonraki run'in isi yeni docs/tooling degil, bu mastery zincirini aktif run icinde de earned bir sonuc gibi hissettirmek
- waiting intro ve game-over handoff artik route hedefi tasiyor; siradaki hamle bu hedefin canli run icinde de "vuruldu" anina kavusmasi olmali
- validation/tooling yalniz yeni live oyuncu kontrati dogrudan degisirse buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Signature mastery hedefi vuruldugu anda aktif run icinde tek bir earned payoff surface'i ac.**

Hedef:
Run #305 waiting ve death handoff'unu guclendirdi ama route mastery hala buyuk olcude shell seviyesinde. Siradaki run, aktif signature kendi best'ini veya bir sonraki milestone'unu gectigi anda bunu kisa, temiz ve earned bir an olarak gostermeli. Oyuncu "yeni route hedefi tuttu" hissini run devam ederken de almali.

Uygulama cercevesi:
1. yalniz tek bir live surface sec: once kısa beat-callout/hint kutusu, sonra HUD badge, sonra backdrop accent sirasi ile dusun
2. aktif signature icin yeni best veya yeni milestone vuruldugu anda bir kez tetiklenen kisa `route stamped` / `mastery banked` anonsu uret
3. bu surface mevcut `RUN FEEL`, payoff callout ve phase ladder ile cakismamali; ozellikle ilk `10-18s` breakthrough onset'ini bastirmamali
4. `GameScene.ts` ve gerekirse `runSignature.ts` disina tasma; yeni manager/orchestration katmani acma
5. `npm run telemetry:check` ve `npm run build` yesil kalsin; telemetry'yi yalniz yeni live kontrat dogrudan degisirse buyut

Yapma:
- yeni named beat ekleme
- yeni validation harness acma
- waiting/game-over copy'sini buyuterek ilerleme gibi sunma
- signature mastery bahanesiyle agir progression/menu/meta katmani acma

---

## Success Criteria

- aktif run icinde signature hedefi vuruldugu an bir kez net ve earned okunur
- yeni surface mevcut opening cue / payoff / phase callout zinciriyle kavga etmez
- retry istegi shell'de anlatilan hedef ile live run sonucu arasinda daha bagli hale gelir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
