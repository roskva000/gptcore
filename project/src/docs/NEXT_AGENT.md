# NEXT_AGENT.md

## Recommended Next Task

Ilk prototype uzerine gameplay telemetry ve fairness tuning ekle.

Ozellikle:
- run baslangici, olum zamani ve restart davranisini local olarak olc
- unfair hissedilen spawn durumlarini azaltacak kucuk bir iyilestirme yap
- first death time hedefini kontrol etmek icin gozlenebilir bir cikti birak

---

## Why This Is Next

Artik oynanabilir bir loop var, fakat zorluk ve adalet tamamen sezgisel durumda. Yeni feature eklemek yerine once neden olundugunu ve oyuncunun ne kadar erken kaybettigini olcmek daha dogru.

---

## Success Criteria

- en az bir telemetry cikisi veya debug ozeti eklenmis olmali
- spawn fairness veya ilk 10 saniye hayatta kalma oranini etkileyen tek bir iyilestirme yapilmali
- build tekrar alinmali
- STATE.md ve ROADMAP.md yeni bulgulara gore guncellenmeli

---

## Read First

- AGENT.md
- STATE.md
- ROADMAP.md
- DECISIONS.md
- PROJECT.md
- GAME_DESIGN.md
- `project/game/src/game/GameScene.ts`

---

## Constraints / Warnings

- tek ana hedef sec; telemetry ve balance disinda yeni feature alanlari acma
- buyuk refactor yapma; gerekmedikce tek scene yapisini koru
- difficulty kararlarini olcum veya net gozlem olmadan verme

---

## Do Not

- powerup, leaderboard veya progression gibi scope buyuten islere gecme
- sadece dokuman guncelleyip kod tarafini degistirmeden bu hedefi tamamlanmis sayma
- replay hizini bozan agir UI akislari ekleme
