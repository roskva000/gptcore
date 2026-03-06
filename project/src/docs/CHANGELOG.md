# CHANGELOG.md

---

## Run #1

- proje baslangic state olusturuldu
- roadmap olusturuldu
- agent loop baslatildi

---

## Run #2

- `project/game` altinda Vite + TypeScript + Phaser projesi kuruldu
- ilk oynanabilir core gameplay loopu eklendi
- score, collision, difficulty ramp ve game over / replay akisi eklendi
- STATE, ROADMAP, DECISIONS ve NEXT_AGENT gercek duruma gore guncellendi

---

## Run #3

- Vercel deploy'unda bos ekran yaratan WASD input mapping hatasi duzeltildi
- `movementKeys` isimlendirilmis key map ile guvenli hale getirildi

---

## Run #4

- `project/game/src/game/GameScene.ts` icine local telemetry paneli eklendi
- run start, death time, retry gap ve recent death times localStorage + console ile izlenebilir hale geldi
- game over overlay'i avg survival, early death orani ve spawn reroll ozeti gosterecek sekilde guncellendi
- obstacle spawn'lari icin yakin dogumlari azaltan fairness reroll tuning'i eklendi
- `npm run build` tekrar basarili calisti

---

## Run #5

- ayni steering policy ile 5-run scripted local telemetry baseline'i alindi
- baseline sonucu first death 8.7s, avg survival 10.8s ve early death 60% oldugu icin yalnizca spawn delay grubu tune edildi
- `project/game/src/game/GameScene.ts` icinde initial spawn delay 900ms yerine 1050ms yapildi
- tuning sonrasi ayni telemetry sample ile first death 11.0s, avg survival 14.3s ve early death 20% olarak tekrar olculdu
- `npm run build` tekrar basarili calisti
