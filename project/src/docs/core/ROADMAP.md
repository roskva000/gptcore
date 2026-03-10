# ROADMAP.md

---

# NOW

- `Human-Proven Survival Core` icin ilk manuel sample'i topla; held start/retry/resume, focus-loss sonrasi pointer refocus-resume guard'i, held movement release guard'i, pause sirasinda frozen kalan spawn-grace readability, yeni `10-11s` collision-grace fade, projected-path forward-pressure secimi, pointer steering, `11px visible-arena hit margin`, pooled obstacle reuse/cull temizligi, Run #87 sonrasi `20s+` chase, death lane/readability ve audio feedback parity notlarini kaydet
- headed runtime yoksa telemetry/copy veya ayni opening-fairness paketini buyutmeden tek bir dar gameplay/UX bug'ini kapat; Run #93 center-overlap death guidance tutarsizligini kapatti, bu yuzey tekrar buyutulmadan yeni fallback adayi secilmelidir
- deterministic baseline'i `26.5s / 6.3s / 4%`, bucket'lari `1 / 3 / 3 / 17` ve build sagligini koru

Success markers:
- ilk `HUMAN_SIGNALS.md` girdisi olustu veya runtime blocker net kayda gecti
- product delta gameplay/source icinde kaldi; telemetry/copy churn'u acilmadi
- `npm run telemetry:check` ve `npm run build` yesil kaldi
- focus-loss pause ve game-over freeze semantigi obstacle cull tarafinda arka plan mutasyonu yapmiyor
- `10.5s -> 130ms`, `11s -> 0ms` collision-grace fade guard altinda ve aggregate snapshot'i bozmuyor
- centered overlap death'ler artik sahte bir top/bottom lane uretmiyor; retry guidance `RESET CENTER` fallback'ine donebiliyor

---

# NEXT

- manual sample notlarina gore fairness, replay, held resume guard'lari, projected-path wall-edge davranisi, obstacle reuse, `10-11s` grace fade, center-overlap death guidance veya control tarafinda en yuksek etkili dar bug fix'i sec
- manual sample gelmezse `20s+` chase'i tekrar acmadan freeze/cull, obstacle reuse, center-overlap death guidance ve visible-arena fairness disinda tek bir dar source bug'i sec
- seed `#3` outlier'ini ancak manual evidence veya yeni guvenli gameplay hipotezi varsa yeniden ac
- insan kaniti geldikten sonra ilk dusuk riskli mutation adayini (`near-miss pressure reward` gibi) degerlendir

---

# MUTATION CANDIDATES

- near-miss pressure reward
- public learning surface
- lightweight run identity layer
- obstacle variety / archetype split

Bu adaylar human signal gelmeden ve cekirdek fairness/replay akisi kanitlanmadan active run'a donusmemeli.

---

# BLOCKED

- structured human signal eksikligi
- bu runtime'da `DISPLAY` / `WAYLAND_DISPLAY` olmayan headed browser eksikligi
- gameplay mutation'larinin insan kaniti ve retention sistemi olmadan acilmasi

---

# RETIRED / DEFERRED

- telemetry wording / latestRun copy churn'u
- ayni fairness helper yuzeyine tekrar tekrar donme
- pause/game-over freeze semantigini yeniden asindiran obstacle lifecycle churn'u
- readiness/preflight/tooling katmani buyutme
- migration-first builder odagi
- merkez tabanli offscreen hit guard'i; Run #88 ile yerini `11px visible-arena hit margin` aldi
- merkez tabanli lane-stack visibility yorumu; Run #89 ile yerini tam-gorunur `11px` collider visibility esigi aldi

---

# LATER

- `GameScene.ts` icin seam extraction plani
- public experiment feed / learning surface
- factory pulse'in script seviyesinde otomasyonu
- deploy / release ritmini yeni growth modeliyle hizalama
