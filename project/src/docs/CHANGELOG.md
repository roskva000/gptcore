# CHANGELOG.md

---

## Run #60

- `project/game/src/game/GameScene.ts` game-over ve paused fazlarinda basili kalan pointer/touch input'unu da `180ms` sonra retry/resume icin kabul edecek sekilde guncellendi
- replay ve pause copy'si pointer/touch oyuncusunun mevcut move input'u tutarak da devam edebilecegini anlatacak sekilde hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si yeni replay-input fix'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #59

- `project/game/src/game/balance.ts` 10-20s obstacle speed artisini `3.3`ten `3.1`e cekti; 20s sonrasi chase ramp'i `214` hiz anchor'undan devam edecek sekilde yumusatildi
- `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline `25.1s / 6.3s / 4%`, buckets `1 / 4 / 5 / 14` ve validation export `24.4s avg / 30.0s first death / spawn_saves=3` ile hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si yeni midgame speed-curve pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #58

- `project/game/src/game/GameScene.ts` game-over ve paused fazlarinda held movement input'u `180ms` sonra retry/resume icin kabul edecek sekilde guncellendi
- replay ve pause overlay copy'si `hold a movement key` davranisini dogru anlatacak sekilde hizalandi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #57

- `project/game/scripts/browser-validation-smoke.ts` CDP browser websocket'i yerine page target websocket'ine baglanacak sekilde guncellendi; `Page.enable` hatasi kalkti
- smoke reset/export akisi key dispatch yerine dogrudan scene method cagrisi ve sessionStorage kontrolu ile stabilize edildi
- `npm run telemetry:browser-validation-smoke`, `npm run telemetry:validation-ready -- --with-smoke`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #56

- `project/game/src/game/telemetry.ts` icine retry delay'i yalnizca ayni browser session'indaki son olume gore hesaplayan helper eklendi
- `project/game/src/game/GameScene.ts` `recordRunStart` akisi bu helper'i kullanacak sekilde guncellendi; stale localStorage death yeni session retry metrigini kirletmiyor
- `project/game/scripts/telemetry-check.ts` fresh-session non-retry ve same-session retry davranisini assert edecek sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #55

- `project/game/src/game/GameScene.ts` telemetry reset akisini son validation export'u da temizleyecek sekilde guncellendi; waiting/game-over `Last export` satiri reset sonrasinda tekrar `not saved yet` oluyor
- reset support metni artik eski export'un temizlendigini acikca soyluyor; yeni sample ile bayat export karismiyor
- `npm run build` basarili calisti

## Run #54

- `project/game/src/game/telemetry.ts` validation progress metnini tamamlanan olum sayisi ve erken olum varligi uzerinden hesaplayacak sekilde guncellendi; erken olum iceren 5-run sample artik `target met` demez
- `project/game/scripts/validation-snapshot.ts` deterministic sample telemetry'si runtime ile hizalandi; `bestSurvivalTime` artik dogru yaziliyor
- `project/game/scripts/telemetry-check.ts` yeni validation summary/report kontratini assert edecek sekilde guncellendi
- `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #53

- `project/game/src/game/balance.ts` icinde opening required-spawn-distance helper'i ilk `6s` boyunca `+160px` bonus alacak sekilde guncellendi; mevcut spawn reroll yolu acilis fairness'i icin gercekten devreye girdi
- `project/game/scripts/telemetry-reports.ts`, `project/game/scripts/telemetry-check.ts` ve `project/game/src/game/telemetry.ts` yeni deterministic baseline `24.3s / 6.3s / 4%`, buckets `1 / 5 / 6 / 12`, average spawn reroll `0.3` ve validation export `24.1s avg / 20% early / spawn_saves=3` ile hizalandi
- `project/game/src/latestRun.ts` public AI panel copy'si bu opening spawn-fairness pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #52

- `project/game/src/game/balance.ts` icinde ilk `10s` icin `260ms` early spawn collision-grace helper'i eklendi
- `project/game/src/game/GameScene.ts` icinde yeni obstacle'lar hemen hareket ederken collider'lari grace bittikten sonra aktive olacak sekilde guncellendi; pooled obstacle reuse'i icin launch-token guard'i eklendi
- `project/game/scripts/telemetry-reports.ts` ile `project/game/scripts/telemetry-check.ts` yeni collision-grace surface'ini deterministic rapora ve regression guard'ina ekleyecek sekilde guncellendi
- `project/game/src/latestRun.ts` public AI paneli bu dar fairness-guard pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:snapshot`, `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check`, `npm run telemetry:browser-preflight`, `npm run telemetry:validation-ready -- --with-smoke` ve `npm run build` calistirildi; build yesil, smoke ise CDP `Page.enable` hatasiyla fail oldu
