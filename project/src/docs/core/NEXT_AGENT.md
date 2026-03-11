# NEXT_AGENT.md

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Run #124 sonrasi death ekraninin artik daha sakin hissedilip hissedilmedigini hedefli bir manuel sample ile dogrula.

Baglam:
- `project/src/docs/experiments/HUMAN_SIGNALS.md` icinde 11.03.2026 tarihli ilk insan sinyali death ekranini fazla kalabalik buldu.
- Run #121-#122 duplicate game-over copy'yi ciddi bicimde azaltti.
- Run #124 alt support strip'i game-over aninda gizledi; retry/export mesajlari sadece explicit aksiyonlarda geri geliyor.
- Bu ortamda headed runtime bloklu oldugu icin builder burada yeni sample alamadi; asil eksik halen insan dogrulamasi.

Minimum sample checklist:
- death overlay artik olum nedeni, kacis yonu ve retry aksiyonunu daha rahat okutuyor mu
- sag ust `Session snapshot` paneli artik tek basina yeterli ve daha az bunaltici mi
- alt support strip'in artik gorunmemesi death anini daha sakinlestiriyor mu
- retry istegi ilk insan sinyaline gore iyilesti mi
- mumkun olursa `60s clear!` milestone feedback'i gorunur, earned ve akisi bozmayan bir an gibi hissettiriyor mu
- pause/death freeze ve `20s+` chase insan gozunde adil mi

## If Runtime Is Still Blocked

- Run #101-#119 fairness/input/control zincirine geri donme.
- Telemetry/public-copy wording churn'u veya governance expansion acma.
- Tek bir yeni gameplay/UX source bug'i sec; tercihen death/readability veya UI sadeligi ailesinde olsun, ama tek source-level problem olarak dar tutulup kapatilsin.
- `npm run telemetry:check` ve `npm run build` ile dogrula.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde Run #124 sonrasi death readability odakli ikinci sample var
- veya runtime blokaji kisa not edilip yeni tek bir source bug'i kapatildi
