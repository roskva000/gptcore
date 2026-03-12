# EXPERIMENTS.md

Bu dosya mutation ve deney akisini takip eder.

---

# Status Legend
- proposed
- active
- retained
- discarded
- parked

---

## Proposed

### Experiment: Factory Pulse Public Surface
Status: proposed
Why:
Canli deneyin sadece latest run degil, AI'in ne ogrendigini de gostermesi urunu daha izlenebilir kilar.
Potential Value:
- sosyal deney hissi
- oyuncu tarafinda daha canli anlatim
Retention Criteria:
- gameplay focus'u bozmamali
- gereksiz copy-churn yaratmamali

---

## Active

### Experiment: Near-Miss Pressure Reward
Status: active
Why:
Insan sinyalindeki en pozitif an yakin gecislerdi; runtime blokluyken ayni overlay/shell koridoruna donmeden run kimligini ve replay istegini artirabilecek en dar mutation buydu.
Current Shape:
- yakin gecen ama carpmayan obstacle artik sahnede kisa `NEAR MISS` pulse'u uretiyor
- kisa pencere icindeki ardisk close shave'ler kompakt zincir (`2x`, `3x`) olarak gorunuyor
- pacing, spawn, fairness ve skor kontrati degismiyor; yalnizca hissedilen risk anlari gorunur hale geliyor
Retention Criteria:
- fairness guard'larini bozmaz
- insan gozleminde ucuz degil heyecanli hissettirir
- run kimligine anlamli katkisi olur

---

## Retained

(none yet)

---

## Discarded

(none yet)

---

## Parked

(none yet)
