# ROADMAP.md

---

# NOW (Highest Priority)

- host browser'da 3-5 manuel run alip narrow viewport'ta collapse olan public AI panelin gameplay'i onceleyip oncelemedigini, compact live telemetry blogunun aktif oynanista canvas odagini artirip artirmadigini ve yeni personal-best cue ile waiting/start/retry copy'nin ilk bakista anlasilip anlasilmadigini dogrula
- ayni sample icinde waiting ve game-over fazlarinda oyuncu sprite'inin keyboard/touch/pointer input'u ile kaymadigini, retry oncesi death scene'in fiziksel olarak sabit kaldigini ve fresh-press movement-key retry'nin accidental restart uretmeden dogal hissedip hissettirmedigini not et
- ayni sample icinde aktif run sirasinda tab/window focus kaybi verip yeni pause guard'inin obstacle/spawn/survival saatini dondurup dondurmadigini, resume prompt'unun net olup olmadigini ve explicit resume'in gereksiz surtunme yaratip yaratmadigini not et
- mevcut deterministic baseline'i koru: pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 7 / 4 / 11`
- replay hizini bozmadan sol ust `Best ... | Session ...` satirinin okunurlugunu, waiting hint'in oyuncu amacini hizli anlatip anlatmadigini ve game-over'daki new-best / current-best mesajinin motive edici olup olmadigini not et
- mevcut death-feedback paketi, compact live telemetry, alt support strip ve collapsed public AI panelin birlikte fazla yogun olup olmadigini not et
- manuel sample veya yeni metrik gelmeden death-readability paketine yeni gorsel/copy katmani ekleme
- validation/readiness/orchestration katmanina yeni alan ekleme
- host browser yoksa eksikligi sadece kaydet; yeni tooling acma

Basari olcutleri:
- host browser varsa en az 3 manuel run notu alinmis oluyor
- ilk death sonrasi replay tek Space/Enter/tap veya fresh movement-key press ile yeni run'a donuyor
- basili kalan yon tusu accidental anlik replay uretmiyor
- waiting ve game-over fazlarinda avatar input'la kaymiyor; start/retry aksiyonu calisiyor ama fiziksel state sizmiyor
- playing fazinda blur/hidden oldugunda run pause'a geciyor; obstacle/spawn/survival saati unfocused surede ilerlemiyor
- resume sadece focus geri geldikten sonra Space/Enter/tap veya fresh movement-key ile oluyor; otomatik resume veya held-input sizmasi olmuyor
- personal-best cue ile waiting/start instructional copy'nin ilk bakista gorulup gorulmedigi ve tekrar deneme istegine etkisi yazili hale geliyor
- game-over'daki new-best / current-best satiri anlasilir ve motive edici bulunuyorsa bu not ediliyor
- public AI panel narrow viewport'ta collapse oldugunda gameplay ilk bakista birinci odak olarak kaliyor ve panel summary'si gerektiginde kolay aciliyorsa bu not ediliyor
- compact live telemetry aktif oynanista bir bakista okunup canvas'i ikinci plana itmemeli; waiting/game-over'da validation/export detayina ulasmak hala kolay olmali
- deterministic baseline accidental drift olmadan korunuyor

---

# NEXT

- host browser sample waiting/start copy'nin zayif kaldigini gosterirse sadece copy/placement/weight seviyesinde dar ayar yap
- host browser sample collapsed panel summary'sinin fazla zayif veya fazla baskin oldugunu gosterirse sadece summary wording/open-default breakpoint/padding seviyesinde dar ayar yap
- host browser sample compact telemetry'nin fazla gizli veya hala fazla yogun kaldigini gosterirse sadece satir secimi/alpha/font-size seviyesinde dar ayar yap
- host browser sample waiting/game-over fazlarinda hala input bleed, accidental replay, movement-key retry surtunmesi veya focus-loss resume surtunmesi hissettigini gosterirse sadece faz guard'i ya da primary-action/input handling seviyesinde dar ayar yap
- host browser sample HUD'in kalabaliklastigini gosterirse sadece top-left score stack veya alt support strip hiyerarsisini dar sekilde sadeleştir
- death-feedback paketi fazla baskin bulunursa sadece copy/offset/alpha/font-size/line-length/scale seviyesinde dar ayar yap
- replay reset hissi klavye veya touch'ta takiliyorsa sadece input/copy/offset seviyesinde dar ayar yap

---

# LATER

- obstacle cesitleri
- local best score history veya lightweight run history
- lightweight pause/state management
- deploy pipeline

---

# NICE TO HAVE

- visual polish
- background effects
- near-miss veya combo gibi replay motivasyonu artiran skor katmanlari

---

# BLOCKERS

- gercek oyuncu verisi yok
- bu sandbox `127.0.0.1` loopback socket bind denemesini `EPERM` ile reddediyor
- manual browser validation insan input ve uygun runtime gerektiriyor
- formal test suite yok
- mobil cihaz dogrulamasi yapilmadi

---

# SUCCESS METRICS

- session telemetry first death sinyali manual sample'da zamanla `> 10s`
- deterministic survival snapshot mevcut guard olarak `avg >= 22.3s`
- deterministic early death rate `<= 8%`
- deterministic survival buckets icinde `10-20s <= 7`, `<10s <= 2`, `30s cap >= 11`
- `npm run telemetry:check` accidental drift'te fail veriyor
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
