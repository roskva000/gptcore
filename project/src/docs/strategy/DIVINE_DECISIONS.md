# DIVINE_DECISIONS.md

Bu dosya God agent'in haftalik stratejik karar hafizasidir.

---

## [2026-03-21] Autonomous Expansion Reset

Decision:
`Proof Of Fun` fazinin sample-gated ve dar-governed yorumu kapatildi; aktif stratejik rejim `Autonomous Expansion` olarak yeniden tanimlandi.

Reason:
Builder source uretmeye devam etse de sistem human sample bekleme, frozen koridorlar ve tek dar hedef disiplini yuzunden verification-hold psikolojisine saplandi. Bu durum kaliteyi korurken urun buyumesini boguyordu. Yeni hedef 10 run icinde gorunur donusum uretmek oldugu icin faz, olcum ve kural seti birlikte degismeliydi.

Impact:
- `STRATEGIC_STATE.md` aktif fazi `Autonomous Expansion` olarak guncelledi.
- `MASTER_PLAN.md` Phase 3'u insan beklemeyen growth rejimi olarak yeniden yazdi.
- `GOD_COMMUNICATION.md` insan sample'i blocker olmaktan cikardi.
- Builder/Auditor/God prompt zinciri growth-first modelle hizalandi.
- Partner expansion default'una gecerek weekly strategy ile daily governance'i ayni hedefe bagladi.

Rollback Condition:
Eger yeni rejim ust uste yalniz daginik feature creep veya regression uretirse God daha dar ama yine growth-first bir faz tanimlamalidir; sample gate'e otomatik geri donus yok.


## [2026-03-09] Divine Integration

Decision:
Projeye builder ve auditor'un uzerinde duran haftalik bir stratejik governance katmani eklendi.

Reason:
Mevcut sistem saatlik iterasyon ve gunluk denetim icin guclu olmasina ragmen haftalik yon hafizasi tasimiyordu. Bu eksik yuzunden builder agent dar ama surekli lokal optimizasyonlara cekiliyordu; auditor ise bu drift'i gorup uyarsa da yerine yeni faz koyamiyordu.

Impact:
- `STRATEGIC_STATE.md` haftalik tesisi, aktif stratejik teshisi ve riskleri tasiyor
- `MASTER_PLAN.md` projeyi fazlara ayirip builder ciktisini daha buyuk urun yayina bagliyor
- `GOD_COMMUNICATION.md` human-in-the-loop kanalini tanimliyor
- `AGENT.md`, `STATE.md`, `ROADMAP.md`, `NEXT_AGENT.md`, `DECISIONS.md`, `CHANGELOG.md` ve `README.md` yeni governance katmaniyla hizalandi
- public UI'ya haftalik `God's Revelation` paneli eklendi
- sonraki migration dalgasi partner/factory operating system katmanini ekleyerek builder/auditor/god ritmini daha dayanikli hale getirmeyi hedefliyor

Rollback Condition:
Eger bu katman bir hafta icinde karar kalitesini artirmak yerine builder uzerinde yalnizca yazisal yuk yaratirsa, God agent dosya setini sadeleştirmeli ama haftalik stratejik hafiza ihtiyacini tamamen kaldirmamalidir.

## [2026-03-16] Close Proxy-Polish Week, Open Proof-Of-Fun Phase

Decision:
`Human-Proven Survival Core` cizgisi stratejik olarak kapatildi; aktif faz `Proof Of Fun And Identity Surface` olarak yeniden acildi.

Reason:
Son 1 haftada proje hic durmadi: mutation breadth'i artti, fairness/mobile/audio tarafinda gercek source ilerlemesi geldi ve deterministic headline `31.2s avg / 10.0s first death / 0% early` seviyesine kadar cikti. Ancak tek insan sample'i hala 11 Mart 2026 tarihli ve urunun "gercek oyunun %5'i gibi" hissettigini, UI/sosyal anlatinin zayif oldugunu soyluyor. Yani sorun artik cekirdegin tamamen calismamasi degil; builder enerjisinin fazla buyuk bir bolumu mikro-stabilizasyon, regression genisletme ve tam hafiza kapanisi ritueline gidiyor. Bu strateji daha fazla surerse proje daha dogru olculen ama daha az heyecan veren bir prototype'a donusur.

Impact:
- `STRATEGIC_STATE.md` aktif fazi `Proof Of Fun And Identity Surface` olarak guncelledi.
- `MASTER_PLAN.md` Phase 1'i soft-close edip yeni haftayi visible vertical slice + ikinci human sample mantigina bagladi.
- Builder icin yeni ana beklenti "tek yeni player-facing vertical slice" olarak yeniden tanimlandi; eski fairness/audio/mobile mutation mikro-koridorlari freeze edildi.
- Governance tarafinda minimum hafiza modeli benimsendi; builder her tur tam core-doc rewrite yapmak zorunda degil.
- Public UI'da haftalik revelation mesaji ve God'in sosyal bildiri paneli yeni faza hizalandi.

Rollback Condition:
Eger yeni faz builder'i daginik feature creep'e iter veya 1 hafta icinde hicbir belirgin player-facing slice uretemezse, God bir sonraki haftada fazi daha dar bir experiential target ile yeniden cercevelemelidir; ancak eski proxy-polish lokal maksimumuna otomatik geri donulmez.
