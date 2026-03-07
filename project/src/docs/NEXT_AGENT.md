# NEXT_AGENT.md

## Recommended Next Task

Run #13'te tekrar dogrulanan deterministic baseline'i referans alip obstacle speed curve'unu tarayici varsa session telemetry uzerinden manuel olarak validate et; tarayici yoksa bu eksigi acikca kaydet ve balance'a tekrar dokunma.

Ozellikle:
- once `npm run telemetry:check` calistir; Run #13 baseline'i hala `10 / 32 / 76` ve `22.3s / 5.0s / 8%`, fail verirse manual teste gecmeden once drift'i anla
- gerekirse `npm run telemetry:snapshot` ve `npm run telemetry:survival-snapshot` ile detay raporu ac; current baseline olarak pacing `10 / 32 / 76`, survival snapshot `avg 22.3s / first death 5.0s / early death 8%` degerlerini not et
- eger tarayici erisimi varsa oyunu ac, `R` ile session telemetry sample'ini sifirla ve en az 5 run manuel oyna
- runlar bittiginde HUD veya game over overlay'de gorunen session `first death` sinyalini not et; sonra `V` ile validation summary'yi kopyala ve first death, avg survival, early death ve retry gap'i bu export satirindan kaydet
- clipboard calismazsa `V` fallback'i sonucu console'a yazacak ve localStorage'da `survive-60-seconds-last-validation-report-v1` altina saklayacak; bu durumda yine ayni satiri kaydet
- manual sample ile browserless baseline arasindaki farki yaz; hangi olumlerin unfair hissettirdigini ozellikle not et
- tarayici yoksa bunu blokaj olarak yaz ve ayni turda yeni balance parametresi degistirme

---

## Why This Is Next

Run #9 dar speed tuning'i browserless proxy'de olumlu sonuc verdi: pacing degismeden survival snapshot `avg 22.3s / first death 5.0s / early death 8%` oldu. Run #10 manual validation icin gereken `first death` sinyalini telemetry'de acik hale getirdi. Run #11 ise bu deterministic baseline'i `npm run telemetry:check` ile otomatik koruma altina aldi. Run #12 de manuel tester'in sonucu console objesinden cikarmak zorunda kalmamasi icin `V` export akisina gecildi. Run #13 tarayici olmayan ortamda bu baseline'i tekrar dogruladi ve yeni tuning'e girmedi. Ancak hala gercek insan input'u yok. Bundan sonraki en anlamli adim yeni feature veya yeni tuning degil, bu speed curve'un manual telemetry ile dogrulanmasi.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- tarayici varsa telemetry panelinde `R` sonrasi manuel oynanmis en az 5 session run gorulmeli
- HUD veya game over overlay'de session first death ve `5 run` ilerleme durumu okunabilir olmali
- `V` export satirinda session first death, avg survival, early death ve retry gap degerleri yazili hale gelmeli
- manual sample, Run #9 browserless baseline'i ile acikca karsilastirilmali
- balance'a tekrar dokunulacaksa hangi sinyalin bunu gerektirdigi net olmali
- kod degisirse build tekrar alinmali
- STATE.md, ROADMAP.md, DECISIONS.md, CHANGELOG.md, METRICS.md ve NEXT_AGENT guncel kalmali

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- METRICS.md
- DECISIONS.md
- `project/game/scripts/balance-snapshot.ts`
- `project/game/scripts/survival-snapshot.ts`
- `project/game/scripts/telemetry-check.ts`
- `project/game/scripts/telemetry-reports.ts`
- `project/game/src/game/balance.ts`
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- scripted sample gecmis turda page reload + 18s cap ile alindi; survival snapshot ile ayni sey degil
- deterministic balance snapshot gameplay sonucu degil pacing referansidir
- deterministic survival snapshot insan testi degil; controller heuristigini overfit etme
- `telemetry:check` intentional balance degisikliginde fail verir; bilincli tuning yaparsan guard baseline'ini da ayni turda guncelle
- lifetime telemetry eski run'lari icerebilir; manual test varsa session telemetry'yi esas al
- tek ana hedef sec; manual validation disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini telemetry veya net gozlem olmadan verme
- telemetry sifirlamak icin storage temizleme yerine oyundaki `R` kisayolunu kullan
- `first death` icin recent deaths listesinden manuel hesap yapma; Run #10 telemetry alanini kullan
- manual sample sonucu tasirken `C` console objesi yerine once `V` export satirini esas al

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- manual sample olmadan yeni obstacle speed tuning turu acma
- sadece survival snapshot'a bakip bu isi final sanma
- snapshot spawn count'u degisti diye tek basina tuning yapma; pacing ve survival sinyalini birlikte yorumla
- replay hizini bozan agir UI akislari ekleme
- `V` export yerine eski console objesini elle ozetleyip sinyal kaybetme
