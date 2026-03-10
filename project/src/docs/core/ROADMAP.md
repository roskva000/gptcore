# ROADMAP.md

---

# NOW

- `Human-Proven Survival Core` icin ilk manuel sample'i topla; held start/retry/resume, focus-loss sonrasi pointer refocus-resume guard'i, blur-sonrasi fresh movement resume davranisi, pause sirasinda frozen kalan spawn-grace readability, yeni `10-11s` collision-grace fade, projected-path forward-pressure secimi, pointer steering, `11px visible-arena hit margin`, pooled obstacle reuse/cull temizligi, compact waiting/game-over telemetry, support-strip hiyerarsisi, Run #87 sonrasi `20s+` chase, death lane/readability ve audio feedback parity notlarini kaydet
- ilk manuel sample'da Run #97 pointer start/retry steering akisini da kontrol et; waiting veya game-over ekranindan tek tap/click ile baslayan run artik ayni basisin oldugu noktaya istemsiz kaymamalı, pointer release sonrasi steering geri gelmeli ve intentional held-pointer start/retry `180ms` sonra akici sekilde hareketi devralabilmeli
- validation export ve in-game progress satirlari artik tamamlanmis run sayisina hizali; bu yuzeyi yeniden acmadan ilerle
- headed runtime yoksa telemetry/copy veya ayni opening-fairness paketini buyutmeden tek bir dar gameplay/UX bug'ini kapat; Run #95 focus-loss movement resume, Run #97 pointer start/retry steering kilidi ve Run #98 validation export sayaci kapandi, bu yuzeylere hemen geri donmeden yeni fallback adayi secilmelidir
- deterministic baseline'i `26.5s / 6.3s / 4%`, bucket'lari `1 / 3 / 3 / 17` ve build sagligini koru

Success markers:
- ilk `HUMAN_SIGNALS.md` girdisi olustu veya runtime blocker net kayda gecti
- product delta gameplay/source icinde kaldi; telemetry/copy churn'u acilmadi
- `npm run telemetry:check` ve `npm run build` yesil kaldi
- validation export ve in-game progress yarim kalmis/aktif start'lar olsa bile sample boyutunu tamamlanmis run sayisiyla raporluyor
- blur aninda hic movement input yoksa refocus sonrasi ilk movement press'i stale-held delay'e dusmuyor
- waiting veya game-over ekranindan pointer `tap/click` ile start/retry sonrasi ayni basış istemsiz steering vektoru olusturmuyor; steering pointer release ile geri geliyor ve intentional held-start yolunda `180ms` sonra akabiliyor
- focus-loss pause ve game-over freeze semantigi obstacle cull tarafinda arka plan mutasyonu yapmiyor
- `10.5s -> 130ms`, `11s -> 0ms` collision-grace fade guard altinda ve aggregate snapshot'i bozmuyor
- centered overlap death'ler artik sahte bir top/bottom lane uretmiyor; retry guidance `RESET CENTER` fallback'ine donebiliyor
- waiting/game-over telemetry bloklari ilk bakista daha kompakt; support strip oyuncu hedefine hotkey'lerden once vurgu yapiyor

---

# NEXT

- manual sample notlarina gore fairness, replay, held resume guard'lari, projected-path wall-edge davranisi, obstacle reuse, `10-11s` grace fade, compact telemetry/support-strip, center-overlap death guidance veya control tarafinda en yuksek etkili dar bug fix'i sec
- manual sample gelmezse validation/export/HUD counting yuzeyine de geri donme; `20s+` chase'i tekrar acmadan freeze/cull, obstacle reuse, compact telemetry/support-strip, focus-loss/input, pointer start/retry steering, center-overlap death guidance ve visible-arena fairness disinda tek bir dar source bug'i sec
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
- compact telemetry/support-strip yuzeyine hemen geri donme
- validation export run-count semantics yuzeyine hemen geri donme
- in-game completed-run HUD semantics yuzeyine hemen geri donme
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
