# ROADMAP.md
Last Updated: 2026-03-22
Updated By: Codex Run #262

---

# NOW

Aktif faz `Autonomous Expansion`.
Bu fazin amaci oyunu human sample beklemeden 5-10 run icinde belirgin bicimde buyutmektir.

Mevcut durum:
- deterministic ve browser guard tabani yeterli
- son donem mutation / presentation birikimi var
- sistem fazla dar calistigi icin urun sivriligi henuz hedef seviyede degil
- Run #241 ile coarse phase ladder aktif gameplay pressure'a baglandi
- Run #242 ile `BREAKTHROUGH` onset'i warm backdrop burst + phase callout + compact hint zinciriyle ekranda okunur bir arena olayi haline geldi
- Run #243 ile `KILLBOX` onset'i ilk zorunlu `lead` cut, daha agresif target lead ve acili trajectory kirilmasi ile gercek bir spatial trap anina donustu
- Run #244 ile bu trap tek ambush olarak kalmadi; killbox onset'inin hemen arkasina kisa bir `shadow echo` follow-through'u girdi
- Run #245 ile `KILLBOX` band'i `21.2s` bridge echo ve `24s` echo lock-in penceresiyle erken pinch'ten normal cadence'e baglandi; 18-24s artik daha tutarli bir spatial state gibi okunuyor
- Run #246 ile `24-32s` `echo` cadence'i killbox icin kalici `lane-fold` rejimine dondu; faz artik `24s` sonrasinda duz chase'e dusmeden `DRIFT` onset'ine kadar ayni spatial dili tasiyor
- Run #247 ile `32s` `DRIFT` onset'i artik killbox'tan kopuk reset degil; ilk drift `1.6s`lik lateral release cut'i ve kisa miras `echo` lag'i ile ayni trap rejiminden dogan yeni bir cevap gibi giriyor
- Run #248 ile `32-40s` endgame band'i tek acilis cut'i olmaktan cikti; `33.6-35.0s` rebound ve `36.2-37.6s` late sweep pencereleri release'i bagli bir spatial zincire cevirdi
- Run #249 ile ayni `32-40s` zinciri ilk kez player-facing olarak da parcalandi; HUD status/detail, hint, bounded callout ve arena spectacle artik `release -> rebound -> late sweep` halkalarini ayri ayri okutuyor
- Run #250 ile bu zincir game-over/rematch yuzeyine de sindi; gec olumler artik generic `ENDGAME` veya stale `10s BROKEN` etiketi yerine aktif halka badge'i, cue-spesifik death summary ve dogrudan rematch hedefi tasiyor
- Run #251 ile `37.6-40s` band'i tekrar buyutuldu; `late sweep` sonrasina bounded `aftershock hold` clamp'i eklendi ve endgame finali generic alternating drift'e hemen dusmeyen dort halkali bir zincire donustu
- Run #252 ile bu final `40s+` eline de baglandi; `aftershock hold` sonrasina bounded `recenter` handoff'u girerek `39.0-41.2s` band'ini generic drift boslugu yerine kontrollu bir late-run devam haline getirdi
- Run #253 ile `41.2-45.6s` band'i de bounded `preclear squeeze` halkasiyla buyudu; `recenter` biter bitmez generic drift'e donmek yerine drift yeniden acilan lane'e `12deg` fold-back ve `0.10s` lag ile basinç kurup `45s+` elini daha bagli hale getiriyor
- Run #254 ile `45.6-60s` band'i ilk kez ayri bir `clear climb` payoff'u kazandi; goal badge, phase detail/support, live hint/callout ve spectacle artik `preclear squeeze` sonrasinda generic clear countdown'a degil adlandirilmis gec-final chase'ine bagli
- Run #255 ile ayni `clear climb` truth'u death/retry payoff'una da sindi; `45.6s+` olumler artik `CLEAR CLIMB` badge'i, `60s CLEAR`e kalan fark ve tek satirlik rematch hedefiyle final push olarak okunuyor
- Run #256 ile `45.6-60s` band'i ilk gercek runtime davranisini kazandi; clear climb boyunca drift artik forced final-threat rejimine giriyor ve `45.6-52.0s` `ascent stair` ile `52.0-60.0s` `summit snap` pencereleri son stretch'i generic cadence'den ayiriyor
- Run #257 ile ayni clear-climb truth'u arena spectacle ve live readability tarafinda da parcalandi; HUD/callout `ASCENT STAIR` ile `SUMMIT SNAP`i ayri ayri gosteriyor, backdrop glow/band/frame motion'u da bu iki final davranisa gore yone degistiriyor
- Run #258 ile insan sinyalindeki pozitif `near miss` anlari kisa omurlu bir replay kancasina tasindi; yakin gecis artik `CHASE LIVE` countdown'u, support satiri ve death snapshot retry prompt'u uzerinden kisa bir earned follow-up penceresi tasiyor
- Run #259 ile ayni `near miss chase` truth'u sahneye de sindi; aktif pencere backdrop glow/aura/band/frame uzerinden kisa bir teal heat state'i tasiyor ve death snapshot prompt'u generic overlay yerine bu earned state'in accent'iyle aciliyor
- Run #260 ile ayni `near miss chase` truth'u death snapshot body/badge tarafina da sindi; game-over artik yalniz tinted prompt degil, `CHASE SNAP` badge'i ve earned kopus satiri ile bu kisa pencerenin nerede koptugunu daha net anlatiyor
- Run #261 ile bu kopus hit anina da sindi; impact marker, fatal spotlight ve overlay title near-miss aktifken generic yon etiketi yerine `snapped lane` dili ve teal accent ile ayni truth'u tasiyor
- Run #262 ile ayni `near miss chase` ilk kez runtime spawn line'ina da girdi; tetiklenen close shave dominant lane'i kilitliyor ve chase penceresindeki en fazla iki sonraki threat once kisa `lane reopen`, sonra `lane cut` target kaymasi alarak oynanis sirasinda da ayni earned snap semantigini hissettiriyor

Bu roadmap artik mikro freeze listesi degil, genisleme eksenidir.

---

# NEXT

## Expansion Track A — Run Architecture
- shipped slice: waiting forecast + active HUD phase status/detail + death/retry payoff + live pressure multipliers + `BREAKTHROUGH` onset tell'i + `KILLBOX` onset forced lead cut + erken `shadow echo` follow-through + `21.2s` bridge echo + `24s` echo lock-in ile coarse run ladder artik gercek arena davranisina daha derin sindi
- shipped slice: `24-32s` `echo` cadence'i de artik killbox'in ayni spatial kimligini tasiyan tekrarli bir lane-fold rejimi; `24s` sonrasi davranis duz target-lag chase'e hemen dusmuyor
- shipped slice: `32-45.6s` band'i artik bounded `release -> rebound -> late sweep -> aftershock hold -> recenter -> preclear squeeze` zinciriyle release'ten sonra da olayli kaliyor; endgame `41s+` sonrasi da hemen generik alternating beat'e dusmuyor
- shipped slice: `45.6-60s` band'i artik `clear climb` payoff diliyle goal chase/HUD/callout/spectacle tarafinda ayri bir gec final gibi okunuyor; `60s` yolu salt sayac degil takip edilen bir hedef haline geliyor
- shipped slice: death/retry payoff artik bu yedi halkadan hangisinde kopuldugunu ve hangi rematch hedefinin kacirildigini soyluyor; `clear climb` de buna dahil
- shipped slice: `45.6-60s` clear climb artik forced drift davranisiyla iki basamakli final-threat kimligi tasiyor; ilk yari `ascent stair`, son yari `summit snap` olarak ayni truth'ta okunuyor
- shipped slice: `ascent stair -> summit snap` rejimi artik arena glow/aura/band/frame hareketinde de ayri motion imzalari tasiyor; final stretch ekranda yone ve snapback karakteriyle okunuyor
- shipped slice: `near miss` artik tek-frame pulse degil; `CHASE LIVE` HUD countdown'u ve support/retry prompt kancasi ile kisa omurlu bir earned risk-odul penceresi aciyor
- shipped slice: ayni `near miss chase` aktifken arena backdrop'u da kisa bir heat pulse'a giriyor; oyuncu pencereyi yalniz copy degil sahnedeki sicaklik degisiminden de ayirt ediyor
- shipped slice: ayni `near miss chase` death snapshot'ta artik `CHASE SNAP` badge'i, body summary'si, impact marker'i, fatal spotlight'i ve overlay title'i ile prompt disinda da sahipleniliyor
- shipped slice: ayni truth artik aktif chase sirasinda kisa bir runtime `lane reopen -> lane cut` zinciri de tasiyor; spawn target'i en fazla iki beat boyunca snapped lane'den uzaklasip sonra ayni lane'e geri kapanarak gercek mekansal fark uretiyor
- next slice: bu yeni runtime beat'i mevcut HUD/support/hint/backdrop diliyle ayni anda daha net okut; oyuncu reopen ve cut'i yalniz hissetmesin, canli okunurlukte de ayirt etsin
- oyuncuya "bu run bir seye donustu" hissi ver

## Expansion Track B — Arena + Threat Families
- arena davranisini sadece mevcut beat ladder'dan ibaret bir ritim olmaktan cikar
- yeni hazard family acmadan once mevcut phase pressure swap'larini daha okunur spatial davranislarla derinlestir
- ozellikle `DRIFT` onset'iyle acilan lateral release zinciri artik runtime + player-facing + death/retry truth'una girdi; sonraki adim bu late finali `45-60s` basincla buyutmek veya yeni bir arena cephe ailesi acmak
- clear climb tarafinda yeni phase acmadan gercek runtime basinç alindi; sonraki secim ya bu son stretch'i gorsel/spectacle okunurlugunda kuvvetlendirmek ya da yeni arena cephe ailesine gecmek

## Expansion Track C — UI / Shell Identity
- HUD ve shell'i daha karakterli, daha oyunsal, daha canli hale getir
- waiting / playing / death / retry durumlari arasinda daha sert kimlik farki kur

## Expansion Track D — Retention Hooks
- tekrar denemeyi tetikleyen hafif meta, route, challenge veya earned payoff katmani ac
- yakin gecislerin zaten pozitif insan sinyali verdigi unutulmasin; replay istegini yukselten dar ama oyunsal bir odak sec
- aktif near-miss chase slice'i ilk retained adaydir; siradaki is runtime `reopen -> cut` davranisini player-facing canli okunurlukte de belirginlestirmek olmali
- agir progression bloat'a kacma

## Expansion Track E — Browser Validation In Practice
- Chromium / smoke / validation-ready akisini cesur urun degisikliklerine daha yakin kullan
- browser evidence'i gercek tasarim kararina bagla

---

# BLOCKERS

Eski anlamiyla blocker yok.
Asagidakiler sadece dikkat notudur:
- browser otomasyonunun goremedigi hissi yuzeyleri tamamen yanlis okumamak
- buyuk hamleleri dogrulamadan biriktirmemek
- ayni anda cok fazla aile acip dagilmamak

---

# DEFERRED

- kapsamli refactor
- yeni yonetim/framework katmanlari
- yalniz docs / copy merkezli run'lar
- sadece fairness/readability mikro-fix zincirine geri donus

---

# SUCCESS MARKERS

Roadmap dogru ilerliyorsa yakinda sunlar gorulmeli:
- 3 run icinde belirgin gorsel/oyunsal fark
- 5 run icinde tempo veya structure farki
- 10 run icinde bugunkunden bariz daha farkli bir deneyim
- audit dilinde `ritual-loop` yerine `expansion-live` sinyali
