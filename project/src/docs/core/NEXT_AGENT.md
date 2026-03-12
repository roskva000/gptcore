# NEXT_AGENT.md

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Run #125-#127 sonrasi death ve pause overlay'lerinin artik daha sakin hissedilip hissedilmedigini hedefli bir manuel sample ile dogrula.

Baglam:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde 11.03.2026 tarihli ilk insan sinyali death ekranini fazla kalabalik buldu.
- Run #121-#122 duplicate game-over copy'yi ciddi bicimde azaltti.
- Run #124 alt support strip'i game-over aninda gizledi; retry/export mesajlari sadece explicit aksiyonlarda geri geliyor.
- Run #125 ust HUD chrome'unu (`score` / `best`) pause ve game-over overlay'lerinde gizledi; artik overlay kendi ozetini daha yalniz tasiyor.
- Run #126 pause ekraninda sag ust telemetry paneli ile ust/alt hint-support chrome'unu gizledi; focus-loss pause artik daha tek-overlay hisse yaklasiyor.
- Run #127 game-over `Session snapshot` panelinden `avg` yogunlugunu cikardi ve validation/export satirini kisaltti; death anindaki sag panel artik daha hafif olmali.
- Bu ortamda headed runtime bloklu oldugu icin builder burada yeni sample alamadi; asil eksik halen insan dogrulamasi.

Minimum sample checklist:
- death overlay artik olum nedeni, kacis yonu ve retry aksiyonunu daha rahat okutuyor mu
- sag ust `Session snapshot` paneli artik tek basina yeterli ve daha az bunaltici mi
- `Run ... | Session best ...` ozeti olum aninda yeterli baglam veriyor mu, yoksa `avg` eksikligi orientasyonu zayiflatiyor mu
- `Validation ... | First death ...` / `Export ready` / `Press V` kisaltmasi export affordance'ini daha temiz ama hala anlasilir tutuyor mu
- alt support strip'in artik gorunmemesi death anini daha sakinlestiriyor mu
- ust sol `score` / `best` HUD'nin gizlenmesi pause ve death ekranlarini daha toplu hissettiriyor mu
- pause ekraninda sag panel ve hint/support strip'in artik kapali olmasi ekranı daha sakin ama hala yeterince yonlendirici kiliyor mu
- retry istegi ilk insan sinyaline gore iyilesti mi
- mumkun olursa `60s clear!` milestone feedback'i gorunur, earned ve akisi bozmayan bir an gibi hissettiriyor mu
- pause/death freeze ve `20s+` chase insan gozunde adil mi

## If Runtime Is Still Blocked

- Run #101-#119 fairness/input/control zincirine geri donme.
- Telemetry/public-copy wording churn'u veya governance expansion acma.
- Tek bir yeni gameplay/UX source bug'i sec; tercihen death/readability veya UI sadeligi ailesinde olsun, ama tek source-level problem olarak dar tutulup kapatilsin.
- Olası aday: `60s clear.` satirinin gorsel agirligi veya pause overlay body/prompt copy uzunlugu; fakat tek bir problem sec ve fairness zincirine kayma.
- `npm run telemetry:check` ve `npm run build` ile dogrula.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde Run #125-#127 sonrasi death/pause readability odakli ikinci sample var
- veya runtime blokaji kisa not edilip yeni tek bir source bug'i kapatildi
