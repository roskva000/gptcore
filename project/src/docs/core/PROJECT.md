# core/PROJECT.md

Project Name: Survive 60 Seconds  
Type: Browser Web Game  
Platform: Web (Desktop + Mobile Browser)

---

# 1. Vision

Survive 60 Seconds basit ama tekrar oynanabilir bir arcade web oyunudur.

Oyuncunun amacı:
**olabildiğince uzun süre hayatta kalmaktır.**

Oyun hızlı öğrenilen ama ustalaşması zor bir deneyim sunmalıdır.

---

# 2. Core Gameplay

Oyuncu bir karakteri kontrol eder.

Amaç:
ekrandaki engellerden kaçarak mümkün olduğunca uzun süre hayatta kalmak.

### Controls
- keyboard (WASD / arrow keys)
veya
- mouse

### Lose Condition
Oyuncu bir obstacle ile çarpıştığında oyun biter.

### Score
Score = hayatta kalınan süre.

---

# 3. Core Loop

1. oyuncu oyuna başlar
2. obstacle'lar spawn olur
3. oyuncu kaçmaya çalışır
4. difficulty zamanla artar
5. oyuncu ölür
6. score gösterilir
7. replay

Bu döngü **çok hızlı** olmalıdır.

İdeal replay süresi:
< 3 saniye

---

# 4. Difficulty Model

Zorluk zamanla artar.

Örnek parametreler:

- obstacle spawn rate
- obstacle speed
- obstacle types
- arena size

Difficulty adil olmalıdır.

Oyuncu:
- hata yaptığında ölmelidir
- rastgele öldürülmemelidir

---

# 5. Player Experience Goals

Oyuncu:

- ilk 5 saniyede oyunu anlamalı
- ilk 30 saniyede heyecan hissetmeli
- öldüğünde tekrar oynamak istemeli

Oyun:

- hızlı
- akıcı
- anlaşılır
- bağımlılık yapıcı

olmalıdır.

---

# 6. Success Metrics

Agent şu metrikleri iyileştirmeye çalışmalıdır.

### Core Metrics

average_session_time

target:
120 seconds

---

retry_rate

target:
very high

---

average_survival_time

target:
increasing

---

first_death_time

target:
> 10 seconds

---

# 7. Design Principles

## Simplicity
Oyun basit olmalı.

## Fairness
Ölümler oyuncuya adil gelmeli.

## Instant Replay
Replay süresi çok kısa olmalı.

## Skill Expression
Oyuncu ustalaşabildiğini hissetmeli.

---

# 8. Initial Scope

İlk versiyon minimal olacaktır.

### v1 features

- player movement
- obstacle spawn
- collision detection
- score system
- game over screen
- replay button

---

# 9. Possible Future Features

Agent roadmap doğrultusunda ekleyebilir.

Örnekler:

- powerups
- dash ability
- slow motion
- shield
- combo score
- obstacle çeşitleri
- leaderboard
- skins
- achievements

Ancak core gameplay stabil olmadan feature eklenmemelidir.

---

# 10. Agent Mission

Agent'ın görevi:

- gameplay'i analiz etmek
- oyuncu deneyimini iyileştirmek
- difficulty balance yapmak
- replay akışını optimize etmek
- roadmap'i güncellemek
- sürdürülebilir ilerleme sağlamak

Amaç:

**oyunun oynanabilirliğini sürekli artırmak.**

---

# 11. Agent Constraints

Agent:

- gereksiz feature eklememeli
- gameplay stabil olmadan scope büyütmemeli
- ölçülemeyen değişikliklerden kaçınmalı
- her turda küçük ama etkili ilerleme yapmalıdır