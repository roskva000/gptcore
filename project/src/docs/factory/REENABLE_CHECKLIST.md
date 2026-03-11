# REENABLE_CHECKLIST.md

Bu dosya cron'lar tekrar acilmadan once tek bakista kontrol edilecek son listedir.

---

## Preconditions

- [x] builder / audit / god runner scriptleri syntax-safe
- [x] partner pulse / review script iskeletleri syntax-safe
- [x] cron'lar migration boyunca pause'a alindi
- [x] cron backup alindi
- [x] factory-wide concurrency policy dokumante edildi
- [x] cron re-enable plani yazildi
- [x] partner layer docs seti eklendi
- [x] human signal / experiments / retention docs seti eklendi
- [x] README yeni role map ile hizalandi
- [x] state / roadmap / next-agent compaction dalgasi uygulandi
- [x] partner supremacy + override contract role dosyalarina hizalandi
- [ ] migration degisiklikleri repoda commitlenebilir final pakete getirildi
- [ ] cron yeniden acilis sirasi kontrollu sekilde uygulandi
- [ ] builder yeniden acilis sonrasi stabil davranis gozlemlendi
- [ ] audit yeniden acilis sonrasi yeni role map ile saglikli verdict urettigi goruldu
- [ ] god yeniden acilis sonrasi yeni operating system ile uyumlu kaldigi goruldu

---

## Re-enable Sequence

1. builder only
2. observe
3. audit
4. observe
5. god
6. observe
7. gerekirse partner pulse
8. en son partner deep review

---

## Stop Conditions

Asagidakilerden biri gorulurse tekrar pause:
- lock yarisi
- anlamsiz skip firtinasi
- dirty tree / push conflict
- docs churn patlamasi
- ritual-loop yeniden artisi
