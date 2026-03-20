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

Run mode: `integration`

Ana tema:
**Yeni ship edilen run phase architecture'i death/retry payoff tarafina sindir.**

Hedef:
Oyuncu oldugunde sadece kac saniye yasadigini degil, hangi phase'e kadar ciktigini ve bir sonraki denemede neyi acmak uzere oldugunu net hissetsin.

Acilabilecek bagli yuzeyler:
1. death snapshot veya retry prompt icinde phase reached / next phase chase payoff'u
2. phase'e ozel compact badge, summary veya retry durtusu uretecek bir yuzey
3. gerekiyorsa bu yeni truth'u telemetry-check regression'ina ekle
4. yeni framework/manager acmadan mevcut helper ve presentation yuzeylerini genislet

Yapma:
- phase helper etrafinda yeni orchestration/state-manager kurma
- yalniz copy churn'u yapip urun ilerlemesi gibi sunma
- ayni anda gameplay, shell, mobile ve validation'i ayri temalara dagitma

---

## Success Criteria

- phase architecture death/retry tarafinda anlamli payoff kazanir
- en az 2 ilgili yuzey birlikte hareket eder (or. death snapshot + retry prompt)
- build yesil kalir
- gerekliyse telemetry/browser guard calisir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
