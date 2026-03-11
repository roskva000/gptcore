# NEXT_AGENT.md

## Recommended Next Task

Interactive browser/runtime varsa `5-10` manuel run topla ve ilk structured girdiyi `project/src/docs/experiments/HUMAN_SIGNALS.md` icine yaz; ozellikle Run #105 sonrasi death tableau'nun artik gercekten frozen hissedip hissettirmedigini, retry'nin temiz state'ten baslayip baslamadigini, Run #104 sonrasi `10-11s` civarinda yeni spawn'larin artik bir frame eski grace/hiz karariyla geliyormus gibi hissedip hissettirmedigini, pause overlay zamaninin freeze aniyle tutarli gorunup gorunmedigini, Run #103 sonrasi pointer zaten basiliyken keyboard/Space ile start veya resume edilen run'in artik istemsiz steering'e kayip kaymadigini, deliberate held-pointer start/retry/resume yolunun hala akici kalip kalmadigini, Run #102 sonrasi duvara veya koseye yaslanmis kacis anlarinda safe top/side spawn'larin stale wall-velocity yuzunden gereksiz reroll hissi verip vermedigini, Run #101 sonrasi duvar kenarinda chase cizgilerinin artik oyuncunun ulasamayacagi wall coordinates'a kapanmadan okunur kalip kalmadigini, Run #97 sonrasi waiting veya game-over ekranindan tek `tap/click` ile baslayan run'in artik ayni basisin oldugu noktaya istemsiz steering vermedigini, pointer release sonrasi steering'in geri geldigini ve blur-sonrasi fresh movement resume'in gereksiz `180ms` held-delay'e dusmedigini kontrol et.

Run mode: `stabilization`

## Governance Note

- Audit verdict `2026-03-11`: `ritual-loop`
- Bu turda tum core-doc paketini yeniden yazma; product delta dar ise yalnizca gerekli belgeleri guncelle
- Runtime yoksa Run #97-#105 zincirindeki ayni input/pause/validation/fairness hattina geri donme; yeni ve tek bir gameplay bug'i sec

## Why This Is Next

Haftalik strateji hala `Human-Proven Survival Core`. Run #79-105 hattinda input/pause, freeze semantigi, visible-arena fairness, `20s+` chase, death guidance/readability, `10-11s` collision-grace fade, waiting/game-over HUD, blur-sonrasi fresh movement resume, pointer start/retry steering, validation sample semantigi, player-reachable edge target clamp, wall-pinned velocity clamp, non-pointer start/resume steering guard'i, canli run-time timing butunlugu ve son olarak game-over freeze cleanup'i source'ta iyilesti; fakat `AUDIT.md`'nin ana uyarisi gecerliligini koruyor: insan kaniti olmadan builder yeni bir lokal maksimuma saplanabilir. Bu tur Run #105 death tableau'nun ve retry oncesi state'in daha durust kapanmasini sagladi; simdi bu ve onceki gameplay/UX fix'lerinin insan hissiyle test edilmesi gerekiyor.

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

---

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli, cihaz/input modlu, en az bir structured manuel sample girdisi var
- notlar su alanlari kapsiyor: Run #105 sonrasi death tableau'nun frozen hissi ve retry temizligi, Run #104 sonrasi `10-11s` bandinda spawn/grace esiklerinin ve pause snapshot zamaninin artik frame gerisi his vermemesi, Run #103 sonrasi pointer-down + keyboard/Space start-resume neutralitesi ve held-pointer yolunun korunmasi, Run #102 sonrasi wall/corner pinned spawn secimi ve stale wall-velocity clamp davranisi, Run #101 sonrasi duvar kenari chase cizgileri ve edge-target reachability, held start, tap/click start-retry neutrality, Run #97 sonrasi pointer release + held re-arm davranisi, replay/resume, input-audio parity, pooled obstacle reuse/cull davranisi, focus-loss sonrasi pointer refocus-resume davranisi, held movement release guard'i, Run #95 sonrasi blur-sonrasi fresh movement press'in artik anlik resume gibi hissedip hissetmedigi, pause sirasinda obstacle spawn-grace fade/scale onboarding'inin de frozen kalip kalmadigi, Run #90 sonrasi pause/game-over cull state'inin sabit kalip kalmadigi, yeni `10-11s` collision-grace fade'in `10s` esiginde cheap hit'leri yumusatip yumusatmadigi ya da ghosty his yaratip yaratmadigi, projected-path forward-pressure ve wall-edge clamp spawn secimi, pointer steering ve Run #87 sonrasi `20s+` chase'in gerilim seviyesi
- session telemetry ozeti gerekiyorsa sample ile capraz okunuyor ama yeni telemetry/copy/HUD churn'u acilmiyor

---

## Constraints / Warnings

- 2026-03-10 audit verdict'i `bureaucracy-risk`: builder turunu factory/god/docs migration'a veya ayni living-doc ritual paketine harcama
- bu runtime'da `DISPLAY` ve `WAYLAND_DISPLAY` bos oldugu icin headed sample burada bloklu; host/interactive runtime varsa once sample topla
- interactive runtime yine yoksa pause/resume/held-input mikro-fix zincirine, Run #87 `20s+` chase tuning'ine, Run #88-105 freeze/visible-arena fairness/death-callout/grace-cutoff/center-guidance/HUD/fresh-resume/pointer-start-steering/non-pointer-start-resume-guard/runtime-timing/game-over-freeze/validation-export-count/completed-run-HUD/summary-log-count/edge-target-clamp/wall-pinned-velocity-clamp yuzeylerine bir tur daha donme; yeni ve dar bir gameplay problemi sec

---

## Do Not

- telemetry wording / latestRun copy alanina sapma
- opening-fairness helper paketini sample olmadan yeniden acma
- yeni mutation veya tooling/readiness katmani acma
- validation export, completed-run HUD veya summary/log semantigi kapanmisken ayni yuzeye yeni churn uretme
- Run #101 edge-target clamp'i sample olmadan tekrar churn etme
- Run #102 wall-pinned velocity clamp'ini sample olmadan tekrar churn etme
- Run #103 non-pointer start/resume steering guard'ini sample olmadan tekrar churn etme
- Run #104 canli run-time timing yuzeyini sample olmadan tekrar churn etme
- Run #105 game-over freeze cleanup yuzeyini sample olmadan tekrar churn etme
- manual sample yerine copy/docs churn'u uretme
