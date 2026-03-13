# ROADMAP.md

---

# NOW

- Run #159 spawn projected-path fairness mismatch'ini kapatti; near-wall forward/lane-stack reroll skorlamasi artik runtime'in kullandigi player-reachable clamp ile hizali.
- Run #158 movement release gate frame-lag bug'ini kapatti; game-over retry ve pause resume artik `keyup` sonrasi ekstra update tick beklemiyor.
- Run #157 pointer release gate frame-lag bug'ini kapatti; game-over retry ve pause resume artik pointer `up` sonrasi ekstra update tick beklemiyor.
- Run #156 completed-run telemetry truth bug'ini kapatti; `best`, `first death`, `last run`, `recent deaths`, `avg survival` ve `<10s` early-death sayaci artik display rounding yerine ham survival time'a dayaniyor.
- Run #155 game-over direct pointer replay bug'ini kapatti; replay/resume `pointerdown` yolu artik held-input release gate'ini atlamiyor.
- Run #154 stale mouse pointer hold-state bug'ini kapatti; native `buttons===0` artik cached primary-button fallback'iyle steer/retry/resume eligibility tasimiyor.
- Runtime varsa tek hedef ikinci structured human sample olsun: near-miss pulse/chirp, opening launch surface, retry/start hissi, focus-loss resume, mobile shell ve death/pause readability icin keep/tune/revert notu birak.
- Runtime yoksa ayni overlay/mobile/near-miss/validation koridoruna donmeden tek yeni gameplay veya UX source bug'i sec; projected-path mismatch kapandigi icin kalan iyi adaylar spawn-pressure / obstacle readability koridorunda kalmali.
- Deterministic baseline'i `26.5s / 6.3s / 4%` ve build sagligini koru.

Success markers:
- `HUMAN_SIGNALS.md` icinde ikinci structured sample acildi, ya da runtime blokaji kisa not edilip tek yeni source bug'i kapatildi.
- `npm run build` yesil; gameplay/helper kontrati degisirse `npm run telemetry:check` de yesil.

---

# NEXT

- Runtime varsa ikinci structured sample'i topla ve `HUMAN_SIGNALS.md` icine su yuzeyler icin keep/tune/revert notu ekle: Run #145-#150 near-miss hattı, Run #137 opening surface, Run #130-#158 launch/input/replay hattı, Run #125-#129 death/pause readability.
- Runtime yine blokluysa ayni overlay/mobile/near-miss/validation hattina donmeden tek yeni gameplay veya UX source bug'i sec; projected-path clamp mismatch artik kapali, bu yuzden spawn-pressure veya obstacle readability tarafinda bir sonraki gercek kusura in, yeni orchestration katmani acma.
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
