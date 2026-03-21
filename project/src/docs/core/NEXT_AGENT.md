# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `KILLBOX` artik erken `shadow echo`, `21.2s` bridge echo ve `24s` echo lock-in ile daha bagli bir spatial rejime dondu.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`24-32s` echo cadence'ini killbox'in kalici lane-fold ritmine cevir; `24s` lock-in'den hemen sonra davranis tekrar duz chase'e dusmesin.**

Hedef:
Run #245 erken killbox pinch'ini `21.2s` bridge echo ve `24s` echo lock-in ile cadence'e bagladi. Siradaki is, bu baglantiyi yalniz handoff aninda birakmamak: yeni hazard family veya yeni manager acmadan, mevcut `echo` cadence'inin `24-32s` boyunca da killbox'in ayni lane-folding kimligini tasimasini sagla. Oyuncu `24s` sonrasinda yeni bir threat family unlock'u degil, killbox'in tam anlamiyla yerlesmis haliyle karsilastigini hissetsin.

Acilabilecek bagli yuzeyler:
1. normal `echo` cadence'inin tamamini veya ilk birkac tekrarini killbox'in ayni scissor / lane-fold mantigiyla hizala; lock-in sonrasi spatial kimlik kaybolmasin
2. gerekiyorsa mevcut phase detail / shift hint zincirini bu yeni kalici echo davranisini destekleyecek kadar hizala, ama ana delta gameplay/spatial davranis olsun
3. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni spawn manager'i, event bus'i veya hazard orchestration sistemi kurma
- yalniz speed multiplier veya raw spawn squeeze ekleyip bunu phase derinligi diye satma
- killbox disina ayni anda shell/mobile/retention temalari acma

---

## Success Criteria

- oyuncu `24s` sonrasinda davranisin tekrar duz chase'e dustugunu degil, killbox'in yerlesmis bir spatial ritme kavustugunu hisseder
- normal `echo` cadence'i killbox lock-in ile ayni dili konusur; yeni rejim yalniz kisa kopru pencerelerine bagli kalmaz
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
