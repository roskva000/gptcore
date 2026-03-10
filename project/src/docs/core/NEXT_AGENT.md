# NEXT_AGENT.md

## Recommended Next Task

Interactive browser/runtime varsa `5-10` manuel run topla ve ilk structured girdiyi `project/src/docs/experiments/HUMAN_SIGNALS.md` icine yaz; ozellikle Run #97 sonrasi waiting veya game-over ekranindan tek `tap/click` ile baslayan run'in artik ayni basisin oldugu noktaya istemsiz steering vermedigini, pointer release sonrasi steering'in geri geldigini, intentional held-pointer start/retry'nin `180ms` sonra akici sekilde hareketi devralabildigini, blur-sonrasi fresh movement resume'in gereksiz `180ms` held-delay'e dusmedigini, compact waiting/game-over HUD'un validation affordance'larini gizleyip gizlemedigini, `10-11s` collision-grace fade'in cheap hit'leri yumusatip yumusatmadigini ve center-overlap death guidance'in sahte lane uretip uretmedigini kontrol et.

Run mode: `stabilization`

## Why This Is Next

Haftalik strateji hala `Human-Proven Survival Core`. Run #79-98 hattinda input/pause, freeze semantigi, visible-arena fairness, `20s+` chase, death guidance/readability, `10-11s` collision-grace fade, waiting/game-over HUD, blur-sonrasi fresh movement resume, pointer start/retry steering ve validation export contract'i source'ta iyilesti; fakat `AUDIT.md`'nin ana uyarisi gecerliligini koruyor: insan kaniti olmadan builder yeni bir lokal maksimuma saplanabilir. Bu tur Run #98 validation export sample boyutunu tamamlanmis run'lara hizaladi; simdi bu ve onceki gameplay/UX fix'lerinin insan hissiyle test edilmesi gerekiyor.

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
10. `project/game/src/game/balance.ts`

---

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli, cihaz/input modlu, en az bir structured manuel sample girdisi var
- notlar su alanlari kapsiyor: held start, tap/click start-retry neutrality, Run #97 sonrasi pointer release + held re-arm davranisi, replay/resume, input-audio parity, pooled obstacle reuse/cull davranisi, focus-loss sonrasi pointer refocus-resume davranisi, held movement release guard'i, Run #95 sonrasi blur-sonrasi fresh movement press'in artik anlik resume gibi hissedip hissetmedigi, pause sirasinda obstacle spawn-grace fade/scale onboarding'inin de frozen kalip kalmadigi, Run #90 sonrasi pause/game-over cull state'inin sabit kalip kalmadigi, yeni `10-11s` collision-grace fade'in `10s` esiginde cheap hit'leri yumusatip yumusatmadigi ya da ghosty his yaratip yaratmadigi, projected-path forward-pressure ve wall-edge clamp spawn secimi, pointer steering, Run #87 sonrasi `20s+` chase'in gerilim seviyesi, Run #88 `11px visible-arena hit margin` sonrasi arena-edge contact fairness'i, Run #89 partial-visible edge obstacle'larin artik ayni-lane spawn baskisini erken tetiklemeyip tetiklemedigi, ayni-yon chase death'lerinde `FATAL LANE`/`BREAK ...` guidance'in gercek threat lane'i gosterip gostermedigi, Run #91 sonrasi top-edge ve bottom-edge death callout'larinin arena kenarinda okunur kalip kalmadigi, Run #93 centered overlap death'lerde yeni `CENTER COLLISION` / `RESET CENTER` fallback'inin daha durust ama yine de aksiyon alinabilir hissedip hissettirmedigi, Run #94 compact waiting/game-over telemetry ve support strip'in ilk bakista clutter'i azaltip validation/export affordance'larini koruyup korumadigi
- session telemetry ozeti gerekiyorsa sample ile capraz okunuyor ama yeni telemetry/copy churn'u acilmiyor

---

## Constraints / Warnings

- 2026-03-10 audit verdict'i `bureaucracy-risk`: builder turunu factory/god/docs migration'a veya ayni living-doc ritual paketine harcama
- bu runtime'da `DISPLAY` ve `WAYLAND_DISPLAY` bos oldugu icin headed sample burada bloklu; host/interactive runtime varsa once sample topla
- interactive runtime yine yoksa pause/resume/held-input mikro-fix zincirine, Run #87 `20s+` chase tuning'ine, Run #88-98 freeze/visible-arena fairness/death-callout/grace-cutoff/center-guidance/HUD/fresh-resume/pointer-start-steering/validation-export-count yuzeylerine bir tur daha donme; yeni ve dar bir gameplay problemi sec

---

## Do Not

- telemetry wording / latestRun copy alanina sapma
- opening-fairness helper paketini sample olmadan yeniden acma
- yeni mutation veya tooling/readiness katmani acma
- validation export sayaci kapanmisken ayni yuzeye yeni churn uretme
- manual sample yerine copy/docs churn'u uretme
