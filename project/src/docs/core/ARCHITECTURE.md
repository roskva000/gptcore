# core/ARCHITECTURE.md

Project: Survive 60 Seconds

Bu dosya projenin teknik mimarisini tanımlar.
Agent bu sınırları korumalıdır.

---

# 1. Technology Stack

Frontend:
- TypeScript
- Vite

Game Engine:
- Phaser.js

Deployment:
- Vercel

Analytics:
- basic event logging (future: PostHog)

---

# 2. Core Architecture

Proje mümkün olduğunca basit tutulacaktır.

Ana sistemler:

Game
Player
Obstacle
Spawner
Collision
ScoreSystem
UI

Agent yeni sistem eklemeden önce şu soruyu sormalıdır:

> Bu gerçekten yeni bir sistem gerektiriyor mu yoksa mevcut sistemi genişletebilir miyim?

---

# 3. Folder Structure

src/

game/
player/
obstacles/
systems/
ui/

---

# 4. Engine Rules

Phaser.js lifecycle kullanılmalıdır.

Örnek:

- preload
- create
- update

Agent engine mimarisini kıracak hacky çözümlerden kaçınmalıdır.

---

# 5. Performance Constraints

Oyun:

- 60fps hedeflemelidir
- düşük cihazlarda da çalışmalıdır
- gereksiz asset yüklememelidir

---

# 6. Code Quality

Kod:

- okunabilir
- küçük fonksiyonlu
- modüler
- side-effect kontrollü

olmalıdır.

---

# 7. Refactor Policy

Refactor yapılabilir ancak şu durumlarda:

- ciddi teknik borç oluştuysa
- yeni feature mevcut sistemi kırıyorsa
- performans sorunu varsa

Sırf temizlik için büyük refactor yapılmamalıdır.

---

# 8. Anti-Patterns

Agent şu davranışlardan kaçınmalıdır:

- devasa monolith dosyalar
- magic numbers
- duplicated logic
- engine lifecycle dışı hackler

---

# 9. Feature Expansion Rule

Yeni feature eklenmeden önce şu sorular cevaplanmalıdır:

1. core gameplay zaten iyi mi?
2. oyuncular bu feature'dan fayda görür mü?
3. oyun karmaşıklaşır mı?

Eğer cevaplar belirsizse feature eklenmemelidir.

---

# 10. Architectural Stability

Bu proje bir **iteration lab** olduğu için mimari basit tutulmalıdır.

Overengineering yasaktır.