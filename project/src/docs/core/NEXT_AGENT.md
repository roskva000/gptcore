## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `integration` modunda signature mastery stamp'i sonrasi mevcut `RUN FEEL` paneli bir sonraki route hedefini de tasiyor; route hedefleri artik yalniz waiting/game-over vaadi veya tek seferlik stamp degil, aktif run icinde de kompakt bir `NEXT ROUTE / CEILING LIVE` follow-through'una kavusuyor.

Haftalik karar:
- bu tur yeni ladder beat'i eklenmedi; mevcut `RUN FEEL` paneli ve mevcut mastery state'i follow-through icin kullanildi
- bir sonraki run'in isi yeni docs/tooling degil, stamp + HUD follow-through zincirinin gercek gozlemde ne kadar temiz okundugunu ayirmak
- eger yogunluk varsa siradaki hamle yeni surface acmak degil, yalniz detail satiri siddetini daraltmak olmali
- validation/tooling yalniz yeni live oyuncu kontrati deterministic regression gerektirirse buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Signature mastery stamp + `RUN FEEL` follow-through zincirini browser/manual gozlemle dogrula; gerekiyorsa detail satirini daralt ama yeni surface acma.**

Hedef:
Run #307 stamp sonrasi route hedefini aktif HUD'a da tasidi ama bu zincirin `10.0s`, `18.0s` ve `32.0s` civarinda phase/cue callout'lariyla ne kadar temiz yasadigi henuz gorulmedi. Siradaki run once gercek browser/manual gozlemle bu yogunlugu ayirmali; eger satir fazla uzun veya gec okunuyorsa yalniz mevcut detail metnini sikistirmali.

Uygulama cercevesi:
1. once browser veya net manuel gozlem yap; `10.0s`, `18.0s`, `32.0s` crossing anlarinda mastery stamp ve sonrasindaki `RUN FEEL` detail satirinin run beat / phase callout'larina ezilip ezilmedigini kaydet
2. yogunluk varsa yalniz tek mevcut surface'te calis: `RUN FEEL` detail satirinin uzunlugunu veya copy siddetini daralt; yeni panel, yeni label modu veya yeni overlay acma
3. stamp earned ama detail gec okunuyorsa once detail satirini daha kompakt yap; support text, waiting shell ve death copy'ye yeni satir tasima
4. `GameScene.ts` ve gerekirse `runSignature.ts` disina tasma; yeni manager/orchestration katmani acma
5. `npm run telemetry:check` ve `npm run build` yesil kalsin; telemetry'yi yalniz yeni HUD kontrati dogrudan degisirse buyut

Yapma:
- yeni named beat ekleme
- mastery stamp'i yeni spectacle/background katmanina tasima
- waiting/game-over copy'sini buyuterek ilerleme gibi sunma
- yeni validation harness acma

---

## Success Criteria

- mastery stamp + HUD follow-through zincirinin en az bir kritik hedefte net ve earned okundugu gozlemsel olarak teyit edilir
- gerekiyorsa yapilan daraltma yalniz tek mevcut HUD surface'te kalir ve mevcut callout zinciriyle kavga etmez
- retry istegi shell'de anlatilan route hedefi ile active run sonucu arasinda daha bagli hale gelir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
