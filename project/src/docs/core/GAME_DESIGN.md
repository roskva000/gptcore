# core/GAME_DESIGN.md

Game: Survive 60 Seconds

Bu dosya oyunun tasarım prensiplerini tanımlar.

---

# 1. Core Fantasy

Oyuncu kendini şöyle hissetmelidir:

"Kaçıyorum, reflekslerimle hayatta kalıyorum."

Oyun:

- hızlı
- gerilimli
- refleks tabanlı

olmalıdır.

---

# 2. Core Gameplay Loop

1. oyuncu spawn olur
2. obstacle'lar ortaya çıkar
3. oyuncu kaçınır
4. zorluk artar
5. oyuncu ölür
6. skor gösterilir
7. replay

Bu döngü hızlı olmalıdır.

Replay süresi:

< 3 saniye

---

# 3. Difficulty Philosophy

Zorluk:

- adil
- öğrenilebilir
- ustalaşılabilir

olmalıdır.

Oyuncu:

"Bu benim hatamdı."

demelidir.

Şu olmamalıdır:

"Bu saçma."

---

# 4. Player Skill Curve

Oyuncu:

ilk 5 saniye → sistemi öğrenir  
10 saniye → ustalaşmaya başlar  
30 saniye → challenge hisseder  

---

# 5. Game Feel

Game feel kritik.

Agent şu şeyleri önemsemelidir:

- hit feedback
- movement responsiveness
- sound feedback
- visual clarity

---

# 6. Obstacle Design

Obstacle'lar:

- okunabilir
- tahmin edilebilir
- adil

olmalıdır.

Randomness oyuncuyu öldürmemelidir.

---

# 7. Player Agency

Oyuncu:

- kaçabilir
- hata yapabilir
- risk alabilir

Oyuncu kontrol hissini kaybetmemelidir.

---

# 8. Replay Value

Oyuncu öldüğünde şunu düşünmelidir:

> "Bir daha deneyeyim."

Bu his oluşmuyorsa oyun başarısızdır.

---

# 9. Expansion Principles

Yeni özellik eklerken şu sırayı takip et:

1. gameplay
2. fairness
3. replay
4. polish

---

# 10. Feature Guidelines

İyi feature örnekleri:

- powerups
- dash
- slow motion
- combo score
- near miss bonus

Kötü feature örnekleri:

- karmaşık inventory
- çok sayıda UI ekranı
- oyun temposunu bozan sistemler

---

# 11. Design Anti-Patterns

Agent şu hatalardan kaçınmalıdır:

- difficulty spikes
- unfair deaths
- cluttered screen
- confusing mechanics
- tutorial overload

---

# 12. Design North Star

Bu oyun:

**basit öğrenilen, ustalaşması zor bir hayatta kalma oyunudur.**