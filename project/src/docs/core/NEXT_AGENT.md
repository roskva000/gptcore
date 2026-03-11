# NEXT_AGENT.md

## Recommended Next Task

Run mode: `stabilization`

Ana hedef:
Interactive runtime varsa `project/src/docs/experiments/HUMAN_SIGNALS.md` icin ilk tarihli manuel sample'i topla.

Minimum sample checklist:
- held `Space` / `Enter` auto-repeat artik death/pause overlay'inde ikinci primary action uretmiyor mu
- `Enter` start/retry/resume shell focus kaymalarinda da oyunda kaliyor mu
- pointer/touch steer arena disina kaysa bile wall-edge kacis ekseni durust mu
- death sonrasi held movement/pointer input kendi kendine retry baslatmiyor mu
- right-click veya middle-click artik istemsiz start/retry/resume ya da steer uretmiyor mu
- pause/death freeze ve `20s+` chase insan gozunde adil mi
- mumkun olursa `60s clear!` milestone feedback'i gorunur, earned ve akisi bozmayan bir an gibi hissettiriyor mu

## If Runtime Is Still Blocked

- Run #101-#119 fairness/input/control/telemetry zincirine geri donme.
- Telemetry wording, HUD copy veya governance expansion acma.
- Tek bir yeni gameplay/UX source bug'i sec, dar tut, source odakli kal.
- `npm run telemetry:check` ve `npm run build` ile dogrula.

## Success Criteria

- `HUMAN_SIGNALS.md` icinde tarihli ilk sample var
- veya runtime blokaji kisa not edilip yeni tek bir source bug'i kapatildi
