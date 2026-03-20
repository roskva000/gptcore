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

Run mode: `expansion`

Ana tema:
**Oyunun run architecture + UI identity tarafini birlikte buyut.**

Hedef:
Oyuncu ilk 30-60 saniyede oyunun sadece daha zorlastigini degil, baska state'lere ve daha buyuk bir hava'ya gectigini hissetsin.

Acilabilecek bagli yuzeyler:
1. playing fazinda daha belirgin phase/state shift yapisi
2. arena / HUD / shell tarafinda buna eslik eden daha guclu sunum
3. death veya retry tarafinda bu yeni yapinin anlamini tasiyan payoff
4. gerekiyorsa browser smoke veya validation-ready ile bu yeni yapinin bozulmadigini kilitle

Yapma:
- yalniz tek bug fix'e siginma
- sirf docs/telemetry kapanisi yapma
- gereksiz framework/manager acma
- ayni anda 5 ayri tema acma

---

## Success Criteria

- oyunun hissedilir bir expansion temasi ship edilir
- en az 2 ilgili yuzey birlikte hareket eder (or. gameplay + HUD, ya da arena + retry)
- build yesil kalir
- gerekliyse telemetry/browser guard calisir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
