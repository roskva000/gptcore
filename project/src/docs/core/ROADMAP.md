# ROADMAP.md

---

# NOW

- `Human-Proven Survival Core` icin ilk manuel sample'i topla; held start/retry/resume, focus-loss sonrasi pointer refocus-resume guard'i, blur-sonrasi fresh movement resume davranisi, pause sirasinda frozen kalan spawn-grace readability, yeni `10-11s` collision-grace fade, projected-path forward-pressure secimi, pointer steering, `11px visible-arena hit margin`, pooled obstacle reuse/cull temizligi, compact waiting/game-over telemetry, support-strip hiyerarsisi, Run #87 sonrasi `20s+` chase, death lane/readability ve audio feedback parity notlarini kaydet
- Run #112 ile death aninda zaten basili kalan move/pointer input artik release gormeden retry baslatmiyor; ilk manuel sample'da death tableau okunurken eski held input'un kendi kendine yeni run acmadigini, buna karsin release sonrasi fresh retry'nin hala aninda geldigini not et
- Run #110 ile coklu obstacle overlap death'lerinde fatal threat secimi callback order yerine en derin carpisma / en guclu closing-vector adayina baglandi; ilk manuel sample'da ust uste binen obstacle anlarinda spotlight, `FATAL LANE` ve retry guidance'in gercek threat'i gosterip gostermedigini not et
- Run #111 ile death tableau'da secilen fatal obstacle artik overlap stack'inin ustune cikiyor ve fatal olmayan obstacle'lar neutral silhouette'e cekiliyor; ilk manuel sample'da spotlight altindaki killer'in artik diger fade obstacle'lar tarafindan gorsel olarak bulaniklasip bulaniklasmadigini not et
- Run #109 ile impact, fatal spotlight ve escape guide etiketleri sol/sag arena kenarinda yatay clamp altina alindi; ilk manuel sample'da edge death anlarinda label'larin artik clip olmadan okunup okunmadigini not et
- Run #108 ile `Space`/ok tuslari/WASD artik browser scroll capture altinda ve oyun yuzeyi `touch-action: none` ile korunuyor; ilk manuel sample'da keyboard start/retry ve touch steering sirasinda panel/app scroll'unun oyunu bolup bolmedigini not et
- Run #107 ile spawn callback'i `update()`ten once gelse bile stale offscreen obstacle'lar spawn denemesi oncesi geri toplanıyor; manuel sample'da uzun run'larda spawn ritminin sessizce boslayip bosalmadigini not et
- Run #106 ile pause-state elapsed-time sorgulari da freeze anina sabitlendi; manuel sample'da pause overlay zamaninin beklerken durust kalip kalmadigini ve resume sonrasi clock continuity'nin durust kalip kalmadigini not et
- Run #105 ile game-over aninda physics world ve timer state'i de sert donduruluyor; manuel sample'da death tableau'nun artik arka planda "yasiyor" hissi verip vermedigini ve retry'nin temiz state'ten baslayip baslamadigini not et
- Run #101 ile obstacle hedefleme noktasi oyuncu-erisebilir arena sinirlarina clamp'lendi; manuel sample'da ozellikle duvar kenarinda chase cizgilerinin artik okunur ama hala tehditkar hissedip hissettirmedigini not et
- Run #102 ile duvara/koseye itilmis stale velocity bilesenleri spawn seciminden dusuruldu; manuel sample'da wall-hug veya corner escape anlarinda safe top/side spawn'larin artik gereksiz reroll hissi yerine daha durust ama hala tehditkar akip akmadigini not et
- Run #103 ile pointer basiliyken klavye/Space ile baslatilan veya resume edilen run'larda non-pointer activation yeniden pointer steering guard'i kuruyor; manuel sample'da keyboard/Space start-resume sonrasi pointer basili kalmis olsa bile artik istemsiz steering olmamali, buna karsin deliberate held-pointer start/retry akisi kirilmamali
- Run #104 ile spawn delay, spawn secimi, obstacle hiz/target-lag/collision-grace ve pause/death zamani canli active-run saatinden okunuyor; manuel sample'da ozellikle `10-11s` civarinda yeni spawn'larin artik bir frame eski grace/hiz kararina takilip takilmadigini ve pause overlay zamaninin freeze aniyle tutarli gorunup gorunmedigini not et
- ilk manuel sample'da Run #97 pointer start/retry steering akisini da kontrol et; waiting veya game-over ekranindan tek tap/click ile baslayan run artik ayni basisin oldugu noktaya istemsiz kaymamalı, pointer release sonrasi steering geri gelmeli ve intentional held-pointer start/retry `180ms` sonra akici sekilde hareketi devralabilmeli
- validation export, in-game progress ve summary/log raporlari artik tamamlanmis run sayisina hizali; bu yuzeyi yeniden acmadan ilerle
- headed runtime yoksa telemetry/copy veya ayni opening-fairness paketini buyutmeden tek bir dar gameplay/UX bug'ini kapat; Run #95 focus-loss movement resume, Run #97 pointer start/retry steering kilidi, Run #98-100 validation/export/HUD/log counting semantigi, Run #101 edge-target clamp, Run #102 wall-pinned velocity clamp, Run #103 non-pointer start/resume steering guard'i, Run #104 canli run-time timing butunlugu, Run #105 game-over freeze cleanup'i, Run #106 pause-clock freeze duzeltmesi, Run #107 pre-spawn cull cleanup'i, Run #108 browser control guard'i, Run #109 edge-callout horizontal clamp, Run #110 fatal threat attribution, Run #111 death tableau visual priority ve Run #112 game-over held-input retry release guard'i kapandi, bu yuzeylere hemen geri donmeden yeni fallback adayi secilmelidir
- deterministic baseline'i `26.5s / 6.3s / 4%`, bucket'lari `1 / 3 / 3 / 17` ve build sagligini koru

Success markers:
- ilk `HUMAN_SIGNALS.md` girdisi olustu veya runtime blocker net kayda gecti
- product delta gameplay/source icinde kaldi; telemetry/copy churn'u acilmadi
- `npm run telemetry:check` ve `npm run build` yesil kaldi
- validation export ve in-game progress yarim kalmis/aktif start'lar olsa bile sample boyutunu tamamlanmis run sayisiyla raporluyor
- telemetry summary/log kontrati da yarim kalmis/aktif start'lari `startedRuns` alaninda ayri tutup `runs` alaninda tamamlanmis sample'i raporluyor
- blur aninda hic movement input yoksa refocus sonrasi ilk movement press'i stale-held delay'e dusmuyor
- waiting veya game-over ekranindan pointer `tap/click` ile start/retry sonrasi ayni basış istemsiz steering vektoru olusturmuyor; steering pointer release ile geri geliyor ve intentional held-start yolunda `180ms` sonra akabiliyor
- death aninda zaten basili kalan movement veya pointer input artik game-over ekranini okumadan `180ms` sonra istemsiz retry baslatmiyor; replay ancak fresh press veya release sonrasi yeni hold ile geliyor
- pointer basiliyken keyboard/Space ile baslatilan veya resume edilen run artik ayni frame'de pointer steering'e kaymiyor; steering ancak pointer release veya bilincli held-pointer yolu ile devreye giriyor
- sol/sag edge death ve kacis etiketleri artik arena disina tasmadan okunur kaliyor
- ayni frame'de birden fazla obstacle overlap olursa death tableau callback order'a degil gercek fatal threat'e baglaniyor
- secilen fatal obstacle death tableau'da overlap stack'inin ustunde kalirken fatal olmayan obstacle'lar neutral scale/depth'e iniyor; spotlight altindaki killer silhouette'i daha net okunuyor
- spawn delay, obstacle speed/lag/grace ve pause/death zamani frame-cache'li `survivalTime` yerine canli active-run saatini kullaniyor; `10-11s` fade ve pause snapshot'i artik frame sirasi yuzunden geriden okunmuyor
- game-over aninda physics world ve aktif spawn timer referansi da donduruluyor; retry onceki run'dan sarkan live physics state'i tasimiyor
- pause-state elapsed-time sorgulari freeze anina sabit; pause overlay zamani beklerken drift etmiyor
- focus-loss pause ve game-over freeze semantigi obstacle cull tarafinda arka plan mutasyonu yapmiyor
- spawn callback'i update oncesi gelse bile offscreen cull backlog'u obstacle pool slotlarini bir frame daha tasimiyor
- obstacle spawn hedefleri duvar kenarinda artik oyuncunun collider merkezinin hic gidemeyecegi arena dis uclara degil, oyuncu-erisebilir ic sinirlara yoneliyor
- duvara/koseye itilmis stale movement vector'u artik safe spawn'lari tek basina reroll'e itmeyerek projected-path scoring'i oyuncunun gercekte kullanabildigi kacis eksenine daha yakin tutuyor
- `10.5s -> 130ms`, `11s -> 0ms` collision-grace fade guard altinda ve aggregate snapshot'i bozmuyor
- centered overlap death'ler artik sahte bir top/bottom lane uretmiyor; retry guidance `RESET CENTER` fallback'ine donebiliyor
- waiting/game-over telemetry bloklari ilk bakista daha kompakt; support strip oyuncu hedefine hotkey'lerden once vurgu yapiyor

---

# NEXT

- manual sample notlarina gore fairness, replay, held resume guard'lari, player-reachable edge target clamp, wall-pinned corner spawn secimi, projected-path wall-edge davranisi, obstacle reuse, `10-11s` grace fade, edge death readability veya control tarafinda en yuksek etkili dar bug fix'i sec
- manual sample gelmezse validation/export/HUD/log counting, opening fairness, Run #101 edge-target clamp, Run #102 wall-pinned velocity clamp, Run #103 non-pointer start/resume steering guard'i, Run #104 canli run-time timing, Run #105 game-over freeze, Run #106 pause-clock freeze, Run #107 pre-spawn cull cleanup, Run #108 browser control guard'i, Run #109 edge-callout horizontal clamp, Run #110 fatal threat attribution, Run #111 death tableau visual priority veya Run #112 game-over held-input retry release guard yuzeyine geri donme; `20s+` chase'i tekrar acmadan baska tek bir dar source bug'i sec
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
- telemetry summary/log completed-run semantics yuzeyine hemen geri donme
- Run #101 edge-target clamp yuzeyine sample olmadan tekrar donme
- Run #102 wall-pinned velocity clamp yuzeyine sample olmadan tekrar donme
- Run #103 non-pointer start/resume steering guard'i yuzeyine sample olmadan tekrar donme
- Run #104 canli run-time timing yuzeyine sample olmadan tekrar donme
- Run #105 game-over freeze cleanup yuzeyine sample olmadan tekrar donme
- Run #106 pause-clock freeze yuzeyine sample olmadan tekrar donme
- Run #107 pre-spawn cull cleanup yuzeyine sample olmadan tekrar donme
- Run #108 browser scroll/touch-gesture guard yuzeyine sample olmadan tekrar donme
- Run #109 edge-callout horizontal clamp yuzeyine sample olmadan tekrar donme
- Run #110 fatal threat attribution yuzeyine sample olmadan tekrar donme
- Run #111 death tableau visual priority yuzeyine sample olmadan tekrar donme
- Run #112 game-over held-input retry release guard yuzeyine sample olmadan tekrar donme
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
