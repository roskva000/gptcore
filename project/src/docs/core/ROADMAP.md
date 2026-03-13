# ROADMAP.md

---

# NOW

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
- Runtime varsa tek hedef ikinci structured human sample olsun: near-miss pulse/chirp, opening launch surface, retry/start hissi, focus-loss resume, mobile shell, death/pause readability ve artik guncel builder panel + Run #165-#170 spawn readability guard'lari icin keep/tune/revert notu birak.
- Runtime yoksa ayni overlay/mobile/near-miss/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec; centered death-attribution drift'i, centered multi-hit tie bug'i ve same-edge spawn-column offscreen/cross-edge/corner-sharing hatlari kapandigi icin kalan iyi adaylar spawn-pressure / obstacle readability koridorunda kalmali.
- Runtime yoksa ayni overlay/mobile/near-miss/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec; centered death-attribution drift'i, centered multi-hit tie bug'i ve same-edge spawn-column visible/offscreen/partial-entry/cross-edge/corner-sharing/drift-origin hatlari kapandigi icin kalan iyi adaylar spawn-pressure / obstacle readability koridorunda kalmali.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde ikinci structured sample acildi, ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi.
- `npm run build` yesil; gameplay/helper kontrati degisirse `npm run telemetry:check` de yesil.

---

# NEXT

- Runtime varsa ikinci structured sample'i topla ve `HUMAN_SIGNALS.md` icine su yuzeyler icin keep/tune/revert notu ekle: Run #145-#150 near-miss hattı, Run #137 opening surface, Run #130-#160 launch/input/replay hattı, Run #125-#129 death/pause readability.
- Runtime yine blokluysa ayni overlay/mobile/near-miss/validation hattina donmeden tek yeni gameplay veya UX source bug'i sec; centered death direction drift'i, centered multi-hit tie bug'i, spawn-grace readability drift'i, projected-path clamp mismatch, threat-crowding guard'i ve same-edge visible/offscreen/partial-entry/cross-edge/corner-sharing/drift-origin bug'lari kapali, bu yuzden spawn-pressure veya obstacle readability tarafinda bir sonraki gercek kusura in, yeni orchestration katmani acma.
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
