# ROADMAP.md

---

# NOW (Highest Priority)

- iki `<10s` deterministic outlier run'i (mevcut snapshot'ta worst-case `5.0s`) inceleyip erken-game fairness'i dar bir balance/spawn ayariyla iyilestirmeye calis
- mevcut deterministic baseline'i referans al: pacing `10 / 32 / 76`, survival `22.3s / 5.0s / 8%`, buckets `2 / 7 / 4 / 11`
- sadece en erken 0-10 saniye penceresine dokun; replay hizini, mevcut retry/pause/input stabilitesini ve death-feedback paketini degistirme
- once `npm run telemetry:survival-snapshot` ile outlier seed davranisini teyit et; sonra dar tuning denemelerini olc ve yalnizca net kazanc veren varyanti tut
- manuel sample veya yeni metrik gelmeden death-readability paketine yeni gorsel/copy katmani ekleme
- validation/readiness/orchestration katmanina yeni alan ekleme
- host browser yoksa eksikligi sadece kaydet; yeni tooling acma

Basari olcutleri:
- `npm run telemetry:survival-snapshot` sonucunda first death `> 5.0s` yonunde iyilesme goruluyor veya en azindan `<10s` outlier davranisi daha iyi aciklanmis oluyor
- average survival `>= 22.3s` korunuyor
- early death rate `%8` uzeri bozulmuyor
- pacing `10 / 32 / 76` accidental olarak bozulmuyor
- replay/start/pause/input davranislarinda accidental drift olmuyor
- `npm run telemetry:check` ve `npm run build` yesil kaliyor

---

# NEXT

- host browser runtime acilabilirse compact telemetry / collapsed panel / pause-resume / retry copy paketi icin manuel sample topla
- erken fairness tuning'i net kazanc vermezse outlier run'lari spawn geometri veya ilk 10s obstacle overlap acisindan daha dar analiz et
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
- deterministic first death `> 5.0s` yonunde ilerlemeli; ideal urun hedefi halen `> 10s`
- deterministic survival buckets icinde `10-20s <= 7`, `<10s <= 2`, `30s cap >= 11`
- `npm run telemetry:check` accidental drift'te fail veriyor
- personal-best cue build'de kalici ve gorunur durumda
- public AI update panel oyuncu tarafinda gorulebilir durumda ve narrow viewport'ta gameplay odagini gereksiz bolmuyor
- live telemetry aktif oynanista compact, waiting/game-over'da ise validation icin yeterince detayli kaliyor
- killer tag + connector + threat dimming + merkez-bosluklu arrowhead'li impact/escape rays + teal guide + `BREAK ...` prompt + fatal-lane callout + directional death callout oyunda gorunur durumda ve replay hizini bozmuyor
