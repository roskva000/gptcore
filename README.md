# GPTCore — Otonom Oyun Geliştirme Deneyi

Bu repository, bir yapay zekâ ajanının bir tarayıcı oyununu **adım adım geliştirerek büyüttüğü** uzun süreli bir yazılım deneyini içerir.

Projede çalışan bir agent, belirli aralıklarla:

* mevcut proje durumunu analiz eder
* küçük bir geliştirme hedefi seçer
* kodu günceller
* doğrulama testlerini çalıştırır
* proje dokümantasyonunu günceller

Bu süreç sürekli tekrar eder ve proje **run run ilerleyerek evrilir**.

Bugun itibariyla bu dongu dort katmanli dusunuluyor:

* saatlik `builder agent`
* gunluk `audit agent`
* haftalik `god agent`
* ust koordinasyon icin `partner layer`

---

# Proje Hakkında

Projede geliştirilen oyun şu teknolojilerle yazılmıştır:

* **Vite**
* **TypeScript**
* **Phaser**

Oyun mekaniği basit bir hayatta kalma oyunudur:

> Oyuncu ekranda kalmaya çalışır, engeller zamanla hızlanır ve yoğunlaşır.

Ancak bu projenin asıl amacı oyun yapmak değil, şu soruyu araştırmaktır:

> Bir yapay zekâ ajanı, minimum insan müdahalesiyle bir yazılım projesini zaman içinde geliştirebilir mi?

---

# Otonom Geliştirme Döngüsü

Ajan düzenli aralıklarla bir geliştirme döngüsü çalıştırır.

Her döngü şu adımlardan oluşur:

```text
proje durumunu oku
↓
tek bir geliştirme hedefi seç
↓
kodu güncelle
↓
telemetry / validation çalıştır
↓
state dosyalarını güncelle
↓
commit oluştur
```

Her çalışma turu `core/project/src/docs/CHANGELOG.md` içinde kayıt altına alınır.

---

# State Tabanlı Geliştirme

Bu projede klasik issue tracker yerine **state dosyaları** kullanılır.

Ajanın hafızası şu dosyalardan oluşur:

| Dosya           | Açıklama                    |
| --------------- | --------------------------- |
| `core/project/src/docs/STATE.md`      | Projenin mevcut durumu      |
| `core/project/src/docs/ROADMAP.md`    | Gelecek planı               |
| `NEXT_core/project/src/docs/AGENT.md` | Bir sonraki ajan için görev |
| `core/project/src/docs/DECISIONS.md`  | Önemli teknik kararlar      |
| `core/project/src/docs/METRICS.md`    | Oyun telemetry verileri     |
| `core/project/src/docs/CHANGELOG.md`  | Ajan run geçmişi            |

Bu dosyalar birlikte çalışarak ajan için **uzun süreli hafıza sistemi** oluşturur.

---

# Telemetry ve Oyun Dengesi

Oyun davranışı deterministik telemetry ölçümleri ile değerlendirilir.

Ölçülen bazı metrikler:

* hayatta kalma süresi
* erken ölüm oranı
* spawn pacing
* retry gap
* first death time

Bu metrikler oyun dengesinin bozulup bozulmadığını anlamak için kullanılır.

Örnek validation komutları:

```bash
npm run telemetry:check
npm run telemetry:snapshot
npm run telemetry:survival-snapshot
npm run telemetry:validation-snapshot
```

---

# Tarayıcı Doğrulama Sistemi

Repository içinde ayrıca bir **browser validation sistemi** bulunur.

Amaç:

* oyunu gerçek tarayıcı ortamında test etmek
* otomatik gameplay doğrulaması yapmak
* telemetry verisi toplamak

İlgili komutlar:

```bash
npm run telemetry:browser-preflight
npm run telemetry:browser-validation-smoke
npm run telemetry:validation-ready
```

Bu sistem ileride headless browser kullanarak otomatik gameplay simülasyonu yapılmasına zemin hazırlar.

---

# Governance (Denetim) Katmanı

Ajanın aynı probleme takılıp kalmasını önlemek için projede bir denetim katmanı bulunur.

Günlük çalışan bir **audit agent** şu konuları değerlendirir:

* son run’larda gerçek ilerleme var mı
* gereksiz tooling artışı var mı
* development loop oluştu mu
* roadmap ile gerçek ilerleme uyumlu mu

Denetim sonuçları şu dosyada tutulur:

```
audit/project/src/docs/AUDIT.md
```

Builder agent yeni run başlatırken bu dosyayı okuyarak yönünü belirler.

Haftalik stratejik yon ise artik ayri bir God katmaninda tutulur.

Bu katmanin amaci:

* builder'in neden lokal optimizasyonlara sikistigini tespit etmek
* projeyi haftalik fazlara ayirmak
* uzun vadeli urun yonunu korumak
* gerekirse human-in-the-loop ihtiyaclarini acikca istemek

Temel dosyalar:

* `strategy/project/src/docs/GOD.md`
* `STRATEGIC_core/project/src/docs/STATE.md`
* `strategy/project/src/docs/MASTER_PLAN.md`
* `DIVINE_core/project/src/docs/DECISIONS.md`
* `strategy/project/src/docs/GOD_COMMUNICATION.md`

Partner layer ise fabrikanin kendisini denetleyen, ritmi koruyan ve buyume mimarisini kuran ayrik bir katmandir.

Partner ile ilgili temel dosyalar:

* `factory/project/src/docs/PARTNER.md`
* `factory/project/src/docs/PARTNER_LOG.md`
* `FACTORY_core/project/src/docs/STATE.md`
* `factory/project/src/docs/FACTORY_RHYTHM.md`
* `factory/IDEA_PIPELINE.md`
* `factory/project/src/docs/CONCURRENCY_POLICY.md`
* `factory/project/src/docs/CRON_REENABLE_PLAN.md`

---

# Repository Yapısı

```text
project/
  game/
    src/
      game/
        GameScene.ts
        balance.ts
        spawn.ts
        telemetry.ts

    scripts/
      balance-snapshot.ts
      survival-snapshot.ts
      telemetry-check.ts
      validation-snapshot.ts
      browser-validation-smoke.ts
      browser-validation-preflight.ts
      browser-validation-ready.ts
```

Dokümantasyon dosyalari:

```
core/project/src/docs/STATE.md
core/project/src/docs/ROADMAP.md
core/project/src/docs/DECISIONS.md
NEXT_core/project/src/docs/AGENT.md
core/project/src/docs/CHANGELOG.md
core/project/src/docs/METRICS.md
audit/project/src/docs/AUDIT.md
strategy/project/src/docs/GOD.md
STRATEGIC_core/project/src/docs/STATE.md
strategy/project/src/docs/MASTER_PLAN.md
DIVINE_core/project/src/docs/DECISIONS.md
strategy/project/src/docs/GOD_COMMUNICATION.md
factory/project/src/docs/PARTNER.md
factory/project/src/docs/PARTNER_LOG.md
FACTORY_core/project/src/docs/STATE.md
factory/project/src/docs/FACTORY_RHYTHM.md
factory/IDEA_PIPELINE.md
experiments/project/src/docs/HUMAN_SIGNALS.md
experiments/project/src/docs/EXPERIMENTS.md
RETENTION_NOTES.md
IDENTITY_ARC.md
factory/project/src/docs/CONCURRENCY_POLICY.md
factory/project/src/docs/CRON_REENABLE_PLAN.md
archive/
```

---

# Oyunu Çalıştırma

```bash
cd project/game
npm install
npm run dev
```

Build almak için:

```bash
npm run build
```

---

# Deneyin Amacı

Bu proje şu sorulara cevap arar:

* Bir yapay zekâ ajanı kendi başına bir yazılım projesini geliştirebilir mi?
* Bir repository aynı zamanda bir ajan için hafıza sistemi olabilir mi?
* Telemetry ve deterministik validation otonom geliştirmeyi nasıl etkiler?
* Governance katmanları development loop’larını engelleyebilir mi?

---

# Deney Durumu

Proje aktif olarak gelişmektedir.

Her run:

* kod değiştirir
* telemetry sistemini geliştirir
* validation araçlarını genişletir
* state dosyalarını günceller

İlerlemeyi şu dosyadan takip edebilirsiniz:

```
core/project/src/docs/CHANGELOG.md
```

---

# Not

Bu repository bir **otonom yazılım geliştirme deneyi** olduğu için:

* commit geçmişi alışılmışın dışında olabilir
* mimari zaman içinde değişebilir
* bazen tooling katmanları büyüyebilir

Bunlar deneyin doğal parçalarıdır.

---

# Lisans

MIT License.
