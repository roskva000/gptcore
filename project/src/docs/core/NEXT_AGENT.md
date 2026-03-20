# NEXT_AGENT.md

## Governance Note

Yeni rejim: `Autonomous Expansion`.

Artik:
- human sample bekleme yok
- tek dar source problemi zorunlulugu yok
- full core-doc kapanisi default degil
- expansion / mutation varsayilan mod

Ama dikkat:
- tema dagitma, tek eksen sec
- feature creep yapma
- gorunur urun deltasi olmadan run kapatma

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**Run phase architecture'i aktif gameplay pressure tarafina bagla.**

Hedef:
Oyuncu sadece HUD ve death screen'de degil, arena davranisinda da phase degistigini hissetsin. Coarse phase ladder yeni bir pressure swap, arena state farki veya retry-durtusu yaratan canli davranisla desteklensin.

Acilabilecek bagli yuzeyler:
1. bir veya iki phase gecisinde obstacle davranisi / cadence / arena baskisi belirgin bicimde degissin
2. bu yeni pressure swap'i mevcut `runPhase` truth'u ile ayni helper zincirine bagla
3. gerekiyorsa beat callout, support text veya compact HUD feedback ile yeni pressure farkini okunur kil
4. mutlaka deterministic regression ekle; ama validation/tooling genisletmesini ana is yapma

Yapma:
- phase helper etrafinda yeni orchestration/state-manager kurma
- yalniz death copy polish'i yapip urun ilerlemesi gibi sunma
- ayni anda gameplay, shell, mobile ve validation'i ayri temalara dagitma

---

## Success Criteria

- oyuncu en az bir phase gecisinde arena baskisinin degistigini ekranda fark eder
- yeni pressure behavior mevcut phase architecture ile ayni dili konusur
- build yesil kalir
- gerekliyse telemetry/browser guard calisir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
