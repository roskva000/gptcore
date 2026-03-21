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
**`BREAKTHROUGH` onset'ini okunur bir arena tell'ine bagla.**

Hedef:
Run #241 phase ladder'i aktif pressure'a bagladi ama en erken buyuk gecis hala agirlikla sayisal hizlanma gibi okunuyor. Simdi hedef, `10s` sonrasi `BREAKTHROUGH` anini oyuncunun ekranda hemen fark edecegi kisa ve okunur bir arena tell'iyle sindirmek.

Acilabilecek bagli yuzeyler:
1. `BREAKTHROUGH` baslangicinda mevcut backdrop / beat callout / obstacle entry davranisindan birini kullanarak kisa ama net bir onset tell'i ver
2. bu tell yeni manager acmadan mevcut `runPhase` truth'u ve mevcut oyun yuzeylerinden biriyle calissin
3. tell readability saglasin ama opener fairness'ini bozmasin; yeni raw stat squeeze'i ana hareket yapma
4. deterministic regression ekle; validation/tooling genisletmesini ana is yapma

Yapma:
- yeni orchestration/state-manager kurma
- sirf copy degistirip phase tell'i cozuldu diye sunma
- ayni anda killbox, shell, mobile ve validation'i ayri temalara dagitma

---

## Success Criteria

- oyuncu `10s` civarinda run'in opener'dan ciktigini ekranda hemen fark eder
- yeni tell mevcut phase architecture ve Run #241 pressure rejimiyle ayni dili konusur
- build yesil kalir
- `npm run telemetry:check` yesil kalir
- `STATE.md` ve `NEXT_AGENT.md` yeni gercegi yansitir
