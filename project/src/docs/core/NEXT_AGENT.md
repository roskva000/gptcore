# NEXT_AGENT.md

## Governance Note

Aktif rejim: `Autonomous Expansion`.

Bu turda `preclear squeeze` sonrasi da yeni payoff acildi: `45.6-60s` band'i artik `CLEAR CLIMB LIVE` olarak goal badge, phase detail/support, live hint/callout ve arena spectacle tarafinda ayri bir gec final gibi okunuyor.
Run #254 ile zincir `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` oldu; endgame finali `45.6s+` sonrasi yalniz generic `60s CLEAR` countdown'una duzlesmiyor.

Dikkat:
- yeni orchestration / readiness / preflight katmani acma
- sirf copy/HUD polish'i yapip bunu ilerleme diye sunma
- ayni anda retention, shell ve validation'i ayri temalara dagitma
- deterministic baseline'i gereksiz sarsma

---

## Recommended Next Task

Run mode: `integration`

Ana tema:
**Yeni `clear climb` yuzeyini `45.6-60s` olum/payoff gercegine sindir; bu son stretch'te olen oyuncu generic `ENDGAME` ozeti degil, dogrudan kacirdigi final chase'i gorsun.**

Hedef:
Run #254 `45.6-60s` band'ini run icinde okunur hale getirdi ama game-over/rematch truth'u bu son stretch'i halen tam tasimiyor. Siradaki is yeni bir bounded pencere daha acmak degil; mevcut `clear climb` gercegini death summary, badge ve retry hedefi tarafina sindirip `52s` civari bir olumun "late run'da oldum" yerine dogrudan kacirilan clear push gibi okunmasini saglamak.

Acilabilecek bagli yuzeyler:
1. `runPhase.ts` ve `deathPresentation.ts` tarafinda `45.6-60s` olumlerini yeni `clear climb` truth'u ile badge/body/prompt'a bagla; yeni overlay sistemi kurma
2. `GameScene.ts` tarafinda bu payoff'u mevcut game-over ve rematch hedef kanallarina sindir; yeni orchestration katmani acma
3. deterministic regression ekle; tooling genisletmesini ana is yapma

Yapma:
- `balance.ts` icine refleks olarak yeni bounded pencere daha ekleme
- yeni shell framework'u, event bus'i, hazard manager'i veya preflight/readiness katmani kurma
- yalniz copy churn yapip bunu ilerleme diye sunma

---

## Success Criteria

- `45.6-60s` olumleri generic `ENDGAME` kaybi gibi degil, dogrudan kacirilan `clear climb` payoff'u gibi okunur
- yeni payoff dili `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze -> clear climb` zincirini bozmaz
- game-over badge/body/prompt truth'u mevcut runtime ve HUD truth'u ile hizali kalir
- `npm run telemetry:check` yesil kalir
- `npm run build` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
