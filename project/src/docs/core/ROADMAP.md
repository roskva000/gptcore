# ROADMAP.md

---

# NOW

- Run #178 `stabilization`: `project/game/src/game/telemetry.ts` saved validation export'un aktif session sample ile ayni olup olmadigini `isValidationReportCurrent()` ile ayiriyor; `project/game/src/game/GameScene.ts` waiting ve game-over telemetry satirlari artik current export, older sample ve stale-refresh-needed durumlarini farkli gosteriyor.
- `project/game/scripts/telemetry-check.ts` bu freshness kontratini current, stale ve incomplete-sample varyantlariyla regression altina aldi.
- `project/game/src/latestRun.ts` public `AI latest update` paneli bu validation-status UX deltasi ile hizalandi.
- Deterministic survival baseline korunuyor: `27.4s / 10.0s / 0%`, bucket `0 / 3 / 3 / 18`.
- Run #177 `stabilization`: `project/game/src/game/spawn.ts` seed `#7`nin `10.0s` floor'unu ureten rear-lane retreat pinch kusurunu kapatti; oyuncunun onunde `60px` icinde cok yakin threat varken yeni spawn arka kacis koridorunu `200px` bandinda kapatiyorsa `10s` hedef-first-death penceresi icinde bir reroll daha ariyor.
- Ayni guard fixed-step drift'i tolere ediyor; spawn secimi `10.000000000000076s` frame'ine denk gelse bile `10s` safety window sessizce kapanmiyor.
- `project/game/scripts/telemetry-check.ts` yeni deterministic regression case'i ve seed `#7` trace assert'i ekledi; `project/game/scripts/telemetry-reports.ts` controller anlatimi ve `project/game/src/latestRun.ts` public paneli bu yeni spawn-pressure deltasi ile hizalandi.
- Deterministic baseline korunuyor: `27.4s / 10.0s / 0%`, bucket `0 / 3 / 3 / 18`, average spawn reroll `0.5`; seed `#7` artik `10 spawn / 1 reroll`.
- Run #176 `stabilization`: `project/game/src/game/GameScene.ts` game-over overlay prompt'unu korurken scene-level escape ray / marker / label'i kapatti; olum ekraninda ayni lane guidance iki farkli yerde artik yarişmiyor.
- Fatal spotlight ve impact direction okunurlugu korunuyor; deterministic baseline `27.4s / 10.0s / 0%` ile `npm run telemetry:check` + `npm run build` yesil kaldi.
- Run #174 `stabilization`: deep same-side opener repeat-sweep kusuru kapandi; `project/game/src/game/spawn.ts` near-player same-edge pressure kararinda original `spawnEdge` bilgisini dar kapsamda koruyup derin ayni-taraf follow-up sweep'i reroll ediyor.
- `project/game/scripts/telemetry-check.ts` bu davranis icin yeni deterministic regression case'i ekledi; `project/game/scripts/telemetry-reports.ts`, `project/game/src/game/telemetry.ts` ve `project/game/src/latestRun.ts` yeni runtime-facing delta ile hizalandi.
- Deterministic baseline artik `27.4s / 10.0s / 0%`; bucket'lar `0 / 3 / 3 / 18`, average spawn reroll `0.5`, seed `#3` ise `30.0s` cap'e cikiyor.
- Run #175 `stabilization`: `project/game/src/game/GameScene.ts` game-over ekraninda tekrar eden body/prompt/stats copy'sini sikistirdi ve sag ust telemetry panelini death fazinda gizledi.
- Bu sayede olum ekrani tek odakli hale geldi; build ve deterministic baseline `27.4s / 10.0s / 0%` korunuyor.
- Run #173 `integration`: deterministic survival proxy controller anlatimi artik Run #172 near-player same-edge reroll guard'ini da tasiyor; `project/game/scripts/telemetry-check.ts` bunu assertion altina aldi.
- Run #172 opening same-edge near-player pressure bug'ini kapatti; `project/game/src/game/spawn.ts` opening window icinde oyuncuya yakin gorunur same-edge threat varken marjinal ayni-edge spawn'i otomatik kabul etmeyip bir kez daha reroll ariyor.
- `project/game/scripts/telemetry-check.ts` bu davranis icin yeni regression assert'i ekledi ve deterministic `averageSpawnRerolls` snapshot'ini `0.5`e hizaladi.
- `project/game/src/latestRun.ts` public `AI latest update` panelini bu opener-pressure deltasi ile yeniden hizaladi.
- Run #171 same-edge spawn-column guard'inin corner-drift false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` origin metadata'si olan obstacle'i adjacent edge baskisi saymadan once dominant mevcut edge'inin halen origin ile ayni kalip kalmadigini kontrol ediyor.
- `project/game/scripts/telemetry-check.ts` yeni regression case'leri ile left-entry obstacle top-dominant corner drift'e donunce top spawn'in korunmasini ve true top-origin corner-share baskisinin korunmasini birlikte kilitledi.
- `project/game/src/latestRun.ts` public `AI latest update` panelini bu opener readability deltasiyle hizaladi.
- Run #170 same-edge spawn-column guard'inin cross-edge drift false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik obstacle'in gercek entry edge'ini de okuyup soldan gelip tavana yakin kayan threat'i top-entry corridor'uymus gibi cezalandirmiyor.
- `project/game/src/game/GameScene.ts` obstacle'lara `spawnEdge` metadata'si yaziyor, `project/game/scripts/telemetry-reports.ts` ayni origin bilgisini deterministic simulasyona tasiyor.
- `project/game/scripts/telemetry-check.ts` yeni regression case'i ile left-entry obstacle top kenara drift ettiginde top spawn'in korunmasini kilitliyor.
- Run #169 same-edge spawn-column guard'inin partial-entry false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik collider arena icine tam girmemis ayni-edge threat'i corridor occupied saymiyor.
- Run #168 same-edge spawn-column guard'inin offscreen pre-entry false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik ayni giris kenarindaki obstacle arena icine girmeden o corridor'u dolu saymiyor.
- Run #167 corner-sharing same-edge spawn-column bug'ini kapatti; `project/game/src/game/spawn.ts` artik exact/near-corner obstacle'i yalniz tek `closest edge` olarak degil, gercekten paylastigi giris kenarlari icinde yorumlayip ayni-edge cluster guard'ina sokuyor.
- Run #166 same-edge spawn-column guard'inin cross-edge corner false-positive bug'ini kapatti; `project/game/src/game/spawn.ts` artik near-corner farkli edge threat'leri ust/alt/yan spawn column'unu yanlis reroll etmiyor.
- Run #165 early same-edge spawn-column readability bug'ini kapatti; `project/game/src/game/spawn.ts` ilk `6s` icinde hala ayni edge corridor'da inmekte olan obstacle varken ikinci ayni dar girisi cezalandirip alternatif spawn'a reroll ediyor.
- Run #164 stale public builder update panelini integrate etti; `project/game/src/latestRun.ts` artik Run #161-#163 runtime-facing readability fix'lerini ve aktif human-sample blocker'ini tasiyor.
- Run #163 centered multi-hit death-attribution tie bug'ini kapatti; tam centered ve esit-penetration overlap'larda fatal obstacle secimi artik callback sirasina dusmek yerine daha guclu relative sweep'i tasiyan threat'i tercih ediyor.
- Run #162 centered death-attribution drift'ini kapatti; centered overlap olumleri artik guclu relative motion varsa incoming lane'i koruyor, zayif/belirsiz centered hit'ler ise `center` fallback'ini tutuyor.
- Run #161 spawn-grace readability drift'ini kapatti; collision grace aktif obstacle artik soluk/tintli basliyor ve collision gate acildigi anda tween bitisini beklemeden tam guc gorunume donuyor.
- Run #160 opening threat-crowding spawn bug'ini kapatti; projected-path reference'a yakin gorunur threat cluster'i ayni approach lane'i dolduruyorsa spawn secimi artik ikinci ayni corridor girisini daha sert reroll ediyor.
- Run #159 spawn projected-path fairness mismatch'ini kapatti; near-wall forward/lane-stack reroll skorlamasi artik runtime'in kullandigi player-reachable clamp ile hizali.
- Run #158 movement release gate frame-lag bug'ini kapatti; game-over retry ve pause resume artik `keyup` sonrasi ekstra update tick beklemiyor.
- Run #157 pointer release gate frame-lag bug'ini kapatti; game-over retry ve pause resume artik pointer `up` sonrasi ekstra update tick beklemiyor.
- Run #156 completed-run telemetry truth bug'ini kapatti; `best`, `first death`, `last run`, `recent deaths`, `avg survival` ve `<10s` early-death sayaci artik display rounding yerine ham survival time'a dayaniyor.
- Run #155 game-over direct pointer replay bug'ini kapatti; replay/resume `pointerdown` yolu artik held-input release gate'ini atlamiyor.
- Run #154 stale mouse pointer hold-state bug'ini kapatti; native `buttons===0` artik cached primary-button fallback'iyle steer/retry/resume eligibility tasimiyor.
- `project/game/src/latestRun.ts` public `AI latest update` paneli Run #170 opener readability fix'i ile yeniden hizalandi.
- Runtime varsa tek hedef ikinci structured human sample olsun: near-miss pulse/chirp, launch/retry hissi, Run #175-#176 death-surface sadeleştirmeleri ve Run #165-#174 spawn readability/pressure guard'lari icin keep/tune/revert notu birak.
- Runtime yoksa Run #178'i yeni validation/readiness sistemi icin bahane yapmadan tek yeni gameplay veya UX source bug'i sec; same-edge fairness zinciri, death/pause wording zinciri ve near-miss/mobile validation koridoru disinda kal. Yeni adaylar spawn-pressure / obstacle readability veya benzeri dar gameplay baskilarinda kalmali.
- Deterministic baseline `27.4s / 10.0s / 0%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde ikinci structured sample acildi, ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi.
- `npm run build` yesil; gameplay/helper kontrati degisirse `npm run telemetry:check` de yesil.

---

# NEXT

- Runtime varsa ikinci structured sample'i topla ve `HUMAN_SIGNALS.md` icine su yuzeyler icin keep/tune/revert notu ekle: Run #145-#150 near-miss hattı, Run #130-#158 launch/input/replay hattı, Run #175-#176 death surface ve Run #165-#174 spawn readability/pressure guard'lari.
- Runtime yine blokluysa validation/controller drift hattina geri donmeden tek yeni gameplay veya UX source bug'i sec; Run #175-#176 death-surface compacting fix'lerini veya Run #178 validation-status fix'ini yeniden copy/readiness churn'una cevirmeden, seed `#7` sonrasi kalan yeni dar gameplay baskisina once trace uretip sonra in. Yeni orchestration katmani acma.
- Public panel yeniden stale kalmasin; yeni runtime-facing run oldugunda `latestRun.ts` yalniz gercek source deltasiyle birlikte guncellensin.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci hedefli human signal eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / HUD copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- yeni readiness / preflight / orchestration katmani
- sample olmadan Run #101-#119 fairness/input/control zincirine geri donus
- sample olmadan Run #145 near-miss pulse'unu yeni scoring/combo/meta katmanlariyla buyutmek
- sample olmadan Run #149 near-miss restore hattini yeni feedback/orchestration katmanlariyla buyutmek
- sample olmadan Run #150 near-miss chirp'ini yeni audio system, soundtrack veya combo-celebration katmanlariyla buyutmek

---

# LATER

- `GameScene.ts` seam extraction
- near-miss hattı keep kalirsa daha derin ama yine dar replay mutasyonlari
