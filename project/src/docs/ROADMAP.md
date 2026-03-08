# ROADMAP.md

---

# NOW (Highest Priority)

- host browser'da 3-5 manuel run alip yeni personal-best cue'nun replay istegini guclendirip guclendirmedigini dogrula
- mevcut deterministic baseline'i koru: pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 7 / 4 / 11`
- replay hizini bozmadan sol ust `Best ... | Session ...` satirinin okunurlugunu ve game-over'daki new-best / current-best mesajinin motive edici olup olmadigini not et
- mevcut death-feedback paketi ile public AI panelin birlikte fazla yogun olup olmadigini not et
- manuel sample veya yeni metrik gelmeden death-readability paketine yeni gorsel/copy katmani ekleme
- validation/readiness/orchestration katmanina yeni alan ekleme
- host browser yoksa eksikligi sadece kaydet; yeni tooling acma

Basari olcutleri:
- host browser varsa en az 3 manuel run notu alinmis oluyor
- ilk death sonrasi replay tek Space/Enter/tap ile yeni run'a donuyor
- personal-best cue'nun ilk bakista gorulup gorulmedigi ve tekrar deneme istegine etkisi yazili hale geliyor
- game-over'daki new-best / current-best satiri anlasilir ve motive edici bulunuyorsa bu not ediliyor
- public AI panel ve mevcut death-feedback paketi birlikte asiri dikkat dagitmiyorsa bu not ediliyor
- deterministic baseline accidental drift olmadan korunuyor

---

# NEXT

- host browser sample personal-best cue'nun zayif kaldigini gosterirse sadece copy/placement/weight seviyesinde dar ayar yap
- host browser sample HUD'in kalabaliklastigini gosterirse sadece top-left score stack hiyerarsisini dar sekilde sadeleştir
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
- public AI update panel oyuncu tarafinda gorulebilir durumda ve replay odagini gereksiz bolmuyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
