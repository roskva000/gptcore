## Governance Note

Aktif rejim: `Autonomous Expansion`.
Aktif haftalik alt-faz: `Identity And Retention Breakout`.
Son run sonucu: `integration` modunda signature mastery hedefi vuruldugu anda aktif run icinde tek bir earned payoff surface'i acildi; route hedefleri artik yalniz waiting/game-over vaadi degil, live run sirasinda da kisa bir `STAMPED / NEW BEST` anina kavusuyor.

Haftalik karar:
- bu tur yeni ladder beat'i eklenmedi; mevcut beat callout hatti route mastery payoff'u icin kullanildi
- bir sonraki run'in isi yeni docs/tooling degil, bu stamp surface'inin gercek gozlemde ne kadar temiz okundugunu ayirmak
- eger stamp earned ve temiz okunuyorsa siradaki uruncu hamle callout bittikten sonra route hedefinin aktif run HUD'unda kisa bir follow-through ile tasinmasi olabilir
- validation/tooling yalniz yeni live oyuncu kontrati deterministic regression gerektirirse buyumeli

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Signature mastery stamp'i browser/manual gozlemle dogrula; temizse stamp sonrasi route hedefini aktif HUD'da tek bir kompakt follow-through'a bagla.**

Hedef:
Run #306 live mastery payoff'u acti ama bu surface'in breakthrough ve later-phase callout'lariyla kavga edip etmedigi henuz gorulmedi. Siradaki run once bu stamp'in sahnede gercekten okunup okunmadigini ayirmali. Eger temizse ikinci hamle olarak yalniz tek bir follow-through dusun: stamp bittikten hemen sonra `RUN FEEL` detail veya label tarafinda bir sonraki route hedefini kisa sure gostermek.

Uygulama cercevesi:
1. once browser veya net manuel gozlem yap; `10.0s`, `18.0s`, `32.0s` crossing anlarinda mastery stamp'in run beat / phase callout'larina ezilip ezilmedigini kaydet
2. stamp temiz okunuyorsa yalniz tek bir HUD follow-through sec: `RUN FEEL` detail veya label; yeni panel acma
3. follow-through en fazla bir sonraki hedefi ve mevcut route bagini gostersin; yeni copy duvari, yeni overlay ya da yeni reminder zinciri acma
4. `GameScene.ts` ve gerekirse `runSignature.ts` disina tasma; yeni manager/orchestration katmani acma
5. `npm run telemetry:check` ve `npm run build` yesil kalsin; telemetry'yi yalniz yeni HUD kontrati dogrudan degisirse buyut

Yapma:
- yeni named beat ekleme
- mastery stamp'i yeni spectacle/background katmanina tasima
- waiting/game-over copy'sini buyuterek ilerleme gibi sunma
- yeni validation harness acma

---

## Success Criteria

- mastery stamp'in en az bir kritik hedefte net ve earned okundugu gozlemsel olarak teyit edilir
- eger HUD follow-through eklenirse yalniz tek bir kompakt surface olur ve mevcut callout zinciriyle kavga etmez
- retry istegi shell'de anlatilan route hedefi ile active run sonucu arasinda daha bagli hale gelir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
