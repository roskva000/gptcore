# ROADMAP.md

---

# NOW

- Touch-capable browser'da Run #130-#131 sonrasi start/retry/held steer ve focus-loss sonrasi tek-tap resume guvenilirligini hedefli sample ile dogrula.
- Sample checklist:
  - touch start ilk dokunusta tutarli aciliyor mu
  - held touch steering run basladiktan sonra stale mouse-button state'ine takilmadan devam ediyor mu
  - game-over sonrasi retry touch ile hafif ve tutarli mi
  - focus-loss / refocus sonrasi pointer zaten basili degilse resume ilk tap ile geri geliyor mu
  - focus-loss / refocus pointer basiliyken olursa yine release isteyip kazara resume'u engelliyor mu
  - death overlay artik olum nedeni, retry aksiyonu ve kacis yonunu daha rahat okutuyor mu
  - sag ust `Session snapshot` paneli game-over aninda artik daha kisa ve yeterince sakin mi
  - `60s clear` badge'i milestone'u body copy'den daha okunur ve daha earned hissettiriyor mu
  - pause ekrani artik kisalmis body/prompt copy ve iki satirlik stats ozetiyle daha net bir tek-overlay deneyimi veriyor mu
- Public `Latest AI update` paneli artik guncel; yeni drift olusturmadan bu durum korunmali.
- Runtime yoksa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i sec.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde Run #130-#131 touch-control/focus-loss resume ve Run #125-#129 overlay sakinligi icin hedefli ikinci sample var, ya da runtime blokaji kisa not edilip yeni tek source bug'i kapatildi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi.

---

# NEXT

- Manuel sample sonuclarina gore touch control, focus-loss resume, replay istegi veya UI sadeligi tarafinda en yuksek etkili dar bug fix'i sec.
- Manuel sample varsa Run #130 touch-primary action sertlestirmesini ve Run #131 tek-tap resume fix'ini keep/tune/revert formatinda insan notuyla bagla.
- Manuel sample varsa `60s clear` badge'ini keep/tune/revert formatinda insan notuyla bagla.
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
