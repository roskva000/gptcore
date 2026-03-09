# CHANGELOG.md

---

## Run #74

- `project/game/src/game/spawn.ts` ilk `6s` icinde oyuncuya `160px` icindeki aktif obstacle lane'i ile `0.55+` dot ayni yonu paylasan spawn adaylarini puan kirarak reroll'e zorlayan dar bir lane-stack filtresi ekledi
- `project/game/src/game/GameScene.ts` runtime spawn secimine aktif obstacle pozisyonlarini gecirdi; `project/game/scripts/telemetry-reports.ts` deterministic survival proxy'yi ayni lane-stack secim davranisiyla hizaladi
- `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni deterministic baseline `26.5s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`, average spawn count `28` ve average reroll `0.5` ile guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #73

- `project/game/src/game/spawn.ts` ilk `6s` icinde oyuncunun hareket yonunun onune fazla hizalanan spawn adaylarini puan kirarak reroll'e zorlayan dar bir forward-pressure filtresi ekledi
- `project/game/src/game/GameScene.ts` runtime spawn secimine oyuncu velocity'sini gecirdi; `project/game/scripts/telemetry-reports.ts` deterministic survival proxy'yi ayni secim davranisiyla hizaladi
- `project/game/src/game/telemetry.ts` ve `project/game/scripts/telemetry-check.ts` yeni deterministic baseline `26.4s / 6.3s / 4%`, buckets `1 / 3 / 3 / 17`, average spawn count `27.8` ve average reroll `0.4` ile guncellendi
- `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` basarili calisti

## Run #72

- `project/game/src/game/GameScene.ts` obstacle collision-grace acilimini wall-clock `delayedCall` yerine aktif run elapsed zamanina bagladi; focus-loss pause artik grace'i tuketmiyor
- pooled obstacle reset akisi yeni `collisionUnlockElapsedMs` alanini temizleyecek sekilde hizalandi ve artik gereksiz kalan `launchToken` izi kaldirildi
- `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` basarili calisti

## Run #71

- `project/game/src/game/spawn.ts` ortak `isPointInsideArena`, `isPointOutsideCullBounds` ve `OFFSCREEN_CULL_MARGIN` helper'larini ekledi
- `project/game/src/game/GameScene.ts` obstacle overlap guard'i ve cull davranisini bu ortak helper'larla hizaladi; runtime davranisi bilincli olarak degistirilmedi
- `project/game/scripts/telemetry-reports.ts` deterministic survival sim'ine runtime'daki gorunur-arena hit guard'i ve `96px` offscreen cull margin'ini ekledi
- `project/game/scripts/telemetry-check.ts` deterministic proxy'nin runtime collision/cull hizasini assert edecek sekilde guncellendi
- `npm run telemetry:check`, `npm run telemetry:survival-snapshot` ve `npm run build` basarili calisti

## Run #70

- `project/game/src/game/balance.ts` `20s+` obstacle hiz ramp'ini `217 + (t-20) * 3.7` olacak sekilde guncelledi; 30s/45s hiz anchor'lari `254 / 310` oldu
- `project/game/src/game/telemetry.ts` deterministic baseline etiketini `25.7s avg / 6.3s first death / 4% early` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni hiz anchor'lari, survival baseline `25.7s`, bucket dagilimi `1 / 4 / 2 / 17` ve average spawn count `27.1` olacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #69

- `project/game/src/game/GameScene.ts` obstacle overlap check'ine gorunur-arena guard'i ekledi; obstacle merkezi arena icine girmeden veya arena disina ciktiktan sonra oyuncuya hit veremiyor
- waiting held-start, replay/resume acceptance, speed curve, obstacle collider yaricapi ve telemetry/export semantigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #68

- `project/game/src/game/GameScene.ts` waiting state icin de mevcut `180ms` held movement ve held pointer/touch acceptance yolunu acti; start akisi game-over/pause replay-resume davranisiyla hizalandi
- balance, telemetry/export semantigi, obstacle collider ve pointer analog steering esigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #67

- `project/game/src/game/GameScene.ts` obstacle collider yaricapini gorsel sprite capini koruyarak `12px`ten `11px`e cekti; player collider, chase hiz curve'u ve replay akislari bilincli olarak degistirilmedi
- `project/game/scripts/telemetry-reports.ts` deterministic simulation obstacle collider'ini ayni `11px` degerle hizaladi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #66

- `project/game/src/game/balance.ts` `10-20s` obstacle hiz artisini `3.4`e, `20s+` ramp'i ise `217 + (t-20) * 3.6` olacak sekilde guncelledi; amac opener'a dokunmadan midgame arena tikanmasini azaltmakti
- `project/game/src/game/telemetry.ts` validation baseline etiketini yeni deterministic snapshot `25.6s / 6.3s / 4%` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni hiz anchor'lari `200 / 217 / 253 / 307`, survival baseline `25.6s`, average spawn count `27` ve validation export ortalamasi `24.1s` olacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #65

- `project/game/src/game/GameScene.ts` pointer/touch analog steering'in full-speed mesafesini `140px`ten `120px`e cekti; uzun kacislarda tam hiz daha erken geliyor
- keyboard hareketi, replay/start/resume davranisi, speed curve, spawn fairness helper'lari ve telemetry/export semantigi bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #64

- `project/game/src/game/balance.ts` 20s+ obstacle hiz artisini `3.5`ten `3.45`e cekti; 45s speed anchor'i `302`den `300`e indi
- `project/game/src/game/telemetry.ts` validation baseline etiketini yeni deterministic snapshot `25.3s / 6.3s / 4%` ile hizaladi
- `project/game/scripts/telemetry-check.ts` yeni survival baseline `25.3s`, bucket dagilimi `1 / 4 / 3 / 16`, average spawn count `26.6` ve 45s hiz anchor'i `300` olacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #63

- `project/game/src/game/GameScene.ts` pointer/touch steering'i analog hiz skalasi ile guncelledi; yakin hedefte ince kacis icin tam hiz snap'i kirildi, uzak hedefte tam hiz korundu
- keyboard hareketi, replay/start/resume davranisi, telemetry/export semantigi ve deterministic balance baseline'i bilincli olarak degistirilmedi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #62

- `project/game/src/latestRun.ts` oyuncuya gorunen `Latest AI update` panelini Run #61'in gercek telemetry/export degisikligiyle hizaladi
- stale `5 runs | first death 30.0s | early 20% | 5/5 runs, review early deaths` metni guncel `6.3s first death` validation ozetiyle degistirildi
- `npm run telemetry:check` ve `npm run build` basarili calisti

## Run #61

- `project/game/src/game/telemetry.ts` `first death` alanini sample/lifetime icindeki minimum olum suresi olarak tutacak helper ile guncellendi
- `project/game/src/game/GameScene.ts` lifetime ve session telemetry kaydi en dusuk olum suresini koruyacak sekilde hizalandi
- `project/game/scripts/validation-snapshot.ts` ve `project/game/scripts/telemetry-check.ts` validation export kontratini `6.3s first death` semantigi ile guncelledi
- `npm run telemetry:check`, `npm run build` ve `npm run telemetry:validation-ready -- --with-smoke` basarili calisti

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
