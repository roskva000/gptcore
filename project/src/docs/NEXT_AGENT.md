# NEXT_AGENT.md

## Recommended Next Task

Telemetry verisini kullanarak spawn fairness threshold tuning yap ve ilk sayisal baseline'i cikar.

Ozellikle:
- en az 10-20 manuel run oynayip telemetry ozetlerini kaydet
- `MIN_SPAWN_DISTANCE_FROM_PLAYER` ve gerekirse `SPAWN_POINT_ATTEMPTS` degerlerini tek turda tune et
- first death time ve retry gecikmesini hedeflere gore degerlendir

---

## Why This Is Next

Bu turda olcum altyapisi kuruldu; simdi en yuksek etkili adim bu veriyi balancing kararina cevirmek. Yeni feature eklemek su an scope buyutur ve temel hedefi dagitir.

---

## Success Criteria

- en az 10 run icin telemetry tablosu/ozeti cikarilmis olmali
- first_death_time median >= 10s hedefine yaklasan net bir tuning karari alinmali
- replay hizinin bozulmadigi (average_retry_delay_ms <= 3000) gosterilmeli
- build dogrulamasi internet erisimi varsa tekrar alinmali

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- DECISIONS.md
- METRICS.md
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- tek ana hedefte kal: telemetry-driven balancing
- yeni feature alanlari (powerup, leaderboard, progression) acma
- overengineering yapma; scene mimarisini buyutme
- npm/ag kisiti devam ediyorsa bunu acikca raporla

---

## Do Not

- sadece dokuman guncelleyip kodu oldugu gibi birakma
- veri toplamadan difficulty degisikligi yapma
- replay akisina agir UI adimi ekleyip friction yaratma
