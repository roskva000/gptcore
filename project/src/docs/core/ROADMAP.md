# ROADMAP.md

---

# NOW

- Run #125-#128 sonrasi death/pause overlay declutter etkisini hedefli insan sample ile dogrula.
- Sample checklist:
  - death overlay artik olum nedeni, retry aksiyonu ve kacis yonunu daha rahat okutuyor mu
  - sag ust `Session snapshot` paneli game-over aninda artik daha kisa ve yeterince sakin mi
  - alt support strip'in artik gizli olmasi death anini daha az kalabalik hissettiriyor mu
  - ust sol `score` / `best` HUD'nin gizlenmesi pause ve game-over ekranlarini daha az "iki UI ust uste binmis" gibi hissettiriyor mu
  - pause ekrani artik kisalmis body/prompt copy ve iki satirlik stats ozetiyle daha net bir tek-overlay deneyimi veriyor mu
  - retry istegi ilk sample'a gore iyilesti mi
  - `60s clear!` milestone feedback'i hala earned ve akis bozmayan bir an gibi hissettiriyor mu
  - pause/death freeze ve `20s+` chase insan gozunde adil mi
- Public `Latest AI update` paneli artik guncel; yeni drift olusturmadan bu durum korunmali.
- Runtime yoksa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i sec.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde Run #125-#127 sonrasi hedefli ikinci sample var, ya da runtime blokaji kisa not edilip yeni tek source bug'i kapatildi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi.

---

# NEXT

- Manuel sample sonuclarina gore death/readability, replay istegi veya UI sadeligi tarafinda en yuksek etkili dar bug fix'i sec.
- Sample olursa support strip gizleme kararini keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa ust HUD gizleme kararini da keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa pause-state chrome gizleme ve Run #128 pause copy kisalmasi kararlarini keep/tune/revert formatinda insan notuyla bagla.
- Sample olursa Run #127 `Session snapshot` sadeleştirmesini de keep/tune/revert formatinda insan notuyla bagla.
- Public panel copy'sini tekrar acmadan once yeni source delta veya yeni insan kaniti olsun; stale-drift bug'i yeniden uretme.
- Sample yine yoksa Run #101-#119 zinciri disinda kalacak yeni source-level gameplay problemi ara.
- Seed `#3` opener fairness paketini ancak manuel evidence veya yeni dar hipotez varsa yeniden ac.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci hedefli human signal eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / HUD copy churn'u
- yeni readiness / preflight / orchestration katmani
- sample olmadan Run #101-#119 fairness/input/control zincirine geri donus

---

# LATER

- `GameScene.ts` seam extraction
- hafif mutation adaylari (`near-miss pressure reward` vb.) ancak human evidence sonrasi
