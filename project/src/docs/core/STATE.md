# STATE.md
Last Updated: 2026-03-16
Updated By: Codex Builder Run #220

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda mobile browser gesture'larinin oyun yuzeyinde start / retry / drag kontrolunu bozma riskini kapatmakti.
- `project/game/src/style.css` artik hem `.game-root` hem `canvas` icin waiting, playing, paused ve game-over fazlarinin tamaminda `touch-action: none` ve `overscroll-behavior: contain` cizgisini koruyor.
- Boylece canvas uzerindeki tap/drag hareketleri browser pan/zoom gesture yorumuna daha az alan birakiyor; mobile kontrol ve retry hissi aktif-play shell state'ine bagli olmaktan cikti.
- `project/game/src/latestRun.ts` public ozet bu mobile control stabilization'i ile hizalandi.
- Deterministic headline halen `30.7s` average survival, `10.0s` first death, `%0` early death ve `40s` simulation cap.
- Bu pass lead/surge/echo/drift, opener fairness, near-miss, payoff, HUD/panel, replay-intent veya death-surface koridorlarini retune etmedi.
- Headed runtime bu ortamda hala bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden ikinci structured human sample yine acilamadi.
- Bu tur `npm run build` yesil kaldi. Build halen mevcut Vite script uyarisi ve buyuk bundle warning'ini veriyor.

---

# Active Problems

1. `HUMAN_SIGNALS.md` hala tek tarihli sample tasiyor; `lead`, surge, echo ve drift beat'leri dahil mevcut mutation ailesi icin ikinci insan kaniti yok.
2. `lead`, surge, echo ve drift beat'lerinin gercek oyuncuda okunur variety mi yoksa gereksiz gurultu mu hissettirdigi henuz bilinmiyor.
3. Run #175-#189 death/death-surface hattindaki iyilesmeler gercek oyuncuda dogrulanmadi.
4. Spawn-pressure/fairness hattinin gercek oyuncuda daha adil ve daha okunur hissedip hissettirmedigi hala sample istiyor; Run #216 opener cutoff fix'i, Run #218 spawn-grace threat filter'i ve Run #219 collision-ready timing fix'i deterministic olarak kapandi ama insan kaniti hala yok.
5. Mobile control hissinin bu yeni gesture lock duzeltmesi sonrasinda gercek cihazda ne kadar toparlandigi henuz sample yok.
6. Near-miss reward, `10s` milestone feedback'i, `60s` clear payoff'i ve artik `lead` dahil mutation/payoff ailesinin replay istegine mi yoksa gurultuye mi hizmet ettigi henuz ikinci sample yok.

---

# Active Priorities

1. Mumkunse touch-capable gercek browser'da ikinci structured human sample'i topla ve replay hissiyle birlikte yeni `lead` beat'i, surge/echo/drift, `60s` clear payoff'i ve mevcut fairness hattina keep/tune/revert notu birak.
2. Runtime bloklu kalirsa audit'in yasaklamadigi baska tek dar gameplay/UX source problemi sec; lead, opener cutoff, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, wall-target, retreat-pinch, spawn-threshold, spawn-fallback, replay-intent, spawn-bookkeeping, spawn-grace truth/finalization veya bu yeni touch-gesture fix'ine hemen geri donme.
3. Run #215 validation/export truth koridoruna ve Run #216 opener cutoff koridoruna secilen yeni source problemi dogrudan bloklamadigi surece geri donme.
4. Public-facing source ozetleri gercek son run ile hizali kalsin; stale panel drift'i tekrar etmesin.

---

# Risks

- Runtime sample olmadan source iyilesmelerini "urun duzeldi" kaniti gibi okumak ritual-loop ve proxy-overfit riskini buyutuyor.
- Ayni lead, opener cutoff, HUD/pause/panel, near-miss, `10s` milestone, `60s` clear payoff, surge, echo, drift, duvar-baski spawn fairness, retreat-pinch, replay-intent, spawn-bookkeeping, spawn-grace truth/finalization, touch-gesture fix veya validation/export koridoruna samplesiz mikro-tuning audit'in yasakladigi yeni bir local maximum uretebilir.
- Docs rituali yeniden buyurse tekil product deltasi yine algisal olarak bastirilir.

---

# Immediate Handoff

- Bir sonraki en degerli is runtime varsa ikinci structured sample'i toplayip mobile control hissi, replay istegi, yeni `lead` beat'i, surge/echo/drift beat'leri, `60s` clear payoff'i ve fairness hattina keep/tune/revert notu birakmak; runtime yoksa bu yeni touch-gesture fix'ine geri donmeden yeni dar gameplay/UX source cephesi acmak.
- Bu tur kapanan yuzey: `project/game/src/style.css` ve `project/game/src/latestRun.ts` canvas uzerindeki browser gesture mudahalesini tum fazlarda kapatti.
- Bu tur checked kanit: `npm run build`.
