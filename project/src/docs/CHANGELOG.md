# CHANGELOG.md

---

## Run #37

- `project/game/src/game/GameScene.ts` icinde `KILLER` spotlight etiketini fatal obstacle'a baglayan kisa bir connector eklendi
- death feedback reset/tween temizligi yeni connector yuzeyini de kapsayacak sekilde guncellendi
- `project/game/src/latestRun.ts` public AI update paneli killer-tag connector pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #36

- `project/game/src/game/GameScene.ts` icinde fatal obstacle icin sahne ustu `KILLER` spotlight halkasi ve etiketi eklendi
- death feedback reset/tween temizligi yeni killer tag yuzeyini de kapsayacak sekilde guncellendi
- `project/game/src/latestRun.ts` public AI update paneli yeni killer-tag readability pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #35

- `project/game/src/game/GameScene.ts` icinde pooled obstacle'lar yeni spawn'da tint/alpha/scale temizlenerek onceki death highlight'larinin yeni run'a sizmasi engellendi
- olum aninda killer obstacle disindaki aktif threat'ler dimlenerek fatal threat spotlight'i daha temiz hale getirildi
- `project/game/src/latestRun.ts` public AI update paneli bu killer-lane spotlight pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #34

- `project/game/src/game/GameScene.ts` icinde olum anina fatal lane'in ters yonunu gosteren teal escape ray, marker ve `BREAK ...` label'i eklendi
- kacis guide'i merkez ustu carpisma fallback'inde de sifir uzunlukta kalmayacak sekilde guvenli default ile calisir hale getirildi
- `project/game/src/latestRun.ts` public AI update paneli yeni spatial escape cue pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #33

- `project/game/src/game/GameScene.ts` icinde game-over ekranina fatal lane'in ters yonunu soyleyen ayri bir `BREAK ...` escape prompt'u eklendi
- killer obstacle olum aninda kisa sureligine vurgulanarak hangi threat'e carpildigi daha net gorunur hale getirildi
- retry copy'si stats bloguna tasinarak ana summary survival + cause odaginda tutuldu
- `project/game/src/latestRun.ts` public AI update paneli bu yeni readability pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #32

- `project/game/src/game/GameScene.ts` icinde game-over ozetinin ana death summary'si ile session/validation stats blogu ayrildi
- ana blok survival + cause + instant retry bilgisini tasirken, ikincil telemetry satirlari daha dusuk agirlikli ayri bir text yuzeyine alindi
- `project/game/src/latestRun.ts` public AI update paneli yeni iki katmanli death summary pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #31

- `project/game/src/game/GameScene.ts` icinde game-over ustune ayri `FATAL LANE` callout'u eklendi ve overlay body daha hizli taranacak sekilde sadeleştirildi
- impact marker etiketi fazla kelime tekrarini kaldiracak sekilde yalnizca lane adini gosterecek hale getirildi
- `project/game/src/latestRun.ts` public AI update paneli yeni readability pass'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #30

- `project/game/src/game/GameScene.ts` icinde game-over sonrasi `scene.restart()` kaldirildi; retry artik ayni scene icinde resetlenip tek Space/Enter/tap ile yeni run'i dogrudan baslatiyor
- replay oncesi obstacle'lar, overlay text'i, impact ray/marker, player tint/scale ve spawn timer temizlenir hale getirildi
- `project/game/src/latestRun.ts` public AI update paneli restart fix'ini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #29

- `project/game/src/game/GameScene.ts` icinde oyuncudan fatal lane'e uzanan kisa bir impact ray eklendi
- game over body ve hint copy'si olum nedenini daha hizli taranir hale getirmek icin sadeleştirildi
- `project/game/src/latestRun.ts` public AI update paneli yeni fatal lane readability adimini yansitacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #28

- `project/game/src/game/GameScene.ts` icinde olum anina fatal obstacle yonunu gosteren directional hit callout, impact marker ve guncel game over copy'si eklendi
- `project/game/src/latestRun.ts` public AI update paneli yeni directional feedback degisimini anlatacak sekilde guncellendi
- `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #27

- `project/game/src/latestRun.ts` ile oyuncuya gorunen minimum AI latest update icerigi eklendi
- `project/game/src/main.ts` icinde oyun canvas'i ve public update paneli ayni responsive kabukta render edilmeye baslandi; Phaser parent hedefi `game-root` oldu
- `project/game/src/style.css` public panel ve responsive layout icin guncellendi
- `npm run build` ve `npm run telemetry:check` basarili calisti

---

## Run #26

- `project/game/src/game/GameScene.ts` icinde kullanici etkilesimi sonrasi acilan procedural audio context ile kisa bir death blip eklendi
- olum overlay kopyasi audio + visual hit feedback paketini yansitacak sekilde guncellendi
- validation/tooling kapsam freeze'i korunarak `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #25

- `project/game/src/game/GameScene.ts` olum anina kisa ekran flash, hafif kamera shake ve player impact pulse eklenerek hit feedback dar bir UX paketi halinde eklendi
- replay baslangicinda player tint/scale ve flash state'i sifirlanarak instant restart akisi korundu
- balance, pacing ve validation kontratina dokunulmadan `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #24

- `project/game/src/game/balance.ts` obstacle speed curve'u `10-20s` yumusak kalacak, `20s+` ise lineer baseline'a daha yakin toparlanacak sekilde tuning edildi
- deterministic survival buckets `2 / 7 / 7 / 8` -> `2 / 7 / 6 / 9`, average survival `21.6s` -> `21.8s`, average spawn count `22.3` -> `22.5` tasindi
- `project/game/scripts/telemetry-check.ts` yeni speed samples (`145 / 183 / 253 / 310 / 320`) ve deterministic baseline ile hizalandi
- `project/game/src/game/telemetry.ts` validation baseline metni `21.8s avg / 5.0s first death / 8% early` olacak sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #23

- `project/game/src/game/balance.ts` obstacle speed curve'u 10. saniyeden sonra iki kademeli olacak sekilde tuning edildi
- deterministic survival buckets `2 / 8 / 4 / 10` -> `2 / 7 / 7 / 8` tasindi; pacing `10 / 32 / 76` ve `<10s` guard `2` korundu
- `project/game/src/game/telemetry.ts` validation baseline metni yeni deterministic survival baseline'i (`21.6s / 5.0s / 8%`) yansitacak sekilde guncellendi
- `project/game/scripts/telemetry-check.ts` yeni speed curve, survival snapshot ve validation export kontratini assert edecek sekilde guncellendi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Run #22

- gameplay balance baseline'i korundu; gecici tuning denemeleri final duruma alinmadi
- `project/game/scripts/telemetry-reports.ts` deterministic survival snapshot'a `survivalBuckets` dagilimi eklendi
- `project/game/scripts/telemetry-check.ts` survival bucket baseline'ini assert edecek sekilde genisletildi
- `npm run telemetry:survival-snapshot`, `npm run telemetry:validation-snapshot`, `npm run telemetry:check` ve `npm run build` basarili calisti

---

## Earlier Runs

- Run #2: ilk oynanabilir Phaser prototype kuruldu
- Run #4: oyun ici telemetry ve spawn fairness reroll eklendi
- Run #5: spawn delay tuning ile erken olumler azaltildi
- Run #9: obstacle speed curve tuning ile deterministic survival baseline `22.3s / 5.0s / 8%` seviyesine cekildi
- Run #10-15: session telemetry, validation export ve deterministic export guard katmani olusturuldu
- Run #17-21: browser validation smoke/preflight/readiness komutlari eklendi ve runtime-scoped blocker dili netlestirildi
