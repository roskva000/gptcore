# ROADMAP.md

---

# NOW

- Run #155 game-over direct pointer replay bug'ini kapatti; replay/resume `pointerdown` yolu artik held-input release gate'ini atlamiyor.
- Run #154 stale mouse pointer hold-state bug'ini kapatti; native `buttons===0` artik cached primary-button fallback'iyle steer/retry/resume eligibility tasimiyor.
- Run #153 game-over validation summary satirindaki hardcoded sample gate'i kapatti; death-screen telemetry snapshot artik export readiness ile ayni `hasCompletedRunSample()` kontratini kullaniyor.
- Run #152 lifecycle cleanup, Run #151 validation/export gate'i ve Run #145-#150 near-miss hattini sample olmadan yeniden acma.
- Runtime varsa tek hedef ikinci structured human sample olsun: near-miss pulse/chirp, opening launch surface, retry/start hissi, focus-loss resume, mobile shell ve death/pause readability icin keep/tune/revert notu birak.
- Runtime yoksa ayni overlay/fairness/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde ikinci structured sample acildi, ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi.
- `npm run build` yesil; gameplay/helper kontrati degisirse `npm run telemetry:check` de yesil.

---

# NEXT

- Runtime varsa ikinci structured sample'i topla ve `HUMAN_SIGNALS.md` icine su yuzeyler icin keep/tune/revert notu ekle: Run #145-#150 near-miss hattı, Run #137 opening surface, Run #130-#155 mobile shell/input/replay hattı, Run #125-#129 death/pause readability.
- Runtime yine blokluysa ayni overlay/fairness/validation hattina donmeden tek yeni gameplay veya UX source bug'i sec; stale-input, replay-control veya spawn-pressure kontratlari icinde dar bir bug tercih et.
- Yeni source deltasi olmadan public panel veya core docs fan-out acma.

---

# BLOCKED

- headed browser/runtime eksikligi (`DISPLAY` / `WAYLAND_DISPLAY` yok)
- ikinci hedefli human signal eksikligi

---

# RETIRED / DEFERRED

- telemetry wording / HUD copy churn'u
- sample olmadan validation/export affordance'ini yeniden acmak
- yeni readiness / preflight / orchestration katmani
- sample olmadan Run #101-#119 fairness/input/control zincirine geri donus
- sample olmadan Run #145 near-miss pulse'unu yeni scoring/combo/meta katmanlariyla buyutmek
- sample olmadan Run #149 near-miss restore hattini yeni feedback/orchestration katmanlariyla buyutmek
- sample olmadan Run #150 near-miss chirp'ini yeni audio system, soundtrack veya combo-celebration katmanlariyla buyutmek

---

# LATER

- `GameScene.ts` seam extraction
- near-miss hattı keep kalirsa daha derin ama yine dar replay mutasyonlari
