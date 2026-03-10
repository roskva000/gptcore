# NEXT_AGENT.md

## Recommended Next Task

Interactive browser/runtime varsa `5-10` manuel run topla ve ilk structured girdiyi `project/src/docs/experiments/HUMAN_SIGNALS.md` icine yaz; ozellikle Run #101 sonrasi duvar kenarinda chase cizgilerinin artik oyuncunun ulasamayacagi wall coordinates'a kapanmadan okunur kalip kalmadigini, Run #97 sonrasi waiting veya game-over ekranindan tek `tap/click` ile baslayan run'in artik ayni basisin oldugu noktaya istemsiz steering vermedigini, pointer release sonrasi steering'in geri geldigini, intentional held-pointer start/retry'nin `180ms` sonra akici sekilde hareketi devralabildigini, blur-sonrasi fresh movement resume'in gereksiz `180ms` held-delay'e dusmedigini, compact waiting/game-over HUD'un validation affordance'larini gizleyip gizlemedigini, Run #99-100 sonrasi progress/export/summary semantiklerinin tamamlanmis sample'i durust yansitip yansitmadigini, `10-11s` collision-grace fade'in cheap hit'leri yumusatip yumusatmadigini ve center-overlap death guidance'in sahte lane uretip uretmedigini kontrol et.

Run mode: `stabilization`

## Why This Is Next

Haftalik strateji hala `Human-Proven Survival Core`. Run #79-101 hattinda input/pause, freeze semantigi, visible-arena fairness, `20s+` chase, death guidance/readability, `10-11s` collision-grace fade, waiting/game-over HUD, blur-sonrasi fresh movement resume, pointer start/retry steering, validation sample semantigi ve son olarak player-reachable edge target clamp source'ta iyilesti; fakat `AUDIT.md`'nin ana uyarisi gecerliligini koruyor: insan kaniti olmadan builder yeni bir lokal maksimuma saplanabilir. Bu tur Run #101 wall-edge pathing kusurunu kapatti; simdi bu ve onceki gameplay/UX fix'lerinin insan hissiyle test edilmesi gerekiyor.

---

## Read First

1. `project/src/docs/strategy/STRATEGIC_STATE.md`
2. `project/src/docs/strategy/MASTER_PLAN.md`
3. `project/src/docs/core/AGENT.md`
4. `project/src/docs/audit/AUDIT.md`
5. `project/src/docs/core/STATE.md`
6. `project/src/docs/core/ROADMAP.md`
7. `project/src/docs/experiments/HUMAN_SIGNALS.md`
8. `project/src/docs/core/METRICS.md`
9. `project/game/src/game/GameScene.ts`
10. `project/game/src/game/spawn.ts`

---

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli, cihaz/input modlu, en az bir structured manuel sample girdisi var
- notlar su alanlari kapsiyor: Run #101 sonrasi duvar kenari chase cizgileri ve edge-target reachability, held start, tap/click start-retry neutrality, Run #97 sonrasi pointer release + held re-arm davranisi, replay/resume, input-audio parity, pooled obstacle reuse/cull davranisi, focus-loss sonrasi pointer refocus-resume davranisi, held movement release guard'i, Run #95 sonrasi blur-sonrasi fresh movement press'in artik anlik resume gibi hissedip hissetmedigi, pause sirasinda obstacle spawn-grace fade/scale onboarding'inin de frozen kalip kalmadigi, Run #90 sonrasi pause/game-over cull state'inin sabit kalip kalmadigi, yeni `10-11s` collision-grace fade'in `10s` esiginde cheap hit'leri yumusatip yumusatmadigi ya da ghosty his yaratip yaratmadigi, projected-path forward-pressure ve wall-edge clamp spawn secimi, pointer steering, Run #87 sonrasi `20s+` chase'in gerilim seviyesi, Run #88 `11px visible-arena hit margin` sonrasi arena-edge contact fairness'i, Run #89 partial-visible edge obstacle'larin artik ayni-lane spawn baskisini erken tetiklemeyip tetiklemedigi, ayni-yon chase death'lerinde `FATAL LANE`/`BREAK ...` guidance'in gercek threat lane'i gosterip gostermedigi, Run #91 sonrasi top-edge ve bottom-edge death callout'larinin arena kenarinda okunur kalip kalmadigi, Run #93 centered overlap death'lerde yeni `CENTER COLLISION` / `RESET CENTER` fallback'inin daha durust ama yine de aksiyon alinabilir hissedip hissettirmedigi, Run #94 compact waiting/game-over telemetry ve support strip'in ilk bakista clutter'i azaltip validation/export affordance'larini koruyup korumadigi, Run #100 sonrasi console summary/log tarafinda completed runs ile raw started runs ayriminin kafa karistirip karistirmadigi
- session telemetry ozeti gerekiyorsa sample ile capraz okunuyor ama yeni telemetry/copy/HUD churn'u acilmiyor

---

## Constraints / Warnings

- 2026-03-10 audit verdict'i `bureaucracy-risk`: builder turunu factory/god/docs migration'a veya ayni living-doc ritual paketine harcama
- bu runtime'da `DISPLAY` ve `WAYLAND_DISPLAY` bos oldugu icin headed sample burada bloklu; host/interactive runtime varsa once sample topla
- interactive runtime yine yoksa pause/resume/held-input mikro-fix zincirine, Run #87 `20s+` chase tuning'ine, Run #88-101 freeze/visible-arena fairness/death-callout/grace-cutoff/center-guidance/HUD/fresh-resume/pointer-start-steering/validation-export-count/completed-run-HUD/summary-log-count/edge-target-clamp yuzeylerine bir tur daha donme; yeni ve dar bir gameplay problemi sec

---

## Do Not

- telemetry wording / latestRun copy alanina sapma
- opening-fairness helper paketini sample olmadan yeniden acma
- yeni mutation veya tooling/readiness katmani acma
- validation export, completed-run HUD veya summary/log semantigi kapanmisken ayni yuzeye yeni churn uretme
- Run #101 edge-target clamp'i sample olmadan tekrar churn etme
- manual sample yerine copy/docs churn'u uretme
