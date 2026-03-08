Bu dosya projede alinan onemli kararlari ve gerekcelerini icerir.

---

## Decision Log

### [Run #53]

Decision:
Ilk `6s` icinde gereken spawn mesafesi helper'i `+160px` bonus alacak; yakin acilis lane'leri ayni mevcut reroll yolu uzerinden tekrar secilecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine geri donmek ve validation/tooling alani buyutmek yasak. Kod incelemesi `spawnRerolls=0` gosterdi; yani mevcut required-distance helper'i pratikte acilista hic devreye girmiyordu. En dar urun ilerlemesi, yeni bir sistem acmadan bu mevcut fairness yolunu acilis saniyelerinde gercekten etkinlestirmekti.

Impact:
Pacing `10 / 32 / 76`, hiz curve'u ve `0.18s` lag + `260ms` grace korunurken deterministic survival `23.4s / 6.3s / 8%`ten `24.3s / 6.3s / 4%`e geldi. Buckets `2 / 5 / 6 / 11`den `1 / 5 / 6 / 12`ye kaydi, average spawn reroll `0.3` oldu ve validation export `24.1s avg / 20% early / spawn_saves=3` kontratina gecti.

Rollback Condition:
Host browser manuel sample'i ilk `6s` icindeki yeni guard'in opener'i fazla bosalttigini, challenge'i geciktirdigini veya acilis tansiyonunu dusurdugunu gosterirse yalnizca bonus/cutoff dar kapsamda geri cekilir; death-readability veya tooling katmani acilmaz.

### [Run #52]

Decision:
Ilk `10s` icinde spawn olan obstacle'lar hemen hareket edecek, ancak collider'lari ilk `260ms` boyunca zarar vermeyecek.

Reason:
`AUDIT.md` verdict'i `drift-risk`; death-readability paketine geri donmek ve validation/tooling alani buyutmek yasak. Run #51'in early aim lag tuning'i sonrasi bir sonraki dar gameplay adimi, yeni spawn'in lane'e girdigi ilk anda "dogar dogmaz hit" hissini azaltmakti. Bu yaklasim pacing'i, hiz curve'unu, mevcut spawn lag'i ve replay akisini bozmadan sahadaki fairness hissine kisa bir reaksiyon penceresi ekler.

Impact:
Deterministic survival baseline `23.4s / 6.3s / 8%` ve buckets `2 / 5 / 6 / 11` aynen korundu; yani accidental balance drift olmadi. `telemetry:check` yeni `260ms` collision-grace surface'ini de assert eder hale geldi. Browser preflight artik hazir, fakat packaged smoke komutu ayri olarak CDP `Page.enable` hatasiyla fail oluyor; bu turda tooling kapsam buyutulmayip blocker olarak kaydedildi.

Rollback Condition:
Gercek browser sample yeni grace'in spawn'lari fazla bagislayici yaptigini, skill expression'i zayiflattigini veya oyuncuya "through-pass" hissi verdigini gosterirse yalnizca grace suresi/cutoff'u dar kapsamda geri cekilir; yeni readability veya tooling katmani acilmaz.
