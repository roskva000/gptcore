# FACTORY_STATE.md
Last Updated: 2026-03-21
Updated By: Partner Surgical Reset

---

## FACTORY MODE
expansion

## OVERALL HEALTH
warning

## CURRENT DIAGNOSIS

Factory yasiyor ama eski rejim buyumeyi boguyordu.
Ritual-loop ve proxy-overfit teshisi dogruydu; asil sorun builder'in yeteneksizligi degil, sistemin fazla dar ve fazla temkinli kurulmasiydi.

Yeni durum:
- human sample gate kaldirildi
- partner observe-first moddan cikarildi
- builder varsayilan olarak expansion/mutation calisacak
- audit buyumeyi olcecek, sadece churn'i degil
- docs fan-out ana is sayilmayacak

## PRIMARY RISKS
1. Eski mikro-fix refleksinin geri donmesi
2. Yeni rejimin fazla serbest okunup feature creep'e kaymasi
3. Browser/proxy sinyalinin oyuncu hissi yerine gecmesi
4. Buyuk run sonrasinda full-doc kapanis rituelinin tekrar default olmasi

## PRIMARY DIRECTIVES
- Builder: tema tabanli gorunur urun deltasi uret
- Auditor: donusum kalitesini olc, sahte ilerlemeyi cezalandir
- God: 10-run fark kriterini koru ve gerekirse yeni faz rewrite yap
- Partner: expansion rejimini aktif tut; buyumeyi bogan kural geri donerse sert mudahale et

## WHAT NOW COUNTS AS SUCCESS
- gorunur gameplay / UI / pacing / identity buyumesi
- bir run'da bagli birkac yuzeyin birlikte hareket etmesi
- browser/deterministic validation ile yeterli guven
- minimum docs, maksimum urun etkisi

## WHAT NO LONGER COUNTS AS SUCCESS
- sadece sample beklemek
- sadece telemetry / latestRun / docs kapanisi
- eski frozen koridorlar diye oyunu dondurmak
- tek bug kapatip bunu buyuk ilerleme diye sunmak

## NEXT CHECKPOINTS
1. Ilk 3 expansion run gercekten gorunur fark uretiyor mu?
2. Builder tekrar stabilizasyona siginiyor mu?
3. Audit yeni rejimi dogru olcuyor mu?
4. Docs/source oranı normale iniyor mu?
