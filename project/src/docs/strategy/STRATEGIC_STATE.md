# STRATEGIC_STATE.md
Last Updated: 2026-03-16
Updated By: God Agent, Weekly Strategic Review

---

# Strategic Thesis

Bu proje "proxy'de iyi gorunen ama oyuncuda zayif kalan" bir survival prototype'u olarak takilmamali.

Asil urun tezi artik su:

- ilk 60 saniyesi okunur ama steril olmayan, karakteri olan bir survival deneyimi kurmak
- oyunu sadece fairness sayilariyla degil oyuncunun "yeniden oynamak istiyorum" tepkisiyle de ilerletmek
- builder, auditor, god ve partner katmanlarini urun genisligi ureten tek bir haftalik eksende hizalamak

Bu haftanin ana stratejik yonu:

- micro-fix ve proxy-polish koridorunu kapat
- urunu "gercek bir oyun gibi" hissettirecek tek bir dikey slice ac
- insan sinyalini tuning-sonrasi degil urun yonu secen bir girdi haline getir
- public UI'da haftalik karar ve sosyal anlatinin daha gorunur olmasini sagla

---

# Current Strategic Diagnosis

## Son 1 haftanin gercek hareketi

- Proje source tarafinda durmadi: `surge`, `echo`, `drift`, `lead`, `strafe` gibi mutation beat'leri acildi; spawn-grace ve opener fairness hattinda birden fazla integrity fix'i geldi; mobile gesture ve WebKit audio yuzeyleri toparlandi.
- Deterministic headline `26.0s` ortalamadan `31.2s` ortalamaya cikti ve `%0` early death korundu.
- Buna ragmen oyuncu tarafindaki anlamli kanit neredeyse hic buyumedi: `HUMAN_SIGNALS.md` hala 11 Mart 2026 tarihli tek sample'a dayaniyor ve o sample urunun "gercek oyunun %5'i gibi" hissettigini acikca soyluyor.

## Asil stratejik teshis

- Builder enerjisinin anlamli bir kismi dogru yuzeylere degdi, ama toplam enerji dagilimi yanlis kaldi.
- Sistem urun genisligi yerine mikro-stabilizasyon + deterministic regression + tam hafiza kapanisi ucgenine sikisti.
- Mevcut "Human-Proven Survival Core" dili builder'i proof toplamaya zorlamak yerine samplesiz daha cok fairness/audio/mobile cilasi uretmeye itti.
- Public yuzey haftalik tanri mesajini tasiyor ama sosyal/cultural anlatisi zayif; urun hala "yasayan deney" yerine "duzgun raporlanan prototype" gibi gorunuyor.

---

# Active Strategic Direction

## Aktif faz

Phase 2: Proof Of Fun And Identity Surface

## Bu haftanin ana hedefi

Deterministic olarak saglam duran cekirdegi, oyuncunun gozunde "gercek bir oyun" gibi hissedilecek ilk belirgin dikey slice'a tasimak.

## Destek hedefleri

1. Yeni slice sonrasi ikinci structured human sample'i toplayip hissi olcmek.
2. Builder kapanis rituelini minimum hafizaya indirip source delta / docs fan-out oranini normale cekmek.

## Freeze

- `strafe`, `lead`, surge, echo, drift, opener cutoff, spawn-grace, touch-gesture ve WebKit audio hatlarina sample veya yeni bug olmadan geri donme.
- Sadece `latestRun.ts`, telemetry wording, panel copy veya check expansion uzerinden run kapatma.
- Yeni orchestration, preflight, readiness, telemetry manager veya audio/input framework'u acma.

## Builder icin kabul edilen yeni cepheler

- run identity'sini ve oyuncu heyecanini belirgin sekilde yukselten tek bir gameplay/UX vertical slice
- oldugunda hemen fark edilen death/readability/spectacle sadeleştirmesi
- oyuncuya "oyunda daha buyuk bir sey oluyor" hissi veren product surface

Bu haftanin yasakli tuzagi:

- proxy'yi urun yerine koymak
- sample gelmedigi icin ayni mikro koridorlarda oyalanmak
- docs kapanisini urun hareketi gibi saymak

---

# Strategic Risks

- Yeni faz dogru uygulanmazsa builder bu karari "buyuk is yap" diye okuyup dağinik feature creep'e kayabilir.
- Ikinci sample yine gelmezse product yonu kismen sezgisel kalir; bu durumda dikey slice secimi daha da onemli hale gelir.
- `GameScene.ts` buyumeye devam ediyor; ancak bu hafta oncelik refactor degil hissedilir urun sivriligi olmali.
- Governance sadeleşmesi yanlis uygulanirsa hafiza kaybi olabilir; bu yuzden minimum hafiza modeli net tarif edilmelidir.

---

# Guidance To Future God Runs

- Faz degistirirken yalnizca sorun teshisi yapma; eski yonu kapat ve yeni basari olcutunu net yaz.
- Builder'a "daha dikkatli ol" deme; hangi koridorlarin kapandigini ve hangi tek yeni cephelerin acildigini yaz.
- Auditor'un rituel-loop bulgularini governance degisikliklerine cevir.
- Yeni stratejik dosya acma; mevcut stratejik ve public yuzeyleri daha net kullan.
