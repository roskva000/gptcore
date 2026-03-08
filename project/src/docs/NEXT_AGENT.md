# NEXT_AGENT.md

## Recommended Next Task

Run #56 replay telemetry'yi durustlestirdi: yeni browser/session acildiginda stale localStorage `lastDeathAt` artik ilk run'i retry gibi saymiyor. Siradaki tek ana gorev, host browser/runtime varsa replay/start/pause akisinin gercek oyuncu friksiyonunu 5-10 manuel run ile notlamak olmali.

Ozellikle:
- once `npm run telemetry:check` ve `npm run build` calistir; baseline'in `24.3s / 6.3s / 4%` olarak korundugunu teyit et
- sonra host browser/runtime varsa 5-10 manuel run yap ve su sorulara kisa not dus: oyuna ilk giris tek aksiyonla net basliyor mu; death sonrasi retry gercekten hizli mi; hold click/touch steering start veya retry aninda istemsiz drift yaratiyor mu; focus-loss pause ve resume adil mi
- ayni notlarda session retry telemetry'sinin yeni browser session baslangiclarini retry gibi saymadigini dogrula; gerekiyorsa page refresh sonrasi ilk run ile ayni tab icindeki retry davranisini ayri not et
- packaged smoke komutu `Page.enable` ile fail oldugu icin bunu sadece blocker olarak kaydet; gorevi browser-tooling/readiness/orchestration alanina cevirme
- manuel sample replay friction gosterirse yalnizca input acceptance, retry prompt copy'si veya pause/resume acceptance seviyesinde dar bir duzeltme yap
- host browser yoksa bu replay gorevini tooling loop'una cevirmeden blocker olarak yaz ve farkli olculebilir gameplay problemine gec

---

## Why This Is Next

`AUDIT.md` verdict'i hala `drift-risk`: death-readability ve opening-fairness mikro-loop'una kanit olmadan donulmemeli, validation/tooling freeze korunmali. Run #56 mevcut telemetry'nin replay hizini yanlis anlatan bir bug'ini kapatti; artik replay/start/pause deneyimini insan gozunden notlamak daha anlamli. Dogru sonraki adim yeni UI katmani acmak veya packaged smoke'u ayri proje haline getirmek degil, mevcut replay akisinin gercek oyuncuda nerede surtundugunu kanitlamak.

---

## Success Criteria

- `npm run telemetry:check` basarili olmali
- `npm run build` basarili olmali
- 5-10 manuel run notu start -> play -> death -> retry -> pause/resume zincirindeki en buyuk friksiyonu acikca yazmali
- fresh browser/session acilisinda ilk run'in retry gibi sayilmadigi not edilmeli
- ayni tab/session icindeki gercek retry davranisi hala olculuyor olmali
- deterministic baseline `24.3s / 6.3s / 4%` accidental olarak bozulmamali
- death-readability paketi, opening spawn-distance tuning'i, validation wording'i ve public AI panel gereksiz yere degismemeli

---

## Read First

- `project/src/docs/AGENT.md`
- `project/src/docs/AUDIT.md`
- `project/src/docs/STATE.md`
- `project/src/docs/ROADMAP.md`
- `project/src/docs/METRICS.md`
- `project/src/docs/DECISIONS.md`
- `project/game/src/game/GameScene.ts`
- `project/game/src/game/telemetry.ts`
- `project/game/scripts/telemetry-check.ts`

---

## Constraints / Warnings

- validation altyapisina yeni preflight/readiness/orchestration katmani ekleme
- death-readability veya opening-fairness yuzeyine yeni kanit olmadan geri donme
- packaged smoke blocker'ini yeni scope alanina cevirme
- tek ana hedef sec; replay sample topluyorsan ayni turda ikinci bir urun cephesi acma
- host browser yoksa replay task'ini tooling kurma bahanesine donusturme

## Do Not

- validation wording'ini tekrar degistirme
- yeni HUD/panel/readability katmani ekleme
- fairness tuning'i veya spawn curve'unu yeniden acma
- browser smoke fail'ini bu turda cozmeye calisma

---

## Human Intervention: Headless Browser Capability Confirmed

Bu section onceki agent tarafindan yazilmamistir.  
Host ortamda yapilan manuel dogrulama sonucu browser capability ile ilgili yanlis blocker anlatisi kirilmis oldugu icin insan mudahalesi eklenmistir.

Host shell'de asagidaki akiş basariyla calisti:

- `cd /root/agents/game-agent/project/game`
- `npm install`
- `npm run browser:puppeteer-smoke`

Komut basarili sekilde su sonucu verdi:

- `ok: true`
- `chromiumPath: /usr/bin/chromium`
- `url: http://127.0.0.1:4174`
- `title: "Survive 60 Seconds"`

Bu nedenle:

- headless Chromium capability host ortamda dogrulanmistir
- browser automation genel bir altyapi blocker'i degildir
- "browser/manual validation blocked" anlatisi artik varsayilan kabul edilmemelidir

### Requirement

Sonraki turda browser capability'yi yok sayma.

Oncelik:
1. mevcut browser validation akisini bu calisan Puppeteer yoluna yaklastirmak
2. browser smoke / validation implementasyonunu script-level bir entegrasyon problemi olarak ele almak
3. yeni blocker/preflight/readiness/orchestration katmani eklememek
4. mumkunse bu browser capability'yi gercek product bug veya replay akisi dogrulamasinda kullanmak

### Important

Bu not browser capability'nin host ortamda gercekten calistigini belgelemek icindir.  
Sorun varsa, bunu artik "browser yok" veya "genel runtime blocker" diye degil, mevcut smoke/harness/entegrasyon akisi olarak daralt.