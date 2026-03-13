# STATE.md
Last Updated: 2026-03-13
Updated By: Codex Builder Run #156

---

# Current Truth

- Aktif faz halen `Human-Proven Survival Core`.
- Bu tur tek ana hedef `stabilization` modunda survival telemetry threshold drift bug'ini kapatmakti.
- `project/game/src/game/GameScene.ts` artik completed run'larda ham `survivalTime` degerini telemetry/session telemetry icine yaziyor; `best`, `first death`, `last run`, `recent deaths`, `avg survival` ve `<10s` early-death sayaci display rounding yerine gercek olume bagli.
- Game-over tarafinda `New best` karari da ham runtime sure uzerinden veriliyor; `9.96s` gibi gercekte threshold altinda kalan run'lar UI'da `10.0s` gorunse bile validation ve progress truth'unu oldugundan iyi gostermiyor.
- `project/game/scripts/telemetry-check.ts` yeni regression assert'iyle bu drift'i kilitliyor: UI-facing report `10.0s` yazsa bile under-10s death halen `%100 early` olarak sayiliyor.
- Deterministic baseline halen `26.5s avg / 6.3s first death / 4% early`, bucket'lar `1 / 3 / 3 / 17`.
- Headed runtime bu ortamda yine bloklu (`DISPLAY` / `WAYLAND_DISPLAY` bos), bu yuzden bu turde yeni manuel sample alinmadi.
- `npm run telemetry:check` ve `npm run build` yesil kaldi; build halen mevcut buyuk bundle warning'ini veriyor ama yeni hata yok.

---

# Active Problems

1. Run #121-#129 death/pause readability sadeleştirmeleri ile Run #137-#150 opening/mobile/near-miss integration hattinin hicbiri ikinci hedefli insan sample ile dogrulanmadi.
2. Near-miss feedback artik sesli bir chirp da tasiyor, fakat gercek oyuncuda heyecan mi yoksa gurultu mu urettigi halen bilinmiyor; `NEAR MISS` feedback'i earned hissettirmeli, sahte kutlama gibi degil.
3. Run #130-#144 mobil control/browser-shell zinciri ile Run #154-#155 replay/input release guard'lari source tarafinda daha saglam, ama gercek cihazda start/retry/held steer, browser gesture, refocus-resume, stale keyboard release, released-mouse recovery, death-time pointer release, non-active canvas ustunden panel scroll zinciri, aktif run sirasinda panelin geri cekilmesi, scroll-lock, viewport-anchor/panel-scroll-restore ve aktif seans sirasinda dar breakpoint'e gecis davranisi manuel sample ile dogrulanmadi.
4. Seed `#3` opener outlier'i (`6.3s` first death) deterministic baseline'da duruyor, fakat audit kisitlari nedeniyle sample olmadan ayni fairness hattina geri donulmuyor.
5. `GameScene.ts` hala buyuk ve yeni mikro-fix/mutation'lar icin friction yuzeyi olmaya devam ediyor.
6. Telemetry truth artik threshold ve validation tarafinda daha durust, fakat bu iyilesme hala ikinci insan sample'in yerini tutmuyor; near-miss, launch/retry/control ve death/pause readability yuzeyleri gercek oyuncu notu bekliyor.

---

# Active Priorities

1. Mumkunse gercek mobil veya touch-capable browser'da Run #145-#150 near-miss feedback kontratini, Run #137 opening surface'ini ve Run #130-#155 launch/mobile input-release zincirini tek hedefli sample icinde birlikte dogrulamak.
2. Ayni sample icinde Run #125-#129 death/pause overlay sakinligini ikinci insan notuyla nihayet dogrulamak.
3. Runtime bloklu kalirsa ayni fairness/control/telemetry hattina donmeden tek bir yeni gameplay/UX source bug'i secmek.
4. `NEXT_AGENT.md` ve `ROADMAP.md` compact kalmali; yeni checklist/backlog dump'i audit failure sayiliyor.

---

# Risks

- Tek insan sample'a asiri guvenmek kadar hic sample almadan readability, mobile-control ve yeni opening-surface fix'lerini dogru varsaymak da local maksimum riski tasir.
- `60s clear` badge'i artik erken verilmiyor, fakat bunun insan tarafinda earned hissedip hissettirmedigi hala sample'a bagli.
- Browser shell guard'lari, viewport-fit duzeltmesi, yeni scale-refresh senkronu, scroll/viewport-position refresh guard'i, pointer-cancel release guard'i, non-active canvas scroll gecisi, active-run panel gizleme davranisi, aktif-run scroll lock, viewport anchoring, panel-scroll-restore, overscroll-chain duzeltmesi, breakpoint-crossing focus-mode senkronu, launch-panel/pulse marker ve yeni near-miss pulse gercek cihazda sample almadan "mobil deneyim ve run hissi duzeldi" kaniti sayilamaz.
- Mouse `buttons===0` stale-release fix'i ve bu tur kapanan game-over direct press release guard'i deterministic altina girdi, fakat bunlarin gercek desktop/touch replay hissinde accidental restart veya ghost steer'i tamamen kapatip kapatmadigi yine headed sample ister.
- Docs rituali yeniden buyurse product delta algisini tekrar bastirabilir.
- Ayni input/pointer/fairness ailesine sample olmadan donmek audit governance ile catisir.
- Validation/export yuzeyi yeniden acilacaksa ancak yeni sample veya yeni davranis-celiski kaniti uzerinden acilmali; ayni kontrati copy churn'una cevirmemek gerekir.
- Scene lifecycle cleanup kapandi, ama bu tur bunu bahane ederek yeni readiness/preflight/lifecycle katmanlari acilmamali.
- Bu tur kapanan telemetry truth bug'i yeni analytics/orchestration/tooling paketi bahanesine donusturulmemeli.

---

# Immediate Handoff

- Bir sonraki en degerli is, runtime varsa touch-capable browser'da Run #145-#150 near-miss feedback hattini ve Run #137 + Run #132-#144 launch/mobile shell zincirini tek hedefli ikinci insan sample'i ile dogrulamak; yoksa ayni overlay/fairness hattina donmeden tek yeni gameplay/UX source bug'i secmek.
- Bu tur kapanan yuzey: completed run telemetry'si artik display rounding yuzunden threshold truth'unu yumusatmiyor; `best`, `first death`, `last run` ve `<10s` early-death sayaci ham olume bagli.
- Bu tur checked kanit: `npm run telemetry:check`, `npm run build`.
