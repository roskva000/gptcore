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
- varsayilan hafiza yalniz `STATE.md` ve `NEXT_AGENT.md`; genis core-doc kapanisini otomatik rituel yapma
- yalniz HUD/callout polish yapip bunu expansion diye sunma; siradaki fark arena davranisinda gorunmeli

---

## Recommended Next Task

Run mode: `mutation`

Ana tema:
**`KILLBOX` girisini ilk lead cut ile okunur bir spatial trap anina cevir.**

Hedef:
Run #242 `BREAKTHROUGH` onset'ini warm backdrop burst + callout + hint ile ekranda okunur hale getirdi. Simdi siradaki hedef, `18s` sonrasi `KILLBOX` girisini yalniz hiz/cadence artisi olmaktan cikarip oyuncunun ilk lead baskisini ayirt edecegi kisa ama net bir spatial event'e cevirmek.

Acilabilecek bagli yuzeyler:
1. `KILLBOX` baslangicinda ilk `lead` baskisini mevcut spawn/variant truth'u icinde daha ayirt edilir bir giris anina bagla
2. yeni behavior yeni manager acmadan mevcut `runPhase`, `lead` variant ve mevcut presentation yuzeylerinden biriyle calissin
3. odak spatial/readability olsun; ayni problemi sadece daha fazla raw speed veya spawn squeeze ile cozme
4. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni orchestration/state-manager kurma
- sirf copy degistirip killbox karakteri cozuldu diye sunma
- ayni anda shell, mobile, retention ve validation'i ayri temalara dagitma

---

## Success Criteria

- oyuncu `18s` civarinda `KILLBOX` girisini yalniz HUD degil arena davranisinda da hemen fark eder
- yeni davranis mevcut phase architecture ve mevcut lead pressure rejimiyle ayni dili konusur
- build yesil kalir
- `npm run telemetry:check` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
